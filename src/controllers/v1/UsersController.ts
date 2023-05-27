import {Controller} from "@tsed/di";
import {Post} from "@tsed/schema";
import {BodyParams} from "@tsed/platform-params";

import {Get} from "@tsed/schema";
import {UserService} from "../../services/UserService";
import {UserModel} from "../../models/UserModel";
import { UserEntity } from "src/entities/UserEntity";

@Controller("/users")
export class UsersController {
  constructor(private userServices: UserService) {}

  @Post("/")
  create(@BodyParams() user: UserModel): Promise<UserEntity>  {
    return this.userServices.create(user);
  }

  @Get("/")
  get(): Promise<UserEntity[]> {
    return this.userServices.getAllUsers();
  }
}
