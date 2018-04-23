import { route, GET, POST, before } from 'awilix-koa';

@route('/data')
class DataController {

    constructor({ dataService }) {
        console.log(dataService);
        this.dataService = dataService;
    }

    @route("/get/:id")
    @GET()
    async getUser(ctx, next) {
        let result = await this.dataService.getData(ctx.params.id);
        // ctx.body = await ctx.render('./users/pages/index', { data: result });
        ctx.body = result;
    }
}

export default DataController;