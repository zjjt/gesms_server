import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {SUIVI_STATUT_EMAILLING} from "./SUIVI_STATUT_EMAILLING";

@Entity("STATUT_EMAIL", {schema: "dbo"})
export class STATUT_EMAIL {

    @PrimaryGeneratedColumn({name: "IDE_STATUT_EMAIL"})
    IDE_STATUT_EMAIL : number;

    @Column("varchar", {
        nullable: false,
        length: 10,
        name: "CODE_STATUT_EMAIL"
    })
    CODE_STATUT_EMAIL : string;

    @Column("varchar", {
        nullable: false,
        length: 30,
        name: "LIBELLE_STATUT_EMAIL"
    })
    LIBELLE_STATUT_EMAIL : string;

    @OneToMany(type => SUIVI_STATUT_EMAILLING, SUIVI_STATUT_EMAILLING => SUIVI_STATUT_EMAILLING.iDE_STATUT_EMAIL)
    sUIVI_STATUT_EMAILLINGs : SUIVI_STATUT_EMAILLING[];

}
