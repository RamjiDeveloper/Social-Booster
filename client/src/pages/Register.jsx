import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { User, Mail, Lock } from "lucide-react";
import PublicLayout from "../layouts/PublicLayout";

function Register() {
  return (
    <PublicLayout>
      <section className="flex min-h-[80vh] items-center justify-center px-5 py-16">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md rounded-2xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl shadow-purple-950/20"
        >
          <h1 className="text-3xl font-bold">Create Account</h1>
          <p className="mt-2 text-gray-400">
            Start managing your marketing campaigns.
          </p>

          <form
            className="mt-8 space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Registration will be connected to the backend later.");
            }}
          >
            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Full Name
              </label>
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 px-4">
                <User size={18} className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Your name"
                  required
                  className="w-full bg-transparent py-4 text-white outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Email Address
              </label>
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 px-4">
                <Mail size={18} className="text-gray-500" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="w-full bg-transparent py-4 text-white outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Password
              </label>
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 px-4">
                <Lock size={18} className="text-gray-500" />
                <input
                  type="password"
                  placeholder="Create password"
                  minLength={8}
                  required
                  className="w-full bg-transparent py-4 text-white outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-purple-600 py-4 font-semibold transition hover:bg-purple-500"
            >
              Create Account
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-purple-400 hover:text-purple-300"
            >
              Login
            </Link>
          </p>
        </motion.div>
      </section>
    </PublicLayout>
  );
}

export default Register;