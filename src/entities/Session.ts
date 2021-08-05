import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('sessions')
export default class Session {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    usersId: number;

    @Column()
    token: string;
}
