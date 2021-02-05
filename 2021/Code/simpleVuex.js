function registerPlugin(Vue) {
  const vuex = {}
  vuex._vm = new vuex({
    data: {
      message: 'Hello vue.JS'
    },
  })
  vuex.state = vuex._vm
  vuex.mutations = {
    setMessage(value) {
      vuex.state.message = value
    }
  }

  function init() {
    this.$store = vuex
  }

}
/*
dep进行管理  然后订阅发布者模式
*/