import React from "react";
import "../style/CryptoItem.css";

const CryptoItem = ({ crypto, onRemove }) => {
  const { id, name, priceUsd, changePercent24Hr } = crypto;

  const formattedPrice = parseFloat(priceUsd).toFixed(2);
  const formattedChange = parseFloat(changePercent24Hr).toFixed(2);

  const changeSymbol = changePercent24Hr >= 0 ? "▲" : "▼";

  return (
    <div className="crypto-item-container">
      <div className="crypto-item-content">
        <h2>{name}</h2>
        <p className="price">Price: ${formattedPrice}</p>
        <p>
          Change (24h):{" "}
          <span
            className={`change ${
              changePercent24Hr >= 0 ? "positive" : "negative"
            }`}
          >
            {changeSymbol} {formattedChange}%
          </span>
        </p>
        <button className="remove-button" onClick={() => onRemove(id)}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default CryptoItem;
