import {Maximum, MaxLength, Minimum, Property, Required} from "@tsed/schema";
import {Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import { AddressEntity } from "./AddressEntity";
import { VehicleEntity } from "./VehicleEntity";
import { InsuranceEntity } from "./InsuranceEntity";
import { DependentEntity } from "./DependentEntity";

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @MaxLength(100)
  @Required()
  firstName: string;

  @Column()
  @MaxLength(100)
  @Required()
  lastName: string;

  @Column()
  @Required()
  birthDate: Date;

  @OneToMany(() => AddressEntity, (address) => address.user)
  addresses: AddressEntity[];

  @OneToMany(() => DependentEntity, (dependent) => dependent.user)
  dependents: DependentEntity[];

  @OneToOne(() => InsuranceEntity)
  @JoinColumn()
  insurance: InsuranceEntity;

  @OneToMany(() => VehicleEntity, (vehicle) => vehicle.user)
  vehicles: VehicleEntity[];
}