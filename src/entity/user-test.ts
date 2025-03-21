// 接口字段
import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../common/base.entity';

@Entity('user-test')
export class UserTest extends BaseEntity {
	// @PrimaryGeneratedColumn()
	// id: number;

	@Column({ comment: '姓名' })
	name: string;

	@Column({ comment: '年龄' })
	age: number;

	// @CreateDateColumn({ comment: '创建日期' })
	// create_date: Date;

	// @UpdateDateColumn({ comment: '更新日期' })
	// update_date: Date;
}
