import { Configuration, App } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import * as redis from '@midwayjs/redis';
import * as i18n from '@midwayjs/i18n';
import * as swagger from '@midwayjs/swagger';
import { join } from 'path';
import * as orm from '@midwayjs/typeorm';
import { ReportMiddleware } from './middleware/report.middleware';
import { ValidateErrorFilter } from './filter/validate.filter';
import { CommonErrorFilter } from './filter/common.error';

@Configuration({
	imports: [
		koa,
		validate,
		redis,
		orm,
		i18n,
		swagger,
		{
			component: info,
			enabledEnvironment: ['local'],
		},
	],
	importConfigs: [join(__dirname, './config')],
})
export class MainConfiguration {
	@App('koa')
	app: koa.Application;

	async onReady() {
		this.app.useMiddleware([ReportMiddleware]);

		// 测试 ValidateErrorFilter
		// 公共业务异常方法;
		this.app.useFilter([ValidateErrorFilter, CommonErrorFilter]);
	}
}
