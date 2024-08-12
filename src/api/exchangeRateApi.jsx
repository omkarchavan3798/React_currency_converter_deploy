import axios from 'axios';

const BASE_URL = 'https://open.er-api.com/v6';

export const fetchCurrencies = async () => {
  const response = await axios.get(`${BASE_URL}/latest/USD`);
  return response.data;
};

export const fetchConversionRate = async (fromCurrency, toCurrency) => {
  const response = await axios.get(`${BASE_URL}/latest/${fromCurrency}`);
  return response.data.rates[toCurrency];
};
