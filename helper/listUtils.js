export function listToTable(list, headers) {
  if (headers === undefined) {
    const autodetectedheaders = getUniqueKeysOf(list);
    return listToTable(list, autodetectedheaders);
  }
  const rows = [headers, ...listToRows(list, headers)];
  return rows;
}

export function getUniqueKeysOf(list) {
  const headers = list.reduce((aggregator, item) => {
    Object.keys(item).map((key) => aggregator.add(key));
    return aggregator;
  }, new Set());
  return Array.from(headers);
}

export function ensureKeys(keys, list) {
  return list.map((item) => {
    const newItem = item;
    keys.forEach((key) => {
      if (item[key] === undefined) {
        newItem[key] = "";
      }
    });
    return newItem;
  });
}

export function listToRows(list, headers) {
  return list.map((row) =>
    headers.map((header) => {
      const value = row[header];
      if (value === undefined) {
        return "";
      }
      return value;
    })
  );
}
