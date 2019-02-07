import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {PARENTS} from "./PARENTS";

@Entity("LIEN_PARENTAL", {schema: "dbo"})
export class LIEN_PARENTAL {

    @PrimaryGeneratedColumn({name: "IDE_LIEN_PARENTAL"})
    IDE_LIEN_PARENTAL : string;

    @Column("varchar", {
        nullable: false,
        length: 8,
        name: "CODE_LIEN_PARENTAL"
    })
    CODE_LIEN_PARENTAL : string;

    @Column("varchar", {
        nullable: false,
        length: 20,
        name: "LIBELLE_LIEN_PARENTAL"
    })
    LIBELLE_LIEN_PARENTAL : string;

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

    @OneToMany(type => PARENTS, PARENTS => PARENTS.iDE_LIEN_PARENTAL)
    pARENTSs : PARENTS[];

}
