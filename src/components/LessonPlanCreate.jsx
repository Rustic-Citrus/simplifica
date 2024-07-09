import { useAuth } from "../hooks/useAuth";
import { useFeedback } from "../hooks/useFeedback";
import { useUpdateLessonPlan } from "../hooks/useUpdateLessonPlan";
import LessonPlanService from "../service/LessonPlanService";
import lessonPlanTemplate from "../../data/lessonPlanTemplate.json";
import { Error } from "./Error";

import { useState, useEffect, useRef } from "react";

import PropTypes from "prop-types";

import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Nav from "react-bootstrap/Nav";
import Tab from "react-bootstrap/Tab";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Spinner from "react-bootstrap/Spinner";

import { motion } from "framer-motion";

export const LessonPlanCreate = () => {
  const { triggerFeedback } = useFeedback();
  const { user } = useAuth();
  const { userId } = useParams();
  const navigate = useNavigate();
  const lessonApiRef = useRef(null);
  const [authorised, setAuthorised] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lessonPlan, updateLessonPlan] =
    useUpdateLessonPlan(lessonPlanTemplate);
  const [hasDate, setHasDate] = useState(false);
  const [hasTopic, setHasTopic] = useState(false);

  useEffect(() => {
    if (user) {
      user._id === userId ? setAuthorised(true) : setAuthorised(false);
    }

    if (authorised && !lessonApiRef.current) {
      lessonApiRef.current = new LessonPlanService(
        import.meta.env.VITE_API_ENDPOINT,
        userId
      );
    }
  }, [user, userId, authorised, lessonPlan]);

  const handleClickSave = async (e) => {
    e.preventDefault();

    if (!hasTopic || !hasDate) {
      return triggerFeedback([
        {
          type: "error",
          title: "Error",
          message: "Lesson needs at least a topic and a date.",
        },
      ]);
    }

    try {
      setIsSaving(true);
      await lessonApiRef.current.createLessonPlan(lessonPlan);

      setTimeout(() => {
        navigate(`/${userId}`);
        setIsSaving(false);
      }, 2000);
    } catch (error) {
      console.log(error.message);
    }
  };

  const checkValueIsNotEmpty = (value) => {
    return value.trim() !== "";
  };

  const updateEssentialFields = (field, notEmpty) => {
    switch (field) {
      case "date":
        setHasDate(notEmpty);
        break;
      case "topic":
        setHasTopic(notEmpty);
        break;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split(".");
    const notEmpty = checkValueIsNotEmpty(value);

    if (keys.length === 1) {
      updateEssentialFields(keys[0], notEmpty);
      updateLessonPlan(value, keys[0], null);
    }

    keys.length === 1
      ? updateLessonPlan(value, keys[0], null)
      : updateLessonPlan(value, keys[0], keys[1]);
  };

  const handleAddItem = (e, section, key, inputId) => {
    e.preventDefault();

    const newItem = document.getElementById(inputId).value;
    if (newItem.trim() === "") return;

    updateLessonPlan([...lessonPlan[section][key], newItem], section, key);
    document.getElementById(inputId).value = "";
  };

  const handleRemoveItem = (e, section, key, index) => {
    e.preventDefault();

    const updatedItems = lessonPlan[section][key].filter((_, i) => i !== index);

    updateLessonPlan(updatedItems, section, key);
  };

  return (
    <>
      {authorised ? (
        <>
          <Container fluid>
            <Link to={`/${userId}`}>
              <Button
                variant="outline-secondary"
                className="my-2"
                title="Go back to profile."
                aria-label="back-button"
              >
                <Image src="/simplifica/arrow-left.svg"></Image>
              </Button>
            </Link>
          </Container>

          <motion.div
            initial={{ opacity: 0, x: -100, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              ease: [0, 0.71, 0.2, 1.01],
            }}
          >
            <Card className="mx-3 mx-lg-5">
              <Card.Header>New Lesson Plan</Card.Header>
              <Card.Body>
                <Form>
                  <Card.Title className="mb-3">
                    <Row className="align-items-center">
                      <Col xs={9} sm={10} md={10}>
                        <Form.Group>
                          <Form.Control
                            type="text"
                            placeholder="Lesson Topic"
                            aria-label="topic-input"
                            name="topic"
                            onChange={handleChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col xs={1} sm={2} md={{ span: 1, offset: 1 }}>
                        {isSaving ? (
                          <Spinner animation="border" role="status" size="sm">
                            <span className="visually-hidden">Loading...</span>
                          </Spinner>
                        ) : (
                          <Button
                            variant="outline-success"
                            aria-label="save-button"
                            onClick={handleClickSave}
                          >
                            <Image src="/simplifica/floppy.svg"></Image>
                          </Button>
                        )}
                      </Col>
                    </Row>
                  </Card.Title>
                  <Card.Subtitle className="mb-4 text-muted">
                    <Form.Control
                      type="date"
                      placeholder="Date"
                      name="date"
                      onChange={handleChange}
                    />
                  </Card.Subtitle>
                  <Tab.Container
                    id="phase-tabs"
                    defaultActiveKey="presentation"
                  >
                    <Tab.Content>
                      <Tab.Pane eventKey="presentation">
                        <Form.Group
                          className="mb-3"
                          controlId="lessonObjective"
                        >
                          <Form.Label className="h5">
                            What is the main language point you want to teach?
                          </Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            name="presentation.objective"
                            placeholder="Grammar, vocabulary, functions, etc."
                            onChange={handleChange}
                            aria-label="objective-textarea"
                          />
                        </Form.Group>
                        <Form.Label className="h5">
                          What materials will you need?
                        </Form.Label>
                        {lessonPlan.presentation.materials.length > 0 &&
                          lessonPlan.presentation.materials.map(
                            (material, i) => {
                              return (
                                <InputGroup key={i} className="mb-3">
                                  <Form.Control
                                    type="text"
                                    placeholder={material}
                                    aria-label={`material-${i}`}
                                    disabled
                                    readOnly
                                  />
                                  <Button
                                    variant="outline-danger"
                                    id="removeMaterialButton"
                                    aria-label="remove-material-button"
                                    onClick={(e) =>
                                      handleRemoveItem(
                                        e,
                                        "presentation",
                                        "materials",
                                        i
                                      )
                                    }
                                  >
                                    <Image src="/simplifica/dash-lg.svg" />
                                  </Button>
                                </InputGroup>
                              );
                            }
                          )}
                        <InputGroup className="mb-3">
                          <Form.Control
                            placeholder="Textbooks, audio, video, visual aids, etc."
                            name="presentation.materials"
                            id="materialInput"
                            aria-label="material-input"
                          />
                          <Button
                            variant="outline-success"
                            id="addMaterialButton"
                            aria-label="add-material-button"
                            onClick={(e) =>
                              handleAddItem(
                                e,
                                "presentation",
                                "materials",
                                "materialInput"
                              )
                            }
                          >
                            <Image src="/simplifica/plus.svg" />
                          </Button>
                        </InputGroup>
                        <Form.Group className="mb-3" controlId="connection">
                          <Form.Label className="h5">
                            How will you introduce the topic to make it relevant
                            and engaging for students?
                          </Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            name="presentation.connection"
                            onChange={handleChange}
                            aria-label="connection-textarea"
                            placeholder="I will..."
                          />
                        </Form.Group>
                      </Tab.Pane>
                      <Tab.Pane eventKey="practice">
                        <Form.Group
                          className="mb-3"
                          controlId="realLifeApplication"
                        >
                          <Form.Label className="h5">
                            How is the target language applicable to the
                            students&apos; everyday lives?
                          </Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            onChange={handleChange}
                            name="practice.real_life_application"
                            aria-label="real-life-application-textarea"
                          />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="feedbackMethod">
                          <Form.Label className="h5">
                            What type of feedback will you provide to correct
                            errors and reinforce learning?
                          </Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            onChange={handleChange}
                            name="practice.feedback_method"
                            aria-label="feedback-method-textarea"
                          />
                        </Form.Group>
                        <Form.Label className="h5">
                          What activities will you use to help students practice
                          the target language?
                        </Form.Label>
                        {lessonPlan.practice.activities.length > 0 &&
                          lessonPlan.practice.activities.map((activity, i) => {
                            return (
                              <InputGroup key={i} className="mb-3">
                                <Form.Control
                                  type="text"
                                  placeholder={activity}
                                  aria-label={`practice-activity-${i}`}
                                  disabled
                                  readOnly
                                />
                                <Button
                                  variant="outline-danger"
                                  id="removePracticeActivityButton"
                                  aria-label="remove-practice-activity-button"
                                  onClick={(e) =>
                                    handleRemoveItem(
                                      e,
                                      "practice",
                                      "activities",
                                      i
                                    )
                                  }
                                >
                                  <Image src="/simplifica/dash-lg.svg" />
                                </Button>
                              </InputGroup>
                            );
                          })}
                        <InputGroup className="mb-3">
                          <Form.Control
                            placeholder="Musical chairs, hot potato, word association, etc."
                            name="practice.activities"
                            id="practiceActivityInput"
                            aria-label="practice-activity-input"
                          />
                          <Button
                            variant="outline-success"
                            id="addPracticeActivityButton"
                            aria-label="add-practice-activity-button"
                            onClick={(e) =>
                              handleAddItem(
                                e,
                                "practice",
                                "activities",
                                "practiceActivityInput"
                              )
                            }
                          >
                            <Image src="/simplifica/plus.svg" />
                          </Button>
                        </InputGroup>
                      </Tab.Pane>
                      <Tab.Pane eventKey="production">
                        <Form.Group
                          className="mb-3"
                          controlId="learnerInteraction"
                        >
                          <Form.Label className="h5">
                            How will you facilitate student interaction and
                            collaboration during the production phase?
                          </Form.Label>
                          <Form.Control
                            as="textarea"
                            rows={3}
                            onChange={handleChange}
                            name="production.learner_interaction"
                          />
                        </Form.Group>
                        <Form.Label className="h5">
                          What criteria will you use to evaluate their
                          performance?
                        </Form.Label>
                        {lessonPlan.production.success_criteria.length > 0 &&
                          lessonPlan.production.success_criteria.map(
                            (criterion, i) => {
                              return (
                                <InputGroup key={i} className="mb-3">
                                  <Form.Control
                                    type="text"
                                    placeholder={criterion}
                                    aria-label={`criterion-${i}`}
                                    disabled
                                    readOnly
                                  />
                                  <Button
                                    variant="outline-danger"
                                    id="removeSuccessCriterionButton"
                                    aria-label="remove-success-criterion-button"
                                    onClick={(e) =>
                                      handleRemoveItem(
                                        e,
                                        "production",
                                        "success_criteria",
                                        i
                                      )
                                    }
                                  >
                                    <Image src="/simplifica/dash-lg.svg" />
                                  </Button>
                                </InputGroup>
                              );
                            }
                          )}
                        <InputGroup className="mb-3">
                          <Form.Control
                            placeholder="Ability to use target language without help, etc."
                            name="production.success_criteria"
                            id="successCriteriaInput"
                            aria-label="success-criteria-input"
                          />
                          <Button
                            variant="outline-success"
                            id="addSuccessCriterionButton"
                            aria-label="add-success-criterion-button"
                            onClick={(e) =>
                              handleAddItem(
                                e,
                                "production",
                                "success_criteria",
                                "successCriteriaInput"
                              )
                            }
                          >
                            <Image src="/simplifica/plus.svg" />
                          </Button>
                        </InputGroup>
                        <Form.Label className="h5">
                          What activities will allow students to use the new
                          language more freely and creatively?
                        </Form.Label>
                        {lessonPlan.production.activities.length > 0 &&
                          lessonPlan.production.activities.map(
                            (activity, i) => {
                              return (
                                <InputGroup key={i} className="mb-3">
                                  <Form.Control
                                    type="text"
                                    placeholder={activity}
                                    aria-label={`production-activity-${i}`}
                                    disabled
                                    readOnly
                                  />
                                  <Button
                                    variant="outline-danger"
                                    id="removeProductionActivityButton"
                                    aria-label="remove-production-activity-button"
                                    onClick={(e) =>
                                      handleRemoveItem(
                                        e,
                                        "production",
                                        "activities",
                                        i
                                      )
                                    }
                                  >
                                    <Image src="/simplifica/dash-lg.svg" />
                                  </Button>
                                </InputGroup>
                              );
                            }
                          )}
                        <InputGroup className="mb-3">
                          <Form.Control
                            placeholder="Musical chairs, hot potato, word association, etc."
                            name="production.activities"
                            id="productionActivityInput"
                            aria-label="production-activity-input"
                          />
                          <Button
                            variant="outline-success"
                            id="addProductionActivityButton"
                            aria-label="add-production-activity-button"
                            onClick={(e) =>
                              handleAddItem(
                                e,
                                "production",
                                "activities",
                                "productionActivityInput"
                              )
                            }
                          >
                            <Image src="/simplifica/plus.svg" />
                          </Button>
                        </InputGroup>
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
                </Form>
              </Card.Body>
            </Card>
          </motion.div>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, x: -100, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <Error
            message={
              "You are trying to create a lesson for an account which you are not signed in to. To create a lesson for that account, you must sign in with their details."
            }
          />
        </motion.div>
      )}
    </>
  );
};

LessonPlanCreate.propTypes = {
  triggerFeedback: PropTypes.func,
};
