import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './userModel';

// Define a entidade Expense
// A anotação @Entity() marca a classe como uma entidade que será mapeada para uma tabela no banco de dados
@Entity()
export class Expense {
    // Define a coluna id como uma chave primária gerada automaticamente
    @PrimaryGeneratedColumn()
    id!: number;

    // Define a coluna amount como um número decimal com precisão de 10 e escala de 2 (ex: 12345678.90)
    @Column('decimal', { precision: 10, scale: 2 })
    amount!: number;

    // Define a coluna description como uma string
    @Column()
    description!: string;

    // Define um relacionamento muitos-para-um com a entidade User
    // Cada despesa está associada a um usuário
    @ManyToOne(() => User, user => user.expenses)
    user!: User; 
}
