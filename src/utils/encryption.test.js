const { encryptObj, decryptObj, decryptArrObj, encryptArrObj } = require("./encryption");

const testObj = {
  key: "A1",
};
const encryptedTestObj = {
  key: "6162636465666768696a6b6c6d6e6f70:f19ff04d9c13dba52c3a7dce315d1067",
};
const testArr = [testObj];
const encryptedTestArr = [encryptedTestObj];
describe("encryption-decryption", () => {
  test("encryptObj --> get encrypted data", () => {
    const obj = { ...testObj };
    const result = encryptObj(obj, ["key"]);
    expect(result).toStrictEqual(encryptedTestObj);
  });

  test("encryptObj --> same data no encryption since key not found", () => {
    const obj = { ...testObj };
    const result = encryptObj(obj, ["dummy"]);
    expect(result).toStrictEqual(obj);
  });

  test("encryptArrObj --> get encrypted data", () => {
    const arr = [{ ...testObj }];
    const result = encryptArrObj(arr, ["key"]);
    expect(result).toStrictEqual(encryptedTestArr);
  });

  test("decryptObj --> get decrypted data", () => {
    const encryptedObj = { ...encryptedTestObj };
    const result = decryptObj(encryptedObj, ["key"]);
    expect(result).toStrictEqual(testObj);
  });
  test("decryptObj --> same data no decryption since key not found", () => {
    const encryptedObj = { ...encryptedTestObj };
    const result = decryptObj(encryptedObj, ["dummy"]);
    expect(result).toStrictEqual(encryptedObj);
  });

  test("decryptArrObj --> get decrypted data", () => {
    const encryptedArr = [{ ...encryptedTestObj }];
    const result = decryptArrObj(encryptedArr, ["key"]);
    expect(result).toStrictEqual(testArr);
  });
});
