
import {
  Megaphone,
  ArrowUpRight,
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaYoutube   } from "react-icons/fa";


import { motion } from "motion/react";

import {
  fadeUp,
  staggerContainer,
  staggerItem,
  hoverLift,
} from "../../utils/animations";

const platforms = [
  {
    name: "Instagram",
    description:
      "Creator promotions, content campaigns and audience discovery.",
    icon: FaInstagram ,
    color: "text-pink-400",
    bg: "bg-pink-500/10",
    services: [
      "Creator Promotion",
      "Reels Campaigns",
      "Content Marketing",
    ],
  },
  {
    name: "YouTube",
    description:
      "Video promotion and authentic channel discovery campaigns.",
    icon: FaYoutube ,
    color: "text-red-400",
    bg: "bg-red-500/10",
    services: [
      "Video Promotion",
      "Creator Collaboration",
      "Channel Marketing",
    ],
  },
  {
    name: "Facebook",
    description:
      "Page promotion, creator partnerships and social campaigns.",
    icon: FaFacebookF ,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    services: [
      "Page Promotion",
      "Content Campaigns",
      "Creator Partnerships",
    ],
  },
  {
    name: "Creator Marketing",
    description:
      "Connect with creators and build real marketing campaigns.",
    icon: Megaphone,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    services: [
      "Sponsored Posts",
      "Brand Promotion",
      "Influencer Marketing",
    ],
  },
];

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden px-5 py-24 lg:px-8">

      {/* Background Glow */}
      <motion.div
        animate={{
          opacity: [0.2, 0.4, 0.2],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-violet-600/10 blur-[120px]"
      />

      <div className="relative mx-auto max-w-7xl">

        {/* Section Heading */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mb-14 text-center"
        >
          <motion.span
            variants={fadeUp}
            className="text-sm font-bold uppercase tracking-[3px] text-violet-400"
          >
            Our Services
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="mt-4 text-3xl font-black sm:text-5xl"
          >
            Everything You Need to
            <span className="gradient-text"> Grow</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-5 max-w-2xl text-zinc-400"
          >
            Explore marketing solutions designed to help creators
            and businesses reach their target audience.
          </motion.p>
        </motion.div>

        {/* Service Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {platforms.map((platform) => {
            const Icon = platform.icon;

            return (
              <motion.div
                key={platform.name}
                variants={staggerItem}
                {...hoverLift}
                className="group rounded-2xl border border-white/10 bg-[#14141f] p-6 transition-colors duration-300 hover:border-violet-500/50"
              >
                {/* Icon */}
                <motion.div
                  whileHover={{
                    scale: 1.12,
                    rotate: 8,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                  }}
                  className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${platform.bg}`}
                >
                  <Icon
                    size={29}
                    className={platform.color}
                  />
                </motion.div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white">
                  {platform.name}
                </h3>

                {/* Description */}
                <p className="mt-3 min-h-20 text-sm leading-6 text-zinc-400">
                  {platform.description}
                </p>

                {/* Services List */}
                <motion.div
                  variants={staggerContainer}
                  className="mt-5 space-y-3"
                >
                  {platform.services.map((service) => (
                    <motion.div
                      key={service}
                      variants={staggerItem}
                      className="flex items-center gap-2 text-sm text-zinc-300"
                    >
                      <motion.span
                        whileHover={{ scale: 1.5 }}
                        className="h-1.5 w-1.5 rounded-full bg-violet-400"
                      />
                      {service}
                    </motion.div>
                  ))}
                </motion.div>

                {/* Explore Link */}
                <motion.a
                  href="/services"
                  whileHover={{ x: 4 }}
                  className="mt-8 flex items-center justify-between border-t border-white/10 pt-5 text-sm font-semibold text-violet-400"
                >
                  Explore Services

                  <motion.span
                    whileHover={{
                      x: 5,
                      y: -3,
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowUpRight size={19} />
                  </motion.span>
                </motion.a>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
