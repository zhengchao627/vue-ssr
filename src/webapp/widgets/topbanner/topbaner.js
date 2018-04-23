require("./topbanner.css");
require("../common/test.css");
const test = require("../common/test");
const topbanner ={
    init(){
        const s = "init topbanner";
        console.log(s);
        test.hello();
    }
}
export default topbanner;
