import {Entity, Column, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";
import {Field, ID, ObjectType} from "type-graphql";

// import * as uuidv4 from "uuid/v4";

@Entity({
    name: "TypeSMS",
    database: process.env.NODE_ENV === "test"
        ? "smsautotest"
        : "smsauto"
})
@ObjectType()
export class TypeSMS {

    @Field(type => ID)
    @PrimaryGeneratedColumn("uuid")
    readonly id : string;

    @Field()
    @Column("varchar", {length: 255})
    type : string; //peut prendre les valeurs selon le type de sms envoye

    @Field()
    @Column("text")
    message : string;

    @Field()
    @Column("int", {default: 0})
    frequence : number // en jours

    @Field()
    @Column("varchar", {
        length: 20,
        default: "NOT_SET_YET"
    })
    timeOfLaunch : string

    @Field()
    @Column("boolean", {default: false})
    launchedOnce : boolean

    @Field()
    @Column("boolean", {default: false})
    activated : boolean

    @Field()
    @UpdateDateColumn()
    dateModification : string;

}