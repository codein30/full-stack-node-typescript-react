import {registerProvider} from "@tsed/di";
import {DataSource} from "typeorm";
import {Logger} from "@tsed/logger";

export const POSTGRES_DATA_SOURCE = Symbol.for("PostgresDataSource");
export const PostgresDataSource = new DataSource({
  type: "postgres",
  entities: entitiesPaths(process.env.NODE_ENV),
  host: "postgres",
  port: 5432,
  username: "postgres",
  password: "changeme",
  database: "postgres",
  synchronize: true,
});

registerProvider<DataSource>({
  provide: POSTGRES_DATA_SOURCE,
  type: "typeorm:datasource",
  deps: [Logger],
  async useAsyncFactory(logger: Logger) {
    await PostgresDataSource.initialize();

    logger.info("Connected with typeorm to database: Postgres");

    return PostgresDataSource;
  },
  hooks: {
    $onDestroy(dataSource) {
      return dataSource.isInitialized && dataSource.close();
    }
  }
});

function entitiesPaths(env?: string) {
  if(env === 'production') {
    return ['dist/entities/**.js']
  }
  return ['src/entities/*.ts']
}
