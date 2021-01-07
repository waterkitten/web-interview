# 不考虑边界问题的方法

防御式编程思想：在 flowerbed 数组两端各增加一个 0， 这样处理的好处在于不用考虑边界条件，任意位置处只要连续出现三个 0 就可以栽上一棵花。

------

## example

![image-20210101151457322](C:\Users\Lenovo\AppData\Roaming\Typora\typora-user-images\image-20210101151457322.png)

```python
class Solution(object):
    def canPlaceFlowers(self, flowerbed, n):
        tmp = [0]+flowerbed+[0]
        for i in range(1, len(tmp)-1):
            if tmp[i-1] == 0 and tmp[i] == 0 and tmp[i+1] == 0:
                tmp[i] = 1  # 在 i 处栽上花
                n -= 1   
       return n <= 0   # n 小于等于 0 ，表示可以栽完花
```

