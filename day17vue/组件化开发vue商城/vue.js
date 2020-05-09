//Create a new component for product-details with a prop of details. 

Vue.component('product-details', {
  props: {
    details: {
      type: Array,
      required: true
    }
  },
  template: `
    <ul>
      <li v-for="detail in details">{{ detail }}</li>
    </ul>
  `
})



Vue.component('product', {
  props: {
    premium: {
      type: Boolean,
      required: true
    }
  },
  template: `
   <div class="product">
        
      <div class="product-image">
        <img :src="image" />
      </div>

      <div class="product-info">
          <h1>{{ product }}</h1>
          <p v-if="inStock">In Stock</p>
          <p v-else>Out of Stock</p>
          <p>Shipping: {{ shipping }}</p>

          <product-details :details="details"></product-details>

          <div class="color-box"
               v-for="(variant, index) in variants" 
               :key="variant.variantId"
               :style="{ backgroundColor: variant.variantColor }"
               @mouseover="updateProduct(index)"
               >
          </div> 

          <button v-on:click="addToCart" 
            :disabled="!inStock"
            :class="{ disabledButton: !inStock }"
            >
          Add to cart
          </button>

          <div class="cart">
            <p>Cart({{ cart }})</p>
          </div>

       </div>  
    
    </div>
   `,
  data() {
    return {
        product: 'Socks',
        brand: 'Vue Mastery',
        selectedVariant: 0,
        details: ['80% cotton', '20% polyester', 'Gender-neutral'],
        variants: [
          {
            variantId: 2234,
            variantColor: 'green',
            variantImage:  'https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg',
            variantQuantity: 10     
          },
          {
            variantId: 2235,
            variantColor: 'blue',
            variantImage: 'https://www.vuemastery.com/images/challenges/vmSocks-blue-onWhite.jpg',
            variantQuantity: 0     
          }
        ],
        cart: 0
    }
  },
    methods: {
      addToCart: function() {
          this.cart += 1
      },
      updateProduct: function(index) {  
          this.selectedVariant = index
      }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product  
        },
        image(){
            return this.variants[this.selectedVariant].variantImage
        },
        inStock(){
            return this.variants[this.selectedVariant].variantQuantity
        },
        shipping() {
          if (this.premium) {
            return "Free"
          }
            return 2.99
        }
    }
})

var app = new Vue({
    el: '#app',
    data: {
      premium: true
    }
})
// Vue.component("product-details",{
//   props: {
//    details:{
//       type:Array,
//       required:true
     
//     },

//   },
//  template:`
 
 
//  `
 
// })
// var app = new Vue({
//   el: '#app',
//   data: {
//       product: 'Socks',
//       brand: 'Vue Mastery',
//       selectedVariant: 0,
//       details: ['80% cotton', '20% polyester', 'Gender-neutral'],
//       variants: [
//         {
//           variantId: 2234,
//           variantColor: 'green',
//           variantImage: 'https://www.vuemastery.com/images/challenges/vmSocks-green-onWhite.jpg',
//           variantQuantity: 10     
//         },
//         {
//           variantId: 2235,
//           variantColor: 'blue',
//           variantImage: 'https://www.vuemastery.com/images/challenges/vmSocks-blue-onWhite.jpg',
//           variantQuantity: 0     
//         }
//       ],
//       cart: 0,
//       onSale: true
//   },
//   methods: {
//       addToCart: function() {
//           this.cart += 1
//       },
//       // 传入该死的下标  读取选中的下标
//       updateProduct: function(index) {  
//           this.selectedVariant = index
//       }
//   },
//   computed: {
//       title() {
//           return this.brand + ' ' + this.product  
//       },
//       image(){
//         //图片读取
//           return this.variants[this.selectedVariant].variantImage
//       },
//       inStock(){
//         //读取数量
//           return this.variants[this.selectedVariant].variantQuantity
//       },
//       sale() {
//         if (this.onSale) {
//           return this.brand + ' ' + this.product + ' are on sale!'
//         } 
//           return  this.brand + ' ' + this.product + ' are not on sale'
//       }
//   }
// })