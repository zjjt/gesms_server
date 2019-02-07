import {
    Index,
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    BaseEntity
} from "typeorm";
import {CLIENT_UNIQUE} from "./CLIENT_UNIQUE";
import {TYPE_POLICE} from "./TYPE_POLICE";
import {STATUT_POLICE} from "./STATUT_POLICE";
import {APPORTEUR} from "./APPORTEUR";
import {PRODUITS} from "./PRODUITS";

@Entity("CONTRATS", {schema: "dbo"})
@Index("Index_Unification1", ["iDE_CLIENT_UNIQUE", "NUMERO_POLICE", "iDE_PRODUIT"])
@Index("IndexManquantClientUnique", ["NUMERO_POLICE", "iDE_CLIENT_UNIQUE"])
@Index("NonClusteredIndex-20170324-170401", ["iDE_PRODUIT"])
@Index("X_MID_20170914_173032_27946908_DE8E_4165_9E63_19727D578D64", ["iDE_CLIENT_UNIQUE", "iDE_PRODUIT", "NUMERO_POLICE"])
@Index("X_MID_20170914_173032_BFF0E905_A928_4968_8478_95370FFCAE98", ["iDE_PRODUIT", "NUMERO_POLICE"])
export class CONTRATS extends BaseEntity {

    @PrimaryGeneratedColumn({name: "IDE_CONTRAT"})
    IDE_CONTRAT : string;

    @ManyToOne(type => CLIENT_UNIQUE, CLIENT_UNIQUE => CLIENT_UNIQUE.cONTRATSs, {nullable: false})
    @JoinColumn({name: 'IDE_CLIENT_UNIQUE'})
    @Column("varchar")
    iDE_CLIENT_UNIQUE : string | null;

    @ManyToOne(type => TYPE_POLICE, TYPE_POLICE => TYPE_POLICE.cONTRATSs, {nullable: false})
    @JoinColumn({name: 'IDE_TYPE_POLICE'})
    iDE_TYPE_POLICE : TYPE_POLICE | null;

    @ManyToOne(type => STATUT_POLICE, STATUT_POLICE => STATUT_POLICE.cONTRATSs, {nullable: false})
    @JoinColumn({name: 'IDE_STATUT'})
    iDE_STATUT : STATUT_POLICE | null;

    @ManyToOne(type => APPORTEUR, APPORTEUR => APPORTEUR.cONTRATSs, {nullable: false})
    @JoinColumn({name: 'IDE_AGENT'})
    iDE_AGENT : APPORTEUR | null;

    @ManyToOne(type => PRODUITS, PRODUITS => PRODUITS.cONTRATSs, {nullable: false})
    @JoinColumn({name: 'IDE_PRODUIT'})
    iDE_PRODUIT : PRODUITS | null;

    @Column("varchar", {
        nullable: false,
        length: 10,
        name: "NUMERO_POLICE"
    })
    NUMERO_POLICE : string;

    @Column("varchar", {
        nullable: true,
        length: 10,
        name: "NUMERO_CONVENTION"
    })
    NUMERO_CONVENTION : string | null;

    @Column("varchar", {
        nullable: false,
        length: 10,
        name: "NUMERO_PAYEUR"
    })
    NUMERO_PAYEUR : string;

    @Column("varchar", {
        nullable: false,
        length: 10,
        name: "NUMERO_CLIENT"
    })
    NUMERO_CLIENT : string;

    @Column("varchar", {
        nullable: true,
        length: 10,
        name: "NUMERO_ADHERENT"
    })
    NUMERO_ADHERENT : string | null;

    @Column("varchar", {
        nullable: true,
        length: 120,
        name: "DATE_DEBUT_EFFET_POLICE"
    })
    DATE_DEBUT_EFFET_POLICE : string | null;

    @Column("varchar", {
        nullable: true,
        length: 120,
        name: "DATE_FIN_EFFET_POLICE"
    })
    DATE_FIN_EFFET_POLICE : string | null;

    @Column("varchar", {
        nullable: true,
        length: 120,
        name: "DATE_FIN_CONTRAT"
    })
    DATE_FIN_CONTRAT : string | null;

    @Column("varchar", {
        nullable: true,
        length: 120,
        name: "DATE_RESILIATION"
    })
    DATE_RESILIATION : string | null;

    @Column("varchar", {
        nullable: true,
        length: 120,
        name: "PERIODICITE_REMBOURSEMENT_POLICE"
    })
    PERIODICITE_REMBOURSEMENT_POLICE : string | null;

    @Column("varchar", {
        nullable: true,
        length: 120,
        name: "PERIODICITE_POLICE"
    })
    PERIODICITE_POLICE : string | null;

    @Column("varchar", {
        nullable: true,
        length: 120,
        name: "PERIODICITE_RENTE"
    })
    PERIODICITE_RENTE : string | null;

    @Column("varchar", {
        nullable: true,
        length: 120,
        name: "DUREE_DE_RENTE"
    })
    DUREE_DE_RENTE : string | null;

    @Column("varchar", {
        nullable: true,
        length: 120,
        name: "DUREE_POLICE"
    })
    DUREE_POLICE : string | null;

    @Column("varchar", {
        nullable: true,
        length: 120,
        name: "UNITE_DUREE_POLICE"
    })
    UNITE_DUREE_POLICE : string | null;

    @Column("varchar", {
        nullable: true,
        length: 120,
        name: "PERIODICITE_APPELS_COTISATION"
    })
    PERIODICITE_APPELS_COTISATION : string | null;

    @Column("numeric", {
        nullable: true,
        precision: 38,
        scale: 2,
        name: "PRIME_SOUSCRIPTION"
    })
    PRIME_SOUSCRIPTION : number | null;

    @Column("numeric", {
        nullable: true,
        precision: 38,
        scale: 2,
        name: "PRIME_DECES"
    })
    PRIME_DECES : number | null;

    @Column("money", {
        nullable: true,
        name: "CAPITAL_DE_BASE"
    })
    CAPITAL_DE_BASE : number | null;

    @Column("datetime", {
        nullable: true,
        name: "DATE_CREATION"
    })
    DATE_CREATION : Date | null;

}
