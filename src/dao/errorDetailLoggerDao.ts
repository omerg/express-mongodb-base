import CoreDAO from './coreDao';
import ErrorDetailLog from '../model/errorDetailLog';

export default class ErrorDetailLoggerDao extends CoreDAO {
  model = ErrorDetailLog;
}
