import {Field, ObjectType, ID} from "type-graphql";
import { PrimaryGeneratedColumn, Column, Entity } from "typeorm";

// import * as uuidv4 from "uuid/v4";

@Entity({
    name: "SmsProvider",
    database: process.env.NODE_ENV === "test"
        ? "smsautotest"
        : "smsauto"
})
@ObjectType()
export class SmsProvider {
    @Field(type => ID)
    @PrimaryGeneratedColumn("uuid")
    readonly id : string;

    @Field()
    @Column("varchar")
    provider : string;

    @Field()
    @Column("text",{nullable:true})
    token : string;

    @Field()
    @Column({nullable:true})
    expirationToken : string;

    @Column("boolean", {default: false})
    chosen : boolean;
}