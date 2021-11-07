import { format, intervalToDuration } from 'date-fns';
import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { MegaphoneFill, PersonCircle } from 'react-bootstrap-icons';
import Style from './home.page.module.scss'
import RecordAssessment from './recordAssessments/recordAssessment';
import RecordGoals from './recordGoals/recordGoals';

export const HomePage = () => {
  const loggedUser = JSON.parse(localStorage.getItem("loggedUser") || '{}');
  const [cycles, setCycles] = useState<any[]>([]);
  const [assessments, setAssessments] = useState<any[]>([]);
  const [goals, setGoals] = useState<any[]>([]);

  const [latestRatingDisc, setLatestRatingDisc] = useState<any>({ profile: "nenhum" });

  useEffect(() => {
    console.log("loggeduser",loggedUser);
    (async () => {
      const responseCompany = await fetch(`http://localhost:5000/companies/${loggedUser.company}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const companyData: any = await responseCompany.json();
      console.log("if", companyData);
      if (companyData.cycle) {
        setCycles([...companyData.cycle]);
      }
    })();
    (async () => {
      const discProfileResponse = await fetch(`http://localhost:5000/disc/employeeId/${loggedUser.id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const discData: any = await discProfileResponse.json();
      if (discData.length > 0) {
        setLatestRatingDisc(await discData[0]);
      }
    })();
    (async () => {
      const assessmentResponse = await fetch(`http://localhost:5000/assessements/byEvaluator/${loggedUser.id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const respo = await assessmentResponse.json();
      setAssessments([...respo]);
    })();
    (async () => {
      const goalResponse = await fetch(`http://localhost:5000/goals/employee/${loggedUser.id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const goalData: any = await goalResponse.json();
      setGoals([...goalData]);
    })();
  }, []);

  const presentCycle = () => {
    if (cycles && cycles.length > 0) {
      let dict: any = { "APPO": "Objetivos", "AF360": "Desempenho", "DISC": "Comportamental" };
      let filteredCycles = cycles
        .filter((cycle) => cycle.status == "inprogress")
        .map(cycle => {
          return {
            typeAssessement: dict[cycle.typeAssessment],
            periodEnd: format(new Date(cycle.periodEnd), "dd - MMMM - yyyy").replaceAll('-', 'de'),
            pediodStart: format(new Date(cycle.periodEnd), "dd - MMMM - yyyy").replaceAll('-', 'de'),
          }
        });

      return (
        <div className={Style.informativeColumn}>
          <h4>Avisos</h4>
          <div className={Style.notices}>
            <ul>
              {filteredCycles.map(c => {
                return (
                  <li>
                    <MegaphoneFill className={Style.noticeIcon} />
                    <p>
                      Este ciclo de <span className={Style.markInfo}>{c.typeAssessement}&nbsp;</span>
                      encerra em <span className={Style.markInfo}>{c.periodEnd}&nbsp;</span>,
                      e o próximo iniciará em <span className={Style.markInfo}>{c.pediodStart}</span>.
                    </p>
                  </li>
                )
              })}
            </ul>
          </div>
        </div >
      )
    }
  }

  const textNotCycle = () => {
    console.log("ciclos",cycles);
    if (!cycles || cycles?.length <= 0) {
      return (
        <div className={Style.informativeColumn}>
          <h4>Avisos</h4>
          <div className={Style.notices}>
            <ul>
              <li>
                <MegaphoneFill className={Style.noticeIcon} />
                <p>Até o momento não existe nem um ciclo configurado,
                  portanto não é possível realizar algumas acões.</p>
              </li>
            </ul>
          </div>
        </div >
      )
    }
  }

  return (
    <Container className={Style.page}>
      <Row className={Style.division}>
        <Col lg={7} className={Style.contentColumn}>
          {textNotCycle()}
          {presentCycle()}
          <div className={Style.informativeColumn}>
            <h4>Objetivos pendentes</h4>
            <div hidden={goals.length >= 1} className={Style.informNotData}>
              <MegaphoneFill className={Style.noticeIcon} />
              <p>Até o momento não existe nem um objetivo vinculado a esta empresa ou ao seu usúario.</p>
            </div>
            <RecordGoals goals={goals} />
          </div>
          <div className={Style.informativeColumn}>
            <h4>Avaliações pendentes</h4>
            <div hidden={assessments.length >= 1} className={Style.informNotData}>
              <MegaphoneFill className={Style.noticeIcon} />
              <p>Até o momento não existe nem uma avaliação vinculada a esta empresa ou ao seu usúario.</p>
            </div>
            <RecordAssessment assessments={assessments} loggedUserId={loggedUser.id} />
          </div>
        </Col>
        <Col lg={5} className={Style.contentColumn}>
          <div className={Style.discSection}>
            <div data-profile={latestRatingDisc.profile} className={Style.profile}>
              <div data-profile={latestRatingDisc.profile} className={Style.profileTitle}>
                <h2>{latestRatingDisc.profile.substring(0, 1)}</h2>
              </div>
              <div data-profile={latestRatingDisc.profile} className={Style.profileDetails}>
                <h4>{latestRatingDisc.profile}</h4>
              </div>
            </div>
            <div>
              <h6>Este é o seu perfil atual!</h6>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}