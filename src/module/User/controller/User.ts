import { Body, Controller, Inject, Post } from '@midwayjs/core';
// import { ApiOkResponse, ApiTags } from '@midwayjs/swagger';
import { ApiOperation, ApiTags } from '@midwayjs/swagger';
import { UserDTO } from '../dto/User';
import { UserService } from '../service/User';
// import { AssertUtils } from '../../../../utils/assert';
// import { FilterQuery } from '../../../../utils/filter-query';
// import { UserPageVO } from '../vo/user-page';
// import { UserPageDTO } from '../dto/user-page';
// import { UserEntity } from '../entity/user';
// import { UserVO } from '../vo/user';
// import { like } from '../../../../utils/typeorm-utils';

@Controller('/user', { description: '用户模块' })
@ApiTags('用户模块')
export class UserController {
	@Inject()
	userService: UserService;

	// @Get('/page', { description: '分页查询' })
	// @ApiOkResponse({
	// 	type: UserPageVO,
	// })
	// async page(@Query() userPageDTO: UserPageDTO) {
	// 	const filterQuery = new FilterQuery<UserEntity>();
	// 	filterQuery
	// 	  .append('code', like(userPageDTO.code), !!userPageDTO.code)
	// 	  .append('name', like(userPageDTO.name), !!userPageDTO.name);
	// 	return await this.userService.page(userPageDTO, {
	// 		//   where: filterQuery.where,
	// 		order: { createDate: 'DESC' },
	// 	});
	// }

	@Post('/create')
	@ApiOperation({ summary: '新建用户' })
	async create(@Body() data: UserDTO) {
		return await this.userService.create(data.toEntity());
	}

	// @Put('/', { description: '编辑' })
	// async edit(@Body() data: UserDTO) {
	// 	// AssertUtils.notEmpty(data.id, 'id不能为空');
	// 	return await this.userService.edit(data.toEntity());
	// }

	// @Del('/:id', { description: '删除' })
	// async remove(@Param('id') id: string) {
	// 	// AssertUtils.notEmpty(id, 'id不能为空');
	// 	// await this.userService.removeById(id);
	// }

	// @Get('/:id', { description: '根据id查询' })
	// async getById(@Param('id') id: string) {
	// 	return await this.userService.getById(id);
	// }

	// @Get('/list', { description: '全部列表' })
	// @ApiOkResponse({
	// 	type: UserVO,
	// 	isArray: true,
	// })
	// async list(@Query() userPageDTO: UserPageDTO) {
	// 	// const filterQuery = new FilterQuery<UserEntity>();

	// 	return await this.userService.list({
	// 		// where: filterQuery.where,
	// 		// order: { createDate: 'DESC' },
	// 	});
	// }
}
