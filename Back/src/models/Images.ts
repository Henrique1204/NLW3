import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import Orphanage from "./orphanages";

@Entity('images')
export default class Images {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    path: string;

    // Define um relacionamento de muitos para um.
    @ManyToOne(() => Orphanage, orphanage => orphanage.images)
    // Define o nome da coluna que vai representar o relacionamento.
    @JoinColumn({ name: 'orphanage_id' })
    orphanage: Orphanage;
}
