import React from "react";

export const coinsContext = React.createContext();

const CoinsProvider = ({ children }) => {
  return <coinsContext.Provider>{children}</coinsContext.Provider>;
};

export default CoinsProvider;
