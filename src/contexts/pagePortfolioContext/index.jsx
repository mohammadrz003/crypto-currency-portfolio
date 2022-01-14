import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import http from "../../adapters/httpService";

export const coinsContext = React.createContext();

const CoinsProvider = ({ children }) => {
  const [trendingCoins, setTrendingCoins] = useState(null);
  const [allCryptoCurrency, setAllCryptoCurrency] = useState([]);
  const [userCoins, setUserCoins] = useState([]);
  const [coinsIdData, setCoinsIdData] = useState([]);

  useEffect(() => {
    const localStorageCoinData = JSON.parse(
      localStorage.getItem("userCoinsId") || "[]"
    );

    if (localStorageCoinData.length > 0) {
      let userCoinData = [...localStorageCoinData];
      let promises = [];
      for (let i = 0; i < userCoinData.length; i++) {
        promises.push(
          http.get(`/coins/${userCoinData[i].id}`).then((response) => {
            userCoinData[i].value = response.data;
          })
        );
      }

      Promise.all(promises).then(() => setUserCoins(userCoinData));
    } else {
      setUserCoins(localStorageCoinData);
    }
  }, []);

  return (
    <coinsContext.Provider
      value={{
        trendingCoins,
        setTrendingCoins,
        allCryptoCurrency,
        setAllCryptoCurrency,
        userCoins,
        setUserCoins,
        coinsIdData,
        setCoinsIdData,
      }}
    >
      {children}
    </coinsContext.Provider>
  );
};

export default CoinsProvider;
