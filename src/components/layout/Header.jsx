import { useContext, useState } from "react";
import { useEffect } from "react";
import { CgSearch } from "react-icons/cg";

import { coinsContext } from "../../contexts/pagePortfolioContext";

const Header = () => {
  const { userCoins, coinsIdData } = useContext(coinsContext);
  const [totalBalance, setTotalBalance] = useState(0);

  useEffect(() => {
    if (userCoins.length > 0 && coinsIdData.length > 0) {
      const totalBalanceArray = coinsIdData.map((coinData) => {
        return (
          coinData.market_data.current_price.usd *
          userCoins.find((x) => x.id === coinData.id).count
        );
      });

      setTotalBalance(totalBalanceArray.reduce((a, b) => a + b, 0));
    }
  }, [userCoins, coinsIdData]);
  return (
    <header className="hidden md:flex justify-between px-10 py-8">
      <h2 className="text-2xl font-bold tracking-wide text-dark">
        Balance: ${totalBalance.toFixed(3)}
      </h2>

      <div className="form-control">
        <div className="relative">
          <input
            type="text"
            placeholder="Search here"
            className="w-full pr-16 input input-bordered"
          />
          <button className="absolute top-0 right-0 rounded-l-none btn border-none bg-transparent">
            <CgSearch color="gray" fontSize="1.3rem" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
