import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Style from './dashboard.disc.module.scss';
import dataProfiles from '../../../assets/profileDisc.json';
import discLogoImage from '../../../assets/img/disc_logo.png';
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import Survey from '../survey/index';
import DISCData from '../../../assets/disc.json';
import { format } from "date-fns";

type Props = {}

type Disc = {
    profile: string;
    description: string;
}

const DashboardDisc = (props: Props) => {

    const loggedUser = JSON.parse(localStorage.getItem("loggedUser") || '{}');
    const [latestRating, setLatestRating] = useState<any>({ profile: "nenhum" });
    const [allRatingsFromLoggedUser, setAllRatingsFromLoggedUser] = useState<any>([]);
    const [allRatingsFromOthersEmployees, setAllRatingsFromOthersEmployees] = useState<any>([]);
    let { path, url } = useRouteMatch();

    useEffect(() => {
        (async () => {
            const discProfileResponse = await fetch(`http://localhost:5000/disc/employeeId/${loggedUser.id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            const discData: any = await discProfileResponse.json();
            if(discData.length > 0) {
                setLatestRating(await discData[0]);
                setAllRatingsFromLoggedUser(await discData);
            }

            const profilesEmployeesResponse = await fetch(`http://localhost:5000/disc/companyId/${loggedUser.company}?onlyRecent=true`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            const discsEmployeesData: any = await profilesEmployeesResponse.json();
            setAllRatingsFromOthersEmployees(await discsEmployeesData);
        })();
    }, []);

    const showDescription = () => {
        const discProfile: Disc[] = dataProfiles.profiles.filter(p => p.profile === latestRating.profile);
        return (
            <div className={Style.descriptionProfile}>
                <p>
                    {discProfile[0].description}
                </p>
            </div>
        )
    }
    const resultProfile = () => {
        if (dataProfiles.profiles.some(profile => profile.profile === latestRating.profile)) {
            return (
                <>
                    <Row className={Style.page}>
                        <Col lg={7}>
                            <div className={Style.titleProfile}>
                                <h3>{latestRating.profile}</h3>
                            </div>
                            {showDescription()}
                        </Col>
                        <Col lg={5} id="scores" className={Style.scores}>
                            <div data-profile={latestRating.profile} className={Style.profile}>
                                <div className={Style.profileTitle}>
                                    <h2>{latestRating.profile.substring(0, 1)}</h2>
                                </div>
                                <div className={Style.profileDetails}>
                                    <h4>{latestRating.profile}</h4>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    {tableProfiles()}
                    {tableEmployeesProfiles()}
                </>
            );
        }
    }

    const discPresentation = () => {
        if (latestRating.profile === "nenhum") {
            return (
                <Switch>
                    <Route exact path={path}>
                        <Row className={Style.page}>
                            <Col className={Style.contentColumn}>
                                <Row>
                                    <p> O teste DISC é uma ferramenta útil para o autoconhecimento e conhecimento do outro.</p>
                                    <p> É definido como uma ferramenta que possibilita a identificação do perfil dominante do indivíduo,
                                        sendo frequentemente utilizado no setor de Recursos Humanos para identificar as características dos colaboradores de uma empresa.
                                    </p>
                                </Row>
                                <Row className={Style.btnPresentationRow}>
                                    <Link className={Style.btnPrimary} to={`/app/disc/survey/`}>
                                        Realizar avaliação
                                    </Link>
                                </Row>
                            </Col>
                            <Col className={Style.discLogoImageSection}>
                                <img src={discLogoImage} className={Style.discLogoImage} />
                            </Col>
                        </Row>
                    </Route>
                    <Route path={`${path}/survey`} render={(props) => (
                        <Survey askings={DISCData.askings} />
                    )}>
                    </Route>
                </Switch>
            )
        }
    }

    const tableProfiles = () => {
        return (
            <>
                <h4 className={Style.titleTable}>Seus perfis comportamentais anteriores</h4>
                <Row className={"g-0"}>
                    <Col lg={7} className={Style.entityTable}>
                        {allRatingsFromLoggedUser.map((disc: any) => {
                            const dateCreationFmt = format(new Date(disc.creationDate), 'd MMM yyyy');
                            return (
                                <Row className={Style.entityTableRecord}>
                                    <Col lg={3}>
                                        <div data-profile={disc.profile}
                                            className={Style.profileTableRecord}>
                                            <h3>{disc.profile.substring(0, 1)}</h3>
                                        </div>
                                    </Col>
                                    <Col lg={3}>
                                        <h5 className={Style.primaryInfoSecondaryCol}>{disc.profile}</h5>
                                    </Col>
                                    <Col lg={3} className={Style.tableRecordyTerciaryCol}>
                                        <p className={Style.primaryInfoTerciaryCol}>Realizado</p> 
                                        <p className={Style.secondaryInfoTerciaryCol}>{dateCreationFmt}</p>
                                    </Col>
                                </Row>
                            )
                        })
                        }
                    </Col>
                </Row>
            </>
        )
    }

    const tableEmployeesProfiles = () => {
        return (
            <>
                <h4 className={Style.titleTable}>Perfis comportamentais de seus colegas</h4>
                <Row className={"g-0"}>
                    <Col lg={7} className={Style.entityTable}>
                        {allRatingsFromOthersEmployees.map((disc: any) => {
                            const dateCreationFmt = format(new Date(disc.creationDate), 'd MMM yyyy');
                            return (
                                <Row className={Style.entityTableRecord}>
                                    <Col lg={3}>
                                        <div data-profile={disc.profile}
                                            className={Style.profileTableRecord}>
                                            <h3>{disc.profile.substring(0, 1)}</h3>
                                        </div>
                                    </Col>
                                    <Col lg={3}>
                                        <h5 className={Style.primaryInfoSecondaryCol}>{disc.profile}</h5>
                                    </Col>
                                    <Col lg={3}><h5>{disc.employee.name}</h5></Col>
                                </Row>
                            )
                        })
                        }
                    </Col>
                </Row>
            </>
        )
    }
    return (
        <>
            {discPresentation()}
            {resultProfile()}
        </>
    );
}
export default DashboardDisc;