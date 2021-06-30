'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('core-js/modules/es.object.to-string');
require('core-js/modules/es.array.for-each');
require('core-js/modules/es.array.slice');
require('core-js/modules/es.object.get-own-property-descriptor');
require('core-js/modules/es.object.get-own-property-names');
require('core-js/modules/es.object.get-prototype-of');
require('core-js/modules/es.object.seal');
require('core-js/modules/es.object.set-prototype-of');
require('core-js/modules/web.dom-collections.for-each');
var _typeof = _interopDefault(require('@babel/runtime/helpers/typeof'));
require('vue-reactivity-polyfill-getownpropertynames');
require('core-js/modules/es.array.from');
require('core-js/modules/es.string.iterator');
var reactivity = require('@vue/reactivity');
var _objectSpread = _interopDefault(require('@babel/runtime/helpers/objectSpread2'));
require('core-js/modules/es.regexp.to-string');
var anObject = _interopDefault(require('core-js/internals/an-object'));
var isObject = _interopDefault(require('core-js/internals/is-object'));
var has = _interopDefault(require('core-js/internals/has'));
var getOwnPropertyDescriptorModule = _interopDefault(require('core-js/internals/object-get-own-property-descriptor'));
var getPrototypeOf = _interopDefault(require('core-js/internals/object-get-prototype-of'));
var createPropertyDescriptor = _interopDefault(require('core-js/internals/create-property-descriptor'));
var shared = require('@vue/shared');
require('core-js/modules/es.array.concat');
require('core-js/modules/es.array.iterator');
require('core-js/modules/es.map');
require('core-js/modules/es.parse-float');
require('core-js/modules/web.dom-collections.iterator');
require('core-js/modules/es.array.splice');
require('core-js/modules/es.regexp.exec');
require('core-js/modules/es.string.replace');

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

