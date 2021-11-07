import { format, intervalToDuration } from 'date-fns';
import { useState } from 'react';
import { PersonCircle } from 'react-bootstrap-icons';
import Style from './recordGoals.module.scss';

type Props = {
    goals: any[],
}

const recordGoals = ({goals}: Props) => {
    return (
        <div>
            {goals.map((goal) => {
                const dataResolution = intervalToDuration(
                    {
                        start: new Date(goal.startDate),
                        end: new Date(goal.endDate)
                    }
                )
                var days = (dataResolution.months || 0) * 30;
                days += (dataResolution.days || 0);
                return (
                    <div className={Style.entityTableRecord}>
                        <div className={Style.titleColumn}>
                            <p className={Style.goalTitle}>{goal.title}</p>
                        </div>
                        <div className={Style.sectionGoal}>
                            <div className={Style.infoRound}>
                                <p className={Style.tasksCount}>{goal.tasks.length}</p>
                            </div>
                            <p className={Style.tasksLabel}>Tarefas</p>
                        </div>
                        <div className={Style.dateColumn}>
                            <p className={Style.primaryInfo}>{`Restam ${days} dias`}</p>
                            <p className={Style.secondaryInfo}>{`Disponível até ${format(new Date(goal.endDate), 'dd/MM/yyyy')}`}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
export default recordGoals;