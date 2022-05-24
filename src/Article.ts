import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Article extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    newsId: number;
    @Column()
    title: string;
    @Column()
    author: string;
    @Column()
    text: string;
    @Column()
    dateCreated: Date;
    @Column()
    dateModified: Date;
    @Column()
    tags: string;
}