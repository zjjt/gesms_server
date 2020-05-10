import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity("STATUT_CONNEXION", {schema: "dbo"})
export class STATUT_CONNEXION {

    @PrimaryGeneratedColumn({name: "IDE_STATUT_CONNEXION"})
    IDE_STATUT_CONNEXION : string;

    @Column("varchar", {
        nullable: false,
        length: 10,
        name: "CODE_STATUT_CONNEXION"
    })
    CODE_STATUT_CONNEXION : string;

    @Column("varchar", {
        nullable: false,
        length: 30,
        name: "LIBELLE_STATUT_CONNEXION"
    })
    LIBELLE_STATUT_CONNEXION : string;

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

}
