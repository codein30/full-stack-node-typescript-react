import {
  Default, 
  Property, 
  Required, 
  MinLength,
  MaxLength,
  CollectionOf,
  Optional
} from "@tsed/schema";
import { INSURANCE_TYPE } from "../types";
import { UserModel } from "./UserModel";
import { VehicleModel } from "./VehicleModel";
import { AddressModel } from "./AddressModel";
import { Format } from "@tsed/schema";
import { Age } from "../decorators/MinAge"; // custom decorator

export class InsuranceModel {
  @Property()
  @Optional()
  userId: string;

  @Required()
  @Default(INSURANCE_TYPE.BASIC)
  type: INSURANCE_TYPE;
  
  expiration: Date;

  @Required()
  firstName: string;

  @Required()
  lastName: string;

  @Format("date")
  @Required()
  @Property()
  @Age(16)
  birthDate: Date;

  @Property()
  @CollectionOf(UserModel)
  dependents: UserModel[];

  @Property()
  @Required()
  @CollectionOf(VehicleModel)
  @MinLength(1)
  @MaxLength(3)
  vehicles: VehicleModel[];

  @Property()
  @Required()
  @CollectionOf(AddressModel)
  addresses: AddressModel[];
}