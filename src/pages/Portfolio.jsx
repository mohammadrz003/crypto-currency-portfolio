import { useState, useEffect, useContext } from "react";
import { coinsContext } from "../contexts/pagePortfolioContext";
import AssetsChart from "../components/pagePortfolio/assetsChart/AssetsChart";
import Assets from "../components/pagePortfolio/assetsComponent/Assets";
import AssetsDoughnutChart from "../components/pagePortfolio/assetsPieChart/AssetsDoughnutChart";
import Trending from "../components/pagePortfolio/trendingComponent/Trending";
import CryptoCard from "../components/pagePortfolio/cryptoCard/CryptoCard";

const Portfolio = () => {
  const { userCoins, coinsIdData, allCryptoCurrency } =
    useContext(coinsContext);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    if (userCoins.length > 0 && coinsIdData.length > 0) {
      const totalBalanceArray = coinsIdData.map((coinData) => {
        return {
          price:
            coinData.market_data.current_price.usd *
            userCoins.find((x) => x.id === coinData.id).count,
          name: coinData.name,
        };
      });

      totalBalanceArray.sort(function (a, b) {
        return b.price - a.price;
      });

      setChartData({
        labels: totalBalanceArray.map((crypto) => crypto.name).slice(0, 4),
        datasets: [
          {
            label: "Price in USD",
            data: totalBalanceArray.map((crypto) => crypto.price).slice(0, 4),
            backgroundColor: [
              "#5A62FD",
              "#FE895D",
              "#33DFAC",
              "#67BFE9",
              "#A872FE",
            ],
          },
        ],
      });
    }
  }, [userCoins, coinsIdData]);

  return (
    <section className="flex flex-wrap w-full">
      <div className="w-full grid  gap-4 grid-cols-2 md:grid-cols-4 mb-4 md:mb-8">
        {allCryptoCurrency
          .map((coin) => {
            return <CryptoCard key={coin.id} coin={coin} />;
          })
          .slice(0, 4)}
      </div>
      <div className="flex flex-col-reverse space-y-reverse space-y-8 md:space-y-0 md:flex-row w-full mb-4 md:space-x-7">
        <Assets />
        <AssetsDoughnutChart chartData={chartData} />
      </div>
      {/* <div className="flex w-full space-x-7">
        <AssetsChart />
        <Trending />
      </div> */}
    </section>
  );
};

export default Portfolio;
