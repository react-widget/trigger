/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"index": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendors"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./examples/Demo.js":
/*!**************************!*\
  !*** ./examples/Demo.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireWildcard */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf3 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/inherits.js"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/assertThisInitialized.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/defineProperty.js"));

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _DemoList = _interopRequireDefault(__webpack_require__(/*! ./DemoList */ "./examples/DemoList.js"));

var Demo =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(Demo, _Component);

  function Demo() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Demo);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Demo)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      current: _DemoList.default[0]
    });
    return _this;
  }

  (0, _createClass2.default)(Demo, [{
    key: "onDemoChange",
    value: function onDemoChange(item, e) {
      this.setState({
        current: item
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var current = this.state.current;
      return _react.default.createElement("div", {
        className: "container"
      }, _react.default.createElement("div", {
        className: "slider"
      }, _DemoList.default.map(function (item, i) {
        return _react.default.createElement("div", {
          className: current === item ? 'active' : '',
          onClick: _this2.onDemoChange.bind(_this2, item)
        }, item.label);
      })), _react.default.createElement("div", {
        className: "content"
      }, current ? _react.default.createElement(current.component, null) : null));
    }
  }]);
  return Demo;
}(_react.Component);

exports.default = Demo;

/***/ }),

/***/ "./examples/DemoList.js":
/*!******************************!*\
  !*** ./examples/DemoList.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _demo = _interopRequireDefault(__webpack_require__(/*! ./demos/demo1 */ "./examples/demos/demo1.js"));

// import Demo2 from './demos/Demo2';
// import Demo3 from './demos/Demo3';
// import Demo4 from './demos/Demo4';
var _default = [{
  label: '基本功能',
  component: _demo.default
}];
exports.default = _default;

/***/ }),

/***/ "./examples/demos/demo1.js":
/*!*********************************!*\
  !*** ./examples/demos/demo1.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireWildcard */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireWildcard.js");

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf4 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/inherits.js"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/assertThisInitialized.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/defineProperty.js"));

var _react = _interopRequireWildcard(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _src = _interopRequireDefault(__webpack_require__(/*! ../../src */ "./src/index.js"));

var _reactWidgetLayout = _interopRequireDefault(__webpack_require__(/*! react-widget-layout */ "./node_modules/react-widget-layout/index.js"));

var TriggerBtn =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(TriggerBtn, _React$Component);

  function TriggerBtn() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, TriggerBtn);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf4.default)(TriggerBtn)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      visible: false
    });
    return _this;
  }

  (0, _createClass2.default)(TriggerBtn, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var placement = this.props.placement;
      var visible = this.state.visible;
      return _react.default.createElement(_src.default, {
        offset: 1,
        action: "hover",
        delay: 1000,
        popup: _react.default.createElement("div", {
          className: "trigger-container"
        }, placement),
        placement: placement
      }, _react.default.createElement("button", {
        className: "t-btn",
        onClick: function onClick() {
          return _this2.setState({
            visible: !visible
          });
        }
      }, placement));
    }
  }]);
  return TriggerBtn;
}(_react.default.Component);

var DEMO =
/*#__PURE__*/
function (_Component) {
  (0, _inherits2.default)(DEMO, _Component);

  function DEMO() {
    var _getPrototypeOf3;

    var _this3;

    (0, _classCallCheck2.default)(this, DEMO);

    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    _this3 = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf3 = (0, _getPrototypeOf4.default)(DEMO)).call.apply(_getPrototypeOf3, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this3)), "state", {
      visible: true
    });
    return _this3;
  }

  (0, _createClass2.default)(DEMO, [{
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "render",
    value: function render() {
      return _react.default.createElement(_reactWidgetLayout.default, null, _react.default.createElement(_reactWidgetLayout.default.Header, {
        style: {
          textAlign: "center"
        }
      }, _react.default.createElement(TriggerBtn, {
        placement: "topLeft"
      }), _react.default.createElement(TriggerBtn, {
        placement: "topCenter"
      }), _react.default.createElement(TriggerBtn, {
        placement: "topRight"
      }), _react.default.createElement(_src.default, {
        offset: 1,
        delay: 1000,
        action: "focus",
        popup: _react.default.createElement("div", {
          className: "trigger-container"
        }, "rightCenter"),
        placement: "rightCenter"
      }, _react.default.createElement("input", {
        type: "text",
        placeholder: "focus show"
      }))), _react.default.createElement(_reactWidgetLayout.default, null, _react.default.createElement(_reactWidgetLayout.default.Sider, {
        style: {
          width: 80
        }
      }, _react.default.createElement(TriggerBtn, {
        placement: "leftTop"
      }), _react.default.createElement(TriggerBtn, {
        placement: "leftCenter"
      }), _react.default.createElement(TriggerBtn, {
        placement: "leftBottom"
      })), _react.default.createElement(_reactWidgetLayout.default.Content, null), _react.default.createElement(_reactWidgetLayout.default.Sider, {
        style: {
          width: 80
        }
      }, _react.default.createElement(TriggerBtn, {
        placement: "rightTop"
      }), _react.default.createElement(TriggerBtn, {
        placement: "rightCenter"
      }), _react.default.createElement(TriggerBtn, {
        placement: "rightBottom"
      }))), _react.default.createElement(_reactWidgetLayout.default.Footer, {
        style: {
          textAlign: "center"
        }
      }, _react.default.createElement(TriggerBtn, {
        placement: "bottomLeft"
      }), _react.default.createElement(TriggerBtn, {
        placement: "bottomCenter"
      }), _react.default.createElement(TriggerBtn, {
        placement: "bottomRight"
      }), _react.default.createElement(_src.default, {
        offset: 1,
        delay: 1000,
        action: "contextMenu",
        popup: _react.default.createElement("div", {
          className: "trigger-container"
        }, "rightCenter"),
        placement: "rightCenter"
      }, _react.default.createElement("span", null, "contextMenu show"))));
    }
  }]);
  return DEMO;
}(_react.Component);

