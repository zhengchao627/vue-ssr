const superagent = require('supertest');
const app = require("../../build/app.js");

function request() {
    return superagent(app.listen());
}

describe("NodeUII自动化测试脚本",function(){
    describe("API接口测试", function() {
        it("获取测试数据", function(done) {
            request()
                .get('/')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(200)
                .end(function(err, response) {
                    if(response.body.data === "Hello home") {
                        done();
                    } else {
                        done(new Error("测试数据不对"));
                    }
                })
        })
    });

    describe("容错测试",function(){
        it('测试404脚本容错http code',function(done){
            request()
            .get("/message/notfound")
            .expect(500,done);
        });
    });
})