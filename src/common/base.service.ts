import { Inject } from '@midwayjs/core';
import { BaseEntity } from './base.entity';
import { Context } from '@midwayjs/koa';
import { FindOptionsWhere, FindOptionsOrder, Repository } from 'typeorm';

export abstract class BaseService<T extends BaseEntity> {
	@Inject()
	ctx: Context;

	abstract getModel(): Repository<T>;

	async create(entity: T) {
		return await this.getModel().save(entity);
	}

	async edit(entity: T): Promise<T | void> {
		return await this.getModel().save(entity);
	}

	async remove(entity: T) {
		return await this.getModel().remove(entity);
	}

	async getById(id: string): Promise<T> {
		return await this.getModel().createQueryBuilder('model').where('model.id = :id', { id }).getOne();
	}

	// 辅助函数，用于创建 FindOptionsOrder<T> 类型的对象
	private createOrder(): FindOptionsOrder<T> {
		return { create_time: 'desc' } as FindOptionsOrder<T>;
	}

	async page(page: number, pageSize: number, where?: FindOptionsWhere<T>): Promise<[T[], number]> {
		const order = this.createOrder();

		const [data, total] = await this.getModel().findAndCount({
			where,
			order,
			skip: (page - 1) * pageSize,
			take: pageSize,
		});

		return [data, total];
	}

	async list(where?: FindOptionsWhere<T>) {
		const order = this.createOrder();
		const data = await this.getModel().find({
			where,
			order,
		});
		return data;
	}
}
