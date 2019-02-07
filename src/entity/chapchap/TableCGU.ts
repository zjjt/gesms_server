import {Entity, Column, PrimaryColumn} from "typeorm";

@Entity("TableCGU", {schema: "dbo"})
export class TableCGU {

    @PrimaryColumn("int", {
        nullable: false,
        name: "IdCGU"
    })
    IdCGU : number;

    @Column("varchar", {
        nullable: false,
        name: "Objet"
    })
    Objet : string;

    @Column("text", {
        nullable: false,
        name: "Articles"
    })
    Articles : string;

}
