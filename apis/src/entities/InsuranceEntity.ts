import {
    Default,
    Required
} from '@tsed/schema';
import {
    Entity,
    Column,
    PrimaryGeneratedColumn
} from 'typeorm';
import {
    INSURANCE_TYPE
} from '../types/index';

@Entity()
export class InsuranceEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    @Default(INSURANCE_TYPE.BASIC)
    type: INSURANCE_TYPE;

    @Required()
    @Column()
    expiration: Date;
}