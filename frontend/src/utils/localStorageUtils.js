const DEFAULT_EXPIRY_TIME = 60 * 60 * 1000; //expiry after one hour

// save data to local storage with default expiry time
export const setWithExpiry = (key, value) => {
  const expiry = Date.now() + DEFAULT_EXPIRY_TIME; // milliseconds when item expiry
  const item = { value, expiry };
  localStorage.setItem(key, JSON.stringify(item));
};

export const getWithExpiry = (key) => {
  const item = localStorage.getItem( key );
  console.log( item );

  if (!item) return null;

  const itemJSON = JSON.parse(item)

  if (Date.now() > itemJSON.expiry) {
    localStorage.removeItem(key);
    return null;
  }

  return itemJSON.value;
};
