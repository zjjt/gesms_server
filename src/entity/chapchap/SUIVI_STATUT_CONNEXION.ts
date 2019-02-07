import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm";
import {UTILISATEURNEW_OLD} from "./UTILISATEURNEW_OLD";
import {UTILISATEUR_OLD} from "./UTILISATEUR_OLD";

@Entity("SUIVI_STATUT_CONNEXION", {schema: "dbo"})
export class SUIVI_STATUT_CONNEXION {

    @PrimaryGeneratedColumn({name: "IDE_SUIVI_STATUT_CONNEXION"})
    IDE_SUIVI_STATUT_CONNEXION : string;

    @Column("bigint", {
        nullable: true,
        name: "IDE_STATUT_CONNEXION"
    })
    IDE_STATUT_CONNEXION : string | null;

    @ManyToOne(type => UTILISATEURNEW_OLD, UTILISATEURNEW_OLD => UTILISATEURNEW_OLD.sUIVI_STATUT_CONNEXIONs, {})
    @ManyToOne(type => UTILISATEUR_OLD, UTILISATEUR_OLD => UTILISATEUR_OLD.sUIVI_STATUT_CONNEXIONs, {})
    @JoinColumn({name: 'IDE_UTILISATEUR'})
    iDE_UTILISATEUR : UTILISATEURNEW_OLD | UTILISATEUR_OLD | null;

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
