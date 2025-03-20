// 接口字段
import {
	//
	Column,
	Entity,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity('user-test')
export class UserTest {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ comment: '姓名' })
	name: string;

	@Column({ comment: '年龄' })
	age: number;

	@CreateDateColumn({ comment: '创建日期' })
	create_date: Date;

	@UpdateDateColumn({ comment: '更新日期' })
	update_date: Date;
}
