import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { UserTest } from '../entity/user-test';
import { FindOptionsWhere, Repository } from 'typeorm';

@Provide()
export class UserTestService {
	@InjectEntityModel(UserTest)
	userModel: Repository<UserTest>;

	// 新增
	async create(user: UserTest) {
		await this.userModel.save(user);
		return user;
	}

	// 通过id查询
	async findById(id: number) {
		return await this.userModel.findOne({
			where: {
				id,
			},
		});
	}

	// 删除
	async remove(user: UserTest) {
		await this.userModel.remove(user);
	}

	// 修改
	async edit(user: UserTest): Promise<UserTest> {
		return await this.userModel.save(user);
	}

	// 分页查询
	async page(page: number, pageSize: number, where?: FindOptionsWhere<UserTest>) {
		// 按照创建日期倒序返回
		const order: any = { create_date: 'desc' };
		const [data, total] = await this.userModel.findAndCount({
			order,
			skip: (page - 1) * pageSize,
			take: pageSize,
			where,
		});
		console.log('当前行：', 46, '[ data ] ==>', data);

		return { data, total };
	}

	// 根据查询条件返回全部
	async list(where?: FindOptionsWhere<UserTest>) {
		const order: any = { create_time: 'desc' };
		const data = await this.userModel.find({
			where,
			order,
		});
		return data;
	}
}
