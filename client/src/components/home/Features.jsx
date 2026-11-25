
import {
  ShieldCheck,
  Wallet,
  BarChart3,
  Headset,
  Globe,
  Zap
} from "lucide-react";
import { motion } from "motion/react";
import { fadeUp, staggerContainer } from "../../utils/animations";

const features = [
  {
    icon: ShieldCheck,
    title: "Secure Payments",
    description: "Secure checkout and verified payment processing."
  },
  {
    icon: Wallet,
    title: "Flexible Payments",
    description: "Support for multiple currencies and payment options."
  },
  {
    icon: BarChart3,
    title: "Campaign Tracking",
    description: "Track your campaign status and delivery progress."
  },
  {
    icon: Headset,
    title: "Customer Support",
    description: "Get assistance when you need help with an order."
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Discover creators and marketing opportunities worldwide."
  },
  {
    icon: Zap,
    title: "Simple Experience",
    description: "Manage campaigns from one convenient dashboard."
  }
];

export default function Features() {
  return (
    <section id="about" className="border-y border-white/5 bg-[#0e0e17] px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">

        <motion.div variants={staggerContainer} className="max-w-2xl">
          <motion.span variants={fadeUp} className="text-sm font-bold uppercase tracking-[3px] text-violet-400">
            Why Choose Us
          </motion.span>

          <h2 className="mt-4 text-3xl font-black sm:text-5xl">
            Built for Smarter
            <span className="gradient-text"> Growth</span>
          </h2>

          <p className="mt-5 leading-7 text-zinc-400">
            Everything in one platform to simplify your social
            media marketing workflow.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl border border-white/10 bg-[#14141f] p-7 transition hover:border-violet-500/40"
              >
                <div className="mb-5 inline-flex rounded-xl bg-violet-500/10 p-3 text-violet-400">
                  <Icon size={25} />
                </div>

                <h3 className="text-lg font-bold">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-zinc-400">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

