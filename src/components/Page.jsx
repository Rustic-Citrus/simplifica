import PropTypes from "prop-types";
import { Header } from "./Header";
import { Feedback } from "./Feedback";
import { useState } from "react";
import ToastContainer from "react-bootstrap/ToastContainer";

export const Page = ({ MainComponent }) => {
  const [feedbackVisible, setFeedbackVisible] = useState(false);
  const [feedback, setFeedback] = useState([]);

  const setupFeedback = (reportedFeedback) => {
    setFeedback(reportedFeedback);
    setFeedbackVisible(true);
  };

  return (
    <>
      <Header />
      {<MainComponent triggerFeedback={setupFeedback} />}
      <ToastContainer position="top-end" className="m-4">
        {feedbackVisible &&
          feedback.map((feedbackItem, i) => {
            return (
              <Feedback
                key={i}
                title={feedbackItem.title}
                message={feedbackItem.message}
                type={feedbackItem.type}
                toggleVisible={() => setFeedbackVisible(!feedbackVisible)}
              />
            );
          })}
      </ToastContainer>
    </>
  );
};

Page.propTypes = {
  MainComponent: PropTypes.elementType.isRequired,
};
