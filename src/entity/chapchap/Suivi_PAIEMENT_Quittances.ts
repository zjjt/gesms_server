import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    ManyToOne,
    JoinColumn
} from "typeorm";
import {UTILISATEUR_OLD} from "./UTILISATEUR_OLD";
import {STATUT_PAIEMENT_Quittance} from "./STATUT_PAIEMENT_Quittance";
import {Suivi_PAIEMENT_Quittance_Detail} from "./Suivi_PAIEMENT_Quittance_Detail";

@Entity("Suivi_PAIEMENT_Quittances", {schema: "dbo"})
export class Suivi_PAIEMENT_Quittances {

    @PrimaryGeneratedColumn({name: "IDE_Suivi_PAIEMENT_Quittance"})
    IDE_Suivi_PAIEMENT_Quittance : string;

    @ManyToOne(type => UTILISATEUR_OLD, UTILISATEUR_OLD => UTILISATEUR_OLD.suivi_PAIEMENT_Quittancess, {})
    @JoinColumn({name: 'IDE_UTILISATEUR'})
    iDE_UTILISATEUR : UTILISATEUR_OLD | null;

    @Column("nchar", {
        nullable: true,
        length: 50,
        name: "NumeroDeTelephone"
    })
    NumeroDeTelephone : string | null;

    @ManyToOne(type => STATUT_PAIEMENT_Quittance, STATUT_PAIEMENT_Quittance => STATUT_PAIEMENT_Quittance.suivi_PAIEMENT_Quittancess, {})
    @JoinColumn({name: 'IDE_STATUT_PAIEMENT_Quittance'})
    iDE_STATUT_PAIEMENT_Quittance : STATUT_PAIEMENT_Quittance | null;

    @Column("decimal", {
        nullable: true,
        precision: 18,
        scale: 0,
        name: "MontantTotalDebite"
    })
    MontantTotalDebite : number | null;

    @Column("nchar", {
        nullable: true,
        length: 50,
        name: "NumeroPolice"
    })
    NumeroPolice : string | null;

    @Column("nchar", {
        nullable: true,
        length: 50,
        name: "ReferenceOperateur"
    })
    ReferenceOperateur : string | null;

    @Column("nchar", {
        nullable: true,
        length: 50,
        name: "ReferenceOperateurIntermediaire"
    })
    ReferenceOperateurIntermediaire : string | null;

    @Column("datetime", {
        nullable: true,
        name: "DateTransaction"
    })
    DateTransaction : Date | null;

    @OneToMany(type => Suivi_PAIEMENT_Quittance_Detail, Suivi_PAIEMENT_Quittance_Detail => Suivi_PAIEMENT_Quittance_Detail.iDE_Suivi_PAIEMENT_Quittance)
    suivi_PAIEMENT_Quittance_Details : Suivi_PAIEMENT_Quittance_Detail[];

}
