import {Format, Property, Required} from "@tsed/schema";
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
  birthDate: Date;

  @Property()
  relationship: string;
}