exports.default = DEMO;

/***/ }),

/***/ "./examples/index.js":
/*!***************************!*\
  !*** ./examples/index.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _reactDom = _interopRequireDefault(__webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js"));

__webpack_require__(/*! ./style/index.scss */ "./examples/style/index.scss");

__webpack_require__(/*! ./style/animate.scss */ "./examples/style/animate.scss");

__webpack_require__(/*! ../src/style/index.scss */ "./src/style/index.scss");

__webpack_require__(/*! react-widget-popup/lib/style/index.css */ "./node_modules/react-widget-popup/lib/style/index.css");

__webpack_require__(/*! react-widget-layout/lib/style/index.css */ "./node_modules/react-widget-layout/lib/style/index.css");

var _Demo = _interopRequireDefault(__webpack_require__(/*! ./Demo */ "./examples/Demo.js"));

_reactDom.default.render(_react.default.createElement(_Demo.default, null), demo);

/***/ }),

/***/ "./examples/style/animate.scss":
/*!*************************************!*\
  !*** ./examples/style/animate.scss ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./examples/style/index.scss":
/*!***********************************!*\
  !*** ./examples/style/index.scss ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime-corejs2/helpers/interopRequireDefault */ "./node_modules/@babel/runtime-corejs2/helpers/interopRequireDefault.js");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _objectSpread2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/objectSpread */ "./node_modules/@babel/runtime-corejs2/helpers/objectSpread.js"));

var _isArray = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/core-js/array/is-array */ "./node_modules/@babel/runtime-corejs2/core-js/array/is-array.js"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/classCallCheck */ "./node_modules/@babel/runtime-corejs2/helpers/classCallCheck.js"));

var _createClass2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/createClass */ "./node_modules/@babel/runtime-corejs2/helpers/createClass.js"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime-corejs2/helpers/possibleConstructorReturn.js"));

var _getPrototypeOf3 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/getPrototypeOf */ "./node_modules/@babel/runtime-corejs2/helpers/getPrototypeOf.js"));

var _inherits2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/inherits */ "./node_modules/@babel/runtime-corejs2/helpers/inherits.js"));

var _assertThisInitialized2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/assertThisInitialized */ "./node_modules/@babel/runtime-corejs2/helpers/assertThisInitialized.js"));

var _defineProperty2 = _interopRequireDefault(__webpack_require__(/*! @babel/runtime-corejs2/helpers/defineProperty */ "./node_modules/@babel/runtime-corejs2/helpers/defineProperty.js"));

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "./node_modules/react/index.js"));

var _reactDom = _interopRequireDefault(__webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js"));

var _propTypes = _interopRequireDefault(__webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js"));

var _reactWidgetPopup = _interopRequireDefault(__webpack_require__(/*! react-widget-popup */ "./node_modules/react-widget-popup/index.js"));

var _bplokjsPlacement = _interopRequireDefault(__webpack_require__(/*! bplokjs-placement */ "./node_modules/bplokjs-placement/index.js"));

var _bplokjsDeferred = _interopRequireDefault(__webpack_require__(/*! bplokjs-deferred */ "./node_modules/bplokjs-deferred/index.js"));

var propTypes = {
  offset: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.array]),
  action: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.arrayOf(_propTypes.default.string)]),
  showAction: _propTypes.default.any,
  hideAction: _propTypes.default.any,
  onPopupVisibleChange: _propTypes.default.func,
  //afterPopupVisibleChange: PropTypes.func,
  delay: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.object])
};

