import { prisma } from "../../Config/db/prisma";
import { SaveUserDTO } from "../../DTO/User/SaveUserDTO";
import { updateUserDTO } from "../../DTO/User/UpdateUserDTO";
import { AppLogger } from "../../Logger/AppLogger";
import { UserRepository } from "../../Repository/User";
import { encrypt } from "../../Util/Cryptography";

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async Save({ name, mail, password, image }: SaveUserDTO) {
    try {
      const user = await this.userRepository.Save({
        mail,
        image,
        name,
        password: encrypt(password),
      });
      return user;
    } catch (error: any) {
      new AppLogger().error(error);
      return null;
    }
  }

  async Login(mail: string, password: string) {
    try {
      const user = await this.userRepository.Login(mail, password);
      return user;
    } catch (error: any) {
      new AppLogger().error(error);
      return null;
    }
  }

  async FindByEmail(mail: string) {
    try {
      const user = await this.userRepository.FindByEmail(mail);
      return user;
    } catch (error: any) {
      new AppLogger().error(error);
      return [];
    }
  }

  async Update(
    { isActive, name, mail, password, image }: updateUserDTO,
    id: string
  ) {
    try {
      const encryptedPassword = password ? encrypt(password) : password;
      const userUpdate = await this.userRepository.Update(
        { isActive, name, mail, password: encryptedPassword, image },
        id
      );
      return userUpdate;
    } catch (error: any) {
      new AppLogger().error(error);
      return null;
    }
  }

  async Delete(id: string) {
    try {
      const userDelete = await this.userRepository.Delete(id);
      return userDelete;
    } catch (error: any) {
      new AppLogger().error(error);
      return null;
    }
  }

  async FindUserById(id: string) {
    try {
      const user = await this.userRepository.FindUserById(id);
      return user;
    } catch (error: any) {
      new AppLogger().error(error);
      return null;
    }
  }
}