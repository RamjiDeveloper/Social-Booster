
import { Zap} from "lucide-react";
import { FaFacebookF, FaInstagram, FaYoutube   } from "react-icons/fa";


export default function Footer() {
  return (
    <footer
      id="about"
      className="border-t border-white/10 bg-[#0e0e17] px-5 py-12 lg:px-8"
    >
      <div className="mx-auto grid max-w-7xl gap-10 sm:grid-cols-2 lg:grid-cols-4">

        <div className="lg:col-span-2">
          <a href="#home" className="flex items-center gap-2">
            <div className="rounded-xl bg-violet-600 p-2">
              <Zap size={21} />
            </div>

            <span className="text-xl font-extrabold">
              Social<span className="text-violet-400">Booster</span>
            </span>
          </a>

          <p className="mt-5 max-w-sm text-sm leading-7 text-zinc-400">
            A social media marketing marketplace for creator
            promotions, brand campaigns and audience discovery.
          </p>

          <div className="mt-6 flex gap-4 text-zinc-400">
            <FaInstagram size={20} />
            <FaYoutube size={20} />
            <FaFacebookF size={20} />
          </div>
        </div>

        <div>
          <h3 className="font-bold">Quick Links</h3>

          <div className="mt-5 flex flex-col gap-4 text-sm text-zinc-400">
            <a href="#home" className="hover:text-white">Home</a>
            <a href="#services" className="hover:text-white">Services</a>
            <a href="#how-it-works" className="hover:text-white">How It Works</a>
          </div>
        </div>

        <div>
          <h3 className="font-bold">Support</h3>

          <div className="mt-5 flex flex-col gap-4 text-sm text-zinc-400">
            <a href="/contact" className="hover:text-white">Contact</a>
            <a href="/faq" className="hover:text-white">FAQ</a>
            <a href="/privacy" className="hover:text-white">Privacy Policy</a>
            <a href="/terms" className="hover:text-white">Terms & Conditions</a>
          </div>
        </div>

      </div>

      <div className="mx-auto mt-12 max-w-7xl border-t border-white/10 pt-7 text-center text-xs text-zinc-500">
        © {new Date().getFullYear()} CreatorHub. All rights reserved.
      </div>
    </footer>
  );
}
