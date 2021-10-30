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
    dominant: any;
    influence: any;
    steadiness: any;
    compliance: any;
}

const Survey = ({ askings }: Props) => {

    let { path, url } = useRouteMatch();

    const [profile, setProfile] = useState<Profile>({
        dominant: { profile: "dominant", scoreMore: 0, scoreLess: 0 },
        influence: { profile: "influence", scoreMore: 0, scoreLess: 0 },
        steadiness: { profile: "steadiness", scoreMore: 0, scoreLess: 0 },
        compliance: { profile: "compliance", scoreMore: 0, scoreLess: 0 },
    });

    const profileResult = () => {
        const profiles = [profile.dominant, profile.influence, profile.steadiness, profile.compliance]
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

    const disc: any[] = Object.entries(JSON.parse(localStorage.getItem('disc') || '{}'));
    const loggedUser = JSON.parse(localStorage.getItem("loggedUser") || '{}');

    const save = async () => {
        const response = await fetch(`http://localhost:5000/disc`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                profile: profileResult().profile,
                employee: loggedUser.id,
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
                {/* <Redirect to='/app/disc/survey/' /> */}
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
                        <button
                            className={Style.btnPrimary}
                            type="button"
                            onClick={save}>
                            Verificar resultado!
                        </button>
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