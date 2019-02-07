import {
    Index,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    OneToMany,
    ManyToOne,
    JoinColumn,

    BaseEntity
} from "typeorm";
import {REVENU_ANNUEL} from "./REVENU_ANNUEL";
import {CLIENT_UTILISATEUR} from "./CLIENT_UTILISATEUR";
import {CONTRATS} from "./CONTRATS";
import {PARENTS} from "./PARENTS";
import {UTILISATEUR_OLD} from "./UTILISATEUR_OLD";
import {UTILISATEURNEW_OLD} from "./UTILISATEURNEW_OLD";

@Entity("CLIENT_UNIQUE", {schema: "dbo"})
@Index("NonClusteredIndex-20170324-170632", ["IDE_CLIENT_UNIQUE"])
@Index("NonClusteredIndex-20170324-170646", ["NUMERO_CLIENT"])
@Index("X_MID_20170914_173032_526AB69B_4A65_4A99_905B_2BA6F2FE1CEF", ["IDE_CLIENT_UNIQUE", "KEY_CLIENT"])
@Index("X_MID_20170914_173032_62A7F0C2_CAEE_4146_BE30_B30B60B37F00", ["NOM_CLIENT"])
@Index("X_MID_20170914_173032_8A166783_75D4_481A_A512_F70F233D5124", ["NOM_CLIENT", "PRENOMS_CLIENT"])
@Index("X_MID_20170914_173032_9DF4DDDF_3C90_4990_91BA_B9EF2CE6C6F6", [
    "IDE_CLIENT_UNIQUE",
    "CODE_FILIALE",
    "NUMERO_CLIENT",
    "NOM_CLIENT",
    "PRENOMS_CLIENT",
    "DATE_NAISSANCE",
    "LIEU_NAISSANCE",
    "SEXE",
    "ADRESSE_POSTALE",
    "TELEPHONE",
    "TELEPHONE_1",
    "PROFESSION",
    "CIVILITE",
    "NATIONALITE",
    "SITUATION_MATRIMONIALE",
    "LIEU_HABITATION",
    "TYPE_CLIENT",
    "CODE_BANQUE",
    "CODE_AGENCE",
    "NUMERO_DE_COMPTE",
    "CLE_RIB",
    "DATE_DEBUT",
    "DATE_FIN",
    "iDE_REVENU_ANNUEL",
    "KEY_CLIENT"
])
@Index("X_MID_20170914_173032_A871F0BA_2688_499F_9561_B3C954796494", ["PROFESSION"])
export class CLIENT_UNIQUE extends BaseEntity {

    @PrimaryGeneratedColumn({name: "IDE_CLIENT_UNIQUE"})
    IDE_CLIENT_UNIQUE : string;

    @Column("nvarchar", {
        nullable: false,
        length: 300,
        name: "KEY_CLIENT"
    })
    KEY_CLIENT : string;

    @Column("varchar", {
        nullable: false,
        length: 8,
        name: "CODE_FILIALE"
    })
    CODE_FILIALE : string;

    @Column("varchar", {
        nullable: false,
        length: 10,
        name: "NUMERO_CLIENT"
    })
    NUMERO_CLIENT : string;

    @Column("varchar", {
        nullable: false,
        length: 50,
        name: "NOM_CLIENT"
    })
    NOM_CLIENT : string;

    @Column("varchar", {
        nullable: true,
        length: 70,
        name: "PRENOMS_CLIENT"
    })
    PRENOMS_CLIENT : string | null;

    @Column("bigint", {
        nullable: true,
        name: "DATE_NAISSANCE"
    })
    DATE_NAISSANCE : string | null;

    @Column("varchar", {
        nullable: true,
        length: 70,
        name: "LIEU_NAISSANCE"
    })
    LIEU_NAISSANCE : string | null;

    @Column("varchar", {
        nullable: true,
        length: 8,
        name: "SEXE"
    })
    SEXE : string | null;

    @Column("varchar", {
        nullable: true,
        length: 70,
        name: "ADRESSE_POSTALE"
    })
    ADRESSE_POSTALE : string | null;

    @Column("varchar", {
        nullable: true,
        length: 20,
        name: "TELEPHONE"
    })
    TELEPHONE : string | null;

    @Column("varchar", {
        nullable: true,
        length: 20,
        name: "TELEPHONE_1"
    })
    TELEPHONE_1 : string | null;

    @Column("varchar", {
        nullable: true,
        length: 70,
        name: "PROFESSION"
    })
    PROFESSION : string | null;

    @Column("varchar", {
        nullable: true,
        length: 30,
        name: "CIVILITE"
    })
    CIVILITE : string | null;

    @Column("varchar", {
        nullable: true,
        length: 20,
        name: "NATIONALITE"
    })
    NATIONALITE : string | null;

    @Column("varchar", {
        nullable: true,
        length: 20,
        name: "SITUATION_MATRIMONIALE"
    })
    SITUATION_MATRIMONIALE : string | null;

    @Column("varchar", {
        nullable: true,
        length: 30,
        name: "LIEU_HABITATION"
    })
    LIEU_HABITATION : string | null;

    @Column("varchar", {
        nullable: true,
        length: 50,
        name: "TYPE_CLIENT"
    })
    TYPE_CLIENT : string | null;

    @Column("varchar", {
        nullable: true,
        length: 10,
        name: "CODE_BANQUE"
    })
    CODE_BANQUE : string | null;

    @Column("varchar", {
        nullable: true,
        length: 10,
        name: "CODE_AGENCE"
    })
    CODE_AGENCE : string | null;

    @Column("varchar", {
        nullable: true,
        length: 20,
        name: "NUMERO_DE_COMPTE"
    })
    NUMERO_DE_COMPTE : string | null;

    @Column("varchar", {
        nullable: true,
        length: 5,
        name: "CLE_RIB"
    })
    CLE_RIB : string | null;

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

    @ManyToOne(type => REVENU_ANNUEL, REVENU_ANNUEL => REVENU_ANNUEL.cLIENT_UNIQUEs, {})
    @JoinColumn({name: 'IDE_REVENU_ANNUEL'})
    iDE_REVENU_ANNUEL : REVENU_ANNUEL | null;

    @OneToOne(type => CLIENT_UTILISATEUR, CLIENT_UTILISATEUR => CLIENT_UTILISATEUR.iDE_CLIENT_UNIQUE)
    cLIENT_UTILISATEUR : CLIENT_UTILISATEUR | null;

    @OneToMany(type => CONTRATS, CONTRATS => CONTRATS.iDE_CLIENT_UNIQUE)
    cONTRATSs : CONTRATS[];

    @OneToMany(type => PARENTS, PARENTS => PARENTS.iDE_LIEN_PARENTAL)
    pARENTSs : PARENTS[];

    @OneToMany(type => UTILISATEUR_OLD, UTILISATEUR_OLD => UTILISATEUR_OLD.iDE_CLIENT_UNIQUE)
    uTILISATEUR_OLDs : UTILISATEUR_OLD[];

    @OneToMany(type => UTILISATEURNEW_OLD, UTILISATEURNEW_OLD => UTILISATEURNEW_OLD.iDE_CLIENT_UNIQUE)
    uTILISATEURNEW_OLDs : UTILISATEURNEW_OLD[];

}
