import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayLoad {
  sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {


  const authHeader = request.headers.authorization;

  if(!authHeader) {
    return response.status(401).json({error: "Token is missing"});
  }

  const [, token] = authHeader.split(" ");

  try {
    
    const { sub: userId } = verify(token, "hudzord") as IPayLoad;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(userId);

    if(!user) {
      return response.status(401).json({error: "User does not exists!"});
    }
    
    request.user = {
      id: user.id,
    }

    next();
  } catch (e) {
    return response.status(401).json({error: "Invalid token"});
  }
}