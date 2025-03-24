import { ApiProperty } from '@midwayjs/swagger';
import { PageDTO } from '../../../common/page.dto';

// 查询参数 返回值
export class UserPageDTO extends PageDTO {
	// @ApiProperty({ description: '代码' })
	// code: string;
	// @ApiProperty({ description: '名称' })
	// name: string;
	// 列表
	@ApiProperty({ description: '用户名称' })
	userName: string;

	@ApiProperty({ description: '用户昵称' })
	nickName: string;

	@ApiProperty({ description: '手机号' })
	phoneNumber: string;

	@ApiProperty({ description: '邮箱' })
	email: string;
}
