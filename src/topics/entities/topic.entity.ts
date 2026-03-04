import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Topic {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ length: 255 })
    title: string;
    @Column()
    description: string;
    @Column({ length: 255 })
    slug: string;
    @Column()
    isActive: boolean;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
}