/*
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
var proxy = function proxyPolyfill() {
  var lastRevokeFn = null;

  var _ProxyPolyfill;
  /**
   * @param {*} o
   * @return {boolean} whether this is probably a (non-null) Object
   */


  function isObject(o) {
    return o ? _typeof(o) === 'object' || typeof o === 'function' : false;
  }

  function validateProto(proto) {
    if (proto !== null && !isObject(proto)) {
      throw new TypeError('Object prototype may only be an Object or null: ' + proto);
    }
  }

  var $Object = Object; // Closure assumes that `{__proto__: null} instanceof Object` is always true, hence why we check against a different name.

  var canCreateNullProtoObjects = Boolean($Object.create) || !({
    __proto__: null
  } instanceof $Object);
  var objectCreate = $Object.create || (canCreateNullProtoObjects ? function create(proto) {
    validateProto(proto);
    return {
      __proto__: proto
    };
  } : function create(proto) {
    validateProto(proto);

    if (proto === null) {
      throw new SyntaxError('Native Object.create is required to create objects with null prototype');
    } // nb. cast to convince Closure compiler that this is a constructor


    var T =
    /** @type {!Function} */
    function T() {};

    T.prototype = proto;
    return new T();
  });

  var noop = function noop() {
    return null;
  };

  var getProto = $Object.getPrototypeOf || ([].__proto__ === Array.prototype ? function getPrototypeOf(O) {
    // If O.[[Prototype]] === null, then the __proto__ accessor won't exist,
    // as it's inherited from `Object.prototype`
    var proto = O.__proto__;
    return isObject(proto) ? proto : null;
  } : noop);
  /**
   * @constructor
   * @param {!Object} target
   * @param {{apply, construct, get, set}} handler
   */

  _ProxyPolyfill = function ProxyPolyfill(target, handler) {
    var newTarget = this && this instanceof _ProxyPolyfill ? this.constructor : undefined;

    if (newTarget === undefined) {
      throw new TypeError("Constructor Proxy requires 'new'");
    }

    if (!isObject(target) || !isObject(handler)) {
      throw new TypeError('Cannot create proxy with a non-object as target or handler');
    } // Construct revoke function, and set lastRevokeFn so that Proxy.revocable can steal it.
    // The caller might get the wrong revoke function if a user replaces or wraps scope.Proxy
    // to call itself, but that seems unlikely especially when using the polyfill.


    var throwRevoked = function throwRevoked() {};

    lastRevokeFn = function lastRevokeFn() {
      /** @suppress {checkTypes} */
      target = null; // clear ref

      throwRevoked = function throwRevoked(trap) {
        throw new TypeError("Cannot perform '".concat(trap, "' on a proxy that has been revoked"));
      };
    };

    setTimeout(function () {
      lastRevokeFn = null;
    }, 0); // Fail on unsupported traps: Chrome doesn't do this, but ensure that users of the polyfill
    // are a bit more careful. Copy the internal parts of handler to prevent user changes.

    var unsafeHandler = handler;
    handler = {
      'get': null,
      'set': null,
      'apply': null,
      'construct': null
    };

    for (var k in unsafeHandler) {
      if (!(k in handler)) {
        throw new TypeError("Proxy polyfill does not support trap '".concat(k, "'"));
      }

      handler[k] = unsafeHandler[k];
    }

    if (typeof unsafeHandler === 'function') {
      // Allow handler to be a function (which has an 'apply' method). This matches what is
      // probably a bug in native versions. It treats the apply call as a trap to be configured.
      handler.apply = unsafeHandler.apply.bind(unsafeHandler);
    } // Define proxy as an object that extends target.[[Prototype]],
    // or a Function (if either it's callable, or apply is set).


    var proto = getProto(target); // can return null in old browsers

    var proxy;
    var isMethod = false;
    var isArray = false;

    if (typeof target === 'function') {
      proxy = function ProxyPolyfill() {
        var usingNew = this && this.constructor === proxy;
        var args = Array.prototype.slice.call(arguments);
        throwRevoked(usingNew ? 'construct' : 'apply'); // TODO(samthor): Closure compiler doesn't know about 'construct', attempts to rename it.

        if (usingNew && handler['construct']) {
          return handler['construct'].call(this, target, args);
        } else if (!usingNew && handler.apply) {
          return handler['apply'](target, this, args);
        } // since the target was a function, fallback to calling it directly.


        if (usingNew) {
          // inspired by answers to https://stackoverflow.com/q/1606797
          args.unshift(target); // pass class as first arg to constructor, although irrelevant
          // nb. cast to convince Closure compiler that this is a constructor

          var f =
          /** @type {!Function} */
          target.bind.apply(target, args);
          return new f();
        }

        return target.apply(this, args);
      };

      isMethod = true;
    } else if (target instanceof Array) {
      proxy = [];
      isArray = true;
    } else {
      proxy = canCreateNullProtoObjects || proto !== null ? objectCreate(proto) : {};
    } // Create default getters/setters. Create different code paths as handler.get/handler.set can't
    // change after creation.


    var getter = handler.get ? function (prop) {
      throwRevoked('get');
      return handler.get(this, prop, proxy);
    } : function (prop) {
      throwRevoked('get');
      return this[prop];
    };
    var setter = handler.set ? function (prop, value) {
      throwRevoked('set');
      var status = handler.set(this, prop, value, proxy); // TODO(samthor): If the calling code is in strict mode, throw TypeError.
      // if (!status) {
      // It's (sometimes) possible to work this out, if this code isn't strict- try to load the
      // callee, and if it's available, that code is non-strict. However, this isn't exhaustive.
      // }
    } : function (prop, value) {
      throwRevoked('set');
      this[prop] = value;
    }; // Clone direct properties (i.e., not part of a prototype).

    var propertyNames = $Object.getOwnPropertyNames(target);
    var propertyMap = {};
    propertyNames.forEach(function (prop) {
      if ((isMethod || isArray) && prop in proxy) {
        return; // ignore properties already here, e.g. 'bind', 'prototype' etc
      }

      var real = $Object.getOwnPropertyDescriptor(target, prop);
      var desc = {
        enumerable: Boolean(real.enumerable),
        get: getter.bind(target, prop),
        set: setter.bind(target, prop)
      };
      $Object.defineProperty(proxy, prop, desc);
      propertyMap[prop] = true;
    }); // Set the prototype, or clone all prototype methods (always required if a getter is provided).
    // TODO(samthor): We don't allow prototype methods to be set. It's (even more) awkward.
    // An alternative here would be to _just_ clone methods to keep behavior consistent.

    var prototypeOk = true;

    if (isMethod || isArray) {
      // Arrays and methods are special: above, we instantiate boring versions of these then swap
      // our their prototype later. So we only need to use setPrototypeOf in these cases. Some old
      // engines support `Object.getPrototypeOf` but not `Object.setPrototypeOf`.
      var setProto = $Object.setPrototypeOf || ([].__proto__ === Array.prototype ? function setPrototypeOf(O, proto) {
        validateProto(proto);
        O.__proto__ = proto;
        return O;
      } : noop);

      if (!(proto && setProto(proxy, proto))) {
        prototypeOk = false;
      }
    }

    if (handler.get || !prototypeOk) {
      for (var _k in target) {
        if (propertyMap[_k]) {
          continue;
        }

        $Object.defineProperty(proxy, _k, {
          get: getter.bind(target, _k)
        });
      }
    } // The Proxy polyfill cannot handle adding new properties. Seal the target and proxy.


    $Object.seal(target);
    $Object.seal(proxy);
    return proxy; // nb. if isMethod is true, proxy != this
  };

  _ProxyPolyfill.revocable = function (target, handler) {
    var p = new _ProxyPolyfill(target, handler);
    return {
      'proxy': p,
      'revoke': lastRevokeFn
    };
  };

  return _ProxyPolyfill;
};

