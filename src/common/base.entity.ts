import { ApiProperty } from '@midwayjs/swagger';
import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class BaseEntity {
	// @PrimaryGeneratedColumn()
	// id?: string;

	@ApiProperty({ description: '主键id' })
	@PrimaryGeneratedColumn({ comment: '主键id', name: 'id', type: 'bigint' })
	id?: string;

	@CreateDateColumn({ comment: '创建日期' })
	create_time?: Date;

	@UpdateDateColumn({ comment: '更新日期' })
	update_time?: Date;
}
