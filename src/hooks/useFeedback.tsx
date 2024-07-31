import { useFeedbackHook } from "./useFeedbackHook";
import { createContext, useMemo, useContext } from "react";

const FeedbackContext = createContext();

export const FeedbackProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [feedback, showFeedback, triggerFeedback, toggleFeedback] =
    useFeedbackHook();

  const value = useMemo(
    () => ({
      feedback,
      showFeedback,
      triggerFeedback,
      toggleFeedback,
    }),
    [feedback, showFeedback, triggerFeedback, toggleFeedback]
  );

  return (
    <FeedbackContext.Provider value={value}>
      {children}
    </FeedbackContext.Provider>
  );
};

export const useFeedback = () => {
  return useContext(FeedbackContext);
};
