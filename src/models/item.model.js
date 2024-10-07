// key : uuid, value : array -> stage 정보는 담은 배열
const items = {};

// 스테이지 초기화
const createUserItem = (uuid) => {
  items[uuid] = {};
};

// 유저에게 현재 스테이지
const getUserItem = (uuid, stageId) => {
  return items[uuid][stageId - 1000];
  // 유저의 현재 스테이지에 먹은 아이템 점수 목록 반환
};

// 유저에게 제공할 스테이지
const setUserItem = (uuid, { stageId, itemScore }) => {
  if (!items[uuid][stageId - 1000]) items[uuid][stageId - 1000] = [];
  // 유저가 먹은 현재 스테이지의 먹은 아이템 점수 목록이 없으면 생성
  items[uuid][stageId - 1000].push(itemScore);
  // 아이템 점수 추가
};

const clearUserItem = (uuid) => {
  items[uuid] = [];
  // 유저가 먹은 아이템 목록 초기화
};

export { createUserItem, getUserItem, setUserItem, clearUserItem };
