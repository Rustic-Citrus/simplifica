import { useState } from "react";
import { LessonPlan } from "../interfaces";

export const useUpdateLessonPlan = (initialLessonPlan: LessonPlan) => {
  const [lessonPlan, setLessonPlan] = useState(initialLessonPlan);

  const updateLessonPlan = (update: LessonPlan | string, section = "", key = "") => {
    if (typeof update !== "string" && section === "" && key === "") {
      setLessonPlan(update);
    } else if (typeof update === "string") {
      setLessonPlan((prevState) => ({
        ...prevState,
        [section]:
          key !== ""
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
