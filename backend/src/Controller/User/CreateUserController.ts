import { Request, Response } from "express";
import { SaveUserDTO } from "../../DTO/User/SaveUserDTO";
import { prisma } from "../../Config/db/prisma";
import { UserRepository } from "../../Repository/User";
import { UserService } from "../../Service/User";

export class CreateUserController {
  async execute(req: Request, res: Response) {
    
    const userRepository = new UserRepository(prisma);
    const userService = new UserService(userRepository);

    const { name, mail, password, image }: SaveUserDTO = req.body;
    const isUserExists = await userService.FindByEmail(mail);

    if (isUserExists?.length > 0) {
      return res.send({ message: "Email já cadastrado!" }).status(400);
    }

    const user = await userService.Save({ name, mail, password, image });

    if (user) {
      return res
        .status(201)
        .send({ message: "Usuário cadastrado com sucesso!" });
    }

    return res.send({ message: "Erro ao cadastrar usuário!" }).status(400);
  }
}