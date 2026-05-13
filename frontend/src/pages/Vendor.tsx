import React, { useState, useRef, ChangeEvent } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

interface FormData {
  companyName: string;
  companyPhone: string;
  companyAddress: string;
  companyEmail: string;
  contactPersonName: string;
  contactPersonAddress: string;
  contactPersonEmail: string;
  contactPersonPhone: string;
  previousAddress: string;
  businessType: string;
  website: string;
  taxId: string;
  registrationNumber: string;
  compliant: string;
  certifications: string;
  experience: string;
  references: string;
  bankDetails: string;
  certificationsFiles: File[];
  companyProfile: File | null;
}

interface UploadProgress {
  certifications: number[];
  companyProfile: number;
}

const CLOUDINARY_CONFIG = {
  cloudName: 'diyw0zuys',
  uploadPreset: 'sendddd',
  folder: 'vendor-registrations',
};

const MAX_FILE_SIZE_MB = 10;
const MAX_TOTAL_SIZE_MB = 20;

const Vendor = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    companyPhone: '',
    companyAddress: '',
    companyEmail: '',
    contactPersonName: '',
    contactPersonAddress: '',
    contactPersonEmail: '',
    contactPersonPhone: '',
    previousAddress: '',
    businessType: '',
    website: '',
    taxId: '',
    registrationNumber: '',
    compliant: '',
    certifications: '',
    experience: '',
    references: '',
    bankDetails: '',
    certificationsFiles: [],
    companyProfile: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({
    certifications: [],
    companyProfile: 0,
  });
  const formRef = useRef<HTMLFormElement>(null);
  const certificationsRef = useRef<HTMLInputElement>(null);
  const companyProfileRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, field: 'certificationsFiles' | 'companyProfile') => {
    if (!e.target.files) return;

    if (field === 'certificationsFiles') {
      const files = Array.from(e.target.files).slice(0, 5);
      
      for (const file of files) {
        if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
          toast({
            title: "File Too Large",
            description: `File ${file.name} exceeds ${MAX_FILE_SIZE_MB}MB limit`,
            variant: "destructive",
          });
          return;
        }
      }

      setFormData(prev => ({ ...prev, certificationsFiles: files }));
    } 
    else if (field === 'companyProfile') {
      const file = e.target.files[0];
      
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: `Company profile exceeds ${MAX_FILE_SIZE_MB}MB limit`,
          variant: "destructive",
        });
        return;
      }

      setFormData(prev => ({ ...prev, companyProfile: file }));
    }
  };

  const removeCertificationFile = (index: number) => {
    setFormData(prev => {
      const newFiles = [...prev.certificationsFiles];
      newFiles.splice(index, 1);
      return { ...prev, certificationsFiles: newFiles };
    });
  };

  const removeCompanyProfile = () => {
    setFormData(prev => ({ ...prev, companyProfile: null }));
    if (companyProfileRef.current) companyProfileRef.current.value = '';
  };

  const validateForm = () => {
    const requiredFields: (keyof FormData)[] = [
      'companyName', 'companyPhone', 'companyAddress', 'companyEmail',
      'contactPersonName', 'businessType', 'taxId', 'registrationNumber',
      'compliant', 'bankDetails'
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        toast({
          title: "Validation Error",
          description: `Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field`,
          variant: "destructive",
        });
        return false;
      }
    }

    if (formData.certificationsFiles.length > 5) {
      toast({
        title: "Validation Error",
        description: "You can upload a maximum of 5 certification files",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const validateFileSizes = () => {
    let totalSize = 0;
    
    for (const file of formData.certificationsFiles) {
      totalSize += file.size;
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: `${file.name} exceeds ${MAX_FILE_SIZE_MB}MB limit`,
          variant: "destructive",
        });
        return false;
      }
    }
    
    if (formData.companyProfile) {
      totalSize += formData.companyProfile.size;
      if (formData.companyProfile.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Company profile exceeds size limit",
          variant: "destructive",
        });
        return false;
      }
    }
    
    if (totalSize > MAX_TOTAL_SIZE_MB * 1024 * 1024) {
      toast({
        title: "Total Size Exceeded",
        description: `Total attachments exceed ${MAX_TOTAL_SIZE_MB}MB limit`,
        variant: "destructive",
      });
      return false;
    }
    
    return true;
  };

