import {Entity, Column, PrimaryColumn} from 'typeorm';

@Entity("UTILISATEUR_CRYPTE", {schema: "dbo"})
export class UTILISATEUR_CRYPTE {

    @PrimaryColumn("bigint", {
        nullable: false,
        name: "IDE_UTILISATEUR"
    })
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

    @Column("varbinary", {
        nullable: true,
        length: 8000,
        name: "MOT_DE_PASSE"
    })
    MOT_DE_PASSE : Buffer | null;

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
