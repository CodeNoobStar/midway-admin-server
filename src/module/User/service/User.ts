import { Provide } from '@midwayjs/core';
import { InjectEntityModel } from '@midwayjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../../common/base.service';
import { UserEntity } from '../entity/User';
// import { UserVO } from '../vo/user';
import { R } from '../../../common/base.error.util';
import { omit } from 'lodash';
import * as bcrypt from 'bcryptjs';
@Provide()
export class UserService extends BaseService<UserEntity> {
	@InjectEntityModel(UserEntity) // 注入实体模型
	userModel: Repository<UserEntity>; // 定义实体模型类型

	getModel(): Repository<UserEntity> {
		// 重写获取实体模型的方法
		return this.userModel; // 返回实体模型
	}

	// 定制返回值
	async create(entity: UserEntity): Promise<UserEntity> {
		const { userName, phoneNumber, email } = entity;

		// 使用 typeorm 的 countBy 方法查询数据库中用户名等于当前要创建用户的用户名的记录数量
		let isExist = (await this.userModel.countBy({ userName })) > 0;

		if (isExist) {
			throw R.error('用户名已存在');
		}

		isExist = (await this.userModel.countBy({ phoneNumber })) > 0;

		if (isExist) {
			throw R.error('当前手机号已存在');
		}

		isExist = (await this.userModel.countBy({ email })) > 0;

		if (isExist) {
			throw R.error('当前邮箱已存在');
		}

		// 添加用户的默认密码是123456，对密码进行加盐加密
		const password = bcrypt.hashSync('123456', 10);

		entity.password = password;

		await this.userModel.save(entity);

		// 把entity中的password移除返回给前端
		return omit(entity, ['password']) as UserEntity;
	}

	// 待使用 优化
	//     async function checkDuplicate(model: Repository<UserEntity>, condition: Partial<UserEntity>, currentId: number, errorMessage: string) {
	//     const user = await model.findOneBy(condition);
	//     if (user && user.id != currentId) {
	//         throw R.error(errorMessage);
	//     }
	// }

	async edit(entity: UserEntity): Promise<void | UserEntity> {
		const { id, userName, phoneNumber, email } = entity;
		let user = await this.userModel.findOneBy({ userName });

		// await checkDuplicate(this.userModel, { userName }, id, '用户名已存在');
		if (user && user.id != id) {
			throw R.error('用户名已存在');
		}

		user = await this.userModel.findOneBy({ phoneNumber });

		if (user && user.id != id) {
			throw R.error('当前手机号已存在');
		}

		user = await this.userModel.findOneBy({ email });
		if (user && user.id != id) {
			throw R.error('当前邮箱已存在');
		}

		await this.userModel.save(entity);

		return omit(entity, ['password']) as UserEntity;
	}

	async removeById(id: number): Promise<void> {
		await this.userModel.delete(id);
	}
}
