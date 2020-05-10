import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm";
import {UTILISATEUR_OLD} from "./UTILISATEUR_OLD";

@Entity("CORRECTION", {schema: "dbo"})
export class CORRECTION {

    @PrimaryGeneratedColumn({name: "IDE_CORRECTION"})
    IDE_CORRECTION : string;

    @ManyToOne(type => UTILISATEUR_OLD, UTILISATEUR_OLD => UTILISATEUR_OLD.cORRECTIONs, {})
    @JoinColumn({name: 'IDE_UTILISATEUR'})
    iDE_UTILISATEUR : UTILISATEUR_OLD | null;

    @Column("nvarchar", {
        nullable: false,
        length: 300,
        name: "KEY_CLIENT"
    })
    KEY_CLIENT : string;

    @Column("nvarchar", {
        nullable: false,
        length: 300,
        name: "KEY_CLIENT_CLEAN"
    })
    KEY_CLIENT_CLEAN : string;

    @Column("datetime", {
        nullable: false,
        name: "DATE_CREATION"
    })
    DATE_CREATION : Date;

    @Column("varchar", {
        nullable: true,
        length: 8,
        name: "CODE_FILIALE"
    })
    CODE_FILIALE : string | null;

    @Column("datetime", {
        nullable: false,
        name: "DATE_DEBUT"
    })
    DATE_DEBUT : Date;

    @Column("datetime", {
        nullable: true,
        name: "DATE_FIN"
    })
    DATE_FIN : Date | null;

}
