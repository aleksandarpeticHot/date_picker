define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = findHTMLElement;
    function findHTMLElement(e) {
        if (e && 'current' in e) {
            // Handle React ref objects (React.createRef or useRef)
            return e.current instanceof HTMLElement ? e.current : null;
        }
        else if (e instanceof HTMLElement) {
            // Handle direct HTMLElement instances
            return e;
        }
        return null;
    }
});
