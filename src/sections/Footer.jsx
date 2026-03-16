import WrittenLogo from "../../public/assets/WrittenLogo.png";
import Instagram from "../../public/assets/icons/Instagram.svg";
import TikTok from "../../public/assets/icons/TikTok.svg";
import YouTube from "../../public/assets/icons/YouTube.svg";
import MemberInline from "../shared/components/MemberInline";

const Footer = () => {
  return (
    <footer className="border-t border-white/8 mt-20">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="flex flex-col md:flex-row justify-between gap-12">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold">BUILT FOR</h2>
            <h2 className="text-2xl font-bold text-[#a40000]">THE BARZ</h2>

            <div className="flex items-center gap-4 mt-6 opacity-50">
              <a
                href="https://www.instagram.com/barzfreak.official/"
                target="_blank"
                rel="noreferrer"
              >
                <img src={Instagram} alt="Instagram" className="h-6" />
              </a>
              <a
                href="https://www.tiktok.com/@barzfreak.official"
                target="_blank"
                rel="noreferrer"
              >
                <img src={TikTok} alt="TikTok" className="h-6" />
              </a>
              <a
                href="https://www.youtube.com/@Barzfreak.official"
                target="_blank"
                rel="noreferrer"
              >
                <img src={YouTube} alt="YouTube" className="h-6" />
              </a>
            </div>
          </div>

          {/* Inline signup */}
          <div className="md:max-w-xs w-full mt-[-30px]">
            <MemberInline />
          </div>
        </div>

        <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-4">
          <img src={WrittenLogo} alt="BarzFreak" className="h-10 opacity-30" />
          <p className="text-white/20 text-[11px] uppercase tracking-[0.15em]">
            © {new Date().getFullYear()} BarzFreak — All rights reserved
          </p>
          <p className="text-white/20 text-[11px] uppercase tracking-[0.15em]">
            <a
              href="https://www.darjan.dev"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white/40 transition-colors"
            >
              www.darjan.dev
            </a>{" "}
            &times; Barz-Freak 2026
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
