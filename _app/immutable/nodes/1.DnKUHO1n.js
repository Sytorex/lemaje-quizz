import{s as S,n as _,c as x}from"../chunks/scheduler.B3L12BRW.js";import{S as j,i as q,e as d,t as f,s as y,c as g,a as h,m as v,d as u,b as C,h as m,j as $,n as E}from"../chunks/index.Cbii4a9Q.js";import{s as H}from"../chunks/entry.DpqiK-wJ.js";const P=()=>{const s=H;return{page:{subscribe:s.page.subscribe},navigating:{subscribe:s.navigating.subscribe},updated:s.updated}},k={subscribe(s){return P().page.subscribe(s)}};function w(s){var b;let t,r=s[0].status+"",n,o,i,c=((b=s[0].error)==null?void 0:b.message)+"",l;return{c(){t=d("h1"),n=f(r),o=y(),i=d("p"),l=f(c)},l(e){t=g(e,"H1",{});var a=h(t);n=v(a,r),a.forEach(u),o=C(e),i=g(e,"P",{});var p=h(i);l=v(p,c),p.forEach(u)},m(e,a){m(e,t,a),$(t,n),m(e,o,a),m(e,i,a),$(i,l)},p(e,[a]){var p;a&1&&r!==(r=e[0].status+"")&&E(n,r),a&1&&c!==(c=((p=e[0].error)==null?void 0:p.message)+"")&&E(l,c)},i:_,o:_,d(e){e&&(u(t),u(o),u(i))}}}function z(s,t,r){let n;return x(s,k,o=>r(0,n=o)),[n]}let F=class extends j{constructor(t){super(),q(this,t,z,w,S,{})}};export{F as component};
