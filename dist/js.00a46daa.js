// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/vdom/createElement.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = function _default(tagName, _ref) {
  var _ref$attrs = _ref.attrs,
      attrs = _ref$attrs === void 0 ? {} : _ref$attrs,
      _ref$children = _ref.children,
      children = _ref$children === void 0 ? [] : _ref$children;
  var vElement = Object.create(null);
  Object.assign(vElement, {
    tagName: tagName,
    attrs: attrs,
    children: children
  });
  return vElement;
};

exports.default = _default;
},{}],"js/vdom/utils.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isVNode = exports.isTextChild = exports.isEventAttr = void 0;

var isEventAttr = function isEventAttr(attr) {
  return /^on/.test(attr);
};

exports.isEventAttr = isEventAttr;

var isVNode = function isVNode(node) {
  return typeof node !== "string";
};

exports.isVNode = isVNode;

var isTextChild = function isTextChild(node) {
  return node && node.children && node.children.length > 0 && typeof node.children[0] === "string";
};

exports.isTextChild = isTextChild;
},{}],"js/vdom/render.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.render = render;

var _utils = require("./utils");

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var setAttrs = function setAttrs(target, attrs) {
  for (var attr in attrs) {
    if ((0, _utils.isEventAttr)(attr)) {
      target.addEventListener(attr.slice(2), attrs[attr]);
    } else {
      target.setAttribute(attr, attrs[attr]);
    }
  }
};

function renderElement(_ref) {
  var tagName = _ref.tagName,
      attrs = _ref.attrs,
      children = _ref.children;
  var $el = document.createElement(tagName);
  setAttrs($el, attrs);

  var _iterator = _createForOfIteratorHelper(children),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var child = _step.value;
      $el.appendChild(render(child));
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return $el;
}

function render(vNode) {
  if (typeof vNode === "string") {
    return document.createTextNode(vNode);
  }

  return renderElement(vNode);
}
},{"./utils":"js/vdom/utils.js"}],"js/vdom/patch.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.patch = void 0;

var _render = require("./render");

var _utils = require("./utils");

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var hasChanged = function hasChanged(oldNode, newNode) {
  if (_typeof(oldNode) !== _typeof(newNode)) {
    return "TYPE";
  }

  if ((0, _utils.isTextChild)(oldNode) && (0, _utils.isTextChild)(newNode)) {
    if (oldNode.children[0] !== newNode.children[0]) {
      return "TEXT";
    }
  }

  if ((0, _utils.isVNode)(oldNode) && (0, _utils.isVNode)(newNode)) {
    if (oldNode.tagName !== newNode.tagName) {
      return "NODE";
    }

    if (JSON.stringify(oldNode.attrs) !== JSON.stringify(newNode.attrs)) {
      return "ATTR";
    }
  }

  return "NONE";
};

var updateAttrs = function updateAttrs(target, oldAttrs, newAttrs) {
  for (var attr in oldAttrs) {
    if (!(0, _utils.isEventAttr)(attr)) {
      target.removeAttribute(attr);
    }
  }

  for (var _attr in newAttrs) {
    if (!(0, _utils.isEventAttr)(_attr)) {
      target.setAttribute(_attr, newAttrs[_attr]);
    }
  }
};

var patch = function patch(parent, newNode, oldNode) {
  var index = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

  if (!oldNode) {
    parent.appendChild((0, _render.render)(newNode));
  }

  var childNode = parent.childNodes[index];

  if (!newNode) {
    parent.removeChild(childNode);
  }

  var type = hasChanged(oldNode, newNode);

  switch (type) {
    case "TYPE":
    case "TEXT":
    case "NODE":
      parent.replaceChild((0, _render.render)(newNode), childNode);
      return;

    case "ATTR":
      updateAttrs(childNode, oldNode.attrs, newNode.attrs);
      return;
  }

  if (newNode.tagName) {
    var newLength = newNode.children.length;
    var oldLength = oldNode.children.length;

    for (var i = 0; i < newLength || i < oldLength; i++) {
      patch(childNode, newNode.children[i], oldNode.children[i], i);
    }
  }
};

exports.patch = patch;
},{"./render":"js/vdom/render.js","./utils":"js/vdom/utils.js"}],"js/vdom/app.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = void 0;

var _render = require("./render");

var _patch = require("./patch");

