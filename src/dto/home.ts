import { Rule, RuleType } from '@midwayjs/validate';

export class HomeDTO {
	@Rule(RuleType.number().required())
	id: number;
	@Rule(RuleType.number().max(100))
	age: number;
}
