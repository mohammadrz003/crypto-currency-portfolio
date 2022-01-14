import { useEffect, useState, useContext } from "react";
import { coinsContext } from "../../../contexts/pagePortfolioContext";
import { getTrendingCoins } from "../../../adapters/pagePortfolioAdapter";

const Trending = () => {
  const { trendingCoins, setTrendingCoins } = useContext(coinsContext);

  useEffect(() => {
    getTrendingCoins().then((response) => {
      setTrendingCoins(response.data.coins.slice(0, 4));
    });
  }, []);

  return (
    <div className="flex-1">
      <div className="py-1">
        <h4 className="text-xl font-semibold text-dark">Trending currency</h4>
      </div>
      <div className="mt-4">
        <ul className="flex flex-col">
          {trendingCoins ? (
            trendingCoins.map((coin) => {
              return (
                <li
                  key={coin.item.id}
                  className="flex flex-row mb-2 border-gray-400"
                >
                  <div className="flex items-center flex-1 p-4 bg-white border rounded-md shadow cursor-pointer select-none dark:bg-gray-800">
                    <div className="flex flex-col items-center justify-center w-10 h-10 mr-4">
                      <a href="/" className="relative block">
                        <img
                          alt="profil"
                          src={coin.item.small}
                          className="object-cover w-10 h-10 mx-auto rounded-full "
                        />
                      </a>
                    </div>
                    <div className="flex-1 pl-1 md:mr-16">
                      <div className="font-medium text-gray-800 dark:text-white">
                        {coin.item.symbol}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-200">
                        {coin.item.name}
                      </div>
                    </div>
                    <button className="flex justify-end w-24 text-right">
                      <svg
                        width="12"
                        fill="currentColor"
                        height="12"
                        className="text-gray-500 hover:text-gray-800 dark:hover:text-white dark:text-gray-200"
                        viewBox="0 0 1792 1792"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z"></path>
                      </svg>
                    </button>
                  </div>
                </li>
              );
            })
          ) : (
            <p>loading...</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Trending;
