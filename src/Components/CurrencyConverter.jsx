import React, { useState, useEffect } from "react";
import axios from "axios";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("EUR");
  const [currencies, setCurrencies] = useState([]);
  const [conversionRate, setConversionRate] = useState(null);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  useEffect(() => {
    // Fetch available currencies
    axios.get("https://open.er-api.com/v6/latest/USD").then((response) => {
      setCurrencies(Object.keys(response.data.rates));
      setConversionRate(response.data.rates[toCurrency]);
    });
  }, []);

  useEffect(() => {
    // Fetch conversion rate whenever fromCurrency, toCurrency, or date changes
    axios
      .get(`https://open.er-api.com/v6/latest/${fromCurrency}`)
      .then((response) => {
        setConversionRate(response.data.rates[toCurrency]);
      });
  }, [fromCurrency, toCurrency, date]);

  const convertCurrency = (amount, conversionRate) => {
    return (amount * conversionRate).toFixed(2);
  };

  return (
    <div>
      <h1>Currency Converter</h1>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <select
        value={fromCurrency}
        onChange={(e) => setFromCurrency(e.target.value)}
      >
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
      <select
        value={toCurrency}
        onChange={(e) => setToCurrency(e.target.value)}
      >
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
      <p>
        {amount} {fromCurrency} is equal to{" "}
        {convertCurrency(amount, conversionRate)} {toCurrency}
      </p>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
    </div>
  );
};

export default CurrencyConverter;
