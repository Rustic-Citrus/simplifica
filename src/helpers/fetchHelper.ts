import React from "react";

export const fetchLessonPlans = async (
  lessonApiRef: React.MutableRefObject<any>,
  setLessonPlans: React.Dispatch<React.SetStateAction<any>>
): Promise<void> => {
  try {
    const response = await lessonApiRef.current.getLessonPlans();
    setLessonPlans(response.data.lessonPlans);
  } catch (error: any) {
    console.log(error.message);
  }
};

export const fetchOneLessonPlan = async (
  lessonApiRef: React.MutableRefObject<any>,
  lessonId: string,
  setLessonPlan: React.Dispatch<any>
): Promise<void> => {
  try {
    const response = await lessonApiRef.current.getOneLessonPlan(lessonId);
    setLessonPlan(response.data.lessonPlan);
  } catch (error: any) {
    console.log(error.message);
  }
};
