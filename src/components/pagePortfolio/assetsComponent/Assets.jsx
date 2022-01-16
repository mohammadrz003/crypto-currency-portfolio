import { useState, useContext } from "react";
import Modal from "../../shared/modal";
import ModalContent from "../modalContent/ModalContent";
import { coinsContext } from "../../../contexts/pagePortfolioContext";
import AddTransActionModal from "../addTransactionModal/AddTransAction";
import AssetsTableItem from "./AssetsTableItem";

const Assets = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddTransactionModalOpen, setIsAddTransactionModalOpen] =
    useState(false);
  const [addTransactionData, setAddTransactionData] = useState(null);
  const { userCoins, coinsIdData } = useContext(coinsContext);

  const addTransactionHandler = (coin) => {
    setAddTransactionData(coin);
    setIsAddTransactionModalOpen(true);
  };

  return (
    <div className="w-4/6">
      <div className="flex items-center justify-between">
        <h4 className="text-xl font-semibold text-dark">Your assets</h4>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-teal text-dark px-3 py-1.5 rounded-md font-semibold"
        >
          Add New
        </button>
        <Modal
          className="min-h-[27rem]"
          isModalOpen={isModalOpen}
          onClose={setIsModalOpen}
        >
          <ModalContent setIsModalOpen={setIsModalOpen} />
        </Modal>
      </div>

      <div className="overflow-x-auto max-h-[23.4rem] overflow-y-auto mt-4">
        <table className="table w-full relative">
          <thead className="sticky top-0 z-10">
            <tr>
              <th>Name</th>
              <th>Count</th>
              <th>Value</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {coinsIdData.map((coin) => {
              return (
                <AssetsTableItem
                  key={coin.id}
                  coin={coin}
                  userCoins={userCoins}
                  addTransactionHandler={addTransactionHandler}
                />
              );
            })}
          </tbody>
        </table>
      </div>

      <Modal
        header="Add Transaction"
        isModalOpen={isAddTransactionModalOpen}
        onClose={setIsAddTransactionModalOpen}
      >
        <AddTransActionModal
          addTransactionData={addTransactionData}
          onClose={setIsAddTransactionModalOpen}
        />
      </Modal>
    </div>
  );
};

export default Assets;
