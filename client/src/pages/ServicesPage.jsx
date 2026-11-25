import { motion } from "motion/react";
import { Users } from "lucide-react";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import PublicLayout from "../layouts/PublicLayout";

const services = [
  {
    icon: FaInstagram,
    title: "Instagram Marketing",
    description:
      "Creator collaborations, Reels promotion and Instagram campaign management.",
    tags: ["Reels Campaigns", "Creator Promotion"],
  },
  {
    icon: FaYoutube,
    title: "YouTube Marketing",
    description:
      "Video promotion, creator partnerships and audience-focused campaigns.",
    tags: ["Video Promotion", "Creator Partnerships"],
  },
  {
    icon: FaFacebook,
    title: "Facebook Marketing",
    description:
      "Page promotion, content campaigns and social media management.",
    tags: ["Content Campaigns", "Page Marketing"],
  },
  {
    icon: Users,
    title: "Creator Marketing",
    description:
      "Connect brands with relevant creators for genuine promotional campaigns.",
    tags: ["Brand Deals", "Influencer Campaigns"],
  },
];

function ServicesPage() {
  return (
    <PublicLayout>
      <section className="px-5 py-20 md:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[3px] text-purple-400">
              Our Services
            </p>

            <h1 className="text-4xl font-bold md:text-6xl">
              Grow Your Brand With{" "}
              <span className="gradient-text">Smart Marketing</span>
            </h1>

            <p className="mt-5 text-gray-400">
              Choose a campaign that matches your business goals and target
              audience.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => {
              const Icon = service.icon;

              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-purple-500/50"
                >
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-purple-500/15 text-purple-400">
                    <Icon size={28} />
                  </div>

                  <h2 className="mb-3 text-xl font-semibold">
                    {service.title}
                  </h2>

                  <p className="mb-6 text-sm leading-7 text-gray-400">
                    {service.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-white/5 px-3 py-2 text-xs text-gray-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}

export default ServicesPage;