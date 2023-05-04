import {ObjectType, Field, ID, Directive} from '@nestjs/graphql';
import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Project} from "./project.entity";

@ObjectType()
@Directive('@key(fields: "id")')
// @Entity('public.Employee')
@Entity()
export class Employee {
  @Field((type) => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Field()
  @Column()
  firstName: string;
  @Field()
  @Column()
  lastName: string;
  @Field()
  @Column()
  designation: string;
  @Field({nullable: true})
  @Column({nullable: true})
  city: string;

  // @ManyToOne(() => Project, (project) => project.employees)
  @Field(() => Project)
  project: Project;

  @Column()
  @Field()
  projectId: string;
}
