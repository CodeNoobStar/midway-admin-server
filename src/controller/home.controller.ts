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
import { Controller, Get, Inject } from '@midwayjs/core';
import { RedisService } from '@midwayjs/redis';

@Controller('/')
export class HomeController {
	// 自动注入redis服务
	@Inject()
	redisService: RedisService;

	@Get('/')
	async home(): Promise<string> {
		// 设置值
		await this.redisService.set('foo', 'bar');
		// 获取值
		return await this.redisService.get('foo');
	}
}
