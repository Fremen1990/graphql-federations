import {Module} from "@nestjs/common";

import {AppController} from "./app.controller";
import {AppService} from "./app.service";
import {GraphQLModule} from "@nestjs/graphql";
import {ApolloGatewayDriver, ApolloGatewayDriverConfig} from "@nestjs/apollo";

@Module({
  imports: [GraphQLModule.forRoot<ApolloGatewayDriverConfig>({
    driver: ApolloGatewayDriver,
    server: {},
    gateway: {
      serviceList: [
        {name: 'employees', url: 'http://localhost:3000/graphql'},
        {name: 'projects', url: 'http://localhost:3001/graphql'},

      ]
    }
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}


// https://www.youtube.com/watch?v=cRoaE-qNiAU&list=PLD-mYtebG3X8mcXS3IfRWVy6H7-qKsAel
//TODO 01:00
