import { Header } from "./Header";
import { Feedback } from "./Feedback";
import { useFeedback } from "../hooks/useFeedback";

import { Outlet } from "react-router-dom";

import ToastContainer from "react-bootstrap/ToastContainer";

import { motion, AnimatePresence } from "framer-motion";

export const Page = () => {
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
                <motion.div
                  key={i}
                  drag
                  dragConstraints={{
                    top: 0,
                    left: -50,
                    right: 0,
                    bottom: 50,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: 1,
                    transition: {
                      delay: 0.2,
                    },
                  }}
                  exit={{ opacity: 0 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.5 }}
                  className="my-1"
                >
                  <Feedback
                    title={feedbackItem.title}
                    message={feedbackItem.message}
                    type={feedbackItem.type}
                    toggleVisible={toggleFeedback}
                  />
                </motion.div>
              );
            })}
          </ToastContainer>
        )}
      </AnimatePresence>
    </>
  );
};
