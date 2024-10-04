import { setUnlockItem, getUnlockItem } from '../models/item.unlock.model.js';

const itemUnlockHandler = (userId, payload) => {
  const { currentStageId, targetStageId } = payload;
  let currentItemUnlocks = getUnlockItem(userId);
  // 서버가 알고 있는 유저 아이템 언락 정보 가져오기
  // 배열 안에는 스테이지 아이디가 존재한다.

  // 서버가 알고 있는 유저가 언락한 아이템들
  if (!currentItemUnlocks.length) {
    return { status: 'fail', message: 'No ItemUnlock Found For User' };
  }
  // 언락한 아이템이 없을 경우 에러 메시지 반환

  currentItemUnlocks.sort((a, b) => a - b);
  //오름 차순 정렬

  if (currentItemUnlocks[currentItemUnlocks.length - 1] !== currentStageId)
    return { status: 'fail', message: 'Current ItemUnLock Mismatch' };
  // 서버가 알고 있는 유저의 스테이지 정보와 클라이언트가 제공한 현재 스테이지 정보 비교
  // (스테이지가 다를 경우 아이템 언락 정보도 다른 상태)

  setUnlockItem(userId, targetStageId);
  console.log('ItemUnlock : ', getUnlockItem(userId));
  return { status: 'success' };
};

export { itemUnlockHandler };
