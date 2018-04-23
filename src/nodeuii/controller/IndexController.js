import {
    route,
    GET,
    POST,
    before
} from 'awilix-koa';

import {
    createBundleRenderer
} from 'vue-server-renderer';
import fs from 'fs';
import path from 'path';
import cheerio from 'cheerio';

//创建数据流
function createRenderer(bundle, template, clientManifest) {
    return createBundleRenderer(bundle, {
        runInNewContext: false, // 推荐
        template,
        clientManifest
    })
}

@route('/index')
@route('/home')
class IndexController {

    constructor({
        userService
    }) {
        this.userService = userService;
    }
    

    @GET()
    async getIndex(ctx, next) {
        /* vuessr */
        const rootPath = path.join(__dirname, '..');

        const serverBundle = require(rootPath + '/assets/vue-ssr-server-bundle.json');
        const clientManifest = require(rootPath + '/assets/vue-ssr-client-manifest.json');
        const template = fs.readFileSync(rootPath + '/assets/index.html', 'utf-8');

        const $ = cheerio.load(template);
        $('title').html('🉐️Boss');
        $("head").append(' <meta name="keywords" content=SSR>');

        const renderer = createRenderer(serverBundle, $.html(), clientManifest);

        const context = {
            url: ctx.url
        }

        function createSsrStreamPromise() {

            return new Promise((resolve, reject) => {
                console.log(11111);
                console.log(context);
                if (!renderer) {
                    return ctx.body = 'waiting for compilation.. refresh in a moment.'
                }

                const ssrStream = renderer.renderToStream(context);

                ctx.status = 200;
                ctx.type = 'html';
                // resolve();
                ssrStream.on('error', err => {
                    reject(err)
                }).pipe(ctx.res);
            });
        }


        // 这里无需传入一个应用程序，因为在执行 bundle 时已经自动创建过。
        // // 现在我们的服务器与应用程序已经解耦！
        // renderer.renderToString(context, (err, html) => {
        //     console.log(html);
        //     // 处理异常……
        //     ctx.body = html;
        // })

        await createSsrStreamPromise();
    }
}

export default IndexController;