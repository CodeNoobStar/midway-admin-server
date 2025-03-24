import { EventSubscriberModel } from '@midwayjs/typeorm';
import { snowFlake } from './utils/snow.flake';
import { EntitySubscriberInterface, InsertEvent } from 'typeorm';

@EventSubscriberModel()
export class EverythingSubscriber implements EntitySubscriberInterface {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	beforeInsert(event: InsertEvent<any>) {
		if (!event.entity.id) {
			event.entity.id = snowFlake.nextId();
		}
	}
}
