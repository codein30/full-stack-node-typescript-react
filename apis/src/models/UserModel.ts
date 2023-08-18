import {Format, Property, Required, Optional} from "@tsed/schema";
import {Entity} from "typeorm";

@Entity()
export class UserModel {
  @Property()
  @Optional()
  id: string;

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