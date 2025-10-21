import { LogoFacebook, LogoLinkedin, LogoX } from "@carbon/icons-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-main-black text-grey60 mt-36 max-w-[1440px] mx-auto">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-10 px-10 md:px-20 py-20 border-b border-black-15">
        <div className="flex flex-col gap-3">
          <h3 className="text-white text-lg font-semibold pb-1">Home</h3>
          {[
            { name: "Categories", hash: "#categories" },
            { name: "Devices", hash: "#devices" },
            { name: "Pricing", hash: "#pricing" },
            { name: "FAQ", hash: "#faq" },
          ].map(({ name, hash }) => (
            <Link
              key={name}
              to={`/${hash}`}
              className="hover:text-main-red transition-colors duration-300"
            >
              {name}
            </Link>
          ))}
        </div>
        {/* Movies */}
        <div className="flex flex-col gap-3">
          <h3 className="text-white text-lg font-semibold pb-1">Movies</h3>
          {[
            { name: "Genres", hash: "#movie-genres" },
            { name: "Trending", hash: "#movie-trending" },
            { name: "New Release", hash: "#movie-new" },
          ].map(({ name, hash }) => (
            <Link
              key={name}
              to={`movies-shows${hash}`}
              className="hover:text-main-red transition-colors duration-300"
            >
              {name}
            </Link>
          ))}
        </div>
        {/* Shows */}
        <div className="flex flex-col gap-3">
          <h3 className="text-white text-lg font-semibold pb-1">Shows</h3>
          {[
            { name: "Genres", hash: "#show-genres" },
            { name: "Trending", hash: "#show-trending" },
            { name: "New Release", hash: "#show-new" },
          ].map(({ name, hash }) => (
            <Link
              key={name}
              to={`/movies-shows${hash}`}
              className="hover:text-main-red transition-colors duration-300"
            >
              {name}
            </Link>
          ))}
        </div>
        {/* Support */}
        <div className="flex flex-col gap-3">
          <h3 className="text-white text-lg font-semibold pb-1">Support</h3>
          <Link
            to="/supports"
            className="hover:text-main-red transition-colors duration-300"
          >
            Contact Us
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-white text-lg font-semibold pb-1">
            Subscription
          </h3>
          {[
            { name: "Plans", hash: "#subscription-plans" },
            { name: "Features", hash: "#subscription-features" },
          ].map(({ name, hash }) => (
            <Link
              key={name}
              to={`/subscription${hash}`}
              className="hover:text-main-red transition-colors duration-300"
            >
              {name}
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <h3 className="text-white text-lg font-semibold pb-1">
            Connect With Us
          </h3>
          <div className="flex gap-3">
            {[
              { icon: <LogoFacebook size={20} color="white" />, href: "#" },
              {
                icon: <LogoX size={20} color="white" />,
                href: "https://x.com/abudy_satar?t=TxVhETYx8gmEOm21R8WLhw&s=09",
              },
              {
                icon: <LogoLinkedin size={20} color="white" />,
                href: "https://www.linkedin.com/in/abdul-rahman-sattar-96071b2aa?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
              },
            ].map(({ icon, href }, i) => (
              <Link
                target="blank"
                key={i}
                to={href}
                className="bg-black-10 border border-black-15 p-2 rounded-md hover:bg-main-red transition-all duration-300"
              >
                {icon}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-grey60 px-10 md:px-20 py-6 gap-4">
        <p className="">
          © 2025 <span className="text-white font-semibold">Movaco</span> —
          built by
          <Link
            target="blank"
            to="https://github.com/abudysatar"
            className="underline italic text-white hover:text-main-red transition-colors px-1"
          >
            Abdulrahman
          </Link>
          supervised by
          <Link
            target="blank"
            to="https://github.com/HamzaAymen"
            className="underline italic text-white hover:text-main-red transition-colors px-1"
          >
            Hamza
          </Link>
          . All Rights Reserved.
        </p>
        <div className="flex gap-6 flex-wrap justify-center sm:justify-end">
          {["Terms of Use", "Privacy Policy", "Cookie Policy"].map((item) => (
            <Link
              target="blank"
              key={item}
              to="asdasd"
              className="hover:text-main-red transition-colors duration-300"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
