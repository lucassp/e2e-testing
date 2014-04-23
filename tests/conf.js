// An example configuration file.
exports.config = {
    // The address of a running selenium server.
    seleniumAddress: 'http://localhost:4444/wd/hub',

    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        'browserName': 'firefox'
    },

    // Run on multiple browsers in parallel
//    multiCapabilities: [
//        {
//            'browserName' : 'chrome'
//        },
//        {
//            'browserName' : 'firefox'
//        }
//    ],

    baseUrl: "http://localhost:3000",

    // Spec patterns are relative to the current working directly when
    // protractor is called.
    specs: ['e2e_spec.js'],


    // Define suites
    // protractor conf.js --suite todolist
//    suites: {
//        todolist: 'tests/e2e/todolist/**/*_spec.js',
//        todo: ['tests/e2e/todo/**/*_spec.js']
//    },

    // Maps to browser.params inside tests
    params: {
        timestamp : Date.now()
    },

    // Runs before any of the test start running
    onPrepare: function() {
        browser.driver.manage().window().setSize(1600, 800);
    },

    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        showColors: true,
        isVerbose: true,
        defaultTimeoutInterval: 30000,
        includeStackTrace: true
    }
};
