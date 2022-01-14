import { useContext, useState } from "react";
import { coinsContext } from "../../../contexts/pagePortfolioContext";
import Modal from "../../shared/modal";

const AddTransActionModal = ({ addTransactionId, onClose }) => {
  const { userCoins, setUserCoins } = useContext(coinsContext);
  const [addTransactionInputValue, setAddTransactionInputValue] = useState("");

  const changeInputHandler = (e) => {
    setAddTransactionInputValue(e.target.value);
  };

  const submitInputHandler = () => {
    const coinObjIndex = userCoins.findIndex(
      (coinIdObj) => coinIdObj.id === addTransactionId
    );
    const cloneObj = { ...userCoins[coinObjIndex] };
    cloneObj.count += +addTransactionInputValue;
    const coinFilter = userCoins.filter((coinObj) => {
      return coinObj.id !== addTransactionId;
    });
    coinFilter.push(cloneObj);
    setUserCoins(coinFilter);
    onClose(false);
  };

  return (
    <div className="w-full h-full">
      <input
        value={addTransactionInputValue}
        onChange={changeInputHandler}
        className="w-full input input-bordered"
        type="number"
      />
      <button
        onClick={submitInputHandler}
        className="w-full btn btn-success mt-5"
      >
        submit
      </button>
    </div>
  );
};

export default AddTransActionModal;
