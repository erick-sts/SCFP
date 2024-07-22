import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './userModel';

// Define a entidade Income
@Entity()
export class Income {
    // Define a coluna id como uma chave primária gerada automaticamente
    @PrimaryGeneratedColumn()
    id!: number;

    // Define a coluna amount como um número decimal com precisão de 10 e escala de 2 (ex: 12345678.90)
    @Column('decimal', { precision: 10, scale: 2 })
    amount!: number;

    // Define a coluna description como uma string
    @Column()
    description!: string;

    // Define a coluna category como uma string
    @Column()
    category!: string;

    // Define um relacionamento muitos-para-um com a entidade User
    @ManyToOne(() => User, user => user.incomes)
    user!: User; // Associação com o modelo User
}
