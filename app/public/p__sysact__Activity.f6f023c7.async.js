(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[13],{KeTF:function(t,e,a){"use strict";var i=a("g09b");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,a("T2oS");var n=i(a("W9HT"));a("IzEo");var s=i(a("bx4M"));a("8R5B");var o=i(a("aJyg"));a("+L6B");var r=i(a("2/Rp"));a("miYZ");var l,h,d,c=i(a("tsqr")),u=i(a("q1tI")),g=a("MuoO"),p=(l=(0,g.connect)(t=>{var e=t.global;return{global:e}}),l((d=class extends u.default.Component{constructor(){super(...arguments),this.state={mockData:[],targetKeys:[],loading:!0},this.getMock=(()=>{for(var t=[],e=[],a=0;a<20;a++){var i={key:a.toString(),title:`content${a+1}`,description:`description of content${a+1}`,chosen:2*Math.random()>1};i.chosen&&t.push(i.key),e.push(i)}this.setState({mockData:e,targetKeys:t})}),this.filterOption=((t,e)=>e.description.indexOf(t)>-1),this.handleChange=(t=>{this.setState({targetKeys:t})}),this.handleSearch=((t,e)=>{console.log("search:",t,e)}),this.handleSubmit=(t=>{console.log(this.state.targetKeys),c.default.info("\u529f\u80fd\u672a\u5b9e\u73b0")})}componentDidMount(){this.getMock(),this.setState({loading:!1})}render(){var t=this.props.global,e=t.part_id,a=t.srvList,i=a.filter(t=>t.part_id===e)[0],l="\u65e0";return i&&(l=i.part_name),u.default.createElement(n.default,{tip:"\u52a0\u8f7d\u4e2d...",spinning:this.state.loading},u.default.createElement(s.default,{title:`\u5f53\u524d\u9009\u4e2d\u533a\u670d: ${l}`,style:{minHeight:500}},u.default.createElement(r.default,{style:{marginBottom:20,width:150},size:"large",type:"primary",onClick:this.handleSubmit},"\u63d0\u4ea4\u4fee\u6539"),u.default.createElement(o.default,{dataSource:this.state.mockData,showSearch:!0,listStyle:{width:400,height:700},filterOption:this.filterOption,targetKeys:this.state.targetKeys,onChange:this.handleChange,onSearch:this.handleSearch,render:t=>t.title,titles:["\u672a\u542f\u7528\u6d3b\u52a8/\u670d\u52a1","\u5df2\u542f\u7528\u6d3b\u52a8/\u670d\u52a1"],locale:{itemUnit:"\u9879",itemsUnit:"\u9879",notFoundContent:"\u5185\u5bb9\u4e3a\u7a7a",searchPlaceholder:"\u8f93\u5165\u8fdb\u884c\u7b5b\u9009"}})))}},h=d))||h),f=p;e.default=f}}]);