const uploadToCloudinary = async (file: File): Promise<{ url: string; name: string; previewUrl: string }> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);
  formData.append('folder', CLOUDINARY_CONFIG.folder);
  
  const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/auto/upload`;
  
  const response = await fetch(cloudinaryUrl, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || 'Upload failed');
  }

  const data = await response.json();
  
  // Create a preview URL based on file type
  let previewUrl = data.secure_url;
  const fileExtension = file.name.split('.').pop()?.toLowerCase();
  
  // For PDFs and images - use Cloudinary with attachment flag
  if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'pdf'].includes(fileExtension || '')) {
    previewUrl = data.secure_url.replace('/upload/', '/upload/fl_attachment:false/');
  }
  // For Office documents - use Google Docs viewer
  else if (['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx'].includes(fileExtension || '')) {
    previewUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(data.secure_url)}&embedded=true`;
  }
  
  return { url: data.secure_url, name: file.name, previewUrl };
};
  const uploadAllFiles = async (): Promise<{
  certificationsFiles: { url: string; name: string }[];
  companyProfileFile: { url: string; name: string } | null;
}> => {
  const certificationsFiles: { url: string; name: string }[] = [];
  let companyProfileFile: { url: string; name: string } | null = null;

  if (formData.certificationsFiles.length > 0) {
    toast({
      title: "Uploading",
      description: `Uploading ${formData.certificationsFiles.length} certification file(s)...`,
    });

    for (let i = 0; i < formData.certificationsFiles.length; i++) {
      const file = formData.certificationsFiles[i];
      const result = await uploadToCloudinary(file);
      certificationsFiles.push(result);
      
      setUploadProgress(prev => ({
        ...prev,
        certifications: [...prev.certifications, Math.round(((i + 1) / formData.certificationsFiles.length) * 100)],
      }));
    }
  }

  if (formData.companyProfile) {
    toast({
      title: "Uploading",
      description: "Uploading company profile...",
    });
    
    companyProfileFile = await uploadToCloudinary(formData.companyProfile);
    
    setUploadProgress(prev => ({
      ...prev,
      companyProfile: 100,
    }));
  }

  return { certificationsFiles, companyProfileFile };
};

  const onSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!validateForm() || !validateFileSizes()) return;
  
  setIsSubmitting(true);
  setUploadProgress({ certifications: [], companyProfile: 0 });
  
  try {
    const { certificationsFiles, companyProfileFile } = await uploadAllFiles();
    
    toast({
      title: "Files Uploaded",
      description: "All files have been uploaded successfully. Submitting form...",
    });

    // Build HTML email body with clickable links
    let certificationsHtml = '';
    certificationsFiles.forEach((file, i) => {
      const displayUrl = file.url.replace('/upload/', '/upload/fl_attachment:false/');
      certificationsHtml += `
        <p><strong>Certification ${i + 1}:</strong> ${file.name}<br>
        <a href="${displayUrl}" target="_blank" style="color: #2563eb; text-decoration: underline;">📎 View Document</a></p>
      `;
    });

    let companyProfileHtml = '';
    if (companyProfileFile) {
      const displayUrl = companyProfileFile.url.replace('/upload/', '/upload/fl_attachment:false/');
      companyProfileHtml = `
        <p><strong>Company Profile:</strong> ${companyProfileFile.name}<br>
        <a href="${displayUrl}" target="_blank" style="color: #2563eb; text-decoration: underline;">📎 View Document</a></p>
      `;
    }


    // Plain text version
    const plainMessage = `
SOUTHERN BASIN LIMITED - New Vendor Registration
=================================================

COMPANY INFORMATION:
- Company: ${formData.companyName}
- Phone: ${formData.companyPhone}
- Address: ${formData.companyAddress}
- Email: ${formData.companyEmail}
- Business Type: ${formData.businessType}
- Website: ${formData.website || 'N/A'}
- Tax ID: ${formData.taxId}
- Registration: ${formData.registrationNumber}
- Compliant: ${formData.compliant}

CONTACT PERSON:
- Name: ${formData.contactPersonName}
- Phone: ${formData.contactPersonPhone || 'N/A'}
- Address: ${formData.contactPersonAddress || 'N/A'}
- Email: ${formData.contactPersonEmail || 'N/A'}

ADDITIONAL INFO:
- Certifications: ${formData.certifications || 'None'}
- Experience: ${formData.experience || 'None'}
- References: ${formData.references || 'None'}
- Bank Details: ${formData.bankDetails}
`.trim();

    const formPayload = new FormData();
    formPayload.append('email', formData.companyEmail);
    formPayload.append('_replyto', formData.companyEmail);
    formPayload.append('_subject', `New Vendor Registration: ${formData.companyName}`);
    formPayload.append('message_plain', plainMessage); 

    // Only send essential fields to avoid duplicates
    formPayload.append('Company Name', formData.companyName);
    formPayload.append('Company Email', formData.companyEmail);
    formPayload.append('Business Type', formData.businessType);
    formPayload.append('Contact Person', formData.contactPersonName);
    
    // Send document links separately
    certificationsFiles.forEach((file, index) => {
      formPayload.append(`Certification ${index + 1} - ${file.name}`, file.url);
    });
    if (companyProfileFile) {
      formPayload.append(`Company Profile - ${companyProfileFile.name}`, companyProfileFile.url);
    }

    const response = await fetch(
      'https://formspree.io/f/mnjwrwbb',
      {
        method: 'POST',
        body: formPayload,
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    if (response.ok) {
      toast({
        title: 'Success!',
        description: 'Your vendor registration has been submitted successfully.',
      });

      setFormData({
        companyName: '',
        companyPhone: '',
        companyAddress: '',
        companyEmail: '',
        contactPersonName: '',
        contactPersonAddress: '',
        contactPersonEmail: '',
        contactPersonPhone: '',
        previousAddress: '',
        businessType: '',
        website: '',
        taxId: '',
        registrationNumber: '',
        compliant: '',
        certifications: '',
        experience: '',
        references: '',
        bankDetails: '',
        certificationsFiles: [],
        companyProfile: null,
      });
      
      if (certificationsRef.current) certificationsRef.current.value = '';
      if (companyProfileRef.current) companyProfileRef.current.value = '';
      
      setUploadProgress({ certifications: [], companyProfile: 0 });
    } else {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Submission failed');
    }
  } catch (error) {
    console.error('Submission error:', error);
    
    toast({
      title: 'Error',
      description: error instanceof Error ? error.message : 'Failed to submit form. Please try again.',
      variant: 'destructive',
    });
  } finally {
    setIsSubmitting(false);
  }
};

  const getTotalUploadProgress = (): number => {
    const totalFiles = formData.certificationsFiles.length + (formData.companyProfile ? 1 : 0);
    if (totalFiles === 0) return 0;
    
    let totalProgress = 0;
    
    if (uploadProgress.certifications.length > 0) {
      totalProgress += uploadProgress.certifications.reduce((sum, progress) => sum + progress, 0) / formData.certificationsFiles.length;
    }
    
    totalProgress += uploadProgress.companyProfile;
    
    return Math.round(totalProgress / (formData.certificationsFiles.length + (formData.companyProfile ? 1 : 0)));
  };

  return (
    <div className="min-h-screen pt-20 pb-10 px-4 bg-gray-50">
      <div className="container mx-auto">
        <Card className="max-w-4xl mx-auto shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center text-primary">
              SOUTHERN BASIN LIMITED VENDOR REGISTRATION FORM
            </CardTitle>
            <p className="text-center text-gray-600 mt-4">
              Welcome to our Vendor Registration Portal. Please complete all required fields.
            </p>
            <p className="text-center text-sm text-gray-500 mt-2">
              Files will be securely uploaded to our cloud storage. Max 5 certifications (10MB each) + company profile (10MB). Total limit: 20MB.
            </p>
          </CardHeader>
          
          <CardContent>
            <form 
              ref={formRef}
              onSubmit={onSubmit}
              className="space-y-6"
            >
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-secondary border-b pb-2">
                  Company Information
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="companyName" className="required">
                      Company Name
                    </Label>
                    <Input
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="companyPhone" className="required">
                      Phone Number
                    </Label>
                    <Input
                      id="companyPhone"
                      name="companyPhone"
                      value={formData.companyPhone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label htmlFor="companyAddress" className="required">
                      Company Address
                    </Label>
                    <Input
                      id="companyAddress"
                      name="companyAddress"
                      value={formData.companyAddress}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label htmlFor="companyEmail" className="required">
                      Company Email
                    </Label>
                    <Input
                      id="companyEmail"
                      name="companyEmail"
                      type="email"
                      value={formData.companyEmail}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="businessType" className="required">
                      Business Type
                    </Label>
                    <Input
                      id="businessType"
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="website">
                      Website (if available)
                    </Label>
                    <Input
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="taxId" className="required">
                      Tax ID Number
                    </Label>
                    <Input
                      id="taxId"
                      name="taxId"
                      value={formData.taxId}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="registrationNumber" className="required">
                      Registration Number
                    </Label>
                    <Input
                      id="registrationNumber"
                      name="registrationNumber"
                      value={formData.registrationNumber}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="compliant" className="required">
                      Regulatory Compliance
                    </Label>
                    <div className="flex gap-4 mt-2">
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="compliant-yes"
                          name="compliant"
                          value="Yes"
                          checked={formData.compliant === "Yes"}
                          onChange={() => setFormData({...formData, compliant: "Yes"})}
                          className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                          required
                        />
                        <Label htmlFor="compliant-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="radio"
                          id="compliant-no"
                          name="compliant"
                          value="No"
                          checked={formData.compliant === "No"}
                          onChange={() => setFormData({...formData, compliant: "No"})}
                          className="h-4 w-4 text-primary focus:ring-primary border-gray-300"
                          required
                        />
                        <Label htmlFor="compliant-no">No</Label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label htmlFor="previousAddress">
                      Previous Address (if applicable)
                    </Label>
                    <Input
                      id="previousAddress"
                      name="previousAddress"
                      value={formData.previousAddress}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-secondary border-b pb-2">
                  Contact Person
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="contactPersonName" className="required">
                      Full Name
                    </Label>
                    <Input
                      id="contactPersonName"
                      name="contactPersonName"
                      value={formData.contactPersonName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="contactPersonPhone">
                      Phone Number
                    </Label>
                    <Input
                      id="contactPersonPhone"
                      name="contactPersonPhone"
                      value={formData.contactPersonPhone}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label htmlFor="contactPersonAddress">
                      Address
                    </Label>
                    <Input
                      id="contactPersonAddress"
                      name="contactPersonAddress"
                      value={formData.contactPersonAddress}
                      onChange={handleInputChange}
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <Label htmlFor="contactPersonEmail">
                      Email Address
                    </Label>
                    <Input
                      id="contactPersonEmail"
                      name="contactPersonEmail"
                      type="email"
                      value={formData.contactPersonEmail}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-secondary border-b pb-2">
                  Additional Information
                </h3>
                
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <Label htmlFor="certifications">
                      Certifications/Licenses Held
                    </Label>
                    <Textarea
                      id="certifications"
                      name="certifications"
                      value={formData.certifications}
                      onChange={handleInputChange}
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="experience">
                      Relevant Experience
                    </Label>
                    <Textarea
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="references">
                      Professional References
                    </Label>
                    <Textarea
                      id="references"
                      name="references"
                      value={formData.references}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="Company Name, Contact Person, Email, Phone"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="bankDetails" className="required">
                      Bank Details
                    </Label>
                    <Textarea
                      id="bankDetails"
                      name="bankDetails"
                      value={formData.bankDetails}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      placeholder="Bank Name, Account Number, Routing Number, etc."
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-secondary border-b pb-2">
                  Supporting Documents
                </h3>
                
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <Label htmlFor="certificationsFiles">
                      Certification Files (Max 5 files, 10MB each)
                    </Label>
                    <Input
                      id="certificationsFiles"
                      type="file"
                      ref={certificationsRef}
                      onChange={(e) => handleFileChange(e, 'certificationsFiles')}
                      multiple
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                      className="cursor-pointer"
                      disabled={isSubmitting}
                    />
                    
                    {formData.certificationsFiles.length > 0 && (
                      <div className="mt-3 space-y-2">
                        <p className="text-sm font-medium">Selected files:</p>
                        <ul className="space-y-1">
                          {formData.certificationsFiles.map((file, index) => (
                            <li key={index} className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded">
                              <span className="text-sm truncate max-w-xs">{file.name}</span>
                              <button
                                type="button"
                                onClick={() => removeCertificationFile(index)}
                                className="text-red-500 hover:text-red-700"
                                disabled={isSubmitting}
                              >
                                Remove
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="companyProfile">
                      Company Profile (Max 10MB)
                    </Label>
                    <Input
                      id="companyProfile"
                      type="file"
                      ref={companyProfileRef}
                      onChange={(e) => handleFileChange(e, 'companyProfile')}
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                      className="cursor-pointer"
                      disabled={isSubmitting}
                    />
                    
                    {formData.companyProfile && (
                      <div className="mt-3">
                        <div className="flex items-center justify-between bg-gray-100 px-3 py-2 rounded">
                          <span className="text-sm truncate max-w-xs">
                            {formData.companyProfile.name}
                          </span>
                          <button
                            type="button"
                            onClick={removeCompanyProfile}
                            className="text-red-500 hover:text-red-700"
                            disabled={isSubmitting}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {isSubmitting && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-semibold">Upload Progress</h4>
                    <span className="text-sm text-gray-600">{getTotalUploadProgress()}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-primary h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${getTotalUploadProgress()}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500">
                    Uploading files to cloud storage before submitting...
                  </p>
                </div>
              )}
              
              <div className="pt-6">
                <Button
                  type="submit"
                  className="w-full md:w-auto px-8 py-6 text-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Uploading & Submitting...' : 'Submit Registration'}
                </Button>
                
                <p className="mt-4 text-sm text-gray-500">
                  By submitting this form, you agree to our terms of service. Files will be securely uploaded to cloud storage.
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Vendor;