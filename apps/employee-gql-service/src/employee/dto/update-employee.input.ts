import { InputType, Field, PartialType } from '@nestjs/graphql';
import {EmployeeCreateDTO} from "./create-employee.input";

@InputType()
export class UpdateEmployeeInput extends PartialType(EmployeeCreateDTO) {
  @Field(() => String)
  id: string;
}
