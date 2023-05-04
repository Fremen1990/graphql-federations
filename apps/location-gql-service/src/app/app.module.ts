import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {join} from "path";
import process from "process";
import {GraphQLModule} from "@nestjs/graphql";
import {ApolloFederationDriver, ApolloFederationDriverConfig} from "@nestjs/apollo";
import {TypeOrmModule} from "@nestjs/typeorm";
import {LocationModule} from "../location/location.module";


@Module({
  imports: [LocationModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {path: join(process.cwd(), 'apps/location-gql-service/src/graphsql-schema.gql'), federation: 2},
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'AiFuture2023!',
      database: 'federation_db-location',
      autoLoadEntities: true,
      synchronize: true,
      // logging: true,
    }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
