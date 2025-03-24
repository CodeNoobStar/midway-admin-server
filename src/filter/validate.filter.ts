import { MidwayI18nService } from '@midwayjs/i18n';
import { Catch } from '@midwayjs/core';
import { MidwayValidationError } from '@midwayjs/validate';
import { Context } from '@midwayjs/koa';

@Catch(MidwayValidationError)
export class ValidateErrorFilter {
	async catch(err: MidwayValidationError, ctx: Context) {
		// 获取国际化服务
		const i18nService = await ctx.requestContext.getAsync(MidwayI18nService);

		console.log('当前行：', 12, '[ Context ] ==>', ctx);
		console.log('当前行：', 13, '[ MidwayValidationError ] ==>', MidwayValidationError);
		// 翻译
		const message = i18nService.translate(err.message) || err.message;
		// 未捕获的错误，是系统错误，错误码是 500
		ctx.status = 422;
		return {
			code: 422,
			message,
		};
	}
}
