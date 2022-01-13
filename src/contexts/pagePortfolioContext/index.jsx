import React, { useState } from "react";
import { useEffect } from "react/cjs/react.development";

export const coinsContext = React.createContext();

const CoinsProvider = ({ children }) => {
  const [trendingCoins, setTrendingCoins] = useState(null);
  const [allCryptoCurrency, setAllCryptoCurrency] = useState([]);
  const [userCoins, setUserCoins] = useState([]);
  const [coinsIdData, setCoinsIdData] = useState([]);

  useEffect(() => {
    setUserCoins(JSON.parse(localStorage.getItem("userCoinsId") || "[]"));
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
