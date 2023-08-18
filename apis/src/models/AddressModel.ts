import {
    Default,
    Required,
    Property,
    Optional,
} from '@tsed/schema';
import {
    ADRESS_TYPE 
} from '../types/index';

export class AddressModel {
    @Property()
    @Optional()
    id: string;
    
    @Required()
    @Default(ADRESS_TYPE.MAIN)
    @Property()
    type: ADRESS_TYPE;

    @Required()
    @Property()
    street: string;

    @Required()
    @Property()
    city: string;

    @Required()
    @Property()
    state: string;

    @Required()
    @Property()
    zipCode: number;
}