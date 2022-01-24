System.register("chunks:///_virtual/Bullet.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './Constant.ts', './PoolManager.ts'], function (exports) {
  'use strict';

  var _defineProperty, cclegacy, _decorator, Component, Collider, Constant, PoolManager;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
      Collider = module.Collider;
    }, function (module) {
      Constant = module.Constant;
    }, function (module) {
      PoolManager = module.PoolManager;
    }],
    execute: function () {
      var _dec, _class, _temp;

      cclegacy._RF.push({}, "016d0bZIrlBGY2GbVGZZg1M", "Bullet", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      /**
       * Predefined variables
       * Name = Bullet
       * DateTime = Mon Nov 15 2021 14:58:43 GMT+0800 (China Standard Time)
       * Author = mywayday
       * FileBasename = Bullet.ts
       * FileBasenameNoExtension = Bullet
       * URL = db://assets/script/bullet/Bullet.ts
       * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
       *
       */

      let Bullet = exports('Bullet', (_dec = ccclass('Bullet'), _dec(_class = (_temp = class Bullet extends Component {
        constructor(...args) {
          super(...args);

          _defineProperty(this, "_bulletSpeed", 0);

          _defineProperty(this, "_direction", Constant.Direction.MIDDLE);

          _defineProperty(this, "_isEnemyBullet", false);
        }

        onEnable() {
          const collider = this.getComponent(Collider);
          collider.on('onTriggerEnter', this._onTriggerEnter, this);
        }

        onDisable() {
          const collider = this.getComponent(Collider);
          collider.off('onTriggerEnter', this._onTriggerEnter, this);
        }

        update(deltaTime) {
          const pos = this.node.position;
          let moveLength = 0;

          if (this._isEnemyBullet) {
            moveLength = pos.z + this._bulletSpeed;
            this.node.setPosition(pos.x, pos.y, moveLength);

            if (moveLength > 50) {
              // this.node.destroy();
              PoolManager.instance().putNode(this.node); // console.log('bullet destroy');
            }
          } else {
            moveLength = pos.z - this._bulletSpeed;

            if (this._direction === Constant.Direction.LEFT) {
              this.node.setPosition(pos.x - this._bulletSpeed * 0.2, pos.y, moveLength);
            } else if (this._direction === Constant.Direction.RIGHT) {
              this.node.setPosition(pos.x + this._bulletSpeed * 0.2, pos.y, moveLength);
            } else {
              this.node.setPosition(pos.x, pos.y, moveLength);
            }

            if (moveLength < -50) {
              // this.node.destroy();
              PoolManager.instance().putNode(this.node); // console.log('bullet destroy');
            }
          }
        }

        show(speed, isEnemyBullet, direction = Constant.Direction.MIDDLE) {
          this._bulletSpeed = speed;
          this._isEnemyBullet = isEnemyBullet;
          this._direction = direction;
        }

        _onTriggerEnter(event) {
          // console.log('trigger  bullet destroy');
          // this.node.destroy();
          PoolManager.instance().putNode(this.node);
        }

      }, _temp)) || _class));
      /**
       * [1] Class member could be defined like this.
       * [2] Use `property` decorator if your want the member to be serializable.
       * [3] Your initialization goes here.
       * [4] Your update function goes here.
       *
       * Learn more about scripting: https://docs.cocos.com/creator/3.3/manual/en/scripting/
       * Learn more about CCClass: https://docs.cocos.com/creator/3.3/manual/en/scripting/ccclass.html
       * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.3/manual/en/scripting/life-cycle-callbacks.html
       */

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/GameManager.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './Constant.ts', './PoolManager.ts', './Bullet.ts', './BulletProp.ts', './EnemyPlane.ts', './SelfPlane.ts', './AudioManager.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, _defineProperty, cclegacy, Prefab, Node, Label, Animation, _decorator, Component, math, BoxCollider, macro, Constant, PoolManager, Bullet, BulletProp, EnemyPlane, SelfPlane, AudioManager;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Prefab = module.Prefab;
      Node = module.Node;
      Label = module.Label;
      Animation = module.Animation;
      _decorator = module._decorator;
      Component = module.Component;
      math = module.math;
      BoxCollider = module.BoxCollider;
      macro = module.macro;
    }, function (module) {
      Constant = module.Constant;
    }, function (module) {
      PoolManager = module.PoolManager;
    }, function (module) {
      Bullet = module.Bullet;
    }, function (module) {
      BulletProp = module.BulletProp;
    }, function (module) {
      EnemyPlane = module.EnemyPlane;
    }, function (module) {
      SelfPlane = module.SelfPlane;
    }, function (module) {
      AudioManager = module.AudioManager;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _dec20, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _descriptor20, _descriptor21, _descriptor22, _descriptor23, _descriptor24, _descriptor25, _temp;

      cclegacy._RF.push({}, "83611dElfRHkaQJyGfbjwko", "GameManager", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      /**
       * Predefined variables
       * Name = GameManager
       * DateTime = Mon Nov 15 2021 16:15:32 GMT+0800 (China Standard Time)
       * Author = mywayday
       * 
       * FileBasename = GameManager.ts
       * FileBasenameNoExtension = GameManager
       * URL = db://assets/script/framework/GameManager.ts
       * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
       *
       */

      let GameManager = exports('GameManager', (_dec = ccclass('GameManager'), _dec2 = property(SelfPlane), _dec3 = property(Prefab), _dec4 = property(Prefab), _dec5 = property(Prefab), _dec6 = property(Prefab), _dec7 = property(Prefab), _dec8 = property(Node), _dec9 = property(Prefab), _dec10 = property(Prefab), _dec11 = property(Prefab), _dec12 = property(Prefab), _dec13 = property(Prefab), _dec14 = property(Prefab), _dec15 = property(Node), _dec16 = property(Node), _dec17 = property(Label), _dec18 = property(Label), _dec19 = property(Animation), _dec20 = property(AudioManager), _dec(_class = (_class2 = (_temp = class GameManager extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "playerPlane", _descriptor, this);

          _initializerDefineProperty(this, "bullet01", _descriptor2, this);

          _initializerDefineProperty(this, "bullet02", _descriptor3, this);

          _initializerDefineProperty(this, "bullet03", _descriptor4, this);

          _initializerDefineProperty(this, "bullet04", _descriptor5, this);

          _initializerDefineProperty(this, "bullet05", _descriptor6, this);

          _initializerDefineProperty(this, "shootTime", _descriptor7, this);

          _initializerDefineProperty(this, "bulletSpeed", _descriptor8, this);

          _initializerDefineProperty(this, "bulletRoot", _descriptor9, this);

          _initializerDefineProperty(this, "enemy01", _descriptor10, this);

          _initializerDefineProperty(this, "enemy02", _descriptor11, this);

          _initializerDefineProperty(this, "createEnemyTime", _descriptor12, this);

          _initializerDefineProperty(this, "enemy1Speed", _descriptor13, this);

          _initializerDefineProperty(this, "enemy2Speed", _descriptor14, this);

          _initializerDefineProperty(this, "enemyExplode", _descriptor15, this);

          _initializerDefineProperty(this, "bulletPropM", _descriptor16, this);

          _initializerDefineProperty(this, "bulletPropH", _descriptor17, this);

          _initializerDefineProperty(this, "bulletPropS", _descriptor18, this);

          _initializerDefineProperty(this, "bulletPropSpeed", _descriptor19, this);

          _initializerDefineProperty(this, "gamePage", _descriptor20, this);

          _initializerDefineProperty(this, "gameOverPage", _descriptor21, this);

          _initializerDefineProperty(this, "gameScore", _descriptor22, this);

          _initializerDefineProperty(this, "gameOverScore", _descriptor23, this);

          _initializerDefineProperty(this, "overAnim", _descriptor24, this);

          _initializerDefineProperty(this, "audioEffect", _descriptor25, this);

          _defineProperty(this, "isGameStart", false);

          _defineProperty(this, "_currShootTime", 0);

          _defineProperty(this, "_isShooting", false);

          _defineProperty(this, "_currCreateEnemyTime", 0);

          _defineProperty(this, "_combinationInterval", Constant.Combination.PLAN1);

          _defineProperty(this, "_bulletType", Constant.BulletPropType.BULLET_M);

          _defineProperty(this, "_score", 0);
        }

        start() {
          this._init();
        }

        update(deltaTime) {
          if (!this.isGameStart) {
            return;
          }

          if (this.playerPlane.isDie) {
            this.gameOver();
            return;
          }

          this._currShootTime += deltaTime;

          if (this._isShooting && this._currShootTime > this.shootTime) {
            if (this._bulletType === Constant.BulletPropType.BULLET_H) {
              this.createPlayerBulletH();
            } else if (this._bulletType === Constant.BulletPropType.BULLET_S) {
              this.createPlayerBulletS();
            } else {
              this.createPlayerBulletM();
            }

            const name = 'bullet' + (this._bulletType % 2 + 1);
            this.playAudioEffect(name);
            this._currShootTime = 0;
          }

          this._currCreateEnemyTime += deltaTime;

          if (this._combinationInterval === Constant.Combination.PLAN1) {
            if (this._currCreateEnemyTime > this.createEnemyTime) {
              this.createEnemyPlane();
              this._currCreateEnemyTime = 0;
            }
          } else if (this._combinationInterval === Constant.Combination.PLAN2) {
            if (this._currCreateEnemyTime > this.createEnemyTime * 3) {
              const randomCombination = math.randomRangeInt(1, 3);

              if (randomCombination === Constant.Combination.PLAN2) {
                this.createCombination1();
              } else {
                this.createEnemyPlane();
              }

              this._currCreateEnemyTime = 0;
            }
          } else {
            if (this._currCreateEnemyTime > this.createEnemyTime * 2) {
              const randomCombination = math.randomRangeInt(1, 4);

              if (randomCombination === Constant.Combination.PLAN2) {
                this.createCombination1();
              } else if (randomCombination === Constant.Combination.PLAN3) {
                this.createCombination2();
              } else {
                this.createEnemyPlane();
              }

              this._currCreateEnemyTime = 0;
            }
          }
        }

        returnMain() {
          this._currShootTime = 0;
          this._currCreateEnemyTime = 0;
          this._combinationInterval = Constant.Combination.PLAN1;
          this._bulletType = Constant.BulletPropType.BULLET_M;
          this.playerPlane.node.setPosition(0, 0, 15);
          this._score = 0;
        }

        gameStart() {
          this.isGameStart = true;

          this._changePlaneMode();

          this._score = 0;
          this.gameScore.string = this._score.toString();
          this.playerPlane.init();
        }

        gameReStart() {
          this.gameStart();
          this._currShootTime = 0;
          this._currCreateEnemyTime = 0;
          this._combinationInterval = Constant.Combination.PLAN1;
          this._bulletType = Constant.BulletPropType.BULLET_M;
          this.playerPlane.node.setPosition(0, 0, 15);
        }

        gameOver() {
          this.isGameStart = false;
          this.gamePage.active = false;
          this.gameOverPage.active = true;
          this.gameOverScore.string = this._score.toString();
          this.overAnim.play();
          this._isShooting = false; // this.playerPlane.init();

          this.unschedule(this._modeChanged);

          this._destroyAll();
        }

        addScore() {
          this._score++;
          this.gameScore.string = this._score.toString();
        }

        createPlayerBulletM() {
          const bullet = PoolManager.instance().getNode(this.bullet01, this.bulletRoot);
          const pos = this.playerPlane.node.position;
          bullet.setPosition(pos.x, pos.y, pos.z - 7);
          const bulletComp = bullet.getComponent(Bullet);
          bulletComp.show(this.bulletSpeed, false);
        }

        createPlayerBulletH() {
          const pos = this.playerPlane.node.position; // left
          // const bullet1 = instantiate(this.bullet03);

          const bullet1 = PoolManager.instance().getNode(this.bullet03, this.bulletRoot); // bullet1.setParent(this.bulletRoot);

          bullet1.setPosition(pos.x - 2.5, pos.y, pos.z - 7);
          const bulletComp1 = bullet1.getComponent(Bullet);
          bulletComp1.show(this.bulletSpeed, false); // right

          const bullet2 = PoolManager.instance().getNode(this.bullet03, this.bulletRoot); // bullet2.setParent(this.bulletRoot);

          bullet2.setPosition(pos.x + 2.5, pos.y, pos.z - 7);
          const bulletComp2 = bullet2.getComponent(Bullet);
          bulletComp2.show(this.bulletSpeed, false);
        }

        createPlayerBulletS() {
          const pos = this.playerPlane.node.position; // middle
          // const bullet = instantiate(this.bullet05);

          const bullet = PoolManager.instance().getNode(this.bullet05, this.bulletRoot); // bullet.setParent(this.bulletRoot);

          bullet.setPosition(pos.x, pos.y, pos.z - 7);
          const bulletComp = bullet.getComponent(Bullet);
          bulletComp.show(this.bulletSpeed, false); // left

          const bullet1 = PoolManager.instance().getNode(this.bullet05, this.bulletRoot); // bullet1.setParent(this.bulletRoot);

          bullet1.setPosition(pos.x - 4, pos.y, pos.z - 7);
          const bulletComp1 = bullet1.getComponent(Bullet);
          bulletComp1.show(this.bulletSpeed, false, Constant.Direction.LEFT); // right

          const bullet2 = PoolManager.instance().getNode(this.bullet05, this.bulletRoot); // bullet2.setParent(this.bulletRoot);

          bullet2.setPosition(pos.x + 4, pos.y, pos.z - 7);
          const bulletComp2 = bullet2.getComponent(Bullet);
          bulletComp2.show(this.bulletSpeed, false, Constant.Direction.RIGHT);
        }

        createEnemyBullet(targetPos) {
          // const bullet = instantiate(this.bullet01);
          const bullet = PoolManager.instance().getNode(this.bullet02, this.bulletRoot); // bullet.setParent(this.bulletRoot);

          bullet.setPosition(targetPos.x, targetPos.y, targetPos.z + 6);
          const bulletComp = bullet.getComponent(Bullet);
          bulletComp.show(1, true);
          const colliderComp = bullet.getComponent(BoxCollider);
          colliderComp.setGroup(Constant.CollisionType.ENEMY_BULLET);
          colliderComp.setMask(Constant.CollisionType.SELF_PLANE);
        }

        createEnemyPlane() {
          const whichEnemy = math.randomRangeInt(1, 3);
          let prefab = null;
          let speed = 0;

          if (whichEnemy === Constant.EnemyType.TYPE1) {
            prefab = this.enemy01;
            speed = this.enemy1Speed;
          } else {
            prefab = this.enemy02;
            speed = this.enemy2Speed;
          } // const enemy = instantiate(prefab);


          const enemy = PoolManager.instance().getNode(prefab, this.node); // enemy.setParent(this.node);

          const enemyComp = enemy.getComponent(EnemyPlane);
          enemyComp.show(this, speed, true);
          const randomPos = math.randomRangeInt(-25, 26);
          enemy.setPosition(randomPos, 0, -50);
        }

        createCombination1() {
          const enemyArray = new Array(5);

          for (let i = 0; i < enemyArray.length; i++) {
            // enemyArray[i] = instantiate(this.enemy01);
            enemyArray[i] = PoolManager.instance().getNode(this.enemy01, this.node);
            const element = enemyArray[i]; // element.parent = this.node;

            element.setPosition(-20 + i * 10, 0, -50);
            const enemyComp = element.getComponent(EnemyPlane);
            enemyComp.show(this, this.enemy1Speed, false);
          }
        }

        createCombination2() {
          const enemyArray = new Array(7);
          const combinationPos = [-21, 0, -60, -14, 0, -55, -7, 0, -50, 0, 0, -45, 7, 0, -50, 14, 0, -55, 21, 0, -60];

          for (let i = 0; i < enemyArray.length; i++) {
            enemyArray[i] = PoolManager.instance().getNode(this.enemy02, this.node); // enemyArray[i] = instantiate(this.enemy02);

            const element = enemyArray[i];
            element.parent = this.node;
            const startIndex = i * 3;
            element.setPosition(combinationPos[startIndex], combinationPos[startIndex + 1], combinationPos[startIndex + 2]);
            const enemyComp = element.getComponent(EnemyPlane);
            enemyComp.show(this, this.enemy2Speed, false);
          }
        }

        createEnemyEffect(pos) {
          const effect = PoolManager.instance().getNode(this.enemyExplode, this.node);
          effect.setPosition(pos);
        }

        createBulletProp() {
          const randomProp = math.randomRangeInt(1, 4);
          let prefab = null;

          if (randomProp === Constant.BulletPropType.BULLET_H) {
            prefab = this.bulletPropH;
          } else if (randomProp === Constant.BulletPropType.BULLET_H) {
            prefab = this.bulletPropS;
          } else {
            prefab = this.bulletPropM;
          } // const prop = instantiate(prefab);


          const prop = PoolManager.instance().getNode(prefab, this.node); // prop.setParent(this.node);

          prop.setPosition(15, 0, -50);
          const propComp = prop.getComponent(BulletProp);
          propComp.show(this, -this.bulletPropSpeed);
        }

        isShooting(value) {
          this._isShooting = value;
        }

        changeBulletType(type) {
          this._bulletType = type;
        }

        playAudioEffect(name) {
          this.audioEffect.play(name);
        }

        _init() {
          this._currShootTime = this.shootTime;
          this.playerPlane.init();
        }

        _changePlaneMode() {
          this.schedule(this._modeChanged, 10, macro.REPEAT_FOREVER);
        }

        _modeChanged() {
          this._combinationInterval++;
          this.createBulletProp();
        }

        _destroyAll() {
          let children = this.node.children;
          let length = children.length;
          let i = 0;

          for (i = length - 1; i >= 0; i--) {
            const child = children[i];
            PoolManager.instance().putNode(child); // child.destroy();
          }

          children = this.bulletRoot.children;
          length = children.length;

          for (i = length - 1; i >= 0; i--) {
            const child = children[i];
            PoolManager.instance().putNode(child); // child.destroy();
          }
        }

      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "playerPlane", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "bullet01", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "bullet02", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "bullet03", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "bullet04", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "bullet05", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "shootTime", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0.3;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "bulletSpeed", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 1;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "bulletRoot", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "enemy01", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "enemy02", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "createEnemyTime", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 1;
        }
      }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "enemy1Speed", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0.5;
        }
      }), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "enemy2Speed", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0.7;
        }
      }), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "enemyExplode", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor16 = _applyDecoratedDescriptor(_class2.prototype, "bulletPropM", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor17 = _applyDecoratedDescriptor(_class2.prototype, "bulletPropH", [_dec13], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor18 = _applyDecoratedDescriptor(_class2.prototype, "bulletPropS", [_dec14], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor19 = _applyDecoratedDescriptor(_class2.prototype, "bulletPropSpeed", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0.3;
        }
      }), _descriptor20 = _applyDecoratedDescriptor(_class2.prototype, "gamePage", [_dec15], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor21 = _applyDecoratedDescriptor(_class2.prototype, "gameOverPage", [_dec16], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor22 = _applyDecoratedDescriptor(_class2.prototype, "gameScore", [_dec17], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor23 = _applyDecoratedDescriptor(_class2.prototype, "gameOverScore", [_dec18], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor24 = _applyDecoratedDescriptor(_class2.prototype, "overAnim", [_dec19], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor25 = _applyDecoratedDescriptor(_class2.prototype, "audioEffect", [_dec20], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));
      /**
       * [1] Class member could be defined like this.
       * [2] Use `property` decorator if your want the member to be serializable.
       * [3] Your initialization goes here.
       * [4] Your update function goes here.
       *
       * Learn more about scripting: https://docs.cocos.com/creator/3.3/manual/en/scripting/
       * Learn more about CCClass: https://docs.cocos.com/creator/3.3/manual/en/scripting/ccclass.html
       * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.3/manual/en/scripting/life-cycle-callbacks.html
       */

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/BulletProp.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './Constant.ts', './PoolManager.ts'], function (exports) {
  'use strict';

  var _defineProperty, cclegacy, _decorator, Component, Collider, Constant, PoolManager;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
      Collider = module.Collider;
    }, function (module) {
      Constant = module.Constant;
    }, function (module) {
      PoolManager = module.PoolManager;
    }],
    execute: function () {
      var _dec, _class, _temp;

      cclegacy._RF.push({}, "83e2f0O6xJMU7LXZMbv8Q8U", "BulletProp", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      /**
       * Predefined variables
       * Name = BulletProp
       * DateTime = Thu Nov 18 2021 19:53:50 GMT+0800 (China Standard Time)
       * Author = mywayday
       * FileBasename = BulletProp.ts
       * FileBasenameNoExtension = BulletProp
       * URL = db://assets/script/bullet/BulletProp.ts
       * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
       *
       */

      let BulletProp = exports('BulletProp', (_dec = ccclass('BulletProp'), _dec(_class = (_temp = class BulletProp extends Component {
        constructor(...args) {
          super(...args);

          _defineProperty(this, "_propSpeed", 0.3);

          _defineProperty(this, "_propXSpeed", 0.3);

          _defineProperty(this, "_gameManager", null);
        }

        onEnable() {
          const collider = this.getComponent(Collider);
          collider.on('onTriggerEnter', this._onTriggerEnter, this);
        }

        onDisable() {
          const collider = this.getComponent(Collider);
          collider.off('onTriggerEnter', this._onTriggerEnter, this);
        }

        update(deltaTime) {
          let pos = this.node.position;

          if (pos.x >= 15) {
            this._propXSpeed = this._propSpeed;
          } else if (pos.x <= -15) {
            this._propXSpeed = -this._propSpeed;
          }

          this.node.setPosition(pos.x + this._propXSpeed, pos.y, pos.z - this._propSpeed);
          pos = this.node.position;

          if (pos.z > 50) {
            // this.node.destroy();
            PoolManager.instance().putNode(this.node);
          }
        }

        show(gameManager, speed) {
          this._gameManager = gameManager;
          this._propSpeed = speed;
        }

        _onTriggerEnter(event) {
          const name = event.selfCollider.node.name;

          if (name === 'bulletH') {
            this._gameManager.changeBulletType(Constant.BulletPropType.BULLET_H);
          } else if (name === 'bulletS') {
            this._gameManager.changeBulletType(Constant.BulletPropType.BULLET_S);
          } else {
            this._gameManager.changeBulletType(Constant.BulletPropType.BULLET_M);
          } // this.node.destroy();


          PoolManager.instance().putNode(this.node);
        }

      }, _temp)) || _class));
      /**
       * [1] Class member could be defined like this.
       * [2] Use `property` decorator if your want the member to be serializable.
       * [3] Your initialization goes here.
       * [4] Your update function goes here.
       *
       * Learn more about scripting: https://docs.cocos.com/creator/3.3/manual/en/scripting/
       * Learn more about CCClass: https://docs.cocos.com/creator/3.3/manual/en/scripting/ccclass.html
       * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.3/manual/en/scripting/life-cycle-callbacks.html
       */

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/MovingSceneBg.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, _defineProperty, cclegacy, Node, _decorator, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Node = module.Node;
      _decorator = module._decorator;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2, _temp;

      cclegacy._RF.push({}, "96ab9fWUgFHu4WZkXRj7lzH", "MovingSceneBg", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      /**
       * Predefined variables
       * Name = MovingSceneBg
       * DateTime = Tue Nov 09 2021 17:43:06 GMT+0800 (China Standard Time)
       * Author = mywayday
       * FileBasename = MovingSceneBg.ts
       * FileBasenameNoExtension = MovingSceneBg
       * URL = db://assets/MovingSceneBg.ts
       * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
       *
       */

      let MovingSceneBg = exports('MovingSceneBg', (_dec = ccclass('MovingSceneBg'), _dec2 = property(Node), _dec3 = property(Node), _dec(_class = (_class2 = (_temp = class MovingSceneBg extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "bg01", _descriptor, this);

          _initializerDefineProperty(this, "bg02", _descriptor2, this);

          _defineProperty(this, "_bgSpeed", 10);

          _defineProperty(this, "_bgMovingRange", 90);
        }

        start() {
          this._init();
        }

        update(deltaTime) {
          this._moveBackground(deltaTime);
        }

        _init() {
          this.bg01.setPosition(0, 0, 0);
          this.bg02.setPosition(0, 0, -this._bgMovingRange);
        }

        _moveBackground(deltaTime) {
          this.bg01.setPosition(0, 0, this.bg01.position.z + this._bgSpeed * deltaTime);
          this.bg02.setPosition(0, 0, this.bg02.position.z + this._bgSpeed * deltaTime);

          if (this.bg01.position.z > this._bgMovingRange) {
            this.bg01.setPosition(0, 0, this.bg02.position.z - this._bgMovingRange);
          } else if (this.bg02.position.z > this._bgMovingRange) {
            this.bg02.setPosition(0, 0, this.bg01.position.z - this._bgMovingRange);
          }
        }

      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "bg01", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "bg02", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));
      /**
       * [1] Class member could be defined like this.
       * [2] Use `property` decorator if your want the member to be serializable.
       * [3] Your initialization goes here.
       * [4] Your update function goes here.
       *
       * Learn more about scripting: https://docs.cocos.com/creator/3.3/manual/en/scripting/
       * Learn more about CCClass: https://docs.cocos.com/creator/3.3/manual/en/scripting/ccclass.html
       * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.3/manual/en/scripting/life-cycle-callbacks.html
       */

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Constant.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _defineProperty, cclegacy;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
    }],
    execute: function () {
      cclegacy._RF.push({}, "9ba7ak0TVBK4bJaIq49qiJK", "Constant", undefined);
      /**
       * Predefined variables
       * Name = Constant
       * DateTime = Mon Nov 15 2021 18:26:06 GMT+0800 (China Standard Time)
       * Author = mywayday
       * FileBasename = Constant.ts
       * FileBasenameNoExtension = Constant
       * URL = db://assets/script/framework/Constant.ts
       * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
       *
       */


      class Constant {}

      exports('Constant', Constant);
      /**
       * [1] Class member could be defined like this.
       * [2] Use `property` decorator if your want the member to be serializable.
       * [3] Your initialization goes here.
       * [4] Your update function goes here.
       *
       * Learn more about scripting: https://docs.cocos.com/creator/3.3/manual/en/scripting/
       * Learn more about CCClass: https://docs.cocos.com/creator/3.3/manual/en/scripting/ccclass.html
       * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.3/manual/en/scripting/life-cycle-callbacks.html
       */

      _defineProperty(Constant, "EnemyType", {
        TYPE1: 1,
        TYPE2: 2
      });

      _defineProperty(Constant, "Combination", {
        PLAN1: 1,
        PLAN2: 2,
        PLAN3: 3
      });

      _defineProperty(Constant, "CollisionType", {
        SELF_PLANE: 1 << 1,
        ENEMY_PLANE: 1 << 2,
        SELF_BULLET: 1 << 3,
        ENEMY_BULLET: 1 << 4,
        BULLET_PROP: 1 << 5
      });

      _defineProperty(Constant, "BulletPropType", {
        BULLET_M: 1,
        BULLET_H: 2,
        BULLET_S: 3
      });

      _defineProperty(Constant, "Direction", {
        LEFT: 1,
        MIDDLE: 2,
        RIGHT: 3
      });

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Explode.ts", ['cc', './PoolManager.ts'], function (exports) {
  'use strict';

  var cclegacy, Component, _decorator, PoolManager;

  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      Component = module.Component;
      _decorator = module._decorator;
    }, function (module) {
      PoolManager = module.PoolManager;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "aa341Z9YJdBX5Rd640Hxh42", "Explode", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      /**
       * Predefined variables
       * Name = Explode
       * DateTime = Sun Dec 05 2021 17:42:54 GMT+0800 (China Standard Time)
       * Author = mywayday
       * FileBasename = Explode.ts
       * FileBasenameNoExtension = Explode
       * URL = db://assets/script/Explode.ts
       * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
       *
       */

      let Explode = exports('Explode', (_dec = ccclass('Explode'), _dec(_class = class Explode extends Component {
        // [1]
        // dummy = '';
        // [2]
        // @property
        // serializableDummy = 0;
        onEnable() {
          this.scheduleOnce(this._putBack, 1);
        }

        _putBack() {
          PoolManager.instance().putNode(this.node);
        } // update (deltaTime: number) {
        //     // [4]
        // }


      }) || _class));
      /**
       * [1] Class member could be defined like this.
       * [2] Use `property` decorator if your want the member to be serializable.
       * [3] Your initialization goes here.
       * [4] Your update function goes here.
       *
       * Learn more about scripting: https://docs.cocos.com/creator/3.3/manual/en/scripting/
       * Learn more about CCClass: https://docs.cocos.com/creator/3.3/manual/en/scripting/ccclass.html
       * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.3/manual/en/scripting/life-cycle-callbacks.html
       */

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/SelfPlane.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './Constant.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, _defineProperty, cclegacy, Node, _decorator, Component, AudioSource, Collider, Constant;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Node = module.Node;
      _decorator = module._decorator;
      Component = module.Component;
      AudioSource = module.AudioSource;
      Collider = module.Collider;
    }, function (module) {
      Constant = module.Constant;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp;

      cclegacy._RF.push({}, "c839482eSFDR5T6mXfibPxw", "SelfPlane", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      /**
       * Predefined variables
       * Name = SelfPlane
       * DateTime = Mon Nov 15 2021 10:27:19 GMT+0800 (China Standard Time)
       * Author = mywayday
       * FileBasename = SelfPlane.ts
       * FileBasenameNoExtension = SelfPlane
       * URL = db://assets/script/SelfPlane.ts
       * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
       *
       */

      let SelfPlane = exports('SelfPlane', (_dec = ccclass('SelfPlane'), _dec2 = property(Node), _dec3 = property(Node), _dec4 = property(Node), _dec(_class = (_class2 = (_temp = class SelfPlane extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "explode", _descriptor, this);

          _initializerDefineProperty(this, "bloodFace", _descriptor2, this);

          _initializerDefineProperty(this, "blood", _descriptor3, this);

          _defineProperty(this, "lifeValue", 5);

          _defineProperty(this, "isDie", false);

          _defineProperty(this, "_currLife", 0);

          _defineProperty(this, "_audioEffect", null);
        }

        start() {
          this._audioEffect = this.getComponent(AudioSource);
        }

        onEnable() {
          const collider = this.getComponent(Collider);
          collider.on('onTriggerEnter', this._onTriggerEnter, this);
        }

        onDisable() {
          const collider = this.getComponent(Collider);
          collider.off('onTriggerEnter', this._onTriggerEnter, this);
        } // update (deltaTime: number) {
        //     // [4]
        // }


        init() {
          this._currLife = this.lifeValue;
          this.isDie = false;
          this.explode.active = false;
          this.bloodFace.setScale(1, 1, 1);
        }

        _onTriggerEnter(event) {
          const collisionGroup = event.otherCollider.getGroup();

          if (collisionGroup === Constant.CollisionType.ENEMY_PLANE || collisionGroup === Constant.CollisionType.ENEMY_BULLET) {
            if (this._currLife === this.lifeValue) {
              this.blood.active = true;
            }

            this._currLife--;
            this.bloodFace.setScale(this._currLife / this.lifeValue, 1, 1);

            if (this._currLife <= 0) {
              this.isDie = true;

              this._audioEffect.play();

              this.explode.active = true;
              this.blood.active = false;
              console.log('self plane is die');
            }
          }
        }

      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "explode", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "bloodFace", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "blood", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));
      /**
       * [1] Class member could be defined like this.
       * [2] Use `property` decorator if your want the member to be serializable.
       * [3] Your initialization goes here.
       * [4] Your update function goes here.
       *
       * Learn more about scripting: https://docs.cocos.com/creator/3.3/manual/en/scripting/
       * Learn more about CCClass: https://docs.cocos.com/creator/3.3/manual/en/scripting/ccclass.html
       * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.3/manual/en/scripting/life-cycle-callbacks.html
       */

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/AudioManager.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, _defineProperty, cclegacy, AudioClip, _decorator, Component, AudioSource;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      AudioClip = module.AudioClip;
      _decorator = module._decorator;
      Component = module.Component;
      AudioSource = module.AudioSource;
    }],
    execute: function () {
      var _dec, _dec2, _class, _class2, _descriptor, _temp;

      cclegacy._RF.push({}, "cf05c4BsxJE975rw6fkExNU", "AudioManager", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      /**
       * Predefined variables
       * Name = AudioManager
       * DateTime = Fri Nov 26 2021 16:11:32 GMT+0800 (China Standard Time)
       * Author = mywayday
       * FileBasename = AudioManager.ts
       * FileBasenameNoExtension = AudioManager
       * URL = db://assets/script/framework/AudioManager.ts
       * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
       *
       */

      let AudioManager = exports('AudioManager', (_dec = ccclass('AudioManager'), _dec2 = property([AudioClip]), _dec(_class = (_class2 = (_temp = class AudioManager extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "audioList", _descriptor, this);

          _defineProperty(this, "_dict", {});

          _defineProperty(this, "_audioSource", null);
        }

        start() {
          for (let i = 0; i < this.audioList.length; i++) {
            const element = this.audioList[i];
            this._dict[element.name] = element;
          }

          this._audioSource = this.getComponent(AudioSource);
        }

        play(name) {
          const audioClip = this._dict[name];

          if (audioClip !== undefined) {
            this._audioSource.playOneShot(audioClip);
          }
        } // update (deltaTime: number) {
        //     // [4]
        // }


      }, _temp), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "audioList", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return [];
        }
      }), _class2)) || _class));
      /**
       * [1] Class member could be defined like this.
       * [2] Use `property` decorator if your want the member to be serializable.
       * [3] Your initialization goes here.
       * [4] Your update function goes here.
       *
       * Learn more about scripting: https://docs.cocos.com/creator/3.3/manual/en/scripting/
       * Learn more about CCClass: https://docs.cocos.com/creator/3.3/manual/en/scripting/ccclass.html
       * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.3/manual/en/scripting/life-cycle-callbacks.html
       */

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/EnemyPlane.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './Constant.ts', './PoolManager.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, _defineProperty, cclegacy, _decorator, Component, Collider, Constant, PoolManager;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Component = module.Component;
      Collider = module.Collider;
    }, function (module) {
      Constant = module.Constant;
    }, function (module) {
      PoolManager = module.PoolManager;
    }],
    execute: function () {
      var _dec, _class, _class2, _descriptor, _temp;

      cclegacy._RF.push({}, "e4b84GYhj9IHoWH4mrALeYo", "EnemyPlane", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      /**
       * Predefined variables
       * Name = EnemyPlane
       * DateTime = Mon Nov 15 2021 18:00:28 GMT+0800 (China Standard Time)
       * Author = mywayday
       * FileBasename = EnemyPlane.ts
       * FileBasenameNoExtension = EnemyPlane
       * URL = db://assets/script/plane/EnemyPlane.ts
       * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
       *
       */

      const OUTOFBOUNCE = 50;
      let EnemyPlane = exports('EnemyPlane', (_dec = ccclass('EnemyPlane'), _dec(_class = (_class2 = (_temp = class EnemyPlane extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "createBulletTime", _descriptor, this);

          _defineProperty(this, "_enemySpeed", 0);

          _defineProperty(this, "_needBullet", false);

          _defineProperty(this, "_gameManager", null);

          _defineProperty(this, "_currCreateBulletTime", 0);
        }

        onEnable() {
          const collider = this.getComponent(Collider);
          collider.on('onTriggerEnter', this._onTriggerEnter, this);
        }

        onDisable() {
          const collider = this.getComponent(Collider);
          collider.off('onTriggerEnter', this._onTriggerEnter, this);
        }

        update(deltaTime) {
          const pos = this.node.position;
          const movePos = pos.z + this._enemySpeed;
          this.node.setPosition(pos.x, pos.y, movePos);

          if (this._needBullet) {
            this._currCreateBulletTime += deltaTime;

            if (this._currCreateBulletTime > this.createBulletTime) {
              this._gameManager.createEnemyBullet(this.node.position);

              this._currCreateBulletTime = 0;
            }
          }

          if (movePos > OUTOFBOUNCE) {
            PoolManager.instance().putNode(this.node); // this.node.destroy();
          }
        }

        show(gameManager, speed, needBullet) {
          this._gameManager = gameManager;
          this._enemySpeed = speed;
          this._needBullet = needBullet;
        }

        _onTriggerEnter(event) {
          const collisionGroup = event.otherCollider.getGroup();

          if (collisionGroup === Constant.CollisionType.SELF_PLANE || collisionGroup === Constant.CollisionType.SELF_BULLET) {
            // console.log('trigger enemy destroy');
            this._gameManager.playAudioEffect('enemy');

            PoolManager.instance().putNode(this.node); // this.node.destroy();

            this._gameManager.addScore();

            this._gameManager.createEnemyEffect(this.node.position);
          }
        }

      }, _temp), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "createBulletTime", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 0.5;
        }
      }), _class2)) || _class));
      /**
       * [1] Class member could be defined like this.
       * [2] Use `property` decorator if your want the member to be serializable.
       * [3] Your initialization goes here.
       * [4] Your update function goes here.
       *
       * Learn more about scripting: https://docs.cocos.com/creator/3.3/manual/en/scripting/
       * Learn more about CCClass: https://docs.cocos.com/creator/3.3/manual/en/scripting/ccclass.html
       * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.3/manual/en/scripting/life-cycle-callbacks.html
       */

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/UIMain.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc', './GameManager.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _initializerDefineProperty, cclegacy, Node, _decorator, Component, SystemEvent, GameManager;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _initializerDefineProperty = module.initializerDefineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      Node = module.Node;
      _decorator = module._decorator;
      Component = module.Component;
      SystemEvent = module.SystemEvent;
    }, function (module) {
      GameManager = module.GameManager;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _temp;

      cclegacy._RF.push({}, "e690bV0ZVNGGaTOefuPwiRP", "UIMain", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      /**
       * Predefined variables
       * Name = UIMain
       * DateTime = Mon Nov 15 2021 14:10:01 GMT+0800 (China Standard Time)
       * Author = mywayday
       * FileBasename = UIMain.ts
       * FileBasenameNoExtension = UIMain
       * URL = db://assets/script/ui/UIMain.ts
       * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
       *
       */

      let UIMain = exports('UIMain', (_dec = ccclass('UIMain'), _dec2 = property(Node), _dec3 = property(GameManager), _dec4 = property(Node), _dec5 = property(Node), _dec6 = property(Node), _dec(_class = (_class2 = (_temp = class UIMain extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "planeSpeed", _descriptor, this);

          _initializerDefineProperty(this, "playerPlane", _descriptor2, this);

          _initializerDefineProperty(this, "gameManager", _descriptor3, this);

          _initializerDefineProperty(this, "gameStart", _descriptor4, this);

          _initializerDefineProperty(this, "game", _descriptor5, this);

          _initializerDefineProperty(this, "gameOver", _descriptor6, this);
        }

        start() {
          this.node.on(SystemEvent.EventType.TOUCH_START, this._touchStart, this);
          this.node.on(SystemEvent.EventType.TOUCH_MOVE, this._touchMove, this);
          this.node.on(SystemEvent.EventType.TOUCH_END, this._touchEnd, this);
          this.gameStart.active = true;
        } // update (deltaTime: number) {
        //     // [4]
        // }


        reStart() {
          this.gameOver.active = false;
          this.game.active = true;
          this.gameManager.playAudioEffect('button');
          this.gameManager.gameReStart();
        }

        returnMain() {
          this.gameOver.active = false;
          this.gameStart.active = true;
          this.gameManager.playAudioEffect('button');
          this.gameManager.returnMain();
        }

        _touchStart(touch, event) {
          if (this.gameManager.isGameStart) {
            this.gameManager.isShooting(true);
          } else {
            this.gameStart.active = false;
            this.game.active = true;
            this.gameManager.playAudioEffect('button');
            this.gameManager.gameStart();
          }
        }

        _touchMove(touch, event) {
          if (!this.gameManager.isGameStart) {
            return;
          }

          const delta = touch.getDelta();
          let pos = this.playerPlane.position;
          this.playerPlane.setPosition(pos.x + 0.01 * this.planeSpeed * delta.x, pos.y, pos.z - 0.01 * this.planeSpeed * delta.y);
        }

        _touchEnd(touch, event) {
          if (!this.gameManager.isGameStart) {
            return;
          }

          this.gameManager.isShooting(false);
        }

      }, _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "planeSpeed", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return 1;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "playerPlane", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "gameManager", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "gameStart", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "game", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "gameOver", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));
      /**
       * [1] Class member could be defined like this.
       * [2] Use `property` decorator if your want the member to be serializable.
       * [3] Your initialization goes here.
       * [4] Your update function goes here.
       *
       * Learn more about scripting: https://docs.cocos.com/creator/3.3/manual/en/scripting/
       * Learn more about CCClass: https://docs.cocos.com/creator/3.3/manual/en/scripting/ccclass.html
       * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.3/manual/en/scripting/life-cycle-callbacks.html
       */

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/PoolManager.ts", ['./_rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _defineProperty, cclegacy, _decorator, instantiate, NodePool;

  return {
    setters: [function (module) {
      _defineProperty = module.defineProperty;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      instantiate = module.instantiate;
      NodePool = module.NodePool;
    }],
    execute: function () {
      var _dec, _class, _class2, _temp;

      cclegacy._RF.push({}, "f490aFvLS9C/bqwLGmSZgIL", "PoolManager", undefined);

      const {
        ccclass,
        property
      } = _decorator;
      /**
       * Predefined variables
       * Name = PoolManager
       * DateTime = Fri Nov 26 2021 18:00:45 GMT+0800 (China Standard Time)
       * Author = mywayday
       * FileBasename = PoolManager.ts
       * FileBasenameNoExtension = PoolManager
       * URL = db://assets/script/framework/PoolManager.ts
       * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
       *
       */

      let PoolManager = exports('PoolManager', (_dec = ccclass('PoolManager'), _dec(_class = (_temp = _class2 = class PoolManager {
        constructor() {
          _defineProperty(this, "_dictPool", {});

          _defineProperty(this, "_dictPrefab", {});
        }

        static instance() {
          if (!this._instance) {
            this._instance = new PoolManager();
          }

          return this._instance;
        }

        getNode(prefab, parent) {
          let name = prefab.data.name; // console.log('get node   ' + name);

          let node = null;
          this._dictPrefab[name] = prefab;
          const pool = this._dictPool[name];

          if (pool) {
            if (pool.size() > 0) {
              node = pool.get();
            } else {
              node = instantiate(prefab);
            }
          } else {
            this._dictPool[name] = new NodePool();
            node = instantiate(prefab);
          }

          node.parent = parent;
          node.active = true;
          return node;
        }

        putNode(node) {
          let name = node.name; // console.log('put node   ' + name);

          node.parent = null;

          if (!this._dictPool[name]) {
            this._dictPool[name] = new NodePool();
          }

          this._dictPool[name].put(node);
        }

      }, _defineProperty(_class2, "_instance", void 0), _temp)) || _class));
      /**
       * [1] Class member could be defined like this.
       * [2] Use `property` decorator if your want the member to be serializable.
       * [3] Your initialization goes here.
       * [4] Your update function goes here.
       *
       * Learn more about scripting: https://docs.cocos.com/creator/3.3/manual/en/scripting/
       * Learn more about CCClass: https://docs.cocos.com/creator/3.3/manual/en/scripting/ccclass.html
       * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.3/manual/en/scripting/life-cycle-callbacks.html
       */

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./Constant.ts', './PoolManager.ts', './Bullet.ts', './BulletProp.ts', './EnemyPlane.ts', './SelfPlane.ts', './AudioManager.ts', './GameManager.ts', './MovingSceneBg.ts', './Explode.ts', './UIMain.ts'], function () {
  'use strict';

  return {
    setters: [null, null, null, null, null, null, null, null, null, null, null],
    execute: function () {}
  };
});

(function(r) {
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});