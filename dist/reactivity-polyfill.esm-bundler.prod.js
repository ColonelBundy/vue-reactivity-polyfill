import"core-js/modules/es.object.to-string";import"core-js/modules/es.array.for-each";import"core-js/modules/es.array.slice";import"core-js/modules/es.object.get-own-property-descriptor";import"core-js/modules/es.object.get-own-property-names";import"core-js/modules/es.object.get-prototype-of";import"core-js/modules/es.object.seal";import"core-js/modules/es.object.set-prototype-of";import"core-js/modules/web.dom-collections.for-each";import e from"@babel/runtime/helpers/typeof";import"vue-reactivity-polyfill-getownpropertynames";import"core-js/modules/es.array.from";import"core-js/modules/es.string.iterator";import{toRaw as r,track as t,ITERATE_KEY as o,isReadonly as n,isProxy as i,reactive as a,isReactive as c,trigger as s,readonly as l,pauseTracking as u,enableTracking as f}from"@vue/reactivity";import p from"@babel/runtime/helpers/objectSpread2";import"core-js/modules/es.regexp.to-string";import v from"core-js/internals/an-object";import y from"core-js/internals/is-object";import m from"core-js/internals/has";import d from"core-js/internals/object-get-own-property-descriptor";import g from"core-js/internals/object-get-prototype-of";import h from"core-js/internals/create-property-descriptor";import{isObject as _,hasOwn as b,isArray as j,isString as w}from"@vue/shared";import"core-js/modules/es.array.concat";import"core-js/modules/es.array.iterator";import"core-js/modules/es.map";import"core-js/modules/es.parse-float";import"core-js/modules/web.dom-collections.iterator";import"core-js/modules/es.array.splice";import"core-js/modules/es.regexp.exec";import"core-js/modules/es.string.replace";var E,A="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function O(e,r,t){Object.defineProperty(e,r,p({configurable:!0,enumerable:!1},t))}function x(e){return!!e["___@getter___"]}(E="undefined"!=typeof process&&"[object process]"==={}.toString.call(process)||"undefined"!=typeof navigator&&"ReactNative"===navigator.product?A:self).Proxy||(E.Proxy=function(){var r,t=null;function o(r){return!!r&&("object"===e(r)||"function"==typeof r)}function n(e){if(null!==e&&!o(e))throw new TypeError("Object prototype may only be an Object or null: "+e)}var i=Object,a=Boolean(i.create)||!({__proto__:null}instanceof i),c=i.create||(a?function(e){return n(e),{__proto__:e}}:function(e){if(n(e),null===e)throw new SyntaxError("Native Object.create is required to create objects with null prototype");var r=function(){};return r.prototype=e,new r}),s=function(){return null},l=i.getPrototypeOf||([].__proto__===Array.prototype?function(e){var r=e.__proto__;return o(r)?r:null}:s);return(r=function(e,u){if(void 0===(this&&this instanceof r?this.constructor:void 0))throw new TypeError("Constructor Proxy requires 'new'");if(!o(e)||!o(u))throw new TypeError("Cannot create proxy with a non-object as target or handler");var f=function(){};t=function(){e=null,f=function(e){throw new TypeError("Cannot perform '".concat(e,"' on a proxy that has been revoked"))}},setTimeout((function(){t=null}),0);var p=u;for(var v in u={get:null,set:null,apply:null,construct:null},p){if(!(v in u))throw new TypeError("Proxy polyfill does not support trap '".concat(v,"'"));u[v]=p[v]}"function"==typeof p&&(u.apply=p.apply.bind(p));var y,m=l(e),d=!1,g=!1;"function"==typeof e?(y=function(){var r=this&&this.constructor===y,t=Array.prototype.slice.call(arguments);if(f(r?"construct":"apply"),r&&u.construct)return u.construct.call(this,e,t);if(!r&&u.apply)return u.apply(e,this,t);if(r){t.unshift(e);var o=e.bind.apply(e,t);return new o}return e.apply(this,t)},d=!0):e instanceof Array?(y=[],g=!0):y=a||null!==m?c(m):{};var h=u.get?function(e){return f("get"),u.get(this,e,y)}:function(e){return f("get"),this[e]},_=u.set?function(e,r){f("set"),u.set(this,e,r,y)}:function(e,r){f("set"),this[e]=r},b=i.getOwnPropertyNames(e),j={};b.forEach((function(r){if(!d&&!g||!(r in y)){var t=i.getOwnPropertyDescriptor(e,r),o={enumerable:Boolean(t.enumerable),get:h.bind(e,r),set:_.bind(e,r)};i.defineProperty(y,r,o),j[r]=!0}}));var w=!0;if(d||g){var E=i.setPrototypeOf||([].__proto__===Array.prototype?function(e,r){return n(r),e.__proto__=r,e}:s);m&&E(y,m)||(w=!1)}if(u.get||!w)for(var A in e)j[A]||i.defineProperty(y,A,{get:h.bind(e,A)});return i.seal(e),i.seal(y),y}).revocable=function(e,o){return{proxy:new r(e,o),revoke:t}},r}(),E.Proxy.revocable=E.Proxy.revocable);var P=Array.from;P&&(Array.from=function(e){var n=P(e);if(!x(e))return n;var i=r(e);if(t(i,"interate",o),i.forEach)i.forEach((function(e,r){t(i,"get",r)}));else for(var a=i.length,c=0;c<a;c++)t(i,"get",c);return n});var R=self.Proxy,S=R&&/native code/.test(R.toString());if(!S){var T=self.Reflect;T.set=function(e,r,t){var o,n=arguments.length<4?e:arguments[3],i=d.f(v(e),r);if(!i){if(y(o=g(e)))return T.set(o,r,t,n);i=h(0)}return m(i,"value")?!(!1===i.writable||!y(n))&&(e[r]=t,!0):void 0!==i.set&&(i.set.call(n,t),!0)}}var N={SKIP:"__v_skip",IS_REACTIVE:"__v_isReactive",IS_READONLY:"__v_isReadonly",RAW:"__v_raw",REACTIVE:"__v_reactive",READONLY:"__v_readonly"};function D(e){var r=parseFloat(String(e));return r>=0&&Math.floor(r)===r&&isFinite(e)}function C(e,r){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"Set",o=n(e);return o&&console.warn("".concat(t,' operation on key "').concat(String(r),'" failed: target is readonly.'),e),o}function I(e){var t=e;return i(e)?e=r(t):t=a(e),{proxy:t,target:e}}function L(e,t,o){if(c(e)){var n=r(e);n[t]=r(o);var i=e["___@setter___"],a=e["___@getter___"],l=Object.getOwnPropertyDescriptor(n,t),u={configurable:!0,enumerable:Boolean(l&&l.enumerable),get:a.bind(n,t),set:i.bind(n,t)};O(e,String(t),u),s(n,"add",t,o)}else C(e,t)||(e[t]=o)}var Y=function(e){return _(e)?a(e):e},k=function(e){return _(e)?l(e):e},V=function(e){return e};var B=Array.prototype,$=Object.create(B);["push","pop","shift","unshift","splice","sort","reverse"].forEach((function(e){var t=B[e];O($,e,{writable:!0,value:function(){var o=r(this),n=i(this)?this:o[N.REACTIVE]||o[N.READONLY];if(!C(n,e)){u();for(var a=o.slice(),c=a.length,l=arguments.length,p=new Array(l),v=0;v<l;v++)p[v]=arguments[v];var y=t.apply(o,p);f();for(var m=o.length,d=0,g=0;d<m||g<c;){if(d<m){var h=a[d],_=o[d];d in a?h!==_&&s(o,"set",d,_,h):L(n,d,_)}else delete n[d],n.length-=1,s(o,"delete",d,void 0,a[d]);d++,g++}return s(o,"clear","length",o.length,c),y}}})}));var q=B.forEach;if(O($,"forEach",{writable:!0,value:function(e,i){var a=r(this),s=n(this),l=c(this),u=s||l?this:a[N.REACTIVE]||a[N.READONLY];!s&&t(a,"iterate",o);var f=s?k:l?Y:V;return q.call(a,(function(r,t){return e.call(i,f(r),t,u)}))}}),!S){var F="__proto__"in{},M=Object.getOwnPropertyNames($),K=function(e,r){var t=Array.isArray(e),o=r.get;r.get=function(e,n,i){return t&&b($,n)?$[n]:o.call(r,e,n,i)};var n=new R(e,r);t&&(F?function(e,r){e.__proto__=r}(e,$):function(e,r,t){t.forEach((function(t){O(e,t,{writable:!0,value:r[t]})}))}(e,$,M));var i=function(t){var o=N[t];b(e,o)&&e[o]===e||o===N.READONLY&&void 0===r.get(e,o,n)||O(n,o,{get:function(){return r.get(e,o,n)}})};for(var a in N)i(a);return n};K.revocable=R.revocable,self.Proxy=K}function W(e,r,t){var o=I(e),n=o.proxy,i=o.target;return x(n)?Array.isArray(i)&&D(r)?(n.splice(r,1,t),t):r in n&&!(r in Object.prototype)?(n[r]=t,t):(L(n,r,t),t):(n[r]=t,t)}function z(o,n,i){if(null==o)return i;for(var a,c=r(o),s=function(r,t){if(j(r))return!1;var o=e(r);if("number"==o||"boolean"==o||null==r)return!0;var n=String(r);return J.test(n)||!H.test(n)||t&&n in Object(t)}(n,c)?[n]:j(a=n)?a:re(a),l=0,u=s.length;c&&l<u;){var f=te(s[l++]);t(c,"get",f),c=r(c[f])}var p=l&&l===u?c:void 0;return void 0===p?i:p}function G(e){var o=e.length;return t(r(e),"get","length"),o}var H=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,J=/^\w*$/,Q=/^\./,U=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,X=/\\(\\)?/g;var Z,ee,re=(Z=function(e){var r=String(e),t=[];return Q.test(r)&&t.push(""),r.replace(U,(function(e,r,o,n){return t.push(o?n.replace(X,"$1"):r||e),n})),t},(ee=function e(r){var t=e.cache;if(t.has(r))return t.get(r);for(var o=arguments.length,n=new Array(o>1?o-1:0),i=1;i<o;i++)n[i-1]=arguments[i];var a=Z.apply(this,[r].concat(n));return e.cache=t.set(r,a),a}).cache=new Map,ee);function te(e){if(w(e))return e;var r=String(e);return"0"==r&&1/e==-1/0?"-0":r}function oe(e,r){var t=I(e),o=t.proxy,n=t.target;if(x(o)){if(!C(o,r,"Delete"))if(Array.isArray(n)&&D(r))o.splice(r,1);else if(b(n,r)){var i=n[r];delete n[r],delete o[r],s(n,"delete",r,void 0,i)}}else delete o[r]}export{oe as del,z as get,G as getLength,W as set};