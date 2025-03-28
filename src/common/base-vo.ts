import { ApiProperty } from '@midwayjs/swagger';

// 返回值基类
export class BaseVO {
	@ApiProperty({ description: 'id' })
	id: string;

	@ApiProperty({ description: '创建时间' })
	createDate: Date;

	@ApiProperty({ description: '更新时间' })
	updateDate: Date;
}
