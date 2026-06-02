export const currencies = {
  zh: { code: 'CNY', symbol: '¥', name: '人民币' },
  en: { code: 'USD', symbol: '$', name: 'USD' }
};

export const exchangeRates = {
  CNY: 1,
  USD: 0.14  // 1 CNY = 0.14 USD
};

export function formatPrice(priceCNY, lang) {
  const currency = currencies[lang];
  const rate = exchangeRates[currency.code];
  const convertedPrice = Math.round(priceCNY * rate);
  return `${currency.symbol}${convertedPrice}`;
}
