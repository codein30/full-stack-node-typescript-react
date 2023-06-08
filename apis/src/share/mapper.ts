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
        firstName,
        lastName,
        birthDate,
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
                    relationship,
                    firstName,
                    lastName,
                    birthDate
                } = dependent;
                return {
                    relationship,
                    firstName,
                    lastName,
                    birthDate
                } as UserModel;
            })
        }
    }
    if(addresses) {
        insuranceResponse = {
            ...insuranceResponse,
            addresses: addresses.map((address: AddressEntity) => {
                const {
                    type,
                    street,
                    city,
                    zipCode
                } = address;
                return {
                    type,
                    street,
                    city,
                    zipCode
                } as AddressModel;
            })
        }
    }
    if(vehicles) {
        insuranceResponse = {
            ...insuranceResponse,
            vehicles: vehicles.map((vehicle: VehicleEntity) => {
                const {
                    type,
                    vin,
                    year,
                    make,
                    model
                } = vehicle;
                return {
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