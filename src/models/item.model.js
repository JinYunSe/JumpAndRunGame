// key : uuid, value : array -> stage 정보는 배열
const items = {};
// 스테이지 초기화
const createUserItem = (uuid) => {
  items[uuid] = {};
};

// 유저에게 현재 스테이지
const getUserItem = (uuid, stageId) => {
  return items[uuid][stageId - 1000];
};

// 유저에게 제공할 스테이지
const setUserItem = (uuid, { stageId, itemScore }) => {
  if (!items[uuid][stageId - 1000]) items[uuid][stageId - 1000] = [];
  items[uuid][stageId - 1000].push(itemScore);
};

const clearUserItem = (uuid) => {
  items[uuid] = [];
};

export { createUserItem, getUserItem, setUserItem, clearUserItem };
