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
    console.log('createdUser is ', createdUser);
    return createdUser.id;
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
    console.log('insurance entity update')
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
    updatedUser.firstName = firstName,
    updatedUser.lastName = lastName;
    updatedUser.birthDate = birthDate;

    // 2. Update/Add(upsert) addresses
    const addressRepository = this.postgresDataSource.getRepository(AddressEntity);
    updatedUser.addresses = [];
    for(const address of addresses) {
      const addressesEntity =  await this.postgresDataSource.manager.create(AddressEntity, address) as AddressEntity;
      await this.postgresDataSource.manager.save(addressesEntity);
      updatedUser.addresses.push(addressesEntity);
    }
    // 3. Update/Add(upsert) dependents
    updatedUser.dependents = [];
    for(const dependent of dependents) {
      const dependentRef =  await this.postgresDataSource.manager.create(DependentEntity, {
        firstName: dependent.firstName,
        lastName: dependent.lastName,
        birthDate: dependent.birthDate,
        relationship: dependent.relationship
      });
      await this.postgresDataSource.manager.save(dependentRef);
      updatedUser.dependents.push(dependentRef)
    }

    // 4. Update/Add(upsert) insurance
    let expiredAt = new Date();
    expiredAt = new Date(expiredAt.setFullYear(expiredAt.getFullYear() + 1));
    updatedUser.insurance.expiration = expiredAt;
    updatedUser.insurance.type = type;
    
    // 5. Update/Add(upsert) vehicles
    updatedUser.vehicles = [];
    for(const vehicle of vehicles) {
      const vehicleEntity =  await this.postgresDataSource.manager.create(VehicleEntity, vehicle) as VehicleEntity;
      await this.postgresDataSource.manager.save(vehicleEntity);
      updatedUser.vehicles.push(vehicleEntity);
    }
    const mySavedUser = await userRepository.save(updatedUser);
    return mySavedUser.id;
  }

  async validate(insurance: InsuranceModel): Promise<number>{
    return INSURANCE_PRICE * (insurance.dependents.length || 1);
  }

  $onInit() {
    if (this.postgresDataSource.isInitialized) {
      console.log("INIT");
    }
  }
}