var app = function app(_ref) {
  var root = _ref.root,
      initialState = _ref.initialState,
      view = _ref.view,
      actions = _ref.actions;
  var $el = document.querySelector(root);
  var newNode;
  var oldNode;
  var state = initialState;

  var dispatcher = function dispatcher(actions) {
    var dispatchedActions = {};

    var _loop = function _loop(key) {
      var action = actions[key];
      console.log(action);

      dispatchedActions[key] = function (option) {
        console.log(option);
        setState(action(state, option));
        renderDOM();
      };
    };

    for (var key in actions) {
      _loop(key);
    }

    return dispatchedActions;
  };

  var setState = function setState(newState) {
    if (state !== newState) {
      state = newState;
    }
  };

  var updateNode = function updateNode() {
    newNode = view(state, dispatcher(actions));
  };

  var renderDOM = function renderDOM() {
    updateNode();
    (0, _patch.patch)($el, newNode, oldNode);
    oldNode = newNode;
  };

  renderDOM();
};

exports.app = app;
},{"./render":"js/vdom/render.js","./patch":"js/vdom/patch.js"}],"js/index.js":[function(require,module,exports) {
"use strict";

var _createElement = _interopRequireDefault(require("./vdom/createElement"));

var _app = require("./vdom/app");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var INITIAL_STATE = {
  accounts: [{
    id: 1,
    name: "リオネル・メッシ",
    team: "FCバルセロナ",
    description: "アルゼンチンサンタフェ州ロサリオ出身のイタリア系アルゼンチン人サッカー選手。リーガ・エスパニョーラ・FCバルセロナ所属。アルゼンチン代表。ポジションはフォワード (wikipedia)",
    isFollow: false
  }, {
    id: 2,
    name: "クリスティアーノ・ロナウド",
    team: "Juventus",
    description: "ポルトガル・フンシャル出身のサッカー選手。セリエA・ユヴェントスFC所属。ポルトガル代表。ポジションはフォワード (wikipedia)",
    isFollow: true
  }, {
    id: 3,
    name: "ネイマール",
    team: "パリサンジェルマン",
    description: "ブラジル・サンパウロ州モジ・ダス・クルーゼス出身のサッカー選手。ブラジル代表。リーグ・アン・パリ・サンジェルマンFC所属。ポジションはフォワード (wikipedia)",
    isFollow: false
  }]
};
var actions = {
  toggleFollow: function toggleFollow(state, id) {
    var accounts = state.accounts.map(function (f) {
      if (f.id === id) {
        return _objectSpread(_objectSpread({}, f), {}, {
          isFollow: !f.isFollow
        });
      } else {
        return f;
      }
    });
    return _objectSpread(_objectSpread({}, state), {}, {
      accounts: accounts
    });
  }
}; // ここまで追加

var accountItem = function accountItem(account, action) {
  return (0, _createElement.default)("div", {
    attrs: {},
    children: [(0, _createElement.default)("div", {
      attrs: {
        class: "account__summary"
      },
      children: [(0, _createElement.default)("div", {
        attrs: {},
        children: [(0, _createElement.default)("p", {
          attrs: {
            class: "account__name"
          },
          children: [account.name]
        }), (0, _createElement.default)("p", {
          attrs: {
            class: "account__team"
          },
          children: [account.team]
        })]
      }), (0, _createElement.default)("div", {
        attrs: {},
        children: [(0, _createElement.default)("button", {
          attrs: {
            type: "button",
            class: "followBtn ".concat(account.isFollow ? "isFollow" : ""),
            onclick: function onclick() {
              return action.toggleFollow(account.id);
            }
          },
          children: [account.isFollow ? "フォロー中" : "フォローする"]
        })]
      })]
    }), (0, _createElement.default)("p", {
      attrs: {
        class: "account__description"
      },
      children: [account.description]
    })]
  });
};

var view = function view(props, action) {
  return (0, _createElement.default)("ul", {
    attrs: {
      class: "accountList"
    },
    children: props.accounts.map(function (e) {
      return (0, _createElement.default)("li", {
        attrs: {
          class: "accountList__item"
        },
        children: [accountItem(e, action)]
      });
    })
  });
};

(0, _app.app)({
  root: "#app",
  initialState: INITIAL_STATE,
  view: view,
  actions: actions
});
},{"./vdom/createElement":"js/vdom/createElement.js","./vdom/app":"js/vdom/app.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62930" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/index.js"], null)
//# sourceMappingURL=/js.00a46daa.js.map