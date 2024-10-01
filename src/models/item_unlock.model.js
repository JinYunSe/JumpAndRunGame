const item_unlock = {};

// 유저한테 뜰 아이템 초기화
const createUnlockItem = (uuid) => {
  item_unlock[uuid] = [];
};

// 현재 스테이지에 뜰 Item 제공
const getUnlockItem = (uuid) => {
  return item_unlock[uuid];
};

// 현재 스테이지에 생성될 Item
const setUnlockItem = (uuid, id, stage_id) => {
  item_unlock[uuid].push({ id });
};

const clearUnlockItem = (uuid) => {
  item_unlock[uuid] = [];
};

export { createUnlockItem, getUnlockItem, setUnlockItem, clearUnlockItem };
