import { Entity, Column, JoinTable, PrimaryGeneratedColumn } from 'typeorm';

/**
 * This entity contains a role that can be assigned to a user. A role contains
 * 1 to many permissions that allow a user to access secific features
 */
@Entity()
export class DepositTicket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  characterName: string;

  @Column()
  gold: number;
}
