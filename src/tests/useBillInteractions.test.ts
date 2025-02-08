import { renderHook } from "@testing-library/react";
import useBillInteractions from "../hooks/useBillInteractions";

// we will need this mock on our next test
global.fetch = jest.fn();

describe("useFetchedData", () => {
  it("should return the initial values for data, error and loading", async () => {
    const result = renderHook(() => useBillInteractions());

    expect(result).toBe(null);
  });
});
