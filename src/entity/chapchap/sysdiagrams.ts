import {Index, Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity("sysdiagrams", {schema: "dbo"})
@Index("UK_principal_name", [
    "principal_id", "name"
], {unique: true})
export class sysdiagrams {

    @Column("nvarchar", {
        nullable: false,
        unique: true,
        length: 128,
        name: "name"
    })
    name : string;

    @Column("int", {
        nullable: false,
        unique: true,
        name: "principal_id"
    })
    principal_id : number;

    @PrimaryGeneratedColumn({name: "diagram_id"})
    diagram_id : number;

    @Column("int", {
        nullable: true,
        name: "version"
    })
    version : number | null;

    @Column("varbinary", {
        nullable: true,
        name: "definition"
    })
    definition : Buffer | null;

}
