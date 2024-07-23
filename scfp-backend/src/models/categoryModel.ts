import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Income } from './incomeModel';  // Importa o modelo Income
import { Expense } from './expenseModel';  // Importa o modelo Expense

export enum CategoryType {
  FIXED = 'fixed',
  VARIABLE = 'variable',
}

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({
    type: 'enum',
    enum: CategoryType,
  })
  type!: CategoryType;

  @OneToMany(() => Income, (income) => income.category)
  incomes!: Income[];

  @OneToMany(() => Expense, (expense) => expense.category)
  expenses!: Expense[];
}
