const User = require("../../database/models/user");
const { registerUser } = require("./usersController");

jest.mock("../../database/models/user");

describe("Given a registerUser function", () => {
  describe("When it´s called with req object", () => {
    test("Then it should call json method", async () => {
      const req = {
        body: {
          name: "Peter",
          username: "Pan",
          password: "sandia",
          friends: [],
          enemies: [],
          age: 18,
          image: "http",
          id: "69",
        },
      };
      const res = {
        json: jest.fn(),
      };

      const newUser = {
        name: "Peter",
        username: "Pan",
        password: "sandia",
        friends: [],
        enemies: [],
        age: 18,
        image: "http",
        id: "69",
      };
      User.create = jest.fn().mockResolvedValue(newUser);

      await registerUser(req, res);
      expect(res.json).toHaveBeenCalledWith(newUser);
    });
  });

  describe("When it´s called and reject and error", () => {
    test("Then it should call next function with an error", async () => {
      const req = {
        body: {
          name: "Peter",
          username: "Pan",
          password: "sandia",
          friends: [],
          enemies: [],
          age: 18,
          image: "http",
          id: "69",
        },
      };

      const next = jest.fn();
      const error = new Error("Not valid inputs");
      error.code = 400;
      User.create = jest.fn().mockRejectedValue(error);

      await registerUser(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("code", 400);
      expect(next.mock.calls[0][0]).toHaveProperty(
        "message",
        "Not valid inputs"
      );
    });
  });
});
