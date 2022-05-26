const logger = require("./logger");

const on = jest.fn();

describe("Logger", function () {
  test("is valid function", function () {
    expect(logger instanceof Function).toBeTruthy();
  });

  test("should work fine with middleware function", function () {
    const request = {
      headers: {
        secret: null,
      },
      body: {
        mobile: "9460617677",
        name: "Dikshant Godara",
        email: "dikshant.godara@girnarsoft.co.in",
      },
      url: "/api/v1",
    };
    const next = jest.fn();
    logger(request, { on }, next);
    expect(next).toHaveBeenCalled();
  });

  test("should work fine with middleware function for health check URL", function () {
    const request = {
      headers: {
        secret: null,
      },
      body: {
        mobile: "9460617677",
        name: "Dikshant Godara",
      },
      url: "/health",
    };
    const next = jest.fn();
    logger(request, { on }, next);
    expect(next).toHaveBeenCalled();
  });

  test("should work fine with middleware function with encryption", function () {
    const mobile = "9460617677";
    const email = "dikshant.godara@girnarsoft.co.in";
    const request = {
      headers: {
        secret: null,
      },
      url: `/api/v1/findUser?mobile=${mobile}&email=${email}`,
    };
    const next = jest.fn();
    logger(request, { on }, next);
    expect(next).toHaveBeenCalled();
  });
});
