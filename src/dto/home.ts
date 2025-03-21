import { Rule, RuleType } from '@midwayjs/validate';
import { R } from '../common/base.error.util';

export class HomeDTO {
	@Rule(RuleType.allow(null))
	id: number;
	@Rule(RuleType.number().max(100))
	age: number;
	@Rule(RuleType.string().required().error(R.validateError('姓名不能为空')))
	name: string;
}
