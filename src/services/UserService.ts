import {Injectable, Inject} from "@tsed/di";
import {DataSource} from "typeorm";
import {POSTGRES_DATA_SOURCE} from "../datasources/PostgresDatasource";
import {
  UserEntity
} from './../entities/UserEntity'

@Injectable()
export class UserService {
  @Inject(POSTGRES_DATA_SOURCE)
  protected postgresDataSource: DataSource;

  create(user: any): Promise<UserEntity> {
    return this.postgresDataSource.manager.create(UserEntity, user);
  }

  getAllUsers(): Promise<UserEntity[]>{
    return this.postgresDataSource.manager.find(UserEntity);
  }

  $onInit() {
    if (this.postgresDataSource.isInitialized) {
      console.log("INIT");
    }
  }
}