import {
    Default,
    Required,
    Property
} from '@tsed/schema';
import { ADRESS_TYPE } from '../types/index';

export class VehicleModel {
    @Required()
    @Property()
    @Default(ADRESS_TYPE.MAIN)
    type: ADRESS_TYPE;

    @Required()
    @Property()
    vin: string;

    @Required()
    @Property()
    year: Number = 0;

    @Required()
    @Property()
    make: string;

    @Required()
    @Property()
    model: string;
}