import display from '@ohos.display';

window.oh = {};

module.exports = function systemReady () {
    return new Promise(resolve => {
        // HACK: strange, can't share the same global variable jsb
        if (typeof jsb !== 'undefined') {
            let device = jsb.device = {};
            device.getDevicePixelRatio = function () { return 1; }

        }

        display.getDefaultDisplay((err, data) => {
            window.oh.display = data;
            console.log('pptest display' +  data.width.toString()  + data.height.toString())
            resolve();
        });
    })

}