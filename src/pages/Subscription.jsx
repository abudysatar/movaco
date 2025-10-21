import React from "react";
import SubscriptionCards from "../components/SubscriptionCards";
import { PlansInformation } from "../components/PlansInformation";

const Subscription = () => {
  return (
    <div className="text-white mt-28">
      {/* Features Section */}
      <section id="subscription-features">
        <SubscriptionCards />
      </section>

      {/* Plans Section */}
      <section id="subscription-plans">
        <PlansInformation />
      </section>
    </div>
  );
};

export default Subscription;
