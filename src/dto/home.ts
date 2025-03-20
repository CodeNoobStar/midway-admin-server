import { Rule, RuleType } from '@midwayjs/validate';

export class HomeDTO {
	@Rule(RuleType.number().required().error(new Error('error')))
	id: number;
	@Rule(RuleType.number().max(100))
	age: number;
}
