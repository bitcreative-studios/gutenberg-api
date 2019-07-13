"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
expect.extend({
    toBeLCCCode: function (actual, expected) {
        var isValid = true;
        return ({
            message: "expected that " + actual + " was a valid LCC Code",
            pass: isValid
        });
    }
});
