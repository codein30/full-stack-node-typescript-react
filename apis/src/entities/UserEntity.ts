import {Maximum, MaxLength, Minimum, Property, Required} from "@tsed/schema";
import {Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import { AddressEntity } from "./AddressEntity";
import { VehicleEntity } from "./VehicleEntity";
import { InsuranceEntity } from "./InsuranceEntity";
import { DependentEntity } from "./DependentEntity";

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

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

  @OneToMany(() => AddressEntity, (address) => address.user, { onDelete: 'CASCADE' })
  addresses: AddressEntity[];

  @OneToMany(() => DependentEntity, (dependent) => dependent.user, { onDelete: 'CASCADE' })
  dependents: DependentEntity[];

  @OneToOne(() => InsuranceEntity, { onDelete: 'CASCADE' })
  @JoinColumn()
  insurance: InsuranceEntity;

  @OneToMany(() => VehicleEntity, (vehicle) => vehicle.user, { onDelete: 'CASCADE' })
  vehicles: VehicleEntity[];
}