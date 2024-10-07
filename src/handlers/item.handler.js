import { getGameAssets } from '../init/assets.js';
import { setUserItem } from '../models/item.model.js';

const itemHandler = (userId, payload) => {
  const { stageId, itemId } = payload;
  // 무슨 stage인지 확인해주는 id와
  // 무슨 item을 먹어는지 확인해주는 id

  const { items } = getGameAssets();
  // 게임 내 정보를 가진 JSON 파일에서 item과 관련된
  // JSON 파일만 가져온다.

  if (itemId - 1 > items.data.length) return { status: 'fail', message: 'Invalid Item' };
  // Clinet가 먹은 아이템의 id가 JSON 파일 내 존재하지 않는 아이템인지 확인

  const itemScore = items.data[itemId - 1].score;
  // item관련 JSON 파일에서 해당 아이템의 점수 가져오기

  setUserItem(userId, { stageId, itemScore });
  // 해당 유저와 스테이지에 item 점수 기록
  return { status: 'success' };
};

export { itemHandler };
