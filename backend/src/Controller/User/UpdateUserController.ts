import { Request, Response } from "express";
import { updateUserDTO } from "../../DTO/User/UpdateUserDTO";
import { prisma } from "../../Config/db/prisma";
import { UserRepository } from "../../Repository/User";
import { UserService } from "../../Service/User";

export class UpdateUserController {
  async execute(req: Request, res: Response) {
    const { isActive, mail, image, name, password }: updateUserDTO = req.body;
    const id = req.user_id;

    const userRepository = new UserRepository(prisma);
    const userService = new UserService(userRepository);

    const user = await userService.Update(
      {
        isActive,
        mail,
        image,
        name,
        password,
      },
      id
    );

    if (!user) {
      return res.send({ message: "Erro ao atualizar usuário!" }).status(400);
    }

    return res.send({ message: "Usuário atualizado com sucesso!" }).status(200);
  }
}
