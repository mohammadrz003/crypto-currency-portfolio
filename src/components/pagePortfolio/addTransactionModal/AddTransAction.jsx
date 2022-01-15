import { useContext, useState } from "react";
import { coinsContext } from "../../../contexts/pagePortfolioContext";
import { Tab } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const AddTransActionModal = ({ addTransactionData, onClose }) => {
  let tabCategories = ["Buy", "Sell"];

  const { userCoins, setUserCoins } = useContext(coinsContext);
  const [addTransactionInputValue, setAddTransactionInputValue] = useState("");
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  const changeInputHandler = (e) => {
    setAddTransactionInputValue(e.target.value);
  };

  const submitInputHandler = () => {
    if (addTransactionInputValue < 0) {
      alert("can't enter negative value");
      return;
    }
    const coinObjIndex = userCoins.findIndex(
      (coinIdObj) => coinIdObj.id === addTransactionData.id
    );
    const cloneObj = { ...userCoins[coinObjIndex] };
    switch (selectedTabIndex) {
      case 0:
        cloneObj.count += +addTransactionInputValue;
        break;
      case 1:
        cloneObj.count -= +addTransactionInputValue;
        break;
      default:
        cloneObj.count += +addTransactionInputValue;
        break;
    }
    const coinFilter = userCoins.filter((coinObj) => {
      return coinObj.id !== addTransactionData.id;
    });
    coinFilter.push(cloneObj);
    setUserCoins(coinFilter);
    onClose(false);
  };

  return (
    <div className="w-full">
      <Tab.Group
        onChange={(index) => {
          setSelectedTabIndex(index);
        }}
      >
        <Tab.List className="grid grid-cols-2 mb-3 border bg-gray-100 rounded-lg">
          {tabCategories.map((category) => {
            return (
              <Tab
                key={category}
                className={({ selected }) =>
                  classNames(
                    "w-full px-2 py-4 rounded-lg",
                    selected ? "border-2 border-teal bg-white" : ""
                  )
                }
              >
                {category}
              </Tab>
            );
          })}
        </Tab.List>
        <div className="w-full h-full">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Quantity</span>
            </label>
            <label class="input-group input-group-md">
              <input
                value={addTransactionInputValue}
                onChange={changeInputHandler}
                className="w-full input input-bordered"
                type="number"
                min="0"
              />
              <span className="uppercase">{addTransactionData.symbol}</span>
            </label>
          </div>
          <div className="form-control">
            <label class="label">
              <span class="label-text">
                {!selectedTabIndex ? "Total spent" : "Total Receive"}
                <span className="text-red-400 text-2xs ml-1">*read onlys</span>
              </span>
            </label>
            <label class="input-group input-group-md">
              <input
                className="w-full input input-bordered"
                type="text"
                value={
                  addTransactionInputValue *
                  addTransactionData.market_data.current_price.usd
                }
                min="0"
                readOnly
              />
              <span className="uppercase">USD</span>
            </label>
          </div>

          <button
            onClick={submitInputHandler}
            className="w-full btn bg-teal border-none mt-5"
          >
            submit
          </button>
        </div>
      </Tab.Group>
    </div>
  );
};

export default AddTransActionModal;
