const User = require("../../database/models/user");
const { getUsers, getFriends } = require("./crancController");

describe("Given a getUsers function", () => {
  describe("When it´s receive a res object", () => {
    test("Then it should call json method", async () => {
      User.find = jest.fn().mockResolvedValue({});
      const res = {
        json: jest.fn(),
      };
      await getUsers(null, res);

      expect(res.json).toHaveBeenCalled();
    });
  });

  describe("When it´s reject an error", () => {
    test("Then it should call next function", async () => {
      const expectedError = new Error("Not found!");

      User.find = jest.fn().mockRejectedValue(expectedError);
      const next = jest.fn();

      await getUsers(null, null, next);

      expect(next).toHaveBeenCalledWith(expectedError);
      expect(next.mock.calls[0][0]).toHaveProperty(
        "message",
        expectedError.message
      );
    });
  });
});

describe("Given a addFriends function", () => {
  describe("When it receives a res object", () => {
    test("Should it call json method", async () => {
      const next = jest.fn();
      const error = new Error("Error while looking for friends");
      error.code = 401;

      User.findOne = jest.fn().mockRejectedValue(error);

      await getFriends(null, null, next);

      expect(next).toHaveBeenCalled();
    });
  });
});
