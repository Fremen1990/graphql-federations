import {Parent, ResolveField, Resolver} from "@nestjs/graphql";
import {Project} from "./entities/project.entity";
import {EmployeeService} from "./employee.service";
import {Employee} from "./entities/employee.entity";

@Resolver((of)=>(Project))
export class ProjectResolver{

  constructor(private readonly employeeService: EmployeeService) {
  }

  @ResolveField((of)=> [Employee])
  employees(@Parent() project: Project){
    console.log('resolving employees', project.id)
    return this.employeeService.forProject(project.id);
  }

}
