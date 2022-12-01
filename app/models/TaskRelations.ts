import { Table, Column, Model, ForeignKey, UpdatedAt, CreatedAt } from 'sequelize-typescript';
import { TaskDetails } from './TaskDetails';

@Table({
    tableName: 'account_log',
    timestamps: false,
})
export class TaskRelations extends Model<TaskRelations> {
    @Column({
        primaryKey: true,
        autoIncrement: true,
    })
    id!: number

    @ForeignKey(()=>TaskDetails)
    @Column
    task_id!: number

    @ForeignKey(()=>TaskDetails)
    @Column
    parent_id!: number
}