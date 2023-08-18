import {
    Default,
    Required,
    Property,
    Minimum,
    Maximum,
    Optional,
} from '@tsed/schema';
import { VEHICLE_TYPE } from '../types/index';

export class VehicleModel {
    @Property()
    @Optional()
    id: string;

    @Required()
    @Property()
    @Default(VEHICLE_TYPE.MAIN)
    type: VEHICLE_TYPE;

    @Required()
    @Property()
    vin: string;

    @Required()
    @Property()
    @Minimum(1985)
    @Maximum(new Date().getFullYear() + 1)
    year: Number;

    @Required()
    @Property()
    make: string;

    @Required()
    @Property()
    model: string;
}
