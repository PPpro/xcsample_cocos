// HACK: strange, can't share the same global variable jsb
if (typeof jsb !== 'undefined') {
    let device = jsb.device = jsb.device || {};
    device.getDevicePixelRatio = function () { return 1; }

}