import React, { useState } from "react";
import { Link } from "react-router";

const SubscriptionCards = () => {
  const [billingCycle, setBillingCycle] = useState("monthly");

  const plans = [
    {
      title: "Basic Plan",
      desc: "Enjoy an extensive library of movies and shows, including recently released titles.",
      monthly: 9.99,
      yearly: 99.99,
    },
    {
      title: "Premium Plan",
      desc: "Get access to exclusive content, 4K streaming, and watch on multiple devices at once.",
      monthly: 14.99,
      yearly: 149.99,
    },
  ];

  return (
    <section className="w-full text-white md:mt-4">
      <div className="md:flex justify-between items-center mt-36 gap-6">
        <div className="flex flex-col max-w-2xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Choose the plan that's right for you
          </h1>
          <p className="text-grey60 text-base">
            Join Movaco and select from our flexible subscription options
            tailored to suit your viewing preferences. Get ready for non-stop
            entertainment!
          </p>
        </div>

        <div className="flex  gap-3 mt-6 md:mt-0  bg-main-black border border-black-15 rounded-xl p-2 max-w-[240px]">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`px-6 py-3 rounded-lg transition-all cursor-pointer duration-200 ${
              billingCycle === "monthly"
                ? "bg-black-12 text-white"
                : "hover:bg-black-12 text-grey60"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle("yearly")}
            className={`px-6 py-3 rounded-lg transition-all cursor-pointer duration-200 ${
              billingCycle === "yearly"
                ? "bg-black-12 text-white"
                : "hover:bg-black-12 text-grey60"
            }`}
          >
            Yearly
          </button>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="bg-black-10 p-12 border  border-black-15 rounded-2xl hover:border-main-red transition-all duration-300"
          >
            <h3 className="font-bold text-2xl mb-3">{plan.title}</h3>
            <p className="text-grey60 text-base mb-6">{plan.desc}</p>

            <div className="mt-4">
              <h1 className="text-grey60 text-lg font-medium">
                <span className="text-white text-3xl font-semibold">
                  {billingCycle === "monthly"
                    ? `$${plan.monthly}`
                    : `$${plan.yearly}`}
                </span>{" "}
                /{billingCycle === "monthly" ? "month" : "year"}
              </h1>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
              <Link
                to="/subscription"
                className="flex-1 text-center border border-black-15 text-small-16 font-semibold rounded-lg bg-black-8 py-3 hover:bg-black-12 transition cursor-pointer"
              >
                Start Free Trial
              </Link>
              <Link
                to="/subscription"
                className="flex-1 text-center border border-black-15 text-small-16 font-semibold rounded-lg bg-main-red py-3 hover:opacity-80 transition cursor-pointer"
              >
                <p>Choose Plan</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SubscriptionCards;
