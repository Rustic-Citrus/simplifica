import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Tab from "react-bootstrap/Tab";
import Card from "react-bootstrap/Card";
// import PropTypes from "prop-types";
import data from "../../data/user.json";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export const LessonPlanView = () => {
  const lessonPlan = data[0].lesson_plans[0];
  const { userId, lessonId } = useParams();

  return (
    <>
      <Row>
        <Col xs={2}>
          <Link to={`/simplifica-frontend/${userId}`}>
            <Button
              variant="outline-secondary"
              className="mx-5 my-2"
              title="Go back to profile."
              aria-label="back-button"
            >
              <Image src="/arrow-left.svg"></Image>
            </Button>
          </Link>
        </Col>
      </Row>

      <Card className="mx-5">
        <Card.Header>Lesson Plan</Card.Header>
        <Card.Body>
          <Card.Title>
            <Row>
              <Col xs={6} sm={8} md={10}>
                <h1 className="display-6">{lessonPlan.topic}</h1>
              </Col>
              <Col xs={3} sm={2} md={1}>
                <Button variant="outline-secondary">
                  <Image src="/pencil.svg"></Image>
                </Button>
              </Col>
              <Col xs={3} sm={2} md={1}>
                <Button variant="outline-danger">
                  <Image src="/trash.svg"></Image>
                </Button>
              </Col>
            </Row>
          </Card.Title>
          <Card.Subtitle className="mb-4 text-muted">
            {lessonPlan.date}
          </Card.Subtitle>
          <Tab.Container id="phase-tabs" defaultActiveKey="presentation">
            <Tab.Content>
              <Tab.Pane eventKey="presentation">
                <Card.Text className="h5">
                  What is the main language point (grammar, vocabulary,
                  function) you want to teach?
                </Card.Text>
                <Card.Text>{lessonPlan.presentation.objective}</Card.Text>
                <Card.Text className="h5">
                  What materials (textbook, audio, video, visual aids) will you
                  need?
                </Card.Text>
                <ul>
                  {lessonPlan.presentation.materials.map((material, i) => {
                    return <li key={i}>{material}</li>;
                  })}
                </ul>
                <Card.Text className="h5">
                  How will you introduce the topic to make it relevant and
                  engaging for students?
                </Card.Text>
                <Card.Text>{lessonPlan.presentation.connection}</Card.Text>
              </Tab.Pane>
              <Tab.Pane eventKey="practice">
                <Card.Text className="h5">
                  How is the target language applicable to the students&apos;
                  everyday lives?
                </Card.Text>
                <Card.Text>
                  {lessonPlan.practice.real_life_application}
                </Card.Text>
                <Card.Text className="h5">
                  What type of feedback will you provide to correct errors and
                  reinforce learning?
                </Card.Text>
                <Card.Text>{lessonPlan.practice.feedback_method}</Card.Text>
                <Card.Text className="h5">
                  What activities will you use to help students practice the new
                  language in a controlled way?
                </Card.Text>
                <ul>
                  {lessonPlan.practice.activities.map((activity, i) => {
                    return <li key={i}>{activity}</li>;
                  })}
                </ul>
              </Tab.Pane>
              <Tab.Pane eventKey="production">
                <Card.Text className="h5">
                  How will you facilitate student interaction and collaboration
                  during the production phase?
                </Card.Text>
                <Card.Text>
                  {lessonPlan.production.learner_interaction}
                </Card.Text>
                <Card.Text className="h5">
                  What criteria will you use to evaluate their performance?
                </Card.Text>
                <ul className="list-group-flush">
                  {lessonPlan.production.success_criteria.map(
                    (criterion, i) => {
                      return <li key={i}>{criterion}</li>;
                    }
                  )}
                </ul>
                <Card.Text className="h5">
                  What activities will allow students to use the new language
                  more freely and creatively?
                </Card.Text>
                <ul className="list-group-flush">
                  {lessonPlan.production.activities.map((activity, i) => {
                    return <li key={i}>{activity}</li>;
                  })}
                </ul>
              </Tab.Pane>
            </Tab.Content>

            <Nav variant="pills" className="flex-row mt-3">
              <Nav.Item>
                <Nav.Link eventKey="presentation" title="See the presentation phase.">Presentation</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="practice" title="See the practice phase."variant="outline-dark">
                  Practice
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="production" title="See the production phase.">Production</Nav.Link>
              </Nav.Item>
            </Nav>
          </Tab.Container>
        </Card.Body>
      </Card>
    </>
  );
};

// LessonPlan.propTypes = {
//   topic: PropTypes.string,
//   date: PropTypes.date,
//   lessonObjective: PropTypes.string,
//   materials: PropTypes.array,
// };
