import { Column, Entity } from 'typeorm';

import { RoleType } from '../../constants';
import { AbstractEntity } from '../../database';

@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity {
  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ type: 'enum', enum: RoleType, default: RoleType.USER })
  role: RoleType;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  password: string;
}
