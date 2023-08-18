import {
    Default,
    Required
} from '@tsed/schema';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne
} from 'typeorm';

import {
    ADRESS_TYPE 
} from '../types/index';
import { UserEntity } from './UserEntity';

@Entity()
export class AddressEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    @Default(ADRESS_TYPE.MAIN)
    type: ADRESS_TYPE;

    @Required()
    @Column()
    street: string;

    @Required()
    @Column()
    city: string;

    @Required()
    @Column()
    state: string;

    @Required()
    @Column()
    zipCode: number;

    @ManyToOne(() => UserEntity, (user) => user.addresses, { onDelete: 'CASCADE' })
    user: UserEntity;
}