import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCrypto, removeCrypto } from "../actions/cryptoActions";
import CryptoItem from "./CryptoItem";
import "../style/CryptoList.css";

const CryptoList = () => {
  const [newCrypto, setNewCrypto] = useState("");
  const [addedCryptos, setAddedCryptos] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const cryptocurrencies = useSelector(
    (state) => state.crypto.cryptocurrencies
  );
  const loading = useSelector((state) => state.crypto.loading);
  const error = useSelector((state) => state.crypto.error);

  // Array of cryptocurrencies
  const cryptoList = [
    "Bitcoin",
    "Ethereum",
    "Cardano",
    "BNB",
    "Solana",
    "XRP",
    "Polkadot",
    "Dogecoin",
    "Chainlink",
    "Litecoin",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      cryptocurrencies.forEach((crypto) => {
        const lastUpdatedTime = new Date(crypto.lastUpdated).getTime();
        const currentTime = new Date().getTime();
        const timeDifference = (currentTime - lastUpdatedTime) / 1000;

        if (timeDifference >= 60) {
          dispatch(fetchCrypto(crypto.id));
        }
      });
    }, 60000);

    return () => clearInterval(interval);
  }, [cryptocurrencies, dispatch]);

  const handleAddCrypto = () => {
    if (newCrypto) {
      const cryptoToAdd = newCrypto.toLowerCase();

      const isAlreadyAdded = cryptocurrencies.some(
        (crypto) => crypto.id.toLowerCase() === cryptoToAdd
      );

      if (isAlreadyAdded) {
        alert(`${newCrypto} is already added.`);
        setNewCrypto("");
      } else {
        dispatch(fetchCrypto(cryptoToAdd));
        setAddedCryptos([...addedCryptos, cryptoToAdd]);
        setNewCrypto("");
      }
    }
  };

  const handleRemove = (id) => {
    dispatch(removeCrypto(id));
  };

  const handleInputClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleCryptoSelection = (crypto) => {
    setNewCrypto(crypto); // Set selected crypto in input field
    setDropdownOpen(false);
  };

  return (
    <div className="crypto-list-container">
      <h1>Crypto Tracker</h1>
      <div className="input-container">
        <div className="dropdown">
          <input
            type="text"
            value={newCrypto}
            onChange={(e) => setNewCrypto(e.target.value)}
            placeholder="Add cryptocurrency (e.g., btc)"
            onClick={handleInputClick}
          />
          {dropdownOpen && (
            <div className="dropdown-content">
              {cryptoList.map((crypto, index) => (
                <div
                  key={index}
                  className="crypto-option"
                  onClick={() => handleCryptoSelection(crypto)}
                >
                  {crypto}
                </div>
              ))}
            </div>
          )}
        </div>
        <button onClick={handleAddCrypto}>Add</button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="crypto-items-container">
        {Array.isArray(cryptocurrencies) && cryptocurrencies.length > 0 ? (
          cryptocurrencies.map((crypto) => (
            <CryptoItem
              key={crypto.id}
              crypto={crypto}
              onRemove={handleRemove}
            />
          ))
        ) : (
          <p>No cryptocurrencies found.</p>
        )}
      </div>
    </div>
  );
};

export default CryptoList;
