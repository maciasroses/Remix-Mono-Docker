const getExchangeRate = (fromCurrency: string, toCurrency: string) => {
  const exchangeRates: { [key: string]: { [key: string]: number } } = {
    MXN: { USD: 0.054, GBP: 0.02375, EUR: 0.051 },
    GBP: { USD: 1.29, MXN: 42.0, EUR: 1.18 },
    USD: { MXN: 18.18, GBP: 0.83, EUR: 0.93 },
    EUR: { MXN: 19.61, GBP: 0.85, USD: 1.07 },
  };
  return exchangeRates[fromCurrency][toCurrency] || 1;
};

export default getExchangeRate;
