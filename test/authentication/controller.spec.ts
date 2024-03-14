import chai from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import {
  loginUserCtrl,
  registerUserCtrl,
} from "../../src/authentication/controller";
import * as userService from "../../src/authentication/service";
import {
  ERR_INTERNAL_SERVER_ERROR,
  ERR_MISSING_AUTH_HEADER,
  HTTP_CODES,
  SUCCESSFUL_LOGIN,
  SUCCESSFUL_REGISTRATION,
} from "../../src/constants";

chai.use(sinonChai);
const expect = chai.expect;

afterEach(() => {
  sinon.restore();
});

describe("Test registerUserCtrl function", () => {
  it("1. should register user and return status code 201", async () => {
    let req = sinon.createStubInstance(Request) as any;
    req = {
      body: {
        fullName: "John Doe",
        email: "john@gmail.com",
        phoneNumber: "9876543247",
        password: "password",
      },
    };
    let res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
    } as any;
    let registerUserStub = sinon.stub(userService, "registerUser");
    registerUserStub.returns(
      Promise.resolve({
        status: HTTP_CODES.CREATED,
        message: SUCCESSFUL_REGISTRATION,
      })
    );

    await registerUserCtrl(req, res);

    sinon.assert.calledWith(res.status, HTTP_CODES.CREATED);
    sinon.assert.calledWith(res.json, SUCCESSFUL_REGISTRATION);
  });
});

describe("Test loginUserCtrl function", () => {
  it("1. should login user and return status code 200", async () => {
    let req = sinon.createStubInstance(Request) as any;
    req = {
      body: {
        fullName: "John Doe",
        password: "password",
      },
    };
    let res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
    } as any;
    let loginUserStub = sinon.stub(userService, "loginUser");
    loginUserStub.returns(
      Promise.resolve({
        status: HTTP_CODES.OK,
        message: "Login successful",
        token: "gddfhvgttfdgvf",
        user: { id: "1" },
      })
    );

    await loginUserCtrl(req, res);

    sinon.assert.calledWith(res.status, HTTP_CODES.OK);
  });

  it("1. should not login user and return status corresponding status code", async () => {
    let req = sinon.createStubInstance(Request) as any;
    req = {
      body: {
        fullName: "John Doe",
        password: "password",
      },
    };
    let res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
    } as any;
    let loginUserStub = sinon.stub(userService, "loginUser");
    loginUserStub.returns(
      Promise.resolve({
        status: HTTP_CODES.INTERNAL_SERVER_ERROR,
        message: ERR_INTERNAL_SERVER_ERROR,
      })
    );

    await loginUserCtrl(req, res);

    sinon.assert.calledWith(res.status, HTTP_CODES.INTERNAL_SERVER_ERROR);
    sinon.assert.calledWith(res.json, ERR_INTERNAL_SERVER_ERROR);
  });
});
