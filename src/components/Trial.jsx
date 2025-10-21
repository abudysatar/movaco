import { Link } from "react-router";

const Trial = () => {
  return (
    <section className="flex justify-center items-center mb-16 mt-20 md:mt-[7rem] relative w-full min-h-[236px] overflow-hidden">
      <img
        className="-z-20 absolute w-full h-full object-cover"
        src="/Background Images.png"
        alt="Background"
      />

      <div className="absolute inset-0 md:bg-black/10 -z-10 " />

      <div className="h-full w-full  flex items-center justify-between px-8 flex-col md:flex-row md:justify-between md:items-center text-center md:text-left py-10 ">
        <div className="text-white max-w-lg mb-4 md:mb-0 ">
          <h1 className="text-3xl font-bold mb-2 drop-shadow-lg">
            Start your free trial today!
          </h1>
          <p className="text-lg drop-shadow-md">
            This is a clear and concise call to action that encourages users to
            sign up for a free trial of StreamVibe.
          </p>
        </div>
        <Link to={"/subscription"}>
          <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-[8px] font-semibold transition cursor-pointer">
            Start a Free Trial
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Trial;
