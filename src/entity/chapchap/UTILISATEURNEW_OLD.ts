import {
    Index,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    ManyToOne,
    JoinColumn
} from "typeorm";
import {TYPE_UTILISATEUR} from "./TYPE_UTILISATEUR";
import {CLIENT_UNIQUE} from "./CLIENT_UNIQUE";
import {Abonnement} from "./Abonnement";
import {SUIVI_STATUT_CONNEXION} from "./SUIVI_STATUT_CONNEXION";

@Entity("UTILISATEURNEW_OLD", {schema: "dbo"})
@Index("X_MID_20170914_173032_2CB5C5E0_6B37_4D19_B5FD_4D568C48DFEC", [
    "IDE_UTILISATEUR",
    "iDE_TYPE_UTILISATEUR",
    "LOGIN",
    "MOT_DE_PASSE",
    "ISWINDOWSACCOUNT",
    "EMAIL",
    "MOBILE",
    "ISFIRSTCONNEXION",
    "iDE_CLIENT_UNIQUE"
])
@Index("X_MID_20170914_173032_B0FA66AD_F00C_4AB4_9868_674EA499F134", ["LOGIN", "MOT_DE_PASSE", "iDE_CLIENT_UNIQUE", "EMAIL"])
@Index("X_MID_20170914_173032_B677C075_A506_487D_8396_4C08BAF0C9C9", ["iDE_CLIENT_UNIQUE", "EMAIL"])
@Index("X_MID_20170914_173032_BBC166F6_B8EA_4EF4_AAC3_C2FC94B03157", ["LOGIN", "MOT_DE_PASSE"])
@Index("X_MID_20170914_173032_E79C247A_FB97_4D52_A1AA_CBF36D6C326A", ["LOGIN"])
export class UTILISATEURNEW_OLD {

    @PrimaryGeneratedColumn({name: "IDE_UTILISATEUR"})
    IDE_UTILISATEUR : string;

    @ManyToOne(type => TYPE_UTILISATEUR, TYPE_UTILISATEUR => TYPE_UTILISATEUR.uTILISATEURNEW_OLDs, {})
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

    @ManyToOne(type => CLIENT_UNIQUE, CLIENT_UNIQUE => CLIENT_UNIQUE.uTILISATEURNEW_OLDs, {})
    @JoinColumn({name: 'IDE_CLIENT_UNIQUE'})
    iDE_CLIENT_UNIQUE : CLIENT_UNIQUE | null;

    @OneToMany(type => Abonnement, Abonnement => Abonnement.ideUtilisateur)
    abonnements : Abonnement[];

    @OneToMany(type => SUIVI_STATUT_CONNEXION, SUIVI_STATUT_CONNEXION => SUIVI_STATUT_CONNEXION.iDE_UTILISATEUR)
    sUIVI_STATUT_CONNEXIONs : SUIVI_STATUT_CONNEXION[];

}
