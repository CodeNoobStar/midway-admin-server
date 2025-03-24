import { ApiProperty } from '@midwayjs/swagger';
import { Rule, RuleType } from '@midwayjs/validate';

// 分页查询参数
export class PageDTO {
	@ApiProperty({ description: '当前页', example: 1 })
	@Rule(RuleType.allow(null))
	current: number;

	@ApiProperty({ description: '每页显示条数', example: 10 })
	@Rule(RuleType.allow(null))
	pageSize: number;
}
