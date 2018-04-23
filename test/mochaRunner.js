const Mocha = require('mocha');
const mocha = new Mocha({
    reporter: 'mochawesome',
    reporterOptions:{
        reportDir:'./doc/service-reporter'
    }
});
mocha.addFile('./test/service/router.spec.js');
mocha.run(function(){
    console.log("All done");
    process.exit();
});