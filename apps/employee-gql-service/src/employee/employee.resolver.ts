import {Resolver, Query, Mutation, Args, ResolveField, Parent} from '@nestjs/graphql';
import { EmployeeService } from './employee.service';
import { Employee } from './entities/employee.entity';
import { UpdateEmployeeInput } from './dto/update-employee.input';
import {EmployeeCreateDTO} from "./dto/create-employee.input";
import {Project} from "./entities/project.entity";
import {Location} from "./entities/location.entity";

@Resolver(() => Employee)
export class EmployeeResolver {
  constructor(private readonly employeeService: EmployeeService) {}

  @Mutation(() => Employee)
  createEmployee(
    @Args('createEmployeeInput') createEmployeeInput: EmployeeCreateDTO
  ) {
    return this.employeeService.create(createEmployeeInput);
  }

  @Query(() => [Employee], { name: 'getAllEmployees' })
  findAll() {
    return this.employeeService.findAll();
  }

  @Query(() => Employee, { name: 'employee' })
  findOne(@Args('id') id: string) {
    return this.employeeService.findOne(id);
  }

  @Mutation(() => Employee)
  updateEmployee(
    @Args('updateEmployeeInput') updateEmployeeInput: UpdateEmployeeInput
  ) {
    return this.employeeService.update(
      updateEmployeeInput.id,
      updateEmployeeInput
    );
  }

  @Mutation(() => Employee)
  removeEmployee(@Args('id', ) id: string) {
    return this.employeeService.remove(id);
  }

  @ResolveField((of) => Project)
  project(@Parent() employee: Employee) {
    return { __typename: 'Project', id: employee.projectId };
  }

  @ResolveField((of) => Location)
  location(@Parent() employee: Employee) {
    console.log('returning location type')
    return { __typename: 'Location', id: employee.locationId };
  }
}
