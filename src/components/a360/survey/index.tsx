import { Slider } from '@material-ui/core';
import Ask from './ask';
import Style from './survey.module.scss'
import Data360 from '../../../assets/360.json'
import { useEffect, useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';

type Props = {
  uuid: string;
}
const Survey = ({ uuid }: Props) => {
  const options = [
    "Nunca",
    "Algumas vezes",
    "Sempre"
  ];

  const marks = [
    { value: 0, label: "Não atende" },
    { value: 1, label: "Abaixo" },
    { value: 2, label: "Atende Plenamente" },
    { value: 3, label: "Supera" },
  ]
  const [askings, setAskings] = useState<any>({});
  const [sliders, setSliders] = useState<number[]>([]);
  const [feedback1, setFeedback1] = useState<string>();
  const [feedback2, setFeedback2] = useState<string>();

  const [assessement, setAssessement] = useState<any>({});

  useEffect(() => {
    (async () => {
      const response = await fetch(`http://localhost:5000/assessements/${uuid}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      setAssessement(await response.json());

      const response2 = await fetch(`http://localhost:5000/questions/byAssessement/${uuid}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const resp = await response2.json();
      const questions: any = {};
      resp.map((q: any) => {
        questions[q.questionId] = q;
      });

      setAskings(questions);

      setFeedback1(questions["a360-feedback-1"]?.answer);
      setFeedback2(questions["a360-feedback-2"]?.answer);

      setSliders([
        questions["a360-expectation-1"].answer,
        questions["a360-expectation-2"].answer,
        questions["a360-expectation-3"].answer,
        questions["a360-expectation-4"].answer
      ].map(value => marks.findIndex(mark => mark.label === value)));
      localStorage.setItem(uuid, JSON.stringify(questions));
    })()
  }, []);

  const save = async () => {
    const data: any = JSON.parse(localStorage.getItem(uuid) || '{}');
    data["a360-feedback-1"].answer = feedback1;
    data["a360-feedback-2"].answer = feedback2;

    Object.values(data).map(async (question: any) => {
      const resp = await fetch(`http://localhost:5000/questions/${question.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answer: question.answer,
        })
      });
    });
    const response = await fetch(`http://localhost:5000/assessements/${uuid}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: "Rascunho",
      })
    });
    response.ok
      ? alert("A avaliação foi salva com sucesso!")
      : alert("Houve um problema ao realizar o salvamento!");
  }

  const send = async () => {
    const data: any = JSON.parse(localStorage.getItem(uuid) || '{}');
    Object.values(data).map(async (question: any) => {
      await fetch(`http://localhost:5000/questions/${question.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          answer: question.answer,
        })
      });
    });
    const response = await fetch(`http://localhost:5000/assessements/${uuid}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: "Enviado",
        concludedDate: new Date(),
      })
    });
    response.ok
      ? alert("A avaliação foi enviada com sucesso!")
      : alert("Houve um problema ao realizar o envio!");
  }

  const handleUpdateData = (event: any, newValue: any, questionId: any) => {
    const data: any = JSON.parse(localStorage.getItem(uuid) || '{}');
    data[questionId].answer = marks[newValue].label;
    localStorage.setItem(uuid, JSON.stringify(data));
  }

  return (
    <form className={Style.survey}>
      <h2>Responsabilidades</h2>
      <section className={Style.section}>
        <ol>
          <li>
            <Ask
              key={uuid}
              checked={askings["a360-responsability-1"]?.answer}
              category={askings["a360-responsability-1"]?.category}
              title={askings["a360-responsability-1"]?.ask}
              options={options}
              questionId={"a360-responsability-1"}
              uuidAssessement={uuid}
              status={assessement.status}
            />
          </li>
          <li>
            <Ask
              key={uuid}
              checked={askings["a360-responsability-2"]?.answer}
              category={askings["a360-responsability-2"]?.category}
              title={askings["a360-responsability-2"]?.ask}
              options={options}
              questionId={"a360-responsability-2"}
              uuidAssessement={uuid}
              status={assessement.status}
            />
          </li>
        </ol>
      </section>
      <h2>Comunicação</h2>
      <section className={Style.section}>
        <ol>
          <li>
            <Ask
              key={uuid}
              checked={askings["a360-comunication-1"]?.answer}
              category={askings["a360-comunication-1"]?.category}
              title={askings["a360-comunication-1"]?.ask}
              options={options}
              questionId={"a360-comunication-1"}
              uuidAssessement={uuid}
              status={assessement.status}
            />
          </li>
          <li>
            <Ask
              key={uuid}
              checked={askings["a360-comunication-2"]?.answer}
              category={askings["a360-comunication-2"]?.category}
              title={askings["a360-comunication-2"]?.ask}
              options={options}
              questionId={"a360-comunication-2"}
              uuidAssessement={uuid}
              status={assessement.status}
            />
          </li>
        </ol>
      </section>
      <h2>Trabalho em equipe</h2>
      <section className={Style.section}>
        <ol>
          <li>
            <Ask
              key={uuid}
              checked={askings["a360-teamwork-1"]?.answer}
              category={askings["a360-teamwork-1"]?.category}
              title={askings["a360-teamwork-1"]?.ask}
              options={options}
              questionId={"a360-teamwork-1"}
              uuidAssessement={uuid}
              status={assessement.status}
            />
          </li>
          <li>
            <Ask
              key={uuid}
              checked={askings["a360-teamwork-2"]?.answer}
              category={askings["a360-teamwork-2"]?.category}
              title={askings["a360-teamwork-2"]?.ask}
              options={options}
              questionId={"a360-teamwork-2"}
              uuidAssessement={uuid}
              status={assessement.status}
            />
          </li>
        </ol>
      </section>
      <h2>Feedback individual</h2>
      <section className={Style.section}>
        <ol>
          <li>
            <div className={Style.utterance}>
              <p>Como posso melhorar ainda mais?</p>
              <textarea
                disabled={"Concluído" === assessement.status}
                value={feedback1}
                onChange={(e) => setFeedback1(e.target.value)}
              >
              </textarea>
            </div>
          </li>
          <li>
            <div className={Style.utterance}>
              <p>O que eu realizei com excelência/destaque?</p>
              <textarea
                disabled={"Concluído" === assessement.status}
                value={feedback2}
                onChange={(e) => setFeedback2(e.target.value)}>
              </textarea>
            </div>
          </li>
        </ol>
      </section>
      <h2>Expectativas</h2>
      <section className={Style.section}>
        <div className={Style.essentialSlider}>
          <p>O colaborador está alinhado aos pilares da organização?</p>
          <label className="teste">Integridade</label>
          <p className={Style.askUtterance}>
            Integridade é uma conduta que se caracteriza por uma convergência entre palavras e ações.
            Uma pessoa íntegra tem uma conduta reta, ela faz o que ela fala,
            o que ela pensa, sempre galgada pela ética e pela honestidade.
          </p>
          <div className={Style.sliderSection}>
            <Col lg={8}>
              <Slider
                defaultValue={3}
                valueLabelDisplay="auto"
                value={sliders[0] || 3}
                disabled={"Concluído" === assessement.status}
                onChange={(event, newValue) => handleUpdateData(event, newValue, "a360-expectation-1")}
                marks={marks}
                step={1}
                min={0}
                max={3}>
              </Slider>
            </Col>
          </div>
        </div>
        <div className={Style.essentialSlider}>
          <label className="teste">Colaboração</label>
          <p className={Style.askUtterance}>
            A colaboração permite que os membros da equipe se juntem
            em uma plataforma comum e trabalhem em busca de um objetivo comum, 
            pensando, tendo novas ideias e oferecendo várias perspectivas para 
            fornecer soluções.
          </p>
          <div className={Style.sliderSection}>
            <Col lg={8}>
              <Slider
                defaultValue={3}
                value={sliders[1] || 3}
                valueLabelDisplay="auto"
                disabled={"Concluído" === assessement.status}
                onChange={(event, newValue) => handleUpdateData(event, newValue, "a360-expectation-2")}
                marks={marks}
                step={1}
                min={0}
                max={3}>
              </Slider>
            </Col>
          </div>
        </div>
        <div className={Style.essentialSlider}>
          <label className="teste">Transparência</label>
          <p className={Style.askUtterance}>
            Refere-se à nossa necessidade de entender o que está acontecendo
            e prever o que acontecerá no futuro.
            O compartilhamento aberto e transparente de informações, por sua vez,
            é fundamental para a criação de certezas.
          </p>
          <div className={Style.sliderSection}>
            <Col lg={8}>
              <Slider
                defaultValue={3}
                value={sliders[2] || 3}
                valueLabelDisplay="auto"
                disabled={"Concluído" === assessement.status}
                onChange={(event, newValue) => handleUpdateData(event, newValue, "a360-expectation-3")}
                marks={marks}
                step={1}
                min={0}
                max={3}>
              </Slider>
            </Col>
          </div>
        </div>
        <div className={Style.essentialSlider}>
          <label className="teste">Organização</label>
          <p className={Style.askUtterance}>
            A organização pessoal é uma competência imprescindível
            para o gerenciamento eficaz do tempo e para a produtividade
            e qualidade no ambiente de trabalho.
          </p>
          <div className={Style.sliderSection}>
            <Col lg={8}>
              <Slider
                defaultValue={3}
                valueLabelDisplay="auto"
                value={sliders[3] || 3}
                disabled={"Concluído" === assessement.status}
                onChange={(event, newValue) => handleUpdateData(event, newValue, "a360-expectation-4")}
                marks={marks}
                step={1}
                min={0}
                max={3}>
              </Slider>
            </Col>
          </div>
        </div>
      </section>
      <Row>
        <Col>
          <button hidden={assessement.status == "Concluído"} className={Style.btnPrimary} type="button" onClick={save}>Salvar</button>
        </Col>
        <Col>
          <button hidden={assessement.status == "Concluído"} className={Style.btnPrimary} type="button" onClick={send}>Enviar</button>
        </Col>
      </Row>
    </form >
  )
}
export default Survey;