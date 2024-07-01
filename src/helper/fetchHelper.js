export const fetchLessonPlans = async (lessonApiRef, setLessonPlans) => {
  try {
    const response = await lessonApiRef.current.getLessonPlans();
    setLessonPlans(response.data.lessonPlans);
  } catch (error) {
    console.log(error.message);
  }
};

export const fetchOneLessonPlan = async (
  lessonApiRef,
  lessonId,
  setLessonPlan
) => {
  try {
    const response = await lessonApiRef.current.getOneLessonPlan(lessonId);
    setLessonPlan(response.data.lessonPlan);
  } catch (error) {
    console.log(error.message);
  }
};
