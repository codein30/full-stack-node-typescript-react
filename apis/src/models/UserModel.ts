import {Format, Property, Required} from "@tsed/schema";
import { MinAge } from "../decorators/MinAge";
import {Entity} from "typeorm";

@Entity()
export class UserModel {
  @Required()
  @Property()
  firstName: string;

  @Required()
  @Property()
  lastName: string;

  @Format("date")
  @Required()
  @Property()
  @MinAge(16)
  birthDate: Date;

  @Property()
  relationship: string;
}