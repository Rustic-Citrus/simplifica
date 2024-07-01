import { useState } from "react";

export const useUpdateLessonPlan = (initialLessonPlan) => {
  const [lessonPlan, setLessonPlan] = useState(initialLessonPlan);

  const updateLessonPlan = (section, key, update) => {
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
  };

  return [lessonPlan, updateLessonPlan];
};