(function (scope) {
  if (scope['Proxy']) {
    return;
  }

  scope.Proxy = proxy();
  scope.Proxy['revocable'] = scope.Proxy.revocable;
})('undefined' !== typeof process && '[object process]' === {}.toString.call(process) || 'undefined' !== typeof navigator && navigator.product === 'ReactNative' ? commonjsGlobal : self);

function def(obj, key, attrs) {
  Object.defineProperty(obj, key, _objectSpread({
    configurable: true,
    enumerable: false
  }, attrs));
}
function isPolyfillProxy(proxy) {
  var getter = proxy['___@getter___'];
  return !!getter;
}

var originFrom = Array.from;
originFrom && (Array.from = function (arrayLike) {
  var ret = originFrom(arrayLike);

  if (!isPolyfillProxy(arrayLike)) {
    return ret;
  }

  var raw = reactivity.toRaw(arrayLike); // at least call once for ITERATE_KEY

  reactivity.track(raw, 'interate', reactivity.ITERATE_KEY); // check forEach
  // @ts-ignore

  if (raw.forEach) {
    // @ts-ignore
    raw.forEach(function (_, key) {
      reactivity.track(raw, 'get', key);
    });
  } else {
    var len = raw.length;

    for (var i = 0; i < len; i++) {
      reactivity.track(raw, 'get', i);
    }
  }

  return ret;
});

var NativeProxy = self.Proxy;
var isNativeProxy = NativeProxy && /native code/.test(NativeProxy.toString());

if (!isNativeProxy) {
  // hack reflect
  // because patch-pkg cannot patch peer deps core-js
  var _Reflect = self.Reflect;

  _Reflect.set = function (target, propertyKey, V)
  /* , receiver */
  {
    var receiver = arguments.length < 4 ? target : arguments[3];
    var ownDescriptor = getOwnPropertyDescriptorModule.f(anObject(target), propertyKey); // let existingDescriptor

    var prototype;

    if (!ownDescriptor) {
      if (isObject(prototype = getPrototypeOf(target))) {
        return _Reflect.set(prototype, propertyKey, V, receiver);
      }

      ownDescriptor = createPropertyDescriptor(0);
    }

    if (has(ownDescriptor, 'value')) {
      if (ownDescriptor.writable === false || !isObject(receiver)) return false; // just set value

      target[propertyKey] = V; // if (existingDescriptor = getOwnPropertyDescriptorModule.f(receiver, propertyKey)) {
      //   if (existingDescriptor.get || existingDescriptor.set || existingDescriptor.writable === false) return false;
      //   existingDescriptor.value = V;
      //   definePropertyModule.f(receiver, propertyKey, existingDescriptor);
      // } else definePropertyModule.f(receiver, propertyKey, createPropertyDescriptor(0, V));

      return true;
    }

    return ownDescriptor.set === undefined ? false : (ownDescriptor.set.call(receiver, V), true);
  };
}

