import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm";
import {TYPE_POLICE} from "./TYPE_POLICE";
import {STATUT_POLICE} from "./STATUT_POLICE";
import {APPORTEUR} from "./APPORTEUR";
import {PRODUITS} from "./PRODUITS";

@Entity("REJETS", {schema: "dbo"})
export class REJETS {

    @PrimaryGeneratedColumn({name: "IDE_REJETS"})
    IDE_REJETS : string;

    @ManyToOne(type => TYPE_POLICE, TYPE_POLICE => TYPE_POLICE.rEJETSs, {})
    @JoinColumn({name: 'IDE_TYPE_POLICE'})
    iDE_TYPE_POLICE : TYPE_POLICE | null;

    @ManyToOne(type => STATUT_POLICE, STATUT_POLICE => STATUT_POLICE.rEJETSs, {})
    @JoinColumn({name: 'IDE_STATUT'})
    iDE_STATUT : STATUT_POLICE | null;

    @ManyToOne(type => APPORTEUR, APPORTEUR => APPORTEUR.rEJETSs, {})
    @JoinColumn({name: 'IDE_AGENT'})
    iDE_AGENT : APPORTEUR | null;

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
        nullable: true,
        length: 50,
        name: "NOM_CLIENT"
    })
    NOM_CLIENT : string | null;

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

    @Column("varchar", {
        nullable: true,
        length: 10,
        name: "NUMERO_POLICE"
    })
    NUMERO_POLICE : string | null;

    @Column("varchar", {
        nullable: true,
        length: 10,
        name: "NUMERO_PAYEUR"
    })
    NUMERO_PAYEUR : string | null;

    @Column("varchar", {
        nullable: true,
        length: 10,
        name: "NUMERO_ADHERENT"
    })
    NUMERO_ADHERENT : string | null;

    @Column("varchar", {
        nullable: true,
        length: 10,
        name: "NUMERO_CONVENTION"
    })
    NUMERO_CONVENTION : string | null;

    @Column("bigint", {
        nullable: false,
        name: "CLE_ENTREE"
    })
    CLE_ENTREE : string;

    @Column("bigint", {
        nullable: false,
        name: "CLE_SORTIE"
    })
    CLE_SORTIE : string;

    @Column("decimal", {
        nullable: false,
        precision: 6,
        scale: 6,
        name: "TAUX_SIMILARITE"
    })
    TAUX_SIMILARITE : number;

    @Column("nvarchar", {
        nullable: false,
        length: 300,
        name: "KEY_CLIENT_CLEAN"
    })
    KEY_CLIENT_CLEAN : string;

    @Column("decimal", {
        nullable: false,
        precision: 6,
        scale: 6,
        name: "TAUX_SIMILARITE_KEY_CLIENT"
    })
    TAUX_SIMILARITE_KEY_CLIENT : number;

    @Column("varchar", {
        nullable: true,
        length: 3,
        name: "CODE_ETAT"
    })
    CODE_ETAT : string | null;

    @Column("varchar", {
        nullable: true,
        length: 1,
        name: "POLICE_INDIVIDUELLE_OU_GROUPE"
    })
    POLICE_INDIVIDUELLE_OU_GROUPE : string | null;

    @Column("varchar", {
        nullable: true,
        length: 17,
        name: "TYPE_CLIENT"
    })
    TYPE_CLIENT : string | null;

    @ManyToOne(type => PRODUITS, PRODUITS => PRODUITS.rEJETSs, {})
    @JoinColumn({name: 'IDE_PRODUIT'})
    iDE_PRODUIT : PRODUITS | null;

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

    @Column("int", {
        nullable: true,
        name: "EST_CORRIGE"
    })
    EST_CORRIGE : number | null;

}
