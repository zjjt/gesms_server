import {Entity, Column, OneToMany} from "typeorm";
import {CONTRATS} from "./CONTRATS";
import {REJETS} from "./REJETS";

@Entity("APPORTEUR", {schema: "dbo"})
export class APPORTEUR {

    @Column("bigint", {
        nullable: false,
        primary: true,
        name: "IDE_AGENT"
    })
    IDE_AGENT : string;

    @Column("int", {
        nullable: true,
        name: "CODEAGENT"
    })
    CODEAGENT : number | null;

    @Column("varchar", {
        nullable: true,
        length: 50,
        name: "NOMAGENT"
    })
    NOMAGENT : string | null;

    @OneToMany(type => CONTRATS, CONTRATS => CONTRATS.iDE_AGENT)
    cONTRATSs : CONTRATS[];

    @OneToMany(type => REJETS, REJETS => REJETS.iDE_AGENT)
    rEJETSs : REJETS[];

}
