"use client";
import { Sora } from "next/font/google";
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../lib/theme';
import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";
import { motion, AnimatePresence } from "framer-motion";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export default function Layout({ children }) {
  const { theme } = useContext(ThemeContext);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className={`${sora.variable} font-sora relative flex flex-col min-h-screen bg-background overflow-x-hidden`}>
      <Header />
      <Nav />
      
      <main className="flex-grow relative">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="relative z-10"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />

      {/* Background decoration */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-accent/5 rounded-full filter blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-accent/5 rounded-full filter blur-3xl transform translate-x-1/2 translate-y-1/2" />
      </div>
    </div>
  );
}