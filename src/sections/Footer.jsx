import WrittenLogo from "../../public/assets/WrittenLogo.png";
import Instagram from "../../public/assets/icons/Instagram.svg";
import TikTok from "../../public/assets/icons/TikTok.svg";
import YouTube from "../../public/assets/icons/YouTube.svg";

const Footer = () => {
  return (
    <div className="h-[500px] mt-[10vh]">
      <h1 className="mx-5 text-2xl mt-5 text-center mt-16">BUILT FOR</h1>
      <h1 className="mx-5 text-2xl mt-[-2px] text-center text-[#A40000]">
        THE BARZ
      </h1>

      <div className="flex items-center justify-center mt-15 opacity-60">
        <a href="www.youtube.com/@Barzfreak.official" target="blank">
          <img
            src={Instagram}
            alt="Instagram Icon"
            className="mx-5 h-8 inline-block"
          />
        </a>
        <a href="www.tiktok.com/@barzfreak.official" target="blank">
          <img
            src={TikTok}
            alt="TikTok Icon"
            className="mx-5 h-8 inline-block"
          />
        </a>
        <a href="https://www.instagram.com/barzfreak.official/" target="blank">
          <img
            src={YouTube}
            alt="YouTube Icon"
            className="mx-5 h-8 inline-block"
          />
        </a>
      </div>

      <img
        src={WrittenLogo}
        alt="Written Logo"
        className="mx-auto mt-16 scale-75"
      />
    </div>
  );
};

export default Footer;
