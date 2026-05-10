/** Returns true if the string contains Arabic Unicode characters */
export const isArabic = (text) => /[\u0600-\u06FF]/.test(text);

/** Returns the CSS text direction based on content */
export const getDir = (text) => (isArabic(text) ? "rtl" : "ltr");

/** Returns the appropriate font-family string based on content */
export const getFont = (text) =>
  isArabic(text)
    ? "'Noto Sans Arabic', 'DM Sans', sans-serif"
    : "'DM Sans', sans-serif";
