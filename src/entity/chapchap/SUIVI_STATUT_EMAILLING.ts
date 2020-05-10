import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm";
import {EMAILLING} from "./EMAILLING";
import {STATUT_EMAIL} from "./STATUT_EMAIL";

@Entity("SUIVI_STATUT_EMAILLING", {schema: "dbo"})
export class SUIVI_STATUT_EMAILLING {

    @PrimaryGeneratedColumn({name: "IDE_SUIVI_STATUT_EMAILLING"})
    IDE_SUIVI_STATUT_EMAILLING : string;

    @ManyToOne(type => EMAILLING, EMAILLING => EMAILLING.sUIVI_STATUT_EMAILLINGs, {})
    @JoinColumn({name: 'IDE_EMAIL'})
    iDE_EMAIL : EMAILLING | null;

    @ManyToOne(type => STATUT_EMAIL, STATUT_EMAIL => STATUT_EMAIL.sUIVI_STATUT_EMAILLINGs, {})
    @JoinColumn({name: 'IDE_STATUT_EMAIL'})
    iDE_STATUT_EMAIL : STATUT_EMAIL | null;

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

    @Column("datetime", {
        nullable: false,
        name: "DATE_CREATION"
    })
    DATE_CREATION : Date;

}
