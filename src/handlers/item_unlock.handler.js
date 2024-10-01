import { setUnlockItem, getUnlockItem } from '../models/item_unlock.model.js';
import { getGameAssets } from '../init/assets.js';

const itemUnlockHandler = (userId, payload) => {
  let currentItemUnlocks = getUnlockItem(userId);

  console.log('currentItemUnlock : ', currentItemUnlocks);
  console.log('아이템 언락에서 스테이지 확인 : ', payload);

  if (!currentItemUnlocks.length) {
    return { status: 'fail', message: 'No ItemUnlock Found For User' };
  }

  currentItemUnlocks.sort((a, b) => a.id - b.id);

  const currentItemUnlock = currentItemUnlocks[currentItemUnlocks.length - 1];

  if (currentItemUnlock.stage_id !== payload.id)
    return { status: 'fail', message: 'Current ItemUnLock Mismatch' };

  return { status: 'success' };
};

export { itemUnlockHandler };
