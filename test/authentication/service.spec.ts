import chai from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import { loginUser, registerUser } from "../../src/authentication/service";
import { User } from "../../src/models/user.model";
import * as fileTransactions from "../../src/utils/file-transactions";
import {
  ERR_EXISTING_USER,
  ERR_INVALID_PASSWORD,
  ERR_UNREGISTERED_USER,
  SUCCESSFUL_LOGIN,
  SUCCESSFUL_REGISTRATION,
} from "../../src/constants";

import bcrypt from "bcrypt";

const chaiHttp = require("chai-http");

chai.use(sinonChai);
const expect = chai.expect;

describe("Test registerUser function", () => {
  it("1. should register a new user and return status code 201", async () => {
    const registrationDetails: any = {
      fullName: "testuser1",
      password: "testpassword123",
      email: "testuser1@example.com",
      phoneNumber: "98877665544",
    };

    const dataFromDB = [
      {
        fullName: "testuser",
        email: "testuser@example.com",
        password: "testpassword",
        phoneNumber: "98877665545",
        id: 1,
        role: "regular",
      },
    ];

    const dataReadFromDB = sinon.stub(fileTransactions, "readFromDatabase");
    dataReadFromDB.returns(Promise.resolve(dataFromDB));

    sinon.stub(fileTransactions, "writeToDatabase");
    const result = await registerUser(registrationDetails);
    expect(result.message).equal(SUCCESSFUL_REGISTRATION);
    dataReadFromDB.restore();
  });

  it("2. should not register a user and return status code 403", async () => {
    const registrationDetails: any = {
      fullName: "testuser1",
      password: "testpassword123",
      email: "testuser@example.com",
      phoneNumber: "98877665544",
    };

    const dataFromDB = [
      {
        fullName: "testuser",
        email: "testuser@example.com",
        password: "testpassword",
        phoneNumber: "98877665545",
        id: 1,
        role: "regular",
      },
    ];

    const dataReadFromDB = sinon.stub(fileTransactions, "readFromDatabase");
    dataReadFromDB.returns(Promise.resolve(dataFromDB));

    sinon.stub(fileTransactions, "writeToDatabase");
    const result = await registerUser(registrationDetails);
    expect(result.message).equal(ERR_EXISTING_USER);
    dataReadFromDB.restore();
  });
});

describe("Tesing loginUser function", () => {
  const dataFromDB = [
    {
      fullName: "testuser",
      email: "testuser@example.com",
      password: "testpassword",
      phoneNumber: "98877665545",
      id: 1,
      role: "regular",
    },
  ];
  const loginDetails = {
    email: "testuser@example.com",
    password: "testpassword",
  };
  let dataReadFromDB: sinon.SinonStub<any, any>;
  beforeEach(() => {
    dataReadFromDB = sinon.stub(fileTransactions, "readFromDatabase");
    dataReadFromDB.returns(Promise.resolve(dataFromDB));
  });

  afterEach(() => {
    dataReadFromDB.restore();
  });

  it("1. should let a user login if user is registered and password is correct", async () => {
    sinon.stub(fileTransactions, "writeToDatabase");

    const bcryptCompareStub = sinon.stub(bcrypt, "compareSync");
    bcryptCompareStub.returns(await Promise.resolve(true));

    const result = await loginUser(loginDetails);
    expect(result.message).equal(SUCCESSFUL_LOGIN);

    bcryptCompareStub.restore();
  });

  it("2. should not let a user login if user is registered and but password is incorrect", async () => {
    loginDetails.password = "testpassword1";

    sinon.stub(fileTransactions, "writeToDatabase");

    const bcryptCompareStub = sinon.stub(bcrypt, "compareSync");
    bcryptCompareStub.returns(await Promise.resolve(false));

    const result = await loginUser(loginDetails);
    expect(result.message).equal(ERR_INVALID_PASSWORD);

    bcryptCompareStub.restore();
  });

  it("3. should not let a user login if user is not registered", async () => {
    loginDetails.email = "testuser1@example.com";

    sinon.stub(fileTransactions, "writeToDatabase");

    const result = await loginUser(loginDetails);
    expect(result.message).equal(ERR_UNREGISTERED_USER);
  });
});
