const items = {};

// 유저한테 뜰 아이템 초기화
const createItem = (uuid) => {
  items[uuid] = [];
};

// 현재 스테이지에 뜰 Item 제공
const getItem = (uuid) => {
  return items[uuid];
};

// 현재 스테이지에 생성될 Item
const setItem = (uuid, id) => {
  return items[uuid].push({ id });
};

const clearItem = (uuid) => {
  items[uuid] = [];
};

export { createItem, getItem, setItem, clearItem };