function noop() {}

var Trigger =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(Trigger, _React$Component);

  function Trigger() {
    var _getPrototypeOf2;

    var _this;

    (0, _classCallCheck2.default)(this, Trigger);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = (0, _possibleConstructorReturn2.default)(this, (_getPrototypeOf2 = (0, _getPrototypeOf3.default)(Trigger)).call.apply(_getPrototypeOf2, [this].concat(args)));
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "state", {
      popupVisible: _this.props.defaultPopupVisible
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "delayTimer", null);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "promise", null);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "isFocusToShow", function () {
      var _this$props = _this.props,
          action = _this$props.action,
          showAction = _this$props.showAction;
      return action.indexOf('focus') !== -1 || showAction.indexOf('focus') !== -1;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "isBlurToHide", function () {
      var _this$props2 = _this.props,
          action = _this$props2.action,
          hideAction = _this$props2.hideAction;
      return action.indexOf('focus') !== -1 || hideAction.indexOf('blur') !== -1;
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onMouseEnter", function (e) {
      _this.delaySetPopupVisible(true);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onMouseLeave", function (e) {
      _this.delaySetPopupVisible(false);
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onFocus", function (e) {
      if (_this.isFocusToShow()) {
        _this.delaySetPopupVisible(true);
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onBlur", function (e) {
      if (_this.isBlurToHide()) {
        _this.delaySetPopupVisible(false);
      }
    });
    return _this;
  }

  (0, _createClass2.default)(Trigger, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.resolvePopupDOM();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.resolvePopupDOM();
    }
  }, {
    key: "resolvePopupDOM",
    value: function resolvePopupDOM() {
      var _this$props3 = this.props,
          placement = _this$props3.placement,
          offset = _this$props3.offset;
      var pOffset = [0, 0];

      if (!(0, _isArray.default)(offset)) {
        if (/^left/i.test(placement)) {
          pOffset[0] = offset * -1;
        }

        if (/^right/i.test(placement)) {
          pOffset[0] = offset;
        }

        if (/^top/i.test(placement)) {
          pOffset[1] = offset * -1;
        }

        if (/^bottom/i.test(placement)) {
          pOffset[1] = offset;
        }
      } else {
        pOffset[0] = offset[0];
        pOffset[1] = offset[1];
      }

      if (this.promise) {
        this.promise.resolve((0, _objectSpread2.default)({
          of: _reactDom.default.findDOMNode(this)
        }, (0, _bplokjsPlacement.default)(placement, pOffset)));
      }
    }
  }, {
    key: "setPopupVisible",
    value: function setPopupVisible(popupVisible) {
      if (!('popupVisible' in this.props)) {
        this.setState({
          popupVisible: popupVisible
        });
      }

      this.props.onPopupVisibleChange(popupVisible);
    }
  }, {
    key: "clearDelayTimer",
    value: function clearDelayTimer() {
      if (this.delayTimer) {
        clearTimeout(this.delayTimer);
        this.delayTimer = null;
      }
    }
  }, {
    key: "getDelayTime",
    value: function getDelayTime() {
      var action = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'show';
      var delay = this.props.delay;

      if (typeof delay !== 'number') {
        return Math.abs(delay[action]);
      }

      return Math.abs(delay);
    }
  }, {
    key: "delaySetPopupVisible",
    value: function delaySetPopupVisible(visible) {
      var _this2 = this;

      if (this.state.popupVisible === visible) {
        return;
      }

      this.clearDelayTimer();
      var delay = this.getDelayTime(visible ? 'show' : 'hide');

      if (delay) {
        this.delayTimer = setTimeout(function () {
          _this2.setPopupVisible(visible);

          _this2.delayTimer = null;
        }, delay);
      } else {
        this.setPopupVisible(visible);
      }
    }
  }, {
    key: "isContextMenuToShow",
    value: function isContextMenuToShow() {
      var _this$props4 = this.props,
          action = _this$props4.action,
          showAction = _this$props4.showAction;
      return action.indexOf('contextMenu') !== -1 || showAction.indexOf('contextMenu') !== -1;
    }
  }, {
    key: "isClickToShow",
    value: function isClickToShow() {
      var _this$props5 = this.props,
          action = _this$props5.action,
          showAction = _this$props5.showAction;
      return action.indexOf('click') !== -1 || showAction.indexOf('click') !== -1;
    }
  }, {
    key: "isClickToHide",
    value: function isClickToHide() {
      var _this$props6 = this.props,
          action = _this$props6.action,
          hideAction = _this$props6.hideAction;
      return action.indexOf('click') !== -1 || hideAction.indexOf('click') !== -1;
    }
  }, {
    key: "isMouseEnterToShow",
    value: function isMouseEnterToShow() {
      var _this$props7 = this.props,
          action = _this$props7.action,
          showAction = _this$props7.showAction;
      return action.indexOf('hover') !== -1 || showAction.indexOf('mouseEnter') !== -1;
    }
  }, {
    key: "isMouseLeaveToHide",
    value: function isMouseLeaveToHide() {
      var _this$props8 = this.props,
          action = _this$props8.action,
          hideAction = _this$props8.hideAction;
      return action.indexOf('hover') !== -1 || hideAction.indexOf('mouseLeave') !== -1;
    }
  }, {
    key: "onContextMenu",
    value: function onContextMenu(e) {
      e.preventDefault();
      this.delaySetPopupVisible(true);
    }
  }, {
    key: "onClick",
    value: function onClick(e) {
      var nextVisible = !this.state.popupVisible;

      if (this.isClickToHide() && !nextVisible || nextVisible && this.isClickToShow()) {
        this.delaySetPopupVisible(!this.state.popupVisible);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var popupVisible = this.state.popupVisible;
      var _this$props9 = this.props,
          children = _this$props9.children,
          popup = _this$props9.popup;

      var child = _react.default.Children.only(children);

      var newChildProps = {};

      if (this.isContextMenuToShow()) {
        newChildProps.onContextMenu = function (e) {
          if (child.props.onContextMenu) {
            child.props.onContextMenu(e);
          }

          _this3.clearDelayTimer();

          _this3.onContextMenu(e);
        };
      }

      if (this.isClickToHide() || this.isClickToShow()) {
        newChildProps.onClick = function (e) {
          if (child.props.onClick) {
            child.props.onClick(e);
          }

          _this3.clearDelayTimer();

          _this3.onClick(e);
        };
      }

      if (this.isMouseEnterToShow()) {
        newChildProps.onMouseEnter = function (e) {
          if (child.props.onMouseEnter) {
            child.props.onMouseEnter(e);
          }

          _this3.clearDelayTimer();

          _this3.onMouseEnter(e);
        };
      }

      if (this.isMouseLeaveToHide()) {
        newChildProps.onMouseLeave = function (e) {
          if (child.props.onMouseLeave) {
            child.props.onMouseLeave(e);
          }

          _this3.clearDelayTimer();

          _this3.onMouseLeave(e);
        };
      }

      if (this.isFocusToShow() || this.isBlurToHide()) {
        newChildProps.onFocus = function (e) {
          if (child.props.onFocus) {
            child.props.onFocus(e);
          }

          _this3.clearDelayTimer();

          _this3.onFocus(e);
        };

        newChildProps.onBlur = function (e) {
          if (child.props.onBlur) {
            child.props.onBlur(e);
          }

          _this3.clearDelayTimer();

          _this3.onBlur(e);
        };
      }

      this.promise = (0, _bplokjsDeferred.default)();
      var popupChildren = typeof popup === 'function' ? popup() : popup;

      var trigger = _react.default.cloneElement(child, newChildProps);

      return _react.default.createElement(_react.default.Fragment, null, trigger, _react.default.createElement(_reactWidgetPopup.default, {
        placement: this.promise,
        visible: !!popupVisible
      }, popupChildren));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      return {
        popupVisible: 'visible' in props ? props.visible : state.popupVisible
      };
    }
  }]);
  return Trigger;
}(_react.default.Component);

