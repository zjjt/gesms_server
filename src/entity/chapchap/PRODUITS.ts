import {Index, Entity, Column, OneToMany} from "typeorm";
import {CONTRATS} from "./CONTRATS";
import {REJETS} from "./REJETS";

@Entity("PRODUITS", {schema: "dbo"})
@Index("NonClusteredIndex-20170324-170430", ["IDE_PRODUIT"])
export class PRODUITS {

    @Column("bigint", {
        nullable: false,
        primary: true,
        name: "IDE_PRODUIT"
    })
    IDE_PRODUIT : string;

    @Column("varchar", {
        nullable: true,
        length: 1,
        name: "CODE_NATURE_PRODUIT"
    })
    CODE_NATURE_PRODUIT : string | null;

    @Column("varchar", {
        nullable: true,
        length: 200,
        name: "DESC_NATURE_POLICE"
    })
    DESC_NATURE_POLICE : string | null;

    @Column("varchar", {
        nullable: true,
        length: 4,
        name: "CODE_PRODUCTION"
    })
    CODE_PRODUCTION : string | null;

    @Column("varchar", {
        nullable: true,
        length: 200,
        name: "DESC_PRODUCTION"
    })
    DESC_PRODUCTION : string | null;

    @Column("varchar", {
        nullable: true,
        length: 4,
        name: "CODE_PRODUIT"
    })
    CODE_PRODUIT : string | null;

    @Column("varchar", {
        nullable: true,
        length: 30,
        name: "DESC_PRODUIT"
    })
    DESC_PRODUIT : string | null;

    @Column("varchar", {
        nullable: true,
        length: 6,
        name: "CODE_FILIALE"
    })
    CODE_FILIALE : string | null;

    @OneToMany(type => CONTRATS, CONTRATS => CONTRATS.iDE_PRODUIT)
    cONTRATSs : CONTRATS[];

    @OneToMany(type => REJETS, REJETS => REJETS.iDE_PRODUIT)
    rEJETSs : REJETS[];

}
