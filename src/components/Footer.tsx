
import React from 'react';
import { Linkedin, Instagram, Facebook, Twitter, Youtube, Shield } from 'lucide-react';
import SocialIconWithFeed from './SocialIconWithFeed';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black border-t border-white/10 pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="lg:col-span-1">
                <div className="flex items-center gap-2 mb-6">
                    <Shield className="w-6 h-6 text-bg-gold" />
                    <span className="text-lg font-serif text-white">BENSON GLOBAL</span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">
                    Where Global Wealth Meets Regenerative Impact. Designed for those shaping the future.
                </p>
            </div>
            
            <div>
                <h4 className="text-white font-serif text-lg mb-6">Solutions</h4>
                <ul className="space-y-4 text-sm text-gray-500">
                    <li className="hover:text-bg-gold cursor-pointer transition-colors">Public Markets</li>
                    <li className="hover:text-bg-gold cursor-pointer transition-colors">Private Markets</li>
                    <li className="hover:text-bg-gold cursor-pointer transition-colors">Climate & Infrastructure</li>
                    <li className="hover:text-bg-gold cursor-pointer transition-colors">Sports (TG4)</li>
                </ul>
            </div>

            <div>
                <h4 className="text-white font-serif text-lg mb-6">Company</h4>
                <ul className="space-y-4 text-sm text-gray-500">
                    <li className="hover:text-bg-gold cursor-pointer transition-colors">About Us</li>
                    <li className="hover:text-bg-gold cursor-pointer transition-colors">Partnership Network</li>
                    <li className="hover:text-bg-gold cursor-pointer transition-colors">Careers</li>
                    <li className="hover:text-bg-gold cursor-pointer transition-colors">Contact</li>
                </ul>
            </div>

            <div>
                <h4 className="text-white font-serif text-lg mb-6">Legal</h4>
                <ul className="space-y-4 text-sm text-gray-500">
                    <li className="hover:text-bg-gold cursor-pointer transition-colors">Privacy Policy</li>
                    <li className="hover:text-bg-gold cursor-pointer transition-colors">Terms of Service</li>
                    <li className="hover:text-bg-gold cursor-pointer transition-colors">Disclosures</li>
                    <li className="hover:text-bg-gold cursor-pointer transition-colors">Investor Login</li>
                </ul>
            </div>
        </div>

        <div className="border-t border-white/10 pt-10 flex flex-col-reverse md:flex-row justify-between items-center gap-6">
            <p className="text-gray-600 text-xs text-center md:text-left">© 2025 Benson Global Inc. All rights reserved.</p>
            <div className="flex gap-4">
                <SocialIconWithFeed platform="linkedin" Icon={Linkedin} placement="top" colorClass="text-gray-500" />
                <SocialIconWithFeed platform="instagram" Icon={Instagram} placement="top" colorClass="text-gray-500" />
                <SocialIconWithFeed platform="facebook" Icon={Facebook} placement="top" colorClass="text-gray-500" />
                <SocialIconWithFeed platform="x" Icon={Twitter} placement="top" colorClass="text-gray-500" />
                <SocialIconWithFeed platform="youtube" Icon={Youtube} placement="top" colorClass="text-gray-500" />
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
