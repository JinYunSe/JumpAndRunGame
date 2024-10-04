import { getGameAssets } from '../init/assets.js';
import { setUserItem } from '../models/item.model.js';

const itemHandler = (userId, payload) => {
  const { stageId, itemId } = payload;
  const { items } = getGameAssets();

  if (itemId > items.data.length) return { status: 'fail', message: 'Invalid Item' };
  const itemScore = items.data[itemId - 1].score;

  setUserItem(userId, { stageId, itemScore });
  return { status: 'success' };
};

export { itemHandler };
