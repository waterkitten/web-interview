使用 getter 属性，相当 Vue 中的计算属性 computed，只有原状态改变派生状态才会改变。
getter 接收两个参数，第一个是 state，第二个是 getters(可以用来访问其他 getter)。
const store = new Vuex.Store({
state: {
price: 10,
number: 10,
discount: 0.7,
},
getters: {
total: state => {
return state.price _ state.number
},
discountTotal: (state, getters) => {
return state.discount _ getters.total
}
},
});

然后在组件中可以用计算属性 computed 通过 this.$store.getters.total这样来访问这些派生转态。
computed: {
    total() {
        return this.$store.getters.total
},
discountTotal() {
return this.\$store.getters.discountTotal
}
}

怎么在组件中批量给 Vuex 的 getter 属性取别名并使用

    参考答案

使用 mapGetters 辅助函数, 利用对象展开运算符将 getter 混入 computed 对象中
import {mapGetters} from 'vuex'
export default{
computed:{
...mapGetters({
myTotal:'total',
myDiscountTotal:'discountTotal',
})
}
}
复制代码
在 Vuex 的 state 中有个状态 number 表示货物数量，在组件怎么改变它。

    参考答案

首先要在 mutations 中注册一个 mutation
const store = new Vuex.Store({
state: {
number: 10,
},
mutations: {
SET_NUMBER(state,data){
state.number=data;
}
},
});

在组件中多次提交同一个 mutation，怎么写使用更方便。

    参考答案

使用 mapMutations 辅助函数,在组件中这么使用
import { mapMutations } from 'vuex'
methods:{
...mapMutations({
setNumber:'SET_NUMBER',
})
}
复制代码然后调用 this.setNumber(10)相当调用 this.\$store.commit('SET_NUMBER',10)
