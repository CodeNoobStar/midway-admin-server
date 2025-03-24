import { ApiProperty, Type } from '@midwayjs/swagger';

// 分页返回给前端的数据格式
export class PageResultVO<T> {
	data: T[];
	total: number;
	current: number;
	pageSize: number;
}

export function PageVOWrapper<T>(ResourceCls: Type<T>): Type<PageResultVO<T>> {
	class PageVo extends PageResultVO<T> {
		@ApiProperty({ description: '列表', type: ResourceCls, isArray: true })
		data: T[];
		@ApiProperty({ description: '总数' })
		total: number;
		@ApiProperty({ description: '当前页' })
		current: number;
		@ApiProperty({ description: '每页显示条数' })
		pageSize: number;
	}
	return PageVo;
}
