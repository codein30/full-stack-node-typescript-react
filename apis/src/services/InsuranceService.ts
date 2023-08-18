import {Injectable, Inject} from "@tsed/di";
import {DataSource} from "typeorm";
import {POSTGRES_DATA_SOURCE} from "../datasources/PostgresDatasource";
import _ from "lodash";
import {
  UserEntity
} from '../entities/UserEntity'
import { InsuranceModel } from "../models/InsuranceModel";
import { DependentEntity } from "../entities/DependentEntity";
import { VehicleEntity } from "../entities/VehicleEntity";
import { AddressEntity } from "../entities/AddressEntity";
import { InsuranceEntity } from "../entities/InsuranceEntity";
import { INSURANCE_PRICE } from "../share/constants";
import { toInsuranceDTO } from "../share/mapper";
import { NotFound } from "@tsed/exceptions";

@Injectable()
export class InsuranceService {
  @Inject(POSTGRES_DATA_SOURCE)
  protected postgresDataSource: DataSource;

  async create(insurance: InsuranceModel): Promise<string> {
    const {
      type,
      firstName,
      lastName,
      birthDate,
      dependents,
      vehicles,
      addresses
    } = insurance;
    const user =  await this.postgresDataSource.manager.create(UserEntity, {
      firstName,
      lastName,
      birthDate
    });
    user.dependents = [];
    for(const dependent of dependents) {
      const dependentRef =  await this.postgresDataSource.manager.create(DependentEntity, {
        firstName: dependent.firstName,
        lastName: dependent.lastName,
        birthDate: dependent.birthDate,
        relationship: dependent.relationship
      });
      await this.postgresDataSource.manager.save(dependentRef);
      user.dependents.push(dependentRef)
    }

    user.vehicles = [];
    for(const vehicle of vehicles) {
      // TODO: Optimize this to a single liner
      const vehicleEntity =  await this.postgresDataSource.manager.create(VehicleEntity, vehicle) as VehicleEntity;
      await this.postgresDataSource.manager.save(vehicleEntity);
      user.vehicles.push(vehicleEntity);
    }
    user.addresses = []; // Test
    for(const address of addresses) {
      const addressesEntity =  await this.postgresDataSource.manager.create(AddressEntity, address) as AddressEntity;
      await this.postgresDataSource.manager.save(addressesEntity);
      user.addresses.push(addressesEntity);
    }

    // Create the insurance for the user
    let expiredAt = new Date();
    expiredAt = new Date(expiredAt.setFullYear(expiredAt.getFullYear() + 1));
    const insuranceEntity =  await this.postgresDataSource.manager.create(InsuranceEntity, {
      type,
      expiration: expiredAt
    });
    user.insurance = insuranceEntity;
  await this.postgresDataSource.manager.save(insuranceEntity);
    const createdUser = await this.postgresDataSource.manager.save(user);
    return createdUser.id;
  }
  
  async getAllInsurances(): Promise<InsuranceModel[]>{
    const userRepository = this.postgresDataSource.getRepository(UserEntity);
    const users = await userRepository.find({
        relations: [
          'addresses',
          'dependents',
          'insurance',
          'vehicles',
        ],
    });
    return users.map(user => toInsuranceDTO(user as UserEntity));
  }

  async getInsurance(id: string): Promise<InsuranceModel>{
    const userRepository = this.postgresDataSource.getRepository(UserEntity);
    const user = await userRepository.findOne({
        where: {
          id
        },
        relations: [
          'addresses',
          'dependents',
          'insurance',
          'vehicles',
        ],
    });
    if (!user) {
      throw new NotFound("Insurance Not Found");
    }
    return toInsuranceDTO(user as UserEntity);
  }

  async update(userId: string, insurance: InsuranceModel): Promise<string>{
    const {
      type,
      firstName,
      lastName,
      birthDate,
      dependents,
      vehicles,
      addresses
    } = insurance;
    // 1. Update users fields
    const userRepository = this.postgresDataSource.getRepository(UserEntity);
    const updatedUser = await userRepository.findOne({
      relations: {
        addresses: true,
        dependents: true,
        insurance: true,
        vehicles: true,
      },
      where: {
        id: userId,
      },
    }) as UserEntity;
    if (!updatedUser) {
      throw new NotFound("Not Found");
    }
    updatedUser.firstName = firstName,
    updatedUser.lastName = lastName;
    updatedUser.birthDate = birthDate;

    // 2. Update/Add(upsert) addresses
    const addressRepository = this.postgresDataSource.getRepository(AddressEntity);
    for(const address of addresses) {
      const updatedAddress = await addressRepository.findOne({
        where: {
          id: address.id,
        },
      }) as AddressEntity;
      updatedAddress.city = address.city;
      updatedAddress.state = address.state;
      updatedAddress.street = address.street;
      updatedAddress.type = address.type;
      updatedAddress.zipCode = address.zipCode;
      await addressRepository.save(updatedAddress);
    }

    // 3. Update/Add(upsert) dependents
    const dependentRepository = this.postgresDataSource.getRepository(DependentEntity);
    for(const dependent of dependents) {
      const updatedDependent = await dependentRepository.findOne({
        where: {
          id: dependent.id,
        },
      }) as DependentEntity;
      updatedDependent.firstName = dependent.firstName;
      updatedDependent.lastName = dependent.lastName;
      updatedDependent.birthDate = dependent.birthDate;
      updatedDependent.relationship = dependent.relationship;
      await dependentRepository.save(updatedDependent);
    }

    // 4. Update/Add(upsert) insurance
    let expiredAt = new Date();
    expiredAt = new Date(expiredAt.setFullYear(expiredAt.getFullYear() + 1));
    updatedUser.insurance.expiration = expiredAt;
    updatedUser.insurance.type = type;
    
    // 5. Update/Add(upsert) vehicles
    const vehicleRepository = this.postgresDataSource.getRepository(VehicleEntity);
    for(const vehicle of vehicles) {
      const updatedVehicle = await vehicleRepository.findOne({
        where: {
          id: vehicle.id,
        },
      }) as VehicleEntity;
      updatedVehicle.make = vehicle.make;
      updatedVehicle.model = vehicle.model;
      updatedVehicle.type = vehicle.type;
      updatedVehicle.vin = vehicle.vin;
      updatedVehicle.year = vehicle.year;
      await vehicleRepository.save(updatedVehicle);
    }
    const mySavedUser = await userRepository.save(updatedUser);
    return mySavedUser.id;
  }

  async validate(insurance: InsuranceModel): Promise<number>{
    return INSURANCE_PRICE * (insurance.dependents.length || 1);
  }

  async deleteInsurance(id: string): Promise<void> {
    await this.postgresDataSource
    .createQueryBuilder()
    .delete()
    .from(UserEntity)
    .where("id = :id", { id: id })
    .execute()
  }

  $onInit() {
    if (this.postgresDataSource.isInitialized) {
    }
  }
}