exports.default = Trigger;
(0, _defineProperty2.default)(Trigger, "propTypes", propTypes);
(0, _defineProperty2.default)(Trigger, "defaultProps", {
  placement: "bottomLeft",
  offset: 0,
  defaultPopupVisible: false,
  action: [],
  showAction: [],
  hideAction: [],
  delay: 0,
  onPopupVisibleChange: noop
});

/***/ }),

/***/ "./src/style/index.scss":
/*!******************************!*\
  !*** ./src/style/index.scss ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 0:
/*!********************************************************************************************************************!*\
  !*** multi ./node_modules/packez/lib/fetchPolyfills.js ./node_modules/packez/lib/polyfills.js ./examples/index.js ***!
  \********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! D:\wamp\www\github-projects\react-widget\trigger\node_modules\packez\lib\fetchPolyfills.js */"./node_modules/packez/lib/fetchPolyfills.js");
__webpack_require__(/*! D:\wamp\www\github-projects\react-widget\trigger\node_modules\packez\lib\polyfills.js */"./node_modules/packez/lib/polyfills.js");
module.exports = __webpack_require__(/*! D:\wamp\www\github-projects\react-widget\trigger\examples\index.js */"./examples/index.js");


/***/ })

/******/ });
//# sourceMappingURL=index.edaab58c.js.map