import React from "react";
import { motion } from "motion/react";
import {
  fadeUp,
  hoverScale,
  scaleIn,
  slideLeft,
  staggerContainer,
  staggerItem,
} from "../../utils/animations";
import { ArrowRight, Play, ShieldCheck, TrendingUp, Users } from "lucide-react";

function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden px-5 pb-24 lg:px-8 lg:pb-32 lg:pt-32"
    >
      {/* background glow */}
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, -30, 0], scale: [1, 1.15, 1] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-violet-600/20 blur-[120px]"
      />

      <div className=" relative mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
        {/* Left content */}

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* badge */}
          <motion.div
            variants={fadeUp}
            className=" mb-7 inline-flex items-center gap-2 rounded-full border border-violet-500/10 px-4 py-2 text-xs font-semibold text-violet-300 uppercase"
          >
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              className=" h-2 w-2 rounded-full bg-violet-400 "
            />
            Social Media Growth Platform
          </motion.div>

          {/* Heading  */}
          <motion.h1
            variants={fadeUp}
            className=" max-w-2xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-7xl"
          >
            Grow Your
            <span className="gradient-text"> Social Presence</span>
            <br />
            The Smart Way.
          </motion.h1>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            className="mt-7 max-w-xl text-base leading-8 text-zinc-400 lg:text-lg"
          >
            Discover creator promotions, social media marketing campaigns and
            authentic audience growth services from one simple platform.
          </motion.p>

          {/* Button */}
          <motion.div variants={fadeUp} className="mt-9 flex flex-wrap gap-4">
            <motion.a
              href="#services"
              {...hoverScale}
              className=" group flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3 font-bold transition hover:bg-violet-500"
            >
              Explore Services
              <motion.span whileHover={{ x: 5 }} transition={{ duration: 0.2 }}>
                <ArrowRight size={19} />
              </motion.span>
            </motion.a>

            <motion.a
              href="#how-it-works"
              whileHover={{ scale: 1.04, y: -3 }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-2 rounded-xl border border-white/10 px-6 py-4 font-semibold text-zinc-300 transition hover:bg-white/5"
            >
              <Play size={17} />
              How It Works
            </motion.a>
          </motion.div>

          {/* features */}
          <motion.div
            variants={staggerContainer}
            className=" mt-12 flex flex-wrap gap-6"
          >
            <motion.div
              variants={staggerItem}
              className=" flex items-center gap-2 text-sm text-zinc-400"
            >
              <ShieldCheck className="text-violet-400" size={19} />
              Secure Checkout
            </motion.div>

            <motion.div
              variants={staggerItem}
              className="flex items-center gap-2 text-sm text-zinc-400"
            >
              <TrendingUp className="text-violet-400" size={19} />
              Campaign Tracking
            </motion.div>
          </motion.div>
        </motion.div>


        {/* Right Dashboard Preview */}
        <motion.div
        variants={slideLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="relative"
        >

            {/* Dashboard glow */}
            <motion.div 
            animate={{
              opacity: [0.3, 0.6, 0.3],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className=" absolute inset-0 rounded-full bg-violet-600/20 blur-[100px]"
            />

            {/* Dashboard */}
            <motion.div
            variants={scaleIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.4 }}
            className="glass glow relative rounded-3xl p-5 sm:p-7"
            >

                {/* dashboard header */}
                <div className=" flex items-center justify-between">
                    <div>
                        <p className=" text-sm text-zinc-400">Campaign Overview</p>
                        <h3 className=" mt-1 text-xl font-bold">Your Growth Hub</h3>
                    </div>

                    <motion.div whileHover={{rotate: 15, scale: 1.1}}
                    className=" rounded-xl bg-violet-500/10 p-3 text-violet-400"
                    >
                    <TrendingUp size={24} />
                    </motion.div>
                </div>

                {/* stats Cards */}
                <motion.div
                variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-8 grid grid-cols-2 gap-4"
              >

                <motion.div 
                variants={staggerItem}
                whileHover={{ y: -5 }}
                className="rounded-2xl bg-white/5 p-4"
                >
                    <Users className="mb-4 text-violet-400" size={22} />
                    <p className="text-xs text-zinc-400">
                  Active Campaigns
                </p>

                <h3 className="mt-2 text-2xl font-bold">
                  08
                </h3>
                </motion.div>

                <motion.div 
                variants={staggerItem}
                whileHover={{ y: -5 }}
                className="rounded-2xl bg-white/5 p-4"
                >
                    <TrendingUp className="mb-4 text-emerald-400" size={22} />

                    <p className="text-xs text-zinc-400">
                  Completed
                </p>

                <h3 className="mt-2 text-2xl font-bold">
                  24
                </h3>
                </motion.div>
              </motion.div>

                {/*  Campaign Progress*/}

                <motion.div
                variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-5 rounded-2xl border border-white/5 bg-white/[0.03] p-5"
              >
                 <div className="flex justify-between gap-2">
                    <div>
                        <p className="text-sm font-semibold">
                    Creator Promotion
                  </p>

                  <p className="mt-1 text-xs text-zinc-500">
                    Campaign preview
                  </p>
                    </div>

                    <span className="h-fit rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-400">
                  Example
                </span>
                 </div>

                 <div className="mt-6 h-2 overflow-hidden rounded-full bg-zinc-800">
                    <motion.div 
                    initial={{ width: 0 }}
                  whileInView={{ width: "70%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.3, ease: "easeOut" }}
                  className="h-full rounded-full bg-violet-500" />
                 </div>

                 <div className="mt-3 flex justify-between text-xs text-zinc-500">
                    <span>Campaign progress</span>
                <span>70%</span>
                 </div>

                 <p className="mt-4 text-center text-xs text-zinc-600">
              Illustrative dashboard preview · Not live metrics
            </p>
              </motion.div>
            </motion.div>

            
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
