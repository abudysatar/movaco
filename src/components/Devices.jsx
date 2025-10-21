import React from "react";

const Devices = () => {
  const devices = [
    {
      title: "Smartphones",
      desc: "Movaco is optimized for both Android and iOS smartphones. Download our app from the Google Play Store or the Apple App Store.",
      img: "/phone.png",
    },
    {
      title: "Tablets",
      desc: "Enjoy your favorite movies and shows on larger screens with full HD quality on tablets.",
      img: "/tablet.png",
    },
    {
      title: "Smart TVs",
      desc: "Watch Movaco directly on your smart TV with our native app for all major TV brands.",
      img: "/tv.png",
    },
    {
      title: "Laptops",
      desc: "Access Movaco on any web browser or through our desktop app for Windows and macOS.",
      img: "/laptop.png",
    },
    {
      title: "Game Consoles",
      desc: "Movaco is available on major gaming consoles for the ultimate entertainment experience.",
      img: "/controler.png",
    },
    {
      title: "VR Devices",
      desc: "Immerse yourself in a cinematic experience with Movaco’s VR compatibility.",
      img: "/vr.png",
    },
  ];

  return (
    <section className="mt-28 flex flex-col  px-4">
      {/* Title */}
      <h2 className="md:text-huge2-38 text-huge-mob-28 text-white  max-w-3xl">
        We Provide you streaming experience across various devices.
      </h2>
      <p className=" text-grey60  mt-4 max-w-3xl">
        With Movaco, you can enjoy your favorite movies and TV shows anytime,
        anywhere. Our platform is designed to be compatible with a wide range of
        devices, ensuring that you never miss a moment of entertainment.
      </p>

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          gap-7
          mt-15
          justify-items-center
          w-full
          mx-auto
        "
      >
        {devices.map((device, index) => (
          <div
            key={index}
            className="
              w-full h-full
              rounded-[10px]
              p-6
              flex flex-col justify-center
              bg-gradient-to-br from-black to-[#1A0000]
              relative overflow-hidden
              transition-all duration-300
            "
          >
            {/* red tint corner */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-700/30 blur-2xl rounded-full"></div>

            {/* icon + title */}
            <div className="flex items-center gap-3 z-10">
              <div className="bg-black/50 p-4 rounded-xl flex items-center justify-center shrink-0">
                <img
                  src={device.img}
                  alt={device.title}
                  className="w-auto h-10 md:w-9 md:h-9 object-contain"
                />
              </div>
              <h3 className="text-white text-lg md:text-xl font-semibold line-clamp-1">
                {device.title}
              </h3>
            </div>

            {/* description */}
            <p className="text-grey60 z-10 mt-3 text-sm md:text-base line-clamp-3">
              {device.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Devices;
