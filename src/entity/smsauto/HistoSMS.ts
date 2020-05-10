import {Entity, Column, PrimaryGeneratedColumn, CreateDateColumn} from "typeorm";
import {Field, ID, ObjectType} from "type-graphql";

// import * as uuidv4 from "uuid/v4";

@Entity({
    name: "HistoSMS",
    database: process.env.NODE_ENV === "test"
        ? "smsautotest"
        : "smsauto"
})
@ObjectType()
export class HistoSMS {

    @Field(type => ID)
    @PrimaryGeneratedColumn("uuid")
    readonly id : string;

    @Field()
    @Column("varchar", {length: 255})
    type : string; //peut prendre les valeurs selon le type de sms envoye

    @Field(type => ID)
    @Column("uuid")
    from : string; //cle externe pour les ID des users apps

    @Field()
    @Column("varchar", {length: 8})
    auBudgetDeLa : string //direction pour le compte de aui les sms sont envoye

    @Field()
    @Column("text")
    message : string;

    @Field()
    @Column("varchar", {length: 8})
    to : string;

    @Field()
    @Column("text")
    transactionID_API : string;

    @Field()
    @Column("boolean")
    isSent : boolean;

    @Field()
    @Column("varchar",{length:10})
    provider : string

    @Field()
    @CreateDateColumn()
    dateEnvoi : string;

}