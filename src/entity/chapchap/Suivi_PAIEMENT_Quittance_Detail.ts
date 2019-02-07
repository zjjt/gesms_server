import {
    Index,
    Entity,
    PrimaryGeneratedColumn,
    Column,

    ManyToOne,
    JoinColumn
} from "typeorm";
import {Suivi_PAIEMENT_Quittances} from "./Suivi_PAIEMENT_Quittances";

@Entity("Suivi_PAIEMENT_Quittance_Detail", {schema: "dbo"})
@Index("UK_Suivi_PAIEMENT_Quittance_Detail_01", [
    "NumeroPolice", "NumeroQuittance"
], {unique: true})
export class Suivi_PAIEMENT_Quittance_Detail {

    @PrimaryGeneratedColumn({name: "IDE_Suivi_PAIEMENT_Quittance_Detail"})
    IDE_Suivi_PAIEMENT_Quittance_Detail : string;

    @Column("nchar", {
        nullable: true,
        unique: true,
        length: 50,
        name: "NumeroQuittance"
    })
    NumeroQuittance : string | null;

    @Column("nchar", {
        nullable: true,
        unique: true,
        length: 50,
        name: "NumeroPolice"
    })
    NumeroPolice : string | null;

    @Column("decimal", {
        nullable: true,
        precision: 18,
        scale: 0,
        name: "MontantQuittance"
    })
    MontantQuittance : number | null;

    @ManyToOne(type => Suivi_PAIEMENT_Quittances, Suivi_PAIEMENT_Quittances => Suivi_PAIEMENT_Quittances.suivi_PAIEMENT_Quittance_Details, {})
    @JoinColumn({name: 'IDE_Suivi_PAIEMENT_Quittance'})
    iDE_Suivi_PAIEMENT_Quittance : Suivi_PAIEMENT_Quittances | null;

}
