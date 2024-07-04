import {
  afterEach,
  beforeEach,
  beforeAll,
  afterAll,
  expect,
  describe,
  it,
  vi,
} from "vitest";
import {
  fetchLessonPlans,
  fetchOneLessonPlan,
} from "../src/helper/fetchHelper";

describe("fetchHelper functions tests", () => {
  const mockResponseGetLessonPlans = {
    data: {
      lessonPlans: ["some", "lesson", "plans"],
    },
  };
  const mockResponseGetOneLessonPlan = {
    data: {
      lessonPlan: {
        topic: "example",
        other: "fields",
      },
    },
  };
  const mockLessonApiRef = {
    current: {
      getLessonPlans: vi.fn().mockReturnValue(mockResponseGetLessonPlans),
      getOneLessonPlan: vi.fn().mockReturnValue(mockResponseGetOneLessonPlan),
    },
  };
  const mockSetLessonPlans = vi.fn().mockReturnThis();
  const mockSetLessonPlan = vi.fn().mockReturnThis();
  const testLessonId = "51912417232";

  it("calls the lesson plan API getLessonPlans method and sets the new lesson plans data", async () => {
    await fetchLessonPlans(mockLessonApiRef, mockSetLessonPlans);

    expect(mockLessonApiRef.current.getLessonPlans).toHaveBeenCalledTimes(1);
    expect(mockSetLessonPlans).toHaveBeenCalledWith(
      mockResponseGetLessonPlans.data.lessonPlans
    );
  });

  it("calls the lesson plan API getOneLessonPlan method and sets the new lesson plan data", async () => {
    await fetchOneLessonPlan(mockLessonApiRef, testLessonId, mockSetLessonPlan);

    expect(mockLessonApiRef.current.getOneLessonPlan).toHaveBeenCalledTimes(1);
    expect(mockLessonApiRef.current.getOneLessonPlan).toHaveBeenCalledWith(
      testLessonId
    );
    expect(mockSetLessonPlan).toHaveBeenCalledWith(
      mockResponseGetOneLessonPlan.data.lessonPlan
    );
  });
});
