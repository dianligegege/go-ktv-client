import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import jsSHA from "jssha";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// 生成唯一key
export function generateKey(obj: object = {}) {
  try {
    const shaObj = new jsSHA('SHA-256', 'TEXT', { encoding: 'UTF8' });
    shaObj.update(JSON.stringify(obj));
    return shaObj.getHash('HEX');
  } catch (err) {
    return new Date().getTime();
  }
}

// promise 同步锁
export class PromiseLock {
  private lock: Promise<any>;

  constructor() {
    this.lock = Promise.resolve();
  }

  async execute(fn: () => Promise<any>) {
    const result = await this.lock.then(fn);
    return result;
  }
}

// promise 缓存
export class PromiseCache {
  private cache: Record<string, Promise<any>> = {};

  async get(key: string | number, fn: () => Promise<any>): Promise<any> {
    if (!this.cache[key]) {
      this.cache[key] = fn().finally(() => {
        delete this.cache[key];
      });
    }
    return this.cache[key];
  }
}