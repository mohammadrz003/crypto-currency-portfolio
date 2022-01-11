import Assets from "../components/pagePortfolio/assetsComponent/Assets";
import Trending from "../components/pagePortfolio/trendingComponent/Trending";

const Portfolio = () => {
  return (
    <section className="flex flex-wrap w-full">
      <div className="flex w-full space-x-7">
        <Assets />
        <Trending />
      </div>
    </section>
  );
};

export default Portfolio;
