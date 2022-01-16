const CryptoCard = ({ coin }) => {
  return (
    <div class="bg-white overflow-hidden shadow rounded-lg w-1/4 relative">
      <img
        src={coin.image.large}
        alt="btc logo"
        class="h-24 w-24 rounded-full absolute opacity-50 -top-6 -right-6 md:-right-4"
      />
      <div class="px-4 py-5 sm:p-6">
        <dl>
          <dt class="text-sm leading-5 font-medium text-gray-500 truncate">
            Valeur de la transaction
          </dt>
          <dd class="mt-1 text-3xl leading-9 font-semibold text-gray-900">
            $ {coin.market_data.current_price.usd}
          </dd>
          <dd class="text-gray-500 font-semibold">
            <span>
              500
              <span class="text-xs">.000</span>
              {coin.symbol}
            </span>
          </dd>
        </dl>
      </div>
    </div>
  );
};

export default CryptoCard;
