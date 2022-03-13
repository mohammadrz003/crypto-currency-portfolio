import { MdArrowDropDown, MdOutlineArrowDropUp } from "react-icons/md";

const CryptoCard = ({ coin }) => {
  if (Object.keys(coin).length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div class="bg-white overflow-hidden shadow rounded-lg w-full relative">
      <img
        src={coin.image}
        alt="btc logo"
        class="h-24 w-24 rounded-full absolute opacity-50 -top-6 -right-6 md:-right-4"
      />
      <div class="px-4 py-5 sm:p-6">
        <dl>
          <dt class="text-sm leading-5 font-medium text-gray-500 truncate">
            {coin.name}
          </dt>
          <dd class="mt-1 text-3xl leading-9 font-semibold text-gray-900">
            $ {coin.current_price}
          </dd>
          <dd class="text-gray-500 font-semibold flex items-center">
            {coin.price_change_percentage_24h < 0 ? (
              <MdArrowDropDown color="#F44336" fontSize="1.5rem" />
            ) : (
              <MdOutlineArrowDropUp color="#4CAF50" fontSize="1.5rem" />
            )}

            <span
              style={{
                color: `${
                  coin.price_change_percentage_24h < 0 ? "#F44336" : "#4CAF50"
                }`,
              }}
            >
              {coin.price_change_percentage_24h.toFixed(2)}
            </span>
          </dd>
        </dl>
      </div>
    </div>
  );
};

export default CryptoCard;
