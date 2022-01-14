import { useState, useContext } from "react";
import Modal from "../../shared/modal";
import ModalContent from "../modalContent/ModalContent";
import { coinsContext } from "../../../contexts/pagePortfolioContext";
import { useEffect } from "react/cjs/react.development";
import http from "../../../adapters/httpService";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import AddTransActionModal from "../addTransactionModal/AddTransAction";

const Assets = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddTransactionModalOpen, setIsAddTransactionModalOpen] =
    useState(false);
  const [addTransactionId, setAddTransactionId] = useState(null);
  const { userCoins, setUserCoins, coinsIdData, setCoinsIdData } =
    useContext(coinsContext);

  useEffect(() => {
    const array = [...userCoins];
    let userCoinData = [];
    let promises = [];
    for (let i = 0; i < array.length; i++) {
      promises.push(
        http.get(`/coins/${array[i].id}`).then((response) => {
          userCoinData.push(response.data);
        })
      );
    }

    Promise.all(promises).then(() => setCoinsIdData(userCoinData));
  }, [userCoins]);

  const addTransactionHandler = (id) => {
    setAddTransactionId(id);
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
      <div>
        <div className="px-4 py-4 -mx-4 overflow-x-auto sm:-mx-8 sm:px-8">
          <div className="inline-block min-w-full overflow-hidden rounded-lg shadow">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                  >
                    name
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                  >
                    value
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                  >
                    count
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                  >
                    action
                  </th>
                </tr>
              </thead>
              <tbody>
                {coinsIdData.map((coin) => {
                  return (
                    <tr key={coin.id}>
                      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <a href="/" className="relative block">
                              <img
                                alt="profil"
                                src={coin.image.large}
                                className="object-cover w-10 h-10 mx-auto rounded-full "
                              />
                            </a>
                          </div>
                          <div className="ml-3">
                            <p className="text-gray-900 whitespace-no-wrap">
                              {coin.name}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                        <p className="text-gray-900 whitespace-no-wrap">
                          ${coin.market_data.current_price.usd *
                            userCoins.find((x) => x.id === coin.id).count}
                        </p>
                      </td>
                      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {userCoins.find((x) => x.id === coin.id).count}
                        </p>
                      </td>
                      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                        <div class="dropdown dropdown-end">
                          <div
                            tabIndex="0"
                            className="p-3 bg-slate-200 rounded-md"
                          >
                            <HiOutlineDotsHorizontal color="black" />
                          </div>
                          <ul
                            tabIndex="0"
                            class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52"
                          >
                            <li
                              onClick={() => addTransactionHandler(coin.id)}
                              className="p-2"
                            >
                              Item 1
                            </li>
                            <li className="p-2">Item 2</li>
                            <li className="p-2">Item 3</li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                <Modal
                  className="min-h-[27rem] z-50"
                  isModalOpen={isAddTransactionModalOpen}
                  onClose={setIsAddTransactionModalOpen}
                >
                  <AddTransActionModal
                    addTransactionId={addTransactionId}
                    onClose={setIsAddTransactionModalOpen}
                  />
                </Modal>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assets;
