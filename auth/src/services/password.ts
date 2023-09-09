import { compareSync, genSaltSync, hashSync } from "bcryptjs";

export class Password {
  static toHash(password: string): string {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  }

  static compare(storedPassword: string, suppliedPassword: string): boolean {
    return compareSync(suppliedPassword, storedPassword);
  }
}
