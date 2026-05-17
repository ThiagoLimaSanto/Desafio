import { UserSchema } from "../types/User";
import { User } from "../models/UserModel";

export class UserService {
  async create(user: UserSchema) {
    const userCreated = await User.create(user);
    return userCreated;
  }
}
