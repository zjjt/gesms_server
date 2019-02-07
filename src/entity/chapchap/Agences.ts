import {Entity, Column, PrimaryColumn} from 'typeorm';

@Entity("Agences", {schema: "dbo"})
export class Agences {

    @PrimaryColumn("int", {
        nullable: false,
        name: "IdAgence"
    })
    IdAgence : number;

    @Column("varchar", {
        nullable: false,
        length: 50,
        name: "DistrictAgence"
    })
    DistrictAgence : string;

    @Column("varchar", {
        nullable: false,
        length: 100,
        name: "LocalisationAgence"
    })
    LocalisationAgence : string;

    @Column("varchar", {
        nullable: false,
        length: 50,
        name: "TelephoneAgence"
    })
    TelephoneAgence : string;

    @Column("float", {
        nullable: false,
        precision: 53,
        name: "Longitude"
    })
    Longitude : number;

    @Column("float", {
        nullable: false,
        precision: 53,
        name: "Latitude"
    })
    Latitude : number;

}
