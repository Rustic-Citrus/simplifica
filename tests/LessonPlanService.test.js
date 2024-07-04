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

  it("initialises the LessonPlanService class correctly", () => {
    const axiosCreateSpy = vi.spyOn(axios, "create");

    testLessonPlanService = new LessonPlanService(validBaseUrl, testUserId);

    expect(axiosCreateSpy).toHaveBeenCalledWith({ baseURL: validBaseUrl });
    expect(testLessonPlanService.getUserId()).toEqual(testUserId);
    expect(testLessonPlanService.getInstance()).toHaveProperty("get");
  });
});
