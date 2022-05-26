const COLLECTIONS = require("./dbCollections");

describe("DB Collection", function () {
  test("should have 6 items", function () {
    expect(Object.keys(COLLECTIONS).length).toBe(6);
  });

  test("USER key should exists", function () {
    expect(Boolean(COLLECTIONS.USER)).toBeTruthy();
  });

  test("ADDRESS key should exists", function () {
    expect(Boolean(COLLECTIONS.ADDRESS)).toBeTruthy();
  });

  test("LINKEDACCOUNT key should exists", function () {
    expect(Boolean(COLLECTIONS.LINKEDACCOUNT)).toBeTruthy();
  });

  test("DOCUMENT key should exists", function () {
    expect(Boolean(COLLECTIONS.DOCUMENT)).toBeTruthy();
  });

  test("PROJECT key should exists", function () {
    expect(Boolean(COLLECTIONS.PROJECT)).toBeTruthy();
  });

  test("CONNECTOPROFILE key should exists", function () {
    expect(Boolean(COLLECTIONS.CONNECTOPROFILE)).toBeTruthy();
  });
});
