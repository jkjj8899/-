(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/news/news"],{"0830":function(t,n,e){"use strict";(function(t){e("3e62"),e("921b");r(e("66fd"));var n=r(e("1e87"));function r(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("6e42")["createPage"])},"1d9c":function(t,n,e){"use strict";var r=e("749d"),o=e.n(r);o.a},"1e87":function(t,n,e){"use strict";e.r(n);var r=e("96c6"),o=e("a5fe");for(var u in o)"default"!==u&&function(t){e.d(n,t,function(){return o[t]})}(u);e("1d9c");var i=e("2877"),a=Object(i["a"])(o["default"],r["a"],r["b"],!1,null,null,null);n["default"]=a.exports},"749d":function(t,n,e){},"96c6":function(t,n,e){"use strict";var r=function(){var t=this,n=t.$createElement;t._self._c},o=[];e.d(n,"a",function(){return r}),e.d(n,"b",function(){return o})},a5fe:function(t,n,e){"use strict";e.r(n);var r=e("e156"),o=e.n(r);for(var u in r)"default"!==u&&function(t){e.d(n,t,function(){return r[t]})}(u);n["default"]=o.a},e156:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var r=u(e("a34a")),o=e("2f62");function u(t){return t&&t.__esModule?t:{default:t}}function i(t,n,e,r,o,u,i){try{var a=t[u](i),c=a.value}catch(l){return void e(l)}a.done?n(c):Promise.resolve(c).then(r,o)}function a(t){return function(){var n=this,e=arguments;return new Promise(function(r,o){var u=t.apply(n,e);function a(t){i(u,r,o,a,c,"next",t)}function c(t){i(u,r,o,a,c,"throw",t)}a(void 0)})}}function c(t){for(var n=1;n<arguments.length;n++){var e=null!=arguments[n]?arguments[n]:{},r=Object.keys(e);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(e).filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.forEach(function(n){l(t,n,e[n])})}return t}function l(t,n,e){return n in t?Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[n]=e,t}var f=function(){return Promise.all([e.e("common/vendor"),e.e("node-modules/@dcloudio/uni-ui/lib/uni-icons/uni-icons")]).then(e.bind(null,"b78a"))},s={components:{uniIcons:f},data:function(){return{total:0,allChecked:!1,empty:!1,list:[]}},onLoad:function(){this.list=[{title:"重庆市渝中区：积极创建国家级区块链产业创新示范园区",time:"2018-11-11",content:"今日重庆市渝中区第十八届人民代表大会第五次会议召开，在渝中区政府工作报告中，给今年渝中区块链产业发展定了个小目标。渝中将聚力打造以区块链为龙头的数字经济示范区，加快推动重庆市区块链产业创新基地扩容提质增效，积极创建国家级区块链产业创新示范园区。"},{title:"重庆市渝中区：积极创建国家级区块链产业创新示范园区",time:"2018-11-11",content:"今日重庆市渝中区第十八届人民代表大会第五次会议召开，在渝中区政府工作报告中，给今年渝中区块链产业发展定了个小目标。渝中将聚力打造以区块链为龙头的数字经济示范区，加快推动重庆市区块链产业创新基地扩容提质增效，积极创建国家级区块链产业创新示范园区。"},{title:"重庆市渝中区：积极创建国家级区块链产业创新示范园区",time:"2018-11-11",content:"今日重庆市渝中区第十八届人民代表大会第五次会议召开，在渝中区政府工作报告中，给今年渝中区块链产业发展定了个小目标。渝中将聚力打造以区块链为龙头的数字经济示范区，加快推动重庆市区块链产业创新基地扩容提质增效，积极创建国家级区块链产业创新示范园区。"},{title:"重庆市渝中区：积极创建国家级区块链产业创新示范园区",time:"2018-11-11",content:"今日重庆市渝中区第十八届人民代表大会第五次会议召开，在渝中区政府工作报告中，给今年渝中区块链产业发展定了个小目标。渝中将聚力打造以区块链为龙头的数字经济示范区，加快推动重庆市区块链产业创新基地扩容提质增效，积极创建国家级区块链产业创新示范园区。"}],this.loadData()},computed:c({},(0,o.mapState)(["hasLogin"])),methods:{loadData:function(){var t=a(r.default.mark(function t(){var n;return r.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.$api.json("cartList");case 2:n=t.sent,n.map(function(t){return t.checked=!0,t});case 4:case"end":return t.stop()}},t,this)}));function n(){return t.apply(this,arguments)}return n}(),navToDetail:function(){t.navigateTo({url:"/pages/wallet/detail"})}}};n.default=s}).call(this,e("6e42")["default"])}},[["0830","common/runtime","common/vendor"]]]);