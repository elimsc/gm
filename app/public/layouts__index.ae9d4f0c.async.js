(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[1],{GOVz:function(e,t,a){"use strict";var l=a("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("T2oS");var n=l(a("W9HT"));a("qVdP");var r=l(a("jsC+"));a("+L6B");var u=l(a("2/Rp"));a("Pwec");var d=l(a("CtXQ")),s=l(a("d6i3")),c=l(a("1l/V"));a("OaEy");var o=l(a("2fM7"));a("lUTK");var f=l(a("BvKs"));a("B9cy");var i,m,p,h=l(a("Ol7k")),g=l(a("q1tI")),E=l(a("usdK")),y=a("MuoO"),v=l(a("utR0")),k=a("cNiB"),_=l(a("J0ax")),b=h.default.Header,I=h.default.Content,S=h.default.Footer,C=h.default.Sider,w=f.default.SubMenu,x=o.default.Option,M=(i=(0,y.connect)(e=>{var t=e.global;return{global:t}}),i((p=class extends g.default.Component{constructor(e){super(e),this.fetchSrvList=(()=>{this.props.dispatch({type:"global/fetchSrvList",payload:{}})}),this.toggle=(()=>{this.setState({collapsed:!this.state.collapsed})}),this.handleSrvSelect=(e=>{this.props.dispatch({type:"global/save",payload:{part_id:e}})}),this.state={collapsed:!1,username:"",loading:!0,role:1}}componentDidMount(){var e=this;return(0,c.default)(s.default.mark(function t(){var a;return s.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,(0,k.check)();case 2:if(a=t.sent,console.log("base layout did mount =================== "),console.log(a),-10!==a.code){t.next=9;break}E.default.replace("/login"),t.next=13;break;case 9:return e.fetchSrvList(),e.setState({loading:!1,username:a.payload.username,role:parseInt(a.payload.role)}),t.next=13,e.props.dispatch({type:"global/save",payload:{user_role:parseInt(a.payload.role)}});case 13:case"end":return t.stop()}},t)}))()}logout(){(0,k.logout)().then(e=>{E.default.replace("/login")})}go_route(e){E.default.push(e)}handleEnvSelect(e){var t=this;return(0,c.default)(s.default.mark(function a(){return s.default.wrap(function(a){while(1)switch(a.prev=a.next){case 0:t.setState({loading:!0}),localStorage.setItem("req_url",e),t.fetchSrvList(),t.props.dispatch({type:"global/save",payload:{req_url:e}}),t.setState({loading:!1});case 5:case"end":return a.stop()}},a)}))()}render(){var e=g.default.createElement(f.default,null,g.default.createElement(f.default.Item,{onClick:()=>this.go_route("/user/actlog"),key:"actlog"},g.default.createElement(d.default,{type:"user"}),g.default.createElement("span",null,"\u4e2a\u4eba\u4e2d\u5fc3")),g.default.createElement(f.default.Divider,null),g.default.createElement(f.default.Item,{onClick:()=>this.logout(),key:"logout"},g.default.createElement(d.default,{type:"logout"}),g.default.createElement("span",null,"\u9000\u51fa\u767b\u9646"))),t=this.props.global.srvList;return this.state.loading?null:g.default.createElement(n.default,{tip:"\u52a0\u8f7d\u4e2d...",spinning:this.state.loading,delay:100},g.default.createElement(h.default,{style:{height:"100vh",minHeight:800}},g.default.createElement(C,{trigger:null,collapsible:!0,collapsed:this.state.collapsed,width:240},g.default.createElement("div",{className:_.default.logo},g.default.createElement("span",null,"\u5fa1\u5929\u5251\u9053GM\u5e73\u53f0")),g.default.createElement(f.default,{defaultOpenKeys:[this.props.children.props.location.pathname.split("/")[1]],theme:"dark",selectedKeys:[this.props.children.props.location.pathname],mode:"inline"},g.default.createElement(f.default.Item,{onClick:()=>this.go_route("/player"),key:"/player"},g.default.createElement(d.default,{type:"team"}),g.default.createElement("span",null,"\u73a9\u5bb6\u64cd\u4f5c")),this.state.role>=2?g.default.createElement(f.default.Item,{key:"/batchact",onClick:()=>this.go_route("/batchact")},g.default.createElement(d.default,{type:"form"}),g.default.createElement("span",null,"\u6279\u91cf\u64cd\u4f5c")):null,this.state.role>=2?g.default.createElement(f.default.Item,{key:"/broadcast",onClick:()=>this.go_route("/broadcast")},g.default.createElement(d.default,{type:"sound"}),g.default.createElement("span",null,"\u670d\u52a1\u5668\u5e7f\u64ad")):null,this.state.role>=3?g.default.createElement(w,{key:"sysact",title:g.default.createElement("span",null,g.default.createElement(d.default,{type:"hdd"}),g.default.createElement("span",null,"\u7cfb\u7edf\u64cd\u4f5c"))},g.default.createElement(f.default.Item,{key:"/sysact/activity",onClick:()=>this.go_route("/sysact/activity")},g.default.createElement("span",null,"\u670d\u52a1\u4e0e\u6d3b\u52a8\u7ba1\u7406")),g.default.createElement(f.default.Item,{key:"/sysact/gmins",onClick:()=>this.go_route("/sysact/gmins")},g.default.createElement("span",null,"GM\u6307\u4ee4")),g.default.createElement(f.default.Item,{key:"/sysact/srvforcedown",onClick:()=>this.go_route("/sysact/srvforcedown")},g.default.createElement("span",null,"\u670d\u52a1\u5668\u5f3a\u5236\u4e0b\u7ebf"))):null,this.state.role>=3?g.default.createElement(w,{key:"gmman",title:g.default.createElement("span",null,g.default.createElement(d.default,{type:"solution"}),g.default.createElement("span",null,"GM\u7ba1\u7406"))},g.default.createElement(f.default.Item,{key:"/gmman",onClick:()=>this.go_route("/gmman")},g.default.createElement("span",null,"GM\u5217\u8868")),g.default.createElement(f.default.Item,{key:"/gmman/add",onClick:()=>this.go_route("/gmman/add")},g.default.createElement("span",null,"\u6dfb\u52a0GM")),g.default.createElement(f.default.Item,{key:"/gmman/actlogs",onClick:()=>this.go_route("/gmman/actlogs")},g.default.createElement("span",null,"\u64cd\u4f5c\u65e5\u5fd7"))):null)),g.default.createElement(h.default,null,g.default.createElement(b,{style:{background:"#fff",padding:0}},g.default.createElement("div",{className:_.default.headerItem},g.default.createElement(d.default,{className:_.default.trigger,type:this.state.collapsed?"menu-unfold":"menu-fold",onClick:this.toggle})),g.default.createElement("div",{className:_.default.headerItem},g.default.createElement(o.default,{defaultValue:localStorage.getItem("req_url")?localStorage.getItem("req_url"):"",onChange:e=>this.handleEnvSelect(e),className:_.default.select,placeholder:"\u9009\u62e9\u73af\u5883"},g.default.createElement(x,{value:""},"\u7a7a"),g.default.createElement(x,{value:"http://192.168.1.205:20843/"},"\u9ed8\u8ba4\u6d4b\u8bd5\u73af\u5883")),g.default.createElement(o.default,{onChange:this.handleSrvSelect,className:_.default.select,placeholder:"\u9009\u62e9\u533a\u670d"},g.default.createElement(x,{value:-1},"\u9ed8\u8ba4\u670d"),t.map(e=>g.default.createElement(x,{key:e.part_id,value:e.part_id},e.part_name)))),g.default.createElement("div",{className:_.default.headerItem,style:{float:"right",marginRight:60}},g.default.createElement(r.default,{overlay:e,placement:"bottomRight"},g.default.createElement(u.default,{type:"dashed",style:{fontSize:16}},this.state.username)))),g.default.createElement(I,{style:{margin:16}},this.props.children),g.default.createElement(S,{style:{textAlign:"center"}}))))}},m=p))||m),O=(0,v.default)(M);t.default=O},J0ax:function(e,t,a){e.exports={trigger:"trigger___3oBkS",logo:"logo___1tLql",select:"select___2x-jk",headerItem:"headerItem___3OHm0"}},LVFT:function(e,t,a){"use strict";var l=a("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("B9cy");var n=l(a("Ol7k")),r=l(a("d6i3")),u=l(a("1l/V")),d=l(a("q1tI")),s=l(a("usdK")),c=a("cNiB");class o extends d.default.PureComponent{componentDidMount(){return(0,u.default)(r.default.mark(function e(){var t;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,(0,c.check)();case 2:t=e.sent,0===t.code&&s.default.replace("/");case 4:case"end":return e.stop()}},e)}))()}render(){return d.default.createElement(n.default,{style:{height:"100vh"}},this.props.children)}}var f=o;t.default=f},gSQL:function(e,t,a){"use strict";var l=a("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("Ksrn");var n=l(a("MR/8"));a("miYZ");var r=l(a("tsqr")),u=l(a("q1tI")),d=l(a("GOVz")),s=l(a("LVFT")),c=l(a("xc/l")),o=e=>{return r.default.config({top:24,duration:2,maxCount:3}),"/login"===e.location.pathname?u.default.createElement(n.default,{locale:c.default},u.default.createElement(s.default,{style:{opacity:0}},e.children)):u.default.createElement(n.default,{locale:c.default},u.default.createElement(d.default,null,e.children))},f=o;t.default=f}}]);