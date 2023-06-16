export const sklonenie = (number, txt, cases = [2, 0, 1, 1, 1, 2]) => txt[(number % 100 > 4 && number % 100 < 20) ? 2 :
  cases[(number % 10 < 5) ? number % 10 : 5]];

export const discountNumber = (price, discount) =>{
  return  Math.round(price - (price/100*discount))
}

export const getAverage = (reviews) => {
  const sum = reviews.reduce((acc, el) => acc + el.rating, 0);
  const length = reviews.length;
  return sum / length;
};