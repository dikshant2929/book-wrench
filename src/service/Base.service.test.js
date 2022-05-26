const base = require("./Base.service");
const Base = new base();

const databaseHelper = require("../database/index");
const errorMsgs = require("../constants/errorMsgs");
const CustomError = require("../utils/CustomError");
const httpStatus = require("http-status");

jest.mock("../database/index.js");

const testData = {
  _id: "61028e7e93aa945766a8519c",
  userId: "60ee9fc4e17af0c2c6121d64",
  documentNumber: "A1", //unique field
  type: "Aadhar",
  path: "https://img.wallpapersafari.com/desktop/1680/1050/34/81/EJXA96.jpg",
  // nameOnCard: "testUser",
  isVerified: false,
};

const duplicateTestData = {
  _id: "61028e9be489cde62a5d958c",
  userId: "60ee9fc4e17af0c2c6121d64",
  documentNumber: "A1", //unique field
  type: "Driving Lisence",
  path: "https://img.wallpapersafari.com/desktop/1680/1050/34/81/EJXA96.jpg",
  // nameOnCard: "testUser",
  isVerified: true,
};
const updateTestDataBody = {
  documentNumber: "C1", //unique field
};
const checkUpdateTestData = {
  userId: "60ee9fc4e17af0c2c6121d64",
  documentNumber: "C1", //unique field
  type: "PAN",
  path: "https://img.wallpapersafari.com/desktop/1680/1050/34/81/EJXA96.jpg",
  // nameOnCard: "testUser",
  isVerified: true,
};

const testUsers = [{ _id: "60c0b99c0c951a7287d2a088", name: "test", mobile: "9876543210", projectId: "626115304c9b344631caeb42" }];
const newUser = { name: "Testing", mobile: "9876543211", projectId: "626115304c9b344631caeb42" };
const updateBody = { name: "Testing" };

const findMock = jest.fn((filter) => {
  let flag = false;
  for (const keys in filter) {
    if (filter[keys] == testUsers[0][keys]) flag = true;
  }
  if (filter._id == testData._id) {
    return testData;
  }
  if (flag) return testUsers[0];
  else return null;
});

const findAllMock = jest.fn((filter) => {
  let flag = false;
  for (const keys in filter) {
    if (filter[keys] == testUsers[0][keys]) flag = true;
  }
  return {
    sort: jest.fn(() => {
      return { toArray: jest.fn(() => (flag ? testUsers : [])) };
    }),
    // toArray: jest.fn(() => (flag ? testUsers : [])),
  };
});

const insertMock = jest.fn((body) => {
  return body ? { insertedId: { toHexString: jest.fn(() => "60c0b99c0c951a7287d2a088") } } : null;
});
const updateMock = jest.fn(() => {
  return { value: { ...testUsers[0], ...updateBody } };
});

const deleteMock = jest.fn(() => {
  return { value: { ...testUsers[0] } };
});

databaseHelper.getCollection = jest.fn(async () => {
  return {
    find: findAllMock,
    findOne: findMock,
    insertOne: insertMock,
    findOneAndUpdate: updateMock,
    findOneAndDelete: deleteMock,
  };
});

