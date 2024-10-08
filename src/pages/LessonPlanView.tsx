import lessonPlanTemplate from "../../data/lessonPlanTemplate";
import { LessonPlanService } from "../services";
import { fetchOneLessonPlan } from "../helpers";
import { useAuth } from "../hooks";
import { ConfirmDeleteModal } from "../components";
import { TransitionDecorator } from "../components/decorators";
import { useEffect, useRef, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Col,
  Row,
  Image,
  Button,
  Nav,
  Tab,
  Card,
  Spinner,
} from "react-bootstrap";

export const LessonPlanView = () => {
  const [lessonPlan, setLessonPlan] = useState(lessonPlanTemplate);
  const [authorised, setAuthorised] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { userId, lessonId } = useParams();
  const lessonApiRef = useRef(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?._id) {
      user._id === userId ? setAuthorised(true) : setAuthorised(false);
    }
    user && user._id === userId ? setAuthorised(true) : setAuthorised(false);

    if (authorised && !lessonApiRef.current) {
      lessonApiRef.current = new LessonPlanService(
        import.meta.env.VITE_API_ENDPOINT,
        userId
      );

      fetchOneLessonPlan(lessonApiRef, lessonId, setLessonPlan);

      setIsLoading(false);
    }
  }, [user, userId, lessonApiRef, lessonId, authorised]);

  const handleEditClick = async () => {
    navigate(`/${userId}/edit/${lessonId}`);
  };

  const handleDeleteConfirmed = async () => {
    try {
      setIsDeleting(true);

      const response = await lessonApiRef.current.deleteLessonPlan(lessonId);

      if (response.status < 300) {
        setTimeout(() => {
          navigate(`/${userId}`);
          setIsDeleting(false);
        }, 2000);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleClickDelete = async (e) => {
    e.preventDefault();

    setShowDeleteModal(true);
  };

  return (
    <Container fluid>
      <ConfirmDeleteModal
        show={showDeleteModal}
        toggleShow={() => setShowDeleteModal(false)}
        handleDeleteConfirmed={handleDeleteConfirmed}
      />
      {!isLoading && (
        <>
          <Link to={`/${userId}`} className="m-3">
            <Button
              variant="outline-secondary"
              className="my-2"
              title="Go back to profile."
              aria-label="back-button"
            >
              <Image src="/simplifica/arrow-left.svg" />
            </Button>
          </Link>
          <TransitionDecorator>
            <Card className="mx-3 mx-lg-5 mb-2">
              <Card.Header aria-label="success-title">Lesson Plan</Card.Header>
              <Card.Body>
                <Card.Title>
                  <Row className="align-items-center">
                    <Col xs={8} sm={8} md={10}>
                      <h1 className="display-6" aria-label="topic">
                        {lessonPlan.topic}
                      </h1>
                    </Col>
                    <Col xs={2} sm={2} md={1}>
                      <Button
                        variant="outline-secondary"
                        onClick={handleEditClick}
                        aria-label="edit-button"
                      >
                        <Image src="/simplifica/pencil.svg" />
                      </Button>
                    </Col>
                    <Col
                      xs={2}
                      sm={2}
                      md={1}
                      className="d-flex justify-content center align-items-center"
                    >
                      {isDeleting ? (
                        <Spinner animation="border" role="status" size="sm">
                          <span className="visually-hidden">Loading...</span>
                        </Spinner>
                      ) : (
                        <Button
                          variant="outline-danger"
                          onClick={handleClickDelete}
                          aria-label="delete-button"
                        >
                          <Image src="/simplifica/trash.svg" />
                        </Button>
                      )}
                    </Col>
                  </Row>
                </Card.Title>
                <Card.Subtitle
                  className="mb-4 text-muted"
                  aria-label="lesson-date"
                >
                  {new Date(lessonPlan.date).toLocaleDateString("en-GB")}
                </Card.Subtitle>
                <Tab.Container id="phase-tabs" defaultActiveKey="presentation">
                  <Tab.Content>
                    <Tab.Pane eventKey="presentation">
                      <Card.Text
                        className="h6"
                        aria-label="lesson-objective-question"
                      >
                        What is the main language point (grammar, vocabulary,
                        function) you want to teach?
                      </Card.Text>
                      <Card.Text aria-label="lesson-objective-answer">
                        {lessonPlan.presentation.objective}
                      </Card.Text>
                      <Card.Text className="h6">
                        What materials (textbook, audio, video, visual aids)
                        will you need?
                      </Card.Text>
                      <ul>
                        {lessonPlan.presentation.materials.map(
                          (material, i) => {
                            return <li key={i}>{material}</li>;
                          }
                        )}
                      </ul>
                      <Card.Text className="h6">
                        How will you introduce the topic to make it relevant and
                        engaging for students?
                      </Card.Text>
                      <Card.Text>
                        {lessonPlan.presentation.connection}
                      </Card.Text>
                    </Tab.Pane>
                    <Tab.Pane eventKey="practice">
                      <Card.Text className="h6">
                        How is the target language applicable to the
                        students&apos; everyday lives?
                      </Card.Text>
                      <Card.Text>
                        {lessonPlan.practice.real_life_application}
                      </Card.Text>
                      <Card.Text className="h6">
                        What type of feedback will you provide to correct errors
                        and reinforce learning?
                      </Card.Text>
                      <Card.Text>
                        {lessonPlan.practice.feedback_method}
                      </Card.Text>
                      <Card.Text className="h6">
                        What activities will you use to help students practice
                        the new language in a controlled way?
                      </Card.Text>
                      <ul>
                        {lessonPlan.practice.activities.map((activity, i) => {
                          return <li key={i}>{activity}</li>;
                        })}
                      </ul>
                    </Tab.Pane>
                    <Tab.Pane eventKey="production">
                      <Card.Text className="h6">
                        How will you facilitate student interaction and
                        collaboration during the production phase?
                      </Card.Text>
                      <Card.Text>
                        {lessonPlan.production.learner_interaction}
                      </Card.Text>
                      <Card.Text className="h6">
                        What criteria will you use to evaluate their
                        performance?
                      </Card.Text>
                      <ul className="list-group-flush">
                        {lessonPlan.production.success_criteria.map(
                          (criterion, i) => {
                            return <li key={i}>{criterion}</li>;
                          }
                        )}
                      </ul>
                      <Card.Text className="h6">
                        What activities will allow students to use the new
                        language more freely and creatively?
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
                      <Nav.Link
                        eventKey="presentation"
                        title="See the presentation phase."
                      >
                        Presentation
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="practice"
                        title="See the practice phase."
                        variant="outline-dark"
                      >
                        Practice
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link
                        eventKey="production"
                        title="See the production phase."
                      >
                        Production
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Tab.Container>
              </Card.Body>
            </Card>
          </TransitionDecorator>
        </>
      )}
    </Container>
  );
};
