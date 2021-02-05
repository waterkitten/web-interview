## LRU

> 上次字节训练营的一道面试题
> 当时连LRU缓存是啥都不知道
> 虽然这个概念不影响解题
> 但今天想到了就记录下来
> 难度的划分是mid，但我感觉js实现真的很简单，难度也只有一个easy吧（用Map对象实现的话）
> 但看了其他语言实现，好像更复杂且考虑的东西会更多

LRU（Least Recently Used）是一种常见的[页面置换算法](https://baike.baidu.com/item/页面置换算法/7626091)，在计算中，所有的文件操作都要放在内存中进行，然而计算机内存大小是固定的，所以我们不可能把所有的文件都加载到内存，因此我们需要制定一种策略对加入到内存中的文件进项选择。

常见的页面置换算法有如下几种：

- LRU 最近最久未使用
- FIFO 先进先出置换算法 类似队列
- OPT 最佳置换算法 （理想中存在的）
- NRU Clock置换算法
- LFU 最少使用置换算法
- PBA 页面缓冲算法

LRU的设计原理就是一种缓存淘汰策略，当数据在最近一段时间经常被访问，那么它在以后也会经常被访问。这就意味着，如果经常访问的数据，我们需要然其能够快速命中，而不常访问的数据，我们在容量超出限制内，要将其淘汰。

## LRU缓存算法题

> 设计和构建一个“最近最少使用”缓存，该缓存会删除最近最少使用的项目。缓存应该从键映射到值(允许你插入和检索特定键对应的值)，并在初始化时指定最大容量。当缓存被填满时，它应该删除最近最少使用的项目。
>
> 它应该支持以下操作： 获取数据 get 和 写入数据 put 。
>
> 获取数据 get(key) - 如果密钥 (key) 存在于缓存中，则获取密钥的值（总是正数），否则返回 -1。
> 写入数据 put(key, value) - 如果密钥不存在，则写入其数据值。当缓存容量达到上限时，它应该在写入新数据之前删除最近最少使用的数据值，从而为新的数据值留出空间。
>
> 示例:
>
> ```
> LRUCache cache = new LRUCache( 2 /* 缓存容量 */ );
> 
> cache.put(1, 1);
> cache.put(2, 2);
> cache.get(1);       // 返回  1
> cache.put(3, 3);    // 该操作会使得密钥 2 作废
> cache.get(2);       // 返回 -1 (未找到)
> cache.put(4, 4);    // 该操作会使得密钥 1 作废
> cache.get(1);       // 返回 -1 (未找到)
> cache.get(3);       // 返回  3
> cache.get(4);       // 返回  4
> ```



这道题的实现方法有很多，可以选择链表或者是数据来构建

1. 数组——>查询快，但删改不方便
2. 链表——>查询慢，但对于删改来说十分方便，时间复杂度O（1）内搞定

有没有办法既能够让其搜索快，又能够快速进行增删操作。
我们可以选择**链表+hash表**，hash表的搜索可以达到0(1)时间复杂度，这样就完美的解决我们搜索时间慢的问题了

思想很简单，就是借助哈希表赋予了链表快速查找的特性

## Java代码实现

```java
/*
*实现方式是直接从力扣官方题解里面巴拉下来的 目前还不熟悉Java   后面再来看
*/
public class LRUCache {
    class DLinkedNode {
        int key;
        int value;
        DLinkedNode prev;
        DLinkedNode next;
        public DLinkedNode() {}
        public DLinkedNode(int _key, int _value) {key = _key; value = _value;}
    }

    private Map<Integer, DLinkedNode> cache = new HashMap<Integer, DLinkedNode>();
    private int size;
    private int capacity;
    private DLinkedNode head, tail;

    public LRUCache(int capacity) {
        this.size = 0;
        this.capacity = capacity;
        // 使用伪头部和伪尾部节点
        head = new DLinkedNode();
        tail = new DLinkedNode();
        head.next = tail;
        tail.prev = head;
    }

    public int get(int key) {
        DLinkedNode node = cache.get(key);
        if (node == null) {
            return -1;
        }
        // 如果 key 存在，先通过哈希表定位，再移到头部
        moveToHead(node);
        return node.value;
    }

    public void put(int key, int value) {
        DLinkedNode node = cache.get(key);
        if (node == null) {
            // 如果 key 不存在，创建一个新的节点
            DLinkedNode newNode = new DLinkedNode(key, value);
            // 添加进哈希表
            cache.put(key, newNode);
            // 添加至双向链表的头部
            addToHead(newNode);
            ++size;
            if (size > capacity) {
                // 如果超出容量，删除双向链表的尾部节点
                DLinkedNode tail = removeTail();
                // 删除哈希表中对应的项
                cache.remove(tail.key);
                --size;
            }
        }
        else {
            // 如果 key 存在，先通过哈希表定位，再修改 value，并移到头部
            node.value = value;
            moveToHead(node);
        }
    }

    private void addToHead(DLinkedNode node) {
        node.prev = head;
        node.next = head.next;
        head.next.prev = node;
        head.next = node;
    }

    private void removeNode(DLinkedNode node) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    private void moveToHead(DLinkedNode node) {
        removeNode(node);
        addToHead(node);
    }

    private DLinkedNode removeTail() {
        DLinkedNode res = tail.prev;
        removeNode(res);
        return res;
    }
}

```



## JS代码实现

### JS原生实现

```javascript
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
  this.set(key,value)
  if(this.cache.size>this.capacity){
    this.cache.delete(cache.keys().next().value)
  }
  this.cache.set(key,value)
};

// /**
//  * Your LRUCache object will be instantiated and called as such:
//  * var obj = new LRUCache(capacity)
//  * var param_1 = obj.get(key)
//  * obj.put(key,value)
//  */

```



### ES6实现（最舒服的方法，后面有关于map对象的补充说明）

```javascript
/**

 \* 如果是栈那确实push后栈顶是最新即可，但如果是基于Map实现呢

 \* 确保最新的方法就是先delete然后再set

 \* 具体看下图的Map介绍

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
```

#### Map对象	

**`Map`** 对象保存键值对，并且**能够记住键的原始插入顺序**。任何值(对象或者[原始值](https://developer.mozilla.org/zh-CN/docs/Glossary/Primitive)) 都可以作为一个键或一个值。

一个Map对象在迭代时会根据对象中元素的插入顺序来进行 — 一个  [`for...of`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of) 循环在每次迭代后会返回一个形式为[key，value]的数组。

#### [Objects 和 maps 的比较](https://developer.mozilla.org/zh-cn/docs/Web/JavaScript/Reference/Global_Objects/Map#objects_和_maps_的比较)

[`Objects`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object) 和 `Maps` 类似的是，它们都允许你按键存取一个值、删除键、检测一个键是否绑定了值。因此（并且也没有其他内建的替代方式了）过去我们一直都把对象当成 `Maps` 使用。不过 `Maps` 和 `Objects` 有一些重要的区别，在下列情况里使用 `Map` 会是更好的选择：

|          | Map                                                          | Object                                                       |
| :------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| 意外的键 | `Map` 默认情况不包含任何键。只包含显式插入的键。             | 一个 `Object` 有一个原型, 原型链上的键名有可能和你自己在对象上的设置的键名产生冲突。**注意:** 虽然 ES5 开始可以用 `Object.create(null)` 来创建一个没有原型的对象，但是这种用法不太常见。 |
| 键的类型 | 一个 `Map`的键可以是**任意值**，包括函数、对象或任意基本类型。 | 一个`Object` 的键必须是一个 [`String`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/String) 或是[`Symbol`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol)。 |
| 键的顺序 | `Map` 中的 key 是有序的。因此，当迭代的时候，一个 `Map` 对象以插入的顺序返回键值。 | 一个 `Object` 的键是无序的注意：自ECMAScript 2015规范以来，对象*确实*保留了字符串和Symbol键的创建顺序； 因此，在只有字符串键的对象上进行迭代将按插入顺序产生键。 |
| Size     | `Map` 的键值对个数可以轻易地通过[`size`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map/size) 属性获取 | `Object` 的键值对个数只能手动计算                            |
| 迭代     | `Map` 是 [iterable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/iterable) 的，所以可以直接被迭代。 | 迭代一个`Object`需要以某种方式获取它的键然后才能迭代。       |
| 性能     | 在频繁增删键值对的场景下表现更好。                           | 在频繁添加和删除键值对的场景下未作出优化。                   |