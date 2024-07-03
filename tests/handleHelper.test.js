import { describe, it, expect, vi } from "vitest";
import { handleChangeHelper } from "../src/helper/handleHelper.js";

describe("handleChangeHelper", () => {
  it("updates the state with the value from the event target", () => {
    const setState = vi.fn();
    const event = {
      target: {
        value: "test value",
      },
    };

    handleChangeHelper(event, setState);

    expect(setState).toHaveBeenCalledWith("test value");
  });
});
