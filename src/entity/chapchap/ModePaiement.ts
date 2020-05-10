import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity("ModePaiement", {schema: "dbo"})
export class ModePaiement {

    @PrimaryGeneratedColumn({name: "IdeModePaiement"})
    IdeModePaiement : number;

    @Column("varchar", {
        nullable: false,
        length: 20,
        name: "LibelleModePaiement"
    })
    LibelleModePaiement : string;

    @Column("bit", {
        nullable: false,
        name: "EtatModePaiement"
    })
    EtatModePaiement : boolean;

}
