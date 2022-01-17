import { useContext, useState } from "react";
import { useEffect } from "react";
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
    <header className="flex justify-between px-10 py-8">
      <h2 className="text-2xl font-bold tracking-wide text-dark">
        Balance: ${totalBalance.toFixed(3)}
      </h2>

      <a
        href="/"
        className="flex items-center space-x-3 font-medium text-gray-600"
      >
        <span>rezaiimohammad00@gmail.com</span>
        <img
          alt="profil"
          src="/assets/profile-pic-office.png"
          className="object-cover w-10 h-10 mx-auto rounded-full "
        />
      </a>
    </header>
  );
};

export default Header;
