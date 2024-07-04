import LessonPlanService from "../service/LessonPlanService";
import { useAuth } from "../hooks/useAuth";
import { fetchLessonPlans } from "../helper/fetchHelper";
import { Error } from "./Error";

import { useEffect, useState, useRef } from "react";

import { Link, useParams } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

import { motion } from "framer-motion";

export const Profile = () => {
  const [lessonPlans, setLessonPlans] = useState([]);
  const [authorised, setAuthorised] = useState(false);
  const lessonApiRef = useRef();
  const { user } = useAuth();
  const { userId } = useParams();

  useEffect(() => {
    if (user) {
      user._id === userId ? setAuthorised(true) : setAuthorised(false);
    }

    if (authorised && !lessonApiRef.current) {
      lessonApiRef.current = new LessonPlanService(
        import.meta.env.VITE_API_ENDPOINT,
        userId
      );

      fetchLessonPlans(lessonApiRef, setLessonPlans);
    }
  }, [authorised, user, userId]);

  return (
    <>
      {authorised ? (
        <motion.div
          initial={{ opacity: 0, x: -100, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <Container className="pt-5 mt-3 mt-lg-5 mx-lg-5 px-4 align-middle">
            <Row className="mb-3 mx-2 mt-3 mt-lg-5 mx-lg-5 pt-5 align-items-center">
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
                  lessonPlans.map((plan, i) => {
                    return (
                      <tr key={i}>
                        <td>
                          <Link
                            to={`/simplifica-frontend/${userId}/view/${plan._id}`}
                          >
                            {i + 1}
                          </Link>
                        </td>
                        <td>
                          <Link
                            to={`/simplifica-frontend/${userId}/view/${plan._id}`}
                          >
                            {plan.topic}
                          </Link>
                        </td>
                        <td>
                          <Link
                            to={`/simplifica-frontend/${userId}/view/${plan._id}`}
                          >
                            {new Date(plan.date).toLocaleDateString("en-GB")}
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </Table>
          </Container>
        </motion.div>
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
              "You are trying to access someone else's profile. To access their profile, you must be signed in with their account."
            }
          />
        </motion.div>
      )}
    </>
  );
};
