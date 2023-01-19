var isBrowser = require('./isBrowser');
var SingleEmitter = require('./SingleEmitter');

var isOn = false;
exports = {
    start: function() {
        isOn = true;
    },
    stop: function() {
        isOn = false;
    }
};
SingleEmitter.mixin(exports);

if (isBrowser) {
    window.addEventListener('error', function(event) {
        callListeners(event.error);
    });
    window.addEventListener('unhandledrejection', function(e) {
        callListeners(e.reason);
    });
} else {
    process.on('uncaughtException', callListeners);
    process.on('unhandledRejection', callListeners);
}

function callListeners(err) {
    if (!isOn) return;
    exports.emit(err);
}

module.exports = exports;
