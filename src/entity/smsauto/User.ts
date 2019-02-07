import {Entity, Column, PrimaryGeneratedColumn, BeforeInsert} from "typeorm";
import {Field, ID, ObjectType} from "type-graphql";
// import * as uuidv4 from "uuid/v4";
import * as bcrypt from 'bcryptjs';
import {HistoSMS} from './HistoSMS';

@Entity({
    name: "User",
    database: process.env.NODE_ENV === "test"
        ? "smsautotest"
        : "smsauto"
})
@ObjectType()
export class User {

    @Field(type => ID)
    @PrimaryGeneratedColumn("uuid")
    readonly id : string;

    @Field()
    @Column("varchar", {
        length: 255,
        unique: true
    })
    username : string;

    @Column("text")
    password : string;

    @Field()
    @Column("varchar")
    textPassword : string;
    @Field()
    @Column("varchar", {
        length: 255,

    })
    direction : string;
    @Field(type => [HistoSMS])
    historique?: [HistoSMS]

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10)
    }

}