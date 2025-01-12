import DBLocal from "db-local";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { SALT_ROUNDS } from "./config";
const { Schema } = new DBLocal({ path: "./db" });

const User = Schema("User", {
  _id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});
export class UserRepository {
  static async create({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) {
    Validation.username(username);
    Validation.password(password);

    const user = User.findOne({ username });
    if (user) throw new Error("username alredy exists");

    const id = crypto.randomUUID();
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    User.create({
      _id: id,
      username,
      password: hashedPassword,
    }).save();

    return id;
  }
  static async login({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) {
    Validation.username(username);
    Validation.password(password);

    const user = User.findOne({ username });
    if (!user) throw new Error("username does not exists");

    const isValid = await bcrypt.compareSync(password, user.password);
    if (!isValid) throw new Error("password invalid");

    const { password: _, ...publicUser } = user;

    return publicUser;
  }
}
class Validation {
  static username(username: string) {
    if (typeof username != "string")
      throw new Error("username must be a string");
    if (username.length < 4)
      throw new Error("username must be at least 4 characters long");
  }
  static password(password: string) {
    if (typeof password != "string")
      throw new Error("password must be a string");
    if ((password.length, 6))
      throw new Error("password must be at least 6 characters long");
  }
}
