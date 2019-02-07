import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {Abonnement} from "./Abonnement";

@Entity("ForfaitAbonnement", {schema: "dbo"})
export class ForfaitAbonnement {

    @PrimaryGeneratedColumn({name: "IdeForfaitAbonnement"})
    IdeForfaitAbonnement : number;

    @Column("varchar", {
        nullable: false,
        length: 10,
        name: "LibelleForfaitAbonnement"
    })
    LibelleForfaitAbonnement : string;

    @Column("int", {
        nullable: false,
        name: "MontantForfaitAbonnement"
    })
    MontantForfaitAbonnement : number;

    @Column("bit", {
        nullable: false,
        name: "EtatForfaitAbonnement"
    })
    EtatForfaitAbonnement : boolean;

    @Column("int", {
        nullable: true,
        name: "DureeEnJour"
    })
    DureeEnJour : number | null;

    @OneToMany(type => Abonnement, Abonnement => Abonnement.ideForfaitAbonnement)
    abonnements : Abonnement[];

}
