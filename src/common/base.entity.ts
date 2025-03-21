import {
	//
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';

export class BaseEntity {
	@PrimaryGeneratedColumn()
	id?: string;

	@CreateDateColumn({ comment: '创建日期' })
	create_time?: Date;

	@UpdateDateColumn({ comment: '更新日期' })
	update_time?: Date;
}
