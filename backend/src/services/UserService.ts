import { UserLogin, userRole, UserSchema } from "../types/User";
import { User } from "../models/UserModel";
import { AppError } from "../errors/AppError";
import { hashPassword, verifyPassword } from "../helpers/argon2";

export class UserService {
  async checkAuth(id: string) {
    const user = await User.findById(id).select("-password");

    if (!user) throw new AppError("Usuário nao encontrado!", 404);
    
    return user;
  }
  async create(user: UserSchema) {
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

    
    
    const isValidPassword = await verifyPassword(userFound.password, passwordPepper);

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
