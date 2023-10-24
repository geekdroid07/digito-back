import { RouteOptions } from 'fastify/types/route';
import AuthController from '../controllers/AuthController';
import { SuccessResponse } from '../errors/ApiResponse';

const authController = new AuthController();

const routes: RouteOptions[] = [
  {
    method: "GET",
    url: "/ping",
    handler: (req, reply) => {
      new SuccessResponse('Query Successful', {ok: true}).send(reply)
    },
  },
  {
    method: "GET",
    url: "/restricted",
    handler: authController.RestrictedUser
  }
];

export default routes;
