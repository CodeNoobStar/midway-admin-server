import { Rule, RuleType } from '@midwayjs/validate';
import { ApiProperty } from '@midwayjs/swagger';
import { UserEntity } from '../entity/User';
import { BaseDTO } from '../../../common/base-dto';
import { requiredString, phone, email } from '../../../common/common-validate-rules';
import { R } from '../../../common/base.error.util';

// 验证规则
export class UserDTO extends BaseDTO<UserEntity> {
	@ApiProperty({ description: '用户名' })
	@Rule(requiredString.error(R.validateError('用户名不能为空')))
	userName?: string;

	@ApiProperty({ description: '用户昵称' })
	@Rule(requiredString.error(R.validateError('用户昵称不能为空')))
	nickName?: string;

	@ApiProperty({ description: '手机号' })
	@Rule(phone.error(R.validateError('手机号不能为空')))
	phoneNumber?: string;

	@ApiProperty({ description: '邮箱' })
	@Rule(email.error(R.validateError('邮箱不能为空')))
	email?: string;

	@ApiProperty({ description: '头像', nullable: true }) // 可为空
	avatar?: string;

	@ApiProperty({ description: '性别（0:女，1:男）', nullable: true }) // 可为空
	@Rule(RuleType.number().integer().allow(null).valid(0, 1).error(R.validateError('性别格式不正确')))
	sex?: number;
}
