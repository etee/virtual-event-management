import { promises as fs } from "fs";
import path from "path";
import chai from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";
import { User } from "../../src/models/user.model";
import {
  readFromDatabase,
  writeToDatabase,
  usersFile,
} from "../../src/utils/file-transactions";

chai.use(sinonChai);
const expect = chai.expect;

describe("Test file-transactions", () => {
  const file = usersFile;
  const mockData: User = {
    id: "id_2",
    phoneNumber: "1234567890",
    fullName: "John",
    password: "123456",
    email: "test@123",
  };

  afterEach(() => {
    sinon.restore();
  });

  it("1. should read data from the database file", async () => {
    const readFileStub = sinon
      .stub(fs, "readFile")
      .resolves(JSON.stringify(mockData));
    const result = await readFromDatabase();
    expect(result).to.deep.equal(mockData);
  });

  it("2. should return [] if the database file is empty", async () => {
    const readFileStub = sinon.stub(fs, "readFile").resolves("");
    const result = await readFromDatabase();
    sinon.assert.calledWith(readFileStub, file, {
      encoding: "utf8",
      flag: "r",
    });
    expect(result).to.deep.equal([]);
  });

  it("3. should write data to the database file", async () => {
    const writeFileStub = sinon.stub(fs, "writeFile");
    await writeToDatabase(mockData);
    sinon.assert.calledWith(
      writeFileStub,
      usersFile,
      JSON.stringify(mockData),
      { encoding: "utf8", flag: "w" }
    );
  });
});
