const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../database/models/user");
const { registerUser, loginRegister } = require("./usersController");

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

describe("Given a loginRegister function", () => {
  describe("When it receives a req and incorrect username", () => {
    test("Should it call next with and error", async () => {
      const req = {
        body: {
          username: "fail",
          password: "sandia",
        },
      };
      const next = jest.fn();
      const error = new Error("Incorrect details");
      error.code = 401;
      User.findOne = jest.fn().mockResolvedValue(null);

      await loginRegister(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("When it receives a req and incorrect password", () => {
    test("Should it called next with and error", async () => {
      const req = {
        body: {
          username: "fail",
          password: "sandia",
        },
      };
      const next = jest.fn();
      const error = new Error("Incorrect details!!");
      error.code = 401;
      User.findOne = jest.fn().mockResolvedValue({});
      bcrypt.compare = jest.fn().mockResolvedValue(false);

      await loginRegister(req, null, next);

      expect(next).toHaveBeenCalledWith(error);
      expect(next.mock.calls[0][0]).toHaveProperty("code", error.code);
    });
  });

  describe("When it receives a req and res objects", () => {
    test("Should it called json method", async () => {
      const req = {
        body: {
          username: "Pan",
          password: "sandia",
        },
      };
      const res = {
        json: jest.fn(),
      };

      const user = {
        username: "Pan",
        password: "sandia",
      };
      const expectedtoken = "tokenSuperSeguro";

      const expectedResponse = {
        token: expectedtoken,
      };
      User.findOne = jest.fn().mockResolvedValue(user);
      bcrypt.compare = jest.fn().mockResolvedValue(true);
      jwt.sign = jest.fn().mockReturnValue(expectedtoken);

      await loginRegister(req, res);

      expect(res.json).toHaveBeenCalledWith(expectedResponse);
    });
  });
});
