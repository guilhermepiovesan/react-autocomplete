export const decomposeLabel = (
  label: string,
  query: string
): [string, string, string] => {
  const startIndex = label.toLowerCase().indexOf(query.toLowerCase());
  if (startIndex === -1) return [label, "", ""];

  const endIndex = startIndex + query.length;

  const prefix = label.substring(0, startIndex);
  const match = label.substring(startIndex, endIndex);
  const suffix = label.substring(endIndex);

  return [prefix, match, suffix];
};
