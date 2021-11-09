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
    (async () => {
      const cycleResponse = await fetch(`http://localhost:5000/cycles/findCurrentCycles/${loggedUser.company}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const cycleData: any = await cycleResponse.json();
      if (cycleData) {
        setCycles([...cycleData]);
        localStorage.setItem('cycles', JSON.stringify(cycleData));
      }
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
            nextCycleStart:
              cycle.nextCycleStart ? format(new Date(cycle.nextCycleStart), "dd - MMMM - yyyy").replaceAll('-', 'de')
                : null,
          }
        });

      return (
        <div className={Style.informativeColumn}>
          <h4>Avisos</h4>
          <div className={Style.notices}>
            <ul>
              {filteredCycles.map(cycle => {
                return (
                  cycle.nextCycleStart
                    ? <li>
                      <MegaphoneFill className={Style.noticeIcon} />
                      <p>
                        Este ciclo de <span className={Style.markInfo}>{cycle.typeAssessement}&nbsp;</span>
                        encerra em <span className={Style.markInfo}>{cycle.periodEnd}&nbsp;</span>,
                        e o próximo iniciará em <span className={Style.markInfo}>{cycle.nextCycleStart}</span>.
                      </p>
                    </li>
                    : <li>
                      <MegaphoneFill className={Style.noticeIcon} />
                      <p>
                        Este ciclo de <span className={Style.markInfo}>{cycle.typeAssessement}&nbsp;</span>
                        encerra em <span className={Style.markInfo}>{cycle.periodEnd}&nbsp;</span>,
                        para continuar as avaliações crie outro ciclo, após o fim da linha de tempo corrente.
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
            <RecordAssessment assessments={assessments} loggedUserId={loggedUser.id} />
            <div hidden={!(assessments.filter((assessment: any) => ["Pendente", "Rascunho"]
              .includes(assessment.status) && assessment.evaluator.id === loggedUser.id).length === 0)} className={Style.informNotData}>
              <MegaphoneFill className={Style.noticeIcon} />
              <p>Até o momento não existe nem uma avaliação vinculada a esta empresa ou ao seu usúario.</p>
            </div>
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
              <h6 className={Style.profileNotice}>Este é o seu perfil atual!</h6>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}