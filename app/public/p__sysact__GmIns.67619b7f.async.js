(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[13],{HsCK:function(e,t,a){"use strict";var l=a("g09b");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("IzEo");var r=l(a("bx4M")),s=l(a("jehZ"));a("+L6B");var n=l(a("2/Rp"));a("y8nQ");var u=l(a("Vl3Y"));a("5NDa");var d=l(a("5rEg"));a("miYZ");var o=l(a("tsqr")),f=l(a("q1tI"));class p extends f.default.Component{constructor(){super(...arguments),this.handleSubmit=(e=>{e.preventDefault(),this.props.form.validateFieldsAndScroll((e,t)=>{e||(console.log("Received values of form: ",t),o.default.info("\u529f\u80fd\u672a\u5b9e\u73b0"))})})}render(){var e=this.props.form.getFieldDecorator,t={labelCol:{xs:{span:24},sm:{span:8}},wrapperCol:{xs:{span:24},sm:{span:10}}},a={wrapperCol:{xs:{span:24,offset:0},sm:{span:10,offset:8}}};return f.default.createElement(r.default,null,f.default.createElement(u.default,(0,s.default)({},t,{onSubmit:this.handleSubmit}),f.default.createElement(u.default.Item,{label:"GM\u6307\u4ee4"},e("ins",{rules:[{required:!0,message:"\u5185\u5bb9\u4e0d\u80fd\u4e3a\u7a7a"}]})(f.default.createElement(d.default.TextArea,{rows:5,placeholder:"\u8bf7\u8f93\u5165\u8981\u52a0\u8f7d\u7684GM\u6307\u4ee4"}))),f.default.createElement(u.default.Item,a,f.default.createElement(n.default,{type:"primary",htmlType:"submit"},"\u63d0\u4ea4"))))}}var i=u.default.create()(p);t.default=i}}]);