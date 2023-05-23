import {Default, Enum, Format, Maximum, MaxLength, Minimum, MinLength, Pattern, Required} from "@tsed/schema";

export class UserModel {
  _id: string;

  @Required()
  fristName: string;

  @Required()
  lastName: string;

  @Format("date-time")
  @Default(Date.now)
  birthDate: Date;
}