import { PrismaClient } from "@prisma/client";
import { v4 } from "uuid";
import { SaveUserDTO } from "../../DTO/User/SaveUserDTO";
import { updateUserDTO } from "../../DTO/User/UpdateUserDTO";
import { User } from "../../DTO/User/UserDTO";

export class UserRepository {
  constructor(private prisma: PrismaClient) {}

  async Save(user: SaveUserDTO): Promise<string[]> {
    const createUser = await this.prisma.$queryRaw<string[]>`
      INSERT INTO "main"."users" (
        "id", "name", "mail", "password", "image", "isActive", 
        "recoverPassword", "creationDate", "updateDate", "deletionDate"
      ) VALUES (
        ${v4()}, 
        ${user.name}, 
        ${user.mail}, 
        ${user.password}, 
        ${user.image}, 
        false, 
        ${v4()}, 
        ${new Date()}, 
        ${new Date()}, 
        null
      ) RETURNING "id"
    `;

    return createUser;
  }

  async Login(mail: string, password: string): Promise<User[]> {
    const user = await this.prisma.$queryRaw<User[]>`
      SELECT 
        "id", "name", "mail", "password", "image", "isActive", "recoverPassword"
      FROM "main"."users"
      WHERE "mail" = ${mail} AND "password" = ${password}
    `;
    return user;
  }

  async FindByEmail(mail: string): Promise<User[]> {
    const user = await this.prisma.$queryRaw<User[]>`
      SELECT 
        "id", "name", "mail", "password", "image", "isActive", "recoverPassword"
      FROM "main"."users"
      WHERE "mail" = ${mail} AND "deletionDate" IS NULL
    `;
    return user;
  }

  async FindUserById(id: string): Promise<User[]> {
    const user = await this.prisma.$queryRaw<User[]>`
      SELECT 
        "id", "name", "mail", "password", "image", "isActive", "recoverPassword"
      FROM "main"."users"
      WHERE "id" = ${id} AND "deletionDate" IS NULL
    `;
    return user;
  }

  async Update(user: updateUserDTO, id: string): Promise<void> {
    const updateQuery = this.prisma.$queryRaw`
      UPDATE "main"."users"
      SET
        "name" = ${user.name},
        "mail" = ${user.mail},
        "image" = ${user.image},
        "isActive" = ${user.isActive},
        "updateDate" = ${new Date()}
      WHERE "id" = ${id}
    `;

    if (user.password) {
      await this.prisma.$queryRaw`
        UPDATE "main"."users"
        SET
          "password" = ${user.password},
          "name" = ${user.name},
          "mail" = ${user.mail},
          "image" = ${user.image},
          "isActive" = ${user.isActive},
          "updateDate" = ${new Date()}
        WHERE "id" = ${id}
      `;
    } else {
      await updateQuery;
    }
  }

  async Delete(id: string): Promise<void> {
    await this.prisma.$queryRaw`
      UPDATE "main"."users"
      SET "deletionDate" = ${new Date()}
      WHERE "id" = ${id}
    `;
  }
}
