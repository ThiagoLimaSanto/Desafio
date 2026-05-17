import { AppError } from "../errors/AppError";
import { hashPassword, verifyPassword } from "../helpers/argon2";
import { User } from "../models/UserModel";
import { UserLogin, userRole, UserSchema, UserToken } from "../types/User";

export class UserService {
  async checkAuth(user: UserToken) {
    const userFound = await User.findById(user.id).select("-password");

    if (!userFound) throw new AppError("Usuário nao encontrado!", 404);

    return userFound;
  }

  async create(user: UserSchema) {
    const userFound = await User.findOne({ email: user.email });
    if (userFound) throw new AppError("Usuário ja cadastrado!", 400);
    const passwordPepper = user.password + process.env.PEPPER;
    const password_hash = await hashPassword(passwordPepper);
    const userCreated = await User.create({
      ...user,
      password: password_hash,
      role: userRole.USER,
    });
    return userCreated;
  }

  async login(user: UserLogin) {
    const userFound = await User.findOne({ email: user.email });
    if (!userFound) throw new AppError("Usuário nao encontrado!", 404);

    const passwordPepper = user.password + process.env.PEPPER;

    const isValidPassword = await verifyPassword(
      userFound.password,
      passwordPepper,
    );

    if (!isValidPassword)
      throw new AppError("Usuário ou senha incorretos!", 400);

    return {
      user: {
        id: userFound.id,
        name: userFound.name,
        role: userFound.role,
      },
    };
  }
}
