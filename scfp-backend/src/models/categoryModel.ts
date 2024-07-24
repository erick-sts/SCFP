import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Income } from './incomeModel';
import { Expense } from './expenseModel';

export enum CategoryType {
  FIXED = 'fixed',
  VARIABLE = 'variable',
}

export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({
    type: 'enum',
    enum: TransactionType,
  })
  transactionType!: TransactionType;

  @Column({
    type: 'enum',
    enum: CategoryType,
  })
  incomeExpenseType!: CategoryType;

  @OneToMany(() => Income, (income) => income.category)
  incomes!: Income[];

  @OneToMany(() => Expense, (expense) => expense.category)
  expenses!: Expense[];
}
