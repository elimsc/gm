(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[11],{drRx:function(e,t,l){"use strict";var a=l("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,l("lUTK");var n=a(l("BvKs"));l("IzEo");var u=a(l("bx4M"));l("g9YV");var c=a(l("wCAj"));l("14J3");var f=a(l("BMrR"));l("jCWc");var d=a(l("kPKH"));l("5NDa");var r=a(l("5rEg"));l("+L6B");var i=a(l("2/Rp")),s=a(l("q1tI")),m=a(l("qu0K")),o=a(l("2XSL")),E=a(l("LNeH")),k=a(l("5X/Z")),p=a(l("tjOP")),y=a(l("qPwQ")),h=a(l("85FJ")),I=a(l("w0ze")),b=a(l("6WHv")),g=a(l("zcen")),C=a(l("y3X0")),v=a(l("ByX/")),w=a(l("MUaR")),x=a(l("5seW")),S=a(l("qAnI")),M=a(l("Gr2P")),K=a(l("ubE6")),q=a(l("VX2f")),X=a(l("AR1u")),H=a(l("tMpF")),J=a(l("YhwQ")),P=a(l("aKyJ")),R=a(l("p7/u")),j=a(l("VVh1")),z=a(l("HzXg")),B=a(l("eC71")),T=a(l("/4QZ")),V=a(l("vSN6")),A=[{name:"\u5c0f\u5c0f\u53f71",sex:"\u7537",menpai:"\u6b63\u5251\u95e8",level:"50",guid:"123131231423434535"},{name:"\u5c0f\u5c0f\u53f72",sex:"\u7537",menpai:"\u6b63\u5251\u95e8",level:"50",guid:"123131231423434535"},{name:"\u5c0f\u5c0f\u53f73",sex:"\u7537",menpai:"\u6b63\u5251\u95e8",level:"50",guid:"123131231423434535"}];class L extends s.default.Component{constructor(e){super(e),this.state={player:null,menu:"basic-info"}}handleSearch(e){e.preventDefault(),console.log(e)}select(e){this.setState({menu:e})}render(){var e=[{title:"\u89d2\u8272\u540d",dataIndex:"name",key:"name"},{title:"\u6027\u522b",dataIndex:"sex",key:"sex"},{title:"\u95e8\u6d3e",dataIndex:"menpai",key:"menpai"},{title:"\u7b49\u7ea7",dataIndex:"level",key:"level"},{title:"guid",dataIndex:"guid",key:"guid"},{title:"\u64cd\u4f5c",key:"action",render:()=>s.default.createElement(i.default,{type:"primary"},"\u9009\u4e2d")}];return s.default.createElement("div",null,s.default.createElement(u.default,null,s.default.createElement(m.default,{layout:"inline",onSubmit:e=>this.handleSearch(e)},s.default.createElement(f.default,null,s.default.createElement(d.default,{span:6},s.default.createElement(m.default.Item,{label:"\u67e5\u8be2\u5185\u5bb9"},s.default.createElement(r.default,null))),s.default.createElement(d.default,{span:6},s.default.createElement(m.default.Item,{label:"\u67e5\u8be2"},s.default.createElement(r.default,null))),s.default.createElement(d.default,{span:6},s.default.createElement(m.default.Item,{label:"\u670d\u52a1\u5668"},s.default.createElement(r.default,null))),s.default.createElement(d.default,{span:6},s.default.createElement(i.default,{htmlType:"submit",type:"primary"},"\u67e5\u8be2")))),s.default.createElement(c.default,{rowKey:e=>e.name,style:{marginTop:20},columns:e,dataSource:A})),s.default.createElement(u.default,{style:{marginTop:30,minHeight:800},title:"\u5f53\u524d\u9009\u4e2d\u73a9\u5bb6\uff1a\u5c0f\u5c0f\u73a9\u5bb61"},s.default.createElement(f.default,null,s.default.createElement(d.default,{span:4},s.default.createElement(n.default,{mode:"inline",selectedKeys:[this.state.menu],defaultOpenKeys:["playerinfo"]},s.default.createElement(n.default.SubMenu,{key:"playerinfo",title:"\u73a9\u5bb6\u4fe1\u606f"},s.default.createElement(n.default.Item,{onClick:()=>this.select("basic-info"),key:"basic-info"},"\u73a9\u5bb6\u57fa\u672c\u4fe1\u606f"),s.default.createElement(n.default.Item,{onClick:()=>this.select("bag-info"),key:"bag-info"},"\u80cc\u5305\u4fe1\u606f"),s.default.createElement(n.default.Item,{onClick:()=>this.select("warehouse-info"),key:"warehouse-info"},"\u4ed3\u5e93\u4fe1\u606f"),s.default.createElement(n.default.Item,{onClick:()=>this.select("equip-info"),key:"equip-info"},"\u88c5\u5907\u4fe1\u606f"),s.default.createElement(n.default.Item,{onClick:()=>this.select("skill-info"),key:"skill-info"},"\u6280\u80fd\u4fe1\u606f"),s.default.createElement(n.default.Item,{onClick:()=>this.select("title-info"),key:"title-info"},"\u79f0\u53f7\u4fe1\u606f"),s.default.createElement(n.default.Item,{onClick:()=>this.select("pet-info"),key:"pet-info"},"\u5ba0\u7269\u4fe1\u606f"),s.default.createElement(n.default.Item,{onClick:()=>this.select("task-info"),key:"task-info"},"\u4efb\u52a1"),s.default.createElement(n.default.Item,{onClick:()=>this.select("home-info"),key:"home-info"},"\u5bb6\u56ed"),s.default.createElement(n.default.Item,{onClick:()=>this.select("email-info"),key:"email-info"},"\u90ae\u4ef6"),s.default.createElement(n.default.Item,{onClick:()=>this.select("marriage-info"),key:"marriage-info"},"\u5a5a\u59fb")),s.default.createElement(n.default.SubMenu,{key:"gmact",title:"GM\u64cd\u4f5c"},s.default.createElement(n.default.Item,{onClick:()=>this.select("money"),key:"money"},"\u53d1\u653e\u8d27\u5e01"),s.default.createElement(n.default.Item,{onClick:()=>this.select("prop"),key:"prop"},"\u53d1\u653e\u9053\u5177"),s.default.createElement(n.default.Item,{onClick:()=>this.select("exp"),key:"exp"},"\u6dfb\u52a0/\u6263\u9664\u7ecf\u9a8c"),s.default.createElement(n.default.Item,{onClick:()=>this.select("title"),key:"title"},"\u6dfb\u52a0/\u5220\u9664\u79f0\u53f7"),s.default.createElement(n.default.Item,{onClick:()=>this.select("prac-level"),key:"prac-level"},"\u4fee\u6539\u4fee\u70bc\u7b49\u7ea7"),s.default.createElement(n.default.Item,{onClick:()=>this.select("petsymbol-level"),key:"petsymbol-level"},"\u4fee\u6539\u5ba0\u7269\u7b26\u7b49\u7ea7"),s.default.createElement(n.default.Item,{onClick:()=>this.select("forcedown"),key:"forcedown"},"\u8e22\u73a9\u5bb6\u4e0b\u7ebf"),s.default.createElement(n.default.Item,{onClick:()=>this.select("secure-code"),key:"secure-code"},"\u5b89\u5168\u7801\u4fee\u6539"),s.default.createElement(n.default.Item,{onClick:()=>this.select("change-pass"),key:"change-pass"},"\u4fee\u6539\u5bc6\u7801"),s.default.createElement(n.default.Item,{onClick:()=>this.select("untie-phone"),key:"untie-phone"},"\u89e3\u9664\u7ed1\u5b9a\u624b\u673a")),s.default.createElement(n.default.SubMenu,{key:"clear",title:"\u6e05\u9664\u6570\u636e"},s.default.createElement(n.default.Item,{onClick:()=>this.select("clear-secure-code"),key:"clear-secure-code"},"\u6e05\u9664\u5b89\u5168\u7801"),s.default.createElement(n.default.Item,{onClick:()=>this.select("unusual-gang"),key:"unusual-gang"},"\u6e05\u9664\u975e\u6b63\u5e38\u5e2e\u4f1a\u6570\u636e"),s.default.createElement(n.default.Item,{onClick:()=>this.select("unusual-task"),key:"unusual-task"},"\u6e05\u9664\u975e\u6b63\u5e38\u4efb\u52a1")),s.default.createElement(n.default.SubMenu,{key:"ban",title:"\u5c01\u53f7/\u7981\u8a00"},s.default.createElement(n.default.Item,{onClick:()=>this.select("ban-account"),key:"ban-account"},"\u5c01\u53f7"),s.default.createElement(n.default.Item,{onClick:()=>this.select("ban-talk"),key:"ban-talk"},"\u7981\u8a00"),s.default.createElement(n.default.Item,{onClick:()=>this.select("ban-log"),key:"ban-log"},"\u7981\u8a00\u8bb0\u5f55")))),s.default.createElement(d.default,{span:20},N(this.state.menu)))))}}function N(e){switch(e){case"basic-info":return s.default.createElement(o.default,null);case"bag-info":return s.default.createElement(E.default,null);case"warehouse-info":return s.default.createElement(k.default,null);case"equip-info":return s.default.createElement(p.default,null);case"skill-info":return s.default.createElement(y.default,null);case"title-info":return s.default.createElement(h.default,null);case"pet-info":return s.default.createElement(I.default,null);case"task-info":return s.default.createElement(b.default,null);case"home-info":return s.default.createElement(g.default,null);case"email-info":return s.default.createElement(C.default,null);case"marriage-info":return s.default.createElement(v.default,null);case"money":return s.default.createElement(w.default,null);case"exp":return s.default.createElement(x.default,null);case"change-pass":return s.default.createElement(S.default,null);case"forcedown":return s.default.createElement(M.default,null);case"petsymbol-level":return s.default.createElement(K.default,null);case"prac-level":return s.default.createElement(q.default,null);case"prop":return s.default.createElement(X.default,null);case"secure-code":return s.default.createElement(H.default,null);case"title":return s.default.createElement(P.default,null);case"untie-phone":return s.default.createElement(J.default,null);case"clear-secure-code":return s.default.createElement(R.default,null);case"unusual-gang":return s.default.createElement(j.default,null);case"unusual-task":return s.default.createElement(z.default,null);case"ban-talk":return s.default.createElement(B.default,null);case"ban-log":return s.default.createElement(T.default,null);case"ban-account":return s.default.createElement(V.default,null);default:break}}var O=L;t.default=O}}]);