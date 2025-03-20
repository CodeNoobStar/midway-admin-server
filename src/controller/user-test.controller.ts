import { ALL, Body, Controller, Del, Get, Inject, Param, Post, Provide, Put, Query } from '@midwayjs/core';
import { Validate } from '@midwayjs/validate';
import { UserTestDTO } from '../dto/user-test';
import { UserTestService } from '../service/user-test.service';
import { UserTest } from '../entity/user-test';
import { ApiOperation, ApiTags } from '@midwayjs/swagger';

@Provide()
@Controller('/user-test')
@ApiTags('用户测试控制器')
export class UserController {
	@Inject()
	userService: UserTestService;

	@Post('/')
	@Validate()
	@ApiOperation({ summary: '新增用户' })
	async create(@Query('name') name: string, @Query('age') age: number) {
		const user = new UserTest();
		user.name = name;
		user.age = age;

		return await this.userService.create(user);
	}

	@Put('/')
	@Validate()
	@ApiOperation({ summary: '修改用户' })
	async edit(@Body(ALL) { id, name, age }: UserTestDTO) {
		const user = await this.userService.findById(id);

		user.name = name;
		user.age = age;
		return await this.userService.edit(user);
	}

	@Del('/:id')
	@ApiOperation({ summary: '删除用户' })
	async remove(@Param('id') id: number) {
		const user = await this.userService.findById(id);
		await this.userService.remove(user);
	}

	@Get('/:id')
	@ApiOperation({ summary: '获取用户' })
	async getById(@Param('id') id: number) {
		return await this.userService.findById(id);
	}

	// @Body 是获取 post 所有的参数 ，直接获取会直接从 UserDto 中的参数中获取 就是说有什么提示什么
	// @Post('/page')
	// @ApiOperation({ summary: '获取用户分页' })
	// async page(@Body(ALL) data: { page: number; pageSize: number }) {
	// 	return await this.userService.page(data.page, data.pageSize);
	// }
	@Post('/page')
	@ApiOperation({ summary: '获取用户分页' })
	// @Query 是获取 指定参数 用于指定参数获取更规范
	async page(@Query('page') page: number, @Query('pageSize') pageSize: number) {
		return await this.userService.page(page, pageSize);
	}

	@Get('/list')
	@ApiOperation({ summary: '获取用户列表' })
	async list() {
		return await this.userService.list();
	}
}
