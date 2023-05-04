import {Module} from '@nestjs/common';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {EmployeeModule} from "../employee/employee.module";
import {join} from "path";
import process from "process";
import {GraphQLModule} from "@nestjs/graphql";
import {ApolloDriver, ApolloDriverConfig, ApolloFederationDriver, ApolloFederationDriverConfig} from "@nestjs/apollo";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Project} from "../employee/entities/project.entity";

@Module({
  imports: [EmployeeModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      // autoSchemaFile: join(process.cwd(), 'apps/employee-gql-service/src/graphsql-schema.gql'),
      // autoSchemaFile: { path: 'apps/employee-gql-service/src/graphsql-schema.gql', federation: 2 },
      autoSchemaFile: {path: join(process.cwd(), 'apps/employee-gql-service/src/graphsql-schema.gql'), federation: 2},
      buildSchemaOptions: {
        orphanedTypes: [Project]
      }
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'AiFuture2023!',
      database: 'federation_db-employee',
      autoLoadEntities: true,
      synchronize: true,
      // logging: true,
    }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
