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
    setUserCoins(localStorageCoinData);
  }, []);

  useEffect(() => {
    localStorage.setItem("userCoinsId", JSON.stringify(userCoins));

    const array = [...userCoins];
    let userCoinData = [];
    let promises = [];
    for (let i = 0; i < array.length; i++) {
      promises.push(
        http.get(`/coins/${array[i].id}`).then((response) => {
          userCoinData.push(response.data);
        })
      );
    }

    Promise.all(promises).then(() => setCoinsIdData(userCoinData));
  }, [userCoins]);

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
