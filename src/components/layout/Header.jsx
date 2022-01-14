import { useContext, useState } from "react";
import { useEffect } from "react/cjs/react.development";
import { coinsContext } from "../../contexts/pagePortfolioContext";
import http from "../../adapters/httpService";

const Header = () => {
  const { userCoins } = useContext(coinsContext);
  const [totalBalance, setTotalBalance] = useState(0);

  useEffect(() => {
    const array = [...userCoins];
    let userCoinData = [];
    let promises = [];
    for (let i = 0; i < array.length; i++) {
      promises.push(
        http.get(`/coins/${array[i].id}`).then((response) => {
          userCoinData.push(
            response.data.market_data.current_price.usd * userCoins[i].count
          );
        })
      );
    }

    Promise.all(promises).then(() =>
      setTotalBalance(userCoinData.reduce((a, b) => a + b, 0))
    );
  }, [userCoins]);
  return (
    <header className="flex justify-between px-10 py-8">
      <h2 className="text-2xl font-bold tracking-wide text-dark">
        Balance: ${totalBalance}
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
