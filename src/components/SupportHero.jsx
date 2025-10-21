import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchMoviesByGenre } from "../api/fetchMovie";
import { fetchShowByGenre } from "../api/fetchShow";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const SupportHero = ({ genreId }) => {
  const { data: moviesData, isLoading: moviesLoading } = useQuery({
    queryKey: ["movies"],
    queryFn: () => fetchMoviesByGenre(genreId),
  });

  const { data: showsData, isLoading: showsLoading } = useQuery({
    queryKey: ["shows"],
    queryFn: () => fetchShowByGenre(genreId),
  });

  const [formData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    agree: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Support message submitted:", formData);
  };

  if (moviesLoading || showsLoading) return <p>Loading...</p>;

  const allMedia = [
    ...(moviesData?.results || []),
    ...(showsData?.results || []),
  ];
  const shuffledMedia = allMedia.sort(() => Math.random() - 0.5);

  return (
    <section className=" grid grid-cols-1 md:grid-cols-[1.4fr_2fr] gap-20 mt-36 px-5 md:px-10 items-start">
      {/* LEFT SECTION - Media */}
      <div className="shrink-0 flex flex-col gap-4 w-full h-[600px]">
        <h1 className="text-huge-48 text-white max-w-[400px] leading-tight">
          Welcome to our support page!
        </h1>
        <p className="text-medium-18 text-grey60">
          We're here to help you with any problems you may be having with our
          product.
        </p>

        <div className="border-6 border-black-15 bg-main-black rounded-[6px] w-full h-[470px] overflow-hidden mt-5">
          <div className="grid md:grid-cols-[0.9fr_1fr_1fr_0.9fr] grid-cols-[0.9fr_2fr_2fr_0.9fr] gap-5 ">
            {shuffledMedia.slice(0, 30).map((item) => (
              <div
                key={item.id}
                className="w-full h-auto overflow-hidden rounded-lg"
              >
                <img
                  src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                  alt={item.title || item.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className=" bg-main-black border border-black-15 rounded-[6px] p-8 w-full">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-5 ">
            <div>
              <label className="block text-[1rem] text-white mb-2">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                required
                placeholder="Enter your First Name"
                className="text-medium-12 w-full px-4 py-3 bg-black-8 border border-black-15 rounded-[6px] text-gray-100 focus:ring-2 focus:ring-main-red outline-none"
              />
            </div>

            <div>
              <label className="block text-[1rem] text-white mb-2">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                required
                placeholder="Enter your Last Name"
                className="text-medium-12 w-full px-4 py-3 bg-black-8 border border-black-15 rounded-[6px] text-gray-100 focus:ring-2 focus:ring-main-red outline-none"
              />
            </div>
          </div>

          {/* Email + Phone */}
          <div className="grid md:grid-cols-2 grid-cols-1 gap-5 mt-10 ">
            <div>
              <label className="block text-[1rem] text-white mb-2">Email</label>
              <input
                type="email"
                name="email"
                required
                placeholder="Enter your Email"
                className="text-medium-12 w-full px-4 py-3 rounded-[6px] bg-black-8 border border-black-15 text-gray-100 focus:ring-2 focus:ring-main-red outline-none"
              />
            </div>

            <div>
              <label className="block text-[1rem] text-white mb-2">
                Phone Number
              </label>
              <PhoneInput
                country={"iq"}
                placeholder="Enter Phone Number"
                inputClass="!text-medium-12 !w-full !py-3 !text-gray-100 !bg-black-8 !border !border-black-15 !rounded-[6px] !outline-none !h-[50px]"
                buttonClass="!bg-black-8 !border-black-15"
                dropdownClass="!bg-black-20 !text-gray-100"
              />
            </div>
          </div>

          {/* Message */}
          <div className="mt-10">
            <label className="block text-[1rem] text-white mb-2">Message</label>
            <textarea
              name="message"
              rows="4"
              required
              placeholder="Enter your Message"
              className="text-medium-12 w-full px-4 py-3 rounded-[6px] bg-black-8 border border-black-15 text-gray-100 focus:ring-2 focus:ring-main-red outline-none"
            ></textarea>
          </div>

          {/* Checkbox + Button */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8">
            <label className="flex items-center gap-3 cursor-pointer select-none">
              <input type="checkbox" name="agree" className="hidden peer" />
              <div className="w-5 h-5 rounded-md border border-grey60 flex items-center justify-center peer-checked:bg-main-red peer-checked:shadow-[0_0_8px_2px_rgba(255,0,0,0.5)] transition-all">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5 text-white hidden peer-checked:block"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8.002 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-grey60 text-[16px]">
                I agree with Terms of Use and Privacy Policy
              </span>
            </label>

            <button
              type="submit"
              className="w-full sm:w-auto bg-main-red hover:bg-red-700 transition-all text-white py-3 px-8 rounded-[6px] font-medium text-medium-18 cursor-pointer"
            >
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SupportHero;
