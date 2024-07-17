import axios from "axios";

// Action to fetch cryptocurrency data
export const fetchCrypto = (id) => async (dispatch) => {
  dispatch({ type: "FETCH_CRYPTO_REQUEST" });

  try {
    const response = await axios.get(
      `https://data.messari.io/api/v1/assets/${id}/metrics`
    );
    const data = response.data.data;

    const cryptoData = {
      id: id,
      name: data.name,
      priceUsd: data.market_data.price_usd,
      changePercent24Hr: data.market_data.percent_change_usd_last_24_hours,
    };

    dispatch({ type: "FETCH_CRYPTO_SUCCESS", payload: cryptoData });
  } catch (error) {
    dispatch({ type: "FETCH_CRYPTO_FAILURE", payload: error.message });
  }
};

// Action to remove a cryptocurrency
export const removeCrypto = (id) => ({
  type: "REMOVE_CRYPTO",
  payload: id,
});
