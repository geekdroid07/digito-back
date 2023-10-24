import { FastifyReply } from 'fastify/types/reply';
import { FastifyRequest } from 'fastify/types/request';
import {
  SuccessResponse,
  BadRequestResponse
} from '../errors/ApiResponse';
import JWT from '../../infrastructure/core/JWT';

class AuthController {

  async RestrictedUser(req: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {
      const token = req.headers['x-jwt'];
      debugger
      const decoded = await JWT.decode(token.toString());
      if (typeof decoded === 'object' && decoded.hasOwnProperty('user')) {
        req['user'] = decoded['user'];
      }
    } catch (ex) {
      debugger
      new BadRequestResponse('an error has occurred').send(reply);
    }
    new SuccessResponse('Query Successful', {ok: true}).send(reply);
  }

}

export default AuthController;
