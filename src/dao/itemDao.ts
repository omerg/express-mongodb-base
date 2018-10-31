import CoreDAO from './coreDao';
import Item from '../model/item';

export default class ItemDAO extends CoreDAO {
  model = Item;
}
