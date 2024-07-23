import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './userModel';  // Importa o modelo User
import { Category } from './categoryModel';  // Importa o modelo Category

@Entity()
export class Income {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  description!: string;

  @Column('decimal')
  value!: number;

  @ManyToOne(() => Category, (category) => category.incomes)
  category!: Category;

  @ManyToOne(() => User, (user) => user.incomes)
  user!: User;  // Certifique-se de que a relação com User está definida corretamente
}
