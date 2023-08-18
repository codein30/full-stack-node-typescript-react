import { ADRESS_TYPE } from "../enums/AddressType";
import { INSURANCE_TYPE } from "../enums/InsuranceType";
import { VEHICLE_TYPE } from "../enums/VehicleType";

export interface IDependent {
    id: string;
    firstName: string;
    lastName: string;
    birthDate: Date;
    relationship: string;
    isEditing?: boolean;
}

export interface IVehicle {     
    id: string;
    type: VEHICLE_TYPE;
    vin: string;
    year: Number;
    make: string;
    model: string;
    isEditing?: boolean;
}

export interface IAddress {
    id: string;
    type: ADRESS_TYPE;
    street: string;
    city: string;
    state: string;
    zipCode: number;
    isEditing?: boolean;
}

export interface IItem {
    userId?: string;
    id: string;
    isEditing: boolean;
    type: INSURANCE_TYPE;
    firstName: string;
    lastName: string;
    birthDate: Date;
    dependents: IDependent[];
    vehicles: IVehicle[];
    addresses: IAddress[];
}
