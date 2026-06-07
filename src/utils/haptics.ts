const vibrate = (pattern: number | number[]) => {
  try {
    (navigator as any).vibrate?.(pattern);
  } catch {
    /* not supported — ignore */
  }
};

export default vibrate;
