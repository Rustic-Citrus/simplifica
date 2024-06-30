/*
TODO Implement an Error component when a user whose _id does not match the userId from the route parameters tries to access the Profile page.
*/

import LessonPlanAPI from "../api/LessonPlanAPI";
import { useAuth } from "../hooks/useAuth";

import { useEffect, useState, useRef } from "react";

import { Link, useParams } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

export const Profile = () => {
  const [lessonPlans, setLessonPlans] = useState([]);
  const [authorised, setAuthorised] = useState(false);
  const lessonApiRef = useRef();
  const { user } = useAuth();
  const { userId } = useParams();
  
  useEffect(() => {
    if (user._id === userId) {
      setAuthorised(true);

      if (!lessonApiRef.current) {
        lessonApiRef.current = new LessonPlanAPI(
          import.meta.env.VITE_API_ENDPOINT,
          userId
        );

        fetchLessonPlans();
      }
    }
  }, [authorised, user, userId]);

  const fetchLessonPlans = async () => {
    try {
      const response = await lessonApiRef.current.getLessonPlans();

      setLessonPlans(response.data.lessonPlans);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Container className="pt-5 mt-5 mx-5 px-4 align-middle">
      <Row className="mb-3 mt-5 mx-5 pt-5 align-items-center">
        <Col xs={8} md={10}>
          <h1 className="display-3" aria-label="title">
            My Lesson Plans
          </h1>
        </Col>
        <Col xs={{ span: 2, offset: 1 }} md={1}>
          <Link to={`/simplifica-frontend/${userId}/create`}>
            <Button variant="outline-success">
              <Image src="/simplifica-frontend/plus.svg"></Image>
            </Button>
          </Link>
        </Col>
      </Row>
      <Table striped className="mx-5">
        <thead>
          <tr>
            <th>#</th>
            <th>Topic</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {lessonPlans !== undefined &&
            lessonPlans.map((plan, i) => {
              return (
                <tr key={i}>
                  <td>
                    <Link to={`/simplifica-frontend/${userId}/${plan._id}`}>{i + 1}</Link>
                  </td>
                  <td>
                    <Link to={`/simplifica-frontend/${userId}/${plan._id}`}>{plan.topic}</Link>
                  </td>
                  <td>
                    <Link to={`/simplifica-frontend/${userId}/${plan._id}`}>{new Date(plan.date).toLocaleDateString("en-GB")}</Link>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </Container>
  );
};
