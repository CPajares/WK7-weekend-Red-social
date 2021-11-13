const jwt = require("jsonwebtoken");
const auth = require("./auth");

describe("Given an auth function", () => {
  describe("When it´s called with req and next ", () => {
    test("Then it should call next function", () => {
      const next = jest.fn();
      const req = {
        header: jest
          .fn()
          .mockReturnValue(
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiU2FuZHJhIiwic3VybmFtZSI6IlNpbmRyaWEiLCJpYXQiOjE2MzY4MDQ1MzR9.PM8Nyk4-kjD82u3vEzjtgb_tF3TtzyA0Sd7k8WxLeRU"
          ),
      };
      jwt.verify = jest.fn().mockReturnValue("618ecc54008088cc372842c6");
      auth(req, null, next);

      expect(next).toHaveBeenCalled();
    });
  });

  describe("When it´s called with req object whitout an authorizationHeader ", () => {
    test("Then it should call next function with an error", () => {
      const next = jest.fn();
      const req = {
        header: jest.fn(),
      };
      const error = new Error("Not authorised, missing token");
      error.code = 401;
      auth(req, null, next);

      expect(next.mock.calls[0][0]).toHaveProperty("message", error.message);
    });
  });
});
