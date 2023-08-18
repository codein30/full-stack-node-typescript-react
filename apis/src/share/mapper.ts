import { AddressEntity } from "src/entities/AddressEntity";
import { DependentEntity } from "src/entities/DependentEntity";
import { UserEntity } from "src/entities/UserEntity";
import { VehicleEntity } from "src/entities/VehicleEntity";
import { AddressModel } from "src/models/AddressModel";
import { InsuranceModel } from "src/models/InsuranceModel";
import { UserModel } from "src/models/UserModel";
import { VehicleModel } from "src/models/VehicleModel";

export const toInsuranceDTO = (data: UserEntity) => {
    const {
        id,
        firstName,
        lastName,
        birthDate,
        insurance: {
            type,
            expiration,
        },
        addresses,
        dependents,
        vehicles
    } = data;

    let insuranceResponse: InsuranceModel = {
        userId: id,
        firstName,
        lastName,
        birthDate: new Date(birthDate),
        type,
        expiration,
        dependents: [],
        vehicles: [],
        addresses: []
    }
    if(dependents) {
        insuranceResponse = {
            ...insuranceResponse,
            dependents: dependents.map((dependent: DependentEntity) => {
                const {
                    id,
                    relationship,
                    firstName,
                    lastName,
                    birthDate
                } = dependent;
                return {
                    id,
                    relationship,
                    firstName,
                    lastName,
                    birthDate: new Date(birthDate),
                } as UserModel;
            })
        }
    }
    if(addresses) {
        insuranceResponse = {
            ...insuranceResponse,
            addresses: addresses.map((address: AddressEntity) => {
                const {
                    id,
                    type,
                    street,
                    city,
                    zipCode,
                    state
                } = address;
                return {
                    id,
                    type,
                    street,
                    city,
                    zipCode,
                    state
                } as AddressModel;
            })
        }
    }
    if(vehicles) {
        insuranceResponse = {
            ...insuranceResponse,
            vehicles: vehicles.map((vehicle: VehicleEntity) => {
                const {
                    id,
                    type,
                    vin,
                    year,
                    make,
                    model
                } = vehicle;
                return {
                    id,
                    type,
                    vin,
                    year,
                    make,
                    model
                } as VehicleModel;
            })
        }
    }
    return insuranceResponse;
};