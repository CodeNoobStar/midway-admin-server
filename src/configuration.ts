import { Configuration, App } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import * as redis from '@midwayjs/redis';
import * as swagger from '@midwayjs/swagger';
import { join } from 'path';
import * as orm from '@midwayjs/typeorm';
import { ReportMiddleware } from './middleware/report.middleware';

@Configuration({
	imports: [
		koa,
		validate,
		redis,
		orm,
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
	}
}
