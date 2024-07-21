// src/models/User.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Income } from './incomeModel';
import { Expense } from './expenseModel';

// Define a entidade User
// A anotação @Entity() marca a classe como uma entidade que será mapeada para uma tabela no banco de dados
@Entity()
export class User {
    // Define a coluna id como uma chave primária gerada automaticamente
    @PrimaryGeneratedColumn()
    id!: number;

    // Define a coluna name como uma string
    @Column()
    name!: string;

    // Define a coluna email como uma string
    @Column()
    email!: string;

    // Define a coluna password como uma string
    @Column()
    password!: string;

    // Define a coluna photo como um BLOB (Binary Large Object), que pode armazenar dados binários como imagens
    // A propriedade nullable: true indica que a coluna pode ser nula, ou seja, não é obrigatório ter um valor
    @Column({ type: 'blob', nullable: true })
    photo?: Buffer; // Usamos Buffer para armazenar dados binários

    // Define um relacionamento um-para-muitos com a entidade Income
    // Cada usuário pode ter várias receitas associadas
    @OneToMany(() => Income, income => income.user)
    incomes!: Income[]; // Relacionamento com o modelo Income

    // Define um relacionamento um-para-muitos com a entidade Expense
    // Cada usuário pode ter várias despesas associadas
    @OneToMany(() => Expense, expense => expense.user)
    expenses!: Expense[]; // Relacionamento com o modelo Expense
}
