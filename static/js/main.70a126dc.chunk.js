(this.webpackJsonpbombsweeper=this.webpackJsonpbombsweeper||[]).push([[0],{14:function(n,e,t){"use strict";t.d(e,"a",(function(){return d}));var r,o,a=t(8),c=t(0),i=t.n(c),s=t(3),u=t(5),l=u.a.span(r||(r=Object(s.a)(["\n  cursor: pointer;\n  user-select: none;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 26px;\n  height: 26px;\n  background: ",";\n  border: 2px solid\n    ",";\n\n  box-shadow: ",";\n\n  transition: all 500ms ease-in-out;\n"])),(function(n){var e=n.isRevealed,t=n.type;return e&&"number"!==t?"bomb"===t?"tomato":"#8F6F4F":"#77C063"}),(function(n){var e=n.isRevealed,t=n.type;return e&&"number"!==t?"bomb"===t?"tomato":"#6C4D36":"#569358"}),(function(n){var e=n.isRevealed,t=n.type;return e&&"empty"===t?"inset 2px 2px 8px #4f372e":"0px 3px 15px rgba(0, 0, 0, 0.4), inset 0px 1px 0px rgba(255, 255, 255, 0.3), inset 0px 0px 3px rgba(255, 255, 255, 0.5)"})),p=u.a.span(o||(o=Object(s.a)(["\n  color: #345835;\n  font-weight: 700;\n  font-size: 18px;\n  visibility: ",";\n  opacity: ",";\n"])),(function(n){return n.isRevealed?"visible":"hidden"}),(function(n){return n.isRevealed?1:0})),b=t(7),f=t(1),d=function(n){var e=n.line,t=n.column,r=n.value,o=n.handleReveal,c=n.isRevealed,s=i.a.useState(!1),u=Object(a.a)(s,2),d=u[0],x=u[1];i.a.useEffect((function(){c&&x(!1)}),[c]);var m=Object(b.c)(r);return Object(f.jsx)(l,{role:"button",type:m,isRevealed:c,onClick:function(){return!d&&o(e,t)},onContextMenu:function(n){n.preventDefault(),x(!d)},children:Object(f.jsx)(p,{isRevealed:c||d,children:!c&&d?"\ud83d\udea9":"bomb"===m?"\ud83d\udca3":"number"===m?r:""})})}},23:function(n,e){},24:function(n,e,t){"use strict";t.d(e,"a",(function(){return w}));var r,o,a,c,i,s=t(27),u=t(21),l=t(8),p=t(0),b=t.n(p),f=t(14),d=t(7),x=t(3),m=t(5),j=m.a.div(r||(r=Object(x.a)(["\n  display: grid;\n  width: calc("," * 30px);\n  grid-template-columns: repeat(",", 1fr);\n  border: 0;\n  box-shadow: inset 0 1px 1px 0 hsl(0deg 0% 100% / 15%), 0 50px 100px -20px rgb(50 50 93 / 30%),\n    0 30px 60px -30px rgb(0 0 0 / 50%), -10px 10px 60px -10px rgb(103 178 111 / 30%);\n"])),(function(n){return n.columns}),(function(n){return n.columns})),v=m.a.div(o||(o=Object(x.a)(["\n  position: relative;\n  width: calc("," * 30px);\n  height: calc("," * 30px);\n\n  &:hover .endgame-card {\n    opacity: 1;\n  }\n"])),(function(n){return n.columns}),(function(n){return n.lines})),g=m.a.div(a||(a=Object(x.a)(["\n  box-sizing: border-box;\n  position: absolute;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  background-color: rgba(255, 255, 255, 0.9);\n  border-radius: 10px;\n  padding: 20px;\n  width: 180px;\n  height: 180px;\n  left: calc(50% - (180px / 2));\n  top: calc(50% - (180px / 2));\n  transform: perspective(750px) translate3d(0px, 0px, -250px) rotateX(27deg) scale(0.9, 0.9);\n  border: 5px solid #e6e6e6;\n  box-shadow: 0 70px 40px -20px rgba(0, 0, 0, 0.2);\n  transition: 0.4s ease-in-out transform, 0.3s ease-in-out opacity;\n\n  opacity: 0;\n\n  &:hover {\n    transform: translate3d(0px, 0px, -250px);\n\n    & button {\n      opacity: 1;\n      transform: translate3d(0px, 0px, 0px);\n    }\n  }\n"]))),h=m.a.span(c||(c=Object(x.a)(["\n  font-size: 80px;\n  margin-bottom: 10px;\n"]))),O=m.a.button(i||(i=Object(x.a)(["\n  cursor: pointer;\n  padding: 6px 12px;\n  border: 0;\n  color: #fff;\n  background-color: ",";\n  border-radius: 4px;\n\n  opacity: 0;\n  transform: translate3d(0px, 50px, 0px);\n\n  transition: 0.4s ease-in-out transform, 0.2s ease-in-out opacity;\n"])),(function(n){return"lost"===n.gameStatus?"tomato":"#77c063"})),y=t(1),w=function(n){var e=n.lines,t=n.columns,r=n.mines,o=b.a.useState("in_progress"),a=Object(l.a)(o,2),c=a[0],i=a[1],p=b.a.useState({}),x=Object(l.a)(p,2),m=x[0],w=x[1],R=b.a.useState({}),k=Object(l.a)(R,2),C=k[0],S=k[1],F=b.a.useCallback((function(n,r){var o=Object(d.b)(n,r),a={},c=[{line:n,column:r}];for(-1===m[o]&&i("lost");c.length>0;){var s=c.pop();if(s){var l=Object(d.b)(s.line,s.column);if(a[l]=!0,m[l]>0)continue;Object(d.d)(s.line,s.column,e,t).forEach((function(n){var e=Object(d.b)(n.l,n.c);C[e]||a[e]||c.push({line:n.l,column:n.c})}))}}S((function(n){return Object(u.a)(Object(u.a)({},n),a)}))}),[e,t,m,C]);return b.a.useEffect((function(){if("in_progress"===c){var n=Object(d.a)(e,t,r);w(n),S({})}}),[e,t,r,c]),b.a.useEffect((function(){Object.keys(C).length+r===e*t&&i((function(n){return"in_progress"===n?"won":n}))}),[C,i,e,t,r]),Object(y.jsxs)(v,{lines:e,columns:t,children:[Object(y.jsx)(j,{columns:t,children:Object(s.a)(new Array(e*t)).map((function(n,r){var o=Math.floor(r/e),a=r%t,i=Object(d.b)(o,a);return Object(y.jsx)(f.a,{line:o,column:a,value:m[i],handleReveal:F,isRevealed:C[i]||"in_progress"!==c},i)}))}),"in_progress"!==c&&Object(y.jsxs)(g,{className:"endgame-card",children:[Object(y.jsx)(h,{children:"lost"===c?"\u2620\ufe0f":"\ud83d\ude0e"}),Object(y.jsx)(O,{gameStatus:c,onClick:function(){return i("in_progress")},children:"Restart"})]})]})}},26:function(n,e,t){"use strict";t(14);var r=t(24);t.d(e,"Grid",(function(){return r.a}));t(23)},35:function(n,e,t){"use strict";t.r(e);var r,o,a=t(0),c=t.n(a),i=t(25),s=t.n(i),u=function(n){n&&n instanceof Function&&t.e(3).then(t.bind(null,36)).then((function(e){var t=e.getCLS,r=e.getFID,o=e.getFCP,a=e.getLCP,c=e.getTTFB;t(n),r(n),o(n),a(n),c(n)}))},l=t(26),p=t(3),b=t(11),f=t(5),d=t(1),x=function(){return Object(d.jsx)(b.a,{styles:Object(b.b)(r||(r=Object(p.a)(["\n      html,\n      body,\n      #root {\n        height: 100%;\n        margin: 0;\n      }\n    "])))})},m=f.a.div(o||(o=Object(p.a)(["\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 100%;\n  height: 100%;\n  background-color: #f7faff;\n"]))),j=function(){return Object(d.jsx)(m,{children:Object(d.jsx)(l.Grid,{lines:10,columns:10,mines:5})})};s.a.render(Object(d.jsxs)(c.a.StrictMode,{children:[Object(d.jsx)(x,{}),Object(d.jsx)(j,{})]}),document.getElementById("root")),u()},7:function(n,e,t){"use strict";t.d(e,"c",(function(){return r})),t.d(e,"b",(function(){return o})),t.d(e,"a",(function(){return a})),t.d(e,"d",(function(){return i}));var r=function(n){return-1===n?"bomb":n>0?"number":"empty"},o=function(n,e){return"".concat(n,"-").concat(e)},a=function(n,e,t){for(var r,a={},i=t,s=0;s<n;s++)for(var u=0;u<e;u++){var l=o(s,u);a[l]=0,i>0&&((r=.15)&&Math.random()<=r)&&(a[l]=-1,i-=1)}for(var p=0;p<n;p++)for(var b=0;b<e;b++){var f=o(p,b);-1!==a[f]&&(a[f]=c(p,b,n,e,a))}return a},c=function(n,e,t,r,a){return i(n,e,t,r).reduce((function(n,e){return-1===a[o(e.l,e.c)]?n+1:n}),0)},i=function(n,e,t,r){for(var o=[],a=n-1;a<=n+1;a++)for(var c=e-1;c<=e+1;c++)a<0||a>=t||c<0||c>=r||o.push({l:a,c:c});return o}}},[[35,1,2]]]);
//# sourceMappingURL=main.70a126dc.chunk.js.map