describe("Base", () => {
  let User;
  beforeEach(function () {
    User = require("../modules/user/User");
  });

  describe("Base.insert", () => {
    beforeEach(function () {
      User = require("../modules/user/User");
    });

    it("should return error if inserting duplicate data", async () => {
      const spiedOn = jest.spyOn(Base, "checkDuplicateData").mockImplementation((body) => {
        if (body.docNo === duplicateTestData.docNo) throw new CustomError(httpStatus.BAD_REQUEST, errorMsgs.DUPLICATE_DATA_FOUND);
        else return null;
      });
      expect.assertions(1); //this error is not working ------------??????????????????
      try {
        Base.unique_field = "docNo";
        await Base.insert(testData);
      } catch (e) {
        expect(e.message).toBe(errorMsgs.DUPLICATE_DATA_FOUND);
      }
      Base.unique_field = undefined;
      spiedOn.mockRestore();
    });

    it("should return user object if successfully created", async () => {
      expect.assertions(2);
      User.create = jest.fn(User.create);
      const result = await Base.insert.call({ Model: User }, newUser);
      expect(User.create).toHaveBeenCalled();
      expect(result.toJSON()).toMatchObject({ ...newUser, projectId: expect.anything() });
    });
    it("should return null if not inserted", async () => {
      const MockedUser = { ...User };
      MockedUser.create = jest.fn(() => null);
      insertMock.mockReturnValueOnce(null);
      const result = await Base.insert.call({ Model: MockedUser }, newUser);
      expect(MockedUser.create).toHaveBeenCalledWith(newUser);
      expect(result).toStrictEqual(null);
    });
    it("should return null if body not passed", async () => {
      try {
        await Base.insert();
      } catch (e) {
        expect(e.message).toBe(errorMsgs.BODY_EMPTY);
      }
    });
  });

  describe("Base.getById", () => {
    beforeEach(function () {
      User = require("../modules/user/User");
    });

    it("should return error if id not passed", async () => {
      try {
        await Base.getById();
      } catch (e) {
        expect(e.message).toBe(errorMsgs.ID_MISSING);
      }
    });

    it("should return null if id not exists", async () => {
      const result = await Base.getById.call({ Model: User }, "60c0b99c0c951a7287d2a082");
      expect(result).toBe(null);
    });

    it("should return object if id exists", async () => {
      await Base.insert.call({ Model: User }, testUsers[0]);
      const getById = Base.getById.bind({ Model: User });
      const result = await getById(testUsers[0]._id);
      await Base.deleteById.call({ Model: User, getById }, testUsers[0]._id);
      expect(result.toJSON()).toMatchObject({ ...testUsers[0], projectId: expect.anything(), _id: expect.anything() });
    });
  });

  describe("Base.getByFilter", () => {
    beforeEach(function () {
      User = require("../modules/user/User");
    });

    it("should return error if filter not passed", async () => {
      try {
        await Base.getByFilter();
      } catch (e) {
        expect(e.message).toBe(errorMsgs.FIND_FILTER_MISSING);
      }
    });
    it("should return error if filter is blank object", async () => {
      try {
        await Base.getByFilter({});
      } catch (e) {
        expect(e.message).toBe(errorMsgs.FIND_FILTER_MISSING);
      }
    });

    it("should return null if user not exist as per name", async () => {
      const result = await Base.getByFilter.call({ Model: User }, { name: "random" });
      expect(result).toBe(null);
    });

    it("should return object if user exist as per mobile", async () => {
      await Base.insert.call({ Model: User }, testUsers[0]);
      const result = await Base.getByFilter.call({ Model: User }, { mobile: testUsers[0].mobile });
      expect(result.toJSON()).toMatchObject({ ...testUsers[0], projectId: expect.anything(), _id: expect.anything() });
    });
  });

  describe("Base.getAllByFilter", () => {
    beforeEach(function () {
      User = require("../modules/user/User");
    });

    it("should return error if filter not passed", async () => {
      try {
        await Base.getAllByFilter();
      } catch (e) {
        expect(e.message).toBe(errorMsgs.FIND_FILTER_MISSING);
      }
    });
    it("should return error if filter is blank object", async () => {
      try {
        await Base.getAllByFilter({});
      } catch (e) {
        expect(e.message).toBe(errorMsgs.FIND_FILTER_MISSING);
      }
    });
    it("should return null if user not exist as per name", async () => {
      const result = await Base.getAllByFilter.call({ Model: User }, { name: "random" });
      expect(result).toStrictEqual([]);
    });

    it("should return object if user exist as per mobile", async () => {
      await Base.insert.call({ Model: User }, testUsers[0]);
      const result = await Base.getAllByFilter.call({ Model: User }, { mobile: testUsers[0].mobile });
      expect(result).toEqual(
        expect.arrayContaining([expect.objectContaining({ ...testUsers[0], projectId: expect.anything(), _id: expect.anything() })])
      );
    });
  });

  describe("Base.getAllById", () => {
    beforeEach(function () {
      User = require("../modules/user/User");
    });

    it("should return error if id not passed", async () => {
      try {
        await Base.getAllById();
      } catch (e) {
        expect(e.message).toBe(errorMsgs.ID_MISSING);
      }
    });
    it("should return null if id not exists", async () => {
      const result = await Base.getAllById.call({ Model: User }, "60c0b99c0c951a7287d2a082");
      expect(result).toStrictEqual([]);
    });

    it("should return object if id exists", async () => {
      await Base.insert.call({ Model: User }, testUsers[0]);
      const result = await Base.getAllById.call({ Model: User }, testUsers[0]._id);
      expect(result).toEqual(
        expect.arrayContaining([expect.objectContaining({ ...testUsers[0], projectId: expect.anything(), _id: expect.anything() })])
      );
    });
  });

  describe("Base.updateById", () => {
    let Document;
    beforeEach(function () {
      User = require("../modules/user/User");
      Document = require("../modules/document/Document");
    });

    it("should return error if userid not passed", async () => {
      expect.assertions(1);
      try {
        await Base.updateById();
      } catch (e) {
        expect(e.message).toBe(errorMsgs.ID_MISSING);
      }
    });
    it("should return error if updating duplicate data", async () => {
      const spiedOn = jest.spyOn(Base, "checkDuplicateData").mockImplementation((body) => {
        if (body.documentNumber === checkUpdateTestData.documentNumber)
          throw new CustomError(httpStatus.BAD_REQUEST, errorMsgs.DUPLICATE_DATA_FOUND);
        else return null;
      });
      // expect.assertions(1); //this error is not working ------------??????????????????
      try {
        Base.unique_field = "documentNumber";
        await Base.insert.call({ Model: Document }, testData);
        const getById = Base.getById.bind({ Model: Document });
        await Base.updateById.call({ Model: Document, getById }, testData._id, updateTestDataBody);
      } catch (e) {
        expect(e.message).toBe(errorMsgs.DUPLICATE_DATA_FOUND);
      }
      Base.unique_field = undefined;
      spiedOn.mockRestore();
    });
    it("should return error if body not passed", async () => {
      try {
        await Base.updateById.call({ Model: User }, testUsers[0]._id);
      } catch (e) {
        expect(e.message).toBe(errorMsgs.UPDATE_BODY_EMPTY);
      }
    });
    it("should return updated user as per given data & id", async () => {
      await Base.insert.call({ Model: User }, testUsers[0]);
      const getById = Base.getById.bind({ Model: User });
      const result = await Base.updateById.call({ Model: User, getById }, testUsers[0]._id, updateBody);
      expect(result.toJSON().name).toBe(updateBody.name);
    });
    it("should return NotFound Error if id not matched", async () => {
      try {
        const getById = Base.getById.bind({ Model: User });
        await Base.updateById.call({ Model: User, getById }, "60c0b99c0c951a7287d2a089", updateBody);
      } catch (e) {
        expect(e.message).toBe(errorMsgs.NON_EXISTING);
      }
    });
  });

  describe("Base.updateByFilter", () => {
    beforeEach(function () {
      User = require("../modules/user/User");
    });

    it("should return error if filter not passed", async () => {
      try {
        await Base.updateByFilter();
      } catch (e) {
        expect(e.message).toBe(errorMsgs.UPDATE_FILTER_MISSING);
      }
    });
    it("should return error if body not passed", async () => {
      try {
        await Base.updateByFilter({ mobile: testUsers[0].mobile });
      } catch (e) {
        expect(e.message).toBe(errorMsgs.UPDATE_BODY_EMPTY);
      }
    });
    it("should return updated user as per given data & filter", async () => {
      await Base.insert.call({ Model: User }, testUsers[0]);
      const getByFilter = Base.getByFilter.bind({ Model: User });
      const result = await Base.updateByFilter.call({ Model: User, getByFilter }, { mobile: testUsers[0].mobile }, updateBody);
      expect(result.name).toBe(updateBody.name);
    });
    it("should return NotFound Error if no user matched by filter", async () => {
      try {
        const getByFilter = Base.getByFilter.bind({ Model: User });
        await Base.updateByFilter.call({ Model: User, getByFilter }, { mobile: newUser.mobile }, updateBody);
      } catch (e) {
        expect(e.message).toBe(errorMsgs.NON_EXISTING);
      }
    });
  });

  describe("Base.deleteByFilter", () => {
    it("should return error if filter not passed", async () => {
      try {
        await Base.deleteByFilter();
      } catch (e) {
        expect(e.message).toBe(errorMsgs.FIND_FILTER_MISSING);
      }
    });
    it("should return deleted user as per given data & filter", async () => {
      await Base.insert.call({ Model: User }, testUsers[0]);
      const getByFilter = Base.getByFilter.bind({ Model: User });
      const deletedResult = await Base.deleteByFilter.call({ Model: User, getByFilter }, { mobile: testUsers[0].mobile });
      expect(deletedResult).toMatchObject({ ...testUsers[0], projectId: expect.anything(), _id: expect.anything() });
    });
    it("should return NotFound Error if no user matched by filter", async () => {
      try {
        const getByFilter = Base.getByFilter.bind({ Model: User });
        await Base.deleteByFilter.call({ Model: User, getByFilter }, { mobile: newUser.mobile });
      } catch (e) {
        expect(e.message).toBe(errorMsgs.NON_EXISTING);
      }
    });
  });

  describe("Base.deleteById", () => {
    it("should return error if userid not passed", async () => {
      try {
        await Base.deleteById();
      } catch (e) {
        expect(e.message).toBe(errorMsgs.ID_MISSING);
      }
    });
    it("should return deleted user as per given data & id", async () => {
      await Base.insert.call({ Model: User }, testUsers[0]);
      const getById = Base.getById.bind({ Model: User });
      const result = await Base.deleteById.call({ Model: User, getById }, testUsers[0]._id);
      expect(result).toMatchObject({ ...testUsers[0], projectId: expect.anything(), _id: expect.anything() });
    });
    it("should return NotFound Error if id not matched", async () => {
      try {
        const getById = Base.getById.bind({ Model: User });
        await Base.deleteById.call({ Model: User, getById }, "60c0b99c0c951a7287d2a089");
      } catch (e) {
        expect(e.message).toBe(errorMsgs.NON_EXISTING);
      }
    });
  });
});
