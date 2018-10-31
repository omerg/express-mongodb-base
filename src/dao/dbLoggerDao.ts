import CoreDAO from './coreDao';
import DbLog from '../model/dbLog';

export default class DbLoggerDao extends CoreDAO {
  model = DbLog;
}
