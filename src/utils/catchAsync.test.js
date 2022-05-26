const catchAsync = require("./catchAsync");

describe("catchAsync", () => {
  it("validate catchAsync promise", async () => {
    const req = { query: "hello" };
    const res = {};

    const mockFunc = (request) => {
      // next();
      expect(request.query).toBe("hello");
    };
    const test = catchAsync(mockFunc);

    test(req, res);
  });
});
