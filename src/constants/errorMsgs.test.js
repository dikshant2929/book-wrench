const errorMsgs = require("./errorMsgs");

describe("Error Messages", function () {
  test("should have 14 items", function () {
    expect(Object.keys(errorMsgs).length).toBe(14);
  });

  test("default key should exists", function () {
    expect(Boolean(errorMsgs.DEFAULT)).toBeTruthy();
  });

  test("USER_NOT_FOUND key should exists", function () {
    expect(Boolean(errorMsgs.USER_NOT_FOUND)).toBeTruthy();
  });

  test("ID_MISSING key should exists", function () {
    expect(Boolean(errorMsgs.ID_MISSING)).toBeTruthy();
  });

  test("USER_EXISTS key should exists", function () {
    expect(Boolean(errorMsgs.USER_EXISTS)).toBeTruthy();
  });

  test("FIND_FILTER_MISSING key should exists", function () {
    expect(Boolean(errorMsgs.FIND_FILTER_MISSING)).toBeTruthy();
  });

  test("UPDATE_FILTER_MISSING key should exists", function () {
    expect(Boolean(errorMsgs.UPDATE_FILTER_MISSING)).toBeTruthy();
  });

  test("UPDATE_BODY_EMPTY key should exists", function () {
    expect(Boolean(errorMsgs.UPDATE_BODY_EMPTY)).toBeTruthy();
  });

  test("BODY_EMPTY key should exists", function () {
    expect(Boolean(errorMsgs.BODY_EMPTY)).toBeTruthy();
  });

  test("TOKEN_EXISTS key should exists", function () {
    expect(Boolean(errorMsgs.TOKEN_EXISTS)).toBeTruthy();
  });

  test("TOKEN_NOT_FOUND key should exists", function () {
    expect(Boolean(errorMsgs.TOKEN_NOT_FOUND)).toBeTruthy();
  });

  test("DUPLICATE_DATA_FOUND key should exists", function () {
    expect(Boolean(errorMsgs.DUPLICATE_DATA_FOUND)).toBeTruthy();
  });

  test("NON_EXISTING key should exists", function () {
    expect(Boolean(errorMsgs.NON_EXISTING)).toBeTruthy();
  });

  test("CANT_DELETE_DEFAULT key should exists", function () {
    expect(Boolean(errorMsgs.CANT_DELETE_DEFAULT)).toBeTruthy();
  });

  test("CANT_PROCESS_REQUEST key should exists", function () {
    expect(Boolean(errorMsgs.CANT_PROCESS_REQUEST)).toBeTruthy();
  });
});
