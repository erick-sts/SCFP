import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Income } from './incomeModel';
import { Expense } from './expenseModel';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    email!: string;

    @Column()
    password!: string;

    @Column({ type: 'blob', nullable: true })
    photo?: Buffer;

    @OneToMany(() => Income, income => income.user)
    incomes!: Income[];

    @OneToMany(() => Expense, expense => expense.user)
    expenses!: Expense[];
  static findById: any;
}
