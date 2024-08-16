import { LessonPlanService } from "../services";
import { useAuth } from "../hooks";
import { fetchLessonPlans } from "../helpers";
import { TransitionDecorator } from "../components/decorators";
import { LessonPlan } from "../interfaces";
import { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Row, Col, Table, Button, Image } from "react-bootstrap";

export const Profile = () => {
  const [lessonPlans, setLessonPlans] = useState([]);
  const lessonApiRef = useRef();
  const { user } = useAuth();
  const { userId } = useParams();

  useEffect(() => {
    if (!lessonApiRef.current) {
      lessonApiRef.current = new LessonPlanService(
        import.meta.env.VITE_API_ENDPOINT,
        userId
      );

      fetchLessonPlans(lessonApiRef, setLessonPlans);
    }
  }, [user, userId]);

  return (
    <Container className="pt-3 px-2 pt-md-5 px-md-4 ms-md-4 align-middle">
      <TransitionDecorator>
        <Row className="mt-lg-3 mx-lg-5 align-items-center">
          <Col xs={8} md={10}>
            <h1 className="display-3" aria-label="title">
              My Lesson Plans
            </h1>
          </Col>
          <Col xs={{ span: 2, offset: 1 }} md={1}>
            <Link to={`/${userId}/create`}>
              <Button variant="outline-success">
                <Image src="/simplifica/plus.svg"></Image>
              </Button>
            </Link>
          </Col>
        </Row>
        <Table striped className="mx-1 mx-lg-5">
          <thead>
            <tr>
              <th>#</th>
              <th>Topic</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {lessonPlans !== undefined &&
              lessonPlans.map((plan: LessonPlan, i) => (
                <tr key={i}>
                  <td>
                    <Link to={`/${userId}/view/${plan._id}`}>{i + 1}</Link>
                  </td>
                  <td>
                    <Link to={`/${userId}/view/${plan._id}`}>{plan.topic}</Link>
                  </td>
                  <td>
                    <Link to={`/${userId}/view/${plan._id}`}>
                      {new Date(plan.date).toLocaleDateString("en-GB")}
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </TransitionDecorator>
    </Container>
  );
};
