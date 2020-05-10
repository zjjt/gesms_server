import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    OneToMany,
    ManyToOne,
    JoinColumn
} from "typeorm";
import {TYPE_UTILISATEUR} from "./TYPE_UTILISATEUR";
import {CLIENT_UNIQUE} from "./CLIENT_UNIQUE";
import {CLIENT_UTILISATEUR} from "./CLIENT_UTILISATEUR";
import {CORRECTION} from "./CORRECTION";
import {EMAILLING} from "./EMAILLING";
import {HISTORIQUE_CONNEXION} from "./HISTORIQUE_CONNEXION";
import {Suivi_PAIEMENT_Quittances} from "./Suivi_PAIEMENT_Quittances";
import {SUIVI_STATUT_CONNEXION} from "./SUIVI_STATUT_CONNEXION";

@Entity("UTILISATEUR_OLD", {schema: "dbo"})
export class UTILISATEUR_OLD {

    @PrimaryGeneratedColumn({name: "IDE_UTILISATEUR"})
    IDE_UTILISATEUR : string;

    @ManyToOne(type => TYPE_UTILISATEUR, TYPE_UTILISATEUR => TYPE_UTILISATEUR.uTILISATEUR_OLDs, {})
    @JoinColumn({name: 'IDE_TYPE_UTILISATEUR'})
    iDE_TYPE_UTILISATEUR : TYPE_UTILISATEUR | null;

    @Column("varchar", {
        nullable: false,
        length: 20,
        name: "LOGIN"
    })
    LOGIN : string;

    @Column("varchar", {
        nullable: false,
        length: 30,
        name: "MOT_DE_PASSE"
    })
    MOT_DE_PASSE : string;

    @Column("numeric", {
        nullable: false,
        precision: 18,
        scale: 0,
        name: "ISWINDOWSACCOUNT"
    })
    ISWINDOWSACCOUNT : number;

    @Column("varchar", {
        nullable: false,
        length: 30,
        name: "EMAIL"
    })
    EMAIL : string;

    @Column("char", {
        nullable: true,
        length: 20,
        name: "MOBILE"
    })
    MOBILE : string | null;

    @Column("int", {
        nullable: true,
        name: "ISFIRSTCONNEXION"
    })
    ISFIRSTCONNEXION : number | null;

    @ManyToOne(type => CLIENT_UNIQUE, CLIENT_UNIQUE => CLIENT_UNIQUE.uTILISATEUR_OLDs, {})
    @JoinColumn({name: 'IDE_CLIENT_UNIQUE'})
    iDE_CLIENT_UNIQUE : CLIENT_UNIQUE | null;

    @OneToOne(type => CLIENT_UTILISATEUR, CLIENT_UTILISATEUR => CLIENT_UTILISATEUR.iDE_UTILISATEUR)
    cLIENT_UTILISATEUR : CLIENT_UTILISATEUR | null;

    @OneToMany(type => CORRECTION, CORRECTION => CORRECTION.iDE_UTILISATEUR)
    cORRECTIONs : CORRECTION[];

    @OneToMany(type => EMAILLING, EMAILLING => EMAILLING.iDE_UTILISATEUR)
    eMAILLINGs : EMAILLING[];

    @OneToMany(type => HISTORIQUE_CONNEXION, HISTORIQUE_CONNEXION => HISTORIQUE_CONNEXION.iDE_UTILISATEUR)
    hISTORIQUE_CONNEXIONs : HISTORIQUE_CONNEXION[];

    @OneToMany(type => Suivi_PAIEMENT_Quittances, Suivi_PAIEMENT_Quittances => Suivi_PAIEMENT_Quittances.iDE_UTILISATEUR)
    suivi_PAIEMENT_Quittancess : Suivi_PAIEMENT_Quittances[];

    @OneToMany(type => SUIVI_STATUT_CONNEXION, SUIVI_STATUT_CONNEXION => SUIVI_STATUT_CONNEXION.iDE_UTILISATEUR)
    sUIVI_STATUT_CONNEXIONs : SUIVI_STATUT_CONNEXION[];

}
