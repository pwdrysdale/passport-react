import { Field, ID, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id!: number

    @Field()
    @Column({ nullable: true })
    googleId?: string

    @Field()
    @Column({ nullable: true })
    twitterId?: string

    @Field()
    @Column({ nullable: true })
    githubId?: string

    @Field()
    @Column()
    username: string

}