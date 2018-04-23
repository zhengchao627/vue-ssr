import { route, GET, POST, before } from 'awilix-koa';

@route('/user')
class UserController {

    constructor({ userService }) {
        console.log(userService);
        this.userService = userService;
    }

    @route("/:id")
    @GET()
    async getUser(ctx, next) {
        console.log(123);
        let result = await this.userService.getData(ctx.params.id);
        // ctx.body = await ctx.render('./users/pages/index', { data: result });
        ctx.body = result;
    }
}

export default UserController;