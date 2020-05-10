import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn} from "typeorm";
import {ForfaitAbonnement} from "./ForfaitAbonnement";
import {UTILISATEURNEW_OLD} from "./UTILISATEURNEW_OLD";

@Entity("Abonnement", {schema: "dbo"})
export class Abonnement {

    @PrimaryGeneratedColumn({name: "IdeAbonnement"})
    IdeAbonnement : string;

    @ManyToOne(type => ForfaitAbonnement, ForfaitAbonnement => ForfaitAbonnement.abonnements, {})
    @JoinColumn({name: 'IdeForfaitAbonnement'})
    ideForfaitAbonnement : ForfaitAbonnement | null;

    @ManyToOne(type => UTILISATEURNEW_OLD, UTILISATEURNEW_OLD => UTILISATEURNEW_OLD.abonnements, {})
    @JoinColumn({name: 'IdeUtilisateur'})
    ideUtilisateur : UTILISATEURNEW_OLD | null;

    @Column("datetime", {
        nullable: true,
        name: "DateAbonnement"
    })
    DateAbonnement : Date | null;

    @Column("datetime", {
        nullable: true,
        name: "DateDebutAbonnement"
    })
    DateDebutAbonnement : Date | null;

    @Column("datetime", {
        nullable: true,
        name: "DateExpirationAbonnement"
    })
    DateExpirationAbonnement : Date | null;

    @Column("datetime", {
        nullable: true,
        name: "DateFinAbonnement"
    })
    DateFinAbonnement : Date | null;

}
