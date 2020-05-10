import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import {CLIENT_UNIQUE} from "./CLIENT_UNIQUE";

@Entity("REVENU_ANNUEL", {schema: "dbo"})
export class REVENU_ANNUEL {

    @PrimaryGeneratedColumn({name: "IDE_REVENU_ANNUEL"})
    IDE_REVENU_ANNUEL : string;

    @Column("varchar", {
        nullable: false,
        length: 10,
        name: "CODE_REVENU_ANNUEL"
    })
    CODE_REVENU_ANNUEL : string;

    @Column("varchar", {
        nullable: false,
        length: 30,
        name: "RANGE_REVENU_ANNUEL"
    })
    RANGE_REVENU_ANNUEL : string;

    @OneToMany(type => CLIENT_UNIQUE, CLIENT_UNIQUE => CLIENT_UNIQUE.iDE_REVENU_ANNUEL)
    cLIENT_UNIQUEs : CLIENT_UNIQUE[];

}
