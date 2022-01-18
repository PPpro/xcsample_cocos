console.log('pptest main index')
// System.register("chunks:///_virtual/NewComponent.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
//   'use strict';

//   var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, Node, _decorator, Component, input, Input, view, Vec3;

//   return {
//     setters: [function (module) {
//       _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
//       _initializerDefineProperty = module.initializerDefineProperty;
//     }, function (module) {
//       cclegacy = module.cclegacy;
//       Node = module.Node;
//       _decorator = module._decorator;
//       Component = module.Component;
//       input = module.input;
//       Input = module.Input;
//       view = module.view;
//       Vec3 = module.Vec3;
//     }],
//     execute: function () {
//       var _dec, _dec2, _class, _class2, _descriptor, _temp;

//       cclegacy._RF.push({}, "a738bz4WH5KA7tclxulgyoX", "NewComponent", undefined);

//       const {
//         ccclass,
//         property
//       } = _decorator;
//       /**
//        * Predefined variables
//        * Name = NewComponent
//        * DateTime = Mon Jan 10 2022 13:55:13 GMT+0800 (中国标准时间)
//        * Author = unbrella_man
//        * FileBasename = NewComponent.ts
//        * FileBasenameNoExtension = NewComponent
//        * URL = db://assets/NewComponent.ts
//        * ManualUrl = https://docs.cocos.com/creator/3.5/manual/en/
//        *
//        */

//       let NewComponent = exports('NewComponent', (_dec = ccclass('NewComponent'), _dec2 = property(Node), _dec(_class = (_class2 = (_temp = class NewComponent extends Component {
//         constructor(...args) {
//           super(...args);

//           _initializerDefineProperty(this, "logo", _descriptor, this);
//         }

//         start() {
//           input.on(Input.EventType.TOUCH_START, this.move, this);
//           input.on(Input.EventType.TOUCH_MOVE, this.move, this);
//           input.on(Input.EventType.TOUCH_END, this.move, this);
//         }

//         move(e) {
//           const location = e.getUILocation();
//           const vs = view.getVisibleSize();
//           this.logo.setPosition(new Vec3(location.x - vs.width / 2, location.y - vs.height / 2, 1));
//         }

//       }, _temp), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "logo", [_dec2], {
//         configurable: true,
//         enumerable: true,
//         writable: true,
//         initializer: null
//       }), _class2)) || _class));
//       /**
//        * [1] Class member could be defined like this.
//        * [2] Use `property` decorator if your want the member to be serializable.
//        * [3] Your initialization goes here.
//        * [4] Your update function goes here.
//        *
//        * Learn more about scripting: https://docs.cocos.com/creator/3.5/manual/en/scripting/
//        * Learn more about CCClass: https://docs.cocos.com/creator/3.5/manual/en/scripting/ccclass.html
//        * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.5/manual/en/scripting/life-cycle-callbacks.html
//        */

//       cclegacy._RF.pop();
//     }
//   };
// });

// System.register("chunks:///_virtual/main", ['./NewComponent.ts'], function () {
//   'use strict';

//   return {
//     setters: [null],
//     execute: function () {}
//   };
// });

// (function(r) {
//   r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main'); 
// })(function(mid, cid) {
//     System.register(mid, [cid], function (_export, _context) {
//     return {
//         setters: [function(_m) {
//             var _exportObj = {};

//             for (var _key in _m) {
//               if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
//             }
      
//             _export(_exportObj);
//         }],
//         execute: function () { }
//     };
//     });
// });