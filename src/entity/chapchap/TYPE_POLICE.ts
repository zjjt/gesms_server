import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {CONTRATS} from "./CONTRATS";
import {REJETS} from "./REJETS";

@Entity("TYPE_POLICE", {schema: "dbo"})
export class TYPE_POLICE {

    @PrimaryGeneratedColumn({name: "IDE_TYPE_POLICE"})
    IDE_TYPE_POLICE : string;

    @Column("varchar", {
        nullable: false,
        length: 1,
        name: "CODE_TYPE_POLICE"
    })
    CODE_TYPE_POLICE : string;

    @Column("varchar", {
        nullable: false,
        length: 30,
        name: "LIBELLE_TYPE_POLICE"
    })
    LIBELLE_TYPE_POLICE : string;

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

    @OneToMany(type => CONTRATS, CONTRATS => CONTRATS.iDE_TYPE_POLICE)
    cONTRATSs : CONTRATS[];

    @OneToMany(type => REJETS, REJETS => REJETS.iDE_TYPE_POLICE)
    rEJETSs : REJETS[];

}
