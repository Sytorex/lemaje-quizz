import{w as c}from"./index.CKqIFZIg.js";function s(e,t){const n=typeof window<"u"&&typeof localStorage<"u",a=n?localStorage.getItem(e):null,r=c(a?JSON.parse(a):t);return n&&(r.subscribe(o=>{o==null?localStorage.removeItem(e):localStorage.setItem(e,JSON.stringify(o))}),window.addEventListener("storage",o=>{if(o.key===e){const l=o.newValue?JSON.parse(o.newValue):t;r.set(l)}})),r}function i(){const e=[];for(let t=0;t<6;t++)e.push("blue"),e.push("red"),e.push("yellow"),e.push("white"),e.push("white");return e.map(t=>({value:t,sort:Math.random()})).sort((t,n)=>t.sort-n.sort).map(({value:t})=>t)}const d=s("selectedTheme",null),f=s("countdown",90),w=s("score",0),m=s("visitedThemes",[]),p=s("currentQuestionIndex",null);s("finaleScore",[0,0,0]);const h=s("finaleTable",i());export{w as a,f as b,p as c,h as f,d as s,m as v};
