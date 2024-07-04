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

vi.mock("axios", async () => {
  const actual = await vi.importActual("axios");
  return {
    ...actual,
    create: vi.fn().mockReturnValue({
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
    }),
  };
});

describe("LessonPlanService class tests", () => {
  let validBaseUrl = "https://www.valid.com/url";
  let testUserId = "81742460220";
  let testLessonPlanService;
  let testInstance;

  it("initialises the LessonPlanService class correctly", () => {
    const axiosCreateSpy = vi.spyOn(axios, "create");

    testLessonPlanService = new LessonPlanService(validBaseUrl, testUserId);

    expect(axiosCreateSpy).toHaveBeenCalledWith({ baseURL: validBaseUrl });
    expect(testLessonPlanService.getUserId()).toEqual(testUserId);
    expect(testLessonPlanService.getInstance()).toHaveProperty("get");
  });

  afterEach(() => {
    testLessonPlanService = null;
  })

  beforeEach(() => {
    testLessonPlanService = new LessonPlanService(validBaseUrl, testUserId);
    testInstance = testLessonPlanService.getInstance();
  });

  it("returns a response when getLessonPlans is called", async () => {
    const getSpy = vi.spyOn(testInstance, "get")

    await testLessonPlanService.getLessonPlans();

    expect(getSpy).toHaveBeenCalledWith(`/${testUserId}/lesson-plans`);
  })
});
