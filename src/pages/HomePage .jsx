import Layout from "../components/Layout";
import HomeHero from "../components/HomeHero";
import OurGenres from "../components/OurGenres";
import Faq from "../components/Faq";
import Devices from "../components/Devices";
import SubscriptionCards from "../components/SubscriptionCards";

const Home = ({ genreId }) => {
  return (
    <div>
      <section>
        <HomeHero genreId={genreId} />
      </section>

      <section id="categories">
        <OurGenres
          home={true}
          sectionTitle="Explore our wide variety of categories"
          categoryLabel={false}
        />
      </section>

      <section id="devices">
        <Devices />
      </section>

      <section id="faq">
        <Faq />
      </section>

      <section id="pricing">
        <SubscriptionCards />
      </section>
    </div>
  );
};

export default Home;
