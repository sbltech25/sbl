import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { COMPANY_INFO } from '@/lib/constants';


  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    // { name: 'How We Work', path: '/how-we-work' },
    { name: 'Projects', path: '/projects' },
    { name: 'Equipments', path: '/equipments' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Certifications', path: '/certifications' },
    // { name: 'Vendor Form', path: '/vendor-registration' },
    // { name: 'Articles', path: '/articles' },
    { name: 'Contact', path: '/contact' }
  ];


const Footer = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const hiddenPaths = ['/secured/v1/admin', '/secured/v1/login', '/s/login', '/s/client/dashboard'];

  const handleNewsletterSubmit = async () => {
  if (!email) return;

  setLoading(true);

  try {
    const response = await fetch(
      'https://formspree.io/f/mnjwrwbb',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          newsletterEmail: email,
        }),
      }
    );

    if (!response.ok) {
      throw new Error('Subscription failed');
    }

    setEmail('');

    alert('Subscribed successfully!');
  } catch (error) {
    alert('Failed to subscribe.');
  } finally {
    setLoading(false);
  }
};

  if (hiddenPaths.includes(location.pathname)) return null;


  return (
    <footer className="bg-[#212685] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4 ">
            <img 
              src="/uploads/91a86cb5-51d9-4ccb-a86e-e0d29f1d71e9.png" 
              alt={COMPANY_INFO.name}
              className="h-12 w-auto bg-white dark:bg-trasparent"
            />
            <p className="text-sm text-gray-300">
              {COMPANY_INFO.tagline}
            </p>
            <p className="text-xs text-gray-400">
              RC {COMPANY_INFO.registrationNumber} | Incorporated {COMPANY_INFO.foundedYear}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {navItems.map((linke, i) => {
              
                return (
                <li><Link to={linke.path} className="text-sm text-gray-300 hover:text-primary transition-colors">{linke.name}</Link></li>
                )
              })}
                          </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-1 text-primary" />
                <span className="text-sm text-gray-300">{COMPANY_INFO.address}</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-1 text-primary" />
                <span className="text-sm text-gray-300">{COMPANY_INFO.addressi}</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-1 text-primary" />
                <span className="text-sm text-gray-300">{COMPANY_INFO.addressii}</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-sm text-gray-300">{COMPANY_INFO.phone}</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-sm text-gray-300">{COMPANY_INFO.email}, {COMPANY_INFO.email2}</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-sm text-gray-300 mb-4">
              Get our latest updates and news directly to your inbox, for free.
            </p>
           <div className="flex space-x-2">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@email.com"
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 rounded-sm"
            />

            <Button
              onClick={handleNewsletterSubmit}
              disabled={loading}
              variant="default"
              size="sm"
              className="bg-primary hover:bg-primary/90 rounded-sm"
            >
              {loading ? '...' : 'Subscribe'}
            </Button>
          </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            Copyright © {new Date().getFullYear()} {COMPANY_INFO.name}. All rights reserved.
          </p>
          
          {/* Social Links */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a 
              href={COMPANY_INFO.social.facebook} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary transition-colors"
            >
              Facebook
            </a>
            <a 
              href={COMPANY_INFO.social.twitter} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary transition-colors"
            >
              Twitter
            </a>
            <a 
              href={COMPANY_INFO.social.whatsapp} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
