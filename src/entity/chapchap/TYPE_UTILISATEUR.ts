import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {UTILISATEUR_OLD} from "./UTILISATEUR_OLD";
import {UTILISATEURNEW_OLD} from "./UTILISATEURNEW_OLD";

@Entity("TYPE_UTILISATEUR", {schema: "dbo"})
export class TYPE_UTILISATEUR {

    @PrimaryGeneratedColumn({name: "IDE_TYPE_UTILISATEUR"})
    IDE_TYPE_UTILISATEUR : string;

    @Column("varchar", {
        nullable: false,
        length: 10,
        name: "CODE_TYPE_UTILISATEUR"
    })
    CODE_TYPE_UTILISATEUR : string;

    @Column("varchar", {
        nullable: false,
        length: 20,
        name: "TYPE_UTILISATEUR"
    })
    TYPE_UTILISATEUR : string;

    @OneToMany(type => UTILISATEUR_OLD, UTILISATEUR_OLD => UTILISATEUR_OLD.iDE_TYPE_UTILISATEUR)
    uTILISATEUR_OLDs : UTILISATEUR_OLD[];

    @OneToMany(type => UTILISATEURNEW_OLD, UTILISATEURNEW_OLD => UTILISATEURNEW_OLD.iDE_TYPE_UTILISATEUR)
    uTILISATEURNEW_OLDs : UTILISATEURNEW_OLD[];

}
