export const loadData = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error("LOCAL STORAGE LOAD ERROR: ", e);
    return null;
  }
};

export const saveData = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error("LOCAL STORAGE SAVE ERROR: ", e);
  }
};