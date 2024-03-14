import chai from "chai";
import { registrationValidator } from "../../src/middlewares/validator";
import { Request, Response, NextFunction } from "express";
import Sinon from "sinon";

const expect = chai.expect;

describe("Test registrationValidator", () => {
  it("1. should return a 400 status code and a message if the request is malformed", (done) => {
    let req = Sinon.createStubInstance(Request) as any;
    req = {
      body: {
        fullName: "John Doe",
        email: "john@gmail.com",
      },
    };
    let res = {
      status: Sinon.stub().returnsThis(),
      json: Sinon.stub().returnsThis(),
    } as any;
    let next = Sinon.stub();
    registrationValidator(req, res, next);

    // Add assertions
    Sinon.assert.notCalled(next);
    Sinon.assert.calledWith(res.status, 400);
    Sinon.assert.calledWith(res.json, Sinon.match.has("message"));
    done();
  });

  it("2. should call next funtion if request body is correct data is send for user registration", (done) => {
    let req = {
      body: {
        fullName: "John Doe",
        email: "john@gmail.com",
        password: "Password@123",
        phoneNumber: "+919914567890",
      },
    } as any;
    let res = {
      status: Sinon.stub().returnsThis(),
      json: Sinon.stub().returnsThis(),
    } as any;
    let next = Sinon.stub();
    registrationValidator(req, res, next);

    // Add assertions
    Sinon.assert.calledOnce(next);
    Sinon.assert.notCalled(res.status);
    Sinon.assert.notCalled(res.json);
    done();
  });
});
