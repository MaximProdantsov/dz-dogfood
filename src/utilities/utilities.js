export const sklonenie = (number, txt, cases = [2, 0, 1, 1, 1, 2]) => txt[(number % 100 > 4 && number % 100 < 20) ? 2 :
  cases[(number % 10 < 5) ? number % 10 : 5]];

export const discountNumber = (price, discount) => {
  return Math.round(price - (price / 100 * discount))
}

export const getAverage = (reviews) => {
  const sum = reviews.reduce((acc, el) => acc + el.rating, 0);
  const length = reviews.length;
  return sum / length;
};

export function parseJwt(token) {
  if (!token) return null
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

export function createPages(pages, pagesCount, currentPage) {
  if (pagesCount > 10) {
    if (currentPage > 5) {
      for (let i = currentPage - 4; i <= currentPage + 5; i++) {
        pages.push(i)
        if (i === pagesCount) break
      }
    }
    else {
      for (let i = 1; i <= 10; i++) {
        pages.push(i)
        if (i === pagesCount) break
      }
    }
  } else {
    for (let i = 1; i <= pagesCount; i++) {
      pages.push(i)
    }
  }
}