import React, { useState } from "react";

export const PlansInformation = () => {
  const subscriptionPlans = [
    {
      name: "Basic",
      price: "$9.99/Month",
      content:
        "Access to a wide selection of movies and shows, including some new releases.",
      devices: "Watch on one device simultaneously",
      freeTrial: "7 Days",
      cancelAnytime: "Yes",
      hdr: "No",
      dolbyAtmos: "No",
      adFree: "No",
      offlineViewing: "No",
      familySharing: "No",
    },
    {
      name: "Standard",
      price: "$12.99/Month",
      content:
        "Access to a wider selection of movies and shows, including most new releases and exclusive content.",
      devices: "Watch on two devices simultaneously",
      freeTrial: "7 Days",
      cancelAnytime: "Yes",
      hdr: "Yes",
      dolbyAtmos: "Yes",
      adFree: "Yes",
      offlineViewing: "Yes, for select titles.",
      familySharing: "Yes, up to 5 family members.",
    },
    {
      name: "Premium",
      price: "$14.99/Month",
      content:
        "Access to the widest selection of movies and shows, including all new releases and Offline Viewing.",
      devices: "Watch on four devices simultaneously",
      freeTrial: "7 Days",
      cancelAnytime: "Yes",
      hdr: "Yes",
      dolbyAtmos: "Yes",
      adFree: "Yes",
      offlineViewing: "Yes, for all titles.",
      familySharing: "Yes, up to 6 family members.",
    },
  ];

  const features = [
    { key: "price", label: "Price" },
    { key: "content", label: "Content" },
    { key: "devices", label: "Devices" },
    { key: "freeTrial", label: "Free Trial" },
    { key: "cancelAnytime", label: "Cancel Anytime" },
    { key: "hdr", label: "HDR" },
    { key: "dolbyAtmos", label: "Dolby Atmos" },
    { key: "adFree", label: "Ad-Free" },
    { key: "offlineViewing", label: "Offline Viewing" },
    { key: "familySharing", label: "Family Sharing" },
  ];

  const [activePlan, setActivePlan] = useState(subscriptionPlans[0].name);

  const selectedPlan =
    subscriptionPlans.find((p) => p.name === activePlan) ||
    subscriptionPlans[0];

  return (
    <section className="mt-36">
      <div className="flex flex-col gap-2.5 text-start  mb-14">
        <h1 className="text-huge2-38 md:text-4xl font-bold  ">
          Compare our plans and find the right one for you
        </h1>
        <p className="text-small-16 text-grey60">
          Movaco offers three different plans to fit your needs: Basic,
          Standard, and Premium. Compare the features of each plan and choose
          the one that's right for you.
        </p>
      </div>

      <div className="md:hidden flex justify-center gap-3 mb-6 sticky top-0 bg-main-black py-3 z-10">
        {subscriptionPlans.map((plan) => (
          <button
            key={plan.name}
            onClick={() => setActivePlan(plan.name)}
            className={`px-5 py-2 rounded-lg border border-black-15 transition-all duration-200 ${
              activePlan === plan.name
                ? "bg-main-red text-white"
                : "bg-black-10 text-grey60 hover:bg-black-12"
            }`}
          >
            {plan.name}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <div
          className="hidden md:grid border border-black-15 rounded-2xl overflow-hidden"
          style={{
            gridTemplateColumns: "320px repeat(3, 1fr)",
            minWidth: "1000px",
          }}
        >
          <div className="bg-black p-5 font-semibold text-medium-18 border border-black-15">
            Features
          </div>
          {subscriptionPlans.map((plan) => (
            <div
              key={plan.name}
              className="bg-black p-5 text-center font-semibold text-medium-18 border border-black-15"
            >
              {plan.name}
            </div>
          ))}

          {features.map((feature) => (
            <React.Fragment key={feature.key}>
              <div className="bg-black-8 border border-black-15 p-5 font-medium text-grey60">
                {feature.label}
              </div>

              {subscriptionPlans.map((plan) => (
                <div
                  key={plan.name + feature.key}
                  className={`border border-black-15 p-5 text-center text-small-16 ${
                    plan[feature.key] === "No"
                      ? "text-grey60 bg-black-8"
                      : "text-white bg-black-10"
                  }`}
                >
                  {plan[feature.key]}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>

        <div
          className="grid md:hidden border border-black-15 rounded-2xl overflow-hidden"
          style={{
            gridTemplateColumns: "1fr 1fr",
            width: "100%",
          }}
        >
          <div className="bg-black p-4 font-semibold border-b border-black-15">
            Features
          </div>
          <div className="bg-black p-4 text-center font-semibold border-b border-black-15">
            {selectedPlan.name}
          </div>

          {features.map((feature) => (
            <React.Fragment key={feature.key}>
              <div className="bg-black-8 border-t border-black-15 p-4 text-sm font-medium text-grey60">
                {feature.label}
              </div>
              <div
                className={`border-t border-black-15 p-4 text-center text-sm ${
                  selectedPlan[feature.key] === "No"
                    ? "text-grey60 bg-black-8"
                    : "text-white bg-black-10"
                }`}
              >
                {selectedPlan[feature.key]}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};
