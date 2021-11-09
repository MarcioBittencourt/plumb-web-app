import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router';
import Ask from '../ask'
import Style from './survey.module.scss'
import DashboardDisc from '../dashboard/index'
import { Link } from 'react-router-dom';

type Props = {
    askings: {
        options: string[];
        response?: string;
    }[];
};

export type Profile = {
    dominante: any;
    influente: any;
    estavel: any;
    conforme: any;
}

const Survey = ({ askings }: Props) => {

    let { path, url } = useRouteMatch();
    const disc: any[] = Object.entries(JSON.parse(localStorage.getItem('disc') || '{}'));
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser") || '{}');
    const cycles:any[] = JSON.parse(localStorage.getItem("cycles") || '{}');

    const [profile, setProfile] = useState<Profile>({
        dominante: { profile: "dominante", scoreMore: 0, scoreLess: 0 },
        influente: { profile: "influente", scoreMore: 0, scoreLess: 0 },
        estavel: { profile: "estavel", scoreMore: 0, scoreLess: 0 },
        conforme: { profile: "conforme", scoreMore: 0, scoreLess: 0 },
    });

    const profileResult = () => {
        const profiles = [profile.dominante, profile.influente, profile.estavel, profile.conforme]
        let profileAux: any = { profile: "", scoreMore: 0, scoreLess: 0 };
        profiles.forEach((profile: any) => {
            if (profile.scoreMore > profileAux.scoreMore) {
                profileAux = profile;
            }
        })
        return profileAux;
    }

    const handleProfile = (profile: Profile) => {
        setProfile(profile);
    }

    const save = async () => {
        const cycle = cycles.find((cycle: any) => cycle.typeAssessment == "DISC");
        const response = await fetch(`http://localhost:5000/disc`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                profile: profileResult().profile,
                employee: loggedUser.id,
                cycle: cycle.id,
            }),
        });

        const discResponse: any = await response.json();

        await Promise.all(disc.map(async (answer, index) => {
            const affinity: any = answer[1];
            await fetch(`http://localhost:5000/survey-disc`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    asking: askings[index].options,
                    more: affinity.more,
                    less: affinity.less,
                    disc: discResponse.id,
                })
            });
        }))
    }

    return (
        <Switch>
            <Route exact path={path}>
                <Row className={Style.page}>
                    <Col className={Style.discForm}>
                        {askings.map((ask, index) => {
                            return (
                                <Ask 
                                    key={`disc-ask-${index}`} 
                                    id={`disc-ask-${index}`} 
                                    utterance={ask.options} 
                                    profile={profile} 
                                    onChangeProfile={handleProfile} />
                            )
                        })}
                    </Col>
                    <div className={Style.buttonSection}>
                        <Link to={`${path}/disc`}>
                            <button
                                className={Style.btnPrimary}
                                type="button"
                                onClick={save}>
                                Verificar resultado!
                            </button>
                        </Link>
                    </div>
                </Row>
            </Route>
            <Route path={`${path}/disc`} render={(props) => (
                <DashboardDisc />
            )}>
            </Route>
        </Switch >
    )
}
export default Survey;