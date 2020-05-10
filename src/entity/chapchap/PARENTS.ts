import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm";
import {LIEN_PARENTAL} from "./LIEN_PARENTAL";
import {CLIENT_UNIQUE} from "./CLIENT_UNIQUE";

@Entity("PARENTS", {schema: "dbo"})
export class PARENTS {

    @PrimaryGeneratedColumn({name: "IDE_PARENT"})
    IDE_PARENT : string;

    @ManyToOne(type => LIEN_PARENTAL, LIEN_PARENTAL => LIEN_PARENTAL.pARENTSs, {})
    @ManyToOne(type => CLIENT_UNIQUE, CLIENT_UNIQUE => CLIENT_UNIQUE.pARENTSs, {})
    @JoinColumn({name: 'IDE_LIEN_PARENTAL'})
    iDE_LIEN_PARENTAL : LIEN_PARENTAL | CLIENT_UNIQUE | null;

    @Column("bigint", {
        nullable: true,
        name: "IDE_CLIENT_UNIQUE"
    })
    IDE_CLIENT_UNIQUE : string | null;

    @Column("varchar", {
        nullable: false,
        length: 10,
        name: "CIVILITE"
    })
    CIVILITE : string;

    @Column("varchar", {
        nullable: false,
        length: 30,
        name: "NOM"
    })
    NOM : string;

    @Column("varchar", {
        nullable: false,
        length: 70,
        name: "PRENOMS"
    })
    PRENOMS : string;

    @Column("datetime", {
        nullable: false,
        name: "DATE_NAISSANCE"
    })
    DATE_NAISSANCE : Date;

    @Column("varchar", {
        nullable: true,
        length: 40,
        name: "LIEU_NAISSANCE"
    })
    LIEU_NAISSANCE : string | null;

    @Column("varchar", {
        nullable: true,
        length: 40,
        name: "LIEU_HABITATION"
    })
    LIEU_HABITATION : string | null;

    @Column("datetime", {
        nullable: true,
        name: "DATE_DECES"
    })
    DATE_DECES : Date | null;

    @Column("varchar", {
        nullable: true,
        length: 1,
        name: "ESTVIVANT"
    })
    ESTVIVANT : string | null;

    @Column("datetime", {
        nullable: false,
        name: "DATE_CREATION"
    })
    DATE_CREATION : Date;

    @Column("datetime", {
        nullable: true,
        name: "DATE_MODIFICATION"
    })
    DATE_MODIFICATION : Date | null;

}
