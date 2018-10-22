var fs = require('fs');
var assert = require('assert');
var TestUtilities = (function () {
    function TestUtil() {
        this.configBasePath = "./properties/properties";
        this.confApplicationRequestPath = null;
        this.confApplicationDataPath = null;
        this.confEnvURL = null;
    }
    /**
     * Get EnvURL variable value
     * @param app_env
     * @returns {null}
     */
    TestUtil.prototype.getEnvURL = function () {
        if (this.confEnvURL == null) {
            var cf = fs.readFileSync(this.configBasePath + '.json');
            this.confEnvURL = JSON.parse(cf).baseUrl;
        }
        return (this.confEnvURL);
    };
    /**
     * Get ApplicationRequestPath variable value
     * @param app_env
     * @returns {String}
     */
    TestUtil.prototype.getApplicationRequestPath = function () {
        if (this.confApplicationRequestPath == null) {
            var cf = fs.readFileSync(this.configBasePath +'.json');
            return (JSON.parse(cf).applicationRequestPath);
        }
        return (this.confApplicationRequestPath);
    };
    /**
     * Get ApplicationDataPath variable value
     * @param app_env
     * @returns {String}
     */
    TestUtil.prototype.getApplicationDataPath = function () {
        if (this.confApplicationDataPath == null) {
            var cf = fs.readFileSync(this.configBasePath +'.json');
            return (JSON.parse(cf).applicationDataPath);
        }
        return (this.confApplicationDataPath);
    };
    /**
     * Validate actualResponse with expectedResponse
     * @param actualResponse, expectedResponse
     * @returns Assert error if mismatch
     */
    TestUtil.prototype.verifyResponse = function (obj1, obj2) {
        for (var key in obj2) {
            if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
                new TestUtil().verifyResponse(obj1[key], obj2[key]);
            }
            else {
                if (obj2[key] == "anyValue") {
                    if (obj1[key] == "" || obj1[key] == undefined) {
                        assert.equal(obj1[key], obj2[key], "Expected:" + JSON.stringify(obj2[key]) + "\nActual:" + JSON.stringify(obj1[key]));
                    }
                    else {
                    }
                }
                else {
                    assert.equal(obj1[key], obj2[key], "Expected:" + JSON.stringify(obj2[key]) + "\nActual:" + JSON.stringify(obj1[key]));
                }
            }
        }
    };
    return TestUtil;
}());
exports.TestUtil = TestUtilities;
//# sourceMappingURL=test-utilities.js.map
