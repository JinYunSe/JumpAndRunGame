// key : uuid, value : array -> stage 정보는 배열
const stages = {};

// 유저가 진행한 스테이지 목록 저장할 변수 생성
const createStage = (uuid) => {
  stages[uuid] = [];
};

// 유저가 진행한 스테이지 목록 제공
const getStage = (uuid) => {
  return stages[uuid];
};

// 유저가 진행할 다음 스테이지
const setStage = (uuid, data, timestamp) => {
  return stages[uuid].push({ ...data, timestamp });
};

// 초기화
const clearStage = (uuid) => {
  stages[uuid] = [];
};

export { createStage, getStage, setStage, clearStage };
