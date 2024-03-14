import { promises as fs } from "fs";
import path from "path";
import { User } from "../models/user.model";

const usersFile = path.join(__dirname, ".", "db.json");

const readFromDatabase = async () => {
  const data = await fs.readFile(usersFile, { encoding: "utf8", flag: "r" });
  return data ? JSON.parse(data) : [];
};

const writeToDatabase = async (data: User) => {
  await fs.writeFile(usersFile, JSON.stringify(data), {
    encoding: "utf8",
    flag: "w",
  });
};

export { readFromDatabase, writeToDatabase, usersFile };
