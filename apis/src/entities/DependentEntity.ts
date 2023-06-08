import {Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {Maximum, MaxLength, Minimum, Property, Required} from "@tsed/schema";
import { UserEntity } from "./UserEntity";

@Entity()
export class DependentEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  @MaxLength(200)
  @Required()
  relationship: string;

  @Column()
  @MaxLength(200)
  @Required()
  firstName: string;

  @Column()
  @MaxLength(200)
  @Required()
  lastName: string;

  @Column()
  @Required()
  birthDate: Date;

  @ManyToOne(() => UserEntity, (user) => user.dependents)
  user: UserEntity;

  // @OneToOne(()=> UserEntity)
  // @JoinColumn()
  // profile: UserEntity;
}