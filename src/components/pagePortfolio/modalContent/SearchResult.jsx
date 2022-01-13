import { useEffect, useContext, useState } from "react/cjs/react.development";
import { coinsContext } from "../../../contexts/pagePortfolioContext";
import { getAllCryptoCurrencyData } from "../../../adapters/pagePortfolioAdapter";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const SearchResult = ({
  isSearchResultFocus,
  filteredCoins,
  searchInputValue,
  setIsSearchResultFocus,
  setIsModalOpen,
}) => {
  const { allCryptoCurrency, setAllCryptoCurrency, userCoins, setUserCoins } =
    useContext(coinsContext);

  useEffect(() => {
    getAllCryptoCurrencyData()
      .then((response) => {
        setAllCryptoCurrency(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const coinIdHandler = (id) => {
    const isIdExist = userCoins.map((obj) => {
      return obj.id;
    });
    if (!isIdExist.includes(id)) {
      localStorage.setItem(
        "userCoinsId",
        JSON.stringify([...userCoins, { id }])
      );
      setUserCoins((prevIds) => {
        return [...prevIds, { id }];
      });
    }
    console.log(localStorage.getItem("userCoinsId"));
    // setIsSearchResultFocus(false);

    setIsModalOpen(false);
  };

  if (!isSearchResultFocus) return null;
  if (searchInputValue !== "" && filteredCoins.length === 0) {
    return (
      <div className="absolute left-0 right-0 p-4 bg-white rounded-md shadow-md top-full">
        <p className="text-center text-gray-500">nothing is found</p>
      </div>
    );
  }
  if (filteredCoins.length > 0 && searchInputValue !== "") {
    return (
      <div className="absolute left-0 right-0 p-4 bg-white rounded-md shadow-md top-full">
        <ul className="flex flex-col overflow-auto divide-y divide max-h-64">
          {filteredCoins.map((coin) => {
            return (
              <li
                onClick={() => coinIdHandler(coin.id)}
                key={coin.id}
                className="flex flex-row"
              >
                <div className="flex items-center flex-1 p-4 cursor-pointer select-none">
                  <div className="flex flex-col items-center justify-center w-10 h-10 mr-4">
                    <a href="/" className="relative block">
                      <img
                        alt="profil"
                        src={coin.large}
                        className="object-cover mx-auto rounded-full h-7 w-7"
                      />
                    </a>
                  </div>
                  <div className="flex-1 pl-1 mr-16">
                    <div className="font-medium dark:text-white">
                      {coin.name}{" "}
                      <span className="text-gray-400">{coin.symbol}</span>
                    </div>
                  </div>
                  <button className="flex justify-end w-24 text-right">
                    <MdOutlineKeyboardArrowRight />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
  return (
    <div className="absolute left-0 right-0 p-4 bg-white rounded-md shadow-md top-full">
      <ul className="flex flex-col overflow-auto divide-y divide max-h-64">
        {allCryptoCurrency.map((coin) => {
          return (
            <li
              onClick={() => coinIdHandler(coin.id)}
              key={coin.id}
              className="flex flex-row"
            >
              <div className="flex items-center flex-1 p-4 cursor-pointer select-none">
                <div className="flex flex-col items-center justify-center w-10 h-10 mr-4">
                  <a href="/" className="relative block">
                    <img
                      alt="profil"
                      src={coin.image}
                      className="object-cover mx-auto rounded-full h-7 w-7"
                    />
                  </a>
                </div>
                <div className="flex-1 pl-1 mr-16">
                  <div className="font-medium dark:text-white">
                    {coin.name}{" "}
                    <span className="text-gray-400">{coin.symbol}</span>
                  </div>
                </div>
                <button className="flex justify-end w-24 text-right">
                  <MdOutlineKeyboardArrowRight />
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SearchResult;