var ReactiveFlags = {
  SKIP: "__v_skip",
  IS_REACTIVE: "__v_isReactive",
  IS_READONLY: "__v_isReadonly",
  RAW: "__v_raw",
  REACTIVE: "__v_reactive",
  READONLY: "__v_readonly"
};
function isValidArrayIndex(val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val);
}
function handleReadonly(proxy, key) {
  var operation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "Set";

  var _isReadonly = reactivity.isReadonly(proxy);

  if (_isReadonly) {
    console.warn("".concat(operation, " operation on key \"").concat(String(key), "\" failed: target is readonly."), proxy);
  }

  return _isReadonly;
}
function getProxyAndTarget(target) {
  var proxy = target;

  if (reactivity.isProxy(target)) {
    target = reactivity.toRaw(proxy);
  } else {
    proxy = reactivity.reactive(target);
  }

  return {
    proxy: proxy,
    target: target
  };
}
function addProp(proxy, key, val) {
  var _isReactive = reactivity.isReactive(proxy);

  if (_isReactive) {
    var target = reactivity.toRaw(proxy);
    target[key] = reactivity.toRaw(val);
    var setter = proxy["___@setter___"];
    var getter = proxy["___@getter___"];
    var real = Object.getOwnPropertyDescriptor(target, key);
    var desc = {
      configurable: true,
      enumerable: Boolean(real && real.enumerable),
      get: getter.bind(target, key),
      set: setter.bind(target, key)
    };
    def(proxy, String(key), desc);
    reactivity.trigger(target, "add", key, val);
  } else if (handleReadonly(proxy, key)) ; else {
    // just set
    proxy[key] = val;
  }
}
var toReactive = function toReactive(value) {
  return shared.isObject(value) ? reactivity.reactive(value) : value;
};
var toReadonly = function toReadonly(value) {
  return shared.isObject(value) ? reactivity.readonly(value) : value;
};
var toShallow = function toShallow(value) {
  return value;
};
function memoize(func) {
  var memoized = function memoized(key) {
    var cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var result = func.apply(this, [key].concat(args));
    memoized.cache = cache.set(key, result);
    return result;
  };

  memoized.cache = new Map();
  return memoized;
}
function protoAugment(target, src) {
  target.__proto__ = src;
}
function copyAugment(target, src, keys) {
  keys.forEach(function (key) {
    def(target, key, {
      writable: true,
      value: src[key]
    });
  });
}

var arrayProto = Array.prototype; // const methods = Object.getOwnPropertyNames(arrayProto)

var arrayMethods = Object.create(arrayProto);
var methodsToPatch = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse']; // hook API
// methods.forEach(method => {
//   if (methodsToPatch.includes(method)) {
//     return
//   }
//   const original = arrayProto[method]
//   def(arrayMethods, method, {
//     writable: true,
//     value: function mutator (...args: any[]) {
//       // const target = toRaw(this) as any
//       debugger
//       const result = original.apply(this, args)
//       return result
//     }
//   })
// })

methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, {
    writable: true,
    value: function mutator() {
      var target = reactivity.toRaw(this);
      var proxy = reactivity.isProxy(this) ? this : target[ReactiveFlags.REACTIVE] || target[ReactiveFlags.READONLY];

      if (handleReadonly(proxy, method)) {
        return;
      } // fix https://github.com/vuejs/vue-next/issues/2137


      reactivity.pauseTracking();
      var oldThis = target.slice();
      var oldLen = oldThis.length;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var result = original.apply(target, args);
      reactivity.enableTracking();
      var newLen = target.length;
      var i = 0;
      var j = 0;

      while (i < newLen || j < oldLen) {
        if (i < newLen) {
          // update
          var oldVal = oldThis[i];
          var newVal = target[i];

          if (!(i in oldThis)) {
            // set
            addProp(proxy, i, newVal);
          } else {
            if (oldVal !== newVal) {
              reactivity.trigger(target, 'set', i, newVal, oldVal);
            }
          }
        } else {
          delete proxy[i];
          proxy.length -= 1; // delete old

          reactivity.trigger(target, 'delete', i, undefined, oldThis[i]);
        }

        i++;
        j++;
      } // if (oldLen !== newLen) {
      //   // length changed
      //   trigger(target, 'set' as TriggerOpTypes, 'length', target.length, oldLen)
      // }
      // always trigger clear to hack trigger all effects


      reactivity.trigger(target, 'clear', 'length', target.length, oldLen);
      return result;
    }
  });
});
var method = 'forEach';
var _forEach = arrayProto[method];
def(arrayMethods, method, {
  writable: true,
  value: function mutator(callback, thisArg) {
    var target = reactivity.toRaw(this);

    var _isReadonly = reactivity.isReadonly(this);

    var _isReactive = reactivity.isReactive(this);

    var proxy = _isReadonly || _isReactive ? this : target[ReactiveFlags.REACTIVE] || target[ReactiveFlags.READONLY];
    !_isReadonly && reactivity.track(target, 'iterate', reactivity.ITERATE_KEY);
    var wrap = _isReadonly ? toReadonly : _isReactive ? toReactive : toShallow;

    function wrappedCallback(value, key) {
      return callback.call(thisArg, wrap(value), key, proxy);
    }

    return _forEach.call(target, wrappedCallback);
  }
});

