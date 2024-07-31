import { FeedbackComponent, Header } from "../components";
import { useFeedback } from "../hooks/useFeedback";
import { Outlet } from "react-router-dom";
import ToastContainer from "react-bootstrap/ToastContainer";
import { AnimatePresence } from "framer-motion";

export const PageTemplate = () => {
  const { feedback, showFeedback, toggleFeedback } = useFeedback();

  return (
    <>
      <Header />
      <AnimatePresence>
        <Outlet />
      </AnimatePresence>
      <AnimatePresence>
        {showFeedback && (
          <ToastContainer
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              marginRight: "1rem",
              marginTop: "1rem",
              maxWidth: "90%",
            }}
          >
            {feedback.map((feedbackItem, i) => {
              return (
                <FeedbackComponent
                  key={i}
                  title={feedbackItem.title}
                  message={feedbackItem.message}
                  type={feedbackItem.type}
                  toggleVisible={toggleFeedback}
                />
              );
            })}
          </ToastContainer>
        )}
      </AnimatePresence>
    </>
  );
};
