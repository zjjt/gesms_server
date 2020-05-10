import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm";
import {UTILISATEUR_OLD} from "./UTILISATEUR_OLD";

@Entity("HISTORIQUE_CONNEXION", {schema: "dbo"})
export class HISTORIQUE_CONNEXION {

    @PrimaryGeneratedColumn({name: "IDE_CONNEXION"})
    IDE_CONNEXION : string;

    @ManyToOne(type => UTILISATEUR_OLD, UTILISATEUR_OLD => UTILISATEUR_OLD.hISTORIQUE_CONNEXIONs, {})
    @JoinColumn({name: 'IDE_UTILISATEUR'})
    iDE_UTILISATEUR : UTILISATEUR_OLD | null;

    @Column("datetime", {
        nullable: false,
        name: "DATE_DEBUT_CONNEXION"
    })
    DATE_DEBUT_CONNEXION : Date;

    @Column("datetime", {
        nullable: true,
        name: "DATE_FIN_CONNEXION"
    })
    DATE_FIN_CONNEXION : Date | null;

}
