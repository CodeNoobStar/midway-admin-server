import { PageVOWrapper } from '../../../common/page-result-vo';
import { UserVO } from './User';

// 列表返回值
export class UserPageVO extends PageVOWrapper<UserVO>(UserVO) {}
