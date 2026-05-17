import * as argon2 from "argon2";

const argonoptions = {
  type: argon2.argon2id,
  memoryCost: 4096,
  timeCost: 3,
  parallelism: 4,
};

export async function hashPassword(password: string) {
  return await argon2.hash(password, argonoptions);
}

export async function verifyPassword(hash: string, password: string) {
  return await argon2.verify(hash, password);
}
