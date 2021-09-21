import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({ nullable: true })
    googleId?: string

    @Column({ nullable: true })
    twitterId?: string

    @Column({ nullable: true })
    githubId?: string

    @Column()
    username: string

}