import {
    Default,
    Required
} from '@tsed/schema';
import { ADRESS_TYPE } from '../types/index';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne
} from 'typeorm';
import { UserEntity } from './UserEntity';

@Entity()
export class VehicleEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    @Default(ADRESS_TYPE.MAIN)
    type: ADRESS_TYPE;

    @Required()
    @Column()
    vin: string;

    @Required()
    @Column()
    year: Number = 0;

    @Required()
    @Column()
    make: string;

    @Required()
    @Column()
    model: string;

    @ManyToOne(() => UserEntity, (user) => user.vehicles)
    user: UserEntity;
}