import {
  Default, 
  Property, 
  Required, 
  CollectionOf
} from "@tsed/schema";
import {Range, ExclusiveRange} from "../decorators/Range"; // custom decorator
import { INSURANCE_TYPE } from "../types";
import { UserModel } from "./UserModel";
import { VehicleModel } from "./VehicleModel";
import { AddressModel } from "./AddressModel";
import {Format} from "@tsed/schema";

export class InsuranceModel {
  @Required()
  @Default(INSURANCE_TYPE.BASIC)
  type: INSURANCE_TYPE;
  
  expiration: Date;

  @Required()
  firstName: string;

  @Required()
  lastName: string;

  @Required()
  @Format("date")
  birthDate: Date;

  @Property()
  @CollectionOf(UserModel)
  dependents: UserModel[];

  @Property()
  @Required()
  @CollectionOf(VehicleModel)
  vehicles: VehicleModel[];

  @Property()
  @Required()
  @CollectionOf(AddressModel)
  addresses: AddressModel[];
}