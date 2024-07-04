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
import LessonPlanService from "../src/service/LessonPlanService";
import axios from "axios";
import lessonPlanTemplate from "../data/lessonPlanTemplate.json";

vi.mock("axios", async () => {
  const actual = await vi.importActual("axios");
  return {
    ...actual,
    create: vi.fn().mockReturnValue({
      get: vi.fn().mockReturnThis(),
      post: vi.fn().mockReturnThis(),
      put: vi.fn().mockReturnThis(),
      delete: vi.fn().mockReturnThis(),
    }),
  };
});

describe("LessonPlanService class tests", () => {
  const axiosCreateSpy = vi.spyOn(axios, "create");
  let validBaseUrl = "https://www.valid.com/url";
  let testUserId = "81742460220";
  let testLessonId = "02206424718";
  let testLessonPlanService;
  let testInstance;

  it("initialises the LessonPlanService class correctly", () => {
    testLessonPlanService = new LessonPlanService(validBaseUrl, testUserId);

    expect(axiosCreateSpy).toHaveBeenCalledWith({ baseURL: validBaseUrl });
    expect(testLessonPlanService.getUserId()).toEqual(testUserId);
    expect(testLessonPlanService.getInstance()).toHaveProperty("get");
  });

  afterEach(() => {
    testLessonPlanService = null;
  });

  beforeEach(() => {
    testLessonPlanService = new LessonPlanService(validBaseUrl, testUserId);
    testInstance = testLessonPlanService.getInstance();
  });

  it("calls axios.get when getLessonPlans is called", async () => {
    const getSpy = vi.spyOn(testInstance, "get");

    await testLessonPlanService.getLessonPlans();

    expect(getSpy).toHaveBeenCalledWith(`/${testUserId}/lesson-plans`);
  });

  it("calls axios.get when getOneLessonPlan is called", async () => {
    const getSpy = vi.spyOn(testInstance, "get");

    await testLessonPlanService.getOneLessonPlan(testLessonId);

    expect(getSpy).toHaveBeenCalledWith(
      `/${testUserId}/lesson-plans/${testLessonId}`
    );
  });

  it("calls axios.post when createLessonPlan is called", async () => {
    const postSpy = vi.spyOn(testInstance, "post");

    await testLessonPlanService.createLessonPlan(lessonPlanTemplate);

    expect(postSpy).toHaveBeenCalledWith(`/${testUserId}/lesson-plans`, {
      lessonPlan: lessonPlanTemplate,
    });
  });

  it("calls axios.put when updateLessonPlan is called", async () => {
    const putSpy = vi.spyOn(testInstance, "put");

    await testLessonPlanService.updateLessonPlan(testLessonId, lessonPlanTemplate);

    expect(putSpy).toHaveBeenCalledWith(`/${testUserId}/lesson-plans/${testLessonId}`, {
      newLessonPlan: lessonPlanTemplate,
    });
  });
});
