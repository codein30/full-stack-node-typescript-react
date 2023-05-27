import {Default, Enum, Format, Maximum, MaxLength, Minimum, MinLength, Pattern, Required} from "@tsed/schema";
import {Range, ExclusiveRange} from "../decorators/Range"; // custom decorator

export class UserModel {
  _id: string;

  @Required()
  firstName: string;

  @Required()
  lastName: string;

  @Format("date-time")
  @Default(Date.now)
  birthDate: Date;

  @Range(10, 100)
  @ExclusiveRange(true)
  price2: number;
}