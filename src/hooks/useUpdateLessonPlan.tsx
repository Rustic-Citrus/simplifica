import { useState } from "react";

export const useUpdateLessonPlan = (initialLessonPlan) => {
  const [lessonPlan, setLessonPlan] = useState(initialLessonPlan);

  const updateLessonPlan = (update, section = null, key = null) => {
    if (section === null && key === null) {
      setLessonPlan(update);
    } else {
      setLessonPlan((prevState) => ({
        ...prevState,
        [section]:
          key !== null
            ? {
                ...prevState[section],
                [key]: update,
              }
            : update,
      }));
    }
  };

  return [lessonPlan, updateLessonPlan];
};
