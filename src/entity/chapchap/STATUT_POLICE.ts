import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {CONTRATS} from "./CONTRATS";
import {REJETS} from "./REJETS";

@Entity("STATUT_POLICE", {schema: "dbo"})
export class STATUT_POLICE {

    @PrimaryGeneratedColumn({name: "IDE_STATUT"})
    IDE_STATUT : string;

    @Column("varchar", {
        nullable: false,
        length: 3,
        name: "CODE_STATUT"
    })
    CODE_STATUT : string;

    @Column("varchar", {
        nullable: false,
        length: 80,
        name: "LIBELLE_STATUT"
    })
    LIBELLE_STATUT : string;

    @Column("varchar", {
        nullable: false,
        length: 3,
        name: "CODE_TYPE_POLICE"
    })
    CODE_TYPE_POLICE : string;

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

    @OneToMany(type => CONTRATS, CONTRATS => CONTRATS.iDE_STATUT)
    cONTRATSs : CONTRATS[];

    @OneToMany(type => REJETS, REJETS => REJETS.iDE_STATUT)
    rEJETSs : REJETS[];

}
