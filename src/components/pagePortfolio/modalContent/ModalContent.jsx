import { useEffect, useState } from "react/cjs/react.development";
import { searchCoins } from "../../../adapters/pagePortfolioAdapter";
import axiox from "axios";
import SearchResult from "./SearchResult";
import localHttp from "../../../adapters/localHttpService";

const ModalContent = () => {
  const [isSearchResultFocus, setIsSearchResultFocus] = useState(false);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [filteredCoins, setFilteredCoins] = useState([]);

  const searchInputChangeHandler = (e) => {
    setSearchInputValue(e.target.value);
  };

  useEffect(() => {
    if (searchInputValue !== "") {
      console.log("useEffect is runs");
      var timerForSearch = setTimeout(() => {
        searchCoins(searchInputValue)
          .then((response) => {
            setFilteredCoins(response.data.coins);
          })
          .catch((error) => {
            console.log(error);
          });
      }, 700);
      //   localHttp
      //     .get(`/coins`)
      //     .then((response) => {
      //       setFilteredCoins(response.data);
      //     })
      //     .catch((error) => {
      //       console.log(error);
      //     });
    }

    return () => {
      clearTimeout(timerForSearch);
    };
  }, [searchInputValue]);

  console.log(filteredCoins.length);

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
        />
      </div>
    </div>
  );
};

export default ModalContent;
