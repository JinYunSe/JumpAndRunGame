// key : uuid, value : array -> stage 정보는 배열
const items = {};
// 스테이지 초기화
const createUserItem = (uuid) => {
  items[uuid] = [];
};

// 유저에게 현재 스테이지
const getUserItem = (uuid) => {
  return items[uuid];
};

// 유저에게 제공할 스테이지
const setUserItem = (uuid, score) => {
  return items[uuid].push(score);
};

const clearUserItem = (uuid) => {
  items[uuid] = [];
};

export { createUserItem, getUserItem, setUserItem, clearUserItem };
