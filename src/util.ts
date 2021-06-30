import {
  reactive,
  readonly,
  toRaw,
  trigger,
  isReactive,
  isReadonly,
  isProxy,
  TriggerOpTypes,
} from "@vue/reactivity";
import { isObject } from "@vue/shared";
import { def } from "./lang";
export { def, isPolyfillProxy } from "./lang";

export const ReactiveFlags: Record<string, string> = {
  SKIP: "__v_skip",
  IS_REACTIVE: "__v_isReactive",
  IS_READONLY: "__v_isReadonly",
  RAW: "__v_raw",
  REACTIVE: "__v_reactive",
  READONLY: "__v_readonly",
};

export function isValidArrayIndex(val: any) {
  const n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val);
}

export function handleReadonly(
  proxy: any,
  key: any,
  operation: string = "Set"
) {
  const _isReadonly = isReadonly(proxy);
  if (_isReadonly) {
    console.warn(
      `${operation} operation on key "${String(
        key
      )}" failed: target is readonly.`,
      proxy
    );
  }
  return _isReadonly;
}

export function getProxyAndTarget(target: any): { proxy: any; target: any } {
  let proxy: any = target;
  if (isProxy(target)) {
    target = toRaw(proxy);
  } else {
    proxy = reactive(target);
  }
  return {
    proxy,
    target,
  };
}

export function addProp(proxy: any, key: any, val: any) {
  const _isReactive = isReactive(proxy);
  if (_isReactive) {
    const target = toRaw(proxy);
    target[key] = toRaw(val);

    const setter = proxy["___@setter___"];
    const getter = proxy["___@getter___"];
    const real = Object.getOwnPropertyDescriptor(target, key);
    const desc = {
      configurable: true,
      enumerable: Boolean(real && real.enumerable),
      get: getter.bind(target, key),
      set: setter.bind(target, key),
    };
    def(proxy, String(key), desc);
    trigger(target, "add" as TriggerOpTypes, key, val);
  } else if (handleReadonly(proxy, key)) {
  } else {
    // just set
    proxy[key] = val;
  }
}

export const toReactive = <T extends unknown>(value: T): T =>
  isObject(value) ? (reactive(value as object) as T) : value;

export const toReadonly = <T extends unknown>(value: T): T =>
  isObject(value) ? (readonly(value as object) as T) : value;

export const toShallow = <T extends unknown>(value: T): T => value;

export function memoize<T extends (...args: any[]) => any>(func: T) {
  type FuncType = typeof func;
  var memoized = function (this: any, key, ...args) {
    const cache = memoized.cache;
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = func.apply(this, [key, ...args]);
    memoized.cache = cache.set(key, result);
    return result;
  } as FuncType & {
    cache: Map<any, any>;
  };
  memoized.cache = new Map();
  return memoized;
}

export function protoAugment(target: any, src: object) {
  target.__proto__ = src;
}

export function copyAugment(target: any, src: any, keys: string[]) {
  keys.forEach((key) => {
    def(target, key, {
      writable: true,
      value: src[key],
    });
  });
}
