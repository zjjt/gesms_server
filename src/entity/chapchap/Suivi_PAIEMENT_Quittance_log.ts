import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity("Suivi_PAIEMENT_Quittance_log", {schema: "dbo"})
export class Suivi_PAIEMENT_Quittance_log {

    @PrimaryGeneratedColumn({name: "Suivi_PAIEMENT_Quittance_log"})
    Suivi_PAIEMENT_Quittance_log : string;

    @Column("nchar", {
        nullable: true,
        length: 50,
        name: "NumeroQuittance"
    })
    NumeroQuittance : string | null;

    @Column("nchar", {
        nullable: true,
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

    @Column("date", {
        nullable: true,
        name: "DateEnregistrement"
    })
    DateEnregistrement : Date | null;

    @Column("varchar", {
        nullable: true,
        length: 15,
        name: "Telephone"
    })
    Telephone : string | null;

}
