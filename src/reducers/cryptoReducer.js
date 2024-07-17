const initialState = {
  cryptocurrencies: [],
  loading: false,
  error: null,
};

const cryptoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_CRYPTO_REQUEST":
      return { ...state, loading: true };
    case "FETCH_CRYPTO_SUCCESS":
      return {
        ...state,
        loading: false,
        cryptocurrencies: [...state.cryptocurrencies, action.payload],
      };
    case "FETCH_CRYPTO_FAILURE":
      return { ...state, loading: false, error: action.payload };
    case "REMOVE_CRYPTO":
      return {
        ...state,
        cryptocurrencies: state.cryptocurrencies.filter(
          (crypto) => crypto.id !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default cryptoReducer;
