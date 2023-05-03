import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmployeeCreateDTO } from './dto/create-employee.input';
import {Employee} from "./entities/employee.entity";
import {UpdateEmployeeInput} from "./dto/update-employee.input";


@Injectable()
export class EmployeeService {

  constructor(@InjectRepository(Employee) private employeeRepository: Repository<Employee>) {
  }


  async findAll(): Promise<Employee[]> {
    return this.employeeRepository.find();
  }
  async findOne(id: string) {
    return this.employeeRepository.findOneById(id)
  }

  async create(employee: EmployeeCreateDTO): Promise<Employee> {

    let emp = this.employeeRepository.create(employee);
    return this.employeeRepository.save(emp)

  }

  update(id: string, updateEmployeeInput: UpdateEmployeeInput) {
    return `This action updates a #${id} employee`;
  }

  remove(id: string) {
    return `This action removes a #${id} employee`;
  }
}
