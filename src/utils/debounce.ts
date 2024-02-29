export const debounce = (func: (query: string) => void, timeout: number) => {
  let timerId: number;

  return (...args: string[]) => {
    clearTimeout(timerId);

    timerId = window.setTimeout(func, timeout, ...args);
  };
};
