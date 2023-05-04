import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {join} from "path";
import process from "process";
import {GraphQLModule} from "@nestjs/graphql";
import {ApolloDriver, ApolloDriverConfig, ApolloFederationDriver, ApolloFederationDriverConfig} from "@nestjs/apollo";
import {TypeOrmModule} from "@nestjs/typeorm";
import {ProjectModule} from "../project/project.module";


@Module({
  imports: [ProjectModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      // autoSchemaFile: join(process.cwd(), 'apps/project-gql-service/src/graphsql-schema.gql'),
      // use the federation version 2
      // autoSchemaFile: { path: "schema.gql", federation: 2 },
      autoSchemaFile: { path: join(process.cwd(),'apps/project-gql-service/src/graphsql-schema.gql'), federation: 2 },
      // autoSchemaFile:{federation:2}
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'AiFuture2023!',
      database: 'federation_db-project',
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
