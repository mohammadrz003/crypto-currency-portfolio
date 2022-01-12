import React, { useState } from "react";

export const coinsContext = React.createContext();

const CoinsProvider = ({ children }) => {
  const [trendingCoins, setTrendingCoins] = useState(null);
  const [allCryptoCurrency, setAllCryptoCurrency] = useState([]);
  const [userCoins, setUserCoins] = useState([]);

  return (
    <coinsContext.Provider
      value={{
        trendingCoins,
        setTrendingCoins,
        allCryptoCurrency,
        setAllCryptoCurrency,
        userCoins,
        setUserCoins,
      }}
    >
      {children}
    </coinsContext.Provider>
  );
};

export default CoinsProvider;
