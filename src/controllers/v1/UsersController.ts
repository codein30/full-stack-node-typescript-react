import {Controller} from "@tsed/di";
import {Post} from "@tsed/schema";
import {BodyParams} from "@tsed/platform-params";

import {Get} from "@tsed/schema";
import {UserService} from "../../services/UserService";
import {UserModel} from "../../models/UserModel";

@Controller("/users")
export class UsersController {
  constructor(private userServices: UserService) {}

  @Post("/")
  create(@BodyParams() model: UserModel): UserModel {
    console.log(model instanceof UserModel); // true
    return model; // will be serialized according to your annotation on PersonModel class.
  }

  @Get("/")
  get() {
    return "hello";
  }
}
