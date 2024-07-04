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
  let testUserData = {
    username: "testUser",
    password: "testPassword",
  };
  let testUserService;
  let testInstance;

  it("instantiates the UserService class correctly", () => {
    testUserService = new UserService(validBaseUrl);

    expect(axiosCreateSpy).toHaveBeenCalledWith({ baseURL: validBaseUrl });
    expect(testUserService.getInstance()).toHaveProperty("get");
  });

  afterEach(() => {
    testUserService = null;
  });

  beforeEach(() => {
    testUserService = new UserService(validBaseUrl);
    testInstance = testUserService.getInstance();
  });

  it("calls axios.post when the login method is called", async () => {
    const postSpy = vi.spyOn(testInstance, "post");

    await testUserService.login(testUserData);

    expect(postSpy).toHaveBeenCalledWith("/login", testUserData, {
      withCredentials: true,
    });
  });

  it("calls axios.put when the logout method is called", async () => {
    const putSpy = vi.spyOn(testInstance, "put");

    await testUserService.logout();

    expect(putSpy).toHaveBeenCalledWith("/logout", {}, {
      withCredentials: true,
    });
  });
});
