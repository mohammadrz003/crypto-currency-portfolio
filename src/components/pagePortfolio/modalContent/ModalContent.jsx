import { useEffect, useState } from "react";
import { searchCoins } from "../../../adapters/pagePortfolioAdapter";
import axiox from "axios";
import SearchResult from "./SearchResult";
import localHttp from "../../../adapters/localHttpService";

const ModalContent = ({ setIsModalOpen }) => {
  const [isSearchResultFocus, setIsSearchResultFocus] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [filteredCoins, setFilteredCoins] = useState([]);

  const searchInputChangeHandler = (e) => {
    setSearchInputValue(e.target.value);
  };

  useEffect(() => {
    if (searchInputValue !== "") {
      var timerForSearch = setTimeout(() => {
        searchCoins(searchInputValue)
          .then((response) => {
            setFilteredCoins(response.data.coins);
          })
          .catch((error) => {
            console.log(error);
          });
      }, 700);
    }

    return () => {
      clearTimeout(timerForSearch);
    };
  }, [searchInputValue]);

  return (
    <div>
      <div className="relative">
        <input
          onFocus={() => setIsSearchResultFocus(true)}
          // onBlur={() => setIsSearchResultFocus(false)}
          onChange={searchInputChangeHandler}
          value={searchInputValue}
          className="w-full p-2 border border-gray-400 rounded-md outline-none"
          placeholder="Select Coin"
          type="text"
        />
        <SearchResult
          filteredCoins={filteredCoins}
          searchInputValue={searchInputValue}
          isSearchResultFocus={isSearchResultFocus}
          setIsSearchResultFocus={setIsSearchResultFocus}
          setIsModalOpen={setIsModalOpen}
        />
      </div>
    </div>
  );
};

export default ModalContent;
