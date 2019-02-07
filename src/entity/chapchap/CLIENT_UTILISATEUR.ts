import {Index, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn} from "typeorm";
import {UTILISATEUR_OLD} from "./UTILISATEUR_OLD";
import {CLIENT_UNIQUE} from "./CLIENT_UNIQUE";

@Entity("CLIENT_UTILISATEUR", {schema: "dbo"})
@Index("NonClusteredIndex-20170324-170453", ["iDE_CLIENT_UNIQUE"])
export class CLIENT_UTILISATEUR {

    @OneToOne(type => UTILISATEUR_OLD, UTILISATEUR_OLD => UTILISATEUR_OLD.cLIENT_UTILISATEUR, {
        primary: true,
        nullable: false
    })
    @JoinColumn({name: 'IDE_UTILISATEUR'})
    iDE_UTILISATEUR : UTILISATEUR_OLD | null;

    @OneToOne(type => CLIENT_UNIQUE, CLIENT_UNIQUE => CLIENT_UNIQUE.cLIENT_UTILISATEUR, {
        primary: true,
        nullable: false
    })
    @JoinColumn({name: 'IDE_CLIENT_UNIQUE'})
    iDE_CLIENT_UNIQUE : CLIENT_UNIQUE | null;

    @PrimaryGeneratedColumn({name: "IDE_CLIENT_UTILISATEUR"})
    IDE_CLIENT_UTILISATEUR : string;

}
