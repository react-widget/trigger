
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/createClass"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/getPrototypeOf"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime-corejs2/helpers/inherits"));

var _react = _interopRequireDefault(require("react"));

var PopupRootContainer =
/*#__PURE__*/
function (_React$Component) {
  (0, _inherits2.default)(PopupRootContainer, _React$Component);

  function PopupRootContainer() {
    (0, _classCallCheck2.default)(this, PopupRootContainer);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(PopupRootContainer).apply(this, arguments));
  }

  (0, _createClass2.default)(PopupRootContainer, [{
    key: "render",
    value: function render() {
      var style = {
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%'
      };
      return _react.default.createElement("div", (0, _extends2.default)({
        style: style
      }, this.props));
    }
  }]);
  return PopupRootContainer;
}(_react.default.Component);

exports.default = PopupRootContainer;