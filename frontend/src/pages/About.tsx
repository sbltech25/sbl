
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { COMPANY_INFO, TEAM_MEMBERS } from '@/lib/constants';
import { Globe, Linkedin, Twitter, MessageCircle } from 'lucide-react';


const About = () => {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-secondary to-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About Us</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            Know more about who we are and what we stand for in the engineering and construction industry.
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-6">Our Story</h2>
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                <p>
                  <strong>SOUTHERN BASIN CONSTRUCTION LIMITED</strong> is an indigenous Engineering, Construction, 
                  Project Management, Logistics and Procurement Company with 100% stock of Nigerian shareholding. 
                  The firm was incorporated in Nigeria since {COMPANY_INFO.foundedYear} with registration number {COMPANY_INFO.registrationNumber}.
                </p>
                <p>
                  Southern Basin Construction provides specialized solution to Engineering Construction needs in the Civil, 
                  Mechanical and Logistics sectors of the Construction industry of today. This specialty, we demonstrate in 
                  road construction, building and infrastructural development, pipeline engineering/construction to Government 
                  Agencies, top organizations and main contractors.
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
                src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=800&h=600&fit=crop"
                alt="About Southern Basin"
                className="w-full h-96 object-cover shadow-2xl"
              />
            </div>
          </div>

          {/* Vision, Mission, Values */}
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

      {/* Key Strengths */}
      <section className="py-20 bg-accent/50">
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

   

      {/* Team Section */}
      
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
              <Card key={index} className="border-0 shadow-xl rounded-sm overflow-hidden group hover:shadow-2xl transition-shadow duration-300">
                <CardContent className="p-0">
                  <div className="aspect-square overflow-hidden">
                    <img 
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold text-secondary mb-2">{member.name}</h3>
                    <p className="text-primary font-medium mb-4">{member.position}</p>
                    <p className="text-gray-600 mb-4">{member.bio}</p>
                    
                    {/* Social Links */}
                    <div className="flex justify-center space-x-4">
                      {member.website && (
                        <a href={member.website} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary transition-colors">
                          <Globe className="w-5 h-5" />
                        </a>
                      )}
                      {member.linkedin && (
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-600 transition-colors">
                          <Linkedin className="w-5 h-5" />
                        </a>
                      )}
                      {member.twitter && (
                        <a href={member.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-400 transition-colors">
                          <Twitter className="w-5 h-5" />
                        </a>
                      )}
                      {member.whatsapp && (
                        <a href={member.whatsapp} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-green-500 transition-colors">
                          <MessageCircle className="w-5 h-5" />
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
