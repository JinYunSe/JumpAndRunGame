// key : uuid, value : array -> stage 정보는 배열
const itemUnlock = {};

// 유저한테 뜰 아이템 초기화
const createUnlockItem = (uuid) => {
  itemUnlock[uuid] = [];
};

// 현재 스테이지에 뜰 Item 제공
const getUnlockItem = (uuid) => {
  return itemUnlock[uuid];
};

// 현재 스테이지에 생성될 Item
const setUnlockItem = (uuid, id) => {
  itemUnlock[uuid].push(id);
};

// 유저의 현재 스테이지 초기화
const clearUnlockItem = (uuid) => {
  itemUnlock[uuid] = [];
};

export { createUnlockItem, getUnlockItem, setUnlockItem, clearUnlockItem };
