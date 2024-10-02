import { status } from 'init';
import { getGameAssets } from '../init/assets.js';
import { setUserItem } from '../models/item.model.js';

const itemHandler = (userId, payload) => {
  const { itemId } = payload;
  const { items } = getGameAssets();

  if (itemId > item.data.length) return { status: 'fail', message: 'Invalid Item' };
  const item = items.data[itemId];

  setUserItem(userId, item);
  return { status: 'success' };
};

export { itemHandler };
