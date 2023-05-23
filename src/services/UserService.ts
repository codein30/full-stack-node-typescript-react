import {Injectable, Inject} from "@tsed/di";
import {DataSource} from "typeorm";
import {POSTGRES_DATA_SOURCE} from "../datasources/PostgresDatasource";

@Injectable()
export class UserService {
  @Inject(POSTGRES_DATA_SOURCE)
  protected postgresDataSource: DataSource;

  $onInit() {
    if (this.postgresDataSource.isInitialized) {
      console.log("INIT");
    }
  }
}