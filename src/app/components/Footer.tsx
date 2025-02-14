import React from "react";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface FooterProps {
  companyName?: string;
  description?: string;
  sections?: FooterSection[];
  contactInfo?: {
    email?: string;
    phone?: string;
    address?: string;
  };
}

const defaultSections: FooterSection[] = [
  {
    title: "Resources",
    links: [
      { label: "Google Drive", href: "#" },
      { label: "Members Profile", href: "/profile" },
      { label: "Pricing", href: "#" },
      { label: "Tutorials", href: "#" },
    ],
  },
];

const Footer: React.FC<FooterProps> = ({
  companyName = "Your Company",
  description = "Making the world a better place through constructing elegant hierarchies.",
  sections = defaultSections,
  contactInfo = {
    email: "hello@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Business Street, Suite 100, City, ST 12345",
  },
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h2 className="text-white text-xl font-bold mb-4">{companyName}</h2>
            <p className="text-gray-400 mb-6">{description}</p>

            {/* Contact Information */}
            <div className="space-y-3">
              {contactInfo.email && (
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-2 text-gray-400" />
                  <a href={`mailto:${contactInfo.email}`} className="hover:text-white transition-colors">
                    {contactInfo.email}
                  </a>
                </div>
              )}
              {contactInfo.phone && (
                <div className="flex items-center">
                  <Phone className="h-5 w-5 mr-2 text-gray-400" />
                  <a href={`tel:${contactInfo.phone}`} className="hover:text-white transition-colors">
                    {contactInfo.phone}
                  </a>
                </div>
              )}
              {contactInfo.address && (
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2 text-gray-400" />
                  <span>{contactInfo.address}</span>
                </div>
              )}
            </div>
          </div>

          {/* Footer Sections */}
          {sections.map((section, index) => (
            <div key={index}>
              <h3 className="text-white text-sm font-semibold uppercase tracking-wider mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href={link.href} className="text-gray-400 hover:text-white transition-colors">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Media & Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6 mb-4 md:mb-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>

            <p className="text-gray-400 text-sm">
              © {currentYear} {companyName}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
