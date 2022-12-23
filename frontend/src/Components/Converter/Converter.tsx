import axios from 'axios';
import React, { useState, useEffect } from 'react';

const API_URL = ' https://v6.exchangerate-api.com/v6/9e01f749e605de6a06421c20/latest/USD';
const COUNTRIES_API_URL = 'https://api.printful.com/countries';

interface ExchangeRates {
  [currency: string]: number;
}

interface ExchangeRateResponse {
  base: string;
  rates: ExchangeRates;
}

interface Country {
  code: string;
  name: string;
  currency: string;
}

async function getExchangeRates(base: string): Promise<ExchangeRates> {
  try {
    const response = await axios.get<ExchangeRateResponse>(API_URL, {
      params: {
        base,
      },
    });
    return response.data.rates;
  } catch (error) {
    throw error;
  }
}

async function convertCurrency(
  amount: number,
  from: string,
  to: string
): Promise<number> {
  try {
    const exchangeRates = await getExchangeRates(from);
    const rate = exchangeRates[to];
    if (!rate) {
      throw new Error(`Unable to convert from ${from} to ${to}`);
    }
    return amount * rate;
  } catch (error) {
    throw error;
  }
}

const CurrencyConverter: React.FC = () => {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [result, setResult] = useState(0);
  const [error, setError] = useState('');
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      const response = await axios.get<Country[]>(COUNTRIES_API_URL);
      console.log(COUNTRIES_API_URL)
      setCountries(response.data);
    };
    fetchCountries();
  }, []);

  const handleConvert = async () => {
    try {
      const convertedAmount = await convertCurrency(amount, from, to);
      setResult(convertedAmount);
      setError('');
    } catch (err: any) {
      setError(err.message);
      setResult(0);
    }
  };

  return (
    <div>
      <label htmlFor="amount">Amount:</label>
      <input
        type="number"
        id="amount"
        value={amount}
        onChange={(e) => setAmount(parseFloat(e.target.value))}
      />
      <br />
      <label htmlFor="from">From:</label>
      <select
        id="from"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
      />
      <br />
      <label htmlFor="to">To:</label>
      <select
        id="to"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      >
        {countries.map((country) => (
          <option key={country.code} value={country.currency}>
            {country.name}
          </option>
        ))}
      </select>
      <br />
      <button type="button" onClick={handleConvert}>
        Convert
      </button>
      {error && <div className="error">{error}</div>}
      {result && (
        <div>
          {amount} {from} is worth {result} {to}
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;