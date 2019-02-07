import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    ManyToOne,
    JoinColumn
} from "typeorm";
import {UTILISATEUR_OLD} from "./UTILISATEUR_OLD";
import {TYPE_MAILING} from "./TYPE_MAILING";
import {SUIVI_STATUT_EMAILLING} from "./SUIVI_STATUT_EMAILLING";

@Entity("EMAILLING", {schema: "dbo"})
export class EMAILLING {

    @PrimaryGeneratedColumn({name: "IDE_EMAIL"})
    IDE_EMAIL : string;

    @ManyToOne(type => UTILISATEUR_OLD, UTILISATEUR_OLD => UTILISATEUR_OLD.eMAILLINGs, {})
    @JoinColumn({name: 'IDE_UTILISATEUR'})
    iDE_UTILISATEUR : UTILISATEUR_OLD | null;

    @Column("varchar", {
        nullable: false,
        length: 20,
        name: "EMAIL_EXPEDITEUR"
    })
    EMAIL_EXPEDITEUR : string;

    @Column("varchar", {
        nullable: false,
        length: 20,
        name: "EMAIL_RECEPTION"
    })
    EMAIL_RECEPTION : string;

    @Column("datetime", {
        nullable: false,
        name: "DATE_CREATION"
    })
    DATE_CREATION : Date;

    @Column("varchar", {
        nullable: false,
        length: 40,
        name: "OBJET"
    })
    OBJET : string;

    @Column("varchar", {
        nullable: false,
        length: 3000,
        name: "CORPS_DU_MESSAGE"
    })
    CORPS_DU_MESSAGE : string;

    @Column("varchar", {
        nullable: true,
        length: 300,
        name: "FICHIER_ATTACHE"
    })
    FICHIER_ATTACHE : string | null;

    @ManyToOne(type => TYPE_MAILING, TYPE_MAILING => TYPE_MAILING.eMAILLINGs, {nullable: false})
    @JoinColumn({name: 'IDE_TYPE_MAIL'})
    iDE_TYPE_MAIL : TYPE_MAILING | null;

    @OneToMany(type => SUIVI_STATUT_EMAILLING, SUIVI_STATUT_EMAILLING => SUIVI_STATUT_EMAILLING.iDE_EMAIL)
    sUIVI_STATUT_EMAILLINGs : SUIVI_STATUT_EMAILLING[];

}
