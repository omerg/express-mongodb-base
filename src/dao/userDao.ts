import CoreDAO from './coreDao';
import User from '../model/user';

export default class UserDAO extends CoreDAO {
  model = User;
}
