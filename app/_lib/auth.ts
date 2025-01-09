import { genSalt, hash, compare } from "bcrypt";
import { ObjectId } from "mongodb";
// import { v6 as uuidv6 } from "uuid"

import { ROLES } from "../../../glorialan.com-backend/src/auth";

const SALT_ROUNDS = 10;

export function CreateUser(username: string, password: string) {
  return {
    _id: new ObjectId(),
    username,
    password,
    role: ROLES.VISITOR
  }
}

export async function HashPassword(plain: string, ) {
  const salt = await genSalt(SALT_ROUNDS);
  const hashed = await hash(plain, salt);
  // store hashed password in DB
  return hashed;
}

export async function CompareHashedPassword(plain: string, hashed: string) {
  return await compare(plain, hashed);
}
