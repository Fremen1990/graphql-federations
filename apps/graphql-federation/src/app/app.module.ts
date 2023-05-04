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
        {name: 'locations', url: 'http://localhost:3002/graphql'},
      ]
    }
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
