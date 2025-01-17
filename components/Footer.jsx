"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaHeart } from 'react-icons/fa';
import Socials from './Socials';

const Footer = () => {
  return (
    <footer className="w-full bg-card/50 backdrop-blur-lg border-t border-border">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Mahad Sheikh</h3>
            <p className="text-muted">
              Crafting digital experiences with passion and precision.
            </p>
            <Socials />
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-muted hover:text-accent transition-colors">
                  About Me
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-muted hover:text-accent transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/work" className="text-muted hover:text-accent transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Get in Touch</h3>
            <ul className="space-y-2">
              <li className="text-muted">
                <a href="mailto:mahad112002@gmail.com" className="hover:text-accent transition-colors">
                  mahad112002@gmail.com
                </a>
              </li>
              <li className="text-muted">
                <a href="tel:+923105589303" className="hover:text-accent transition-colors">
                  +92 310 5589303
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-muted flex items-center justify-center gap-2">
            Made with <FaHeart className="text-accent animate-pulse" /> by Mahad Sheikh
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;