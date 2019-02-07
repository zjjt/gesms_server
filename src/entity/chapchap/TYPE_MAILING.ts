import {Entity, Column, OneToMany} from "typeorm";
import {EMAILLING} from "./EMAILLING";

@Entity("TYPE_MAILING", {schema: "dbo"})
export class TYPE_MAILING {

    @Column("int", {
        nullable: false,
        primary: true,
        name: "IDE_TYPE_MAIL"
    })
    IDE_TYPE_MAIL : number;

    @Column("varchar", {
        nullable: true,
        length: 5,
        name: "CODE_TYPE_MAIL"
    })
    CODE_TYPE_MAIL : string | null;

    @Column("varchar", {
        nullable: true,
        length: 50,
        name: "LIBELLE_TYPE_MAIL"
    })
    LIBELLE_TYPE_MAIL : string | null;

    @Column("datetime", {
        nullable: true,
        name: "DATE_CREATION"
    })
    DATE_CREATION : Date | null;

    @Column("datetime", {
        nullable: true,
        name: "DATE_DEBUT"
    })
    DATE_DEBUT : Date | null;

    @Column("datetime", {
        nullable: false,
        name: "DATE_FIN"
    })
    DATE_FIN : Date;

    @OneToMany(type => EMAILLING, EMAILLING => EMAILLING.iDE_TYPE_MAIL)
    eMAILLINGs : EMAILLING[];

}
