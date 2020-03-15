(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/uni-load-more"],{"31db":function(t,n,e){"use strict";e.r(n);var o=e("38f1"),a=e("ed58");for(var u in a)"default"!==u&&function(t){e.d(n,t,function(){return a[t]})}(u);e("a171");var r=e("2877"),c=Object(r["a"])(a["default"],o["a"],o["b"],!1,null,"38fa9796",null);n["default"]=c.exports},"38f1":function(t,n,e){"use strict";var o=function(){var t=this,n=t.$createElement;t._self._c},a=[];e.d(n,"a",function(){return o}),e.d(n,"b",function(){return a})},"5ac8":function(t,n,e){},"76ca":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e=t.getSystemInfoSync().platform,o={name:"UniLoadMore",props:{status:{type:String,default:"more"},showIcon:{type:Boolean,default:!0},iconType:{type:String,default:"auto"},color:{type:String,default:"#777777"},contentText:{type:Object,default:function(){return{contentdown:"上拉显示更多",contentrefresh:"正在加载...",contentnomore:"没有更多数据了"}}}},data:function(){return{platform:e}},methods:{onClick:function(){this.$emit("clickLoadMore",{detail:{status:this.status}})}}};n.default=o}).call(this,e("6e42")["default"])},a171:function(t,n,e){"use strict";var o=e("5ac8"),a=e.n(o);a.a},ed58:function(t,n,e){"use strict";e.r(n);var o=e("76ca"),a=e.n(o);for(var u in o)"default"!==u&&function(t){e.d(n,t,function(){return o[t]})}(u);n["default"]=a.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/uni-load-more-create-component',
    {
        'components/uni-load-more-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('6e42')['createComponent'](__webpack_require__("31db"))
        })
    },
    [['components/uni-load-more-create-component']]
]);