if (!isNativeProxy) {
  var hasProto = ('__proto__' in {});
  var arrayKeys = Object.getOwnPropertyNames(arrayMethods); // hack Proxy for Vue

  var ProxyPolyfill = function ProxyPolyfill(target, handler) {
    var isArray = Array.isArray(target); // for Array cases
    // vue3 handle proto methods too
    // so we neet to force delegate it
    // https://github.com/vuejs/vue-next/issues/2137

    var originGet = handler.get;

    handler.get = function (target, key, receiver) {
      if (isArray && shared.hasOwn(arrayMethods, key)) {
        // array proto methods cases
        // just return arrayMethods key
        return arrayMethods[key];
      }

      var ret = originGet.call(handler, target, key, receiver);
      return ret;
    };

    var proxy = new NativeProxy(target, handler);

    if (isArray) {
      // array cases
      if (hasProto) {
        protoAugment(target, arrayMethods);
      } else {
        copyAugment(target, arrayMethods, arrayKeys);
      }
    }

    var _loop = function _loop(k) {
      var key = ReactiveFlags[k]; // undefined do not use to define and should not define
      // if target hasOwn key can not define again

      if (!shared.hasOwn(target, key) || target[key] !== target) {
        if (key !== ReactiveFlags.READONLY || handler.get(target, key, proxy) !== undefined) {
          def(proxy, key, {
            get: function get() {
              return handler.get(target, key, proxy);
            }
          });
        }
      }
    };

    for (var k in ReactiveFlags) {
      _loop(k);
    }

    return proxy;
  };

  ProxyPolyfill.revocable = NativeProxy.revocable;
  self.Proxy = ProxyPolyfill;
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */

function set(o, key, val) {
  var _getProxyAndTarget = getProxyAndTarget(o),
      proxy = _getProxyAndTarget.proxy,
      target = _getProxyAndTarget.target;

  if (!isPolyfillProxy(proxy)) {
    proxy[key] = val;
    return val;
  }

  if (Array.isArray(target) && isValidArrayIndex(key)) {
    proxy.splice(key, 1, val);
    return val;
  } // already exits


  if (key in proxy && !(key in Object.prototype)) {
    proxy[key] = val;
    return val;
  }

  addProp(proxy, key, val);
  return val;
}

/**
 * Get a property on an object.
 * Auto track deps.
 */
function get(object, path, defaultVal) {
  if (object === null || object === undefined) {
    return defaultVal;
  }

  var proxy = object;
  var target = reactivity.toRaw(proxy);
  var paths = isKey(path, target) ? [path] : castPath(path);
  var index = 0;
  var length = paths.length;

  while (target && index < length) {
    var k = toKey(paths[index++]);
    reactivity.track(target, 'get', k);
    target = reactivity.toRaw(target[k]);
  }

  var result = index && index === length ? target : undefined;
  return result === undefined ? defaultVal : result;
}
function getLength(array) {
  var len = array.length;
  reactivity.track(reactivity.toRaw(array), 'get', 'length');
  return len;
}
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
var reIsPlainProp = /^\w*$/;
var reLeadingDot = /^\./;
var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
var reEscapeChar = /\\(\\)?/g;

function isKey(value, object) {
  if (shared.isArray(value)) {
    return false;
  }

  var type = _typeof(value);

  if (type == 'number' || type == 'boolean' || value === null || value === undefined) {
    return true;
  }

  var strValue = String(value);
  return reIsPlainProp.test(strValue) || !reIsDeepProp.test(strValue) || object && strValue in Object(object);
}

var stringToPath = memoize(function (str) {
  var _str = String(str);

  var result = [];

  if (reLeadingDot.test(_str)) {
    result.push('');
  }

  _str.replace(rePropName, function (match, number, quote, str) {
    result.push(quote ? str.replace(reEscapeChar, '$1') : number || match);
    return str;
  });

  return result;
});

function castPath(value) {
  return shared.isArray(value) ? value : stringToPath(value);
}

var INFINITY = 1 / 0;

function toKey(value) {
  if (shared.isString(value)) {
    return value;
  }

  var result = String(value);
  return result == '0' && 1 / value == -INFINITY ? '-0' : result;
}

/**
 * Delete a property and trigger change if necessary.
 */

function del(o, key) {
  var _getProxyAndTarget = getProxyAndTarget(o),
      proxy = _getProxyAndTarget.proxy,
      target = _getProxyAndTarget.target;

  if (!isPolyfillProxy(proxy)) {
    delete proxy[key];
    return;
  }

  if (handleReadonly(proxy, key, 'Delete')) {
    return;
  }

  if (Array.isArray(target) && isValidArrayIndex(key)) {
    proxy.splice(key, 1);
    return;
  }

  if (!shared.hasOwn(target, key)) {
    return;
  }

  var oldVal = target[key];
  delete target[key];
  delete proxy[key];
  reactivity.trigger(target, 'delete', key, undefined, oldVal);
}

exports.del = del;
exports.get = get;
exports.getLength = getLength;
exports.set = set;
