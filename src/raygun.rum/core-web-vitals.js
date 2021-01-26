/**
 * @prettier
 */

/*
 * raygun4js
 * https://github.com/MindscapeHQ/raygun4js
 *
 * Copyright (c) 2021 MindscapeHQ
 * Licensed under the MIT license.
 */

var WebVitalTimingType = "w";

window.raygunCoreWebVitalFactory = function(window) {
    var CoreWebVitals = function(){};
    var queueTimings = null;

    CoreWebVitals.prototype.attach = function(queueHandler) {
        queueTimings = queueHandler;

        window.webVitals.getLCP(this.handler);
        window.webVitals.getFID(this.handler);
        window.webVitals.getCLS(this.handler);
    };

    CoreWebVitals.prototype.handler = function(event) {
        var webVitalEvent = {
            uri: event.name,
            timing: {
                t: WebVitalTimingType,
                du: event.value
            }
        };
        
        queueTimings(webVitalEvent);
    };

    return new CoreWebVitals();
};