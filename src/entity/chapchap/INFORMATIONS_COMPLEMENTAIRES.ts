import {Entity, Column} from "typeorm";

@Entity("INFORMATIONS_COMPLEMENTAIRES", {schema: "dbo"})
export class INFORMATIONS_COMPLEMENTAIRES {

    @Column("bigint", {
        nullable: false,
        primary: true,
        name: "IDE_INFO"
    })
    IDE_INFO : string;

    @Column("varchar", {
        nullable: true,
        length: 1,
        name: "ESTRELIGION"
    })
    ESTRELIGION : string | null;

    @Column("varchar", {
        nullable: true,
        length: 20,
        name: "LIBELLE_RELIGION"
    })
    LIBELLE_RELIGION : string | null;

    @Column("varchar", {
        nullable: true,
        length: 1,
        name: "ESTVOYAGEUR"
    })
    ESTVOYAGEUR : string | null;

    @Column("varchar", {
        nullable: true,
        length: 1,
        name: "ALOGEMENT"
    })
    ALOGEMENT : string | null;

    @Column("varchar", {
        nullable: true,
        length: 30,
        name: "EMAIL"
    })
    EMAIL : string | null;

    @Column("varchar", {
        nullable: true,
        length: 20,
        name: "PORTABLE"
    })
    PORTABLE : string | null;

    @Column("varchar", {
        nullable: true,
        length: 20,
        name: "PORTABLE2"
    })
    PORTABLE2 : string | null;

    @Column("varchar", {
        nullable: true,
        length: 300,
        name: "PHOTO"
    })
    PHOTO : string | null;

}
