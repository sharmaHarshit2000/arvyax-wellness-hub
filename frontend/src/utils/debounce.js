export default function debounce(fn, delay) {
  let timer;
  function debounced(...args) {
    clearTimeout(timer);
    return new Promise((resolve) => {
      timer = setTimeout(async () => {
        const result = await fn(...args);
        resolve(result);
      }, delay);
    });
  }
  debounced.flush = async (...args) => {
    clearTimeout(timer);
    return fn(...args);
  };
  return debounced;
}
