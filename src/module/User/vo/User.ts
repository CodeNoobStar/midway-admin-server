import { ApiProperty } from '@midwayjs/swagger';
import { BaseVO } from './../../../common/base-vo';

// 返回值
export class UserVO extends BaseVO {
	@ApiProperty({ description: '用户ID' })
	id: string;

	@ApiProperty({ description: '用户名称' })
	userName: string;

	@ApiProperty({ description: '用户昵称' })
	nickName: string;

	@ApiProperty({ description: '手机号' })
	phoneNumber: string;

	@ApiProperty({ description: '邮箱' })
	email: string;

	@ApiProperty({ description: '头像地址' })
	avatarPath: string;

	@ApiProperty({
		description: '角色列表',
		type: 'array',
		// items: { $ref: getSchemaPath(RoleVO) },
	})
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	roles: any;
}
