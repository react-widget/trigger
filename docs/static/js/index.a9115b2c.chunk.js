(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{128:function(e,t,o){},129:function(e,t,o){},130:function(e,t,o){},150:function(e,t,o){"use strict";o.r(t);var n=o(0),i=o.n(n),r=o(3),s=o.n(r),a=(o(128),o(129),o(130),o(49),o(132),o(2)),l=o.n(a),u=o(10),c=o.n(u),p=o(1),d=o.n(p),h=o(11),m=o.n(h),f=o(32),v=o.n(f),w=(o(135),o(75),o(82),o(138),o(88)),b=o(18),g=o(26),T=o(86),y=o.n(T),M=o(87);o(148);function H(e,t,o){var n=o[0],i=o[1];return"top"===t&&(i*=-1),"left"===e&&(n*=-1),n&&(e+=n>0?"+"+n:n),i&&(t+=i>0?"+"+i:i),[e,t].join(" ")}var k={left:function(e){return{at:H("left","center",e),my:"right center"}},top:function(e){return{at:H("center","top",e),my:"center bottom"}},right:function(e){return{at:H("right","center",e),my:"left center"}},bottom:function(e){return{at:H("center","bottom",e),my:"center top"}},topLeft:function(e){return{at:H("left","top",e),my:"left bottom"}},topRight:function(e){return{at:H("right","top",e),my:"right bottom"}},leftTop:function(e){return{at:H("left","top",e),my:"right top"}},leftBottom:function(e){return{at:H("left","bottom",e),my:"right bottom"}},rightTop:function(e){return{at:H("right","top",e),my:"left top"}},rightBottom:function(e){return{at:H("right","bottom",e),my:"left bottom"}},bottomLeft:function(e){return{at:H("left","bottom",e),my:"left top"}},bottomRight:function(e){return{at:H("right","bottom",e),my:"right top"}}};var E="undefined"!==typeof navigator&&!!navigator.userAgent.match(/(Android|iPhone|iPad|iPod|iOS|UCWEB)/i),C=function(e){function t(){for(var t,o=arguments.length,n=new Array(o),i=0;i<o;i++)n[i]=arguments[i];return t=e.call.apply(e,[this].concat(n))||this,d()(l()(t),"state",{popupVisible:t.props.defaultPopupVisible}),d()(l()(t),"delayTimer",null),d()(l()(t),"popupInstance",void 0),d()(l()(t),"triggerInstance",void 0),d()(l()(t),"refHandlers",{popup:function(e){return t.popupInstance=e},trigger:function(e){return t.triggerInstance=e}}),d()(l()(t),"clickOutsideHandler",void 0),d()(l()(t),"touchOutsideHandler",void 0),d()(l()(t),"contextMenuOutsideHandler1",void 0),d()(l()(t),"contextMenuOutsideHandler2",void 0),d()(l()(t),"windowScrollHandler",void 0),d()(l()(t),"windowResizeHandler",void 0),d()(l()(t),"onDocumentClick",(function(e){var o=e.target,n=t.getTriggerNode(),i=t.popupInstance.getRootDOM();Object(g.a)(n,o)||Object(g.a)(i,o)||t.hide()})),d()(l()(t),"isFocusToShow",(function(){return t.checkToShow(["focus"])})),d()(l()(t),"isBlurToHide",(function(){return t.checkToHide(["focus","blur"])})),d()(l()(t),"isWindowResizeToHide",(function(){return t.checkToHide(["resize"])})),d()(l()(t),"isWindowScrollToHide",(function(){return t.checkToHide(["scroll"])})),d()(l()(t),"onMouseEnter",(function(e){t.delaySetPopupVisible(!0)})),d()(l()(t),"onMouseLeave",(function(e){t.delaySetPopupVisible(!1)})),d()(l()(t),"onFocus",(function(e){t.delaySetPopupVisible(!0)})),d()(l()(t),"onBlur",(function(e){t.delaySetPopupVisible(!1)})),d()(l()(t),"onContextMenuClose",(function(){t.hide()})),t}c()(t,e),t.getDerivedStateFromProps=function(e,t){return{popupVisible:void 0===e.popupVisible?t.popupVisible:e.popupVisible}};var o=t.prototype;return o.componentDidMount=function(){this.togglePopupCloseEvents()},o.componentDidUpdate=function(){this.togglePopupCloseEvents()},o.componentWillUnmount=function(){this.clearDelayTimer(),this.clearOutsideHandler()},o.togglePopupCloseEvents=function(){var e=this,t=this.props.getDocument;if(this.state.popupVisible){var o=t();!this.clickOutsideHandler&&(this.isMouseDownToHide()||this.isClickToHide()||this.isContextMenuToShow())&&(this.clickOutsideHandler=Object(b.a)(o,"mousedown",(function(t){e.onDocumentClick(t)}))),!this.touchOutsideHandler&&E&&(this.touchOutsideHandler=Object(b.a)(o,"click",this.onDocumentClick)),!this.contextMenuOutsideHandler1&&this.isContextMenuToShow()&&(this.contextMenuOutsideHandler1=Object(b.a)(o,"scroll",this.onContextMenuClose)),!this.contextMenuOutsideHandler2&&this.isContextMenuToShow()&&(this.contextMenuOutsideHandler2=Object(b.a)(window,"blur",this.onContextMenuClose)),!this.windowScrollHandler&&this.isWindowScrollToHide()&&(this.windowScrollHandler=Object(b.a)(o,"scroll",this.onDocumentClick)),!this.windowResizeHandler&&this.isWindowResizeToHide()&&(this.windowResizeHandler=Object(b.a)(window,"resize",this.hide.bind(this)))}else this.clearOutsideHandler()},o.getTriggerNode=function(){return Object(r.findDOMNode)(this)},o.getComponentNode=function(){return Object(r.findDOMNode)(this)},o.clearOutsideHandler=function(){this.clickOutsideHandler&&(this.clickOutsideHandler(),this.clickOutsideHandler=null),this.contextMenuOutsideHandler1&&(this.contextMenuOutsideHandler1(),this.contextMenuOutsideHandler1=null),this.contextMenuOutsideHandler2&&(this.contextMenuOutsideHandler2(),this.contextMenuOutsideHandler2=null),this.touchOutsideHandler&&(this.touchOutsideHandler(),this.touchOutsideHandler=null),this.windowScrollHandler&&(this.windowScrollHandler(),this.windowScrollHandler=null),this.windowResizeHandler&&(this.windowResizeHandler(),this.windowResizeHandler=null)},o._setPopupVisible=function(e){var t,o;"popupVisible"in this.props||this.setState({popupVisible:e}),null===(t=(o=this.props).onPopupVisibleChange)||void 0===t||t.call(o,e)},o.show=function(){this.delaySetPopupVisible(!0)},o.hide=function(){this.delaySetPopupVisible(!1)},o.clearDelayTimer=function(){this.delayTimer&&(clearTimeout(this.delayTimer),this.delayTimer=null)},o.getDelayTime=function(e){void 0===e&&(e="show");var t=this.props.delay;return t&&"number"!==typeof t?Math.abs(t[e]):Math.abs(t)},o.delaySetPopupVisible=function(e){var t=this;if(this.state.popupVisible!==e){this.clearDelayTimer();var o=this.getDelayTime(e?"show":"hide");o?this.delayTimer=setTimeout((function(){t.delayTimer=null,t._setPopupVisible(e)}),o):this._setPopupVisible(e)}},o.checkToShow=function(e){for(var t=this.props,o=t.action,n=t.showAction,i=Array.isArray(o)?o:[o],r=Array.isArray(n)?n:[n],s=[].concat(i,r),a=0;a<e.length;a++)if(-1!==s.indexOf(e[a]))return!0;return!1},o.checkToHide=function(e){for(var t=this.props,o=t.action,n=t.hideAction,i=Array.isArray(o)?o:[o],r=Array.isArray(n)?n:[n],s=[].concat(i,r),a=0;a<e.length;a++)if(-1!==s.indexOf(e[a]))return!0;return!1},o.isContextMenuToShow=function(){return this.checkToShow(["contextMenu"])},o.isMouseDownToShow=function(){return this.checkToShow(["mouseDown"])},o.isMouseDownToHide=function(){return this.checkToHide(["mouseDown"])},o.isClickToShow=function(){return this.checkToShow(["click"])},o.isClickToHide=function(){return this.checkToHide(["click"])},o.isMouseEnterToShow=function(){return this.checkToShow(["hover","mouseEnter"])},o.isMouseLeaveToHide=function(){return this.checkToHide(["hover","mouseLeave"])},o.onContextMenu=function(e){e.preventDefault(),this.delaySetPopupVisible(!0)},o.onTriggerClick=function(e){var t=!this.state.popupVisible;(this.isClickToHide()&&!t||t&&this.isClickToShow())&&this.delaySetPopupVisible(t)},o.onTriggerMouseDown=function(e){var t=!this.state.popupVisible;(this.isMouseDownToHide()&&!t||t&&this.isMouseDownToShow())&&this.delaySetPopupVisible(t)},o.setPopupPosition=function(e){var t=this.props,o=t.placement,n=t.offset,i=t.position;y()(e,Object.assign(Object.assign({},function(e,t){return"number"===typeof t&&(t=/^left|right/.test(e)?[t,0]:[0,t]),k[e]?k[e](t||[0,0]):null}(o,n)),{},{collision:"flipfit",of:this.getTriggerNode()},i))},o.getPopupComponent=function(){var e=this,t=this.props,o=t.popup,n=t.prefixCls,r=t.popupClassName,s=t.popupMaskClassName,a=t.popupProps,l=t.popupMaskProps,u=t.popupTransition,c=t.popupMaskTransition,p=t.forceRender,d=t.mask,h=t.disableMask,f=t.maskClosable,v=t.popupStyle,b=t.popupMaskStyle,g=t.destroyPopupOnHide,T=t.zIndex,y=t.popupRootClassName,M=t.popupRootStyle,H=t.onBeforeShow,k=t.onAfterShow,E=t.onBeforeHide,C=t.onAfterHide,x=this.state.popupVisible,O=Object.assign({},v),P=Object.assign({},b);return null!=T&&(O.zIndex=T,P.zIndex=T),i.a.createElement(w.a,m()({ref:this.refHandlers.popup,prefixCls:n,destroyOnClose:g,style:O,className:r,maskClassName:s,maskStyle:P,mask:d,disableMask:h,rootClassName:y,rootStyle:M,forceRender:p},a,{fixed:!1,visible:x,transition:Object.assign(Object.assign({},u),{},{onEnter:function(t,o){var n;null===H||void 0===H||H(t),e.setPopupPosition(t),null===u||void 0===u||null===(n=u.onEnter)||void 0===n||n.call(u,t,o)},onEntered:function(t,o){var n;e.setPopupPosition(t),null===u||void 0===u||null===(n=u.onEntered)||void 0===n||n.call(u,t,o),null===k||void 0===k||k(t)},onExit:function(e){var t;null===E||void 0===E||E(e),null===u||void 0===u||null===(t=u.onExit)||void 0===t||t.call(u,e)},onExited:function(e){var t;null===C||void 0===C||C(e),null===u||void 0===u||null===(t=u.onExit)||void 0===t||t.call(u,e)}}),onMouseEnter:function(t){var o;e.clearDelayTimer(),null===a||void 0===a||null===(o=a.onMouseEnter)||void 0===o||o.call(a,t)},onMouseLeave:function(t){var o;e.isMouseLeaveToHide()&&e.onMouseLeave(t),null===a||void 0===a||null===(o=a.onMouseLeave)||void 0===o||o.call(a,t)},maskTransition:c,maskProps:Object.assign(Object.assign({},l),{},{onClick:function(t){var o;f&&e.hide(),null===l||void 0===l||null===(o=l.onClick)||void 0===o||o.call(l,t)},onMouseEnter:function(t){var o;e.clearDelayTimer(),null===l||void 0===l||null===(o=l.onMouseEnter)||void 0===o||o.call(l,t)}})}),"function"===typeof o?o(this):o)},o.genNewChildProps=function(e){var t=this,o=this.props.checkDefaultPrevented,n={};return this.isContextMenuToShow()&&(n.onContextMenu=function(n){e.props.onContextMenu&&e.props.onContextMenu(n),o&&n.defaultPrevented||(t.clearDelayTimer(),t.onContextMenu(n))}),(this.isMouseDownToShow()||this.isMouseDownToHide())&&(n.onMouseDown=function(n){e.props.onMouseDown&&e.props.onMouseDown(n),o&&n.defaultPrevented||(t.clearDelayTimer(),t.onTriggerMouseDown(n))}),(this.isClickToHide()||this.isClickToShow())&&(n.onClick=function(n){e.props.onClick&&e.props.onClick(n),o&&n.defaultPrevented||(t.clearDelayTimer(),t.onTriggerClick(n))}),this.isMouseEnterToShow()&&(n.onMouseEnter=function(n){e.props.onMouseEnter&&e.props.onMouseEnter(n),o&&n.defaultPrevented||(t.clearDelayTimer(),t.onMouseEnter(n))}),this.isMouseLeaveToHide()&&(n.onMouseLeave=function(n){e.props.onMouseLeave&&e.props.onMouseLeave(n),o&&n.defaultPrevented||(t.clearDelayTimer(),t.onMouseLeave(n))}),this.isFocusToShow()&&(n.onFocus=function(n){e.props.onFocus&&e.props.onFocus(n),o&&n.defaultPrevented||(t.clearDelayTimer(),t.onFocus(n))}),this.isBlurToHide()&&(n.onBlur=function(n){e.props.onBlur&&e.props.onBlur(n),o&&n.defaultPrevented||(t.clearDelayTimer(),t.onBlur(n))}),n},o.render=function(){var e=this.props,t=e.usePortal,o=e.container,n=i.a.Children.only(this.props.children),r=i.a.cloneElement(n,this.genNewChildProps(n)),s=this.getPopupComponent();return t&&(s=i.a.createElement(M.a,{container:o},s)),i.a.createElement(i.a.Fragment,null,r,s)},t}(i.a.Component);d()(C,"defaultProps",{prefixCls:"rw-trigger",placement:"bottomLeft",offset:0,defaultPopupVisible:!1,action:["click"],showAction:[],hideAction:[],delay:0,getDocument:function(){return window.document},container:document.body,mask:!1,maskClosable:!0,destroyPopupOnHide:!0,popupProps:{},popupStyle:{},popupMaskStyle:{},checkDefaultPrevented:!1,usePortal:!0});var x=C,O={appear:"animated",appearActive:"fadeBottomIn",enter:"animated",enterActive:"fadeBottomIn",enterDone:"",exit:"animated",exitActive:"fadeBottomOut",exitDone:""};function P(e){var t=e.text,o=v()(e,["text"]);return i.a.createElement(x,m()({offset:2,popup:i.a.createElement("div",{style:{width:200,height:50,border:"1px solid #ccc",padding:5,backgroundColor:"#FFF"}},"test...")},o),i.a.createElement("button",null,t||o.placement))}var S=[{label:"\u57fa\u672c\u529f\u80fd",component:function(e){function t(){for(var t,o=arguments.length,n=new Array(o),i=0;i<o;i++)n[i]=arguments[i];return t=e.call.apply(e,[this].concat(n))||this,d()(l()(t),"state",{visible:!0}),t}c()(t,e);var o=t.prototype;return o.componentDidMount=function(){},o.render=function(){return i.a.createElement("div",null,i.a.createElement(P,{action:"hover",placement:"bottomLeft"}),i.a.createElement(P,{action:"hover",placement:"bottom"}),i.a.createElement(P,{action:"hover",placement:"bottomRight"}),i.a.createElement("hr",null),i.a.createElement(P,{action:"hover",placement:"topLeft"}),i.a.createElement(P,{action:"hover",placement:"top"}),i.a.createElement(P,{action:"hover",placement:"topRight"}),i.a.createElement("hr",null),i.a.createElement(P,{action:"hover",placement:"leftTop"}),i.a.createElement("div",{style:{position:"relative"}},i.a.createElement(P,{action:"hover",usePortal:!1,placement:"left"})),i.a.createElement(P,{action:"hover",placement:"leftBottom"}),i.a.createElement("hr",null),i.a.createElement(P,{action:"hover",placement:"rightTop"}),i.a.createElement("div",{style:{position:"relative"}},i.a.createElement(P,{action:"hover",usePortal:!1,placement:"right"})),i.a.createElement(P,{action:"hover",placement:"rightBottom"}),i.a.createElement("hr",null),i.a.createElement(P,{placement:"bottomLeft",action:"contextMenu",hideAction:"mouseDown",text:"action:contextMenu",popupTransition:{classNames:O,timeout:300}}),i.a.createElement(P,{placement:"bottomLeft",action:"click",text:"action:click",popupTransition:{classNames:O,timeout:300}}),i.a.createElement(P,{placement:"bottomLeft",action:"hover",text:"action:hover",delay:200,popupTransition:{classNames:O,timeout:300}}),i.a.createElement(P,{placement:"bottomLeft",action:"focus",text:"action:focus",popupTransition:{classNames:O,timeout:300}}),i.a.createElement(P,{placement:"bottomLeft",action:"mouseDown",text:"action:mouseDown",popupTransition:{classNames:O,timeout:300}}),i.a.createElement("hr",null),i.a.createElement(P,{placement:"bottomLeft",mask:!0,text:"mask"}),i.a.createElement(P,{placement:"bottomLeft",popupTransition:{classNames:O,timeout:300},text:"popupTransition"}))},t}(n.Component)}],D=function(e){function t(){for(var t,o=arguments.length,n=new Array(o),i=0;i<o;i++)n[i]=arguments[i];return t=e.call.apply(e,[this].concat(n))||this,d()(l()(t),"state",{current:S[0]}),t}c()(t,e);var o=t.prototype;return o.onDemoChange=function(e,t){this.setState({current:e})},o.render=function(){var e=this,t=this.state.current;return i.a.createElement("div",{className:"container"},i.a.createElement("div",{className:"slider"},S.map((function(o,n){return i.a.createElement("div",{key:n,className:t===o?"active":"",onClick:e.onDemoChange.bind(e,o)},o.label)}))),i.a.createElement("div",{className:"content"},t?i.a.createElement(t.component,null):null))},t}(n.Component);s.a.render(i.a.createElement(D,null),document.getElementById("demo"))},90:function(e,t,o){o(91),e.exports=o(150)}},[[90,1,2]]]);