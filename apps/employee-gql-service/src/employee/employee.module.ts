import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";

import { EmployeeService } from './employee.service';
import { EmployeeResolver } from './employee.resolver';

import {ProjectResolver} from "./project.resolver";
import {LocationResolver} from "./location.resolver";


import {Employee} from "./entities/employee.entity";
@Module({
  imports: [TypeOrmModule.forFeature([Employee])],
  providers: [EmployeeResolver, EmployeeService, ProjectResolver, LocationResolver],
})
export class EmployeeModule {}
