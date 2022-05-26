const middleware = require("./index");
const ProjectStorage = require("../storage/projects.stored");

describe("Middleware", function () {
  test("should have isValidHeader function", function () {
    expect(middleware.isValidHeader instanceof Function).toBeTruthy();
  });

  test("should throw an error when secret is missing", function () {
    const request = {
      headers: {
        secret: null,
      },
    };
    middleware.isValidHeader(request, {}, ({ message }) => {
      expect(message).toBe("secret key is missing in headers");
    });
  });

  test("should throw an error when secret is Invalid", function () {
    const request = {
      headers: {
        secret: "626115304c9b344631caeb42",
      },
    };
    middleware.isValidHeader(request, {}, ({ message }) => {
      expect(message).toBe("Invalid secret key");
    });
  });

  test("should work fine on correct secret", function () {
    ProjectStorage.isValid = jest.fn(() => {
      return true;
    });

    const request = {
      headers: {
        secret: "626115304c9b344631caeb42",
      },
    };
    middleware.isValidHeader(request, {}, (error) => {
      expect(error).toBe(undefined);
    });
  });

  test("should have validate function", function () {
    expect(middleware.validate instanceof Function).toBeTruthy();
  });

  test("should have validate function called", function () {
    const schema = {
      body: {
        sampleData: true,
      },
    };
    const req = {
      body: {
        sampleData: true,
      },
    };
    const next = jest.fn();
    middleware.validate(schema)(req, {}, next);
    expect(next).toHaveBeenCalled();
  });

  // test("should have throw error from validate method", function() {
  //     const schema = {
  //         body : {
  //             sampleData: true
  //         }
  //     }
  //     const req = {

  //     }
  //     const next = jest.fn(data => {
  //         console.log(data);
  //     });
  //     middleware.validate(schema)(req, {}, next);
  //     expect(next).toHaveBeenCalled();
  // });
});
