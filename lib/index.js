
"use strict";

var _interopRequireWildcard = require("@babel/runtime-corejs2/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/extends"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/objectSpread"));

var _isArray = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/array/is-array"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf3 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/assertThisInitialized"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireWildcard(require("react-dom"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactWidgetPopup = _interopRequireDefault(require("react-widget-popup"));

var _reactWidgetPortal = _interopRequireDefault(require("react-widget-portal"));

var _bplokjsPlacement = _interopRequireDefault(require("bplokjs-placement"));

var _bplokjsDeferred = _interopRequireDefault(require("bplokjs-deferred"));

var _events = require("bplokjs-dom-utils/events");

var _PopupRootComponent = _interopRequireDefault(require("./PopupRootComponent"));

// import classnames from 'classnames';
// import omit from 'omit.js';
var contains = require('bplokjs-dom-utils/contains');

var isMobile = typeof navigator !== 'undefined' && !!navigator.userAgent.match(/(Android|iPhone|iPad|iPod|iOS|UCWEB)/i);
var propTypes = {
  children: _propTypes.default.any,
  placement: _propTypes.default.string,
  offset: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.array]),
  action: _propTypes.default.oneOfType([_propTypes.default.string, _propTypes.default.arrayOf(_propTypes.default.string)]),
  showAction: _propTypes.default.any,
  hideAction: _propTypes.default.any,
  onPopupVisibleChange: _propTypes.default.func,
  delay: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.object]),
  getPopupContainer: _propTypes.default.func,
  getDocument: _propTypes.default.func,
  prefixCls: _propTypes.default.string,
  popupClassName: _propTypes.default.string,
  popupMaskClassName: _propTypes.default.string,
  defaultPopupVisible: _propTypes.default.bool,
  popupProps: _propTypes.default.object,
  mask: _propTypes.default.bool,
  maskClosable: _propTypes.default.bool,
  popupRootComponent: _propTypes.default.any,
  destroyPopupOnHide: _propTypes.default.bool,
  popupStyle: _propTypes.default.object,
  popupMaskStyle: _propTypes.default.object,
  zIndex: _propTypes.default.number
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
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "_popup", null);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "delayTimer", null);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "promise", null);
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onDocumentClick", function (event) {
      if (_this.props.mask && !_this.props.maskClosable) {
        return;
      }

      var target = event.target;
      var root = (0, _reactDom.findDOMNode)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)));

      var popupNode = _this.getPopupDomNode();

      if (!contains(root, target) && !contains(popupNode, target)) {
        _this.close();
      }
    });
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
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "onContextMenuClose", function () {
      if (_this.isContextMenuToShow()) {
        _this.close();
      }
    });
    (0, _defineProperty2.default)((0, _assertThisInitialized2.default)((0, _assertThisInitialized2.default)(_this)), "savePopup", function (popup) {
      _this._popup = popup;
    });
    return _this;
  }

  (0, _createClass2.default)(Trigger, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.state.popupVisible) {
        this.resolvePopupDOM();
      }

      this.togglePopupCloseEvents();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      if (this.state.popupVisible) {
        this.resolvePopupDOM();
      }

      this.togglePopupCloseEvents();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.clearDelayTimer();
    }
  }, {
    key: "togglePopupCloseEvents",
    value: function togglePopupCloseEvents() {
      var getDocument = this.props.getDocument;
      var popupVisible = this.state.popupVisible;

      if (popupVisible) {
        var currentDocument = getDocument();

        if (!this.clickOutsideHandler && (this.isClickToHide() || this.isContextMenuToShow())) {
          this.clickOutsideHandler = (0, _events.listen)(currentDocument, 'mousedown', this.onDocumentClick);
        }

        if (!this.touchOutsideHandler && isMobile) {
          this.touchOutsideHandler = (0, _events.listen)(currentDocument, 'click', this.onDocumentClick);
        } // close popup when trigger type contains 'onContextMenu' and document is scrolling.


        if (!this.contextMenuOutsideHandler1 && this.isContextMenuToShow()) {
          this.contextMenuOutsideHandler1 = (0, _events.listen)(currentDocument, 'scroll', this.onContextMenuClose);
        } // close popup when trigger type contains 'onContextMenu' and window is blur.


        if (!this.contextMenuOutsideHandler2 && this.isContextMenuToShow()) {
          this.contextMenuOutsideHandler2 = (0, _events.listen)(window, 'blur', this.onContextMenuClose);
        }
      } else {
        this.clearOutsideHandler();
      }
    }
  }, {
    key: "clearOutsideHandler",
    value: function clearOutsideHandler() {
      if (this.clickOutsideHandler) {
        this.clickOutsideHandler();
        this.clickOutsideHandler = null;
      }

      if (this.contextMenuOutsideHandler1) {
        this.contextMenuOutsideHandler1();
        this.contextMenuOutsideHandler1 = null;
      }

      if (this.contextMenuOutsideHandler2) {
        this.contextMenuOutsideHandler2();
        this.contextMenuOutsideHandler2 = null;
      }

      if (this.touchOutsideHandler) {
        this.touchOutsideHandler();
        this.touchOutsideHandler = null;
      }
    }
  }, {
    key: "resolvePopupDOM",
    value: function resolvePopupDOM() {
      var _this$props3 = this.props,
          placement = _this$props3.placement,
          offset = _this$props3.offset;

      if (!this.promise) {
        return;
      }

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

      this.promise.resolve((0, _objectSpread2.default)({
        of: (0, _reactDom.findDOMNode)(this)
      }, (0, _bplokjsPlacement.default)(placement, pOffset)));
    }
  }, {
    key: "_setPopupVisible",
    value: function _setPopupVisible(popupVisible) {
      if (!('popupVisible' in this.props)) {
        this.setState({
          popupVisible: popupVisible
        });
      }

      this.props.onPopupVisibleChange(popupVisible);
    }
  }, {
    key: "close",
    value: function close() {
      this.delaySetPopupVisible(false);
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
          _this2._setPopupVisible(visible);

          _this2.delayTimer = null;
        }, delay);
      } else {
        this._setPopupVisible(visible);
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
    key: "getPopup",
    value: function getPopup() {
      return this._popup;
    }
  }, {
    key: "getPopupDomNode",
    value: function getPopupDomNode() {
      if (this._popup) {
        return this._popup ? this._popup.getPopupDOM() : null;
      }

      return null;
    }
  }, {
    key: "getPopupMaskDomNode",
    value: function getPopupMaskDomNode() {
      if (this._popup) {
        return this._popup ? this._popup.getPopupMaskDOM() : null;
      }

      return null;
    }
  }, {
    key: "getPopupComponent",
    value: function getPopupComponent() {
      var _this$props9 = this.props,
          placement = _this$props9.placement,
          popup = _this$props9.popup,
          prefixCls = _this$props9.prefixCls,
          popupClassName = _this$props9.popupClassName,
          popupMaskClassName = _this$props9.popupMaskClassName,
          popupProps = _this$props9.popupProps,
          mask = _this$props9.mask,
          popupStyle = _this$props9.popupStyle,
          popupMaskStyle = _this$props9.popupMaskStyle,
          PopupRootComponent = _this$props9.popupRootComponent,
          destroyPopupOnHide = _this$props9.destroyPopupOnHide,
          zIndex = _this$props9.zIndex;
      var popupVisible = this.state.popupVisible;
      var promise;

      if (typeof placement === 'string') {
        this.promise = promise = (0, _bplokjsDeferred.default)();
      } else {
        promise = placement;
      }

      var maskProps = popupProps.maskProps || {};
      var newPopupStyle = (0, _objectSpread2.default)({}, popupStyle);
      var newPopupMaskStyle = (0, _objectSpread2.default)({}, popupMaskStyle);

      if (zIndex != null) {
        newPopupStyle.zIndex = zIndex;
        newPopupMaskStyle.zIndex = zIndex;
      }

      return _react.default.createElement(_reactWidgetPopup.default, (0, _extends2.default)({
        prefixCls: prefixCls,
        placement: promise,
        unmountOnExit: destroyPopupOnHide,
        style: newPopupStyle,
        className: popupClassName
      }, popupProps, {
        rootComponent: PopupRootComponent,
        mask: mask,
        visible: popupVisible,
        ref: this.savePopup,
        maskProps: (0, _objectSpread2.default)({
          style: newPopupMaskStyle,
          className: popupMaskClassName
        }, maskProps)
      }), typeof popup === 'function' ? popup() : popup);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var getPopupContainer = this.props.getPopupContainer;
      var popupVisible = this.state.popupVisible;

      var child = _react.default.Children.only(this.props.children);

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

      var trigger = _react.default.cloneElement(child, newChildProps);

      var portal;

      if (popupVisible || this._popup) {
        portal = _react.default.createElement(_reactWidgetPortal.default, {
          getContainer: getPopupContainer
        }, this.getPopupComponent());
      }

      return _react.default.createElement(_react.default.Fragment, null, trigger, portal);
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
  onPopupVisibleChange: noop,
  getDocument: function getDocument() {
    return window.document;
  },
  prefixCls: "rw-trigger",
  mask: false,
  maskClosable: true,
  destroyPopupOnHide: true,
  popupProps: {},
  popupRootComponent: _PopupRootComponent.default,
  popupStyle: {},
  popupMaskStyle: {},
  zIndex: null
});