import { useState } from "react";

export const useFeedbackHook = () => {
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedback, setFeedback] = useState([]);

  const triggerFeedback = (reportedFeedback) => {
    setFeedback(reportedFeedback);
    setShowFeedback(true);
  };

  const toggleFeedback = () => setShowFeedback(!showFeedback);

  return [feedback, showFeedback, triggerFeedback, toggleFeedback];
};
