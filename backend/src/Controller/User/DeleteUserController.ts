import { Request, Response } from "express";
import { prisma } from "../../Config/db/prisma";
import { UserRepository } from "../../Repository/User";
import { UserService } from "../../Service/User";

export class DeleteUserController {
  async execute(req: Request, res: Response) {
    const id = req.user_id;

    const userRepository = new UserRepository(prisma);
    const userService = new UserService(userRepository);

    const userDelete = await userService.Delete(id);

    if (!userDelete) {
      return res.status(400).send({ message: "Houve um erro ao apagar conta" });
    }

    return res.status(200).send({ message: "Conta apagada com sucesso" });
  }
}
