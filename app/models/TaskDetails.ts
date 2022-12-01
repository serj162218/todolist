import { Table, Column, Model, HasMany, CreatedAt, UpdatedAt, DataType } from 'sequelize-typescript';
import { TaskRelations } from './TaskRelations';

@Table({
    tableName: 'taskdetails',
    timestamps: true,
})

export class TaskDetails extends Model<TaskDetails> {
    @HasMany(() => TaskRelations)
    childs!: TaskRelations[];

    @HasMany(() => TaskRelations)
    parents!: TaskRelations[];


    @Column({
        primaryKey: true,
        autoIncrement: true,
    })
    id!: number

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name!: string
    
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    content!: string

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
    })
    finished!: boolean

    @Column({
        type: DataType.NUMBER,
        allowNull: false,
    })
    type!: number

    @CreatedAt
    createdAt!: Date
    
    @UpdatedAt
    updatedAt!: Date;
}