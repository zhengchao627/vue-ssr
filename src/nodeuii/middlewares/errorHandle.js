export default {
    error(app, logger) {
        app.use(async (ctx, next) => {
            try {
                await next();
            } catch(error) {
                logger.error(error);
                ctx.status = error.status || 500;
                ctx.body = 500;
                //ctx.body = '<script type="text/javascript" src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js" charset="utf-8" homePageUrl="http://yoursite.com/yourPage.html" homePageName="回到我的主页"></script>';
            }
        
        });

        app.use(async (ctx, next) => {
            await next();
            if (500 !== ctx.status) return;
            ctx.status = 500;

            logger.error('服务器错误');
            ctx.body = '服务器错误';
        });

    }
}