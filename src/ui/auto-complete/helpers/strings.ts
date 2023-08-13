/**
 * Normalizes a string by removing special characters and accents.
 * This function takes advantage of the String.prototype.normalize method
 * with the 'NFD' form, which represents a Unicode character in its
 * decomposed form. After that, it removes all combining characters
 * (accents, in most cases) using a regular expression.
 *
 * @param {string} str - The string to be normalized.
 * @returns {string} - The normalized string.
 */
export function normalizeString(str: string): string {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

/**
 * Decomposes a label into prefix, match, and suffix based on the provided query.
 *
 * This function looks for the query string within the label, and if found, it
 * breaks down the label into three parts:
 * 1. The prefix: characters before the matched query.
 * 2. The match: the exact portion of the label that matches the query.
 * 3. The suffix: characters after the matched query.
 *
 * If the query is not found within the label, it returns the label as the prefix
 * with the match and suffix being empty strings.
 *
 * @param {string} label - The main string where we look for the query.
 * @param {string} query - The substring to look for within the label.
 * @returns {[string, string, string]} - An array containing the prefix, match, and suffix respectively.
 */
export function decomposeLabel(
  label: string,
  query: string
): [string, string, string] {
  const startIndex = normalizeString(label).indexOf(normalizeString(query));
  if (startIndex === -1) return [label, "", ""];

  const endIndex = startIndex + query.length;

  const prefix = label.substring(0, startIndex);
  const match = label.substring(startIndex, endIndex);
  const suffix = label.substring(endIndex);

  return [prefix, match, suffix];
}
