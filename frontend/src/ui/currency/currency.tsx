import { ChangeEvent, useState } from "react";

export type CurrencyConverterProps = {
    convertToUSD: (amount: number) => string;
    conversionRate: number;
  };
  
  export function CurrencyConverter({ convertToUSD, conversionRate }: CurrencyConverterProps) {
    const [amountBYN, setAmountBYN] = useState('');
    const [amountUSD, setAmountUSD] = useState('');
  
    const handleBYNChange = (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setAmountBYN(value);
      setAmountUSD((parseFloat(value) / conversionRate).toFixed(2));
    };
  
    const handleUSDChange = (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setAmountUSD(value);
      setAmountBYN((parseFloat(value) * conversionRate).toFixed(2));
    };
  
    return (
      <div>
        <div>
          <label>BYN:</label>
          <input type="text" value={amountBYN} onChange={handleBYNChange} />
        </div>
        <div>
          <label>USD:</label>
          <input type="text" value={amountUSD} onChange={handleUSDChange} />
        </div>
      </div>
    );
  }