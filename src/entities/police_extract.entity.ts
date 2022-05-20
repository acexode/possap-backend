import { IsNotEmpty } from 'class-validator';
import {BaseEntity, Entity,  Column, Unique, ManyToOne, PrimaryColumn} from 'typeorm';
import { IPoliceExtract } from '@interfaces/police_extract.interface';
import { UserType } from '@/enums/user.enum';
import { PaymentStatus } from '@/enums/payment_status.enum';
import { UserEntity } from '@entities/users.entity';

@Entity()
// @Unique(["verification_id"])
export class PoliceExtractEntity extends BaseEntity implements IPoliceExtract {
  @PrimaryColumn()
  @Unique(['id'])
  id: string;

  @Column()
  @IsNotEmpty()
  extractCategory: string;

  @Column()
  affidavitIssuanceDate: Date;

  @Column()
  @IsNotEmpty()
  wasReported: boolean;

  // @Column()
  // extractReason: string;

  @Column()
  documentLost: string;
  incident_reported: boolean;

  @Column()
  propertyLost: string;

  // @Column()
  // @IsNotEmpty()
  // extract_sub_category: string;

  @Column()
  dateReported: string;

  @Column()
  @IsNotEmpty()
  courtAffidavit: string;

  @Column()
  @IsNotEmpty()
  affidavitNumber: string;

  @Column()
  @IsNotEmpty()
  extractState: string;

  @Column()
  @IsNotEmpty()
  extractLga: string;

  @Column({ type: 'enum', enum: ['pending', 'in progress', 'approved'], default: 'pending' })
  @IsNotEmpty()
  status: string;

  @Column({ default: 1 })
  @IsNotEmpty()
  approval_level: number;

  @Column()
  @IsNotEmpty()
  extractPoliceDivision: string;

  @Column({
    type: 'enum',
    enum: UserType,
  })
  @IsNotEmpty()
  user_type: string;

  @Column({
    type: 'enum',
    enum: PaymentStatus,
    default: 'pending',
  })
  @IsNotEmpty()
  payment_status: string;

  @Column({ default: 'nil' })
  verification_id: string;

  @ManyToOne(() => UserEntity, user => user.police_extracts)
  user: UserEntity;
}
