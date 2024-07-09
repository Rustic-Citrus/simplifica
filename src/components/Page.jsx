import { Header } from "./Header";
import { Feedback } from "./Feedback";
import { useFeedback } from "../hooks/useFeedback";

import { Outlet } from "react-router-dom";

import ToastContainer from "react-bootstrap/ToastContainer";

export const Page = () => {
  const { feedback, showFeedback, toggleFeedback } = useFeedback();

  return (
    <>
      <Header />
      <Outlet />
      <ToastContainer position="top-end" className="m-4">
        {showFeedback &&
          feedback.map((feedbackItem, i) => {
            return (
              <Feedback
                key={i}
                title={feedbackItem.title}
                message={feedbackItem.message}
                type={feedbackItem.type}
                toggleVisible={toggleFeedback}
              />
            );
          })}
      </ToastContainer>
    </>
  );
};
