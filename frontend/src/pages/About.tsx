import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { COMPANY_INFO, TEAM_MEMBERS } from '@/lib/constants';
import { Globe, Linkedin, Twitter, MessageCircle, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const About = () => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/sbl-company-profile.pdf';
    link.download = 'sbl-company-profile.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen pt-20">
      <section className="relative py-20 bg-gradient-to-br from-secondary to-primary text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1663296997689-f5e35ad7ac7d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fG9pbCUyMGFuZCUyMGdhcyUyMGVuZ2luZWVyaW5nJTIwTmlnZXJpYXxlbnwwfHwwfHx8MA%3D%3D?w=1920&h=1080&fit=crop"
            alt="Background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        <div className="container mx-auto relative px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About Us</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90 mb-8">
            Know more about who we are and what we stand for in the engineering and construction industry.
          </p>
          <Button 
            onClick={handleDownload}
            variant="outline"
            className="bg-white/10 hover:bg-white/20 border-white/30 text-white backdrop-blur-sm"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Company Profile
          </Button>
        </div>
      </section>

      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="p-3 lg:p-6">
              <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-6">Our Story</h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  <strong>Southern Basin Limited</strong> is an indigenous Oil & Gas Company engaged in Engineering, Construction, 
                  Project Management, Logistic and Procurement with 100% stock of Nigeria shareholding. 
                  The firm was incorporated in Nigeria since {COMPANY_INFO.foundedYear} with registration number {COMPANY_INFO.registrationNumber}.
                </p>
                <p>
                  Southern Basin provides specialized solution to Engineering Construction needs in the Civil, 
                  Mechanical fabrication & Upgrade and Logistic sectors of the Construction industry of today. This specialty, we demonstrate in 
                  road construction, building and infrastructural development, pipeline engineering/construction, petroleum & energy to Government 
                  Agencies, major organization and main contractors.
                </p>
                <p>
                  The firm is relatively young in business; its incorporation is a product of immeasurable practical experience 
                  possessed by its directors in the fields of engineering construction, project management and logistics over a 
                  period of 12 years pre-incorporation, managing and supervising major construction projects with other employers.
                </p>
              </div>
            </div>
            <div>
              <img 
                src="/uploads/about.jpg"
                alt="About Southern Basin"
                className="w-full h-full object-cover shadow-2xl"
              />
            </div>
          </div>

          {/* Partners Diagram */}
          <div className="mb-20">
            <div className="text-center mb-8">
              <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-4">Our Technical Partners</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Strategic alliances with leading global organizations.
              </p>
            </div>
            <div className="flex justify-center">
              <img
                src="/moremedia/about-page-diagram.png"
                alt="Southern Basin Technical Partners Diagram"
                className="w-full max-w-4xl shadow-xl rounded-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <Card className="border-0 shadow-xl rounded-sm overflow-hidden">
              <CardContent className="p-0">
                <div className="h-2 bg-gradient-to-r from-primary to-cyan-500"></div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-secondary mb-4">Our Vision</h3>
                  <p className="text-gray-600 leading-relaxed">
                    To be the leading indigenous engineering and construction company in Nigeria and West Africa, 
                    delivering world-class solutions while promoting local content development.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl rounded-sm overflow-hidden">
              <CardContent className="p-0">
                <div className="h-2 bg-gradient-to-r from-secondary to-indigo-600"></div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-secondary mb-4">Our Mission</h3>
                  <p className="text-gray-600 leading-relaxed">
                    To provide innovative, high-quality engineering and construction services that exceed client expectations 
                    while maintaining the highest standards of safety, integrity, and environmental responsibility.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-xl rounded-sm overflow-hidden">
              <CardContent className="p-0">
                <div className="h-2 bg-gradient-to-r from-purple-600 to-pink-600"></div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-secondary mb-4">Our Values</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Excellence, Integrity, Innovation, Safety, and Sustainability guide every aspect of our business, 
                    ensuring we deliver value to all stakeholders.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-100 bg-accent/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-4">Our Key Strengths</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              What sets us apart in the competitive engineering and construction landscape.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl font-bold text-primary">📋</span>
              </div>
              <h3 className="text-xl font-bold text-secondary mb-4">Equipment Ownership</h3>
              <p className="text-gray-600">
                45% minimum owned equipment with strategic partnerships for optimal project execution.
              </p>
            </div>

            <div className="text-center p-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl font-bold text-primary">🤝</span>
              </div>
              <h3 className="text-xl font-bold text-secondary mb-4">Technical Partnership</h3>
              <p className="text-gray-600">
                Strategic alliances with leading global companies to deliver world-class solutions.
              </p>
            </div>

            <div className="text-center p-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-2xl font-bold text-primary">👥</span>
              </div>
              <h3 className="text-xl font-bold text-secondary mb-4">Recruitment Policy</h3>
              <p className="text-gray-600">
                Professional management personnel and technical tradesmen with vast experience in their specialties.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our experienced leadership team brings decades of combined expertise in engineering, construction, and project management.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEAM_MEMBERS.map((member, index) => (
              <Card key={index} className="border-0 shadow-lg rounded-xl overflow-hidden group hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-0 flex flex-col h-full">
                  <div className="relative pt-8 px-8">
                    <div className="relative mx-auto w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white shadow-lg">
                      <img 
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </div>

                  <div className="flex-1 p-6 text-center bg-gradient-to-b from-white to-gray-50">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                      <p className="text-primary font-medium text-sm uppercase tracking-wider">{member.position}</p>
                    </div>
                    
                    <p className="text-gray-600 text-sm md:text-base mb-6 line-clamp-3">{member.bio}</p>
                    
                    <div className="flex justify-center space-x-3">
                      {member.website && (
                        <a href={member.website} target="_blank" rel="noopener noreferrer" 
                          className="p-2 rounded-full bg-gray-100 hover:bg-primary/10 text-gray-500 hover:text-primary transition-all">
                          <Globe className="w-4 h-4" />
                        </a>
                      )}
                      {member.linkedin && (
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" 
                          className="p-2 rounded-full bg-gray-100 hover:bg-blue-600/10 text-gray-500 hover:text-blue-600 transition-all">
                          <Linkedin className="w-4 h-4" />
                        </a>
                      )}
                      {member.twitter && (
                        <a href={member.twitter} target="_blank" rel="noopener noreferrer" 
                          className="p-2 rounded-full bg-gray-100 hover:bg-blue-400/10 text-gray-500 hover:text-blue-400 transition-all">
                          <Twitter className="w-4 h-4" />
                        </a>
                      )}
                      {member.whatsapp && (
                        <a href={member.whatsapp} target="_blank" rel="noopener noreferrer" 
                          className="p-2 rounded-full bg-gray-100 hover:bg-green-500/10 text-gray-500 hover:text-green-500 transition-all">
                          <MessageCircle className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;