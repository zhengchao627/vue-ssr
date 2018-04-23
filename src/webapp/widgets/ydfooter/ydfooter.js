require("./ydfooter.css");
require("../common/test.css");
const test = require("../common/test");
const ydfooter ={
    init(){
        const s = "init ydfooter";
        console.log(s);
        test.hello();
    }
}
export default ydfooter;