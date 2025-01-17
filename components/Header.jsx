"use client";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { HiSun, HiMoon, HiMenu, HiX } from "react-icons/hi";
import { useTheme } from './ThemeProvider';
import Socials from "./Socials";
import Logo from "./Logo";
import { useState } from "react";
import { navData } from "./Nav";

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const sidebarVariants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4 h-20">
        <div className="flex items-center justify-between h-full">
          <Link href="/" className="flex items-center space-x-2">
            <Logo />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Socials />
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-secondary transition-colors duration-200"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              <motion.div
                initial={false}
                animate={{ rotate: theme === 'dark' ? 0 : 180 }}
                transition={{ duration: 0.3 }}
              >
                {theme === 'dark' ? (
                  <HiMoon className="w-6 h-6" />
                ) : (
                  <HiSun className="w-6 h-6" />
                )}
              </motion.div>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors duration-200"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <HiX className="w-6 h-6" />
            ) : (
              <HiMenu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={sidebarVariants}
            className="fixed top-20 right-0 w-full h-[calc(100vh-5rem)] md:hidden bg-background/95 backdrop-blur-lg border-l border-border z-40 overflow-y-auto"
          >
            <div className="flex flex-col h-full">
              {/* Theme Toggle */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-6"
              >
                <button
                  onClick={toggleTheme}
                  className="w-full p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border hover:border-accent/50 transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    {/* Theme Toggle Content */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                        <HiSun className="w-6 h-6 text-accent" />
                      </div>
                      <span className="font-medium">Light Mode</span>
                    </div>

                    {/* Toggle Switch */}
                    <div className="relative">
                      <div className={`w-14 h-7 rounded-full transition-colors duration-300 ${theme === 'dark' ? 'bg-accent' : 'bg-gray-200'}`}>
                        <div className={`absolute top-1 left-1 w-5 h-5 rounded-full bg-white transform transition-transform duration-300 ${theme === 'dark' ? 'translate-x-7' : 'translate-x-0'}`} />
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-medium">Dark Mode</span>
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                        <HiMoon className="w-6 h-6 text-accent" />
                      </div>
                    </div>
                  </div>
                </button>
              </motion.div>

              {/* Navigation Links */}
              <nav className="flex-1 overflow-y-auto px-6">
                <ul className="space-y-4">
                  {navData.map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * (index + 3) }}
                    >
                      <Link
                        href={item.path}
                        className="flex items-center space-x-4 p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border hover:border-accent/50 transition-all duration-300"
                        onClick={() => setIsOpen(false)}
                      >
                        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                          <item.Icon className="w-6 h-6 text-accent" />
                        </div>
                        <span className="capitalize font-medium">{item.name}</span>
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              {/* Bottom Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="p-6 border-t border-border"
              >
                <div className="flex items-center justify-center">
                  <Socials />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}