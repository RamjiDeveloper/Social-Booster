import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Zap, ChevronDown } from "lucide-react";

import {
  navbarAnimation,
  staggerContainer,
  staggerItem,
  hoverScale,
} from "../../utils/animations";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "How It Works", href: "/#how-it-works" },
    { name: "About", href: "/#about" },
  ];

  return (
    <motion.nav
      variants={navbarAnimation}
      initial="hidden"
      animate="visible"
      className="sticky top-0 z-50 border-b border-white/10 bg-[#09090f]/90 backdrop-blur-xl"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        {/* Logo */}
        <motion.div>
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600">
              <Zap size={23} fill="white" />
            </div>

            <span className="text-xl font-extrabold tracking-tight text-white">
              Social<span className="text-violet-400">Booster</span>
            </span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="hidden items-center gap-8 lg:flex"
        >
          {links.map((link) => (
            <motion.a
              key={link.name}
              variants={staggerItem}
              href={link.href}
              whileHover={{ y: -3 }}
              className="group relative text-sm font-medium text-zinc-400 transition hover:text-white"
            >
              {link.name}

              <span className="absolute -bottom-2 left-0 h-0.5 w-0 bg-violet-500 transition-all duration-300 group-hover:w-full" />
            </motion.a>
          ))}

          <motion.a
            variants={staggerItem}
            href="#services"
            className="flex items-center gap-1 text-sm text-zinc-400 transition hover:text-white"
          >
            Platforms
            <ChevronDown size={15} />
          </motion.a>
        </motion.div>

        {/* Desktop Actions */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="hidden items-center gap-3 lg:flex"
        >
          <motion.a
            variants={staggerItem}
            href="/login"
            whileHover={{ scale: 1.05 }}
            className="px-4 py-2 text-sm font-semibold text-zinc-300 hover:text-white"
          >
            Login
          </motion.a>

          <motion.a
            variants={staggerItem}
            href="/register"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 25px rgba(139,92,246,0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-violet-500"
          >
            Get Started
          </motion.a>
        </motion.div>

        {/* Mobile Toggle */}
        <motion.button
          type="button"
          whileTap={{ scale: 0.9 }}
          onClick={() => setMenuOpen((prev) => !prev)}
          className="rounded-lg border border-white/10 p-2 text-white lg:hidden"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={menuOpen ? "close" : "menu"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </motion.span>
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden border-t border-white/10 bg-[#101019] lg:hidden"
          >
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-5 p-5"
            >
              {links.map((link) => (
                <motion.a
                  key={link.name}
                  variants={staggerItem}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-medium text-zinc-300 transition hover:text-violet-400"
                >
                  {link.name}
                </motion.a>
              ))}

              <motion.a
                variants={staggerItem}
                href="#services"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 text-sm text-zinc-300"
              >
                Platforms <ChevronDown size={15} />
              </motion.a>

              <hr className="border-white/10" />

              <motion.a
                variants={staggerItem}
                href="/login"
                className="text-sm text-zinc-300"
              >
                Login
              </motion.a>

              <motion.a
                variants={staggerItem}
                href="/register"
                whileTap={{ scale: 0.97 }}
                className="rounded-xl bg-violet-600 p-3 text-center font-bold text-white"
              >
                Get Started
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
