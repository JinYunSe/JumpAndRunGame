// key : uuid, value : array -> stage 정보는 배열
const stages = {};

// 스테이지 초기화
const createStage = (uuid) => {
  stages[uuid] = [];
};

// 유저에게 현재 스테이지
const getStage = (uuid) => {
  return stages[uuid];
};

// 유저에게 제공할 스테이지
const setStage = (uuid, data, timestamp) => {
  return stages[uuid].push({ ...data, timestamp });
};

const clearStage = (uuid) => {
  stages[uuid] = [];
};

export { createStage, getStage, setStage, clearStage };
