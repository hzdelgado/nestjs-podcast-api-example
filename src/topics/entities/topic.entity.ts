import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('topics')
export class Topic {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({ length: 255 })
    title: string;
    @Column({ type: 'text' })
    description: string;
    @Column({ length: 255 })
    slug: string;
    @Column({ name: 'is_active' })
    isActive: boolean;
    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;
    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
