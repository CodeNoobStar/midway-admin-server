// 访问数据库
// import { Controller, Get } from '@midwayjs/core';
// import { InjectEntityModel } from '@midwayjs/typeorm';
// import { User } from '../entity/user';
// import { Repository } from 'typeorm';

// // 访问数据库
// @Controller('/')
// export class HomeController {
// 	// 自动注入模型
// 	@InjectEntityModel(User)
// 	userModel: Repository<User>;

// 	@Get('/')
// 	async home(): Promise<User[]> {
// 		// 查询user表数据
// 		return await this.userModel.find();
// 	}
// }
/************************************************************************************************ */

// 访问 redis
// import { Controller, Get, Inject } from '@midwayjs/core';
// import { RedisService } from '@midwayjs/redis';

// @Controller('/')
// export class HomeController {
// 	// 自动注入redis服务
// 	@Inject()
// 	redisService: RedisService;

// 	@Get('/')
// 	async home(): Promise<string> {
// 		// 设置值
// 		await this.redisService.set('foo', 'bar');
// 		// 获取值
// 		return await this.redisService.get('foo');
// 	}
// }

/*国际化************************************************************************************************************************ */

// import { Controller, Get, Inject } from '@midwayjs/core';
// import { MidwayI18nService } from '@midwayjs/i18n';

// @Controller('/')
// export class HomeController {
// 	@Inject()
// 	i18nService: MidwayI18nService;

// 	@Get('/')
// 	async home(): Promise<string> {
// 		// 设置值
// 		return await this.i18nService.translate('hello', {
// 			locale: 'zh_CN',
// 		});
// 	}
// }

/*配置通用验证**************************************************************************************** */
import { Body, Controller, Get, Inject, Post } from '@midwayjs/core';
import { HomeDTO } from '../dto/home';
// import { CommonError } from '../common/common.error';
import { ILogger } from '@midwayjs/logger';
import { R } from '../common/base.error.util';
import { ApiTags } from '@midwayjs/swagger';

@Controller('/')
@ApiTags('技能点自测模块')
export class HomeController {
	@Inject()
	logger: ILogger;

	@Post('/')
	async homePost(@Body() home: HomeDTO): Promise<void> {
		this.logger.info('hello');
		console.log(home);
	}

	@Get('/')
	async homeGet(): Promise<void> {
		// throw new CommonError('error');
		throw R.error('error');
	}
}
