/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this.capacity = capacity
  this.cache = new Map()
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  if (this.cache.has(key)) {
    this.cache.delete(key)
    const value = this.cache.get(key)
    this.cache.set(key, value)
    return value
  }
  return -1
};

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  if (this.cache.has(key)) {
    this.cache.delete(key)
  }
  this.set(key, value)
  if (this.cache.size > this.capacity) {
    this.cache.delete(cache.keys().next().value)
  }
  this.cache.set(key, value)
};

// /**
//  * Your LRUCache object will be instantiated and called as such:
//  * var obj = new LRUCache(capacity)
//  * var param_1 = obj.get(key)
//  * obj.put(key,value)
//  */

/**
 * 如果是栈那确实push后栈顶是最新即可，但如果是基于Map实现呢
 * 确保最新的方法就是先delete然后再set
 * 具体看下图的Map介绍
 */
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity
    this.cache = new Map()
  }
  get(k) {
    if (this.cache.has(k)) {
      const v = this.cache.get(k)
      this.cache.delete(k)
      this.cache.set(k, v)
      return v
    }
    return -1
  }
  put(k, v) {
    if (this.cache.has(k)) {
      // delete if exit
      this.cache.delete(k)
    }

    this.cache.set(k, v)

    // make sure not to exceed the range
    if (this.cache.size > this.capacity) {
      const temp = this.cache.keys().next().value
      this.cache.delete(temp)
    }

  }