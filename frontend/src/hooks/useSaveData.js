import { useState } from 'react';

const useSaveData = (key) => {
  const [data, setData] = useState(() => {
    // get initial data from localstorage
    const savedData = localStorage.getItem(key);
    return savedData ? JSON.parse(savedData) : [];
  });

  // save new data to local storage
  const saveItem = (id, newData) => {
    const updatedData = [...data];
    const index = updatedData.findIndex((item) => item.id === id);

    if (index !== -1) {
      // if exists, update
      updatedData[index].data = newData;
    } else {
      // if not exists, push new
      updatedData.push({ id, data: newData });
    }

    // update local storage
    localStorage.setItem(key, JSON.stringify(updatedData));
    setData(updatedData);
  };

  // get by id
  const getItem = (id) => {
    return data.find((item) => item.id === id)?.data || null;
  };

  // remove by id
  const removeItem = (id) => {
    const updatedData = data.filter((item) => item.id !== id);
    localStorage.setItem(key, JSON.stringify(updatedData));
    setData(updatedData);
  };

  // clear all
  const clearAll = () => {
    localStorage.removeItem(key);
    setData([]);
  };

  return { saveItem, getItem, removeItem, clearAll, data };
};

export default useSaveData;
