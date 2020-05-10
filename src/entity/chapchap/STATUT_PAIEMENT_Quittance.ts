import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {Suivi_PAIEMENT_Quittances} from "./Suivi_PAIEMENT_Quittances";

@Entity("STATUT_PAIEMENT_Quittance", {schema: "dbo"})
export class STATUT_PAIEMENT_Quittance {

    @PrimaryGeneratedColumn({name: "IDE_STATUT_PAIEMENT_Quittance"})
    IDE_STATUT_PAIEMENT_Quittance : string;

    @Column("nchar", {
        nullable: true,
        length: 50,
        name: "Libelle"
    })
    Libelle : string | null;

    @OneToMany(type => Suivi_PAIEMENT_Quittances, Suivi_PAIEMENT_Quittances => Suivi_PAIEMENT_Quittances.iDE_STATUT_PAIEMENT_Quittance)
    suivi_PAIEMENT_Quittancess : Suivi_PAIEMENT_Quittances[];

}
