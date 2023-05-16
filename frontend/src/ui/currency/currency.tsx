import { ChangeEvent, useState } from "react";
import { ConversionRates } from "../../pages/Products/Products";

interface CurrencyConverterProps {
  convertToUSD: (amount: number) => string;
  convertToPLN: (amount: number) => string;
  convertToEUR: (amount: number) => string;
  conversionRate: ConversionRates | null;
}

export function CurrencyConverter({
  convertToUSD,
  convertToPLN,
  convertToEUR,
  conversionRate
}: CurrencyConverterProps) {
  const [amountBYN, setAmountBYN] = useState<string>("");
  const [amountUSD, setAmountUSD] = useState<string>("");
  const [amountPLN, setAmountPLN] = useState<string>("");
  const [amountEUR, setAmountEUR] = useState<string>("");

  const handleBYNChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setAmountBYN(value);
    if (conversionRate) {
      setAmountUSD((parseFloat(value) * conversionRate.usdToBynRate).toFixed(2));
      setAmountPLN((parseFloat(value) * conversionRate.plnToBynRate).toFixed(2));
      setAmountEUR((parseFloat(value) * conversionRate.eurToBynRate).toFixed(2));
    }
  };

  const handleUSDChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setAmountUSD(value);
    if (conversionRate) {
      setAmountBYN((parseFloat(value) * conversionRate.usdToBynRate).toFixed(2));
      setAmountPLN(
        ((parseFloat(value) * conversionRate.usdToBynRate) * conversionRate.plnToBynRate).toFixed(2)
      );
      setAmountEUR(
        ((parseFloat(value) * conversionRate.usdToBynRate) * conversionRate.eurToBynRate).toFixed(2)
      );
    }
  };

  const handlePLNChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setAmountPLN(value);
    if (conversionRate) {
      setAmountBYN((parseFloat(value) / conversionRate.plnToBynRate).toFixed(2));
      setAmountUSD(
        ((parseFloat(value) / conversionRate.plnToBynRate) / conversionRate.usdToBynRate).toFixed(2)
      );
      setAmountEUR(
        ((parseFloat(value) / conversionRate.plnToBynRate) * conversionRate.eurToBynRate).toFixed(2)
      );
    }
  };

  const handleEURChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setAmountEUR(value);
    if (conversionRate) {
      setAmountBYN((parseFloat(value) / conversionRate.eurToBynRate).toFixed(2));
      setAmountUSD(
        ((parseFloat(value) / conversionRate.eurToBynRate) / conversionRate.usdToBynRate).toFixed(2)
      );
      setAmountPLN(
        ((parseFloat(value) / conversionRate.eurToBynRate) / conversionRate.plnToBynRate).toFixed(2)
      );
    }
  };

  return (
    <div>
      <div>
        <label>BYN:</label>
        <input type="text" value={amountBYN} onChange={handleBYNChange} />
      </div>
      <div>
        <label>USD:</label>
        <input type="text" value={amountUSD} readOnly={true} onChange={handleUSDChange} />
      </div>
      <div>
        <label>PLN:</label>
        <input type="text" value={amountPLN} readOnly={true} onChange={handlePLNChange} />
      </div>
      <div>
        <label>EUR:</label>
        <input type="text" value={amountEUR} readOnly={true} onChange={handleEURChange} />
      </div>
    </div>
  );
}
