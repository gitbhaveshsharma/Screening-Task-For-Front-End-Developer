import React from 'react';
import { Github, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 py-4">
      <div className="container mx-auto flex justify-center items-center space-x-4">
        <a href="https://github.com/gitbhaveshsharma" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 no-underline">
          <Github className="text-xs hover:text-[#ff6B82]" />
        </a>
        <a href="https:/www.linkedin.com/in/bhavesh-sharma-b5b3a7222/" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 no-underline">
          <Linkedin className="text-xs hover:text-[#ff6B82]" />
        </a>
        <span className="text-xs hover:text-[#ff6B82]">Bhavesh Sharma</span>
      </div>
    </footer>
  );
};

export default Footer;
