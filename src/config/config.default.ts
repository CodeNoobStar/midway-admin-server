import { MidwayConfig } from '@midwayjs/core';
import { EverythingSubscriber } from '../typeorm-event-subscriber';

export default {
	// use for cookie sign key, should change to your own and keep security
	keys: '1742207029856_5308',
	koa: {
		port: 7001,
	},
	typeorm: {
		dataSource: {
			default: {
				/**
				 * 单数据库实例
				 */
				type: 'mysql',
				host: '192.168.215.3', // 数据库ip地址，本地就写localhost
				port: 3306,
				username: 'root',
				password: 'qweqwe',
				database: 'midway-mysql', // 数据库名称
				synchronize: true, // 如果第一次使用，不存在表，有同步的需求可以写 true，注意会丢数据
				logging: true,
				// 扫描entity文件夹
				entities: ['**/entity/*{.ts,.js}'],
				subscribers: [EverythingSubscriber],
			},
		},
	},
	redis: {
		client: {
			port: 6379, // Redis port
			host: '192.168.215.4', // Redis host
			password: 'qweqwe',
			db: 0,
		},
	},
	i18n: {
		// 把你的翻译文本放到这里
		localeTable: {
			en_US: require('../locales/en_US'),
			zh_CN: require('../locales/zh_CN'),
		},
	},
} as MidwayConfig;
