import { createParamDecorator, ExecutionContext, InternalServerErrorException } from "@nestjs/common";


export const GetUser = createParamDecorator(

  (data, ctx: ExecutionContext) => {

    //-> Obtenemos la REQUEST
    const req = ctx.switchToHttp().getRequest();
    //-> ALMACENAMOS EL USER QUE YA GUARDO EL JWT MODULE
    const user = req.user;


    //? -> VALIDACIÓN 
    if (!user)
      throw new InternalServerErrorException('User not found (request)');

    return user;

  }

);