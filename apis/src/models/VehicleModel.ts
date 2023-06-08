import {
    Default,
    Required,
    Property,
    Minimum,
    Maximum
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
    @Minimum(1985)
    @Maximum(Number(new Date().getFullYear() + 1))
    year: Number;

    @Required()
    @Property()
    make: string;

    @Required()
    @Property()
    model: string;
}