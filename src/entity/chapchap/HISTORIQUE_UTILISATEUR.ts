import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity("HISTORIQUE_UTILISATEUR", {schema: "dbo"})
export class HISTORIQUE_UTILISATEUR {

    @PrimaryGeneratedColumn({name: "IDE_UTILISATEUR"})
    IDE_UTILISATEUR : string;

    @Column("bigint", {
        nullable: true,
        name: "IDE_TYPE_UTILISATEUR"
    })
    IDE_TYPE_UTILISATEUR : string | null;

    @Column("varchar", {
        nullable: false,
        length: 20,
        name: "LOGIN"
    })
    LOGIN : string;

    @Column("varchar", {
        nullable: false,
        length: 30,
        name: "MOT_DE_PASSE"
    })
    MOT_DE_PASSE : string;

    @Column("numeric", {
        nullable: false,
        precision: 18,
        scale: 0,
        name: "ISWINDOWSACCOUNT"
    })
    ISWINDOWSACCOUNT : number;

    @Column("varchar", {
        nullable: false,
        length: 30,
        name: "EMAIL"
    })
    EMAIL : string;

    @Column("char", {
        nullable: true,
        length: 20,
        name: "MOBILE"
    })
    MOBILE : string | null;

    @Column("int", {
        nullable: true,
        name: "ISFIRSTCONNEXION"
    })
    ISFIRSTCONNEXION : number | null;

    @Column("bigint", {
        nullable: true,
        name: "IDE_CLIENT_UNIQUE"
    })
    IDE_CLIENT_UNIQUE : string | null;

}
