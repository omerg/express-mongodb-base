import CoreDAO from './coreDao';
import Category from '../model/category';

export default class CategoryDao extends CoreDAO {
  model = Category;
}
