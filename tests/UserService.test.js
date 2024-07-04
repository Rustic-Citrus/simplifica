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
import UserService from "../src/service/UserService.js";
import axios from "axios";

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

describe("UserService class tests", () => {
  const axiosCreateSpy = vi.spyOn(axios, "create");
  let validBaseUrl = "https://www.valid.com/url";
  let testUserId = "81742460220";
  let testUserService;
  let testInstance;

  it("instantiates the UserService class correctly", () => {
    testUserService = new UserService(validBaseUrl);

    expect(axiosCreateSpy).toHaveBeenCalledWith({ baseURL: validBaseUrl });
    expect(testUserService.getInstance()).toHaveProperty("get");
  });
});
