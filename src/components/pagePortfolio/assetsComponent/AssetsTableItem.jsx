import { GrTransaction } from "react-icons/gr";

const AssetsTableItem = ({ coin, userCoins, addTransactionHandler }) => {
  return (
    <tr className="cursor-pointer">
      <td>
        <div class="flex items-center space-x-3">
          <div class="avatar">
            <div class="rounded-full w-10 h-10">
              <img alt={coin.id} src={coin.image.large} />
            </div>
          </div>
          <div>
            <div class="font-semibold uppercase text-gray-600">
              {coin.symbol}
            </div>
            <div class="text-sm opacity-50">{coin.name}</div>
          </div>
        </div>
      </td>
      <td>{userCoins.find((x) => x.id === coin.id).count}</td>
      <td>
        $
        {coin.market_data.current_price.usd *
          userCoins.find((x) => x.id === coin.id).count}
      </td>
      <td>
        <button onClick={() => addTransactionHandler(coin)}>
          <GrTransaction />
        </button>
      </td>
    </tr>
  );
};

export default AssetsTableItem;
