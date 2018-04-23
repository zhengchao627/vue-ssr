import Koa from 'koa';
import log4js from 'log4js';
import serve from 'koa-static';
import render from 'koa-swig';
import co from 'co';
import config from './config';

import errorHandle from './middlewares/errorHandle';

const {
    asClass,
    asValue,
    createContainer,
    Lifetime
} = require('awilix');
const {
    loadControllers,
    scopePerRequest
} = require('awilix-koa');

log4js.configure({
    appenders: {
        cheese: {
            type: 'file',
            filename: 'dist/log/growup.log'
        }
    },
    categories: {
        default: {
            appenders: ['cheese'],
            level: 'info'
        }
    }
});

const logger = log4js.getLogger('cheese');

const app = new Koa();

const container = createContainer();
app.use(scopePerRequest(container));
/**
 * 注册controller
 */
app.use(loadControllers('controller/*.js', {
    cwd: __dirname
}));
/**
 * 注册service
 */
container.loadModules([__dirname + '/service/*.js'], {
    formatName: 'camelCase',
    resolverOptions: {
        lifetime: Lifetime.SCOPED
    }
});

/**
 * 配置静态资源
 */
app.use(serve(config.staticDir));
/**
 * 配置swig模板,废弃->vuessr
 */
// app.context.render = co.wrap(render({
//     root: config.viewDir,
//     autoescape: true,
//     cache: 'memory', // disable, set to false 
//     ext: 'html',
//     writeBody: false
// }));

errorHandle.error(app, logger);

app.listen(config.port, () => {
    console.log(`server is started on ${config.port}`)
})

module.exports = app;