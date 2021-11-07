import { format, intervalToDuration } from 'date-fns';
import { useState } from 'react';
import { PersonCircle } from 'react-bootstrap-icons';
import Style from './recordAssessment.module.scss';

type Props = {
    assessments: any[]
    loggedUserId: number
}

const recordAssessment = ({assessments, loggedUserId }: Props) => {

    return (
        <>
            {assessments
                .filter((assessment: any) => ["Pendente", "Rascunho"]
                    .includes(assessment.status) && assessment.evaluator.id === loggedUserId)
                .map((assessment: any) => {
                    const dataResolution = intervalToDuration(
                        {
                            start: new Date(),
                            end: assessment.deadlineDate ? new Date(assessment.deadlineDate) : new Date(),
                        }
                    )
                    var reaminingTotalTimeInDay = ((dataResolution.months || 0) * 30) + (dataResolution.days || 0);
                    return (
                        <div className={Style.entityTableRecord}>
                            <div className={Style.userInfo}>
                                <PersonCircle className={Style.avatar} />
                                <div className={Style.detailsAvatar}>
                                    <p className={Style.primaryInfo}>{assessment.rated.name}</p>
                                    <p className={Style.secondaryInfo}>{assessment.rated.id}</p>
                                </div>
                            </div>
                            <div className={Style.statusSection}>
                                <p className={Style.status} data-status={assessment.status}>{assessment.status}</p>
                            </div>
                            <div className={Style.dateColumn}>
                                <p className={Style.primaryInfo}>{`Restam ${reaminingTotalTimeInDay} dias`}</p>
                                <p className={Style.secondaryInfoDate}>Disponível até {format(new Date(assessment.deadlineDate), 'dd/MM/yyyy')}</p>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}
export default recordAssessment;