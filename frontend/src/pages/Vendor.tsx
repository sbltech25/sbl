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

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !validateFileSizes()) return;
    
    setIsSubmitting(true);
    
    try {
      const formDataToSend = new FormData();
      
      // Add all text fields
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== 'certificationsFiles' && key !== 'companyProfile') {
          formDataToSend.append(key, value);
        }
      });
      
      // Add files
      formData.certificationsFiles.forEach(file => {
        formDataToSend.append('certifications', file);
      });
      
      if (formData.companyProfile) {
        formDataToSend.append('companyProfile', formData.companyProfile);
      }
      
      // Add FormSubmit-specific fields
      formDataToSend.append('_template', 'table');
      formDataToSend.append('_captcha', 'false');
      formDataToSend.append('_subject', `New Vendor Registration: ${formData.companyName}`);
      
      const response = await fetch(
        `https://formsubmit.co/ajax/thesbldev@gmail.com`,
        {
          method: "POST",
          body: formDataToSend,
        }
      );
      
      const data = await response.json();
      
      if (data.success) {
        toast({
          title: "Success!",
          description: "Your vendor registration has been submitted.",
        });
        
        // Reset form
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
      } else {
        throw new Error(data.message || "Form submission failed");
      }
    } catch (error) {
      console.error('Submission error:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Submission failed",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
          </CardHeader>
          
          <CardContent>
            <form 
              ref={formRef}
              onSubmit={onSubmit}
              className="space-y-6"
              encType="multipart/form-data"
            >
              {/* Company Information Section */}
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
              
              {/* Contact Person Section */}
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
              
              {/* Additional Information Section */}
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
              
              {/* Document Uploads Section */}
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
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Form Submission */}
              <div className="pt-6">
                <Button
                  type="submit"
                  className="w-full md:w-auto px-8 py-6 text-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Registration'}
                </Button>
                
                <p className="mt-4 text-sm text-gray-500">
                  By submitting this form, you agree to our terms of service.
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