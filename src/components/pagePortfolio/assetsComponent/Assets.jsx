import { useState, useContext } from "react";
import Modal from "../../shared/modal";
import ModalContent from "../modalContent/ModalContent";
import { coinsContext } from "../../../contexts/pagePortfolioContext";
import { useEffect } from "react/cjs/react.development";
import http from "../../../adapters/httpService";

const Assets = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userCoins, setUserCoins } = useContext(coinsContext);
  const [coinsIdData, setCoinsIdData] = useState([]);

  useEffect(() => {
    let coinsDataList = [];
    for (let i = 0; i < userCoins.length; i++) {
      const getUserCoinIdData = async () => {
        try {
          const { data } = await http.get(`/coins/${userCoins[i]}`);
          coinsDataList.push(data);
        } catch (error) {
          console.log(error);
        }
      };
      getUserCoinIdData();
    }

    console.log(coinsDataList);
    setCoinsIdData(coinsDataList);
  }, [userCoins]);

  return (
    <div className="w-4/6">
      <div className="flex items-center justify-between">
        <h4 className="text-xl font-semibold">Your assets</h4>
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
          <ModalContent />
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
                    User
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                  >
                    Role
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                  >
                    Created at
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 text-sm font-normal text-left text-gray-800 uppercase bg-white border-b border-gray-200"
                  >
                    status
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
                              Julien Huger
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                        <p className="text-gray-900 whitespace-no-wrap">User</p>
                      </td>
                      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                        <p className="text-gray-900 whitespace-no-wrap">
                          23/09/2010
                        </p>
                      </td>
                      <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                        <span className="relative inline-block px-3 py-1 font-semibold leading-tight text-green-900">
                          <span
                            aria-hidden="true"
                            className="absolute inset-0 bg-green-200 rounded-full opacity-50"
                          ></span>
                          <span className="relative">active</span>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assets;
