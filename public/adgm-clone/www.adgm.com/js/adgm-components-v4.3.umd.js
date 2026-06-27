(function(s,tn){typeof exports=="object"&&typeof module<"u"?tn(exports):typeof define=="function"&&define.amd?define(["exports"],tn):(s=typeof globalThis<"u"?globalThis:s||self,tn(s["adgm-components"]={}))})(this,function(s){"use strict";const tn=t=>t.toLowerCase().replace(/(^([a-zA-Z\p{M}]))|([ -][a-zA-Z\p{M}])/g,function(e){return e.toUpperCase()}),yi=(t,e=!0)=>{const a=t.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g);if(a){const i=a.map(n=>n.toLowerCase()).join(" ");return e?tn(i):i}else return""},Ee=t=>{const e=t.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g);return e?e.map(a=>a.toLowerCase()).join("-"):""},yo=t=>t.charAt(0).toUpperCase()+t.substring(1),bo=t=>{var a,i;return((i=(a=t.split("."))==null?void 0:a.pop())==null?void 0:i.toLowerCase())==="pdf"},bi=t=>{let e=t.replace(/<[^>]*>/g,"");return e=e.replace(/\s+/g," ").trim(),e},en=t=>t<10?t.toString().padStart(2,"0"):t.toString(),Ct=t=>Array.isArray(t),Xt=t=>typeof t=="string"||t instanceof String,nn=t=>typeof t=="number",$o=t=>typeof t=="function",Dn=t=>typeof t=="object",wo=(t,e,a=",")=>{const i=e.map(r=>r.map(o=>typeof o=="string"&&(o.includes(a)||o.includes('"'))?`"${o.replace(/"/g,'""')}"`:o).join(",")).join(`
`),n=new Blob([i],{type:"text/csv;charset=utf-8;"});if(navigator&&navigator.msSaveBlob)navigator.msSaveBlob(n,t);else{const r=document.createElement("a");if(r.download!==void 0){const o=URL.createObjectURL(n);r.setAttribute("href",o),r.setAttribute("download",t),document.body.appendChild(r),r.click(),document.body.removeChild(r)}}},v=(t,e=16)=>`${t/e}rem`,De=(t,e=200)=>{let a;return function(...i){clearTimeout(a),a=setTimeout(()=>t.apply(this,i),e)}},an={},dt=(t,e=50,a)=>{a&&an[a]&&window.clearTimeout(an[a]),a?an[a]=window.setTimeout(t,e):window.setTimeout(t,e)},Mn=t=>{an[t]&&window.clearTimeout(an[t])},T=t=>window.requestAnimationFrame(t),$i=()=>{},Co=(t,e,a,i=16)=>{const n=o();let r=!1;requestAnimationFrame(c);function o(){const u=t.scrollLeft,m=e.getBoundingClientRect().left+t.scrollLeft-t.getBoundingClientRect().left;let f=0;return t.classList.add("--is-smooth-scrolling"),{position:()=>(m-u)*f/i+u,isFinished:()=>f++>=i}}function c(){if(n.isFinished()||r){t.classList.remove("--is-smooth-scrolling");return}t.scrollLeft=n.position(),requestAnimationFrame(c)}return()=>{r=!0}},So=new RegExp("^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$","i"),xo=t=>Xt(t)?So.test(t):!1,Po=t=>{if(nn(t))return!0;const e=`${t}`;return e.match(/^-{0,1}\d+$/)?!0:!!e.match(/^\d+\.\d+$/)},ko=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,ga=t=>Xt(t)?ko.test(t.toLowerCase()):!1,_o=t=>!(t!==0&&!t||(Xt(t)||Ct(t))&&t.length<1),Oo=(t,e,a="field")=>{if(!e||e.length===0)return{valid:!0,errors:[]};a=yo(yi(a,!1));let i=!0;const n=[];return e.forEach(r=>{r==="required"?_o(t)||(i=!1,n.push(`${a} is required`)):r==="email"&&t?ga(t)||(i=!1,n.push("This is not a valid email address")):r==="url"&&t?xo(t)||(i=!1,n.push(`${a} is not a valid URL`)):r==="number"&&t?Po(t)||(i=!1,n.push(`${a} is not a valid number`)):r&&t&&console.error(`Validation rule ${r} not added to validation set.`)}),{valid:i,errors:n}},Lo=(t,e,a=!1)=>t.contains&&e instanceof Node&&t.contains(e)?!0:a?wi(t,e):!1,wi=(t,e)=>{var a;if(t.contains&&(t!=null&&t.contains(e)))return!0;if(t.shadowRoot){if((a=t.shadowRoot)!=null&&a.contains(e))return!0;for(const i in t.childNodes)if(wi(t.childNodes[i],e))return!0}return!1},Eo=(t,e)=>{if(e.target&&Lo(t,e.target))return!0;const a=e.composedPath();for(const i in a)if(a[i]===t)return!0;return!1},rn=(t,e="smooth")=>{t==null||t.scrollIntoView({behavior:e,block:"start",inline:"nearest"})};function Ci(){this.documentActiveElement=document.activeElement,this.deepActiveElement=ma.getDeepActiveElement(),this.activeRoot=ma.rootFor(this.activeElement)}Ci.prototype={get activeElement(){return this.deepActiveElement||this.documentActiveElement},get activeHost(){return this.activeRoot.host||window},isSameAs:function(t){return!!t&&t.activeElement===this.activeElement}};function on(t,e,a){this.target=t,this.event=e,this.handler=a,this.target.addEventListener(e,a,!0)}on.prototype={remove:function(){this.target.removeEventListener(this.event,this.handler,!0)}};function Si(t){this.changeCallback=t,this.updateStateTimer=null,this.currentState=null,this.rootFocusListener=null,this.rootBlurListener=null,this.localFocusListener=null,this.localBlurListener=null,this.updateState()}Si.prototype={observe:function(){this.disconnect(),this.updateListeners(),this.updateState()},disconnect:function(){this.rootBlurListener&&this.rootBlurListener.remove(),this.rootFocusListener&&this.rootFocusListener.remove(),this.localBlurListener&&this.localBlurListener.remove(),this.localFocusListener&&this.localFocusListener.remove()},updateState:function(){var t=new Ci;t.isSameAs(this.currentState)||(this.currentState=t,this.updateListeners(),this.changeCallback(this.currentState))},debouncedUpdateState:function(){this.updateStateTimer===null&&(this.updateStateTimer=window.setTimeout((function(){this.updateStateTimer=null,this.updateState()}).bind(this),0))},onFocus:function(){this.updateState()},onBlur:function(){this.debouncedUpdateState()},updateListeners:function(){this.disconnect(),this.rootBlurListener=new on(this.currentState.activeRoot,"blur",this.onBlur.bind(this)),this.rootFocusListener=new on(this.currentState.activeRoot,"focus",this.onFocus.bind(this)),this.localBlurListener=new on(this.currentState.activeElement,"blur",this.onBlur.bind(this)),this.localFocusListener=new on(this.currentState.activeRoot,"focus",this.onFocus.bind(this))}};const ma={isRootNode:function(t){return t.nodeType===Node.DOCUMENT_NODE||t.nodeType===Node.DOCUMENT_FRAGMENT_NODE},rootFor:function(t){for(t.shadowRoot&&(t=t.shadowRoot);t&&!ma.isRootNode(t);)t=t.parentNode;return t||(t=document),t},getDeepActiveElement:function(){var t=document.activeElement;if(t){for(;t.shadowRoot&&t.shadowRoot.activeElement;)t=t.shadowRoot.activeElement;if(t!==document.activeElement)return t}}},Do=t=>{let e=0,a=t;for(;a;)e+=a.offsetTop-(a.clientTop||0),a=a.offsetParent;return e},Mo=(t,e,a=!1)=>{var r,o,c,h,u,m;let i=t,n=0;for(a&&console.log("[hasParent] does ",t,"have",e,"as parent");i;){if(n===100)return console.warn("Recursiveness detected, stopping"),!1;if(i instanceof HTMLElement){if(a&&console.log(` ${n})`,i),i===e)return a&&console.log("     -> parent === iParent",i,t),!0;i.assignedSlot?(a&&console.log("     -> parent.assignedSlot",i.assignedSlot),i=i.assignedSlot):i.shadowRoot?(a&&console.log("     -> parent.shadowRoot",i.getRootNode(),(r=i.getRootNode())==null?void 0:r.host,i.parentElement,i.assignedSlot),i=(o=i.getRootNode())==null?void 0:o.host):(c=i.parentNode)!=null&&c.host?(a&&console.log("     -> parent.parentNode?.host"),i=(h=i.parentNode)==null?void 0:h.host):(u=i.getRootNode())!=null&&u.host?(a&&console.log("     -> parent.getRootNode()?.host"),i=(m=i.getRootNode())==null?void 0:m.host):i.parentElement&&(a&&console.log("     -> parent.parentElement"),i=i.parentElement)}else if(i instanceof ShadowRoot)a&&console.log("     -> parent instanceof ShadowRoot"),i=i.host;else if(i instanceof HTMLSlotElement){a&&console.log("     -> parent instanceof HTMLSlotElement");const f=i.assignedNodes();f.length>0?i=f[0]:i.parentElement&&(i=i.parentElement)}n++}return!1},To=(t,e,a=null,i=!1)=>{var o,c,h,u,m,f;let n=a??e.parentNode??null,r=0;for(i&&console.log("[getParent]");n;){if(r===100){console.warn("Recursiveness detected, stopping");return}if(n instanceof HTMLElement){if(i&&console.log(` ${r})`,n),Xt(t)&&n.tagName===t||n===t)return i&&console.log("     -> parent === target",n,t),n;n.assignedSlot?(i&&console.log("     -> parent.assignedSlot",n.assignedSlot),n=n.assignedSlot):n.shadowRoot?(i&&console.log("     -> parent.shadowRoot",n.getRootNode(),(o=n.getRootNode())==null?void 0:o.host,n.parentElement,n.assignedSlot),n=(c=n.getRootNode())==null?void 0:c.host):(h=n.parentNode)!=null&&h.host?(i&&console.log("     -> parent.parentNode?.host"),n=(u=n.parentNode)==null?void 0:u.host):(m=n.getRootNode())!=null&&m.host?(i&&console.log("     -> parent.getRootNode()?.host"),n=(f=n.getRootNode())==null?void 0:f.host):(i&&console.log("     -> parent.parentElement"),n=n.parentElement)}else if(n instanceof ShadowRoot)i&&console.log("     -> parent instanceof ShadowRoot"),n=n.host;else if(n instanceof HTMLSlotElement){i&&console.log("     -> parent instanceof HTMLSlotElement");const $=n.assignedNodes();$.length>0?n=$[0]:n=n.parentElement}else n=null;r++}},Ao=t=>{const e={};for(const a in t){const i=t[a],n=a.split(".");let r=e;for(let o=0;o<n.length;o++){const c=n[o];o===n.length-1?r[c]=i:(r[c]=r[c]||{},r=r[c])}}return e},Tn=t=>{window.location.hash=t},va=()=>fa(window.location.hash),fa=t=>Xt(t)&&t.startsWith("#")?t.substring(1):t,xi=t=>{va()===t&&history.replaceState(null,"",window.location.pathname+window.location.search)},Pi=(t,e,a=300)=>!ki(t)||!e?!1:(T(()=>{dt(()=>{rn(e)},a)}),!0),ki=t=>!(!t||va()!==t),Me=(t,e)=>e?`${t} { ${e} }`:"";let No=t=>crypto.getRandomValues(new Uint8Array(t)),Bo=(t,e,a)=>{let i=(2<<Math.log(t.length-1)/Math.LN2)-1,n=-~(1.6*i*e/t.length);return(r=e)=>{let o="";for(;;){let c=a(n),h=n;for(;h--;)if(o+=t[c[h]&i]||"",o.length===r)return o}}};const Io=((t,e=21)=>Bo(t,e,No))("1234567890abcdefghijklmnopqrstuvwxyz",10),Ot=()=>Io();class Te{constructor(e){this.start=e,this._name=Ot()}get name(){return this._name}set name(e){this._name=Ee(e)}apply(e,a){return this.start===0?a?Me(a,e):e:`@media screen and (min-width: ${this.start}px) { ${a?Me(a,e):e} }`}}const ya=(t,e)=>/^-webkit/.test(t)||/^--/.test(t)?`${t}: ${e};`:`${Ee(t)}: ${e};`;class Fo{constructor(e){this.__t="responsive",this.values=e}entries(){return Object.entries(this.values)}}function p(t){return new Fo(t)}const sn=t=>Dn(t)?!!(t.__t&&t.__t==="responsive"):!1,_i=(t,e,a)=>e.entries().map(([i,n])=>{var r;return(r=qt.breakpoints)!=null&&r[i]?qt.breakpoints[i].apply(ya(t,n),a):""});class zo{constructor(e){this.fonts=e.fonts,this.typography=e.typography,this.defaults=this.mapKeyToName(e.defaults),this.colors=this.mapKeyToName(e.colors),this.spacings=this.mapKeyToName(e.spacings),this.breakpoints=this.mapKeyToName({base:new Te(0),...e.breakpoints})}mapKeyToName(e){for(const a in e)e[a].name=a;return e}enclosedParse(e,a){const i=[],n=[];return Object.entries(a).map(([o,c])=>{sn(c)?i.push(_i(o,c,e).join(" ")):n.push(ya(o,c))}),Me(e,n.join(" "))+" "+i.join(" ")}parse(e){const a=[];return Object.entries(e).forEach(([i,n])=>{sn(n)?console.warn("No responsive values allowed"):a.push(ya(i,n))}),a.join(" ")}getCurrentBreakpoint(){const e=window.innerWidth;let a=this.breakpoints.base;const i={};for(const n in this.breakpoints){const r=n;i[r]=this.breakpoints[r].start<=window.innerWidth,this.breakpoints[r].start<=window.innerWidth&&(a=this.breakpoints[r])}return{current:a,windowWidth:e,state:i}}}function Ho(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var Oi={exports:{}},Li={aliceblue:[240,248,255],antiquewhite:[250,235,215],aqua:[0,255,255],aquamarine:[127,255,212],azure:[240,255,255],beige:[245,245,220],bisque:[255,228,196],black:[0,0,0],blanchedalmond:[255,235,205],blue:[0,0,255],blueviolet:[138,43,226],brown:[165,42,42],burlywood:[222,184,135],cadetblue:[95,158,160],chartreuse:[127,255,0],chocolate:[210,105,30],coral:[255,127,80],cornflowerblue:[100,149,237],cornsilk:[255,248,220],crimson:[220,20,60],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgoldenrod:[184,134,11],darkgray:[169,169,169],darkgreen:[0,100,0],darkgrey:[169,169,169],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkseagreen:[143,188,143],darkslateblue:[72,61,139],darkslategray:[47,79,79],darkslategrey:[47,79,79],darkturquoise:[0,206,209],darkviolet:[148,0,211],deeppink:[255,20,147],deepskyblue:[0,191,255],dimgray:[105,105,105],dimgrey:[105,105,105],dodgerblue:[30,144,255],firebrick:[178,34,34],floralwhite:[255,250,240],forestgreen:[34,139,34],fuchsia:[255,0,255],gainsboro:[220,220,220],ghostwhite:[248,248,255],gold:[255,215,0],goldenrod:[218,165,32],gray:[128,128,128],green:[0,128,0],greenyellow:[173,255,47],grey:[128,128,128],honeydew:[240,255,240],hotpink:[255,105,180],indianred:[205,92,92],indigo:[75,0,130],ivory:[255,255,240],khaki:[240,230,140],lavender:[230,230,250],lavenderblush:[255,240,245],lawngreen:[124,252,0],lemonchiffon:[255,250,205],lightblue:[173,216,230],lightcoral:[240,128,128],lightcyan:[224,255,255],lightgoldenrodyellow:[250,250,210],lightgray:[211,211,211],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightsalmon:[255,160,122],lightseagreen:[32,178,170],lightskyblue:[135,206,250],lightslategray:[119,136,153],lightslategrey:[119,136,153],lightsteelblue:[176,196,222],lightyellow:[255,255,224],lime:[0,255,0],limegreen:[50,205,50],linen:[250,240,230],magenta:[255,0,255],maroon:[128,0,0],mediumaquamarine:[102,205,170],mediumblue:[0,0,205],mediumorchid:[186,85,211],mediumpurple:[147,112,219],mediumseagreen:[60,179,113],mediumslateblue:[123,104,238],mediumspringgreen:[0,250,154],mediumturquoise:[72,209,204],mediumvioletred:[199,21,133],midnightblue:[25,25,112],mintcream:[245,255,250],mistyrose:[255,228,225],moccasin:[255,228,181],navajowhite:[255,222,173],navy:[0,0,128],oldlace:[253,245,230],olive:[128,128,0],olivedrab:[107,142,35],orange:[255,165,0],orangered:[255,69,0],orchid:[218,112,214],palegoldenrod:[238,232,170],palegreen:[152,251,152],paleturquoise:[175,238,238],palevioletred:[219,112,147],papayawhip:[255,239,213],peachpuff:[255,218,185],peru:[205,133,63],pink:[255,192,203],plum:[221,160,221],powderblue:[176,224,230],purple:[128,0,128],rebeccapurple:[102,51,153],red:[255,0,0],rosybrown:[188,143,143],royalblue:[65,105,225],saddlebrown:[139,69,19],salmon:[250,128,114],sandybrown:[244,164,96],seagreen:[46,139,87],seashell:[255,245,238],sienna:[160,82,45],silver:[192,192,192],skyblue:[135,206,235],slateblue:[106,90,205],slategray:[112,128,144],slategrey:[112,128,144],snow:[255,250,250],springgreen:[0,255,127],steelblue:[70,130,180],tan:[210,180,140],teal:[0,128,128],thistle:[216,191,216],tomato:[255,99,71],turquoise:[64,224,208],violet:[238,130,238],wheat:[245,222,179],white:[255,255,255],whitesmoke:[245,245,245],yellow:[255,255,0],yellowgreen:[154,205,50]},Ei={exports:{}},Ro=function(e){return!e||typeof e=="string"?!1:e instanceof Array||Array.isArray(e)||e.length>=0&&(e.splice instanceof Function||Object.getOwnPropertyDescriptor(e,e.length-1)&&e.constructor.name!=="String")},Vo=Ro,jo=Array.prototype.concat,Uo=Array.prototype.slice,Di=Ei.exports=function(e){for(var a=[],i=0,n=e.length;i<n;i++){var r=e[i];Vo(r)?a=jo.call(a,Uo.call(r)):a.push(r)}return a};Di.wrap=function(t){return function(){return t(Di(arguments))}};var Go=Ei.exports,ln=Li,cn=Go,Mi=Object.hasOwnProperty,Ti=Object.create(null);for(var ba in ln)Mi.call(ln,ba)&&(Ti[ln[ba]]=ba);var Tt=Oi.exports={to:{},get:{}};Tt.get=function(t){var e=t.substring(0,3).toLowerCase(),a,i;switch(e){case"hsl":a=Tt.get.hsl(t),i="hsl";break;case"hwb":a=Tt.get.hwb(t),i="hwb";break;default:a=Tt.get.rgb(t),i="rgb";break}return a?{model:i,value:a}:null},Tt.get.rgb=function(t){if(!t)return null;var e=/^#([a-f0-9]{3,4})$/i,a=/^#([a-f0-9]{6})([a-f0-9]{2})?$/i,i=/^rgba?\(\s*([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)(?=[\s,])\s*(?:,\s*)?([+-]?\d+)\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/,n=/^rgba?\(\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*,?\s*([+-]?[\d\.]+)\%\s*(?:[,|\/]\s*([+-]?[\d\.]+)(%?)\s*)?\)$/,r=/^(\w+)$/,o=[0,0,0,1],c,h,u;if(c=t.match(a)){for(u=c[2],c=c[1],h=0;h<3;h++){var m=h*2;o[h]=parseInt(c.slice(m,m+2),16)}u&&(o[3]=parseInt(u,16)/255)}else if(c=t.match(e)){for(c=c[1],u=c[3],h=0;h<3;h++)o[h]=parseInt(c[h]+c[h],16);u&&(o[3]=parseInt(u+u,16)/255)}else if(c=t.match(i)){for(h=0;h<3;h++)o[h]=parseInt(c[h+1],0);c[4]&&(c[5]?o[3]=parseFloat(c[4])*.01:o[3]=parseFloat(c[4]))}else if(c=t.match(n)){for(h=0;h<3;h++)o[h]=Math.round(parseFloat(c[h+1])*2.55);c[4]&&(c[5]?o[3]=parseFloat(c[4])*.01:o[3]=parseFloat(c[4]))}else return(c=t.match(r))?c[1]==="transparent"?[0,0,0,0]:Mi.call(ln,c[1])?(o=ln[c[1]],o[3]=1,o):null:null;for(h=0;h<3;h++)o[h]=le(o[h],0,255);return o[3]=le(o[3],0,1),o},Tt.get.hsl=function(t){if(!t)return null;var e=/^hsla?\(\s*([+-]?(?:\d{0,3}\.)?\d+)(?:deg)?\s*,?\s*([+-]?[\d\.]+)%\s*,?\s*([+-]?[\d\.]+)%\s*(?:[,|\/]\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/,a=t.match(e);if(a){var i=parseFloat(a[4]),n=(parseFloat(a[1])%360+360)%360,r=le(parseFloat(a[2]),0,100),o=le(parseFloat(a[3]),0,100),c=le(isNaN(i)?1:i,0,1);return[n,r,o,c]}return null},Tt.get.hwb=function(t){if(!t)return null;var e=/^hwb\(\s*([+-]?\d{0,3}(?:\.\d+)?)(?:deg)?\s*,\s*([+-]?[\d\.]+)%\s*,\s*([+-]?[\d\.]+)%\s*(?:,\s*([+-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:[eE][+-]?\d+)?)\s*)?\)$/,a=t.match(e);if(a){var i=parseFloat(a[4]),n=(parseFloat(a[1])%360+360)%360,r=le(parseFloat(a[2]),0,100),o=le(parseFloat(a[3]),0,100),c=le(isNaN(i)?1:i,0,1);return[n,r,o,c]}return null},Tt.to.hex=function(){var t=cn(arguments);return"#"+An(t[0])+An(t[1])+An(t[2])+(t[3]<1?An(Math.round(t[3]*255)):"")},Tt.to.rgb=function(){var t=cn(arguments);return t.length<4||t[3]===1?"rgb("+Math.round(t[0])+", "+Math.round(t[1])+", "+Math.round(t[2])+")":"rgba("+Math.round(t[0])+", "+Math.round(t[1])+", "+Math.round(t[2])+", "+t[3]+")"},Tt.to.rgb.percent=function(){var t=cn(arguments),e=Math.round(t[0]/255*100),a=Math.round(t[1]/255*100),i=Math.round(t[2]/255*100);return t.length<4||t[3]===1?"rgb("+e+"%, "+a+"%, "+i+"%)":"rgba("+e+"%, "+a+"%, "+i+"%, "+t[3]+")"},Tt.to.hsl=function(){var t=cn(arguments);return t.length<4||t[3]===1?"hsl("+t[0]+", "+t[1]+"%, "+t[2]+"%)":"hsla("+t[0]+", "+t[1]+"%, "+t[2]+"%, "+t[3]+")"},Tt.to.hwb=function(){var t=cn(arguments),e="";return t.length>=4&&t[3]!==1&&(e=", "+t[3]),"hwb("+t[0]+", "+t[1]+"%, "+t[2]+"%"+e+")"},Tt.to.keyword=function(t){return Ti[t.slice(0,3)]};function le(t,e,a){return Math.min(Math.max(e,t),a)}function An(t){var e=Math.round(t).toString(16).toUpperCase();return e.length<2?"0"+e:e}var Wo=Oi.exports;const dn=Li,Ai={};for(const t of Object.keys(dn))Ai[dn[t]]=t;const k={rgb:{channels:3,labels:"rgb"},hsl:{channels:3,labels:"hsl"},hsv:{channels:3,labels:"hsv"},hwb:{channels:3,labels:"hwb"},cmyk:{channels:4,labels:"cmyk"},xyz:{channels:3,labels:"xyz"},lab:{channels:3,labels:"lab"},lch:{channels:3,labels:"lch"},hex:{channels:1,labels:["hex"]},keyword:{channels:1,labels:["keyword"]},ansi16:{channels:1,labels:["ansi16"]},ansi256:{channels:1,labels:["ansi256"]},hcg:{channels:3,labels:["h","c","g"]},apple:{channels:3,labels:["r16","g16","b16"]},gray:{channels:1,labels:["gray"]}};var Ni=k;for(const t of Object.keys(k)){if(!("channels"in k[t]))throw new Error("missing channels property: "+t);if(!("labels"in k[t]))throw new Error("missing channel labels property: "+t);if(k[t].labels.length!==k[t].channels)throw new Error("channel and label counts mismatch: "+t);const{channels:e,labels:a}=k[t];delete k[t].channels,delete k[t].labels,Object.defineProperty(k[t],"channels",{value:e}),Object.defineProperty(k[t],"labels",{value:a})}k.rgb.hsl=function(t){const e=t[0]/255,a=t[1]/255,i=t[2]/255,n=Math.min(e,a,i),r=Math.max(e,a,i),o=r-n;let c,h;r===n?c=0:e===r?c=(a-i)/o:a===r?c=2+(i-e)/o:i===r&&(c=4+(e-a)/o),c=Math.min(c*60,360),c<0&&(c+=360);const u=(n+r)/2;return r===n?h=0:u<=.5?h=o/(r+n):h=o/(2-r-n),[c,h*100,u*100]},k.rgb.hsv=function(t){let e,a,i,n,r;const o=t[0]/255,c=t[1]/255,h=t[2]/255,u=Math.max(o,c,h),m=u-Math.min(o,c,h),f=function($){return(u-$)/6/m+1/2};return m===0?(n=0,r=0):(r=m/u,e=f(o),a=f(c),i=f(h),o===u?n=i-a:c===u?n=1/3+e-i:h===u&&(n=2/3+a-e),n<0?n+=1:n>1&&(n-=1)),[n*360,r*100,u*100]},k.rgb.hwb=function(t){const e=t[0],a=t[1];let i=t[2];const n=k.rgb.hsl(t)[0],r=1/255*Math.min(e,Math.min(a,i));return i=1-1/255*Math.max(e,Math.max(a,i)),[n,r*100,i*100]},k.rgb.cmyk=function(t){const e=t[0]/255,a=t[1]/255,i=t[2]/255,n=Math.min(1-e,1-a,1-i),r=(1-e-n)/(1-n)||0,o=(1-a-n)/(1-n)||0,c=(1-i-n)/(1-n)||0;return[r*100,o*100,c*100,n*100]};function qo(t,e){return(t[0]-e[0])**2+(t[1]-e[1])**2+(t[2]-e[2])**2}k.rgb.keyword=function(t){const e=Ai[t];if(e)return e;let a=1/0,i;for(const n of Object.keys(dn)){const r=dn[n],o=qo(t,r);o<a&&(a=o,i=n)}return i},k.keyword.rgb=function(t){return dn[t]},k.rgb.xyz=function(t){let e=t[0]/255,a=t[1]/255,i=t[2]/255;e=e>.04045?((e+.055)/1.055)**2.4:e/12.92,a=a>.04045?((a+.055)/1.055)**2.4:a/12.92,i=i>.04045?((i+.055)/1.055)**2.4:i/12.92;const n=e*.4124+a*.3576+i*.1805,r=e*.2126+a*.7152+i*.0722,o=e*.0193+a*.1192+i*.9505;return[n*100,r*100,o*100]},k.rgb.lab=function(t){const e=k.rgb.xyz(t);let a=e[0],i=e[1],n=e[2];a/=95.047,i/=100,n/=108.883,a=a>.008856?a**(1/3):7.787*a+16/116,i=i>.008856?i**(1/3):7.787*i+16/116,n=n>.008856?n**(1/3):7.787*n+16/116;const r=116*i-16,o=500*(a-i),c=200*(i-n);return[r,o,c]},k.hsl.rgb=function(t){const e=t[0]/360,a=t[1]/100,i=t[2]/100;let n,r,o;if(a===0)return o=i*255,[o,o,o];i<.5?n=i*(1+a):n=i+a-i*a;const c=2*i-n,h=[0,0,0];for(let u=0;u<3;u++)r=e+1/3*-(u-1),r<0&&r++,r>1&&r--,6*r<1?o=c+(n-c)*6*r:2*r<1?o=n:3*r<2?o=c+(n-c)*(2/3-r)*6:o=c,h[u]=o*255;return h},k.hsl.hsv=function(t){const e=t[0];let a=t[1]/100,i=t[2]/100,n=a;const r=Math.max(i,.01);i*=2,a*=i<=1?i:2-i,n*=r<=1?r:2-r;const o=(i+a)/2,c=i===0?2*n/(r+n):2*a/(i+a);return[e,c*100,o*100]},k.hsv.rgb=function(t){const e=t[0]/60,a=t[1]/100;let i=t[2]/100;const n=Math.floor(e)%6,r=e-Math.floor(e),o=255*i*(1-a),c=255*i*(1-a*r),h=255*i*(1-a*(1-r));switch(i*=255,n){case 0:return[i,h,o];case 1:return[c,i,o];case 2:return[o,i,h];case 3:return[o,c,i];case 4:return[h,o,i];case 5:return[i,o,c]}},k.hsv.hsl=function(t){const e=t[0],a=t[1]/100,i=t[2]/100,n=Math.max(i,.01);let r,o;o=(2-a)*i;const c=(2-a)*n;return r=a*n,r/=c<=1?c:2-c,r=r||0,o/=2,[e,r*100,o*100]},k.hwb.rgb=function(t){const e=t[0]/360;let a=t[1]/100,i=t[2]/100;const n=a+i;let r;n>1&&(a/=n,i/=n);const o=Math.floor(6*e),c=1-i;r=6*e-o,o&1&&(r=1-r);const h=a+r*(c-a);let u,m,f;switch(o){default:case 6:case 0:u=c,m=h,f=a;break;case 1:u=h,m=c,f=a;break;case 2:u=a,m=c,f=h;break;case 3:u=a,m=h,f=c;break;case 4:u=h,m=a,f=c;break;case 5:u=c,m=a,f=h;break}return[u*255,m*255,f*255]},k.cmyk.rgb=function(t){const e=t[0]/100,a=t[1]/100,i=t[2]/100,n=t[3]/100,r=1-Math.min(1,e*(1-n)+n),o=1-Math.min(1,a*(1-n)+n),c=1-Math.min(1,i*(1-n)+n);return[r*255,o*255,c*255]},k.xyz.rgb=function(t){const e=t[0]/100,a=t[1]/100,i=t[2]/100;let n,r,o;return n=e*3.2406+a*-1.5372+i*-.4986,r=e*-.9689+a*1.8758+i*.0415,o=e*.0557+a*-.204+i*1.057,n=n>.0031308?1.055*n**(1/2.4)-.055:n*12.92,r=r>.0031308?1.055*r**(1/2.4)-.055:r*12.92,o=o>.0031308?1.055*o**(1/2.4)-.055:o*12.92,n=Math.min(Math.max(0,n),1),r=Math.min(Math.max(0,r),1),o=Math.min(Math.max(0,o),1),[n*255,r*255,o*255]},k.xyz.lab=function(t){let e=t[0],a=t[1],i=t[2];e/=95.047,a/=100,i/=108.883,e=e>.008856?e**(1/3):7.787*e+16/116,a=a>.008856?a**(1/3):7.787*a+16/116,i=i>.008856?i**(1/3):7.787*i+16/116;const n=116*a-16,r=500*(e-a),o=200*(a-i);return[n,r,o]},k.lab.xyz=function(t){const e=t[0],a=t[1],i=t[2];let n,r,o;r=(e+16)/116,n=a/500+r,o=r-i/200;const c=r**3,h=n**3,u=o**3;return r=c>.008856?c:(r-16/116)/7.787,n=h>.008856?h:(n-16/116)/7.787,o=u>.008856?u:(o-16/116)/7.787,n*=95.047,r*=100,o*=108.883,[n,r,o]},k.lab.lch=function(t){const e=t[0],a=t[1],i=t[2];let n;n=Math.atan2(i,a)*360/2/Math.PI,n<0&&(n+=360);const o=Math.sqrt(a*a+i*i);return[e,o,n]},k.lch.lab=function(t){const e=t[0],a=t[1],n=t[2]/360*2*Math.PI,r=a*Math.cos(n),o=a*Math.sin(n);return[e,r,o]},k.rgb.ansi16=function(t,e=null){const[a,i,n]=t;let r=e===null?k.rgb.hsv(t)[2]:e;if(r=Math.round(r/50),r===0)return 30;let o=30+(Math.round(n/255)<<2|Math.round(i/255)<<1|Math.round(a/255));return r===2&&(o+=60),o},k.hsv.ansi16=function(t){return k.rgb.ansi16(k.hsv.rgb(t),t[2])},k.rgb.ansi256=function(t){const e=t[0],a=t[1],i=t[2];return e===a&&a===i?e<8?16:e>248?231:Math.round((e-8)/247*24)+232:16+36*Math.round(e/255*5)+6*Math.round(a/255*5)+Math.round(i/255*5)},k.ansi16.rgb=function(t){let e=t%10;if(e===0||e===7)return t>50&&(e+=3.5),e=e/10.5*255,[e,e,e];const a=(~~(t>50)+1)*.5,i=(e&1)*a*255,n=(e>>1&1)*a*255,r=(e>>2&1)*a*255;return[i,n,r]},k.ansi256.rgb=function(t){if(t>=232){const r=(t-232)*10+8;return[r,r,r]}t-=16;let e;const a=Math.floor(t/36)/5*255,i=Math.floor((e=t%36)/6)/5*255,n=e%6/5*255;return[a,i,n]},k.rgb.hex=function(t){const a=(((Math.round(t[0])&255)<<16)+((Math.round(t[1])&255)<<8)+(Math.round(t[2])&255)).toString(16).toUpperCase();return"000000".substring(a.length)+a},k.hex.rgb=function(t){const e=t.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);if(!e)return[0,0,0];let a=e[0];e[0].length===3&&(a=a.split("").map(c=>c+c).join(""));const i=parseInt(a,16),n=i>>16&255,r=i>>8&255,o=i&255;return[n,r,o]},k.rgb.hcg=function(t){const e=t[0]/255,a=t[1]/255,i=t[2]/255,n=Math.max(Math.max(e,a),i),r=Math.min(Math.min(e,a),i),o=n-r;let c,h;return o<1?c=r/(1-o):c=0,o<=0?h=0:n===e?h=(a-i)/o%6:n===a?h=2+(i-e)/o:h=4+(e-a)/o,h/=6,h%=1,[h*360,o*100,c*100]},k.hsl.hcg=function(t){const e=t[1]/100,a=t[2]/100,i=a<.5?2*e*a:2*e*(1-a);let n=0;return i<1&&(n=(a-.5*i)/(1-i)),[t[0],i*100,n*100]},k.hsv.hcg=function(t){const e=t[1]/100,a=t[2]/100,i=e*a;let n=0;return i<1&&(n=(a-i)/(1-i)),[t[0],i*100,n*100]},k.hcg.rgb=function(t){const e=t[0]/360,a=t[1]/100,i=t[2]/100;if(a===0)return[i*255,i*255,i*255];const n=[0,0,0],r=e%1*6,o=r%1,c=1-o;let h=0;switch(Math.floor(r)){case 0:n[0]=1,n[1]=o,n[2]=0;break;case 1:n[0]=c,n[1]=1,n[2]=0;break;case 2:n[0]=0,n[1]=1,n[2]=o;break;case 3:n[0]=0,n[1]=c,n[2]=1;break;case 4:n[0]=o,n[1]=0,n[2]=1;break;default:n[0]=1,n[1]=0,n[2]=c}return h=(1-a)*i,[(a*n[0]+h)*255,(a*n[1]+h)*255,(a*n[2]+h)*255]},k.hcg.hsv=function(t){const e=t[1]/100,a=t[2]/100,i=e+a*(1-e);let n=0;return i>0&&(n=e/i),[t[0],n*100,i*100]},k.hcg.hsl=function(t){const e=t[1]/100,i=t[2]/100*(1-e)+.5*e;let n=0;return i>0&&i<.5?n=e/(2*i):i>=.5&&i<1&&(n=e/(2*(1-i))),[t[0],n*100,i*100]},k.hcg.hwb=function(t){const e=t[1]/100,a=t[2]/100,i=e+a*(1-e);return[t[0],(i-e)*100,(1-i)*100]},k.hwb.hcg=function(t){const e=t[1]/100,i=1-t[2]/100,n=i-e;let r=0;return n<1&&(r=(i-n)/(1-n)),[t[0],n*100,r*100]},k.apple.rgb=function(t){return[t[0]/65535*255,t[1]/65535*255,t[2]/65535*255]},k.rgb.apple=function(t){return[t[0]/255*65535,t[1]/255*65535,t[2]/255*65535]},k.gray.rgb=function(t){return[t[0]/100*255,t[0]/100*255,t[0]/100*255]},k.gray.hsl=function(t){return[0,0,t[0]]},k.gray.hsv=k.gray.hsl,k.gray.hwb=function(t){return[0,100,t[0]]},k.gray.cmyk=function(t){return[0,0,0,t[0]]},k.gray.lab=function(t){return[t[0],0,0]},k.gray.hex=function(t){const e=Math.round(t[0]/100*255)&255,i=((e<<16)+(e<<8)+e).toString(16).toUpperCase();return"000000".substring(i.length)+i},k.rgb.gray=function(t){return[(t[0]+t[1]+t[2])/3/255*100]};const Nn=Ni;function Yo(){const t={},e=Object.keys(Nn);for(let a=e.length,i=0;i<a;i++)t[e[i]]={distance:-1,parent:null};return t}function Ko(t){const e=Yo(),a=[t];for(e[t].distance=0;a.length;){const i=a.pop(),n=Object.keys(Nn[i]);for(let r=n.length,o=0;o<r;o++){const c=n[o],h=e[c];h.distance===-1&&(h.distance=e[i].distance+1,h.parent=i,a.unshift(c))}}return e}function Zo(t,e){return function(a){return e(t(a))}}function Xo(t,e){const a=[e[t].parent,t];let i=Nn[e[t].parent][t],n=e[t].parent;for(;e[n].parent;)a.unshift(e[n].parent),i=Zo(Nn[e[n].parent][n],i),n=e[n].parent;return i.conversion=a,i}var Qo=function(t){const e=Ko(t),a={},i=Object.keys(e);for(let n=i.length,r=0;r<n;r++){const o=i[r];e[o].parent!==null&&(a[o]=Xo(o,e))}return a};const $a=Ni,Jo=Qo,Ae={},ts=Object.keys($a);function es(t){const e=function(...a){const i=a[0];return i==null?i:(i.length>1&&(a=i),t(a))};return"conversion"in t&&(e.conversion=t.conversion),e}function ns(t){const e=function(...a){const i=a[0];if(i==null)return i;i.length>1&&(a=i);const n=t(a);if(typeof n=="object")for(let r=n.length,o=0;o<r;o++)n[o]=Math.round(n[o]);return n};return"conversion"in t&&(e.conversion=t.conversion),e}ts.forEach(t=>{Ae[t]={},Object.defineProperty(Ae[t],"channels",{value:$a[t].channels}),Object.defineProperty(Ae[t],"labels",{value:$a[t].labels});const e=Jo(t);Object.keys(e).forEach(i=>{const n=e[i];Ae[t][i]=ns(n),Ae[t][i].raw=es(n)})});var as=Ae;const Ne=Wo,At=as,Bi=["keyword","gray","hex"],wa={};for(const t of Object.keys(At))wa[[...At[t].labels].sort().join("")]=t;const Bn={};function mt(t,e){if(!(this instanceof mt))return new mt(t,e);if(e&&e in Bi&&(e=null),e&&!(e in At))throw new Error("Unknown model: "+e);let a,i;if(t==null)this.model="rgb",this.color=[0,0,0],this.valpha=1;else if(t instanceof mt)this.model=t.model,this.color=[...t.color],this.valpha=t.valpha;else if(typeof t=="string"){const n=Ne.get(t);if(n===null)throw new Error("Unable to parse color from string: "+t);this.model=n.model,i=At[this.model].channels,this.color=n.value.slice(0,i),this.valpha=typeof n.value[i]=="number"?n.value[i]:1}else if(t.length>0){this.model=e||"rgb",i=At[this.model].channels;const n=Array.prototype.slice.call(t,0,i);this.color=Ca(n,i),this.valpha=typeof t[i]=="number"?t[i]:1}else if(typeof t=="number")this.model="rgb",this.color=[t>>16&255,t>>8&255,t&255],this.valpha=1;else{this.valpha=1;const n=Object.keys(t);"alpha"in t&&(n.splice(n.indexOf("alpha"),1),this.valpha=typeof t.alpha=="number"?t.alpha:0);const r=n.sort().join("");if(!(r in wa))throw new Error("Unable to parse color from object: "+JSON.stringify(t));this.model=wa[r];const{labels:o}=At[this.model],c=[];for(a=0;a<o.length;a++)c.push(t[o[a]]);this.color=Ca(c)}if(Bn[this.model])for(i=At[this.model].channels,a=0;a<i;a++){const n=Bn[this.model][a];n&&(this.color[a]=n(this.color[a]))}this.valpha=Math.max(0,Math.min(1,this.valpha)),Object.freeze&&Object.freeze(this)}mt.prototype={toString(){return this.string()},toJSON(){return this[this.model]()},string(t){let e=this.model in Ne.to?this:this.rgb();e=e.round(typeof t=="number"?t:1);const a=e.valpha===1?e.color:[...e.color,this.valpha];return Ne.to[e.model](a)},percentString(t){const e=this.rgb().round(typeof t=="number"?t:1),a=e.valpha===1?e.color:[...e.color,this.valpha];return Ne.to.rgb.percent(a)},array(){return this.valpha===1?[...this.color]:[...this.color,this.valpha]},object(){const t={},{channels:e}=At[this.model],{labels:a}=At[this.model];for(let i=0;i<e;i++)t[a[i]]=this.color[i];return this.valpha!==1&&(t.alpha=this.valpha),t},unitArray(){const t=this.rgb().color;return t[0]/=255,t[1]/=255,t[2]/=255,this.valpha!==1&&t.push(this.valpha),t},unitObject(){const t=this.rgb().object();return t.r/=255,t.g/=255,t.b/=255,this.valpha!==1&&(t.alpha=this.valpha),t},round(t){return t=Math.max(t||0,0),new mt([...this.color.map(rs(t)),this.valpha],this.model)},alpha(t){return t!==void 0?new mt([...this.color,Math.max(0,Math.min(1,t))],this.model):this.valpha},red:et("rgb",0,pt(255)),green:et("rgb",1,pt(255)),blue:et("rgb",2,pt(255)),hue:et(["hsl","hsv","hsl","hwb","hcg"],0,t=>(t%360+360)%360),saturationl:et("hsl",1,pt(100)),lightness:et("hsl",2,pt(100)),saturationv:et("hsv",1,pt(100)),value:et("hsv",2,pt(100)),chroma:et("hcg",1,pt(100)),gray:et("hcg",2,pt(100)),white:et("hwb",1,pt(100)),wblack:et("hwb",2,pt(100)),cyan:et("cmyk",0,pt(100)),magenta:et("cmyk",1,pt(100)),yellow:et("cmyk",2,pt(100)),black:et("cmyk",3,pt(100)),x:et("xyz",0,pt(95.047)),y:et("xyz",1,pt(100)),z:et("xyz",2,pt(108.833)),l:et("lab",0,pt(100)),a:et("lab",1),b:et("lab",2),keyword(t){return t!==void 0?new mt(t):At[this.model].keyword(this.color)},hex(t){return t!==void 0?new mt(t):Ne.to.hex(this.rgb().round().color)},hexa(t){if(t!==void 0)return new mt(t);const e=this.rgb().round().color;let a=Math.round(this.valpha*255).toString(16).toUpperCase();return a.length===1&&(a="0"+a),Ne.to.hex(e)+a},rgbNumber(){const t=this.rgb().color;return(t[0]&255)<<16|(t[1]&255)<<8|t[2]&255},luminosity(){const t=this.rgb().color,e=[];for(const[a,i]of t.entries()){const n=i/255;e[a]=n<=.04045?n/12.92:((n+.055)/1.055)**2.4}return .2126*e[0]+.7152*e[1]+.0722*e[2]},contrast(t){const e=this.luminosity(),a=t.luminosity();return e>a?(e+.05)/(a+.05):(a+.05)/(e+.05)},level(t){const e=this.contrast(t);return e>=7?"AAA":e>=4.5?"AA":""},isDark(){const t=this.rgb().color;return(t[0]*2126+t[1]*7152+t[2]*722)/1e4<128},isLight(){return!this.isDark()},negate(){const t=this.rgb();for(let e=0;e<3;e++)t.color[e]=255-t.color[e];return t},lighten(t){const e=this.hsl();return e.color[2]+=e.color[2]*t,e},darken(t){const e=this.hsl();return e.color[2]-=e.color[2]*t,e},saturate(t){const e=this.hsl();return e.color[1]+=e.color[1]*t,e},desaturate(t){const e=this.hsl();return e.color[1]-=e.color[1]*t,e},whiten(t){const e=this.hwb();return e.color[1]+=e.color[1]*t,e},blacken(t){const e=this.hwb();return e.color[2]+=e.color[2]*t,e},grayscale(){const t=this.rgb().color,e=t[0]*.3+t[1]*.59+t[2]*.11;return mt.rgb(e,e,e)},fade(t){return this.alpha(this.valpha-this.valpha*t)},opaquer(t){return this.alpha(this.valpha+this.valpha*t)},rotate(t){const e=this.hsl();let a=e.color[0];return a=(a+t)%360,a=a<0?360+a:a,e.color[0]=a,e},mix(t,e){if(!t||!t.rgb)throw new Error('Argument to "mix" was not a Color instance, but rather an instance of '+typeof t);const a=t.rgb(),i=this.rgb(),n=e===void 0?.5:e,r=2*n-1,o=a.alpha()-i.alpha(),c=((r*o===-1?r:(r+o)/(1+r*o))+1)/2,h=1-c;return mt.rgb(c*a.red()+h*i.red(),c*a.green()+h*i.green(),c*a.blue()+h*i.blue(),a.alpha()*n+i.alpha()*(1-n))}};for(const t of Object.keys(At)){if(Bi.includes(t))continue;const{channels:e}=At[t];mt.prototype[t]=function(...a){return this.model===t?new mt(this):a.length>0?new mt(a,t):new mt([...os(At[this.model][t].raw(this.color)),this.valpha],t)},mt[t]=function(...a){let i=a[0];return typeof i=="number"&&(i=Ca(a,e)),new mt(i,t)}}function is(t,e){return Number(t.toFixed(e))}function rs(t){return function(e){return is(e,t)}}function et(t,e,a){t=Array.isArray(t)?t:[t];for(const i of t)(Bn[i]||(Bn[i]=[]))[e]=a;return t=t[0],function(i){let n;return i!==void 0?(a&&(i=a(i)),n=this[t](),n.color[e]=i,n):(n=this[t]().color[e],a&&(n=a(n)),n)}}function pt(t){return function(e){return Math.max(0,Math.min(t,e))}}function os(t){return Array.isArray(t)?t:[t]}function Ca(t,e){for(let a=0;a<e;a++)typeof t[a]!="number"&&(t[a]=0);return t}var ss=mt;const ls=Ho(ss);class D{constructor(e){this._name="",this.value=new ls(e),this._name=Ot()}get name(){return this._name}set name(e){this._name=Ee(e)}get variable(){return`--adgm-color-${this._name}`}get definition(){return`${this.variable}: ${this.value.hex()};`}alpha(e){return this.value.alpha(e)}toString(){return`var(${this.variable})`}}class cs{constructor(e,a,i){this.name=`adgm-${Ee(e)}`,this.variants=i,this.backupFonts=a}import(e){return this.variants.map(a=>a.import(this.name,e)).join(`
`)}family(){return[`'${this.name}'`,...this.backupFonts].join(", ")}toString(){return this.family()}}class ce{constructor(e,a){this.urls=e,this.options=a}import(e,a){const i=this.urls.map(n=>`url("${a}/${n.fileName}") format("${n.format}")`).join(", ");return`@font-face { font-family: "${e}"; src: ${i}; font-weight: ${this.options.weight}; font-style: ${this.options.italic?"italic":"normal"}; }`}}class W{constructor(e,a){this._name="",this.value=e,this.color=a,this._name=Ot()}get name(){return this._name}set name(e){this._name=Ee(e)}get variable(){return`--adgm-spacing-${this._name}`}get definition(){return`${this.variable}: ${this.value};`}toString(){return`var(${this.variable})`}}class nt{constructor(e,a){this.properties=e,this.weights=a}}class Sa{constructor(e){this._name="",this.value=e,this._name=Ot()}get name(){return this._name}set name(e){this._name=Ee(e)}get variable(){return`--adgm-default-${this._name}`}get definition(){return`${this.variable}: ${this.value};`}toString(){return`var(${this.variable})`}}const ds={s:new Te(374),m:new Te(768),l:new Te(1024),xl:new Te(1200),xxl:new Te(1400)},Ii={background:new D("#FFF"),foreground:new D("#333"),clearsky140:new D("#005299"),clearsky120:new D("#006DCC"),clearsky100:new D("#0088FF"),clearsky80:new D("#33A0FF"),clearsky60:new D("#66B8FF"),clearsky40:new D("#99CFFF"),clearsky20:new D("#CCE7FF"),coolglass100:new D("#B0FAFF"),coolglass80:new D("#C0FBFF"),coolglass60:new D("#D0FCFF"),coolglass40:new D("#DFFDFF"),coolglass20:new D("#EFFEFF"),steelgrey100:new D("#A3ADC2"),steelgrey80:new D("#B5BDCE"),steelgrey60:new D("#C8CEDA"),steelgrey40:new D("#DADEE7"),steelgrey20:new D("#EDEFF3"),black100:new D("#000"),black80:new D("#333"),black60:new D("#666"),black40:new D("#999"),black20:new D("#CCC"),citynight100:new D("#002ED1"),citynight140:new D("#001C7D"),citynight180:new D("#00092A"),brightgrey100:new D("#E5F0F0"),sunhaze100:new D("#F5EDDE"),white:new D("#FFF"),error:new D("#EB5757"),sky100:new D("#0088FF"),sky70:new D("#33A0FF"),sky50:new D("#66B8FF"),sky20:new D("#99CFFF"),sky10:new D("#CCE7FF"),darksky100:new D("#0088FF"),darksky70:new D("#33A0FF"),night100:new D("#000"),night80:new D("#333"),night60:new D("#666"),night40:new D("#999"),night20:new D("#CCC"),night10:new D("#CCC"),night5:new D("#CCC"),gold:new D("#0088FF"),success:new D("#0088FF")},X={gilroy:new cs("Gilroy",["sans-serif"],[new ce([{fileName:"Gilroy-Light.woff2",format:"woff2"}],{weight:300}),new ce([{fileName:"Gilroy-LightItalic.woff2",format:"woff2"}],{weight:300,italic:!0}),new ce([{fileName:"Gilroy-Regular.woff2",format:"woff2"}],{weight:400}),new ce([{fileName:"Gilroy-RegularItalic.woff2",format:"woff2"}],{weight:400,italic:!0}),new ce([{fileName:"Gilroy-Medium.woff2",format:"woff2"}],{weight:500}),new ce([{fileName:"Gilroy-MediumItalic.woff2",format:"woff2"}],{weight:500,italic:!0}),new ce([{fileName:"Gilroy-SemiBold.woff2",format:"woff2"}],{weight:600}),new ce([{fileName:"Gilroy-SemiBoldItalic.woff2",format:"woff2"}],{weight:600,italic:!0})])},Q={s4:new W(v(4)),s8:new W(v(8)),s12:new W(v(12)),s16:new W(v(16)),s20:new W(v(20)),s24:new W(v(24)),s32:new W(v(32)),s40:new W(v(40)),s48:new W(v(48)),s64:new W(v(64)),s80:new W(v(80)),s96:new W(v(96)),s128:new W(v(128)),s160:new W(v(160)),s192:new W(v(192)),s224:new W(v(224)),s256:new W(v(256))},hs={rBody2XS:new W(p({base:Q.s8,s:Q.s12}),"#E4FFE5"),rBodyXS:new W(p({base:Q.s8,s:Q.s16}),"#B1EEB3"),rBodyS:new W(p({base:Q.s16,m:Q.s24}),"#b7fbd2"),rBodyM:new W(p({base:Q.s24,m:Q.s32}),"#f9cccc"),rBody2M:new W(p({base:Q.s32,m:Q.s48}),"#FFE68D"),rBodyL:new W(p({base:Q.s40,m:Q.s64}),"#d2ccf9"),rBodyXL:new W(p({base:Q.s64,m:Q.s80}),"#b7deea"),rSectionS:new W(p({base:Q.s40,m:Q.s64}),"#99b5c5"),rSectionM:new W(p({base:Q.s80,m:Q.s128}),"#99b5c5"),rSectionL:new W(p({base:Q.s160,m:Q.s256}),"#6f8897"),rGridGap:new W(p({base:Q.s16,m:Q.s32})),...Q},us={tagLine:new nt({fontFamily:X.gilroy.toString(),fontSize:p({base:v(16),m:v(18)}),lineHeight:"120%",letterSpacing:"0.02em","--font-weight":"500"},["500"]),heroTitleS:new nt({fontFamily:X.gilroy.toString(),fontSize:p({base:v(54),m:v(62)}),lineHeight:"100%",letterSpacing:"-0.02em","--font-weight":"300"},["300"]),heroTitleM:new nt({fontFamily:X.gilroy.toString(),fontSize:p({base:v(62),m:v(84)}),lineHeight:"100%",letterSpacing:"-0.02em","--font-weight":"300"},["300"]),heroTitleL:new nt({fontFamily:X.gilroy.toString(),fontSize:p({base:v(64),m:v(84),l:v(116)}),lineHeight:"100%",letterSpacing:"-0.02em","--font-weight":"300"},["300"]),pageIntroTitle:new nt({fontFamily:X.gilroy.toString(),fontSize:p({base:v(40),m:v(54)}),lineHeight:"120%",letterSpacing:"-0.02em","--font-weight":"300"},["300"]),sectionTitle:new nt({fontFamily:X.gilroy.toString(),fontSize:p({base:v(52),m:v(58)}),lineHeight:"110%",letterSpacing:"-0.02em","--font-weight":"300"},["300"]),bannerTitle:new nt({fontFamily:X.gilroy.toString(),fontSize:p({base:v(40),m:v(48)}),lineHeight:"120%",letterSpacing:"-0.02em","--font-weight":"300"},["300"]),headingTwo:new nt({fontFamily:X.gilroy.toString(),fontSize:p({base:v(40),m:v(48)}),lineHeight:p({base:"120%",m:"128%"}),letterSpacing:"-0.02em","--font-weight":"300"},["300"]),display3XL:new nt({fontFamily:X.gilroy.toString(),fontSize:v(126),lineHeight:"100%",letterSpacing:"-0.02em"},["300"]),display2XL:new nt({fontFamily:X.gilroy.toString(),fontSize:v(110),lineHeight:"100%",letterSpacing:"-0.02em"},["300"]),displayXL:new nt({fontFamily:X.gilroy.toString(),fontSize:v(78),lineHeight:"106%",letterSpacing:"-0.02em"},["300","400","500"]),displayL:new nt({fontFamily:X.gilroy.toString(),fontSize:v(58),lineHeight:"110%",letterSpacing:"-0.02em"},["300","400","500"]),displayM:new nt({fontFamily:X.gilroy.toString(),fontSize:v(44),lineHeight:"120%",letterSpacing:"-0.02em"},["300","400","500"]),displayS:new nt({fontFamily:X.gilroy.toString(),fontSize:v(48),lineHeight:"120%",letterSpacing:"-0.02em"},["300","400","500"]),displayXS:new nt({fontFamily:X.gilroy.toString(),fontSize:v(40),lineHeight:"120%",letterSpacing:"-0.02em"},["300","400","500"]),display2XS:new nt({fontFamily:X.gilroy.toString(),fontSize:v(32),lineHeight:"120%",letterSpacing:0},["300","400","500"]),text2XL:new nt({fontFamily:X.gilroy.toString(),fontSize:v(28),lineHeight:"140%",letterSpacing:0},["300","400","500"]),textXL:new nt({fontFamily:X.gilroy.toString(),fontSize:v(24),lineHeight:"140%",letterSpacing:0},["300","400","500"]),textL:new nt({fontFamily:X.gilroy.toString(),fontSize:v(20),lineHeight:"160%",letterSpacing:"0.02em"},["300","400","500"]),textM:new nt({fontFamily:X.gilroy.toString(),fontSize:v(18),lineHeight:"160%",letterSpacing:"0.02em"},["300","400","500"]),textS:new nt({fontFamily:X.gilroy.toString(),fontSize:v(16),lineHeight:"160%",letterSpacing:"0.02em"},["300","400","500","600"]),textXS:new nt({fontFamily:X.gilroy.toString(),fontSize:v(14),lineHeight:"150%",letterSpacing:"0.02em"},["300","400","500","600"])},ps={transitionDuration:new Sa(".15s"),transitionEase:new Sa("ease"),focusVisible:new Sa(`2px solid ${Ii.citynight100.value.hex()}`)},qt=new zo({fonts:X,colors:Ii,spacings:hs,typography:us,breakpoints:ds,defaults:ps});/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const In=window,xa=In.ShadowRoot&&(In.ShadyCSS===void 0||In.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Pa=Symbol(),Fi=new WeakMap;let zi=class{constructor(e,a,i){if(this._$cssResult$=!0,i!==Pa)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=a}get styleSheet(){let e=this.o;const a=this.t;if(xa&&e===void 0){const i=a!==void 0&&a.length===1;i&&(e=Fi.get(a)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&Fi.set(a,e))}return e}toString(){return this.cssText}};const Hi=t=>new zi(typeof t=="string"?t:t+"",void 0,Pa),Ri=(t,...e)=>{const a=t.length===1?t[0]:e.reduce((i,n,r)=>i+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(n)+t[r+1],t[0]);return new zi(a,t,Pa)},gs=(t,e)=>{xa?t.adoptedStyleSheets=e.map(a=>a instanceof CSSStyleSheet?a:a.styleSheet):e.forEach(a=>{const i=document.createElement("style"),n=In.litNonce;n!==void 0&&i.setAttribute("nonce",n),i.textContent=a.cssText,t.appendChild(i)})},Vi=xa?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let a="";for(const i of e.cssRules)a+=i.cssText;return Hi(a)})(t):t;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ka;const Fn=window,ji=Fn.trustedTypes,ms=ji?ji.emptyScript:"",Ui=Fn.reactiveElementPolyfillSupport,_a={toAttribute(t,e){switch(e){case Boolean:t=t?ms:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let a=t;switch(e){case Boolean:a=t!==null;break;case Number:a=t===null?null:Number(t);break;case Object:case Array:try{a=JSON.parse(t)}catch{a=null}}return a}},Gi=(t,e)=>e!==t&&(e==e||t==t),Oa={attribute:!0,type:String,converter:_a,reflect:!1,hasChanged:Gi},La="finalized";let Be=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this._$Eu()}static addInitializer(e){var a;this.finalize(),((a=this.h)!==null&&a!==void 0?a:this.h=[]).push(e)}static get observedAttributes(){this.finalize();const e=[];return this.elementProperties.forEach((a,i)=>{const n=this._$Ep(i,a);n!==void 0&&(this._$Ev.set(n,i),e.push(n))}),e}static createProperty(e,a=Oa){if(a.state&&(a.attribute=!1),this.finalize(),this.elementProperties.set(e,a),!a.noAccessor&&!this.prototype.hasOwnProperty(e)){const i=typeof e=="symbol"?Symbol():"__"+e,n=this.getPropertyDescriptor(e,i,a);n!==void 0&&Object.defineProperty(this.prototype,e,n)}}static getPropertyDescriptor(e,a,i){return{get(){return this[a]},set(n){const r=this[e];this[a]=n,this.requestUpdate(e,r,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)||Oa}static finalize(){if(this.hasOwnProperty(La))return!1;this[La]=!0;const e=Object.getPrototypeOf(this);if(e.finalize(),e.h!==void 0&&(this.h=[...e.h]),this.elementProperties=new Map(e.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const a=this.properties,i=[...Object.getOwnPropertyNames(a),...Object.getOwnPropertySymbols(a)];for(const n of i)this.createProperty(n,a[n])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(e){const a=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const n of i)a.unshift(Vi(n))}else e!==void 0&&a.push(Vi(e));return a}static _$Ep(e,a){const i=a.attribute;return i===!1?void 0:typeof i=="string"?i:typeof e=="string"?e.toLowerCase():void 0}_$Eu(){var e;this._$E_=new Promise(a=>this.enableUpdating=a),this._$AL=new Map,this._$Eg(),this.requestUpdate(),(e=this.constructor.h)===null||e===void 0||e.forEach(a=>a(this))}addController(e){var a,i;((a=this._$ES)!==null&&a!==void 0?a:this._$ES=[]).push(e),this.renderRoot!==void 0&&this.isConnected&&((i=e.hostConnected)===null||i===void 0||i.call(e))}removeController(e){var a;(a=this._$ES)===null||a===void 0||a.splice(this._$ES.indexOf(e)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach((e,a)=>{this.hasOwnProperty(a)&&(this._$Ei.set(a,this[a]),delete this[a])})}createRenderRoot(){var e;const a=(e=this.shadowRoot)!==null&&e!==void 0?e:this.attachShadow(this.constructor.shadowRootOptions);return gs(a,this.constructor.elementStyles),a}connectedCallback(){var e;this.renderRoot===void 0&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$ES)===null||e===void 0||e.forEach(a=>{var i;return(i=a.hostConnected)===null||i===void 0?void 0:i.call(a)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$ES)===null||e===void 0||e.forEach(a=>{var i;return(i=a.hostDisconnected)===null||i===void 0?void 0:i.call(a)})}attributeChangedCallback(e,a,i){this._$AK(e,i)}_$EO(e,a,i=Oa){var n;const r=this.constructor._$Ep(e,i);if(r!==void 0&&i.reflect===!0){const o=(((n=i.converter)===null||n===void 0?void 0:n.toAttribute)!==void 0?i.converter:_a).toAttribute(a,i.type);this._$El=e,o==null?this.removeAttribute(r):this.setAttribute(r,o),this._$El=null}}_$AK(e,a){var i;const n=this.constructor,r=n._$Ev.get(e);if(r!==void 0&&this._$El!==r){const o=n.getPropertyOptions(r),c=typeof o.converter=="function"?{fromAttribute:o.converter}:((i=o.converter)===null||i===void 0?void 0:i.fromAttribute)!==void 0?o.converter:_a;this._$El=r,this[r]=c.fromAttribute(a,o.type),this._$El=null}}requestUpdate(e,a,i){let n=!0;e!==void 0&&(((i=i||this.constructor.getPropertyOptions(e)).hasChanged||Gi)(this[e],a)?(this._$AL.has(e)||this._$AL.set(e,a),i.reflect===!0&&this._$El!==e&&(this._$EC===void 0&&(this._$EC=new Map),this._$EC.set(e,i))):n=!1),!this.isUpdatePending&&n&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(a){Promise.reject(a)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var e;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach((n,r)=>this[r]=n),this._$Ei=void 0);let a=!1;const i=this._$AL;try{a=this.shouldUpdate(i),a?(this.willUpdate(i),(e=this._$ES)===null||e===void 0||e.forEach(n=>{var r;return(r=n.hostUpdate)===null||r===void 0?void 0:r.call(n)}),this.update(i)):this._$Ek()}catch(n){throw a=!1,this._$Ek(),n}a&&this._$AE(i)}willUpdate(e){}_$AE(e){var a;(a=this._$ES)===null||a===void 0||a.forEach(i=>{var n;return(n=i.hostUpdated)===null||n===void 0?void 0:n.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(e){return!0}update(e){this._$EC!==void 0&&(this._$EC.forEach((a,i)=>this._$EO(i,this[i],a)),this._$EC=void 0),this._$Ek()}updated(e){}firstUpdated(e){}};Be[La]=!0,Be.elementProperties=new Map,Be.elementStyles=[],Be.shadowRootOptions={mode:"open"},Ui==null||Ui({ReactiveElement:Be}),((ka=Fn.reactiveElementVersions)!==null&&ka!==void 0?ka:Fn.reactiveElementVersions=[]).push("1.6.3");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Ea;const zn=window,Ie=zn.trustedTypes,Wi=Ie?Ie.createPolicy("lit-html",{createHTML:t=>t}):void 0,Da="$lit$",de=`lit$${(Math.random()+"").slice(9)}$`,qi="?"+de,vs=`<${qi}>`,me=document,hn=()=>me.createComment(""),un=t=>t===null||typeof t!="object"&&typeof t!="function",Yi=Array.isArray,fs=t=>Yi(t)||typeof(t==null?void 0:t[Symbol.iterator])=="function",Ma=`[ 	
\f\r]`,pn=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ki=/-->/g,Zi=/>/g,ve=RegExp(`>|${Ma}(?:([^\\s"'>=/]+)(${Ma}*=${Ma}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Xi=/'/g,Qi=/"/g,Ji=/^(?:script|style|textarea|title)$/i,tr=t=>(e,...a)=>({_$litType$:t,strings:e,values:a}),d=tr(1),B=tr(2),he=Symbol.for("lit-noChange"),P=Symbol.for("lit-nothing"),er=new WeakMap,fe=me.createTreeWalker(me,129,null,!1);function nr(t,e){if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return Wi!==void 0?Wi.createHTML(e):e}const ys=(t,e)=>{const a=t.length-1,i=[];let n,r=e===2?"<svg>":"",o=pn;for(let c=0;c<a;c++){const h=t[c];let u,m,f=-1,$=0;for(;$<h.length&&(o.lastIndex=$,m=o.exec(h),m!==null);)$=o.lastIndex,o===pn?m[1]==="!--"?o=Ki:m[1]!==void 0?o=Zi:m[2]!==void 0?(Ji.test(m[2])&&(n=RegExp("</"+m[2],"g")),o=ve):m[3]!==void 0&&(o=ve):o===ve?m[0]===">"?(o=n??pn,f=-1):m[1]===void 0?f=-2:(f=o.lastIndex-m[2].length,u=m[1],o=m[3]===void 0?ve:m[3]==='"'?Qi:Xi):o===Qi||o===Xi?o=ve:o===Ki||o===Zi?o=pn:(o=ve,n=void 0);const x=o===ve&&t[c+1].startsWith("/>")?" ":"";r+=o===pn?h+vs:f>=0?(i.push(u),h.slice(0,f)+Da+h.slice(f)+de+x):h+de+(f===-2?(i.push(void 0),c):x)}return[nr(t,r+(t[a]||"<?>")+(e===2?"</svg>":"")),i]};class gn{constructor({strings:e,_$litType$:a},i){let n;this.parts=[];let r=0,o=0;const c=e.length-1,h=this.parts,[u,m]=ys(e,a);if(this.el=gn.createElement(u,i),fe.currentNode=this.el.content,a===2){const f=this.el.content,$=f.firstChild;$.remove(),f.append(...$.childNodes)}for(;(n=fe.nextNode())!==null&&h.length<c;){if(n.nodeType===1){if(n.hasAttributes()){const f=[];for(const $ of n.getAttributeNames())if($.endsWith(Da)||$.startsWith(de)){const x=m[o++];if(f.push($),x!==void 0){const M=n.getAttribute(x.toLowerCase()+Da).split(de),V=/([.?@])?(.*)/.exec(x);h.push({type:1,index:r,name:V[2],strings:M,ctor:V[1]==="."?$s:V[1]==="?"?Cs:V[1]==="@"?Ss:Hn})}else h.push({type:6,index:r})}for(const $ of f)n.removeAttribute($)}if(Ji.test(n.tagName)){const f=n.textContent.split(de),$=f.length-1;if($>0){n.textContent=Ie?Ie.emptyScript:"";for(let x=0;x<$;x++)n.append(f[x],hn()),fe.nextNode(),h.push({type:2,index:++r});n.append(f[$],hn())}}}else if(n.nodeType===8)if(n.data===qi)h.push({type:2,index:r});else{let f=-1;for(;(f=n.data.indexOf(de,f+1))!==-1;)h.push({type:7,index:r}),f+=de.length-1}r++}}static createElement(e,a){const i=me.createElement("template");return i.innerHTML=e,i}}function Fe(t,e,a=t,i){var n,r,o,c;if(e===he)return e;let h=i!==void 0?(n=a._$Co)===null||n===void 0?void 0:n[i]:a._$Cl;const u=un(e)?void 0:e._$litDirective$;return(h==null?void 0:h.constructor)!==u&&((r=h==null?void 0:h._$AO)===null||r===void 0||r.call(h,!1),u===void 0?h=void 0:(h=new u(t),h._$AT(t,a,i)),i!==void 0?((o=(c=a)._$Co)!==null&&o!==void 0?o:c._$Co=[])[i]=h:a._$Cl=h),h!==void 0&&(e=Fe(t,h._$AS(t,e.values),h,i)),e}class bs{constructor(e,a){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=a}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){var a;const{el:{content:i},parts:n}=this._$AD,r=((a=e==null?void 0:e.creationScope)!==null&&a!==void 0?a:me).importNode(i,!0);fe.currentNode=r;let o=fe.nextNode(),c=0,h=0,u=n[0];for(;u!==void 0;){if(c===u.index){let m;u.type===2?m=new mn(o,o.nextSibling,this,e):u.type===1?m=new u.ctor(o,u.name,u.strings,this,e):u.type===6&&(m=new xs(o,this,e)),this._$AV.push(m),u=n[++h]}c!==(u==null?void 0:u.index)&&(o=fe.nextNode(),c++)}return fe.currentNode=me,r}v(e){let a=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(e,i,a),a+=i.strings.length-2):i._$AI(e[a])),a++}}class mn{constructor(e,a,i,n){var r;this.type=2,this._$AH=P,this._$AN=void 0,this._$AA=e,this._$AB=a,this._$AM=i,this.options=n,this._$Cp=(r=n==null?void 0:n.isConnected)===null||r===void 0||r}get _$AU(){var e,a;return(a=(e=this._$AM)===null||e===void 0?void 0:e._$AU)!==null&&a!==void 0?a:this._$Cp}get parentNode(){let e=this._$AA.parentNode;const a=this._$AM;return a!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=a.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,a=this){e=Fe(this,e,a),un(e)?e===P||e==null||e===""?(this._$AH!==P&&this._$AR(),this._$AH=P):e!==this._$AH&&e!==he&&this._(e):e._$litType$!==void 0?this.g(e):e.nodeType!==void 0?this.$(e):fs(e)?this.T(e):this._(e)}k(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}$(e){this._$AH!==e&&(this._$AR(),this._$AH=this.k(e))}_(e){this._$AH!==P&&un(this._$AH)?this._$AA.nextSibling.data=e:this.$(me.createTextNode(e)),this._$AH=e}g(e){var a;const{values:i,_$litType$:n}=e,r=typeof n=="number"?this._$AC(e):(n.el===void 0&&(n.el=gn.createElement(nr(n.h,n.h[0]),this.options)),n);if(((a=this._$AH)===null||a===void 0?void 0:a._$AD)===r)this._$AH.v(i);else{const o=new bs(r,this),c=o.u(this.options);o.v(i),this.$(c),this._$AH=o}}_$AC(e){let a=er.get(e.strings);return a===void 0&&er.set(e.strings,a=new gn(e)),a}T(e){Yi(this._$AH)||(this._$AH=[],this._$AR());const a=this._$AH;let i,n=0;for(const r of e)n===a.length?a.push(i=new mn(this.k(hn()),this.k(hn()),this,this.options)):i=a[n],i._$AI(r),n++;n<a.length&&(this._$AR(i&&i._$AB.nextSibling,n),a.length=n)}_$AR(e=this._$AA.nextSibling,a){var i;for((i=this._$AP)===null||i===void 0||i.call(this,!1,!0,a);e&&e!==this._$AB;){const n=e.nextSibling;e.remove(),e=n}}setConnected(e){var a;this._$AM===void 0&&(this._$Cp=e,(a=this._$AP)===null||a===void 0||a.call(this,e))}}class Hn{constructor(e,a,i,n,r){this.type=1,this._$AH=P,this._$AN=void 0,this.element=e,this.name=a,this._$AM=n,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=P}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(e,a=this,i,n){const r=this.strings;let o=!1;if(r===void 0)e=Fe(this,e,a,0),o=!un(e)||e!==this._$AH&&e!==he,o&&(this._$AH=e);else{const c=e;let h,u;for(e=r[0],h=0;h<r.length-1;h++)u=Fe(this,c[i+h],a,h),u===he&&(u=this._$AH[h]),o||(o=!un(u)||u!==this._$AH[h]),u===P?e=P:e!==P&&(e+=(u??"")+r[h+1]),this._$AH[h]=u}o&&!n&&this.j(e)}j(e){e===P?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class $s extends Hn{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===P?void 0:e}}const ws=Ie?Ie.emptyScript:"";class Cs extends Hn{constructor(){super(...arguments),this.type=4}j(e){e&&e!==P?this.element.setAttribute(this.name,ws):this.element.removeAttribute(this.name)}}class Ss extends Hn{constructor(e,a,i,n,r){super(e,a,i,n,r),this.type=5}_$AI(e,a=this){var i;if((e=(i=Fe(this,e,a,0))!==null&&i!==void 0?i:P)===he)return;const n=this._$AH,r=e===P&&n!==P||e.capture!==n.capture||e.once!==n.once||e.passive!==n.passive,o=e!==P&&(n===P||r);r&&this.element.removeEventListener(this.name,this,n),o&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var a,i;typeof this._$AH=="function"?this._$AH.call((i=(a=this.options)===null||a===void 0?void 0:a.host)!==null&&i!==void 0?i:this.element,e):this._$AH.handleEvent(e)}}class xs{constructor(e,a,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=a,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){Fe(this,e)}}const ar=zn.litHtmlPolyfillSupport;ar==null||ar(gn,mn),((Ea=zn.litHtmlVersions)!==null&&Ea!==void 0?Ea:zn.litHtmlVersions=[]).push("2.8.0");const ir=(t,e,a)=>{var i,n;const r=(i=a==null?void 0:a.renderBefore)!==null&&i!==void 0?i:e;let o=r._$litPart$;if(o===void 0){const c=(n=a==null?void 0:a.renderBefore)!==null&&n!==void 0?n:null;r._$litPart$=o=new mn(e.insertBefore(hn(),c),c,void 0,a??{})}return o._$AI(t),o};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Ta,Aa;let L=class extends Be{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e,a;const i=super.createRenderRoot();return(e=(a=this.renderOptions).renderBefore)!==null&&e!==void 0||(a.renderBefore=i.firstChild),i}update(e){const a=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=ir(a,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)===null||e===void 0||e.setConnected(!1)}render(){return he}};L.finalized=!0,L._$litElement$=!0,(Ta=globalThis.litElementHydrateSupport)===null||Ta===void 0||Ta.call(globalThis,{LitElement:L});const rr=globalThis.litElementPolyfillSupport;rr==null||rr({LitElement:L}),((Aa=globalThis.litElementVersions)!==null&&Aa!==void 0?Aa:globalThis.litElementVersions=[]).push("3.3.3");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const b=t=>e=>typeof e=="function"?((a,i)=>(customElements.define(a,i),i))(t,e):((a,i)=>{const{kind:n,elements:r}=i;return{kind:n,elements:r,finisher(o){customElements.define(a,o)}}})(t,e);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ps=(t,e)=>e.kind==="method"&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(a){a.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){typeof e.initializer=="function"&&(this[e.key]=e.initializer.call(this))},finisher(a){a.createProperty(e.key,t)}},ks=(t,e,a)=>{e.constructor.createProperty(a,t)};function l(t){return(e,a)=>a!==void 0?ks(t,e,a):Ps(t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function w(t){return l({...t,state:!0})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Na=({finisher:t,descriptor:e})=>(a,i)=>{var n;if(i===void 0){const r=(n=a.originalKey)!==null&&n!==void 0?n:a.key,o=e!=null?{kind:"method",placement:"prototype",key:r,descriptor:e(a.key)}:{...a,key:r};return t!=null&&(o.finisher=function(c){t(c,r)}),o}{const r=a.constructor;e!==void 0&&Object.defineProperty(a,i,e(i)),t==null||t(r,i)}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function q(t,e){return Na({descriptor:a=>{const i={get(){var n,r;return(r=(n=this.renderRoot)===null||n===void 0?void 0:n.querySelector(t))!==null&&r!==void 0?r:null},enumerable:!0,configurable:!0};if(e){const n=typeof a=="symbol"?Symbol():"__"+a;i.get=function(){var r,o;return this[n]===void 0&&(this[n]=(o=(r=this.renderRoot)===null||r===void 0?void 0:r.querySelector(t))!==null&&o!==void 0?o:null),this[n]}}return i}})}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Ba;((Ba=window.HTMLSlotElement)===null||Ba===void 0?void 0:Ba.prototype.assignedElements)!=null;const g=(t,...e)=>{let a="";for(let i=0;i<e.length;i++){const n=e[i];a+=t[i],a+=$o(n)?n({theme:qt}):n}return a+=t[t.length-1],Hi(a)},kt=(t,e,a)=>(Ct(e)?e.map(n=>[n,n]):Object.entries(e)).map(([n,r])=>{const o=[],c=`${(a==null?void 0:a.pre)||""}${r}${(a==null?void 0:a.post)||""}`;return a!=null&&a.property?Ct(a.property)?a.property.forEach(h=>o.push(`${h}: ${c};`)):o.push(`${a.property}: ${c};`):o.push(`${t}: ${c};`),a!=null&&a.enclose?Me(`:host([${t}="${n}"]) ${a==null?void 0:a.enclose}`,o.join(" ")):Me(`:host([${t}="${n}"])`,o.join(" "))}).join(" "),or=["flex-start","center","flex-end","space-between","space-around","space-evenly"],sr=["flex-start","center","flex-end","baseline","stretch"],_s=g`
  :host {
    display: flex;
    flex-direction: column;
    position: relative;
  }

  :host([wrap]) {
    flex-wrap: wrap;
  }
  :host([inline]) {
    display: inline-flex;
  }
  :host([direction="row"]) {
    flex-direction: row;
  }

  ${({theme:t})=>t.enclosedParse(':host([direction="columnOnS"])',{flexDirection:p({base:"column",s:"row"})})}

  ${({theme:t})=>kt("gap",t.spacings)}

  ${kt("justify",or,{property:"justify-content"})}
  
  ${kt("align",sr,{property:"align-items"})}
`;/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let Os=class extends Event{constructor(e,a,i){super("context-request",{bubbles:!0,composed:!0}),this.context=e,this.callback=a,this.subscribe=i}};/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function f2(t){return t}/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let Ls=class{constructor(e,a,i,n){var r;if(this.subscribe=!1,this.provided=!1,this.value=void 0,this.t=(o,c)=>{this.unsubscribe&&(this.unsubscribe!==c&&(this.provided=!1,this.unsubscribe()),this.subscribe||this.unsubscribe()),this.value=o,this.host.requestUpdate(),this.provided&&!this.subscribe||(this.provided=!0,this.callback&&this.callback(o,c)),this.unsubscribe=c},this.host=e,a.context!==void 0){const o=a;this.context=o.context,this.callback=o.callback,this.subscribe=(r=o.subscribe)!==null&&r!==void 0&&r}else this.context=a,this.callback=i,this.subscribe=n!=null&&n;this.host.addController(this)}hostConnected(){this.dispatchRequest()}hostDisconnected(){this.unsubscribe&&(this.unsubscribe(),this.unsubscribe=void 0)}dispatchRequest(){this.host.dispatchEvent(new Os(this.context,this.t,this.subscribe))}};/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let Es=class{constructor(e){this.disposers=new Map,this.updateObservers=()=>{for(const[a,i]of this.disposers)a(this.o,i)},e!==void 0&&(this.value=e)}get value(){return this.o}set value(e){this.setValue(e)}setValue(e,a=!1){const i=a||!Object.is(e,this.o);this.o=e,i&&this.updateObservers()}addCallback(e,a){if(a){this.disposers.has(e)||this.disposers.set(e,()=>{this.disposers.delete(e)});const i=this.disposers.get(e);e(this.value,i)}else e(this.value)}clearCallbacks(){this.disposers.clear()}};/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let Ds=class extends Event{constructor(e){super("context-provider",{bubbles:!0,composed:!0}),this.context=e}},Ms=class extends Es{constructor(e,a,i){super(a.context!==void 0?a.initialValue:i),this.onContextRequest=n=>{n.context===this.context&&n.composedPath()[0]!==this.host&&(n.stopPropagation(),this.addCallback(n.callback,n.subscribe))},this.host=e,a.context!==void 0?this.context=a.context:this.context=a,this.attachListeners(),this.host.addController(this)}attachListeners(){this.host.addEventListener("context-request",this.onContextRequest)}hostConnected(){this.host.dispatchEvent(new Ds(this.context))}};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function vt({context:t}){return Na({finisher:(e,a)=>{const i=new WeakMap;e.addInitializer(c=>{i.set(c,new Ms(c,{context:t}))});const n=Object.getOwnPropertyDescriptor(e.prototype,a),r=n==null?void 0:n.set,o={...n,set:function(c){var h;(h=i.get(this))===null||h===void 0||h.setValue(c),r&&r.call(this,c)}};Object.defineProperty(e.prototype,a,o)}})}/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function O({context:t,subscribe:e}){return Na({finisher:(a,i)=>{a.addInitializer(n=>{new Ls(n,{context:t,callback:r=>{n[i]=r},subscribe:e})})}})}const Rn="debugMode";/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Y=t=>t??P;var Ts=Object.defineProperty,As=Object.getOwnPropertyDescriptor,lr=(t,e,a,i)=>{for(var n=i>1?void 0:i?As(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&Ts(e,a,n),n};class E extends L{constructor(){super(...arguments),this.isDebugMode=!1,this.noDebug=!1}renderDebug(e,a={}){return!this.isDebugMode||this.noDebug?null:d`
      <adgm-debug
        component=${e}
        description=${(a==null?void 0:a.description)||P}
        color=${Y(a.color)}
        ?striped=${a.striped}
        ?always-show=${a.alwaysShow}
        @click=${()=>{var i;return(i=a==null?void 0:a.onClick)==null?void 0:i.call(a)}}
      ></adgm-debug>
    `}}lr([O({context:Rn,subscribe:!0}),l({attribute:!1})],E.prototype,"isDebugMode",2),lr([l({type:Boolean,attribute:"_dd"})],E.prototype,"noDebug",2);var Ns=Object.defineProperty,Bs=Object.getOwnPropertyDescriptor,ye=(t,e,a,i)=>{for(var n=i>1?void 0:i?Bs(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&Ns(e,a,n),n};s.Flex=class extends E{constructor(){super(...arguments),this.direction="column",this.wrap=!1,this.inline=!1}render(){return d`
      ${this.renderDebug("adgm-flex",{description:this.gap?`gap ${this.gap}`:void 0})}
      <slot></slot>
    `}},s.Flex.styles=_s,ye([l({type:String})],s.Flex.prototype,"direction",2),ye([l({type:Boolean})],s.Flex.prototype,"wrap",2),ye([l({type:Boolean})],s.Flex.prototype,"inline",2),ye([l({type:String})],s.Flex.prototype,"gap",2),ye([l({type:String})],s.Flex.prototype,"align",2),ye([l({type:String})],s.Flex.prototype,"justify",2),s.Flex=ye([b("adgm-flex")],s.Flex);const Is=g`
  :host {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
  }
`;var Fs=Object.defineProperty,zs=Object.getOwnPropertyDescriptor,Hs=(t,e,a,i)=>{for(var n=i>1?void 0:i?zs(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&Fs(e,a,n),n};s.Center=class extends L{render(){return d`<slot></slot>`}},s.Center.styles=Is,s.Center=Hs([b("adgm-center")],s.Center);const Rs=g`
  :host {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    background: ${({theme:t})=>t.colors.black100.alpha(.75)};
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .button-wrapper {
    display: flex;
    flex-direction: row;
    justify-content: end;
  }
`,_=g`
  ::slotted(*),
  * {
    font-family: ${({theme:t})=>t.fonts.gilroy};
    font-weight: var(--font-weight, 400);
    font-smooth: always;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }
`;var Vs=Object.defineProperty,js=Object.getOwnPropertyDescriptor,Vn=(t,e,a,i)=>{for(var n=i>1?void 0:i?js(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&Vs(e,a,n),n};s.Alert=class extends L{constructor(){super(...arguments),this.variant="success",this.title="",this.message=""}connectedCallback(){super.connectedCallback(),document.body.style.overflow="hidden"}render(){return d`
      <adgm-message variant=${this.variant} title="">
        <adgm-text weight="600" variant="textM">${this.title}</adgm-text>
        <adgm-spacer height="s8"></adgm-spacer>
        <adgm-text weight="400" variant="textS">${this.message}</adgm-text>
        <adgm-spacer height="rBodyM"></adgm-spacer>
        <div class="button-wrapper">
          <adgm-button
            @click=${this.close}
            variant=${this.variant==="error"?"secondary":"success"}
          >
            Close
          </adgm-button>
        </div>
      </adgm-message>
    `}close(){document.body.style.overflow="",this.remove()}},s.Alert.styles=[_,Rs],Vn([l({type:String})],s.Alert.prototype,"variant",2),Vn([l({type:String})],s.Alert.prototype,"title",2),Vn([l({type:String})],s.Alert.prototype,"message",2),s.Alert=Vn([b("adgm-alert")],s.Alert);const Us=g`
  :host {
    display: inline-block;
    position: relative;
    overflow: hidden;

    height: var(--image-size, 100%);
    width: var(--image-size, 100%);
    grid-column: var(--image-grid-column);
    margin-top: var(--image-margin-top);
    grid-row: var(--image-grid-row);
  }

  :host([ratio]) {
    width: 100%;
    height: auto !important;
  }
  :host([ratio="1/1"]) {
    aspect-ratio: 1/1;
  }
  :host([ratio="16/9"]) {
    aspect-ratio: 16/9;
  }
  :host([ratio="4/3"]) {
    aspect-ratio: 4/3;
  }

  img {
    transition: opacity 0.3s ease, transform 1s ease;
    position: absolute;
    width: calc(100% + 2px);
    height: calc(100% + 2px);
    top: -1px;
    left: -1px;
    opacity: 0;
    object-fit: cover;
    user-select: none;
  }

  img.--loaded {
    opacity: 1;
  }

  img.--parent-hover,
  img.--hover:hover {
    transform: scale(1.1);
  }

  adgm-blur-hash {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  ${kt("fit",["contain","cover","fill","none"],{property:"object-fit",enclose:"img"})}

  ::slotted(adgm-mechanic) {
    position: absolute;
    width: 42%;
    bottom: 0;
    right: 0;
  }
`;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const cr={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},dr=t=>(...e)=>({_$litDirective$:t,values:e});class hr{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,a,i){this._$Ct=e,this._$AM=a,this._$Ci=i}_$AS(e,a){return this.update(e,a)}update(e,a){return this.render(...a)}}/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const A=dr(class extends hr{constructor(t){var e;if(super(t),t.type!==cr.ATTRIBUTE||t.name!=="class"||((e=t.strings)===null||e===void 0?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){var a,i;if(this.it===void 0){this.it=new Set,t.strings!==void 0&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(r=>r!=="")));for(const r in e)e[r]&&!(!((a=this.nt)===null||a===void 0)&&a.has(r))&&this.it.add(r);return this.render(e)}const n=t.element.classList;this.it.forEach(r=>{r in e||(n.remove(r),this.it.delete(r))});for(const r in e){const o=!!e[r];o===this.it.has(r)||!((i=this.nt)===null||i===void 0)&&i.has(r)||(o?(n.add(r),this.it.add(r)):(n.remove(r),this.it.delete(r)))}return he}}),ze="parentHover";/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function y(t,e,a){return t?e():a==null?void 0:a()}var Gs=Object.defineProperty,Ws=Object.getOwnPropertyDescriptor,Lt=(t,e,a,i)=>{for(var n=i>1?void 0:i?Ws(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&Gs(e,a,n),n};s.Image=class extends E{constructor(){super(...arguments),this.fit="cover",this.loading="lazy",this.loaded=!1,this.hideBlur=!1}firstUpdated(){if(!this.shadowRoot)return;const e=this.shadowRoot.querySelector("img");if(!e){console.warn("Image node not found");return}e.onload=()=>this.onLoad()}onLoad(){this.loaded=!0,this.blurHash&&window.setTimeout(()=>{this&&(this.hideBlur=!0)},500)}render(){return d`
      ${this.renderDebug("adgm-image")}
      ${y(this.blurHash&&!this.hideBlur,()=>d`<adgm-blur-hash hash=${this.blurHash}></adgm-blur-hash>`)}
      <picture>
        ${y(this.srcLarge,()=>d`<source media="(min-width: 1024px)" srcset=${this.srcLarge}></source>`)}
        ${y(this.srcMedium,()=>d`<source media="(min-width: 768px) and (max-width: 1024px)" srcset=${this.srcMedium}></source>`)}
        ${y(this.srcSmall,()=>d`<source media="(max-width: 768px)" srcset=${this.srcSmall}></source>`)}
        <img
          class=${A({"--loaded":this.loaded,"--parent-hover":!!this.hasParentHover,"--hover":!!this.hover})}
          draggable="false"
          src=${Y(this.src)}
          alt=${Y(this.alt)}
          loading=${this.loading}
        />
        <slot></slot>
      </picture>
    `}},s.Image.styles=Us,Lt([O({context:ze,subscribe:!0}),l({attribute:!1})],s.Image.prototype,"hasParentHover",2),Lt([l({type:String})],s.Image.prototype,"fit",2),Lt([l({type:String})],s.Image.prototype,"loading",2),Lt([l({type:String})],s.Image.prototype,"ratio",2),Lt([l({type:String})],s.Image.prototype,"src",2),Lt([l({type:String,attribute:"src-small"})],s.Image.prototype,"srcSmall",2),Lt([l({type:String,attribute:"src-medium"})],s.Image.prototype,"srcMedium",2),Lt([l({type:String,attribute:"src-large"})],s.Image.prototype,"srcLarge",2),Lt([l({type:String})],s.Image.prototype,"alt",2),Lt([l({type:String,attribute:"blur-hash"})],s.Image.prototype,"blurHash",2),Lt([l({type:Boolean})],s.Image.prototype,"hover",2),Lt([w()],s.Image.prototype,"loaded",2),Lt([w()],s.Image.prototype,"hideBlur",2),s.Image=Lt([b("adgm-image")],s.Image);const qs=g`
  :host {
    display: block;
    overflow: hidden;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 1;
    z-index: 4;
  }

  :host(.--size-m) adgm-container,
  :host(.--size-l) adgm-container {
    display: contents !important;
  }

  .content {
    padding-bottom: calc(12px + ${({theme:t})=>t.spacings.rBodyL});
  }
`,Ys=g`
  :host {
    display: block;
    overflow: hidden;
    position: relative;
  }

  ${({theme:t})=>kt("color",t.colors,{property:"background-color"})}

  .--size-s {
    height: 60vh;
    min-height: 450px;
    max-height: 500px;
  }

  ::slotted(adgm-hero-slide.--hidden) {
    display: none;
  }
  ::slotted(adgm-hero-slide.--active) {
    opacity: 0;
    z-index: 2;
    background: ${({theme:t})=>t.colors.black40};
  }
  ::slotted(adgm-hero-slide.--animate-in) {
    opacity: 1 !important;
  }
  ::slotted(adgm-hero-slide.--inactive) {
    z-index: 1;
    opacity: 1;
  }

  ::slotted(adgm-hero-slide.--active),
  ::slotted(adgm-hero-slide.--inactive) {
    transition: opacity 0.8s ease;
  }

  /**
   * Navigation
   */

  .navigation-container {
    position: absolute;
    z-index: 100;
    left: 0;
    bottom: ${({theme:t})=>t.spacings.s32};
    width: 100%;
  }

  .--size-m .navigation-container adgm-container,
  .--size-l .navigation-container adgm-container {
    display: contents;
  }

  .navigation {
    width: 100%;
    display: flex;
    gap: ${({theme:t})=>t.spacings.s8};
  }

  ${({theme:t})=>t.enclosedParse(".--size-m .navigation, .--size-l .navigation",{paddingLeft:p({base:`${t.spacings.s16}`,m:`${t.spacings.s32}`}),paddingRight:p({base:`${t.spacings.s16}`,m:`${t.spacings.s32}`})})}

  .dot {
    position: relative;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: white;
    opacity: 0.5;
    cursor: pointer;
    transition: ${({theme:t})=>`opacity ${t.defaults.transitionDuration} ${t.defaults.transitionEase}`};
    box-shadow: ${({theme:t})=>t.colors.foreground.alpha(.2)} 1px 0 10px;
  }

  .dot::before {
    content: "";
    width: 20px;
    height: 20px;
    position: absolute;
    top: -4px;
    left: -4px;
  }

  .dot.--active,
  .dot:hover {
    opacity: 1;
  }
`,ur=g`
  ::slotted(adgm-image) {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    pointer-events: none;
  }

  .content {
    box-sizing: border-box;
    color: ${({theme:t})=>t.colors.white};
    width: 100%;
    position: absolute;
    left: 0;
    z-index: 2;
    text-shadow: ${({theme:t})=>t.colors.foreground.alpha(.2)} 1px 0 20px;
    word-wrap: break-word;
  }

  ::slotted(adgm-text) br {
    display: none;
  }

  /**
   * Hero size
   */

  ${({theme:t})=>t.enclosedParse(".--size-m",{height:p({base:"60vh",m:"65vh"}),minHeight:p({base:"550px",m:"600px"})})}

  ${({theme:t})=>t.enclosedParse(".--size-l",{height:p({base:"70vh",m:"75vh"}),minHeight:p({base:"600px",m:"720px"})})}

  /**
   * Content size and position
   */

  ${({theme:t})=>t.enclosedParse(".content",{bottom:p({base:t.spacings.rBody2M})})}

  ${({theme:t})=>t.enclosedParse(".--size-m .content, :host(.--size-m) .content",{paddingLeft:p({base:`${t.spacings.s16}`,m:`${t.spacings.s32}`}),paddingRight:p({base:`${t.spacings.s16}`,m:`${t.spacings.s32}`})})}

  ${({theme:t})=>t.enclosedParse(".--size-l .content, :host(.--size-l) .content",{paddingLeft:p({base:`${t.spacings.s16}`,m:`${t.spacings.s32}`}),paddingRight:p({base:`${t.spacings.s16}`,m:`${t.spacings.s32}`})})}

  /**
   * Mechanic
   */

  ${({theme:t})=>t.enclosedParse("::slotted(adgm-mechanic)",{display:p({base:"none",m:"block"})})}

  ::slotted(adgm-mechanic) {
    position: absolute;
    width: 30vw;
    max-width: 390px;
    z-index: 2;
    bottom: 0;
    right: 0;
  }

  :host(.--size-l) .content,
  .--size-l .content {
    display: flex;
    height: calc(100% - 66px - 110px);
    align-items: center;
    padding-bottom: 0;
  }
`,Nt=(t,e,a,i=!1)=>{i&&console.log("[innerDOMLoaded]");const n=()=>{i&&console.log("[innerDOMLoaded.onFirstLoad]"),T(()=>{var $,x;t.style.visibility="",($=a==null?void 0:a.onFirstLoad)==null||$.call(a),(x=a==null?void 0:a.onLoad)==null||x.call(a)})},r=()=>{T(()=>{var $;($=a==null?void 0:a.onLoad)==null||$.call(a)})},o=()=>{i&&console.log("[innerDOMLoaded.onFullLoad]"),T(()=>{var $;t.style.visibility="",($=a==null?void 0:a.onFullLoad)==null||$.call(a)})},c=t.querySelectorAll(e.join(", "));if(c.length>0){i&&console.log("[innerDOMLoaded] HTML already there, done",c),a.onFullLoad||n(),o();return}a!=null&&a.alwaysVisible||(t.style.visibility="hidden");let h=!1;const u=$=>{for(const x of $)if(x.type==="childList"){const M=Array.from(x.addedNodes).filter(V=>{var ut;const N=(ut=V==null?void 0:V.tagName)==null?void 0:ut.toLowerCase();if(N&&e.includes(N))return!0});M.length&&(i&&console.log("[innerDOMLoaded.mutationCallback]",M),h?T(()=>r()):(h=!0,T(()=>n())))}},m=new MutationObserver(u);m.observe(t,{childList:!0,subtree:!0});const f=()=>{i&&console.log("[innerDOMLoaded::DOMContentLoaded]"),o(),m.disconnect(),removeEventListener("DOMContentLoaded",f)};addEventListener("DOMContentLoaded",f)},bt="currentBreakpoint";var Ks=Object.defineProperty,Zs=Object.getOwnPropertyDescriptor,Ia=(t,e,a,i)=>{for(var n=i>1?void 0:i?Zs(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&Ks(e,a,n),n};s.HeroSlide=class extends L{constructor(){super(...arguments),this.hasMechanic=!1}connectedCallback(){super.connectedCallback(),Nt(this,["adgm-mechanic"],{onFirstLoad:()=>this.initialize(),onFullLoad:()=>this.initialize()})}initialize(){this.hasMechanic=!!this.querySelector("adgm-mechanic")}render(){var e;return d`
      <slot></slot>
      <div
        class=${A({content:!0,"--has-mechanic":this.hasMechanic&&!!((e=this.currentBreakpoint)!=null&&e.state.m)})}
      >
        <adgm-container _dd>
          <slot name="content"></slot>
        </adgm-container>
      </div>
    `}},s.HeroSlide.styles=[qs,ur],Ia([O({context:bt,subscribe:!0}),l({attribute:!1})],s.HeroSlide.prototype,"currentBreakpoint",2),Ia([w()],s.HeroSlide.prototype,"hasMechanic",2),s.HeroSlide=Ia([b("adgm-hero-slide")],s.HeroSlide);const pr=g`
  :host {
    display: inline-block;
    text-shadow: none;
    position: relative;
  }

  :host([disabled]) {
    pointer-events: none;
  }

  :host([full-width]) {
    display: block;
  }

  adgm-text {
    line-height: 1.2;
    margin-top: -2px;
  }

  .button {
    border: 0;
    margin: 0;
    display: flex;
    cursor: pointer;
    user-select: none;
    white-space: normal;
    justify-content: center;
    align-items: center;
    text-decoration: none;
  }

  .button:focus-visible {
    outline: ${({theme:t})=>t.defaults.focusVisible};
  }

  /**
   * Primary - full
   */

  .button:not(.--outlined) {
    transition: ${({theme:t})=>`
      background-color ${t.defaults.transitionDuration} ${t.defaults.transitionEase},
      color .075s ${t.defaults.transitionEase}
    `};

    color: ${({theme:t})=>t.colors.white};
    background: ${({theme:t})=>t.colors.clearsky100};
  }
  .button:not(.--outlined):hover {
    background: ${({theme:t})=>t.colors.clearsky120};
  }
  .button:not(.--outlined):active {
    background: ${({theme:t})=>t.colors.clearsky140};
  }
  :host([disabled]) .button:not(.--outlined) {
    background: ${({theme:t})=>t.colors.black20};
  }

  /**
   * Secondary - full
   */

  .button:not(.--outlined).--variant-secondary {
    color: ${({theme:t})=>t.colors.black80};
    background: ${({theme:t})=>t.colors.white};
  }
  .button:not(.--outlined).--variant-secondary:hover {
    color: ${({theme:t})=>t.colors.black100};
    background: ${({theme:t})=>t.colors.steelgrey20};
  }
  .button:not(.--outlined).--variant-secondary:active {
    color: ${({theme:t})=>t.colors.black100};
    background: ${({theme:t})=>t.colors.steelgrey40};
  }
  :host([disabled]) .button:not(.--outlined).--variant-secondary {
    background: ${({theme:t})=>t.colors.white};
    color: ${({theme:t})=>t.colors.black20};
  }

  /**
   * Tertiary - full
   */

  .button:not(.--outlined).--variant-tertiary {
    color: ${({theme:t})=>t.colors.white};
    background: ${({theme:t})=>t.colors.clearsky140};
  }
  .button:not(.--outlined).--variant-tertiary:hover {
    background: ${({theme:t})=>t.colors.clearsky120};
  }
  .button:not(.--outlined).--variant-tertiary:active {
    background: ${({theme:t})=>t.colors.clearsky100};
  }
  :host([disabled]) .button:not(.--outlined).--variant-tertiary {
    color: ${({theme:t})=>t.colors.white};
    background: ${({theme:t})=>t.colors.black40};
  }

  /**
   * Primary - outlined
   */

  .button.--outlined {
    transition: ${({theme:t})=>`
      border-color ${t.defaults.transitionDuration} ${t.defaults.transitionEase},
      background-color ${t.defaults.transitionDuration} ${t.defaults.transitionEase},
      color .075s ${t.defaults.transitionEase}
    `};
    background: transparent;

    color: ${({theme:t})=>t.colors.foreground};
    border: 1px solid ${({theme:t})=>t.colors.foreground};
  }
  .button.--outlined:hover {
    color: ${({theme:t})=>t.colors.white};
    background: ${({theme:t})=>t.colors.foreground};
    border-color: ${({theme:t})=>t.colors.foreground};
  }
  .button.--outlined:active {
    color: ${({theme:t})=>t.colors.white};
    background: ${({theme:t})=>t.colors.black100};
    border-color: ${({theme:t})=>t.colors.black100};
  }
  :host([disabled]) .button.--outlined {
    color: ${({theme:t})=>t.colors.black20};
    background: transparent;
    border-color: ${({theme:t})=>t.colors.black20};
  }

  /**
   * Secondary - outlined
   */

  .button.--outlined.--variant-secondary {
    color: ${({theme:t})=>t.colors.white};
    border-color: ${({theme:t})=>t.colors.white};
  }
  .button.--outlined.--variant-secondary:hover {
    color: ${({theme:t})=>t.colors.foreground};
    background: ${({theme:t})=>t.colors.white};
    border-color: ${({theme:t})=>t.colors.white};
  }
  .button.--outlined.--variant-secondary:active {
    color: ${({theme:t})=>t.colors.black100};
    background: ${({theme:t})=>t.colors.steelgrey20};
    border-color: ${({theme:t})=>t.colors.steelgrey20};
  }
  :host([disabled]) .button.--outlined.--variant-secondary {
    color: ${({theme:t})=>t.colors.black20};
    background: ${({theme:t})=>t.colors.white};
    border-color: ${({theme:t})=>t.colors.white};
  }

  /**
   * Tertiary - outlined
   */

  .button.--outlined.--variant-tertiary {
    color: ${({theme:t})=>t.colors.clearsky100};
    border-color: ${({theme:t})=>t.colors.clearsky100};
  }
  .button.--outlined.--variant-tertiary:hover {
    color: ${({theme:t})=>t.colors.white};
    background: ${({theme:t})=>t.colors.clearsky100};
    border-color: ${({theme:t})=>t.colors.clearsky100};
  }
  .button.--outlined.--variant-tertiary:active {
    color: ${({theme:t})=>t.colors.white};
    background: ${({theme:t})=>t.colors.clearsky120};
    border-color: ${({theme:t})=>t.colors.clearsky120};
  }
  :host([disabled]) .button.--outlined.--variant-tertiary {
    color: ${({theme:t})=>t.colors.clearsky20};
    border-color: ${({theme:t})=>t.colors.clearsky20};
  }

  /**
   * Icon animation
   */

  .button.--anim:hover adgm-icon {
    animation: slide 0.6s;
  }

  @keyframes slide {
    0% {
      transform: translateX(0);
      opacity: 1;
    }
    50% {
      transform: translateX(100%);
      opacity: 0;
    }
    51% {
      transform: translateX(-75%);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }
`,Xs=g`
  .button {
    border-radius: 999px;
  }

  .button.--size-s {
    padding: 0 ${({theme:t})=>t.spacings.s24};
    gap: ${({theme:t})=>t.spacings.s8};
    height: ${v(40)};
  }
  .button.--size-m {
    padding: 0 ${({theme:t})=>t.spacings.s32};
    gap: ${({theme:t})=>t.spacings.s12};
    height: ${v(56)};
  }
`,He="form",gr="formIsLoading",mr="formRow";var Qs=Object.defineProperty,Js=Object.getOwnPropertyDescriptor,Et=(t,e,a,i)=>{for(var n=i>1?void 0:i?Js(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&Qs(e,a,n),n};s.Button=class extends E{constructor(){super(...arguments),this.variant="primary",this.size="m",this.disabled=!1,this.mirrorIcon=!1,this.type="button"}render(){const e=A({button:!0,[`--variant-${this.variant}`]:!0,[`--size-${this.size}`]:!0,"--outlined":!!this.outlined,"--anim":!!this.anim});return d`
      ${this.renderDebug("adgm-button",{description:this.size})}
      ${y(this.href,()=>d`
          <a
            href=${this.href}
            target=${Y(this.target)}
            class=${e}
          >
            ${this.renderContent()}
          </a>
        `,()=>d`
          <button
            ?disabled=${this.disabled}
            class=${e}
            type=${this.type}
            @click=${this.onClick}
          >
            ${this.renderContent()}
          </button>
        `)}
    `}renderContent(){return d`
      <slot name="pre"></slot>
      <adgm-text
        variant=${this.size==="m"?"textM":"textS"}
        align="center"
        weight="500"
        _dd
      >
        <slot></slot>
      </adgm-text>
      <slot name="post"></slot>
      <slot name="icon">
        ${y(this.icon,()=>d`
              <adgm-icon
                icon=${this.icon}
                ?mirror=${this.mirrorIcon}
                size=${this.size==="m"?"s32":"s24"}
                color=${this.outlined&&this.variant==="primary"||this.variant==="secondary"&&!this.outlined?"foreground":"white"}
                _dd
              />
            `)}
      </slot>
      ${y(this.formIsLoading,()=>d`
            <adgm-icon
              icon="loader"
              size=${this.size==="m"?"s32":"s24"}
              color=${this.outlined&&this.variant==="primary"||this.variant==="secondary"&&!this.outlined?"foreground":"white"}
              _dd
            />
          `)}
      </slot>
    `}onClick(e){var a;return e.preventDefault(),this.type==="submit"&&((a=this.form)==null||a.submit()),!1}},s.Button.styles=[_,pr,Xs],Et([O({context:He}),l({attribute:!1})],s.Button.prototype,"form",2),Et([O({context:gr,subscribe:!0}),l({attribute:!1})],s.Button.prototype,"formIsLoading",2),Et([l({type:String})],s.Button.prototype,"variant",2),Et([l({type:String})],s.Button.prototype,"size",2),Et([l({type:Boolean})],s.Button.prototype,"disabled",2),Et([l({type:Boolean})],s.Button.prototype,"outlined",2),Et([l({type:Boolean})],s.Button.prototype,"anim",2),Et([l({type:Boolean,attribute:"full-width"})],s.Button.prototype,"fullWidth",2),Et([l({type:String})],s.Button.prototype,"icon",2),Et([l({type:Boolean,attribute:"mirror-icon"})],s.Button.prototype,"mirrorIcon",2),Et([l({type:String})],s.Button.prototype,"href",2),Et([l({type:String})],s.Button.prototype,"target",2),Et([l({type:String})],s.Button.prototype,"type",2),s.Button=Et([b("adgm-button")],s.Button);const Fa=(t,e=":root")=>{const a=Object.values(t),i=Me(e,a.filter(r=>!sn(r.value)).map(r=>r.definition).join(" ")),n=a.filter(r=>sn(r.value)).map(r=>_i(r.variable,r.value,e).join(" ")).join(" ");return`${i} ${n}`},tl=g`
  :host {
    display: contents;
  }
`,ue="theme",el=g`
  html,
  body {
    scroll-behavior: smooth;
  }

  ${({theme:t})=>t.enclosedParse("adgm-body",{...t.typography.textS.properties,position:"relative"})}
  ${({theme:t})=>t.enclosedParse("adgm-body[variant=textL]",{...t.typography.textL.properties})}

  ${({theme:t})=>t.enclosedParse("adgm-body h1, adgm-body h2",{...t.typography.headingTwo.properties,margin:0,padding:`${t.spacings.rBodyL} 0 ${t.spacings.rBodyL} 0`})}

  ${({theme:t})=>t.enclosedParse("adgm-body h3",{...t.typography.textXL.properties,fontWeight:600,margin:0,padding:`${t.spacings.rBodyS} 0 ${t.spacings.rBodyM} 0`})}

  ${({theme:t})=>t.enclosedParse("adgm-body h4",{...t.typography.textM.properties,fontWeight:600,margin:0,padding:`${t.spacings.rBodyXS}  0 ${t.spacings.rBodyS} 0`})}
  ${({theme:t})=>t.enclosedParse("adgm-body[variant=textL] h4",{...t.typography.textL.properties,fontWeight:600,margin:0,padding:`${t.spacings.rBodyXS}  0 ${t.spacings.rBodyS} 0`})}

  ${({theme:t})=>t.enclosedParse("adgm-body h5",{...t.typography.textS.properties,fontWeight:500,margin:0,fontStyle:"italic",padding:`${t.spacings.rBodyXS}  0 ${t.spacings.rBodyS} 0`})}
  ${({theme:t})=>t.enclosedParse("adgm-body[variant=textL] h5",{...t.typography.textL.properties,fontWeight:500,margin:0,fontStyle:"italic",padding:`${t.spacings.rBodyXS}  0 ${t.spacings.rBodyS} 0`})}

  ${({theme:t})=>t.enclosedParse("adgm-body blockquote",{...t.typography.textL.properties,fontWeight:300,margin:0,fontStyle:"italic",padding:0,borderLeft:`2px solid ${t.colors.clearsky100}`,paddingLeft:t.spacings.s20})}

  adgm-body h1:first-child, adgm-body h2:first-child, adgm-body h3:first-child, adgm-body h4:first-child, adgm-body h5:first-child {
    padding-top: 0;
  }

  adgm-body p {
    margin: 0;
    padding: 0 0 ${({theme:t})=>t.spacings.rBodyS} 0;
  }
  adgm-table-cell p {
    margin: 0;
    padding: 0 0 ${v(14)} 0;
  }
  adgm-body p:last-child,
  adgm-table-cell p:last-child {
    padding: 0;
  }
  adgm-body ol,
  adgm-table-cell ol,
  adgm-body ul,
  adgm-table-cell ul {
    margin: 0;
    padding: ${({theme:t})=>`0 0 ${t.spacings.rBodyM} 0`};
  }

  adgm-body ol:last-child,
  adgm-table-cell ol:last-child,
  adgm-body ul:last-child,
  adgm-table-cell ul:last-child {
    padding: 0;
  }

  adgm-body li,
  adgm-table-cell li {
    position: relative;
    padding: 0;
  }
  adgm-body li::before,
  adgm-table-cell li::before {
    position: absolute;
  }

  adgm-body ol,
  adgm-table-cell ol {
    list-style: none;
    counter-reset: alpha;
  }
  adgm-body ol > li,
  adgm-table-cell ol > li {
    counter-increment: alpha;
    margin: ${({theme:t})=>`0 0 0 ${t.spacings.s32}`};
  }
  adgm-body ol > li::before,
  adgm-table-cell ol > li::before {
    content: counter(alpha, lower-alpha) ")";
    font-weight: 500;
    left: calc(${({theme:t})=>t.spacings.s32} * -1);
  }

  adgm-body ol[type="1"],
  adgm-table-cell ol[type="1"] {
    counter-reset: count;
  }
  adgm-body ol[type="1"] > li,
  adgm-table-cell ol[type="1"] > li {
    counter-increment: count;
  }
  adgm-body ol[type="1"] > li::before,
  adgm-table-cell ol[type="1"] > li::before {
    content: counter(count, numeric) ".";
  }

  adgm-body ul,
  adgm-table-cell ul {
    list-style: none;
    margin: ${({theme:t})=>`0 0 0 ${t.spacings.s16}`};
  }
  adgm-body ul > li::before,
  adgm-table-cell ul > li::before {
    content: "•";
    left: calc(${({theme:t})=>t.spacings.s16} * -1);
  }

  adgm-questionaire a[href],
  adgm-text a[href],
  adgm-table-cell a[href],
  adgm-body a[href] {
    color: var(--anchor-color, ${({theme:t})=>t.colors.clearsky100});
    font-weight: 600;
    text-decoration: var(--anchor-decoration, none);
    text-underline-position: under;
  }
  adgm-table-cell a[href] {
    font-weight: 600;
  }
  adgm-questionaire a[href]:hover,
  adgm-text a[href]:hover,
  adgm-table-cell a[href]:hover,
  adgm-body a[href]:hover {
    text-decoration: underline;
  }
  adgm-text a[href]:focus-visible,
  adgm-table-cell a[href]:focus-visible,
  adgm-body a[href]:focus-visible {
    outline: 2px solid ${({theme:t})=>t.colors.clearsky40};
    border-radius: 2px;
  }
  adgm-body strong,
  adgm-body b,
  adgm-table-cell b,
  adgm-table-cell strong,
  adgm-text strong,
  adgm-text b {
    font-weight: 600;
  }
  adgm-body em,
  adgm-table-cell em,
  adgm-body i,
  adgm-table-cell i,
  adgm-text em,
  adgm-text i {
    font-style: italic;
  }
  adgm-body hr {
    border: 0;
    display: block;
    height: 1px;
    overflow: hidden;
    background-color: ${({theme:t})=>t.colors.black40};
    margin: ${({theme:t})=>t.spacings.rBodyL} 0;
  }

  adgm-filter-provider .date-range {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: ${({theme:t})=>t.spacings.s8};
  }

  adgm-banner a[href],
  adgm-banner adgm-text a[href] {
    color: ${({theme:t})=>t.colors.white};
    text-decoration: underline;
  }
  adgm-banner[variant="secondary"] a[href],
  adgm-banner[variant="secondary"] adgm-text a[href],
  adgm-banner[variant="tertiary"] a[href],
  adgm-banner[variant="tertiary"] adgm-text a[href] {
    color: inherit;
  }
`,nl=g`
  :host {
    display: contents;
  }

  ::slotted(form) {
    display: flex;
    flex-direction: column;
    gap: ${({theme:t})=>t.spacings.s24};
    position: relative;
  }
`,al=g`
  ${({theme:t})=>t.enclosedParse("adgm-native-form .form-label",{...t.typography.textS.properties,fontWeight:500})}

  adgm-native-form .form-label {
    user-select: none;
    color: ${({theme:t})=>t.colors.foreground};
  }

  adgm-native-form .form-row {
    display: flex;
    flex-direction: column;
    position: relative;
    gap: ${({theme:t})=>t.spacings.s8};
  }

  ${({theme:t})=>t.enclosedParse("adgm-native-form button",{...t.typography.textM.properties})}

  adgm-native-form button {
    border: 0;
    margin: 0;
    display: flex;
    cursor: pointer;
    user-select: none;
    white-space: nowrap;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    border-radius: 999px;
    transition: ${({theme:t})=>`background-color ${t.defaults.transitionDuration} ${t.defaults.transitionEase}`};
    color: ${({theme:t})=>t.colors.white};
    background: ${({theme:t})=>t.colors.clearsky100};
    padding: 0 ${({theme:t})=>t.spacings.s32};
    gap: ${({theme:t})=>t.spacings.s12};
    height: ${v(56)};
  }
  adgm-native-form button:hover {
    background: ${({theme:t})=>t.colors.clearsky80};
  }
  adgm-native-form button:active {
    background: ${({theme:t})=>t.colors.clearsky60};
  }
  adgm-native-form button:focus-visible {
    outline: ${({theme:t})=>t.defaults.focusVisible};
  }

  ${({theme:t})=>t.enclosedParse("adgm-native-form input, adgm-native-form select",t.typography.textM.properties)}

  adgm-native-form
    input:not([type="checkbox"]):not([type="radio"])::placeholder {
    color: ${({theme:t})=>t.colors.black60};
    transition: ${({theme:t})=>`
      color ${t.defaults.transitionDuration} ${t.defaults.transitionEase}
    `};
  }

  adgm-native-form input:not([type="checkbox"]):not([type="radio"]),
  adgm-native-form select {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 1px;
    outline: 1px solid transparent;
    position: relative;
    transition: ${({theme:t})=>`
      outline-color ${t.defaults.transitionDuration} ${t.defaults.transitionEase},
      border-color ${t.defaults.transitionDuration} ${t.defaults.transitionEase}
    `};
    z-index: var(--z-index);
    min-height: ${v(56)};
    border: 1px solid ${({theme:t})=>t.colors.black20};
    border-radius: 1px;
    background: ${({theme:t})=>t.colors.white};
    padding: 0 ${({theme:t})=>t.spacings.s16};
    transition: ${({theme:t})=>`
      border-color ${t.defaults.transitionDuration} ${t.defaults.transitionEase}
    `};
  }

  adgm-native-form input:not([type="checkbox"]):not([type="radio"]):hover,
  adgm-native-form select:hover,
  adgm-native-form input:not([type="checkbox"]):not([type="radio"]):focus,
  adgm-native-form select:focus {
    border-color: ${({theme:t})=>t.colors.clearsky60};
    outline-color: ${({theme:t})=>t.colors.clearsky60};
  }

  adgm-native-form .form-checkbox {
    display: block;
    position: relative;
  }
  adgm-native-form .form-checkbox input[type="checkbox"] {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
  }

  adgm-native-form
    .form-checkbox
    input[type="checkbox"]
    + .form-checkbox-label {
    position: relative;
    flex-shrink: 0;
    width: ${v(16)};
    height: ${v(16)};
    background: ${({theme:t})=>t.colors.white};
    border-radius: 1px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: ${({theme:t})=>`
      border-color ${t.defaults.transitionDuration} ${t.defaults.transitionEase},
      outline-color ${t.defaults.transitionDuration} ${t.defaults.transitionEase}
    `};
    box-sizing: border-box;
    border: 1px solid ${({theme:t})=>t.colors.black40};
    outline: 1px solid transparent;
  }

  .form-checkbox-label::after {
    width: ${v(8)};
    height: ${v(8)};
    background: transpartent;
    content: "";
    position: absolute;
    border-radius: 1px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: ${({theme:t})=>`
      background-color ${t.defaults.transitionDuration} ${t.defaults.transitionEase}
    `};
  }

  adgm-native-form
    .form-checkbox
    input[type="checkbox"]:checked
    + .form-checkbox-label::after {
    background-color: ${({theme:t})=>t.colors.clearsky80};
  }
`,vr="iconPath";var il=Object.defineProperty,rl=Object.getOwnPropertyDescriptor,be=(t,e,a,i)=>{for(var n=i>1?void 0:i?rl(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&il(e,a,n),n};const fr="__adgm-global";s.Application=class extends L{constructor(){super(...arguments),this.theme=qt,this.currentBreakpoint=qt.getCurrentBreakpoint(),this.isDebugMode=!1,this.iconPath="/images/icons",this.fontPath="/adgm-components/fonts",this.debug=!1,this.onResize=()=>{this.setAppHeight(),this.updateBreakpoints()},this.updateBreakpoints=()=>{this.currentBreakpoint=qt.getCurrentBreakpoint()}}connectedCallback(){if(super.connectedCallback(),this.onResize(),window.addEventListener("resize",De(this.onResize,100)),new Si(function(i){i.activeElement.tagName!=="BODY"&&window.dispatchEvent(new CustomEvent("adgm-focus",{detail:{activeElement:i.activeElement,activeRoot:i.activeRoot,activeHost:i.activeHost}}))}).observe(),!(!document||document.getElementById(fr))){const a=document.head||document.getElementsByTagName("head")[0],i=document.createElement("style"),n=[Fa(qt.colors),Fa(qt.spacings),Fa(qt.defaults),qt.fonts.gilroy.import(this.fontPath),el.cssText,al.cssText];i.setAttribute("id",fr),i.textContent=n.join(" "),a.appendChild(i)}T(()=>this.onResize())}setAppHeight(){this.style.setProperty("--app-height",window!=null&&window.innerHeight?`${window==null?void 0:window.innerHeight}px`:"inherit")}updated(){this.isDebugMode=this.debug}render(){return this.isDebugMode=this.debug,this.debug||this.isDebugMode?d`
        <adgm-breakpoint-helper></adgm-breakpoint-helper>
        <slot></slot>
      `:d`<slot></slot>`}},s.Application.styles=tl,be([vt({context:ue}),l({attribute:!1})],s.Application.prototype,"theme",2),be([vt({context:bt}),l({attribute:!1})],s.Application.prototype,"currentBreakpoint",2),be([vt({context:Rn}),l({attribute:!1})],s.Application.prototype,"isDebugMode",2),be([vt({context:vr}),l({type:String,attribute:"icon-path"})],s.Application.prototype,"iconPath",2),be([l({type:String,attribute:"font-path"})],s.Application.prototype,"fontPath",2),be([l({type:Boolean})],s.Application.prototype,"debug",2),s.Application=be([b("adgm-application")],s.Application);const ol=g`
  :host {
    display: contents;
  }

  ${({theme:t})=>Object.entries(t.breakpoints).map(([e])=>t.enclosedParse(`:host([show=${e}])`,{display:p({base:"none",[e]:"contents"})})).join("")}}

  ${({theme:t})=>Object.entries(t.breakpoints).map(([e])=>t.enclosedParse(`:host([hide=${e}])`,{display:p({base:"contents",[e]:"none"})})).join("")}}
`;var sl=Object.defineProperty,ll=Object.getOwnPropertyDescriptor,za=(t,e,a,i)=>{for(var n=i>1?void 0:i?ll(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&sl(e,a,n),n};s.Break=class extends L{render(){return d`<slot></slot>`}},s.Break.styles=[ol],za([l({type:String})],s.Break.prototype,"hide",2),za([l({type:String})],s.Break.prototype,"show",2),s.Break=za([b("adgm-visibility")],s.Break);const cl=g`
  :host {
    display: block;
  }

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  adgm-text {
    color: ${({theme:t})=>t.colors.clearsky100};
  }

  adgm-icon {
    color: ${({theme:t})=>t.colors.clearsky100};
    --icon-fill: ${({theme:t})=>t.colors.clearsky100};
    width: ${v(38)};
    height: ${v(38)};
  }

  adgm-link-button {
    transition: ${({theme:t})=>`background-color ${t.defaults.transitionDuration} ${t.defaults.transitionEase}`};
    margin: ${v(4)};
    height: ${v(30)};
    min-width: ${v(30)};
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 1px;
    cursor: pointer;
  }

  adgm-link-button:not(.current):hover {
    background-color: ${({theme:t})=>t.colors.coolglass40};
  }

  adgm-link-button.--current {
    background-color: ${({theme:t})=>t.colors.coolglass40};
    color: ${({theme:t})=>t.colors.black100} !important;
    pointer-events: none;
  }
`;var dl=Object.defineProperty,hl=Object.getOwnPropertyDescriptor,$e=(t,e,a,i)=>{for(var n=i>1?void 0:i?hl(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&dl(e,a,n),n};s.Pagination=class extends L{constructor(){super(...arguments),this.totalItems=100,this.itemsPerPage=10,this.linkTemplate="",this.currentPage=1,this.siblings=2,this.async=!1}render(){const e=Math.ceil(this.totalItems/this.itemsPerPage);if(e<=1)return;const a=this.currentPage>1,i=this.currentPage<e,n=this.getItems(e);return d`
      <slot></slot>
      <div class="container">
        ${y(a,()=>this.renderPreviousLink())}
        ${n.map(r=>{switch(r.type){case"ellipsis":return this.renderEllipsis();case"page":return this.renderPageLink(r.page??1);default:return}})}
        ${y(i,()=>this.renderNextLink())}
      </div>
    `}getPage(){return this.currentPage}getItems(e){const a=[];if(e<=this.siblings*2)for(let i=1;i<=e;i++)a.push({type:"page",page:i});else{const i=Math.max(2,this.currentPage-this.siblings),n=Math.min(e-1,this.currentPage+this.siblings);a.push({type:"page",page:1}),i>2&&a.push({type:"ellipsis"});for(let r=i;r<=n;r++)a.push({type:"page",page:r});n<e-1&&a.push({type:"ellipsis"}),a.push({type:"page",page:e})}return a}renderPageLink(e){return d`
      <adgm-link-button
        variant=${this.currentPage===e?"primary":"secondary"}
        size="s"
        href=${this.getLink(e)}
        @click=${a=>{this.onPageChange(e),!(this.linkTemplate&&!this.async)&&a.preventDefault()}}
        class=${A({"--current":this.currentPage===e})}
        _dd
      >
        ${e}
      </adgm-link-button>
    `}renderPreviousLink(){return d`
      <a
        href=${this.getLink(this.currentPage-1)}
        @click=${e=>{this.onPageChange(this.currentPage-1),!(this.linkTemplate&&!this.async)&&e.preventDefault()}}
      >
        <adgm-icon icon="chevronRightM" mirror _dd></adgm-icon>
      </a>
    `}renderNextLink(){return d`
      <a
        href=${this.getLink(this.currentPage+1)}
        @click=${e=>{this.onPageChange(this.currentPage+1),!(this.linkTemplate&&!this.async)&&e.preventDefault()}}
      >
        <adgm-icon icon="chevronRightM" _dd></adgm-icon>
      </a>
    `}renderEllipsis(){return d`<adgm-text variant="textS" _dd>&nbsp;…&nbsp;</adgm-text>`}getLink(e){return this.linkTemplate?this.linkTemplate.replace("{page}",e.toString()):"#"}onPageChange(e){this.currentPage=e,this.dispatchEvent(new CustomEvent("change",{detail:{page:e},bubbles:!0,composed:!0}))}},s.Pagination.styles=[_,cl],$e([l({type:Number,attribute:"total-items"})],s.Pagination.prototype,"totalItems",2),$e([l({type:String,attribute:"items-per-page"})],s.Pagination.prototype,"itemsPerPage",2),$e([l({type:String,attribute:"link-template"})],s.Pagination.prototype,"linkTemplate",2),$e([l({type:Number,attribute:"current-page"})],s.Pagination.prototype,"currentPage",2),$e([l({type:Number})],s.Pagination.prototype,"siblings",2),$e([l({type:Boolean})],s.Pagination.prototype,"async",2),s.Pagination=$e([b("adgm-pagination")],s.Pagination);const Ha={ab:{name:"Abkhaz",nativeName:"аҧсуа"},aa:{name:"Afar",nativeName:"Afaraf"},af:{name:"Afrikaans",nativeName:"Afrikaans"},ak:{name:"Akan",nativeName:"Akan"},sq:{name:"Albanian",nativeName:"Shqip"},am:{name:"Amharic",nativeName:"አማርኛ"},ar:{name:"Arabic",nativeName:"العربية"},an:{name:"Aragonese",nativeName:"Aragonés"},hy:{name:"Armenian",nativeName:"Հայերեն"},as:{name:"Assamese",nativeName:"অসমীয়া"},av:{name:"Avaric",nativeName:"авар мацӀ, магӀарул мацӀ"},ae:{name:"Avestan",nativeName:"avesta"},ay:{name:"Aymara",nativeName:"aymar aru"},az:{name:"Azerbaijani",nativeName:"azərbaycan dili"},bm:{name:"Bambara",nativeName:"bamanankan"},ba:{name:"Bashkir",nativeName:"башҡорт теле"},eu:{name:"Basque",nativeName:"euskara, euskera"},be:{name:"Belarusian",nativeName:"Беларуская"},bn:{name:"Bengali",nativeName:"বাংলা"},bh:{name:"Bihari",nativeName:"भोजपुरी"},bi:{name:"Bislama",nativeName:"Bislama"},bs:{name:"Bosnian",nativeName:"bosanski jezik"},br:{name:"Breton",nativeName:"brezhoneg"},bg:{name:"Bulgarian",nativeName:"български език"},my:{name:"Burmese",nativeName:"ဗမာစာ"},ca:{name:"Catalan; Valencian",nativeName:"Català"},ch:{name:"Chamorro",nativeName:"Chamoru"},ce:{name:"Chechen",nativeName:"нохчийн мотт"},ny:{name:"Chichewa; Chewa; Nyanja",nativeName:"chiCheŵa, chinyanja"},zh:{name:"Chinese",nativeName:"中文 (Zhōngwén), 汉语, 漢語"},cv:{name:"Chuvash",nativeName:"чӑваш чӗлхи"},kw:{name:"Cornish",nativeName:"Kernewek"},co:{name:"Corsican",nativeName:"corsu, lingua corsa"},cr:{name:"Cree",nativeName:"ᓀᐦᐃᔭᐍᐏᐣ"},hr:{name:"Croatian",nativeName:"hrvatski"},cs:{name:"Czech",nativeName:"česky, čeština"},da:{name:"Danish",nativeName:"dansk"},dv:{name:"Divehi; Dhivehi; Maldivian;",nativeName:"ދިވެހި"},nl:{name:"Dutch",nativeName:"Nederlands, Vlaams"},en:{name:"English",nativeName:"English"},eo:{name:"Esperanto",nativeName:"Esperanto"},et:{name:"Estonian",nativeName:"eesti, eesti keel"},ee:{name:"Ewe",nativeName:"Eʋegbe"},fo:{name:"Faroese",nativeName:"føroyskt"},fj:{name:"Fijian",nativeName:"vosa Vakaviti"},fi:{name:"Finnish",nativeName:"suomi, suomen kieli"},fr:{name:"French",nativeName:"français, langue française"},ff:{name:"Fula; Fulah; Pulaar; Pular",nativeName:"Fulfulde, Pulaar, Pular"},gl:{name:"Galician",nativeName:"Galego"},ka:{name:"Georgian",nativeName:"ქართული"},de:{name:"German",nativeName:"Deutsch"},el:{name:"Greek, Modern",nativeName:"Ελληνικά"},gn:{name:"Guaraní",nativeName:"Avañeẽ"},gu:{name:"Gujarati",nativeName:"ગુજરાતી"},ht:{name:"Haitian; Haitian Creole",nativeName:"Kreyòl ayisyen"},ha:{name:"Hausa",nativeName:"Hausa, هَوُسَ"},he:{name:"Hebrew (modern)",nativeName:"עברית"},hz:{name:"Herero",nativeName:"Otjiherero"},hi:{name:"Hindi",nativeName:"हिन्दी, हिंदी"},ho:{name:"Hiri Motu",nativeName:"Hiri Motu"},hu:{name:"Hungarian",nativeName:"Magyar"},ia:{name:"Interlingua",nativeName:"Interlingua"},id:{name:"Indonesian",nativeName:"Bahasa Indonesia"},ie:{name:"Interlingue",nativeName:"Originally called Occidental; then Interlingue after WWII"},ga:{name:"Irish",nativeName:"Gaeilge"},ig:{name:"Igbo",nativeName:"Asụsụ Igbo"},ik:{name:"Inupiaq",nativeName:"Iñupiaq, Iñupiatun"},io:{name:"Ido",nativeName:"Ido"},is:{name:"Icelandic",nativeName:"Íslenska"},it:{name:"Italian",nativeName:"Italiano"},iu:{name:"Inuktitut",nativeName:"ᐃᓄᒃᑎᑐᑦ"},ja:{name:"Japanese",nativeName:"日本語 (にほんご／にっぽんご)"},jv:{name:"Javanese",nativeName:"basa Jawa"},kl:{name:"Kalaallisut, Greenlandic",nativeName:"kalaallisut, kalaallit oqaasii"},kn:{name:"Kannada",nativeName:"ಕನ್ನಡ"},kr:{name:"Kanuri",nativeName:"Kanuri"},ks:{name:"Kashmiri",nativeName:"कश्मीरी, كشميري"},kk:{name:"Kazakh",nativeName:"Қазақ тілі"},km:{name:"Khmer",nativeName:"ភាសាខ្មែរ"},ki:{name:"Kikuyu, Gikuyu",nativeName:"Gĩkũyũ"},rw:{name:"Kinyarwanda",nativeName:"Ikinyarwanda"},ky:{name:"Kirghiz, Kyrgyz",nativeName:"кыргыз тили"},kv:{name:"Komi",nativeName:"коми кыв"},kg:{name:"Kongo",nativeName:"KiKongo"},ko:{name:"Korean",nativeName:"한국어 (韓國語), 조선말 (朝鮮語)"},ku:{name:"Kurdish",nativeName:"Kurdî, كوردی"},kj:{name:"Kwanyama, Kuanyama",nativeName:"Kuanyama"},la:{name:"Latin",nativeName:"latine, lingua latina"},lb:{name:"Luxembourgish, Letzeburgesch",nativeName:"Lëtzebuergesch"},lg:{name:"Luganda",nativeName:"Luganda"},li:{name:"Limburgish, Limburgan, Limburger",nativeName:"Limburgs"},ln:{name:"Lingala",nativeName:"Lingála"},lo:{name:"Lao",nativeName:"ພາສາລາວ"},lt:{name:"Lithuanian",nativeName:"lietuvių kalba"},lu:{name:"Luba-Katanga",nativeName:""},lv:{name:"Latvian",nativeName:"latviešu valoda"},gv:{name:"Manx",nativeName:"Gaelg, Gailck"},mk:{name:"Macedonian",nativeName:"македонски јазик"},mg:{name:"Malagasy",nativeName:"Malagasy fiteny"},ms:{name:"Malay",nativeName:"bahasa Melayu, بهاس ملايو"},ml:{name:"Malayalam",nativeName:"മലയാളം"},mt:{name:"Maltese",nativeName:"Malti"},mi:{name:"Māori",nativeName:"te reo Māori"},mr:{name:"Marathi (Marāṭhī)",nativeName:"मराठी"},mh:{name:"Marshallese",nativeName:"Kajin M̧ajeļ"},mn:{name:"Mongolian",nativeName:"монгол"},na:{name:"Nauru",nativeName:"Ekakairũ Naoero"},nv:{name:"Navajo, Navaho",nativeName:"Diné bizaad, Dinékʼehǰí"},nb:{name:"Norwegian Bokmål",nativeName:"Norsk bokmål"},nd:{name:"North Ndebele",nativeName:"isiNdebele"},ne:{name:"Nepali",nativeName:"नेपाली"},ng:{name:"Ndonga",nativeName:"Owambo"},nn:{name:"Norwegian Nynorsk",nativeName:"Norsk nynorsk"},no:{name:"Norwegian",nativeName:"Norsk"},ii:{name:"Nuosu",nativeName:"ꆈꌠ꒿ Nuosuhxop"},nr:{name:"South Ndebele",nativeName:"isiNdebele"},oc:{name:"Occitan",nativeName:"Occitan"},oj:{name:"Ojibwe, Ojibwa",nativeName:"ᐊᓂᔑᓈᐯᒧᐎᓐ"},cu:{name:"Old Church Slavonic, Church Slavic, Church Slavonic, Old Bulgarian, Old Slavonic",nativeName:"ѩзыкъ словѣньскъ"},om:{name:"Oromo",nativeName:"Afaan Oromoo"},or:{name:"Oriya",nativeName:"ଓଡ଼ିଆ"},os:{name:"Ossetian, Ossetic",nativeName:"ирон æвзаг"},pa:{name:"Panjabi, Punjabi",nativeName:"ਪੰਜਾਬੀ, پنجابی"},pi:{name:"Pāli",nativeName:"पाऴि"},fa:{name:"Persian",nativeName:"فارسی"},pl:{name:"Polish",nativeName:"polski"},ps:{name:"Pashto, Pushto",nativeName:"پښتو"},pt:{name:"Portuguese",nativeName:"Português"},qu:{name:"Quechua",nativeName:"Runa Simi, Kichwa"},rm:{name:"Romansh",nativeName:"rumantsch grischun"},rn:{name:"Kirundi",nativeName:"kiRundi"},ro:{name:"Romanian, Moldavian, Moldovan",nativeName:"română"},ru:{name:"Russian",nativeName:"русский язык"},sa:{name:"Sanskrit (Saṁskṛta)",nativeName:"संस्कृतम्"},sc:{name:"Sardinian",nativeName:"sardu"},sd:{name:"Sindhi",nativeName:"सिन्धी, سنڌي، سندھی"},se:{name:"Northern Sami",nativeName:"Davvisámegiella"},sm:{name:"Samoan",nativeName:"gagana faa Samoa"},sg:{name:"Sango",nativeName:"yângâ tî sängö"},sr:{name:"Serbian",nativeName:"српски језик"},gd:{name:"Scottish Gaelic; Gaelic",nativeName:"Gàidhlig"},sn:{name:"Shona",nativeName:"chiShona"},si:{name:"Sinhala, Sinhalese",nativeName:"සිංහල"},sk:{name:"Slovak",nativeName:"slovenčina"},sl:{name:"Slovene",nativeName:"slovenščina"},so:{name:"Somali",nativeName:"Soomaaliga, af Soomaali"},st:{name:"Southern Sotho",nativeName:"Sesotho"},es:{name:"Spanish; Castilian",nativeName:"español, castellano"},su:{name:"Sundanese",nativeName:"Basa Sunda"},sw:{name:"Swahili",nativeName:"Kiswahili"},ss:{name:"Swati",nativeName:"SiSwati"},sv:{name:"Swedish",nativeName:"svenska"},ta:{name:"Tamil",nativeName:"தமிழ்"},te:{name:"Telugu",nativeName:"తెలుగు"},tg:{name:"Tajik",nativeName:"тоҷикӣ, toğikī, تاجیکی"},th:{name:"Thai",nativeName:"ไทย"},ti:{name:"Tigrinya",nativeName:"ትግርኛ"},bo:{name:"Tibetan Standard, Tibetan, Central",nativeName:"བོད་ཡིག"},tk:{name:"Turkmen",nativeName:"Türkmen, Түркмен"},tl:{name:"Tagalog",nativeName:"Wikang Tagalog, ᜏᜒᜃᜅ᜔ ᜆᜄᜎᜓᜄ᜔"},tn:{name:"Tswana",nativeName:"Setswana"},to:{name:"Tonga (Tonga Islands)",nativeName:"faka Tonga"},tr:{name:"Turkish",nativeName:"Türkçe"},ts:{name:"Tsonga",nativeName:"Xitsonga"},tt:{name:"Tatar",nativeName:"татарча, tatarça, تاتارچا"},tw:{name:"Twi",nativeName:"Twi"},ty:{name:"Tahitian",nativeName:"Reo Tahiti"},ug:{name:"Uighur, Uyghur",nativeName:"Uyƣurqə, ئۇيغۇرچە"},uk:{name:"Ukrainian",nativeName:"українська"},ur:{name:"Urdu",nativeName:"اردو"},uz:{name:"Uzbek",nativeName:"zbek, Ўзбек, أۇزبېك"},ve:{name:"Venda",nativeName:"Tshivenḓa"},vi:{name:"Vietnamese",nativeName:"Tiếng Việt"},vo:{name:"Volapük",nativeName:"Volapük"},wa:{name:"Walloon",nativeName:"Walon"},cy:{name:"Welsh",nativeName:"Cymraeg"},wo:{name:"Wolof",nativeName:"Wollof"},fy:{name:"Western Frisian",nativeName:"Frysk"},xh:{name:"Xhosa",nativeName:"isiXhosa"},yi:{name:"Yiddish",nativeName:"ייִדיש"},yo:{name:"Yoruba",nativeName:"Yorùbá"},za:{name:"Zhuang, Chuang",nativeName:"Saɯ cueŋƅ, Saw cuengh"}};/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const yr=(t,e,a)=>{for(const i of e)if(i[0]===t)return(0,i[1])();return a==null?void 0:a()},ul=g`
  :host {
    display: block;
    position: relative;
  }
`;function ae(t){"@babel/helpers - typeof";return ae=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e){return typeof e}:function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},ae(t)}function at(t){if(t===null||t===!0||t===!1)return NaN;var e=Number(t);return isNaN(e)?e:e<0?Math.ceil(e):Math.floor(e)}function R(t,e){if(e.length<t)throw new TypeError(t+" argument"+(t>1?"s":"")+" required, but only "+e.length+" present")}function Z(t){R(1,arguments);var e=Object.prototype.toString.call(t);return t instanceof Date||ae(t)==="object"&&e==="[object Date]"?new Date(t.getTime()):typeof t=="number"||e==="[object Number]"?new Date(t):((typeof t=="string"||e==="[object String]")&&typeof console<"u"&&(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments"),console.warn(new Error().stack)),new Date(NaN))}function pl(t,e){R(2,arguments);var a=Z(t),i=at(e);return isNaN(i)?new Date(NaN):(i&&a.setDate(a.getDate()+i),a)}function Ra(t,e){R(2,arguments);var a=Z(t),i=at(e);if(isNaN(i))return new Date(NaN);if(!i)return a;var n=a.getDate(),r=new Date(a.getTime());r.setMonth(a.getMonth()+i+1,0);var o=r.getDate();return n>=o?r:(a.setFullYear(r.getFullYear(),r.getMonth(),n),a)}function gl(t,e){R(2,arguments);var a=Z(t).getTime(),i=at(e);return new Date(a+i)}var ml={};function pe(){return ml}function vl(t,e){var a,i,n,r,o,c,h,u;R(1,arguments);var m=pe(),f=at((a=(i=(n=(r=e==null?void 0:e.weekStartsOn)!==null&&r!==void 0?r:e==null||(o=e.locale)===null||o===void 0||(c=o.options)===null||c===void 0?void 0:c.weekStartsOn)!==null&&n!==void 0?n:m.weekStartsOn)!==null&&i!==void 0?i:(h=m.locale)===null||h===void 0||(u=h.options)===null||u===void 0?void 0:u.weekStartsOn)!==null&&a!==void 0?a:0);if(!(f>=0&&f<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var $=Z(t),x=$.getDay(),M=(x<f?7:0)+x-f;return $.setDate($.getDate()-M),$.setHours(0,0,0,0),$}function br(t){var e=new Date(Date.UTC(t.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),t.getMinutes(),t.getSeconds(),t.getMilliseconds()));return e.setUTCFullYear(t.getFullYear()),t.getTime()-e.getTime()}function $r(t,e){R(2,arguments);var a=at(e);return Ra(t,a*12)}function jn(t,e){R(2,arguments);var a=Z(t),i=Z(e),n=a.getTime()-i.getTime();return n<0?-1:n>0?1:n}var Va=6e4,ja=36e5,fl=1e3;function yl(t){return R(1,arguments),t instanceof Date||ae(t)==="object"&&Object.prototype.toString.call(t)==="[object Date]"}function bl(t){if(R(1,arguments),!yl(t)&&typeof t!="number")return!1;var e=Z(t);return!isNaN(Number(e))}function $l(t){R(1,arguments);var e=Z(t),a=e.getMonth();return e.setFullYear(e.getFullYear(),a+1,0),e.setHours(23,59,59,999),e}function wl(t){R(1,arguments);var e=Z(t);return e.setDate(1),e.setHours(0,0,0,0),e}function Cl(t,e){var a,i,n,r,o,c,h,u;R(1,arguments);var m=pe(),f=at((a=(i=(n=(r=e==null?void 0:e.weekStartsOn)!==null&&r!==void 0?r:e==null||(o=e.locale)===null||o===void 0||(c=o.options)===null||c===void 0?void 0:c.weekStartsOn)!==null&&n!==void 0?n:m.weekStartsOn)!==null&&i!==void 0?i:(h=m.locale)===null||h===void 0||(u=h.options)===null||u===void 0?void 0:u.weekStartsOn)!==null&&a!==void 0?a:0);if(!(f>=0&&f<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var $=Z(t),x=$.getDay(),M=(x<f?-7:0)+6-(x-f);return $.setDate($.getDate()+M),$.setHours(23,59,59,999),$}function wr(t,e){R(2,arguments);var a=at(e);return gl(t,-a)}var Sl=864e5;function xl(t){R(1,arguments);var e=Z(t),a=e.getTime();e.setUTCMonth(0,1),e.setUTCHours(0,0,0,0);var i=e.getTime(),n=a-i;return Math.floor(n/Sl)+1}function Re(t){R(1,arguments);var e=1,a=Z(t),i=a.getUTCDay(),n=(i<e?7:0)+i-e;return a.setUTCDate(a.getUTCDate()-n),a.setUTCHours(0,0,0,0),a}function Cr(t){R(1,arguments);var e=Z(t),a=e.getUTCFullYear(),i=new Date(0);i.setUTCFullYear(a+1,0,4),i.setUTCHours(0,0,0,0);var n=Re(i),r=new Date(0);r.setUTCFullYear(a,0,4),r.setUTCHours(0,0,0,0);var o=Re(r);return e.getTime()>=n.getTime()?a+1:e.getTime()>=o.getTime()?a:a-1}function Pl(t){R(1,arguments);var e=Cr(t),a=new Date(0);a.setUTCFullYear(e,0,4),a.setUTCHours(0,0,0,0);var i=Re(a);return i}var kl=6048e5;function Sr(t){R(1,arguments);var e=Z(t),a=Re(e).getTime()-Pl(e).getTime();return Math.round(a/kl)+1}function we(t,e){var a,i,n,r,o,c,h,u;R(1,arguments);var m=pe(),f=at((a=(i=(n=(r=e==null?void 0:e.weekStartsOn)!==null&&r!==void 0?r:e==null||(o=e.locale)===null||o===void 0||(c=o.options)===null||c===void 0?void 0:c.weekStartsOn)!==null&&n!==void 0?n:m.weekStartsOn)!==null&&i!==void 0?i:(h=m.locale)===null||h===void 0||(u=h.options)===null||u===void 0?void 0:u.weekStartsOn)!==null&&a!==void 0?a:0);if(!(f>=0&&f<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var $=Z(t),x=$.getUTCDay(),M=(x<f?7:0)+x-f;return $.setUTCDate($.getUTCDate()-M),$.setUTCHours(0,0,0,0),$}function Ua(t,e){var a,i,n,r,o,c,h,u;R(1,arguments);var m=Z(t),f=m.getUTCFullYear(),$=pe(),x=at((a=(i=(n=(r=e==null?void 0:e.firstWeekContainsDate)!==null&&r!==void 0?r:e==null||(o=e.locale)===null||o===void 0||(c=o.options)===null||c===void 0?void 0:c.firstWeekContainsDate)!==null&&n!==void 0?n:$.firstWeekContainsDate)!==null&&i!==void 0?i:(h=$.locale)===null||h===void 0||(u=h.options)===null||u===void 0?void 0:u.firstWeekContainsDate)!==null&&a!==void 0?a:1);if(!(x>=1&&x<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var M=new Date(0);M.setUTCFullYear(f+1,0,x),M.setUTCHours(0,0,0,0);var V=we(M,e),N=new Date(0);N.setUTCFullYear(f,0,x),N.setUTCHours(0,0,0,0);var ut=we(N,e);return m.getTime()>=V.getTime()?f+1:m.getTime()>=ut.getTime()?f:f-1}function _l(t,e){var a,i,n,r,o,c,h,u;R(1,arguments);var m=pe(),f=at((a=(i=(n=(r=e==null?void 0:e.firstWeekContainsDate)!==null&&r!==void 0?r:e==null||(o=e.locale)===null||o===void 0||(c=o.options)===null||c===void 0?void 0:c.firstWeekContainsDate)!==null&&n!==void 0?n:m.firstWeekContainsDate)!==null&&i!==void 0?i:(h=m.locale)===null||h===void 0||(u=h.options)===null||u===void 0?void 0:u.firstWeekContainsDate)!==null&&a!==void 0?a:1),$=Ua(t,e),x=new Date(0);x.setUTCFullYear($,0,f),x.setUTCHours(0,0,0,0);var M=we(x,e);return M}var Ol=6048e5;function xr(t,e){R(1,arguments);var a=Z(t),i=we(a,e).getTime()-_l(a,e).getTime();return Math.round(i/Ol)+1}function U(t,e){for(var a=t<0?"-":"",i=Math.abs(t).toString();i.length<e;)i="0"+i;return a+i}var Ll={y:function(e,a){var i=e.getUTCFullYear(),n=i>0?i:1-i;return U(a==="yy"?n%100:n,a.length)},M:function(e,a){var i=e.getUTCMonth();return a==="M"?String(i+1):U(i+1,2)},d:function(e,a){return U(e.getUTCDate(),a.length)},a:function(e,a){var i=e.getUTCHours()/12>=1?"pm":"am";switch(a){case"a":case"aa":return i.toUpperCase();case"aaa":return i;case"aaaaa":return i[0];case"aaaa":default:return i==="am"?"a.m.":"p.m."}},h:function(e,a){return U(e.getUTCHours()%12||12,a.length)},H:function(e,a){return U(e.getUTCHours(),a.length)},m:function(e,a){return U(e.getUTCMinutes(),a.length)},s:function(e,a){return U(e.getUTCSeconds(),a.length)},S:function(e,a){var i=a.length,n=e.getUTCMilliseconds(),r=Math.floor(n*Math.pow(10,i-3));return U(r,a.length)}};const ge=Ll;var Ve={am:"am",pm:"pm",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},El={G:function(e,a,i){var n=e.getUTCFullYear()>0?1:0;switch(a){case"G":case"GG":case"GGG":return i.era(n,{width:"abbreviated"});case"GGGGG":return i.era(n,{width:"narrow"});case"GGGG":default:return i.era(n,{width:"wide"})}},y:function(e,a,i){if(a==="yo"){var n=e.getUTCFullYear(),r=n>0?n:1-n;return i.ordinalNumber(r,{unit:"year"})}return ge.y(e,a)},Y:function(e,a,i,n){var r=Ua(e,n),o=r>0?r:1-r;if(a==="YY"){var c=o%100;return U(c,2)}return a==="Yo"?i.ordinalNumber(o,{unit:"year"}):U(o,a.length)},R:function(e,a){var i=Cr(e);return U(i,a.length)},u:function(e,a){var i=e.getUTCFullYear();return U(i,a.length)},Q:function(e,a,i){var n=Math.ceil((e.getUTCMonth()+1)/3);switch(a){case"Q":return String(n);case"QQ":return U(n,2);case"Qo":return i.ordinalNumber(n,{unit:"quarter"});case"QQQ":return i.quarter(n,{width:"abbreviated",context:"formatting"});case"QQQQQ":return i.quarter(n,{width:"narrow",context:"formatting"});case"QQQQ":default:return i.quarter(n,{width:"wide",context:"formatting"})}},q:function(e,a,i){var n=Math.ceil((e.getUTCMonth()+1)/3);switch(a){case"q":return String(n);case"qq":return U(n,2);case"qo":return i.ordinalNumber(n,{unit:"quarter"});case"qqq":return i.quarter(n,{width:"abbreviated",context:"standalone"});case"qqqqq":return i.quarter(n,{width:"narrow",context:"standalone"});case"qqqq":default:return i.quarter(n,{width:"wide",context:"standalone"})}},M:function(e,a,i){var n=e.getUTCMonth();switch(a){case"M":case"MM":return ge.M(e,a);case"Mo":return i.ordinalNumber(n+1,{unit:"month"});case"MMM":return i.month(n,{width:"abbreviated",context:"formatting"});case"MMMMM":return i.month(n,{width:"narrow",context:"formatting"});case"MMMM":default:return i.month(n,{width:"wide",context:"formatting"})}},L:function(e,a,i){var n=e.getUTCMonth();switch(a){case"L":return String(n+1);case"LL":return U(n+1,2);case"Lo":return i.ordinalNumber(n+1,{unit:"month"});case"LLL":return i.month(n,{width:"abbreviated",context:"standalone"});case"LLLLL":return i.month(n,{width:"narrow",context:"standalone"});case"LLLL":default:return i.month(n,{width:"wide",context:"standalone"})}},w:function(e,a,i,n){var r=xr(e,n);return a==="wo"?i.ordinalNumber(r,{unit:"week"}):U(r,a.length)},I:function(e,a,i){var n=Sr(e);return a==="Io"?i.ordinalNumber(n,{unit:"week"}):U(n,a.length)},d:function(e,a,i){return a==="do"?i.ordinalNumber(e.getUTCDate(),{unit:"date"}):ge.d(e,a)},D:function(e,a,i){var n=xl(e);return a==="Do"?i.ordinalNumber(n,{unit:"dayOfYear"}):U(n,a.length)},E:function(e,a,i){var n=e.getUTCDay();switch(a){case"E":case"EE":case"EEE":return i.day(n,{width:"abbreviated",context:"formatting"});case"EEEEE":return i.day(n,{width:"narrow",context:"formatting"});case"EEEEEE":return i.day(n,{width:"short",context:"formatting"});case"EEEE":default:return i.day(n,{width:"wide",context:"formatting"})}},e:function(e,a,i,n){var r=e.getUTCDay(),o=(r-n.weekStartsOn+8)%7||7;switch(a){case"e":return String(o);case"ee":return U(o,2);case"eo":return i.ordinalNumber(o,{unit:"day"});case"eee":return i.day(r,{width:"abbreviated",context:"formatting"});case"eeeee":return i.day(r,{width:"narrow",context:"formatting"});case"eeeeee":return i.day(r,{width:"short",context:"formatting"});case"eeee":default:return i.day(r,{width:"wide",context:"formatting"})}},c:function(e,a,i,n){var r=e.getUTCDay(),o=(r-n.weekStartsOn+8)%7||7;switch(a){case"c":return String(o);case"cc":return U(o,a.length);case"co":return i.ordinalNumber(o,{unit:"day"});case"ccc":return i.day(r,{width:"abbreviated",context:"standalone"});case"ccccc":return i.day(r,{width:"narrow",context:"standalone"});case"cccccc":return i.day(r,{width:"short",context:"standalone"});case"cccc":default:return i.day(r,{width:"wide",context:"standalone"})}},i:function(e,a,i){var n=e.getUTCDay(),r=n===0?7:n;switch(a){case"i":return String(r);case"ii":return U(r,a.length);case"io":return i.ordinalNumber(r,{unit:"day"});case"iii":return i.day(n,{width:"abbreviated",context:"formatting"});case"iiiii":return i.day(n,{width:"narrow",context:"formatting"});case"iiiiii":return i.day(n,{width:"short",context:"formatting"});case"iiii":default:return i.day(n,{width:"wide",context:"formatting"})}},a:function(e,a,i){var n=e.getUTCHours(),r=n/12>=1?"pm":"am";switch(a){case"a":case"aa":return i.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"aaa":return i.dayPeriod(r,{width:"abbreviated",context:"formatting"}).toLowerCase();case"aaaaa":return i.dayPeriod(r,{width:"narrow",context:"formatting"});case"aaaa":default:return i.dayPeriod(r,{width:"wide",context:"formatting"})}},b:function(e,a,i){var n=e.getUTCHours(),r;switch(n===12?r=Ve.noon:n===0?r=Ve.midnight:r=n/12>=1?"pm":"am",a){case"b":case"bb":return i.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"bbb":return i.dayPeriod(r,{width:"abbreviated",context:"formatting"}).toLowerCase();case"bbbbb":return i.dayPeriod(r,{width:"narrow",context:"formatting"});case"bbbb":default:return i.dayPeriod(r,{width:"wide",context:"formatting"})}},B:function(e,a,i){var n=e.getUTCHours(),r;switch(n>=17?r=Ve.evening:n>=12?r=Ve.afternoon:n>=4?r=Ve.morning:r=Ve.night,a){case"B":case"BB":case"BBB":return i.dayPeriod(r,{width:"abbreviated",context:"formatting"});case"BBBBB":return i.dayPeriod(r,{width:"narrow",context:"formatting"});case"BBBB":default:return i.dayPeriod(r,{width:"wide",context:"formatting"})}},h:function(e,a,i){if(a==="ho"){var n=e.getUTCHours()%12;return n===0&&(n=12),i.ordinalNumber(n,{unit:"hour"})}return ge.h(e,a)},H:function(e,a,i){return a==="Ho"?i.ordinalNumber(e.getUTCHours(),{unit:"hour"}):ge.H(e,a)},K:function(e,a,i){var n=e.getUTCHours()%12;return a==="Ko"?i.ordinalNumber(n,{unit:"hour"}):U(n,a.length)},k:function(e,a,i){var n=e.getUTCHours();return n===0&&(n=24),a==="ko"?i.ordinalNumber(n,{unit:"hour"}):U(n,a.length)},m:function(e,a,i){return a==="mo"?i.ordinalNumber(e.getUTCMinutes(),{unit:"minute"}):ge.m(e,a)},s:function(e,a,i){return a==="so"?i.ordinalNumber(e.getUTCSeconds(),{unit:"second"}):ge.s(e,a)},S:function(e,a){return ge.S(e,a)},X:function(e,a,i,n){var r=n._originalDate||e,o=r.getTimezoneOffset();if(o===0)return"Z";switch(a){case"X":return kr(o);case"XXXX":case"XX":return Ce(o);case"XXXXX":case"XXX":default:return Ce(o,":")}},x:function(e,a,i,n){var r=n._originalDate||e,o=r.getTimezoneOffset();switch(a){case"x":return kr(o);case"xxxx":case"xx":return Ce(o);case"xxxxx":case"xxx":default:return Ce(o,":")}},O:function(e,a,i,n){var r=n._originalDate||e,o=r.getTimezoneOffset();switch(a){case"O":case"OO":case"OOO":return"GMT"+Pr(o,":");case"OOOO":default:return"GMT"+Ce(o,":")}},z:function(e,a,i,n){var r=n._originalDate||e,o=r.getTimezoneOffset();switch(a){case"z":case"zz":case"zzz":return"GMT"+Pr(o,":");case"zzzz":default:return"GMT"+Ce(o,":")}},t:function(e,a,i,n){var r=n._originalDate||e,o=Math.floor(r.getTime()/1e3);return U(o,a.length)},T:function(e,a,i,n){var r=n._originalDate||e,o=r.getTime();return U(o,a.length)}};function Pr(t,e){var a=t>0?"-":"+",i=Math.abs(t),n=Math.floor(i/60),r=i%60;if(r===0)return a+String(n);var o=e||"";return a+String(n)+o+U(r,2)}function kr(t,e){if(t%60===0){var a=t>0?"-":"+";return a+U(Math.abs(t)/60,2)}return Ce(t,e)}function Ce(t,e){var a=e||"",i=t>0?"-":"+",n=Math.abs(t),r=U(Math.floor(n/60),2),o=U(n%60,2);return i+r+a+o}const Dl=El;var _r=function(e,a){switch(e){case"P":return a.date({width:"short"});case"PP":return a.date({width:"medium"});case"PPP":return a.date({width:"long"});case"PPPP":default:return a.date({width:"full"})}},Or=function(e,a){switch(e){case"p":return a.time({width:"short"});case"pp":return a.time({width:"medium"});case"ppp":return a.time({width:"long"});case"pppp":default:return a.time({width:"full"})}},Ml=function(e,a){var i=e.match(/(P+)(p+)?/)||[],n=i[1],r=i[2];if(!r)return _r(e,a);var o;switch(n){case"P":o=a.dateTime({width:"short"});break;case"PP":o=a.dateTime({width:"medium"});break;case"PPP":o=a.dateTime({width:"long"});break;case"PPPP":default:o=a.dateTime({width:"full"});break}return o.replace("{{date}}",_r(n,a)).replace("{{time}}",Or(r,a))},Tl={p:Or,P:Ml};const Ga=Tl;var Al=["D","DD"],Nl=["YY","YYYY"];function Lr(t){return Al.indexOf(t)!==-1}function Er(t){return Nl.indexOf(t)!==-1}function Un(t,e,a){if(t==="YYYY")throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(e,"`) for formatting years to the input `").concat(a,"`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));if(t==="YY")throw new RangeError("Use `yy` instead of `YY` (in `".concat(e,"`) for formatting years to the input `").concat(a,"`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));if(t==="D")throw new RangeError("Use `d` instead of `D` (in `".concat(e,"`) for formatting days of the month to the input `").concat(a,"`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));if(t==="DD")throw new RangeError("Use `dd` instead of `DD` (in `".concat(e,"`) for formatting days of the month to the input `").concat(a,"`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"))}var Bl={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}},Il=function(e,a,i){var n,r=Bl[e];return typeof r=="string"?n=r:a===1?n=r.one:n=r.other.replace("{{count}}",a.toString()),i!=null&&i.addSuffix?i.comparison&&i.comparison>0?"in "+n:n+" ago":n};const Fl=Il;function Wa(t){return function(){var e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},a=e.width?String(e.width):t.defaultWidth,i=t.formats[a]||t.formats[t.defaultWidth];return i}}var zl={full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},Hl={full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},Rl={full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},Vl={date:Wa({formats:zl,defaultWidth:"full"}),time:Wa({formats:Hl,defaultWidth:"full"}),dateTime:Wa({formats:Rl,defaultWidth:"full"})};const jl=Vl;var Ul={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"},Gl=function(e,a,i,n){return Ul[e]};const Wl=Gl;function vn(t){return function(e,a){var i=a!=null&&a.context?String(a.context):"standalone",n;if(i==="formatting"&&t.formattingValues){var r=t.defaultFormattingWidth||t.defaultWidth,o=a!=null&&a.width?String(a.width):r;n=t.formattingValues[o]||t.formattingValues[r]}else{var c=t.defaultWidth,h=a!=null&&a.width?String(a.width):t.defaultWidth;n=t.values[h]||t.values[c]}var u=t.argumentCallback?t.argumentCallback(e):e;return n[u]}}var ql={narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},Yl={narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},Kl={narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},Zl={narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},Xl={narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},Ql={narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},Jl=function(e,a){var i=Number(e),n=i%100;if(n>20||n<10)switch(n%10){case 1:return i+"st";case 2:return i+"nd";case 3:return i+"rd"}return i+"th"},tc={ordinalNumber:Jl,era:vn({values:ql,defaultWidth:"wide"}),quarter:vn({values:Yl,defaultWidth:"wide",argumentCallback:function(e){return e-1}}),month:vn({values:Kl,defaultWidth:"wide"}),day:vn({values:Zl,defaultWidth:"wide"}),dayPeriod:vn({values:Xl,defaultWidth:"wide",formattingValues:Ql,defaultFormattingWidth:"wide"})};const ec=tc;function fn(t){return function(e){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},i=a.width,n=i&&t.matchPatterns[i]||t.matchPatterns[t.defaultMatchWidth],r=e.match(n);if(!r)return null;var o=r[0],c=i&&t.parsePatterns[i]||t.parsePatterns[t.defaultParseWidth],h=Array.isArray(c)?ac(c,function(f){return f.test(o)}):nc(c,function(f){return f.test(o)}),u;u=t.valueCallback?t.valueCallback(h):h,u=a.valueCallback?a.valueCallback(u):u;var m=e.slice(o.length);return{value:u,rest:m}}}function nc(t,e){for(var a in t)if(t.hasOwnProperty(a)&&e(t[a]))return a}function ac(t,e){for(var a=0;a<t.length;a++)if(e(t[a]))return a}function ic(t){return function(e){var a=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},i=e.match(t.matchPattern);if(!i)return null;var n=i[0],r=e.match(t.parsePattern);if(!r)return null;var o=t.valueCallback?t.valueCallback(r[0]):r[0];o=a.valueCallback?a.valueCallback(o):o;var c=e.slice(n.length);return{value:o,rest:c}}}var rc=/^(\d+)(th|st|nd|rd)?/i,oc=/\d+/i,sc={narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},lc={any:[/^b/i,/^(a|c)/i]},cc={narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},dc={any:[/1/i,/2/i,/3/i,/4/i]},hc={narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},uc={narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},pc={narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},gc={narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},mc={narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},vc={any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},fc={ordinalNumber:ic({matchPattern:rc,parsePattern:oc,valueCallback:function(e){return parseInt(e,10)}}),era:fn({matchPatterns:sc,defaultMatchWidth:"wide",parsePatterns:lc,defaultParseWidth:"any"}),quarter:fn({matchPatterns:cc,defaultMatchWidth:"wide",parsePatterns:dc,defaultParseWidth:"any",valueCallback:function(e){return e+1}}),month:fn({matchPatterns:hc,defaultMatchWidth:"wide",parsePatterns:uc,defaultParseWidth:"any"}),day:fn({matchPatterns:pc,defaultMatchWidth:"wide",parsePatterns:gc,defaultParseWidth:"any"}),dayPeriod:fn({matchPatterns:mc,defaultMatchWidth:"any",parsePatterns:vc,defaultParseWidth:"any"})},yc={code:"en-US",formatDistance:Fl,formatLong:jl,formatRelative:Wl,localize:ec,match:fc,options:{weekStartsOn:0,firstWeekContainsDate:1}};const Dr=yc;var bc=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,$c=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,wc=/^'([^]*?)'?$/,Cc=/''/g,Sc=/[a-zA-Z]/;function ht(t,e,a){var i,n,r,o,c,h,u,m,f,$,x,M,V,N,ut,xt,Zt,Pt;R(2,arguments);var G=String(e),lt=pe(),ct=(i=(n=a==null?void 0:a.locale)!==null&&n!==void 0?n:lt.locale)!==null&&i!==void 0?i:Dr,Dt=at((r=(o=(c=(h=a==null?void 0:a.firstWeekContainsDate)!==null&&h!==void 0?h:a==null||(u=a.locale)===null||u===void 0||(m=u.options)===null||m===void 0?void 0:m.firstWeekContainsDate)!==null&&c!==void 0?c:lt.firstWeekContainsDate)!==null&&o!==void 0?o:(f=lt.locale)===null||f===void 0||($=f.options)===null||$===void 0?void 0:$.firstWeekContainsDate)!==null&&r!==void 0?r:1);if(!(Dt>=1&&Dt<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var Mt=at((x=(M=(V=(N=a==null?void 0:a.weekStartsOn)!==null&&N!==void 0?N:a==null||(ut=a.locale)===null||ut===void 0||(xt=ut.options)===null||xt===void 0?void 0:xt.weekStartsOn)!==null&&V!==void 0?V:lt.weekStartsOn)!==null&&M!==void 0?M:(Zt=lt.locale)===null||Zt===void 0||(Pt=Zt.options)===null||Pt===void 0?void 0:Pt.weekStartsOn)!==null&&x!==void 0?x:0);if(!(Mt>=0&&Mt<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");if(!ct.localize)throw new RangeError("locale must contain localize property");if(!ct.formatLong)throw new RangeError("locale must contain formatLong property");var $t=Z(t);if(!bl($t))throw new RangeError("Invalid time value");var Rt=br($t),Vt=wr($t,Rt),Ln={firstWeekContainsDate:Dt,weekStartsOn:Mt,locale:ct,_originalDate:$t},mi=G.match($c).map(function(wt){var jt=wt[0];if(jt==="p"||jt==="P"){var Le=Ga[jt];return Le(wt,ct.formatLong)}return wt}).join("").match(bc).map(function(wt){if(wt==="''")return"'";var jt=wt[0];if(jt==="'")return xc(wt);var Le=Dl[jt];if(Le)return!(a!=null&&a.useAdditionalWeekYearTokens)&&Er(wt)&&Un(wt,e,String(t)),!(a!=null&&a.useAdditionalDayOfYearTokens)&&Lr(wt)&&Un(wt,e,String(t)),Le(Vt,wt,ct.localize,Ln);if(jt.match(Sc))throw new RangeError("Format string contains an unescaped latin alphabet character `"+jt+"`");return wt}).join("");return mi}function xc(t){var e=t.match(wc);return e?e[1].replace(Cc,"'"):t}function Pc(t,e){if(t==null)throw new TypeError("assign requires that input parameter not be null or undefined");for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&(t[a]=e[a]);return t}function kc(t){R(1,arguments);var e=Z(t),a=e.getDate();return a}function Mr(t,e){(e==null||e>t.length)&&(e=t.length);for(var a=0,i=new Array(e);a<e;a++)i[a]=t[a];return i}function _c(t,e){if(t){if(typeof t=="string")return Mr(t,e);var a=Object.prototype.toString.call(t).slice(8,-1);if(a==="Object"&&t.constructor&&(a=t.constructor.name),a==="Map"||a==="Set")return Array.from(t);if(a==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return Mr(t,e)}}function Tr(t,e){var a=typeof Symbol<"u"&&t[Symbol.iterator]||t["@@iterator"];if(!a){if(Array.isArray(t)||(a=_c(t))||e&&t&&typeof t.length=="number"){a&&(t=a);var i=0,n=function(){};return{s:n,n:function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}},e:function(u){throw u},f:n}}throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var r=!0,o=!1,c;return{s:function(){a=a.call(t)},n:function(){var u=a.next();return r=u.done,u},e:function(u){o=!0,c=u},f:function(){try{!r&&a.return!=null&&a.return()}finally{if(o)throw c}}}}function S(t){if(t===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function qa(t,e){return qa=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(i,n){return i.__proto__=n,i},qa(t,e)}function z(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&qa(t,e)}function Gn(t){return Gn=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(a){return a.__proto__||Object.getPrototypeOf(a)},Gn(t)}function Ar(){try{var t=!Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){}))}catch{}return(Ar=function(){return!!t})()}function Oc(t,e){if(e&&(ae(e)==="object"||typeof e=="function"))return e;if(e!==void 0)throw new TypeError("Derived constructors may only return object or undefined");return S(t)}function H(t){var e=Ar();return function(){var i=Gn(t),n;if(e){var r=Gn(this).constructor;n=Reflect.construct(i,arguments,r)}else n=i.apply(this,arguments);return Oc(this,n)}}function I(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function Lc(t,e){if(ae(t)!="object"||!t)return t;var a=t[Symbol.toPrimitive];if(a!==void 0){var i=a.call(t,e||"default");if(ae(i)!="object")return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return(e==="string"?String:Number)(t)}function Nr(t){var e=Lc(t,"string");return ae(e)=="symbol"?e:String(e)}function Br(t,e){for(var a=0;a<e.length;a++){var i=e[a];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,Nr(i.key),i)}}function F(t,e,a){return e&&Br(t.prototype,e),a&&Br(t,a),Object.defineProperty(t,"prototype",{writable:!1}),t}function C(t,e,a){return e=Nr(e),e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}var Ec=10,Ir=function(){function t(){I(this,t),C(this,"priority",void 0),C(this,"subPriority",0)}return F(t,[{key:"validate",value:function(a,i){return!0}}]),t}(),Dc=function(t){z(a,t);var e=H(a);function a(i,n,r,o,c){var h;return I(this,a),h=e.call(this),h.value=i,h.validateValue=n,h.setValue=r,h.priority=o,c&&(h.subPriority=c),h}return F(a,[{key:"validate",value:function(n,r){return this.validateValue(n,this.value,r)}},{key:"set",value:function(n,r,o){return this.setValue(n,r,this.value,o)}}]),a}(Ir),Mc=function(t){z(a,t);var e=H(a);function a(){var i;I(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return i=e.call.apply(e,[this].concat(r)),C(S(i),"priority",Ec),C(S(i),"subPriority",-1),i}return F(a,[{key:"set",value:function(n,r){if(r.timestampIsSet)return n;var o=new Date(0);return o.setFullYear(n.getUTCFullYear(),n.getUTCMonth(),n.getUTCDate()),o.setHours(n.getUTCHours(),n.getUTCMinutes(),n.getUTCSeconds(),n.getUTCMilliseconds()),o}}]),a}(Ir),j=function(){function t(){I(this,t),C(this,"incompatibleTokens",void 0),C(this,"priority",void 0),C(this,"subPriority",void 0)}return F(t,[{key:"run",value:function(a,i,n,r){var o=this.parse(a,i,n,r);return o?{setter:new Dc(o.value,this.validate,this.set,this.priority,this.subPriority),rest:o.rest}:null}},{key:"validate",value:function(a,i,n){return!0}}]),t}(),Tc=function(t){z(a,t);var e=H(a);function a(){var i;I(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return i=e.call.apply(e,[this].concat(r)),C(S(i),"priority",140),C(S(i),"incompatibleTokens",["R","u","t","T"]),i}return F(a,[{key:"parse",value:function(n,r,o){switch(r){case"G":case"GG":case"GGG":return o.era(n,{width:"abbreviated"})||o.era(n,{width:"narrow"});case"GGGGG":return o.era(n,{width:"narrow"});case"GGGG":default:return o.era(n,{width:"wide"})||o.era(n,{width:"abbreviated"})||o.era(n,{width:"narrow"})}}},{key:"set",value:function(n,r,o){return r.era=o,n.setUTCFullYear(o,0,1),n.setUTCHours(0,0,0,0),n}}]),a}(j),ot={month:/^(1[0-2]|0?\d)/,date:/^(3[0-1]|[0-2]?\d)/,dayOfYear:/^(36[0-6]|3[0-5]\d|[0-2]?\d?\d)/,week:/^(5[0-3]|[0-4]?\d)/,hour23h:/^(2[0-3]|[0-1]?\d)/,hour24h:/^(2[0-4]|[0-1]?\d)/,hour11h:/^(1[0-1]|0?\d)/,hour12h:/^(1[0-2]|0?\d)/,minute:/^[0-5]?\d/,second:/^[0-5]?\d/,singleDigit:/^\d/,twoDigits:/^\d{1,2}/,threeDigits:/^\d{1,3}/,fourDigits:/^\d{1,4}/,anyDigitsSigned:/^-?\d+/,singleDigitSigned:/^-?\d/,twoDigitsSigned:/^-?\d{1,2}/,threeDigitsSigned:/^-?\d{1,3}/,fourDigitsSigned:/^-?\d{1,4}/},Qt={basicOptionalMinutes:/^([+-])(\d{2})(\d{2})?|Z/,basic:/^([+-])(\d{2})(\d{2})|Z/,basicOptionalSeconds:/^([+-])(\d{2})(\d{2})((\d{2}))?|Z/,extended:/^([+-])(\d{2}):(\d{2})|Z/,extendedOptionalSeconds:/^([+-])(\d{2}):(\d{2})(:(\d{2}))?|Z/};function st(t,e){return t&&{value:e(t.value),rest:t.rest}}function J(t,e){var a=e.match(t);return a?{value:parseInt(a[0],10),rest:e.slice(a[0].length)}:null}function Jt(t,e){var a=e.match(t);if(!a)return null;if(a[0]==="Z")return{value:0,rest:e.slice(1)};var i=a[1]==="+"?1:-1,n=a[2]?parseInt(a[2],10):0,r=a[3]?parseInt(a[3],10):0,o=a[5]?parseInt(a[5],10):0;return{value:i*(n*ja+r*Va+o*fl),rest:e.slice(a[0].length)}}function Fr(t){return J(ot.anyDigitsSigned,t)}function it(t,e){switch(t){case 1:return J(ot.singleDigit,e);case 2:return J(ot.twoDigits,e);case 3:return J(ot.threeDigits,e);case 4:return J(ot.fourDigits,e);default:return J(new RegExp("^\\d{1,"+t+"}"),e)}}function Wn(t,e){switch(t){case 1:return J(ot.singleDigitSigned,e);case 2:return J(ot.twoDigitsSigned,e);case 3:return J(ot.threeDigitsSigned,e);case 4:return J(ot.fourDigitsSigned,e);default:return J(new RegExp("^-?\\d{1,"+t+"}"),e)}}function Ya(t){switch(t){case"morning":return 4;case"evening":return 17;case"pm":case"noon":case"afternoon":return 12;case"am":case"midnight":case"night":default:return 0}}function zr(t,e){var a=e>0,i=a?e:1-e,n;if(i<=50)n=t||100;else{var r=i+50,o=Math.floor(r/100)*100,c=t>=r%100;n=t+o-(c?100:0)}return a?n:1-n}function Hr(t){return t%400===0||t%4===0&&t%100!==0}var Ac=function(t){z(a,t);var e=H(a);function a(){var i;I(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return i=e.call.apply(e,[this].concat(r)),C(S(i),"priority",130),C(S(i),"incompatibleTokens",["Y","R","u","w","I","i","e","c","t","T"]),i}return F(a,[{key:"parse",value:function(n,r,o){var c=function(u){return{year:u,isTwoDigitYear:r==="yy"}};switch(r){case"y":return st(it(4,n),c);case"yo":return st(o.ordinalNumber(n,{unit:"year"}),c);default:return st(it(r.length,n),c)}}},{key:"validate",value:function(n,r){return r.isTwoDigitYear||r.year>0}},{key:"set",value:function(n,r,o){var c=n.getUTCFullYear();if(o.isTwoDigitYear){var h=zr(o.year,c);return n.setUTCFullYear(h,0,1),n.setUTCHours(0,0,0,0),n}var u=!("era"in r)||r.era===1?o.year:1-o.year;return n.setUTCFullYear(u,0,1),n.setUTCHours(0,0,0,0),n}}]),a}(j),Nc=function(t){z(a,t);var e=H(a);function a(){var i;I(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return i=e.call.apply(e,[this].concat(r)),C(S(i),"priority",130),C(S(i),"incompatibleTokens",["y","R","u","Q","q","M","L","I","d","D","i","t","T"]),i}return F(a,[{key:"parse",value:function(n,r,o){var c=function(u){return{year:u,isTwoDigitYear:r==="YY"}};switch(r){case"Y":return st(it(4,n),c);case"Yo":return st(o.ordinalNumber(n,{unit:"year"}),c);default:return st(it(r.length,n),c)}}},{key:"validate",value:function(n,r){return r.isTwoDigitYear||r.year>0}},{key:"set",value:function(n,r,o,c){var h=Ua(n,c);if(o.isTwoDigitYear){var u=zr(o.year,h);return n.setUTCFullYear(u,0,c.firstWeekContainsDate),n.setUTCHours(0,0,0,0),we(n,c)}var m=!("era"in r)||r.era===1?o.year:1-o.year;return n.setUTCFullYear(m,0,c.firstWeekContainsDate),n.setUTCHours(0,0,0,0),we(n,c)}}]),a}(j),Bc=function(t){z(a,t);var e=H(a);function a(){var i;I(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return i=e.call.apply(e,[this].concat(r)),C(S(i),"priority",130),C(S(i),"incompatibleTokens",["G","y","Y","u","Q","q","M","L","w","d","D","e","c","t","T"]),i}return F(a,[{key:"parse",value:function(n,r){return Wn(r==="R"?4:r.length,n)}},{key:"set",value:function(n,r,o){var c=new Date(0);return c.setUTCFullYear(o,0,4),c.setUTCHours(0,0,0,0),Re(c)}}]),a}(j),Ic=function(t){z(a,t);var e=H(a);function a(){var i;I(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return i=e.call.apply(e,[this].concat(r)),C(S(i),"priority",130),C(S(i),"incompatibleTokens",["G","y","Y","R","w","I","i","e","c","t","T"]),i}return F(a,[{key:"parse",value:function(n,r){return Wn(r==="u"?4:r.length,n)}},{key:"set",value:function(n,r,o){return n.setUTCFullYear(o,0,1),n.setUTCHours(0,0,0,0),n}}]),a}(j),Fc=function(t){z(a,t);var e=H(a);function a(){var i;I(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return i=e.call.apply(e,[this].concat(r)),C(S(i),"priority",120),C(S(i),"incompatibleTokens",["Y","R","q","M","L","w","I","d","D","i","e","c","t","T"]),i}return F(a,[{key:"parse",value:function(n,r,o){switch(r){case"Q":case"QQ":return it(r.length,n);case"Qo":return o.ordinalNumber(n,{unit:"quarter"});case"QQQ":return o.quarter(n,{width:"abbreviated",context:"formatting"})||o.quarter(n,{width:"narrow",context:"formatting"});case"QQQQQ":return o.quarter(n,{width:"narrow",context:"formatting"});case"QQQQ":default:return o.quarter(n,{width:"wide",context:"formatting"})||o.quarter(n,{width:"abbreviated",context:"formatting"})||o.quarter(n,{width:"narrow",context:"formatting"})}}},{key:"validate",value:function(n,r){return r>=1&&r<=4}},{key:"set",value:function(n,r,o){return n.setUTCMonth((o-1)*3,1),n.setUTCHours(0,0,0,0),n}}]),a}(j),zc=function(t){z(a,t);var e=H(a);function a(){var i;I(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return i=e.call.apply(e,[this].concat(r)),C(S(i),"priority",120),C(S(i),"incompatibleTokens",["Y","R","Q","M","L","w","I","d","D","i","e","c","t","T"]),i}return F(a,[{key:"parse",value:function(n,r,o){switch(r){case"q":case"qq":return it(r.length,n);case"qo":return o.ordinalNumber(n,{unit:"quarter"});case"qqq":return o.quarter(n,{width:"abbreviated",context:"standalone"})||o.quarter(n,{width:"narrow",context:"standalone"});case"qqqqq":return o.quarter(n,{width:"narrow",context:"standalone"});case"qqqq":default:return o.quarter(n,{width:"wide",context:"standalone"})||o.quarter(n,{width:"abbreviated",context:"standalone"})||o.quarter(n,{width:"narrow",context:"standalone"})}}},{key:"validate",value:function(n,r){return r>=1&&r<=4}},{key:"set",value:function(n,r,o){return n.setUTCMonth((o-1)*3,1),n.setUTCHours(0,0,0,0),n}}]),a}(j),Hc=function(t){z(a,t);var e=H(a);function a(){var i;I(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return i=e.call.apply(e,[this].concat(r)),C(S(i),"incompatibleTokens",["Y","R","q","Q","L","w","I","D","i","e","c","t","T"]),C(S(i),"priority",110),i}return F(a,[{key:"parse",value:function(n,r,o){var c=function(u){return u-1};switch(r){case"M":return st(J(ot.month,n),c);case"MM":return st(it(2,n),c);case"Mo":return st(o.ordinalNumber(n,{unit:"month"}),c);case"MMM":return o.month(n,{width:"abbreviated",context:"formatting"})||o.month(n,{width:"narrow",context:"formatting"});case"MMMMM":return o.month(n,{width:"narrow",context:"formatting"});case"MMMM":default:return o.month(n,{width:"wide",context:"formatting"})||o.month(n,{width:"abbreviated",context:"formatting"})||o.month(n,{width:"narrow",context:"formatting"})}}},{key:"validate",value:function(n,r){return r>=0&&r<=11}},{key:"set",value:function(n,r,o){return n.setUTCMonth(o,1),n.setUTCHours(0,0,0,0),n}}]),a}(j),Rc=function(t){z(a,t);var e=H(a);function a(){var i;I(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return i=e.call.apply(e,[this].concat(r)),C(S(i),"priority",110),C(S(i),"incompatibleTokens",["Y","R","q","Q","M","w","I","D","i","e","c","t","T"]),i}return F(a,[{key:"parse",value:function(n,r,o){var c=function(u){return u-1};switch(r){case"L":return st(J(ot.month,n),c);case"LL":return st(it(2,n),c);case"Lo":return st(o.ordinalNumber(n,{unit:"month"}),c);case"LLL":return o.month(n,{width:"abbreviated",context:"standalone"})||o.month(n,{width:"narrow",context:"standalone"});case"LLLLL":return o.month(n,{width:"narrow",context:"standalone"});case"LLLL":default:return o.month(n,{width:"wide",context:"standalone"})||o.month(n,{width:"abbreviated",context:"standalone"})||o.month(n,{width:"narrow",context:"standalone"})}}},{key:"validate",value:function(n,r){return r>=0&&r<=11}},{key:"set",value:function(n,r,o){return n.setUTCMonth(o,1),n.setUTCHours(0,0,0,0),n}}]),a}(j);function Vc(t,e,a){R(2,arguments);var i=Z(t),n=at(e),r=xr(i,a)-n;return i.setUTCDate(i.getUTCDate()-r*7),i}var jc=function(t){z(a,t);var e=H(a);function a(){var i;I(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return i=e.call.apply(e,[this].concat(r)),C(S(i),"priority",100),C(S(i),"incompatibleTokens",["y","R","u","q","Q","M","L","I","d","D","i","t","T"]),i}return F(a,[{key:"parse",value:function(n,r,o){switch(r){case"w":return J(ot.week,n);case"wo":return o.ordinalNumber(n,{unit:"week"});default:return it(r.length,n)}}},{key:"validate",value:function(n,r){return r>=1&&r<=53}},{key:"set",value:function(n,r,o,c){return we(Vc(n,o,c),c)}}]),a}(j);function Uc(t,e){R(2,arguments);var a=Z(t),i=at(e),n=Sr(a)-i;return a.setUTCDate(a.getUTCDate()-n*7),a}var Gc=function(t){z(a,t);var e=H(a);function a(){var i;I(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return i=e.call.apply(e,[this].concat(r)),C(S(i),"priority",100),C(S(i),"incompatibleTokens",["y","Y","u","q","Q","M","L","w","d","D","e","c","t","T"]),i}return F(a,[{key:"parse",value:function(n,r,o){switch(r){case"I":return J(ot.week,n);case"Io":return o.ordinalNumber(n,{unit:"week"});default:return it(r.length,n)}}},{key:"validate",value:function(n,r){return r>=1&&r<=53}},{key:"set",value:function(n,r,o){return Re(Uc(n,o))}}]),a}(j),Wc=[31,28,31,30,31,30,31,31,30,31,30,31],qc=[31,29,31,30,31,30,31,31,30,31,30,31],Yc=function(t){z(a,t);var e=H(a);function a(){var i;I(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return i=e.call.apply(e,[this].concat(r)),C(S(i),"priority",90),C(S(i),"subPriority",1),C(S(i),"incompatibleTokens",["Y","R","q","Q","w","I","D","i","e","c","t","T"]),i}return F(a,[{key:"parse",value:function(n,r,o){switch(r){case"d":return J(ot.date,n);case"do":return o.ordinalNumber(n,{unit:"date"});default:return it(r.length,n)}}},{key:"validate",value:function(n,r){var o=n.getUTCFullYear(),c=Hr(o),h=n.getUTCMonth();return c?r>=1&&r<=qc[h]:r>=1&&r<=Wc[h]}},{key:"set",value:function(n,r,o){return n.setUTCDate(o),n.setUTCHours(0,0,0,0),n}}]),a}(j),Kc=function(t){z(a,t);var e=H(a);function a(){var i;I(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return i=e.call.apply(e,[this].concat(r)),C(S(i),"priority",90),C(S(i),"subpriority",1),C(S(i),"incompatibleTokens",["Y","R","q","Q","M","L","w","I","d","E","i","e","c","t","T"]),i}return F(a,[{key:"parse",value:function(n,r,o){switch(r){case"D":case"DD":return J(ot.dayOfYear,n);case"Do":return o.ordinalNumber(n,{unit:"date"});default:return it(r.length,n)}}},{key:"validate",value:function(n,r){var o=n.getUTCFullYear(),c=Hr(o);return c?r>=1&&r<=366:r>=1&&r<=365}},{key:"set",value:function(n,r,o){return n.setUTCMonth(0,o),n.setUTCHours(0,0,0,0),n}}]),a}(j);function Ka(t,e,a){var i,n,r,o,c,h,u,m;R(2,arguments);var f=pe(),$=at((i=(n=(r=(o=a==null?void 0:a.weekStartsOn)!==null&&o!==void 0?o:a==null||(c=a.locale)===null||c===void 0||(h=c.options)===null||h===void 0?void 0:h.weekStartsOn)!==null&&r!==void 0?r:f.weekStartsOn)!==null&&n!==void 0?n:(u=f.locale)===null||u===void 0||(m=u.options)===null||m===void 0?void 0:m.weekStartsOn)!==null&&i!==void 0?i:0);if(!($>=0&&$<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var x=Z(t),M=at(e),V=x.getUTCDay(),N=M%7,ut=(N+7)%7,xt=(ut<$?7:0)+M-V;return x.setUTCDate(x.getUTCDate()+xt),x}var Zc=function(t){z(a,t);var e=H(a);function a(){var i;I(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return i=e.call.apply(e,[this].concat(r)),C(S(i),"priority",90),C(S(i),"incompatibleTokens",["D","i","e","c","t","T"]),i}return F(a,[{key:"parse",value:function(n,r,o){switch(r){case"E":case"EE":case"EEE":return o.day(n,{width:"abbreviated",context:"formatting"})||o.day(n,{width:"short",context:"formatting"})||o.day(n,{width:"narrow",context:"formatting"});case"EEEEE":return o.day(n,{width:"narrow",context:"formatting"});case"EEEEEE":return o.day(n,{width:"short",context:"formatting"})||o.day(n,{width:"narrow",context:"formatting"});case"EEEE":default:return o.day(n,{width:"wide",context:"formatting"})||o.day(n,{width:"abbreviated",context:"formatting"})||o.day(n,{width:"short",context:"formatting"})||o.day(n,{width:"narrow",context:"formatting"})}}},{key:"validate",value:function(n,r){return r>=0&&r<=6}},{key:"set",value:function(n,r,o,c){return n=Ka(n,o,c),n.setUTCHours(0,0,0,0),n}}]),a}(j),Xc=function(t){z(a,t);var e=H(a);function a(){var i;I(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return i=e.call.apply(e,[this].concat(r)),C(S(i),"priority",90),C(S(i),"incompatibleTokens",["y","R","u","q","Q","M","L","I","d","D","E","i","c","t","T"]),i}return F(a,[{key:"parse",value:function(n,r,o,c){var h=function(m){var f=Math.floor((m-1)/7)*7;return(m+c.weekStartsOn+6)%7+f};switch(r){case"e":case"ee":return st(it(r.length,n),h);case"eo":return st(o.ordinalNumber(n,{unit:"day"}),h);case"eee":return o.day(n,{width:"abbreviated",context:"formatting"})||o.day(n,{width:"short",context:"formatting"})||o.day(n,{width:"narrow",context:"formatting"});case"eeeee":return o.day(n,{width:"narrow",context:"formatting"});case"eeeeee":return o.day(n,{width:"short",context:"formatting"})||o.day(n,{width:"narrow",context:"formatting"});case"eeee":default:return o.day(n,{width:"wide",context:"formatting"})||o.day(n,{width:"abbreviated",context:"formatting"})||o.day(n,{width:"short",context:"formatting"})||o.day(n,{width:"narrow",context:"formatting"})}}},{key:"validate",value:function(n,r){return r>=0&&r<=6}},{key:"set",value:function(n,r,o,c){return n=Ka(n,o,c),n.setUTCHours(0,0,0,0),n}}]),a}(j),Qc=function(t){z(a,t);var e=H(a);function a(){var i;I(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return i=e.call.apply(e,[this].concat(r)),C(S(i),"priority",90),C(S(i),"incompatibleTokens",["y","R","u","q","Q","M","L","I","d","D","E","i","e","t","T"]),i}return F(a,[{key:"parse",value:function(n,r,o,c){var h=function(m){var f=Math.floor((m-1)/7)*7;return(m+c.weekStartsOn+6)%7+f};switch(r){case"c":case"cc":return st(it(r.length,n),h);case"co":return st(o.ordinalNumber(n,{unit:"day"}),h);case"ccc":return o.day(n,{width:"abbreviated",context:"standalone"})||o.day(n,{width:"short",context:"standalone"})||o.day(n,{width:"narrow",context:"standalone"});case"ccccc":return o.day(n,{width:"narrow",context:"standalone"});case"cccccc":return o.day(n,{width:"short",context:"standalone"})||o.day(n,{width:"narrow",context:"standalone"});case"cccc":default:return o.day(n,{width:"wide",context:"standalone"})||o.day(n,{width:"abbreviated",context:"standalone"})||o.day(n,{width:"short",context:"standalone"})||o.day(n,{width:"narrow",context:"standalone"})}}},{key:"validate",value:function(n,r){return r>=0&&r<=6}},{key:"set",value:function(n,r,o,c){return n=Ka(n,o,c),n.setUTCHours(0,0,0,0),n}}]),a}(j);function Jc(t,e){R(2,arguments);var a=at(e);a%7===0&&(a=a-7);var i=1,n=Z(t),r=n.getUTCDay(),o=a%7,c=(o+7)%7,h=(c<i?7:0)+a-r;return n.setUTCDate(n.getUTCDate()+h),n}var td=function(t){z(a,t);var e=H(a);function a(){var i;I(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return i=e.call.apply(e,[this].concat(r)),C(S(i),"priority",90),C(S(i),"incompatibleTokens",["y","Y","u","q","Q","M","L","w","d","D","E","e","c","t","T"]),i}return F(a,[{key:"parse",value:function(n,r,o){var c=function(u){return u===0?7:u};switch(r){case"i":case"ii":return it(r.length,n);case"io":return o.ordinalNumber(n,{unit:"day"});case"iii":return st(o.day(n,{width:"abbreviated",context:"formatting"})||o.day(n,{width:"short",context:"formatting"})||o.day(n,{width:"narrow",context:"formatting"}),c);case"iiiii":return st(o.day(n,{width:"narrow",context:"formatting"}),c);case"iiiiii":return st(o.day(n,{width:"short",context:"formatting"})||o.day(n,{width:"narrow",context:"formatting"}),c);case"iiii":default:return st(o.day(n,{width:"wide",context:"formatting"})||o.day(n,{width:"abbreviated",context:"formatting"})||o.day(n,{width:"short",context:"formatting"})||o.day(n,{width:"narrow",context:"formatting"}),c)}}},{key:"validate",value:function(n,r){return r>=1&&r<=7}},{key:"set",value:function(n,r,o){return n=Jc(n,o),n.setUTCHours(0,0,0,0),n}}]),a}(j),ed=function(t){z(a,t);var e=H(a);function a(){var i;I(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return i=e.call.apply(e,[this].concat(r)),C(S(i),"priority",80),C(S(i),"incompatibleTokens",["b","B","H","k","t","T"]),i}return F(a,[{key:"parse",value:function(n,r,o){switch(r){case"a":case"aa":case"aaa":return o.dayPeriod(n,{width:"abbreviated",context:"formatting"})||o.dayPeriod(n,{width:"narrow",context:"formatting"});case"aaaaa":return o.dayPeriod(n,{width:"narrow",context:"formatting"});case"aaaa":default:return o.dayPeriod(n,{width:"wide",context:"formatting"})||o.dayPeriod(n,{width:"abbreviated",context:"formatting"})||o.dayPeriod(n,{width:"narrow",context:"formatting"})}}},{key:"set",value:function(n,r,o){return n.setUTCHours(Ya(o),0,0,0),n}}]),a}(j),nd=function(t){z(a,t);var e=H(a);function a(){var i;I(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return i=e.call.apply(e,[this].concat(r)),C(S(i),"priority",80),C(S(i),"incompatibleTokens",["a","B","H","k","t","T"]),i}return F(a,[{key:"parse",value:function(n,r,o){switch(r){case"b":case"bb":case"bbb":return o.dayPeriod(n,{width:"abbreviated",context:"formatting"})||o.dayPeriod(n,{width:"narrow",context:"formatting"});case"bbbbb":return o.dayPeriod(n,{width:"narrow",context:"formatting"});case"bbbb":default:return o.dayPeriod(n,{width:"wide",context:"formatting"})||o.dayPeriod(n,{width:"abbreviated",context:"formatting"})||o.dayPeriod(n,{width:"narrow",context:"formatting"})}}},{key:"set",value:function(n,r,o){return n.setUTCHours(Ya(o),0,0,0),n}}]),a}(j),ad=function(t){z(a,t);var e=H(a);function a(){var i;I(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return i=e.call.apply(e,[this].concat(r)),C(S(i),"priority",80),C(S(i),"incompatibleTokens",["a","b","t","T"]),i}return F(a,[{key:"parse",value:function(n,r,o){switch(r){case"B":case"BB":case"BBB":return o.dayPeriod(n,{width:"abbreviated",context:"formatting"})||o.dayPeriod(n,{width:"narrow",context:"formatting"});case"BBBBB":return o.dayPeriod(n,{width:"narrow",context:"formatting"});case"BBBB":default:return o.dayPeriod(n,{width:"wide",context:"formatting"})||o.dayPeriod(n,{width:"abbreviated",context:"formatting"})||o.dayPeriod(n,{width:"narrow",context:"formatting"})}}},{key:"set",value:function(n,r,o){return n.setUTCHours(Ya(o),0,0,0),n}}]),a}(j),id=function(t){z(a,t);var e=H(a);function a(){var i;I(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return i=e.call.apply(e,[this].concat(r)),C(S(i),"priority",70),C(S(i),"incompatibleTokens",["H","K","k","t","T"]),i}return F(a,[{key:"parse",value:function(n,r,o){switch(r){case"h":return J(ot.hour12h,n);case"ho":return o.ordinalNumber(n,{unit:"hour"});default:return it(r.length,n)}}},{key:"validate",value:function(n,r){return r>=1&&r<=12}},{key:"set",value:function(n,r,o){var c=n.getUTCHours()>=12;return c&&o<12?n.setUTCHours(o+12,0,0,0):!c&&o===12?n.setUTCHours(0,0,0,0):n.setUTCHours(o,0,0,0),n}}]),a}(j),rd=function(t){z(a,t);var e=H(a);function a(){var i;I(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return i=e.call.apply(e,[this].concat(r)),C(S(i),"priority",70),C(S(i),"incompatibleTokens",["a","b","h","K","k","t","T"]),i}return F(a,[{key:"parse",value:function(n,r,o){switch(r){case"H":return J(ot.hour23h,n);case"Ho":return o.ordinalNumber(n,{unit:"hour"});default:return it(r.length,n)}}},{key:"validate",value:function(n,r){return r>=0&&r<=23}},{key:"set",value:function(n,r,o){return n.setUTCHours(o,0,0,0),n}}]),a}(j),od=function(t){z(a,t);var e=H(a);function a(){var i;I(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return i=e.call.apply(e,[this].concat(r)),C(S(i),"priority",70),C(S(i),"incompatibleTokens",["h","H","k","t","T"]),i}return F(a,[{key:"parse",value:function(n,r,o){switch(r){case"K":return J(ot.hour11h,n);case"Ko":return o.ordinalNumber(n,{unit:"hour"});default:return it(r.length,n)}}},{key:"validate",value:function(n,r){return r>=0&&r<=11}},{key:"set",value:function(n,r,o){var c=n.getUTCHours()>=12;return c&&o<12?n.setUTCHours(o+12,0,0,0):n.setUTCHours(o,0,0,0),n}}]),a}(j),sd=function(t){z(a,t);var e=H(a);function a(){var i;I(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return i=e.call.apply(e,[this].concat(r)),C(S(i),"priority",70),C(S(i),"incompatibleTokens",["a","b","h","H","K","t","T"]),i}return F(a,[{key:"parse",value:function(n,r,o){switch(r){case"k":return J(ot.hour24h,n);case"ko":return o.ordinalNumber(n,{unit:"hour"});default:return it(r.length,n)}}},{key:"validate",value:function(n,r){return r>=1&&r<=24}},{key:"set",value:function(n,r,o){var c=o<=24?o%24:o;return n.setUTCHours(c,0,0,0),n}}]),a}(j),ld=function(t){z(a,t);var e=H(a);function a(){var i;I(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return i=e.call.apply(e,[this].concat(r)),C(S(i),"priority",60),C(S(i),"incompatibleTokens",["t","T"]),i}return F(a,[{key:"parse",value:function(n,r,o){switch(r){case"m":return J(ot.minute,n);case"mo":return o.ordinalNumber(n,{unit:"minute"});default:return it(r.length,n)}}},{key:"validate",value:function(n,r){return r>=0&&r<=59}},{key:"set",value:function(n,r,o){return n.setUTCMinutes(o,0,0),n}}]),a}(j),cd=function(t){z(a,t);var e=H(a);function a(){var i;I(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return i=e.call.apply(e,[this].concat(r)),C(S(i),"priority",50),C(S(i),"incompatibleTokens",["t","T"]),i}return F(a,[{key:"parse",value:function(n,r,o){switch(r){case"s":return J(ot.second,n);case"so":return o.ordinalNumber(n,{unit:"second"});default:return it(r.length,n)}}},{key:"validate",value:function(n,r){return r>=0&&r<=59}},{key:"set",value:function(n,r,o){return n.setUTCSeconds(o,0),n}}]),a}(j),dd=function(t){z(a,t);var e=H(a);function a(){var i;I(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return i=e.call.apply(e,[this].concat(r)),C(S(i),"priority",30),C(S(i),"incompatibleTokens",["t","T"]),i}return F(a,[{key:"parse",value:function(n,r){var o=function(h){return Math.floor(h*Math.pow(10,-r.length+3))};return st(it(r.length,n),o)}},{key:"set",value:function(n,r,o){return n.setUTCMilliseconds(o),n}}]),a}(j),hd=function(t){z(a,t);var e=H(a);function a(){var i;I(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return i=e.call.apply(e,[this].concat(r)),C(S(i),"priority",10),C(S(i),"incompatibleTokens",["t","T","x"]),i}return F(a,[{key:"parse",value:function(n,r){switch(r){case"X":return Jt(Qt.basicOptionalMinutes,n);case"XX":return Jt(Qt.basic,n);case"XXXX":return Jt(Qt.basicOptionalSeconds,n);case"XXXXX":return Jt(Qt.extendedOptionalSeconds,n);case"XXX":default:return Jt(Qt.extended,n)}}},{key:"set",value:function(n,r,o){return r.timestampIsSet?n:new Date(n.getTime()-o)}}]),a}(j),ud=function(t){z(a,t);var e=H(a);function a(){var i;I(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return i=e.call.apply(e,[this].concat(r)),C(S(i),"priority",10),C(S(i),"incompatibleTokens",["t","T","X"]),i}return F(a,[{key:"parse",value:function(n,r){switch(r){case"x":return Jt(Qt.basicOptionalMinutes,n);case"xx":return Jt(Qt.basic,n);case"xxxx":return Jt(Qt.basicOptionalSeconds,n);case"xxxxx":return Jt(Qt.extendedOptionalSeconds,n);case"xxx":default:return Jt(Qt.extended,n)}}},{key:"set",value:function(n,r,o){return r.timestampIsSet?n:new Date(n.getTime()-o)}}]),a}(j),pd=function(t){z(a,t);var e=H(a);function a(){var i;I(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return i=e.call.apply(e,[this].concat(r)),C(S(i),"priority",40),C(S(i),"incompatibleTokens","*"),i}return F(a,[{key:"parse",value:function(n){return Fr(n)}},{key:"set",value:function(n,r,o){return[new Date(o*1e3),{timestampIsSet:!0}]}}]),a}(j),gd=function(t){z(a,t);var e=H(a);function a(){var i;I(this,a);for(var n=arguments.length,r=new Array(n),o=0;o<n;o++)r[o]=arguments[o];return i=e.call.apply(e,[this].concat(r)),C(S(i),"priority",20),C(S(i),"incompatibleTokens","*"),i}return F(a,[{key:"parse",value:function(n){return Fr(n)}},{key:"set",value:function(n,r,o){return[new Date(o),{timestampIsSet:!0}]}}]),a}(j),md={G:new Tc,y:new Ac,Y:new Nc,R:new Bc,u:new Ic,Q:new Fc,q:new zc,M:new Hc,L:new Rc,w:new jc,I:new Gc,d:new Yc,D:new Kc,E:new Zc,e:new Xc,c:new Qc,i:new td,a:new ed,b:new nd,B:new ad,h:new id,H:new rd,K:new od,k:new sd,m:new ld,s:new cd,S:new dd,X:new hd,x:new ud,t:new pd,T:new gd},vd=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,fd=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,yd=/^'([^]*?)'?$/,bd=/''/g,$d=/\S/,wd=/[a-zA-Z]/;function Cd(t,e,a,i){var n,r,o,c,h,u,m,f,$,x,M,V,N,ut,xt,Zt,Pt,G;R(3,arguments);var lt=String(t),ct=String(e),Dt=pe(),Mt=(n=(r=i==null?void 0:i.locale)!==null&&r!==void 0?r:Dt.locale)!==null&&n!==void 0?n:Dr;if(!Mt.match)throw new RangeError("locale must contain match property");var $t=at((o=(c=(h=(u=i==null?void 0:i.firstWeekContainsDate)!==null&&u!==void 0?u:i==null||(m=i.locale)===null||m===void 0||(f=m.options)===null||f===void 0?void 0:f.firstWeekContainsDate)!==null&&h!==void 0?h:Dt.firstWeekContainsDate)!==null&&c!==void 0?c:($=Dt.locale)===null||$===void 0||(x=$.options)===null||x===void 0?void 0:x.firstWeekContainsDate)!==null&&o!==void 0?o:1);if(!($t>=1&&$t<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var Rt=at((M=(V=(N=(ut=i==null?void 0:i.weekStartsOn)!==null&&ut!==void 0?ut:i==null||(xt=i.locale)===null||xt===void 0||(Zt=xt.options)===null||Zt===void 0?void 0:Zt.weekStartsOn)!==null&&N!==void 0?N:Dt.weekStartsOn)!==null&&V!==void 0?V:(Pt=Dt.locale)===null||Pt===void 0||(G=Pt.options)===null||G===void 0?void 0:G.weekStartsOn)!==null&&M!==void 0?M:0);if(!(Rt>=0&&Rt<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");if(ct==="")return lt===""?Z(a):new Date(NaN);var Vt={firstWeekContainsDate:$t,weekStartsOn:Rt,locale:Mt},Ln=[new Mc],mi=ct.match(fd).map(function(yt){var K=yt[0];if(K in Ga){var Wt=Ga[K];return Wt(yt,Mt.formatLong)}return yt}).join("").match(vd),wt=[],jt=Tr(mi),Le;try{var g2=function(){var K=Le.value;!(i!=null&&i.useAdditionalWeekYearTokens)&&Er(K)&&Un(K,ct,t),!(i!=null&&i.useAdditionalDayOfYearTokens)&&Lr(K)&&Un(K,ct,t);var Wt=K[0],pa=md[Wt];if(pa){var mo=pa.incompatibleTokens;if(Array.isArray(mo)){var vo=wt.find(function(fo){return mo.includes(fo.token)||fo.token===Wt});if(vo)throw new RangeError("The format string mustn't contain `".concat(vo.fullToken,"` and `").concat(K,"` at the same time"))}else if(pa.incompatibleTokens==="*"&&wt.length>0)throw new RangeError("The format string mustn't contain `".concat(K,"` and any other token at the same time"));wt.push({token:Wt,fullToken:K});var fi=pa.run(lt,K,Mt.match,Vt);if(!fi)return{v:new Date(NaN)};Ln.push(fi.setter),lt=fi.rest}else{if(Wt.match(wd))throw new RangeError("Format string contains an unescaped latin alphabet character `"+Wt+"`");if(K==="''"?K="'":Wt==="'"&&(K=Sd(K)),lt.indexOf(K)===0)lt=lt.slice(K.length);else return{v:new Date(NaN)}}};for(jt.s();!(Le=jt.n()).done;){var ho=g2();if(ae(ho)==="object")return ho.v}}catch(yt){jt.e(yt)}finally{jt.f()}if(lt.length>0&&$d.test(lt))return new Date(NaN);var m2=Ln.map(function(yt){return yt.priority}).sort(function(yt,K){return K-yt}).filter(function(yt,K,Wt){return Wt.indexOf(yt)===K}).map(function(yt){return Ln.filter(function(K){return K.priority===yt}).sort(function(K,Wt){return Wt.subPriority-K.subPriority})}).map(function(yt){return yt[0]}),vi=Z(a);if(isNaN(vi.getTime()))return new Date(NaN);var En=wr(vi,br(vi)),uo={},ha=Tr(m2),po;try{for(ha.s();!(po=ha.n()).done;){var go=po.value;if(!go.validate(En,Vt))return new Date(NaN);var ua=go.set(En,uo,Vt);Array.isArray(ua)?(En=ua[0],Pc(uo,ua[1])):En=ua}}catch(yt){ha.e(yt)}finally{ha.f()}return En}function Sd(t){return t.match(yd)[1].replace(bd,"'")}function xd(t,e){var a;R(1,arguments);var i=at((a=e==null?void 0:e.additionalDigits)!==null&&a!==void 0?a:2);if(i!==2&&i!==1&&i!==0)throw new RangeError("additionalDigits must be 0, 1 or 2");if(!(typeof t=="string"||Object.prototype.toString.call(t)==="[object String]"))return new Date(NaN);var n=Od(t),r;if(n.date){var o=Ld(n.date,i);r=Ed(o.restDateString,o.year)}if(!r||isNaN(r.getTime()))return new Date(NaN);var c=r.getTime(),h=0,u;if(n.time&&(h=Dd(n.time),isNaN(h)))return new Date(NaN);if(n.timezone){if(u=Md(n.timezone),isNaN(u))return new Date(NaN)}else{var m=new Date(c+h),f=new Date(0);return f.setFullYear(m.getUTCFullYear(),m.getUTCMonth(),m.getUTCDate()),f.setHours(m.getUTCHours(),m.getUTCMinutes(),m.getUTCSeconds(),m.getUTCMilliseconds()),f}return new Date(c+h+u)}var qn={dateTimeDelimiter:/[T ]/,timeZoneDelimiter:/[Z ]/i,timezone:/([Z+-].*)$/},Pd=/^-?(?:(\d{3})|(\d{2})(?:-?(\d{2}))?|W(\d{2})(?:-?(\d{1}))?|)$/,kd=/^(\d{2}(?:[.,]\d*)?)(?::?(\d{2}(?:[.,]\d*)?))?(?::?(\d{2}(?:[.,]\d*)?))?$/,_d=/^([+-])(\d{2})(?::?(\d{2}))?$/;function Od(t){var e={},a=t.split(qn.dateTimeDelimiter),i;if(a.length>2)return e;if(/:/.test(a[0])?i=a[0]:(e.date=a[0],i=a[1],qn.timeZoneDelimiter.test(e.date)&&(e.date=t.split(qn.timeZoneDelimiter)[0],i=t.substr(e.date.length,t.length))),i){var n=qn.timezone.exec(i);n?(e.time=i.replace(n[1],""),e.timezone=n[1]):e.time=i}return e}function Ld(t,e){var a=new RegExp("^(?:(\\d{4}|[+-]\\d{"+(4+e)+"})|(\\d{2}|[+-]\\d{"+(2+e)+"})$)"),i=t.match(a);if(!i)return{year:NaN,restDateString:""};var n=i[1]?parseInt(i[1]):null,r=i[2]?parseInt(i[2]):null;return{year:r===null?n:r*100,restDateString:t.slice((i[1]||i[2]).length)}}function Ed(t,e){if(e===null)return new Date(NaN);var a=t.match(Pd);if(!a)return new Date(NaN);var i=!!a[4],n=yn(a[1]),r=yn(a[2])-1,o=yn(a[3]),c=yn(a[4]),h=yn(a[5])-1;if(i)return Id(e,c,h)?Td(e,c,h):new Date(NaN);var u=new Date(0);return!Nd(e,r,o)||!Bd(e,n)?new Date(NaN):(u.setUTCFullYear(e,r,Math.max(n,o)),u)}function yn(t){return t?parseInt(t):1}function Dd(t){var e=t.match(kd);if(!e)return NaN;var a=Za(e[1]),i=Za(e[2]),n=Za(e[3]);return Fd(a,i,n)?a*ja+i*Va+n*1e3:NaN}function Za(t){return t&&parseFloat(t.replace(",","."))||0}function Md(t){if(t==="Z")return 0;var e=t.match(_d);if(!e)return 0;var a=e[1]==="+"?-1:1,i=parseInt(e[2]),n=e[3]&&parseInt(e[3])||0;return zd(i,n)?a*(i*ja+n*Va):NaN}function Td(t,e,a){var i=new Date(0);i.setUTCFullYear(t,0,4);var n=i.getUTCDay()||7,r=(e-1)*7+a+1-n;return i.setUTCDate(i.getUTCDate()+r),i}var Ad=[31,null,31,30,31,30,31,31,30,31,30,31];function Rr(t){return t%400===0||t%4===0&&t%100!==0}function Nd(t,e,a){return e>=0&&e<=11&&a>=1&&a<=(Ad[e]||(Rr(t)?29:28))}function Bd(t,e){return e>=1&&e<=(Rr(t)?366:365)}function Id(t,e,a){return e>=1&&e<=53&&a>=0&&a<=6}function Fd(t,e,a){return t===24?e===0&&a===0:a>=0&&a<60&&e>=0&&e<60&&t>=0&&t<25}function zd(t,e){return e>=0&&e<=59}function Hd(t,e){R(2,arguments);var a=at(e);return Ra(t,-a)}function Rd(t,e){R(2,arguments);var a=at(e);return $r(t,-a)}const Yn="EEE d MMM, yyyy",Xa="EEE d MMM K:mm aa, yyyy";function Yt(t,e){let a;try{e?a=Cd(t,e,new Date):a=xd(t)}catch{return}return a}function je(t,e=Yn){try{return ht(t,e)}catch{return}}function Vd(t,e){let a;const i=Yt(e==null?void 0:e[t.field],t.parseFormat);return i&&(a=je(i,Yn)),a||(a=d`
      <adgm-flex gap="s4" direction="row" align="center" _dd>
        <adgm-icon
          icon="warning"
          size="s12"
          color="clearsky100"
          _dd
        ></adgm-icon>
        <adgm-text variant="textXS" color="clearsky100" _dd>
          Could not parse date
        </adgm-text>
      </adgm-flex>
    `),d`
    <adgm-table-cell no-wrap align=${(t==null?void 0:t.align)??P}>
      ${y(e==null?void 0:e[t.field],()=>d`${a}`)}
    </adgm-table-cell>
  `}function jd(t,e){let a=(e==null?void 0:e[t.field])??"";return Ct(a)&&a.length>0&&(t.arrayAs==="list"?a=d`
        <ul>
          ${a.map(i=>d`<li>${i}</li>`)}
        </ul>
      `:a=a.join(", ")),d`
    <adgm-table-cell
      align=${(t==null?void 0:t.align)??P}
      overflow-clamp=${(t==null?void 0:t.overflowClamp)??P}
    >
      ${a}
    </adgm-table-cell>
  `}function Ud(t,e){let a;const i=Yt(e==null?void 0:e[t.field],t.parseFormat);return i&&(a=je(i,Xa)),a||(a=d`
      <adgm-flex gap="s4" direction="row" align="center" _dd>
        <adgm-icon
          icon="warning"
          size="s12"
          color="clearsky100"
          _dd
        ></adgm-icon>
        <adgm-text variant="textXS" color="clearsky100" _dd>
          Could not parse date
        </adgm-text>
      </adgm-flex>
    `),d`
    <adgm-table-cell no-wrap align=${(t==null?void 0:t.align)??P}>
      ${y(e==null?void 0:e[t.field],()=>d`${a}`)}
    </adgm-table-cell>
  `}function Gd(t,e){let a=(e==null?void 0:e[(t==null?void 0:t.anchorField)??""])??(e!=null&&e[t.field]?e==null?void 0:e[t.field]:"");return ga(a)&&(a=`mailto:${a}`),d`
    <adgm-table-cell
      href=${a??P}
      target="_blank"
      align=${(t==null?void 0:t.align)??P}
    >
      ${e!=null&&e[t.field]?e==null?void 0:e[t.field]:""}
    </adgm-table-cell>
  `}function Wd(t,e){let a="externalLink",i="Link",n=e!=null&&e[(t==null?void 0:t.anchorField)??""]||e!=null&&e[t.field]?e==null?void 0:e[t.field]:"";return ga(n)?(n=`mailto:${n}`,i="email"):bo(n)&&(i="PDF",a="downloadPdf"),d`
    <adgm-table-cell align=${(t==null?void 0:t.align)??P}>
      <adgm-link-button
        href=${n}
        icon=${a}
        target="_blank"
        size="xs"
        variant="secondary"
        _dd
      >
        ${i}
      </adgm-link-button>
    </adgm-table-cell>
  `}function qd(t,e){return d`
    <adgm-text-input
      placeholder=${(e==null?void 0:e.placeholder)??"Search"}
      name="filter.${t}"
      _dd
    >
      <adgm-icon icon="search" slot="post" _dd></adgm-icon>
    </adgm-text-input>
  `}function Yd(t,e){return t.filter(a=>{let i=!1;return Object.values(a).forEach(n=>{if(i||!n)return;n.toString().toLowerCase().indexOf(e.toLowerCase())>=0&&(i=!0)}),i})}function Kd(t,e,a){return d`
    <adgm-checkbox-dropdown
      name="filter.${t}"
      placeholder=${e==null?void 0:e.placeholder}
      clear
      _dd
    >
      ${a.map(i=>d`
            <adgm-checkbox label=${i} name=${i} skip></adgm-checkbox>
          `)}
    </adgm-checkbox-dropdown>
  `}function Zd(t,e,a){return Ct(a)&&a.forEach(i=>{t=t.filter(n=>n!=null&&n[e]&&Ct(n==null?void 0:n[e])?n[e].includes(i):!1)}),t}function Xd(t,e,a){return d`
    <adgm-dropdown
      name="filter.${t}"
      placeholder=${e.placeholder}
      clear
      _dd
    >
      ${a.map(([i,n])=>d`
            <adgm-dropdown-option value=${i}>
              ${n}
            </adgm-dropdown-option>
          `)}
    </adgm-dropdown>
  `}function Qd(t,e,a){return t.filter(i=>(i==null?void 0:i[e])===a)}function Jd(t){return d`
    <div class="date-range">
      <adgm-date-input
        name="filter.${t}.from"
        popup-align="right"
        placeholder="From"
        date-format="d MMM yyyy"
        clear
        _dd
      ></adgm-date-input>
      <adgm-date-input
        name="filter.${t}.to"
        placeholder="To"
        popup-align="right"
        date-format="d MMM yyyy"
        clear
        _dd
      ></adgm-date-input>
    </div>
  `}function t1(t,e,a,i){const n=a;let r;n.from&&(r=new Date(n.from));let o;return n.to&&(o=new Date(n.to)),r||o?t.filter(c=>{if(!(c!=null&&c[e]))return!1;let h=!0;const u=Yt(c==null?void 0:c[e],i);return u?(r&&jn(u,r)<0&&(h=!1),o&&jn(u,o)>0&&(h=!1),h):!1}):t}function e1(t,e,a){return t.sort((i,n)=>{const r=nn(i[e])?`${i[e]}`:i[e],o=nn(n[e])?`${n[e]}`:n[e];return Xt(r)&&Xt(o)?a==="asc"?r.localeCompare(o):o.localeCompare(r):0})}function n1(t,e,a){return t.sort((i,n)=>nn(i[e])&&nn(n[e])?a==="asc"?i[e]-n[e]:n[e]-i[e]:0)}function a1(t,e,a,i){return t.sort((n,r)=>{if(Xt(n[e])&&Xt(r[e])){const o=Yt(n[e],i),c=Yt(r[e],i);return o?c?a==="asc"?jn(c,o):jn(o,c):(console.warn("[applyDateSorting] Could not parse",c),1):(console.warn("[applyDateSorting] Could not parse",o),-1)}else console.warn("[applyDateSorting] Incorrect compare",n[e],r[e]);return 0})}var i1=Object.defineProperty,r1=Object.getOwnPropertyDescriptor,gt=(t,e,a,i)=>{for(var n=i>1?void 0:i?r1(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&i1(e,a,n),n};const Vr={sortingOptions:{},filterOptions:{},perPageOptions:[10,20,50]};s.EntityOverview=class extends E{constructor(){super(),this.isDebugMode=!1,this.overflowScroll=!1,this.clearAllFilters=!1,this.mode="display",this.minWidth="auto",this.cellVerticalAlign="middle",this.config=Vr,this.isLoading=!0,this.currentPage=1,this.itemsPerPage=10,this.filteredResultsTotal=0,this.onExportClick=()=>{var a,i;const e=[[]];(((a=this.config.table)==null?void 0:a.headers)??[]).forEach(n=>e[0].push(n.label)),(i=this.data)==null||i.items.forEach(n=>{var o;const r=[];(o=this.config.table)==null||o.columns.map(c=>{if(n[c.field]){let h=n[c.field];Ct(h)&&(h=h.join(", ")),r.push(`${h}`)}else r.push("")}),e.push(r)}),wo("export",e)},this.uuid=Ot()}connectedCallback(){super.connectedCallback(),this.debug("[EntityOverview.connectedCallback]")}firstUpdated(){dt(()=>this.load(),500,`entityOverview${this.uuid}`)}load(){if(!this.src){this.error="Please add a src attribute pointing to the JSON file",console.error("Please add a src attribute pointing to the JSON file");return}this.debug("[EntityOverview.load]"),fetch(this.src).then(e=>{if(!e.ok)throw new Error(`HTTP error. Status: ${e.status}`);return e.json()}).then(e=>{this.isDataValid(e)?(this.debug("[EntityOverview.load] Success",e),this.isLoading=!1,this.initializeData(e)):(console.error("JSON format is incorrect",e),this.isLoading=!1,this.error="Failed to load data.")}).catch(e=>{console.error(e),this.isLoading=!1,this.error="Failed to load data."})}disconnectedCallback(){Mn(`entityOverview${this.uuid}`),super.disconnectedCallback()}initializeData(e){var a,i;this.debug("[EntityOverview.initializeData]",e),this.data=e,e.config&&(this.config=e.config,this.itemsPerPage=((i=(a=e.config)==null?void 0:a.perPageOptions)==null?void 0:i[0])??10)}render(){var i;this.debug("[EntityOverview.render]",this);const e=this.getPaginatedResults(),a=!!this.querySelector('[slot="filtersPost"]');return d`
      ${this.renderDebug("adgm-entity-overview")}
      ${this.error?this.renderError():this.isLoading?this.renderLoading():d`
            ${this.renderFilterProvider()}
            ${y(a,()=>d`<slot name="filtersPost"></slot>`)}
            <adgm-spacer height="rBodyL" _dd></adgm-spacer>
            ${this.filteredResultsTotal===0||((i=this.data)==null?void 0:i.items.length)===0?this.renderEmpty():d`${this.renderResults(e)} ${this.renderPagination()}`}
          `}
    `}renderError(){return d`
      <adgm-message variant="error" _dd>
        <adgm-text weight="600" variant="textS">Error</adgm-text>
        <adgm-text weight="400" variant="textS">${this.error}</adgm-text>
      </adgm-message>
    `}renderLoading(){return d`
      <adgm-placeholder style="height: 56px"></adgm-placeholder>
      <adgm-spacer height="rBodyS" _dd></adgm-spacer>
      <adgm-placeholder style="height: 56px"></adgm-placeholder>
      <adgm-spacer height="rBodyL" _dd></adgm-spacer>

      <adgm-overview-grid variant="four" style="--overview-row-gap: 20px;" _dd>
        <adgm-placeholder style="height: 60px"></adgm-placeholder>
        <adgm-placeholder style="height: 60px"></adgm-placeholder>
        <adgm-placeholder style="height: 60px"></adgm-placeholder>
        <adgm-placeholder style="height: 60px"></adgm-placeholder>

        <adgm-placeholder style="height: 40px"></adgm-placeholder>
        <adgm-placeholder style="height: 40px"></adgm-placeholder>
        <adgm-placeholder style="height: 40px"></adgm-placeholder>
        <adgm-placeholder style="height: 40px"></adgm-placeholder>

        <adgm-placeholder style="height: 40px"></adgm-placeholder>
        <adgm-placeholder style="height: 40px"></adgm-placeholder>
        <adgm-placeholder style="height: 40px"></adgm-placeholder>
        <adgm-placeholder style="height: 40px"></adgm-placeholder>
      </adgm-overview-grid>
    `}renderFilterProvider(){var i,n;const e=Object.entries(this.config.sortingOptions),a=!!this.querySelector("[slot=filtersResult]");return d`
      <adgm-filter-provider
        total-results=${this.filteredResultsTotal}
        variant=${this.filterVariant||P}
        filter-count=${Object.keys(this.config.filterOptions??{}).length}
        ?clear-all=${this.clearAllFilters}
        @change=${this.onFiltersChange}
        items-per-page=${this.itemsPerPage}
        current-page=${this.currentPage}
        _dd
      >
        ${y(a,()=>d`<slot name="filtersResult" slot="results"></slot>`)}
        ${Object.entries(((i=this.config)==null?void 0:i.filterOptions)??{}).map(([r,o])=>yr(o.type,[["search",()=>qd(r,o)],["includes",()=>Kd(r,o,this.getFilterIncludeOptions(r))],["compare",()=>Xd(r,o,this.getFilterCompareOptions(r,o))],["dateRange",()=>Jd(r)]]))}
        ${y(e.length>0,()=>d`
            <adgm-dropdown
              slot="sorting"
              name="sorting.sort_by"
              placeholder="Sort by"
              pre="Sort by:"
              variant="tertiary"
              size="s"
              popup-width="auto"
              value=${this.config.defaultSorting||P}
              popup-align="right"
              _dd
            >
              ${e.map(([r,o])=>["asc","desc"].map(c=>{var h;return d`
                    <adgm-dropdown-option value=${`${r}#${c}`}>
                      ${(h=o==null?void 0:o.label)==null?void 0:h[c]}
                    </adgm-dropdown-option>
                  `}))}
            </adgm-dropdown>
          `)}
        ${y(this.config.perPageOptions&&this.config.perPageOptions.length>1,()=>d`
            <adgm-dropdown
              class="per-page"
              slot="sorting"
              name="sorting.per_page"
              pre="Results per page:"
              placeholder="Results per page"
              variant="tertiary"
              size="s"
              value=${this.config.perPageOptions[0]}
              popup-width="90px"
              popup-align="right"
              _dd
            >
              ${this.config.perPageOptions.map(r=>d`
                  <adgm-dropdown-option value=${r} align="center">
                    ${r}
                  </adgm-dropdown-option>
                `)}
            </adgm-dropdown>
          `)}
        ${y((n=this.config)==null?void 0:n.csvExport,()=>d`
              <adgm-button @click=${this.onExportClick} icon="download" _dd>
                <adgm-visibility hide="m">CSV</adgm-visibility>
                <adgm-visibility show="m">Export to CSV</adgm-visibility>
              </adgm-button>
            `)}
      </adgm-filter-provider>
    `}renderResults(e){var a;return d`
      <adgm-table
        mode="display"
        overflow-scroll=${this.overflowScroll}
        mode=${this.mode}
        min-width=${this.minWidth}
        cell-vertical-align=${this.cellVerticalAlign}
        _dd
      >
        <adgm-table-row>
          ${(((a=this.config.table)==null?void 0:a.headers)??[]).map(i=>d`
                <adgm-table-header-cell align=${(i==null?void 0:i.align)??P}>
                  ${i.label}
                </adgm-table-header-cell>
              `)}
        </adgm-table-row>

        ${e.map(i=>{var n;return d`
            <adgm-table-row>
              ${(n=this.config.table)==null?void 0:n.columns.map(r=>yr(r.type??"default",[["default",()=>jd(r,i)],["date",()=>Vd(r,i)],["dateTime",()=>Ud(r,i)],["anchor",()=>Gd(r,i)],["link",()=>Wd(r,i)]],()=>d`
                    <adgm-table-cell align=${(r==null?void 0:r.align)??P}>
                      [missing:${r.type}]
                    </adgm-table-cell>
                  `))}
            </adgm-table-row>
          `})}
      </adgm-table>
    `}renderEmpty(){var e;return d`
      <adgm-message variant="info" _dd>
        <adgm-text weight="600" variant="textS">Nothing found</adgm-text>
        <adgm-text weight="400" variant="textS">
          No results were found.
          ${(e=this.currentFilters)!=null&&e.filter?"Please adjust your filters.":""}
        </adgm-text>
      </adgm-message>
    `}renderPagination(){return d`
      <adgm-pagination
        current-page=${this.currentPage}
        total-items=${this.filteredResultsTotal??0}
        items-per-page=${this.itemsPerPage}
        @change=${this.onPageChange}
        _dd
      >
        <adgm-spacer height="rBodyL" _dd></adgm-spacer>
      </adgm-pagination>
    `}onPageChange(e){this.currentPage=e.detail.page,this.debug("[EntityOverview.onPageChange]",this.currentPage),rn(this.filterProviderElement)}onFiltersChange(e){var a,i,n,r;this.currentFilters=e.detail.values,this.currentPage=1,this.debug("[EntityOverview.onFiltersChange]",this.currentFilters),(i=(a=this.currentFilters)==null?void 0:a.sorting)!=null&&i.per_page&&(this.itemsPerPage=Number(((r=(n=this.currentFilters)==null?void 0:n.sorting)==null?void 0:r.per_page)??10))}isDataValid(e){return!(!e||!Dn(e)||!e.items||!Ct(e.items))}getFilteredAndSortedResults(){var c,h,u,m,f,$;let e=((c=this.data)==null?void 0:c.items)??[];this.currentFilters&&Dn(this.currentFilters.filter)&&Object.entries(this.currentFilters.filter).forEach(([x,M])=>{var V;if(!(!this.config.filterOptions[x]||!M))switch(this.config.filterOptions[x].type){case"compare":e=Qd(e,x,M);break;case"includes":e=Zd(e,x,M);break;case"search":e=Yd(e,M);break;case"dateRange":const N=(V=this.getColumnByField(x))==null?void 0:V.parseFormat;e=t1(e,x,M,N);break;default:console.warn(`Date range filter '${this.config.filterOptions[x].type}' unknown`)}}),this.filteredResultsTotal=e.length;const a=((u=(h=this.currentFilters)==null?void 0:h.sorting)==null?void 0:u.sort_by)??this.config.defaultSorting;if(!a)return e;const[i,n]=a.split("#"),r=n,o=(f=(m=this.config.sortingOptions)==null?void 0:m[i])==null?void 0:f.type;if(!o||!i||!n)return e;switch(o){case"alpha":e=e1(e,i,r);break;case"numeric":e=n1(e,i,r);break;case"date":const x=($=this.getColumnByField(i))==null?void 0:$.parseFormat;e=a1(e,i,r,x);break;default:console.warn(`Sorting type '${o}' unknown`)}return e}getColumnByField(e){var i;let a;return(i=this.config.table)==null||i.columns.forEach(n=>{n.field===e&&(a=n)}),a}getPaginatedResults(){const e=(this.currentPage-1)*this.itemsPerPage,a=e+this.itemsPerPage;return this.getFilteredAndSortedResults().slice(e,a)}getFilterIncludeOptions(e){var i;const a=[];return(i=this.data)==null||i.items.forEach(n=>{n!=null&&n[e]&&Ct(n==null?void 0:n[e])&&(n==null?void 0:n[e]).forEach(r=>{a.includes(r)||a.push(r)})}),a}getFilterCompareOptions(e,a){var r;const i=[],n=[];return(r=this.data)==null||r.items.forEach(o=>{if(o[e]&&Xt(o[e])&&!i.includes(o[e])){const c=o[e];let h=c;if(a.labelTranform)switch(a.labelTranform){case"languageCode":h=this.getLanguageLabel(c);break}i.push(c),n.push([c,h])}}),n}debug(...e){this.isDebugMode&&T(()=>console.log(...e))}getLanguageLabel(e){return(Ha==null?void 0:Ha[e].nativeName)??e}},s.EntityOverview.styles=[ul],gt([O({context:Rn,subscribe:!0}),l({attribute:!1})],s.EntityOverview.prototype,"isDebugMode",2),gt([l({type:String})],s.EntityOverview.prototype,"src",2),gt([l({type:String,attribute:"filter-variant"})],s.EntityOverview.prototype,"filterVariant",2),gt([l({type:Boolean,attribute:"overflow-scroll"})],s.EntityOverview.prototype,"overflowScroll",2),gt([l({type:Boolean,attribute:"clear-all-filters"})],s.EntityOverview.prototype,"clearAllFilters",2),gt([l({type:String})],s.EntityOverview.prototype,"mode",2),gt([l({type:String,attribute:"min-width"})],s.EntityOverview.prototype,"minWidth",2),gt([l({type:String,attribute:"cell-vertical-align"})],s.EntityOverview.prototype,"cellVerticalAlign",2),gt([w()],s.EntityOverview.prototype,"config",2),gt([w()],s.EntityOverview.prototype,"isLoading",2),gt([w()],s.EntityOverview.prototype,"error",2),gt([w()],s.EntityOverview.prototype,"data",2),gt([w()],s.EntityOverview.prototype,"currentPage",2),gt([w()],s.EntityOverview.prototype,"itemsPerPage",2),gt([w()],s.EntityOverview.prototype,"currentFilters",2),gt([w()],s.EntityOverview.prototype,"filteredResultsTotal",2),gt([q(".per-page")],s.EntityOverview.prototype,"perPageDropdownElement",2),gt([q("adgm-filter-provider")],s.EntityOverview.prototype,"filterProviderElement",2),s.EntityOverview=gt([b("adgm-entity-overview")],s.EntityOverview);const o1=g`
  ${({theme:t})=>t.enclosedParse("adgm-calendar-event-card",{padding:p({m:`0 ${t.spacings.s24}`})})}
`;var s1=Object.defineProperty,l1=Object.getOwnPropertyDescriptor,Kn=(t,e,a,i)=>{for(var n=i>1?void 0:i?l1(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&s1(e,a,n),n};s.HearingsOverview=class extends s.EntityOverview{constructor(){super(...arguments),this.variant="tabular",this.currentFilters={sorting:{view:"year"}},this.date=new Date}renderResults(e){return y(this.variant==="tabular",()=>this.renderTabularResults(e),()=>this.renderCalendarResults(e))}renderFilterProvider(){return y(this.variant==="tabular",()=>super.renderFilterProvider(),()=>{var a,i;const e=!!this.querySelector('[slot="filtersResult"]');return d`
          <adgm-filter-provider
            total-results=${this.filteredResultsTotal}
            @change=${this.onFiltersChange}
          >
            ${e?d`<slot name="filtersResult" slot="results"></slot>`:""}

            <adgm-dropdown
              slot="sorting"
              name="sorting.view"
              placeholder="View per"
              pre="View per"
              variant="tertiary"
              size="s"
              popup-width="auto"
              value=${(i=(a=this.currentFilters)==null?void 0:a.sorting)==null?void 0:i.view}
              popup-align="right"
            >
              <adgm-dropdown-option value="year">year</adgm-dropdown-option>
              <adgm-dropdown-option value="month">month</adgm-dropdown-option>
            </adgm-dropdown>
          </adgm-filter-provider>
        `})}renderTabularResults(e){return d`
      <adgm-table mode="display">
        <adgm-table-row>
          <adgm-table-header-cell>
            Date, time, case number
          </adgm-table-header-cell>
          <adgm-table-header-cell>Event type</adgm-table-header-cell>
          <adgm-table-header-cell>Parties</adgm-table-header-cell>
          <adgm-table-header-cell>Location</adgm-table-header-cell>
          <adgm-table-header-cell>Judge</adgm-table-header-cell>
        </adgm-table-row>

        ${e.map(a=>{let i="";if(a.date_time){const n=Yt(a.date_time);n&&(i=je(n,Xa)??a.date_time)}return d`
            <adgm-table-row>
              <adgm-table-cell no-wrap>
                <b>${i}</b><br />
                ${a==null?void 0:a.case_number}
              </adgm-table-cell>
              <adgm-table-cell>
                ${y(a.type,()=>d`
                    ${Ct(a.type)?a.type.join(", "):a.type}
                  `)}
              </adgm-table-cell>
              <adgm-table-cell>${a.parties}</adgm-table-cell>
              <adgm-table-cell>
                ${a==null?void 0:a.location}
                ${y(a.location&&a.live_url,()=>d`<br />`)}
                ${y(a.live_url,()=>d`
                    <a href=${a.live_url} target="_blank">
                      View live hearing
                    </a>
                  `)}
              </adgm-table-cell>
              <adgm-table-cell min-width="150px">
                <b>${a==null?void 0:a.judge}</b>
              </adgm-table-cell>
              ${this.renderEventCard(a,!0)}
            </adgm-table-row>
          `})}
      </adgm-table>
    `}renderEventCard(e,a=!1){let i="",n="";if(e.date_time){const r=Yt(e.date_time);r&&(i=je(r,"d MMM, yyyy")??"",n=je(r,"EEEE K:mm aa")??"")}return d`
      <adgm-calendar-event-card
        slot=${a?"s":P}
        date=${i}
        day-time=${n}
        href=${e.live_url||P}
      >
        ${y(e.type&&Ct(e.type)&&e.type.length>0,()=>{var r;return d`
              <adgm-calendar-event-card-row title="Event type">
                ${(r=e.type)==null?void 0:r.join(", ")}
              </adgm-calendar-event-card-row>
            `})}
        ${y(e.case_number,()=>d`
            <adgm-calendar-event-card-row title="Case number">
              ${e.case_number}
            </adgm-calendar-event-card-row>
          `)}
        ${y(e.parties,()=>d`
              <adgm-calendar-event-card-row title="Parties">
                ${e.parties}
              </adgm-calendar-event-card-row>
            `)}
        ${y(e.judge,()=>d`
            <adgm-calendar-event-card-row title="Judge">
              ${e.judge}
            </adgm-calendar-event-card-row>
          `)}
      </adgm-calendar-event-card>
    `}renderCalendar(){var e,a;return d`
      <adgm-hr color="darksky20"></adgm-hr>
      <adgm-spacer height="s20"></adgm-spacer>
      <adgm-calendar
        date=${ht(this.date,"yyyy-MM-dd")}
        variant=${(a=(e=this.currentFilters)==null?void 0:e.sorting)==null?void 0:a.view}
        highlights=${this.getCalendarHighlights()||P}
        @day-select=${this.onDaySelect}
        @month-select=${this.onMonthSelect}
      ></adgm-calendar>
      <adgm-spacer height="s32"></adgm-spacer>
      <adgm-hr color="darksky20"></adgm-hr>
    `}renderCalendarResults(e){return d`
      <adgm-presentation-grid variant="fiveSeven">
        <div>${this.renderCalendar()}</div>
        <adgm-flex gap="rBodyM">
          ${e.map(a=>d`${this.renderEventCard(a)}<adgm-hr></adgm-hr>`)}
        </adgm-flex>
      </adgm-presentation-grid>
    `}onDaySelect(e){this.date=e.detail.date}onMonthSelect(e){this.date=e.detail.date}getCalendarHighlights(){var a;const e={};return((a=this.data)==null?void 0:a.items).forEach(i=>{var r,o,c,h,u;if(!i.date_time)return;const n=new Date(i.date_time);((o=(r=this.currentFilters)==null?void 0:r.sorting)==null?void 0:o.view)==="month"&&n.getMonth()===this.date.getMonth()&&n.getFullYear()===this.date.getFullYear()?e[ht(n,"yyyy-MM-dd")]={date:ht(n,"yyyy-MM-dd")}:((h=(c=this.currentFilters)==null?void 0:c.sorting)==null?void 0:h.view)==="year"&&n.getFullYear()===this.date.getFullYear()&&(e[ht(n,"yyyy-MM")]?e[ht(n,"yyyy-MM")].count=(((u=e==null?void 0:e[ht(n,"yyyy-MM")])==null?void 0:u.count)??0)+1:e[ht(n,"yyyy-MM")]={date:ht(n,"yyyy-MM"),count:1})}),JSON.stringify(Object.values(e))}getFilteredAndSortedResults(){let e=super.getFilteredAndSortedResults();return this.variant==="tabular"||(e=e.filter(a=>{var n,r,o,c;if(!a.date_time)return!1;const i=new Date(a.date_time);return((r=(n=this.currentFilters)==null?void 0:n.sorting)==null?void 0:r.view)==="month"&&i.getMonth()===this.date.getMonth()&&i.getFullYear()===this.date.getFullYear()&&i.getDay()===this.date.getDay()?!0:((c=(o=this.currentFilters)==null?void 0:o.sorting)==null?void 0:c.view)==="year"&&i.getMonth()===this.date.getMonth()&&i.getFullYear()===this.date.getFullYear()}),this.filteredResultsTotal=e.length),e}renderEmpty(){var e,a;return this.variant==="calendar"?d`
          <adgm-presentation-grid variant="fiveSeven">
            <div>${this.renderCalendar()}</div>
            <div>
              <adgm-message variant="info">
                <adgm-text weight="600" variant="textS">
                  Nothing found
                </adgm-text>
                <adgm-text weight="400" variant="textS">
                  No events were found for
                  ${ht(this.date,((a=(e=this.currentFilters)==null?void 0:e.sorting)==null?void 0:a.view)==="month"?Yn:"MMM, yyyy")}.
                </adgm-text>
              </adgm-message>
            </div>
          </adgm-presentation-grid>
        `:super.renderEmpty()}},s.HearingsOverview.styles=[...s.EntityOverview.styles,o1],Kn([l({type:String})],s.HearingsOverview.prototype,"variant",2),Kn([w()],s.HearingsOverview.prototype,"currentFilters",2),Kn([w()],s.HearingsOverview.prototype,"date",2),s.HearingsOverview=Kn([b("adgm-hearings-overview")],s.HearingsOverview);var c1=Object.defineProperty,d1=Object.getOwnPropertyDescriptor,h1=(t,e,a,i)=>{for(var n=i>1?void 0:i?d1(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&c1(e,a,n),n};s.EventsOverview=class extends s.EntityOverview{renderResults(e){return d`
      <adgm-overview-grid variant="four" content-align='[".title",".body"]'>
        ${e.map(a=>{let i="";if(a.date_time){const n=Yt(a.date_time);n&&(i=je(n,Xa)??a.date_time)}return d`
            <adgm-article-card variant="vertical" href=${a.url||P}>
              <adgm-image
                slot="image"
                src=${a.image||P}
                alt=${a.title}
              ></adgm-image>
              <adgm-text variant="textS" weight="600" class="title" clamp="3">
                <h3>${a.title}</h3>
              </adgm-text>
              <adgm-spacer height="rBodyS"></adgm-spacer>
              <adgm-flex direction="column" gap="s4" class="body">
                ${y(a.type&&Ct(a.type)&&a.type.length>0,()=>d`
                    <adgm-flex direction="row" align="center" gap="s12">
                      <adgm-icon
                        icon="tagThick"
                        size="s12"
                        color="black100"
                      ></adgm-icon>
                      <adgm-text
                        variant="textXS"
                        weight="400"
                        color="black100"
                        ellipsis
                      >
                        ${a.type.join(", ")}
                      </adgm-text>
                    </adgm-flex>
                  `)}
                ${y(a.date_time,()=>d`
                    <adgm-flex direction="row" align="center" gap="s12">
                      <adgm-icon
                        icon="calendarThick"
                        size="s12"
                        color="black100"
                      ></adgm-icon>
                      <adgm-text
                        variant="textXS"
                        weight="400"
                        color="black100"
                        ellipsis
                      >
                        ${i}
                      </adgm-text>
                    </adgm-flex>
                  `)}
                <adgm-flex direction="row" align="center" gap="s12">
                  <adgm-icon
                    icon="pinThick"
                    size="s12"
                    color="black100"
                    ellipsis
                  ></adgm-icon>
                  <adgm-text
                    variant="textXS"
                    weight="400"
                    color="black100"
                    ellipsis
                  >
                    ${a.location}
                  </adgm-text>
                </adgm-flex>
              </agm-flex>
            </adgm-article-card>
          `})}
      </adgm-overview-grid>
    `}},s.EventsOverview.styles=[...s.EntityOverview.styles],s.EventsOverview=h1([b("adgm-events-overview")],s.EventsOverview);const u1=g`
  :host {
    display: block;
  }

  .sorting-container {
    display: flex;
    padding: ${({theme:t})=>t.spacings.rBodyXS};
    gap: ${({theme:t})=>t.spacings.rBodyXS};
    background-color: ${({theme:t})=>t.colors.steelgrey20};
    align-items: center;
    flex-wrap: wrap;
  }

  ${({theme:t})=>t.enclosedParse(".sorting-container",{justifyContent:p({base:"flex-end",m:"space-between"})})}

  ::slotted(adgm-text-input),
  ::slotted(adgm-text-dropdown),
  ::slotted(adgm-checkbox-dropdown),
  ::slotted(adgm-date-input) {
    flex-grow: 1;
  }

  ::slotted(.date-range) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: ${({theme:t})=>t.spacings.s8};
  }

  .sorting {
    display: flex;
    gap: ${({theme:t})=>t.spacings.rBodyXS};
    flex-wrap: wrap;
  }

  adgm-grid ::slotted(*) {
    grid-column: span 4 / auto;
  }

  adgm-grid {
    row-gap: ${({theme:t})=>t.spacings.s8};
  }

  adgm-grid.--filter-count-4 ::slotted(*),
  adgm-grid.--filter-count-2 ::slotted(*) {
    grid-column: span 6 / auto;
  }

  .results-container {
    display: flex;
    gap: ${({theme:t})=>t.spacings.rBodyXS};
    align-items: center;
  }

  ${({theme:t})=>t.enclosedParse(".results-container",{justifyContent:p({base:"space-between",m:"inherit"}),width:p({base:"100%",m:"inherit"})})}
`;var p1=Object.defineProperty,g1=Object.getOwnPropertyDescriptor,te=(t,e,a,i)=>{for(var n=i>1?void 0:i?g1(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&p1(e,a,n),n};s.FilterProvider=class extends L{constructor(){super(...arguments),this.form={submit:$i,registerInput:e=>this.registerInput(e),updateInput:()=>this.updateInput(),focusInput:$i},this.variant="grid",this.clearAll=!1,this.filterCount=1,this.inputs=[],this.anyFilterActive=!1,this.dispatchChange=()=>{const e=this.getValues();this.anyFilterActive=Object.keys((e==null?void 0:e.filter)??{}).length>0,this.dispatchEvent(new CustomEvent("change",{detail:{values:e},bubbles:!0,composed:!0}))},this.onClearAll=e=>{e.preventDefault(),this.clear()}}render(){const e=(this.itemsPerPage??10)*((this.currentPage??1)-1)+1;let a=(this.itemsPerPage??10)*(this.currentPage??1);return this.totalResults!==void 0&&a>this.totalResults&&(a=this.totalResults),d`
      ${y(this.variant==="grid",()=>d`
          <adgm-grid class="--filter-count-${this.filterCount}">
            <slot></slot>
          </adgm-grid>
        `,()=>d`
            <adgm-flex direction="row" gap="rGridGap" _dd>
              <slot></slot>
            </adgm-flex>
          `)}
      <adgm-spacer height="rBodyM" _dd></adgm-spacer>
      <div class="sorting-container">
        <slot name="results" class="results-container">
          <adgm-text variant="textS" class="results" weight="600" _dd>
            ${y(this.totalResults,()=>y(this.itemsPerPage===void 0||this.currentPage===void 0,()=>d`
                  ${this.totalResults}
                  result${this.totalResults!==1?"s":""} found
                `,()=>d`
                  Showing ${e}-${a} of ${this.totalResults}
                  result${this.totalResults!==1?"s":""}
                `))}
          </adgm-text>
          ${y(this.clearAll&&this.anyFilterActive,()=>d`
              <adgm-link-button
                size="s"
                icon="close"
                @click=${this.onClearAll}
                weight="400"
                href
                _dd
              >
                Clear all filters
              </adgm-link-button>
            `)}
        </slot>
        <div class="sorting">
          <slot name="sorting"></slot>
        </div>
      </div>
    `}clear(){this.querySelectorAll("adgm-text-input, adgm-dropdown, adgm-checkbox-dropdown, adgm-date-input").forEach(e=>e.clear())}registerInput(e){this.inputs.push(e)}updateInput(){dt(this.dispatchChange,200,"filterChange")}getValues(){const e={};return this.inputs.forEach(a=>{a.getName()&&a.getValue()&&(e[a.getName()]=a.getValue())}),Ao(e)}},s.FilterProvider.styles=[_,u1],te([vt({context:He}),l({attribute:!1})],s.FilterProvider.prototype,"form",2),te([l({type:String})],s.FilterProvider.prototype,"variant",2),te([l({type:Number,attribute:"total-results"})],s.FilterProvider.prototype,"totalResults",2),te([l({type:Boolean,attribute:"clear-all"})],s.FilterProvider.prototype,"clearAll",2),te([l({type:Number,attribute:"filter-count"})],s.FilterProvider.prototype,"filterCount",2),te([l({type:Number,attribute:"items-per-page"})],s.FilterProvider.prototype,"itemsPerPage",2),te([l({type:Number,attribute:"current-page"})],s.FilterProvider.prototype,"currentPage",2),te([w()],s.FilterProvider.prototype,"inputs",2),te([w()],s.FilterProvider.prototype,"anyFilterActive",2),s.FilterProvider=te([b("adgm-filter-provider")],s.FilterProvider);var m1=Object.defineProperty,v1=Object.getOwnPropertyDescriptor,f1=(t,e,a,i)=>{for(var n=i>1?void 0:i?v1(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&m1(e,a,n),n};s.PublicationOverview=class extends s.EntityOverview{renderResults(e){return d`
      <adgm-overview-grid variant="four" content-align='[".title"]'>
        ${e.map(a=>d`
            <adgm-publication-card
              name=${a.title}
              category=${a.category}
              href=${a.url||P}
            >
              <adgm-image
                src=${a.image||P}
                alt=${a.title}
              ></adgm-image>
            </adgm-publication-card>
          `)}
      </adgm-overview-grid>
    `}},s.PublicationOverview.styles=[...s.EntityOverview.styles],s.PublicationOverview=f1([b("adgm-publications-overview")],s.PublicationOverview);const y1=g`
  :host {
    display: block;
    position: relative;
  }

  .items {
    row-gap: var(--overview-row-gap, ${({theme:t})=>t.spacings.rBodyL});
  }

  .items ::slotted(*) {
    width: 100% !important;
  }

  ${({theme:t})=>t.enclosedParse(':host([variant="four"]) .items ::slotted(*)',{gridColumn:p({base:"span 1",s:"span 1",m:"span 4",l:"span 3"})})}

  ${({theme:t})=>t.enclosedParse(':host([variant="fourTwo"]) .items ::slotted(*)',{gridColumn:p({base:"span 1",s:"span 1",m:"span 4",l:"span 3"})})}

  ${({theme:t})=>t.enclosedParse(':host([variant="fourTwo"]) .items',{gridTemplateColumns:p({base:"1fr 1fr",s:"1fr 1fr",m:"repeat(12, 1fr)"})})}

  ${({theme:t})=>t.enclosedParse(':host([variant="two"]) .items ::slotted(*)',{gridColumn:p({base:"span 1",s:"span 1",m:"span 6"})})}

  ${({theme:t})=>t.enclosedParse(':host([variant="three"]) .items ::slotted(*)',{gridColumn:p({base:"span 1",s:"span 1",m:"span 4"})})}

  .overflow ::slotted(*) {
    scroll-snap-align: start;
    flex-shrink: 0;
    flex-grow: 0;
    width: 300px;
  }

  .overflow-content {
    display: flex;
    gap: ${({theme:t})=>t.spacings.rGridGap};
    padding: 0 ${({theme:t})=>t.spacings.rGridGap};
    margin: 0 calc(${({theme:t})=>t.spacings.rGridGap} * -1);
    flex-wrap: nowrap;

    overflow-x: scroll;
    -ms-overflow-style: none;
    scroll-behavior: smooth;
    scrollbar-width: none;
    scroll-snap-type: x mandatory;
    scroll-padding: ${({theme:t})=>t.spacings.rGridGap};
  }

  .overflow-content::-webkit-scrollbar {
    display: none;
  }
`,Zn="contentAlignment";var b1=Object.defineProperty,$1=Object.getOwnPropertyDescriptor,Qa=(t,e,a,i)=>{for(var n=i>1?void 0:i?$1(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&b1(e,a,n),n};class bn extends E{constructor(){super(...arguments),this.contentAlign=[],this.contentAlignment={registerElement:e=>this.registerAlignmentElement(e),deregisterElement:e=>this.deregisterAlignmentElement(e)},this.alignmentElements=[],this.onObservedMutation=()=>{this.alignElements()}}connectedCallback(){super.connectedCallback(),!(Ct(this.contentAlign)&&this.contentAlign.length===0||this.mutationObserver)&&(this.mutationObserver=new MutationObserver(De(this.onObservedMutation,50)),this.mutationObserver.observe(this,{childList:!0}))}disconnectedCallback(){var e;(e=this.mutationObserver)==null||e.disconnect(),super.disconnectedCallback()}registerAlignmentElement(e){Ct(this.contentAlign)&&this.contentAlign.length===0||this.alignmentElements.push(e)}deregisterAlignmentElement(e){if(Ct(this.contentAlign)&&this.contentAlign.length===0)return;const a=this.alignmentElements.indexOf(e);a>-1&&this.alignmentElements.splice(a,1)}alignElements(){Ct(this.contentAlign)&&this.contentAlign.length===0||(this.alignmentElements.forEach(e=>{(this.contentAlign??[]).forEach(a=>{const i=this.findChildBySelector(e,a);i&&(i.style.minHeight="")})}),T(()=>this.setAlignmentElementsHeight()))}setAlignmentElementsHeight(){const e={};this.alignmentElements.forEach(a=>{e[a.offsetTop]||(e[a.offsetTop]=[]),e[a.offsetTop].push(a)}),Object.values(e).forEach(a=>{const i={};a.forEach(n=>{(this.contentAlign??[]).forEach(r=>{i[r]||(i[r]=0);const o=this.findChildBySelector(n,r);o&&o.clientHeight>i[r]&&(i[r]=o.clientHeight)})}),a.forEach(n=>{(this.contentAlign??[]).forEach(r=>{const o=this.findChildBySelector(n,r);o&&(o.style.minHeight=`${i[r]}px`)})})})}findChildBySelector(e,a){var n;let i=e.querySelector(a);return i||(i=(n=e.shadowRoot)==null?void 0:n.querySelector(a)),i}}Qa([l({type:Array,attribute:"content-align"})],bn.prototype,"contentAlign",2),Qa([vt({context:Zn}),l({attribute:!1})],bn.prototype,"contentAlignment",2),Qa([w()],bn.prototype,"alignmentElements",2);var w1=Object.defineProperty,C1=Object.getOwnPropertyDescriptor,$n=(t,e,a,i)=>{for(var n=i>1?void 0:i?C1(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&w1(e,a,n),n};s.OverviewGrid=class extends bn{constructor(){super(...arguments),this.variant="four",this.contentAlign=[]}render(){var e;return T(()=>this.alignElements()),d`
      ${this.renderDebug("adgm-overview-grid",{description:this.variant,alwaysShow:!0,color:"#CCC"})}
      ${y(((e=this.currentBreakpoint)==null?void 0:e.state.m)||!this.scrollS,()=>d`
          <adgm-grid class="items">
            <slot></slot>
          </adgm-grid>
        `,()=>d`
          <div class="overflow">
            <div class="overflow-content">
              <slot></slot>
            </div>
          </div>
        `)}
    `}},s.OverviewGrid.styles=[_,y1],$n([l({type:String})],s.OverviewGrid.prototype,"variant",2),$n([l({type:Boolean,attribute:"scroll-s"})],s.OverviewGrid.prototype,"scrollS",2),$n([l({type:Array,attribute:"content-align"})],s.OverviewGrid.prototype,"contentAlign",2),$n([O({context:bt,subscribe:!0}),l({attribute:!1})],s.OverviewGrid.prototype,"currentBreakpoint",2),s.OverviewGrid=$n([b("adgm-overview-grid")],s.OverviewGrid);const S1=g`
  :host {
    display: block;
    position: relative;
  }

  .items ::slotted(*) {
    width: 100% !important;
  }

  adgm-grid {
    row-gap: var(
      --presentation-row-gap,
      ${({theme:t})=>t.spacings.rBodyL}
    );
  }
`,x1=g`
  ${({theme:t})=>t.enclosedParse(':host([variant="textImage"]) ::slotted(:nth-child(odd))',{gridColumn:p({base:"1 / span 1",s:"1 / span 2",m:"1 / span 5"})})}

  ${({theme:t})=>t.enclosedParse(':host([variant="textImage"]) ::slotted(:nth-child(even))',{gridColumn:p({base:"1 / span 1",s:"1 / span 2",m:"7 / span 5"}),"--image-grid-column":p({base:"1 / span 1",s:"1 / span 2",m:"7 / span 5"})})}

  ${({theme:t})=>t.enclosedParse(':host([variant="textImage"]) ::slotted(:nth-child(even))',{"--image-margin-top":p({m:`calc(${t.spacings.rSectionM} * -1)`})})}
`,P1=g`
  ${({theme:t})=>t.enclosedParse(':host([variant="imageText"]) ::slotted(:nth-child(odd))',{gridRow:p({base:"2",m:"auto"}),gridColumn:p({base:"1 / span 1",s:"1 / span 2",m:"1 / span 5"})})}

  ${({theme:t})=>t.enclosedParse(':host([variant="imageText"]) ::slotted(:nth-child(even))',{gridRow:p({base:"1",m:"auto"}),gridColumn:p({base:"1 / span 1",s:"1 / span 2",m:"7 / span 5"}),"--image-grid-column":p({base:"1 / span 1",s:"1 / span 2",m:"7 / span 5"})})}
`,k1=g`
  ${({theme:t})=>t.enclosedParse(':host([variant="textImageSecondary"]) ::slotted(:nth-child(odd))',{gridColumn:p({base:"1 / span 1",s:"1 / span 2",m:"1 / span 5"})})}

  ${({theme:t})=>t.enclosedParse(':host([variant="textImageSecondary"]) ::slotted(:nth-child(even))',{gridColumn:p({base:"1 / span 1",s:"1 / span 2",m:"8 / span 5"}),"--image-grid-column":p({base:"1 / span 1",s:"1 / span 2",m:"8 / span 5"})})}
`,_1=g`
  ${({theme:t})=>t.enclosedParse(':host([variant="eightFour"]) ::slotted(:nth-child(odd))',{gridColumn:p({base:"1 / span 1",s:"1 / span 2",m:"1 / span 8"})})}

  ${({theme:t})=>t.enclosedParse(':host([variant="eightFour"]) ::slotted(:nth-child(even))',{gridColumn:p({base:"1 / span 1",s:"1 / span 2",m:"9 / span 4"})})}
`,O1=g`
  ${({theme:t})=>t.enclosedParse(':host([variant="fourEight"]) ::slotted(:nth-child(odd))',{gridColumn:p({base:"1 / span 1",s:"1 / span 2",m:"1 / span 4"})})}

  ${({theme:t})=>t.enclosedParse(':host([variant="fourEight"]) ::slotted(:nth-child(even))',{gridColumn:p({base:"1 / span 1",s:"1 / span 2",m:"5 / span 8"})})}
`,L1=g`
  ${({theme:t})=>t.enclosedParse(':host([variant="sixSix"]) ::slotted(:nth-child(odd))',{gridColumn:p({base:"1 / span 1",s:"1 / span 2",m:"1 / span 6"})})}

  ${({theme:t})=>t.enclosedParse(':host([variant="sixSix"]) ::slotted(:nth-child(even))',{gridColumn:p({base:"1 / span 1",s:"1 / span 2",m:"7 / span 6"})})}
`,E1=g`
  ${({theme:t})=>t.enclosedParse(':host([variant="fiveSeven"]) ::slotted(:nth-child(odd))',{gridColumn:p({base:"1 / span 1",s:"1 / span 2",m:"1 / span 5"})})}

  ${({theme:t})=>t.enclosedParse(':host([variant="fiveSeven"]) ::slotted(:nth-child(even))',{gridColumn:p({base:"1 / span 1",s:"1 / span 2",m:"6 / span 7"})})}
`,D1=g`
  ${({theme:t})=>t.enclosedParse(':host([variant="eight"]) ::slotted(*)',{gridColumn:p({base:"1 / span 1",s:"1 / span 2",m:"3 / span 8"})})}
`,M1=g`
  ${({theme:t})=>t.enclosedParse(':host([variant="quoteText"]) ::slotted(:nth-child(odd))',{gridColumn:p({base:"1 / span 1",s:"1 / span 2",m:"1 / span 5"})})}

  ${({theme:t})=>t.enclosedParse(':host([variant="quoteText"]) ::slotted(:nth-child(even))',{gridColumn:p({base:"1 / span 1",s:"1 / span 2",m:"7 / span 5"}),marginTop:p({base:"0",m:v(165)})})}
`,T1=g`
  ${({theme:t})=>t.enclosedParse(':host([variant="textText"]) ::slotted(:nth-child(odd))',{gridColumn:p({base:"1 / span 1",s:"1 / span 2",m:"1 / span 5"})})}

  ${({theme:t})=>t.enclosedParse(':host([variant="textText"]) ::slotted(:nth-child(even))',{gridColumn:p({base:"1 / span 1",s:"1 / span 2",m:"7 / span 5"})})}
`,A1=g`
  ${({theme:t})=>t.enclosedParse(':host([variant="text"]) ::slotted(:nth-child(odd))',{gridColumn:p({base:"1 / span 1",s:"1 / span 2",m:"1 / span 11"})})}
`,N1=g`
  ${({theme:t})=>t.enclosedParse(':host([variant="fourTwo"]) ::slotted(*)',{gridColumn:p({base:"span 1",s:"span 1",m:"span 3"})})}
  ${({theme:t})=>t.enclosedParse(':host([variant="fourTwo"]) adgm-grid',{gridTemplateColumns:p({base:"1fr 1fr",m:"repeat(12, 1fr)"})})}
`;var B1=Object.defineProperty,I1=Object.getOwnPropertyDescriptor,jr=(t,e,a,i)=>{for(var n=i>1?void 0:i?I1(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&B1(e,a,n),n};s.PresentationGrid=class extends E{constructor(){super(...arguments),this.variant="textImage"}render(){return d`
      ${this.renderDebug("adgm-presentation-grid",{description:this.variant,alwaysShow:!0,color:"#CCC"})}
      <adgm-grid>
        <slot></slot>
      </adgm-grid>
    `}},s.PresentationGrid.styles=[_,S1,P1,x1,k1,_1,L1,D1,E1,O1,M1,A1,T1,N1],jr([l({type:String})],s.PresentationGrid.prototype,"variant",2),s.PresentationGrid=jr([b("adgm-presentation-grid")],s.PresentationGrid);const F1=g`
  :host {
    display: block;
    position: relative;
  }

  ${({theme:t})=>t.enclosedParse(":host([hide-on-m])",{display:p({base:"none",m:"block"})})}

  ${({theme:t})=>t.enclosedParse(":host([hide-on-d])",{display:p({base:"block",m:"none"})})}

  ${({theme:t})=>kt("height",t.spacings)}
`;var z1=Object.defineProperty,H1=Object.getOwnPropertyDescriptor,wn=(t,e,a,i)=>{for(var n=i>1?void 0:i?H1(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&z1(e,a,n),n};s.Spacer=class extends E{constructor(){super(...arguments),this.height="s20",this.hideOnM=!1,this.hideOnD=!1}render(){var a,i,n,r;let e;if(this.isDebugMode){const o=(i=(a=this.theme)==null?void 0:a.spacings)==null?void 0:i[this.height].value;sn(o)?e=`${this.height} (${o.entries().map(([c,h])=>`${c}: ${Dn(h)?h.name:h}`).join(", ")})`:e=this.height}return d`
      ${this.renderDebug("adgm-spacer",{description:e,striped:!0,color:((r=(n=this.theme)==null?void 0:n.spacings)==null?void 0:r[this.height].color)??"#D5D6D7"})}
      <slot></slot>
    `}},s.Spacer.styles=[_,F1],wn([O({context:ue}),l({attribute:!1})],s.Spacer.prototype,"theme",2),wn([l({type:String})],s.Spacer.prototype,"height",2),wn([l({type:Boolean,attribute:"hide-on-m"})],s.Spacer.prototype,"hideOnM",2),wn([l({type:Boolean,attribute:"hide-on-d"})],s.Spacer.prototype,"hideOnD",2),s.Spacer=wn([b("adgm-spacer")],s.Spacer);/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const R1=Symbol.for(""),V1=t=>{if((t==null?void 0:t.r)===R1)return t==null?void 0:t._$litStatic$},Ur=new Map,j1=t=>(e,...a)=>{const i=a.length;let n,r;const o=[],c=[];let h,u=0,m=!1;for(;u<i;){for(h=e[u];u<i&&(r=a[u],(n=V1(r))!==void 0);)h+=n+e[++u],m=!0;u!==i&&c.push(r),o.push(h),u++}if(u===i&&o.push(e[i]),m){const f=o.join("$$lit$$");(e=Ur.get(f))===void 0&&(o.raw=o,Ur.set(f,e=o)),a=c}return t(e,...a)},Ja=j1(d),U1=["left","center","right"],G1=g`
  ${()=>kt("weight",["300","400","500","600"],{property:"--font-weight",post:" !important"})}

  :host {
    display: block;
    text-align: left;
    position: relative;
    font-weight: var(--font-weight, 300);
    transition: ${({theme:t})=>`color ${t.defaults.transitionDuration} ${t.defaults.transitionEase}`};
  }

  ::slotted(*) {
    padding: 0;
    margin: 0;
    font-weight: var(--font-weight, inherit);
    font-size: inherit;
    font-family: inherit;
    line-height: inherit;
    letter-spacing: inherit;
  }

  ::slotted(p:not(:last-child)) {
    margin-bottom: ${({theme:t})=>t.spacings.rBodyXS};
  }

  ${({theme:t})=>kt("color",t.colors)}

  ${({theme:t})=>Object.entries(t.typography).map(([e,{properties:a}])=>t.enclosedParse(`:host([variant="${e}"])`,a)).join(" ")};

  ${()=>kt("align",U1,{property:"text-align"})}

  ${({theme:t})=>t.enclosedParse(":host",t.typography.textM.properties)}

  :host([inline]) {
    display: inline-block;
  }

  :host([italic]) {
    font-style: italic;
  }

  :host([ellipsis]),
  :host([ellipsis]) ::slotted(*) {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  :host([clamp]) {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    line-clamp: var(--clamp, 3);
    box-orient: vertical;
    -webkit-line-clamp: var(--clamp, 3);
    -webkit-box-orient: vertical;
  }

  :host([indent]) {
    border-left: 2px solid ${({theme:t})=>t.colors.clearsky100};
    padding-left: ${({theme:t})=>t.spacings.s20};
  }
`;var W1=Object.defineProperty,q1=Object.getOwnPropertyDescriptor,ee=(t,e,a,i)=>{for(var n=i>1?void 0:i?q1(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&W1(e,a,n),n};s.Text=class extends E{constructor(){super(...arguments),this.variant="textM",this.align="left"}render(){return this.clamp&&this.clamp>1&&this.style.setProperty("--clamp",this.clamp.toString()),Ja`
      ${this.renderDebug("adgm-text",{description:this.variant})}
      <slot></slot>
    `}},s.Text.styles=G1,ee([l({type:Boolean})],s.Text.prototype,"inline",2),ee([l({type:Boolean})],s.Text.prototype,"ellipsis",2),ee([l({type:Boolean})],s.Text.prototype,"indent",2),ee([l({type:Boolean})],s.Text.prototype,"italic",2),ee([l({type:Number})],s.Text.prototype,"clamp",2),ee([l({type:String})],s.Text.prototype,"variant",2),ee([l({type:String})],s.Text.prototype,"align",2),ee([l({type:Number})],s.Text.prototype,"weight",2),ee([l({type:String})],s.Text.prototype,"color",2),s.Text=ee([b("adgm-text")],s.Text);const Y1=g`
  :host {
    display: inline-block;
    flex-shrink: 0;
    flex-grow: 0;
    position: relative;
    width: 100%;
    height: 100%;
  }

  svg,
  ::slotted(svg) {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    transition: ${({theme:t})=>`fill ${t.defaults.transitionDuration} ${t.defaults.transitionEase}`};
    fill: var(--icon-fill, currentColor);
  }

  :host([mirror]) {
    transform: scaleX(-1);
  }

  :host([color="currentColor"]) svg {
    fill: currentColor;
  }

  ${({theme:t})=>kt("color",t.colors,{enclose:"svg",property:"fill"})}
  ${({theme:t})=>kt("color",t.colors,{enclose:"::slotted(svg)",property:"fill"})}
    ${({theme:t})=>kt("size",t.spacings,{property:["width","height"]})}

  :host([icon="loader"]) {
    animation: rotation 2s infinite ease-in-out;
  }

  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
`,ti={arrowM:B`
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.1489 18.2239L22.0258 12.6279L22.0903 12.5424L1 12.5424V11.4193L22.0662 11.4193L21.9512 11.2865L17.1489 5.77609L17.8252 5L24 12L17.8252 19L17.1489 18.2239Z" />
    </svg>
  `,arrowL:B`
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.4241 11.5825L0 11.5825V12.4005L22.4411 12.4005L12.8582 21.9216L13.4368 22.5L23.9988 12L13.4368 1.5L12.8582 2.07843L22.4241 11.5825Z" />
    </svg>
  `,externalLink:B`
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M13.5021 5.99897V5H19V10.4979H18.001V6.70438L11.9073 12.7989L11.2011 12.0927L17.294 5.99897H13.5021ZM6.004 17.9961C5.99816 14.414 5.9992 10.8317 6.00402 7.24947H10.752V8.24844H7.00283V16.9972H15.7516V13.2481H16.7505V17.9961H6.004Z" />
    </svg>
  `,account:B`
    <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 6C12.28 6 6 12.28 6 20C6 27.72 12.28 34 20 34C27.72 34 34 27.72 34 20C34 12.28 27.72 6 20 6ZM19.98 33C17.05 33 14.18 31.99 11.89 30.17L11.05 29.5L11.78 28.71C12.86 27.53 14.15 26.61 15.62 25.97C17.08 25.33 18.63 25.01 20.22 25.01H20.25C21.78 25.01 23.28 25.31 24.7 25.91C26.12 26.51 27.39 27.37 28.46 28.48L29.21 29.25L28.39 29.94C26.05 31.92 23.06 33.01 19.99 33.01H19.97L19.98 33ZM10.34 28.78L9.63 27.83C8.18 25.91 7.3 23.63 7.07 21.24C6.84 18.85 7.28 16.44 8.33 14.28C9.39 12.12 11.02 10.3 13.05 9.01C15.08 7.72 17.42 7.02 19.82 6.99C22.23 6.95 24.59 7.59 26.65 8.81C28.72 10.04 30.4 11.81 31.52 13.94C32.64 16.07 33.14 18.46 32.98 20.86C32.82 23.26 32 25.56 30.61 27.52L29.92 28.49L29.08 27.65C27.91 26.48 26.55 25.57 25.03 24.94C23.51 24.31 21.91 23.99 20.27 23.99C20.26 23.99 20.24 23.99 20.23 23.99C18.52 23.99 16.86 24.33 15.3 25.01C13.73 25.69 12.34 26.66 11.16 27.91L10.35 28.77L10.34 28.78ZM20 10.5C18.66 10.5 17.41 11.02 16.46 11.96C15.51 12.9 15 14.16 15 15.5C15 16.84 15.52 18.09 16.46 19.04C17.4 19.99 18.66 20.5 20 20.5C21.34 20.5 22.59 19.98 23.54 19.04C24.48 18.1 25 16.84 25 15.5C25 14.16 24.48 12.91 23.54 11.96C22.6 11.02 21.34 10.5 20 10.5ZM20 19.5C18.93 19.5 17.93 19.08 17.17 18.33C16.41 17.58 16 16.57 16 15.5C16 14.43 16.42 13.43 17.17 12.67C17.93 11.92 18.93 11.5 20 11.5C21.07 11.5 22.07 11.92 22.83 12.67C23.59 13.43 24 14.43 24 15.5C24 16.57 23.58 17.57 22.83 18.33C22.07 19.09 21.07 19.5 20 19.5Z"/>
    </svg>
  `,chevronDownL:B`
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12.0104 16.6067L6.70711 11.3034L6 12.0105L12.0104 18.0209L18.0208 12.0105L17.3137 11.3034L12.0104 16.6067Z"/>
    </svg>
  `,chevronUpL:B`
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="m 12.0111,9.7363334 5.3033,5.3033016 0.7071,-0.7071 -6.0104,-6.0104016 -6.01043,6.0104016 0.70711,0.7071 z"
      />
    </svg>
  `,contrastSwitch:B`
    <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 20.5C10.95 25.43 15.27 29 20.31 29C25.35 29 29.67 25.43 30.62 20.5C29.67 15.57 25.35 12 20.31 12C15.27 12 10.95 15.57 10 20.5ZM20.31 28C18.17 28 16.06 27.26 14.39 25.93C12.71 24.59 11.53 22.71 11.05 20.62L11.02 20.51L11.05 20.4C11.53 18.31 12.72 16.43 14.39 15.09C16.07 13.76 18.17 13.02 20.31 13.02C22.45 13.02 24.56 13.76 26.23 15.09C27.91 16.43 29.09 18.31 29.57 20.4L29.6 20.51L29.57 20.62C29.09 22.71 27.91 24.6 26.23 25.93C24.55 27.27 22.45 28 20.31 28ZM20.31 16.5C19.24 16.5 18.24 16.92 17.48 17.67C16.72 18.43 16.31 19.43 16.31 20.5C16.31 21.57 16.73 22.57 17.48 23.33C18.99 24.84 21.63 24.84 23.14 23.33C23.9 22.57 24.31 21.57 24.31 20.5C24.31 19.43 23.89 18.43 23.14 17.67C22.38 16.91 21.38 16.5 20.31 16.5ZM20.31 23.5C19.51 23.5 18.76 23.19 18.19 22.62C17.63 22.06 17.31 21.29 17.31 20.5C17.31 19.71 17.63 18.94 18.19 18.38C19.32 17.25 21.3 17.25 22.43 18.38C22.99 18.94 23.31 19.71 23.31 20.5C23.31 21.29 22.99 22.06 22.43 22.62C21.87 23.18 21.1 23.5 20.31 23.5Z"/>
    </svg>
  `,calendarInput:B`
    <svg viewBox="0 0 33 33" xmlns="http://www.w3.org/2000/svg">
      <clipPath id="a"><path d="m6.33594 6.60352h19.2v19.2h-19.2z"/></clipPath>
        <g clip-path="url(#a)">
          <g stroke-linecap="round" stroke-linejoin="round">
            <path d="m8.1367188 8.8535156c-.5168707 0-1.0134093.2048156-1.3789063.5703125-.3655895.3655408-.5703125.8620429-.5703125 1.3789059v13.201172c0 .516902.2047877 1.013447.5703125 1.378906.3655191.365601.862067.570313 1.3789063.570313h15.6015622c.516855 0 1.013415-.204659 1.378906-.570313.365654-.365491.570313-.862051.570313-1.378906v-13.201172c0-.516816-.204594-1.0133338-.570313-1.3789059-.365468-.3655501-.86202-.5703125-1.378906-.5703125zm0 1.5000004h15.6015622c.119714 0 .231876.04631.316406.130859a.750075.750075 0 0 0 .002.002c.08448.08445.130859.196824.130859.316406v13.201172c0 .119745-.04631.233851-.130859.31836a.750075.750075 0 0 0 -.002 0c-.08451.08455-.196661.130859-.316406.130859h-15.6015622c-.1196802 0-.2318259-.04626-.3164063-.130859a.750075.750075 0 0 0 -.00195 0c-.0845579-.084587-.1308625-.198709-.1308625-.318407v-13.201172c0-.119535.046369-.231927.1308594-.316406a.750075.750075 0 0 0 0-.002c.084603-.0846.1987107-.130859.3183594-.130859z"/>
            <path d="m6.9375 13.654297a.75.75 0 0 0 -.75.75.75.75 0 0 0 .75.75h18a.75.75 0 0 0 .75-.75.75.75 0 0 0 -.75-.75z"/>
            <path d="m11.734375 6.453125a.75.75 0 0 0 -.75.75v4.201172a.75.75 0 0 0 .75.75.75.75 0 0 0 .75-.75v-4.201172a.75.75 0 0 0 -.75-.75z"/>
            <path d="m20.132812 6.453125a.75.75 0 0 0 -.75.75v4.201172a.75.75 0 0 0 .75.75.75.75 0 0 0 .75-.75v-4.201172a.75.75 0 0 0 -.75-.75z"/>
          </g>
          <path d="m10.839844 16.654297c-.278092 0-.545586.110388-.742188.30664h-.002c-.196252.196602-.3066405.464096-.3066405.742188 0 .278242.1103885.545586.3066405.742187.196654.196654.466049.308594.744141.308594v-.599609-.900391z"/>
          <path d="m10.835938 16.654297v.599609.900391.599609c.278092 0 .545533-.11194.742187-.308594.196252-.196601.308594-.463945.308594-.742187 0-.278092-.112342-.545586-.308594-.742188-.196601-.196252-.464095-.30664-.742187-.30664z"/>
          <path d="m10.839844 20.853516c-.278092 0-.547487.109987-.744141.30664-.1971178.197118-.3066405.465899-.3066405.744141 0 .278092.1098373.545384.3066405.742187.196654.196654.466049.306641.744141.306641v-.599609-.900391z"/>
          <path d="m10.835938 20.853516v.599609.900391.599609c.278092 0 .545533-.109987.742187-.306641.196803-.196803.308594-.464095.308594-.742187 0-.278242-.111476-.547023-.308594-.744141-.196654-.196653-.464095-.30664-.742187-.30664z"/>
          <path d="m15.933594 16.654297c-.278092 0-.547338.109837-.744141.30664-.196653.196654-.30664.464096-.30664.742188 0 .278242.109987.545534.30664.742187.196855.197205.466049.308594.744141.308594v-.599609-.900391z"/>
          <path d="m15.9375 16.654297v.599609.900391.599609c.278092 0 .545333-.111389.742187-.308594.196654-.196653.308594-.463945.308594-.742187 0-.278092-.11194-.545534-.308594-.742188-.196803-.196803-.464095-.30664-.742187-.30664z"/>
          <path d="m15.933594 20.853516c-.277211 0-.545508.110606-.742188.30664-.197519.197169-.308593.465899-.308593.744141 0 .277209.110609.543555.30664.740234.000441.000442.0015-.000441.002 0 .000442.000443-.000442.0015 0 .002.19668.196035.464977.306641.742188.306641v-.599656-.900391zm.316406 1.367187c-.000442.000445.000444.0015 0 .002h.002v-.002c-.000441.000442-.0015-.00044-.002 0z"/>
          <path d="m15.929688 20.853516v.599609.900391.599609c.278092 0 .545333-.111389.742187-.308594.196375-.196731.308594-.462766.308594-.740234 0-.277619-.111906-.545146-.308594-.742188-.196854-.197204-.464095-.308593-.742187-.308593z"/>
          <path d="m21.035156 16.654297c-.278092 0-.545586.110388-.742187.30664h-.002c-.196253.196602-.306641.464096-.306641.742188 0 .278242.110388.545586.306641.742187.196653.196654.466048.308594.74414.308594v-.599609-.900391z"/>
          <path d="m21.03125 16.654297v.599609.900391.599609c.278092 0 .545534-.11194.742187-.308594.195938-.196286.308594-.463316.308594-.742187 0-.27872-.112656-.545901-.308594-.742188-.196601-.196252-.464095-.30664-.742187-.30664z"/>
          <path d="m21.035156 20.853516c-.278092 0-.547487.109987-.74414.30664-.197118.197118-.306641.465899-.306641.744141 0 .278092.109837.545384.306641.742187.196653.196654.466048.306641.74414.306641v-.599609-.900391z"/>
          <path d="m21.03125 20.853516v.599609.900391.599609c.278092 0 .545534-.109987.742187-.306641.196489-.196488.308594-.463467.308594-.742187 0-.278871-.11179-.547337-.308594-.744141-.196653-.196653-.464095-.30664-.742187-.30664z"/>
        </g>
    </svg>
  `,min:B`
    <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <path d="M29 20.4998C29 20.8273 28.7468 20.9998 28.4 20.9998L11.6279 20.9998C11.2811 20.9998 11 20.8273 11 20.4998C11 20.1722 11.2811 19.9998 11.6279 19.9998L28.4 19.9998C28.7468 19.9998 29 20.1722 29 20.4998Z"/>
    </svg>
  `,plus:B`
    <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 11.5C20.3275 11.5 20.5 11.7532 20.5 12.1L20.5 28.8721C20.5 29.2189 20.3275 29.5 20 29.5C19.6725 29.5 19.5 29.2189 19.5 28.8721L19.5 12.1C19.5 11.7532 19.6725 11.5 20 11.5Z"/>
      <path d="M29 20.4998C29 20.8273 28.7468 20.9998 28.4 20.9998L11.6279 20.9998C11.2811 20.9998 11 20.8273 11 20.4998C11 20.1722 11.2811 19.9998 11.6279 19.9998L28.4 19.9998C28.7468 19.9998 29 20.1722 29 20.4998Z"/>
    </svg>
  `,close:B`
   <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.6367 14.136C13.8683 13.9044 14.1693 13.9615 14.4145 14.2067L26.2742 26.0664C26.5194 26.3116 26.5962 26.6324 26.3646 26.8639C26.133 27.0955 25.8123 27.0187 25.567 26.7735L13.7074 14.9138C13.4622 14.6686 13.4051 14.3676 13.6367 14.136Z"/>
      <path d="M26.3652 14.1359C26.5968 14.3675 26.5397 14.6686 26.2945 14.9138L14.4348 26.7734C14.1896 27.0186 13.8689 27.0955 13.6373 26.8639C13.4057 26.6323 13.4825 26.3115 13.7277 26.0663L25.5874 14.2067C25.8326 13.9614 26.1336 13.9044 26.3652 14.1359Z"/>
    </svg>
  `,loader:B`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
      <path d="M 7.5 4 A 2.5 2.5 0 0 0 5 6.5 A 2.5 2.5 0 0 0 7.5 9 A 2.5 2.5 0 0 0 10 6.5 A 2.5 2.5 0 0 0 7.5 4 z M 13 4 A 1 1 0 0 0 12 5 A 1 1 0 0 0 13 6 A 1 1 0 0 0 14 5 A 1 1 0 0 0 13 4 z M 18 6 A 1 1 0 0 0 17 7 A 1 1 0 0 0 18 8 A 1 1 0 0 0 19 7 A 1 1 0 0 0 18 6 z M 5 11 A 2 2 0 0 0 3 13 A 2 2 0 0 0 5 15 A 2 2 0 0 0 7 13 A 2 2 0 0 0 5 11 z M 20 11 A 1 1 0 0 0 19 12 A 1 1 0 0 0 20 13 A 1 1 0 0 0 21 12 A 1 1 0 0 0 20 11 z M 18.5 16 A 1.5 1.5 0 0 0 17 17.5 A 1.5 1.5 0 0 0 18.5 19 A 1.5 1.5 0 0 0 20 17.5 A 1.5 1.5 0 0 0 18.5 16 z M 7.5 17 A 1.5 1.5 0 0 0 6 18.5 A 1.5 1.5 0 0 0 7.5 20 A 1.5 1.5 0 0 0 9 18.5 A 1.5 1.5 0 0 0 7.5 17 z M 13.484375 18 A 1.5 1.5 0 0 0 11.984375 19.5 A 1.5 1.5 0 0 0 13.484375 21 A 1.5 1.5 0 0 0 14.984375 19.5 A 1.5 1.5 0 0 0 13.484375 18 z"/>
    </svg>
  `,info:B`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 160">
      <path d="m57.373 18.231a9.3834 9.1153 0 1 1 -18.767 0 9.3834 9.1153 0 1 1 18.767 0z" transform="matrix(1.1989 0 0 1.2342 21.214 28.75)"/>
      <path d="m90.665 110.96c-0.069 2.73 1.211 3.5 4.327 3.82l5.008 0.1v5.12h-39.073v-5.12l5.503-0.1c3.291-0.1 4.082-1.38 4.327-3.82v-30.813c0.035-4.879-6.296-4.113-10.757-3.968v-5.074l30.665-1.105"/>
    </svg>
  `,warning:B`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27.963 27.963" xml:space="preserve">
      <path d="M15.579 17.158L16.191 4.579L11.804 4.579L12.414 17.158z" />
      <path d="M13.998,18.546c-1.471,0-2.5,1.029-2.5,2.526c0,1.443,0.999,2.528,2.444,2.528h0.056c1.499,0,2.469-1.085,2.469-2.528 C16.441,19.575,15.468,18.546,13.998,18.546z"/>
    </svg>
  `,menu:B`
    <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 12.5C11 12.1725 11.2532 12 11.6 12H28.3721C28.7189 12 29 12.1725 29 12.5C29 12.8275 28.7189 13 28.3721 13H11.6C11.2532 13 11 12.8275 11 12.5Z"/>
      <path d="M11 20.5C11 20.1725 11.2811 20 11.6279 20H28.3721C28.7189 20 29 20.1725 29 20.5C29 20.8275 28.7189 21 28.3721 21H11.6C11.2532 21 11 20.8275 11 20.5Z"/>
      <path d="M11 28.5C11 28.1725 11.2811 28 11.6279 28H28.3721C28.7189 28 29 28.1725 29 28.5C29 28.8275 28.7189 29 28.3721 29H11.6279C11.2811 29 11 28.8275 11 28.5Z"/>
    </svg>
  `,list:B`
    <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <clipPath id="a"><path d="m8 8h24v24h-24z"/></clipPath>
      <g clip-path="url(#a)" stroke-linecap="round" stroke-linejoin="round">
        <path d="m11 8c-.393977 0-.784479.0777175-1.1484375.2285156-.3640318.1507621-.6940921.3718265-.9726562.6503907-.2785642.2785641-.4996286.6086244-.6503907.9726562-.1507981.3639585-.2285156.7544605-.2285156 1.1484375s.077718.784479.2285156 1.148438c.1507471.363968.3717406.694046.6503907.972656.2784982.278458.6084211.499637.9726562.65039.3639945.150853.7544605.228516 1.1484375.228516s.784443-.07766 1.148438-.228516c.364172-.150738.694112-.371846.972656-.65039s.499652-.608484.65039-.972656c.150853-.363995.228516-.754461.228516-1.148438s-.077663-.784443-.228516-1.1484375c-.150753-.3642351-.371932-.694158-.65039-.9726562-.27861-.2786501-.608688-.4996436-.972656-.6503907-.363959-.1507981-.754461-.2285156-1.148438-.2285156zm0 1.5c.197023 0 .392378.03794.574219.1132813.18203.075393.347138.1869623.486328.3261718.139341.1393609.248972.3045239.324219.4863279a.750075.750075 0 0 0 .002 0c.0753.181805.113234.377196.113234.574219s-.03793.392414-.113281.574219a.750075.750075 0 0 0 -.002 0c-.07526.181827-.184964.347072-.324219.486328-.139256.139255-.304501.248957-.486328.324219a.750075.750075 0 0 0 0 .002c-.181758.0753-.377149.113234-.574172.113234s-.392414-.03793-.574219-.113281a.750075.750075 0 0 0 0-.002c-.181804-.0752-.346967-.184831-.4863279-.324172-.1392095-.13919-.2507791-.304298-.3261718-.486328-.0753417-.181841-.1132813-.377196-.1132813-.574219s.0379396-.392378.1132813-.574219c.0753776-.182007.1868764-.347032.3261718-.4863279.1392959-.1392954.3043209-.2507942.4863279-.3261718.181841-.0753417.377196-.1132813.574219-.1132813z"/><path d="m11 17c-.393977 0-.784443.07766-1.1484375.228516-.3642351.150753-.694158.371932-.9726562.65039-.2786501.27861-.4996436.608688-.6503907.972656-.1507981.363959-.2285156.754461-.2285156 1.148438s.077718.784479.2285156 1.148437c.1507471.363969.3717406.694047.6503907.972657.2784982.278458.6084211.499637.9726562.65039.3639945.150853.7544605.228516 1.1484375.228516s.784443-.07766 1.148438-.228516c.364172-.150738.694112-.371846.972656-.65039s.499652-.608484.65039-.972657c.150853-.363994.228516-.75446.228516-1.148437s-.077663-.784443-.228516-1.148438c-.150738-.364172-.371846-.694112-.65039-.972656s-.608484-.499652-.972656-.65039c-.363995-.150853-.754461-.228516-1.148438-.228516zm0 1.5c.197023 0 .392414.03793.574219.113281a.750075.750075 0 0 0 0 .002c.181827.07526.347072.184964.486328.324219.139255.139256.248957.304501.324219.486328a.750075.750075 0 0 0 .002 0c.0753.181758.113234.377149.113234.574172s-.03793.392414-.113281.574219a.750075.750075 0 0 0 -.002 0c-.07526.181827-.184964.347072-.324219.486328-.139256.139255-.304501.248957-.486328.324219a.750075.750075 0 0 0 0 .002c-.181758.0753-.377149.113234-.574172.113234s-.392414-.03793-.574219-.113281a.750075.750075 0 0 0 0-.002c-.181804-.0752-.346967-.184831-.4863279-.324172-.1392095-.13919-.2507791-.304298-.3261718-.486328-.0753417-.181841-.1132813-.377196-.1132813-.574219s.03794-.392378.1132813-.574219c.075393-.18203.1869623-.347138.3261718-.486328.1393609-.139341.3045239-.248972.4863279-.324219a.750075.750075 0 0 0 0-.002c.181805-.0753.377196-.113234.574219-.113234z"/><path d="m11 26c-.393977 0-.784443.07766-1.1484375.228516-.3642351.150753-.694158.371932-.9726562.65039-.2786501.27861-.4996436.608688-.6503907.972656-.1507981.363959-.2285156.754461-.2285156 1.148438s.077718.784479.2285156 1.148437c.1507471.363969.3717406.694047.6503907.972657.2784982.278458.6084211.499637.9726562.65039.3639945.150853.7544605.228516 1.1484375.228516s.784443-.07766 1.148438-.228516c.364172-.150738.694112-.371846.972656-.65039s.499652-.608484.65039-.972657c.150853-.363994.228516-.75446.228516-1.148437s-.077663-.784443-.228516-1.148438c-.150738-.364172-.371846-.694112-.65039-.972656s-.608484-.499652-.972656-.65039c-.363995-.150853-.754461-.228516-1.148438-.228516zm0 1.5c.197023 0 .392414.03793.574219.113281a.750075.750075 0 0 0 0 .002c.181827.07526.347072.184964.486328.324219.139255.139256.248957.304501.324219.486328a.750075.750075 0 0 0 .002 0c.0753.181758.113234.377149.113234.574172s-.03793.392414-.113281.574219a.750075.750075 0 0 0 -.002 0c-.07526.181827-.184964.347072-.324219.486328-.139256.139255-.304501.248957-.486328.324219a.750075.750075 0 0 0 0 .002c-.181758.0753-.377149.113234-.574172.113234s-.392414-.03793-.574219-.113281a.750075.750075 0 0 0 0-.002c-.181804-.0752-.346967-.184831-.4863279-.324172-.1392095-.13919-.2507791-.304298-.3261718-.486328-.0753417-.181841-.1132813-.377196-.1132813-.574219s.03794-.392378.1132813-.574219c.075393-.18203.1869623-.347138.3261718-.486328.1393609-.139341.3045239-.248972.4863279-.324219a.750075.750075 0 0 0 0-.002c.181805-.0753.377196-.113234.574219-.113234z"/><path d="m16.25 10.25a.75.75 0 0 0 -.75.75.75.75 0 0 0 .75.75h15a.75.75 0 0 0 .75-.75.75.75 0 0 0 -.75-.75z"/><path d="m16.25 19.25a.75.75 0 0 0 -.75.75.75.75 0 0 0 .75.75h15a.75.75 0 0 0 .75-.75.75.75 0 0 0 -.75-.75z"/><path d="m16.25 28.25a.75.75 0 0 0 -.75.75.75.75 0 0 0 .75.75h15a.75.75 0 0 0 .75-.75.75.75 0 0 0 -.75-.75z"/>
      </g>
    </svg>
  `,search:B`
    <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M18.3336 7.80713C12.5625 7.80713 7.83594 12.4831 7.83594 18.3122C7.83594 24.1412 12.5625 28.8172 18.3336 28.8172C24.1048 28.8172 28.8313 24.1412 28.8313 18.3122C28.8313 12.4831 24.1048 7.80713 18.3336 7.80713ZM8.83134 18.3122C8.83134 13.1179 13.0591 8.85763 18.3336 8.85763C23.6082 8.85763 27.8359 13.1179 27.8359 18.3122C27.8359 23.5065 23.6082 27.7667 18.3336 27.7667C13.0591 27.7667 8.83134 23.5065 8.83134 18.3122Z"/>
      <path d="M28.676 27.9103C28.4763 27.711 28.1613 27.7203 27.9725 27.9311C27.7836 28.1419 27.7924 28.4743 27.9921 28.6736L32.9921 33.6635C33.1918 33.8628 33.5068 33.8535 33.6957 33.6428C33.8846 33.432 33.8758 33.0996 33.676 32.9002L28.676 27.9103Z"/>
    </svg>
  `,arrowDown:B`
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.5893 15.0148L12.5892 6L11.5892 6L11.5893 15.1568L7.44287 11.0104L6.73576 11.7175L12.0183 17L17.3008 11.7175L16.5937 11.0104L12.5893 15.0148Z"/>
    </svg>
  `,download:B`
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.5893 13.0148L12.5892 4L11.5892 4L11.5893 13.1568L7.44287 9.01038L6.73576 9.71749L12.0183 15L17.3008 9.71749L16.5937 9.01038L12.5893 13.0148Z"/>
      <path d="M7,16 L17,16 L17,17 L7,17 Z"/>
    </svg>
  `,downloadPdf:B`
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.495 8.16219H19.3824L19.495 8.14643C19.4803 8.03379 19.4298 7.92885 19.3509 7.84714L14.6681 3.16652C14.6423 3.14021 14.6136 3.11682 14.5826 3.09676L14.5601 3.08326C14.5361 3.06843 14.5113 3.05491 14.4859 3.04276L14.4454 3.0315C14.4244 3.02241 14.4025 3.01562 14.3801 3.01125C14.3438 3.00406 14.3069 3.00029 14.2698 3H6.75397C6.60477 3 6.46168 3.05927 6.35618 3.16477C6.25068 3.27028 6.19141 3.41337 6.19141 3.56257V9.61138C6.19141 9.76058 6.25068 9.90368 6.35618 10.0092C6.46168 10.1147 6.60477 10.174 6.75397 10.174C6.90317 10.174 7.04626 10.1147 7.15177 10.0092C7.25727 9.90368 7.31654 9.76058 7.31654 9.61138V4.1319H13.7073V8.21394C13.7079 8.36258 13.767 8.50499 13.8719 8.6103C13.9768 8.71561 14.119 8.77533 14.2676 8.77652L18.3766 8.79902V19.6927H7.31654V18.8218C7.31654 18.6726 7.25727 18.5296 7.15177 18.424C7.04626 18.3185 6.90317 18.2593 6.75397 18.2593C6.60477 18.2593 6.46168 18.3185 6.35618 18.424C6.25068 18.5296 6.19141 18.6726 6.19141 18.8218V20.2553C6.19141 20.4045 6.25068 20.5476 6.35618 20.6531C6.46168 20.7586 6.60477 20.8179 6.75397 20.8179H18.9391C19.0883 20.8179 19.2314 20.7586 19.3369 20.6531C19.4424 20.5476 19.5017 20.4045 19.5017 20.2553V8.2387C19.5016 8.21305 19.4994 8.18745 19.495 8.16219ZM14.8324 7.65362V4.92851L17.5732 7.66712L14.8324 7.65362Z"/>
      <path d="M11.2228 13.4526C11.1844 13.3779 11.1181 13.3213 11.0383 13.2951C10.924 13.2596 10.8046 13.2436 10.685 13.2479H10.3047V15.1989H10.685C10.7711 15.2069 10.8579 15.1967 10.9397 15.1687C11.0216 15.1408 11.0966 15.0959 11.1598 15.0369C11.2654 14.8942 11.3229 14.7216 11.3241 14.544C11.3241 14.4473 11.3241 14.319 11.3241 14.139C11.3252 14.0007 11.3192 13.8625 11.3061 13.7249C11.2955 13.6298 11.2672 13.5374 11.2228 13.4526Z" />
      <path d="M8.05849 13.2389H7.58594V14.2943H8.05849C8.35103 14.2943 8.49504 14.1142 8.49504 13.7429C8.50982 13.6055 8.47467 13.4673 8.39603 13.3536C8.35134 13.3113 8.29805 13.2792 8.23979 13.2594C8.18154 13.2396 8.1197 13.2326 8.05849 13.2389Z" />
      <path d="M16.4241 10.8491H5.06257C4.91336 10.8491 4.77027 10.9083 4.66477 11.0138C4.55927 11.1193 4.5 11.2624 4.5 11.4116V17.0216C4.5 17.1708 4.55927 17.3139 4.66477 17.4194C4.77027 17.5249 4.91336 17.5842 5.06257 17.5842H16.4241C16.5733 17.5842 16.7164 17.5249 16.8219 17.4194C16.9274 17.3139 16.9867 17.1708 16.9867 17.0216V11.4116C16.9867 11.2624 16.9274 11.1193 16.8219 11.0138C16.7164 10.9083 16.5733 10.8491 16.4241 10.8491ZM8.92626 14.6138C8.81149 14.7207 8.67594 14.8028 8.52806 14.8551C8.38018 14.9074 8.22312 14.9286 8.06666 14.9176H7.58961V15.8312H6.87403V12.6178H8.06666C8.834 12.6178 9.22105 12.9981 9.22105 13.7429C9.24162 14.0608 9.13565 14.3738 8.92626 14.6138ZM12.0001 14.8838C11.9688 15.0659 11.9023 15.2402 11.8043 15.3969C11.7014 15.551 11.5514 15.6678 11.3768 15.73C11.1519 15.8039 10.9159 15.8382 10.6792 15.8312H9.59009V12.6178H10.686C10.9142 12.6123 11.1418 12.6419 11.361 12.7056C11.5314 12.7556 11.6813 12.8589 11.7886 13.0003C11.8923 13.1416 11.9645 13.3035 12.0001 13.4752C12.0424 13.7052 12.0612 13.9389 12.0564 14.1728C12.0593 14.411 12.0405 14.649 12.0001 14.8838ZM14.6149 13.2479H13.249V14.0917H14.3741V14.7241H13.249V15.8312H12.5334V12.6178H14.6149V13.2479Z" />
    </svg>
  `,downloadDocx:B`
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.4911 8.16219H19.3785L19.4911 8.14643C19.4764 8.03379 19.4259 7.92885 19.347 7.84714L14.6642 3.16652C14.6384 3.14021 14.6097 3.11682 14.5787 3.09676L14.5562 3.08326C14.5322 3.06843 14.5074 3.05491 14.482 3.04276L14.4415 3.0315C14.4205 3.02241 14.3986 3.01562 14.3762 3.01125C14.3399 3.00406 14.303 3.00029 14.2659 3H6.75007C6.60086 3 6.45777 3.05927 6.35227 3.16477C6.24677 3.27028 6.1875 3.41337 6.1875 3.56257V9.61138C6.1875 9.76058 6.24677 9.90368 6.35227 10.0092C6.45777 10.1147 6.60086 10.174 6.75007 10.174C6.89927 10.174 7.04236 10.1147 7.14786 10.0092C7.25336 9.90368 7.31263 9.76058 7.31263 9.61138V4.1319H13.7034V8.21394C13.704 8.36258 13.7631 8.50499 13.868 8.6103C13.9729 8.71561 14.1151 8.77533 14.2637 8.77652L18.3727 8.79902V19.6927H7.31263V18.8218C7.31263 18.6726 7.25336 18.5296 7.14786 18.424C7.04236 18.3185 6.89927 18.2593 6.75007 18.2593C6.60086 18.2593 6.45777 18.3185 6.35227 18.424C6.24677 18.5296 6.1875 18.6726 6.1875 18.8218V20.2553C6.1875 20.4045 6.24677 20.5476 6.35227 20.6531C6.45777 20.7586 6.60086 20.8179 6.75007 20.8179H18.9352C19.0844 20.8179 19.2275 20.7586 19.333 20.6531C19.4385 20.5476 19.4978 20.4045 19.4978 20.2553V8.2387C19.4977 8.21305 19.4955 8.18745 19.4911 8.16219ZM14.8285 7.65362V4.92851L17.5693 7.66712L14.8285 7.65362Z"/>
      <path d="M7.01967 13.4526C6.97998 13.3789 6.91416 13.3227 6.83515 13.2951C6.72085 13.2597 6.60143 13.2437 6.48186 13.2478H6.10156V15.1988H6.48186C6.56762 15.207 6.65414 15.1968 6.73563 15.1688C6.81712 15.1409 6.89171 15.0959 6.95441 15.0368C7.05668 14.8928 7.11172 14.7206 7.11193 14.544C7.11193 14.4472 7.11193 14.319 7.11193 14.1389C7.11312 14.0007 7.10711 13.8625 7.09393 13.7249C7.08512 13.6305 7.05999 13.5384 7.01967 13.4526Z" />
      <path d="M9.52574 13.1938C9.43369 13.1821 9.3402 13.197 9.25641 13.2369C9.17262 13.2768 9.10208 13.34 9.05319 13.4189C8.94637 13.6749 8.90016 13.9521 8.91817 14.229C8.89944 14.4998 8.94493 14.7712 9.05094 15.0211C9.10079 15.0996 9.17183 15.1623 9.25585 15.2022C9.33987 15.242 9.43343 15.2572 9.52574 15.2461C9.61805 15.2572 9.71162 15.242 9.79564 15.2022C9.87965 15.1623 9.95069 15.0996 10.0005 15.0211C10.1056 14.771 10.1503 14.4996 10.1311 14.229C10.1482 13.9524 10.1028 13.6755 9.9983 13.4189C9.94941 13.34 9.87886 13.2768 9.79508 13.2369C9.71129 13.197 9.6178 13.1821 9.52574 13.1938Z" />
      <path d="M16.4241 10.8491H5.06257C4.91336 10.8491 4.77027 10.9083 4.66477 11.0138C4.55927 11.1193 4.5 11.2624 4.5 11.4116V17.0216C4.5 17.1708 4.55927 17.3139 4.66477 17.4194C4.77027 17.5249 4.91336 17.5842 5.06257 17.5842H16.4241C16.5734 17.5842 16.7164 17.5249 16.8219 17.4194C16.9274 17.3139 16.9867 17.1708 16.9867 17.0216V11.4116C16.9867 11.2624 16.9274 11.1193 16.8219 11.0138C16.7164 10.9083 16.5734 10.8491 16.4241 10.8491ZM7.80564 14.8838C7.7745 15.0664 7.70717 15.2408 7.60761 15.3969C7.50559 15.5519 7.35532 15.669 7.18006 15.73C6.95596 15.804 6.72064 15.8382 6.48473 15.8312H5.38885V12.6178H6.48473C6.71293 12.6123 6.94062 12.6419 7.15981 12.7056C7.33053 12.7561 7.48093 12.8593 7.58961 13.0003C7.69205 13.1427 7.76266 13.3054 7.79664 13.4774C7.83773 13.7076 7.85657 13.9412 7.85289 14.175C7.85752 14.4122 7.84171 14.6494 7.80564 14.8838ZM10.5735 15.4824C10.3709 15.7502 10.0221 15.8875 9.53384 15.8875C9.04553 15.8875 8.69674 15.7502 8.49422 15.4824C8.29169 15.2146 8.19268 14.8073 8.19268 14.238C8.16147 13.7977 8.26677 13.3584 8.49422 12.9801C8.69674 12.7011 9.04553 12.5615 9.53384 12.5615C10.0221 12.5615 10.3709 12.7011 10.5735 12.9801C10.7998 13.3589 10.905 13.7978 10.875 14.238C10.875 14.7983 10.7715 15.2169 10.5735 15.4824ZM12.0699 15.0549C12.1252 15.1252 12.1978 15.1798 12.2807 15.2134C12.3636 15.2469 12.4538 15.2582 12.5424 15.2461C12.813 15.2445 13.083 15.2227 13.3503 15.1809H13.393L13.4065 15.7682H13.375C13.0798 15.8367 12.778 15.873 12.4749 15.8762C12.2559 15.8841 12.0374 15.8498 11.8314 15.775C11.6717 15.71 11.5363 15.5967 11.4443 15.4509C11.3478 15.2942 11.2835 15.1198 11.2553 14.9379C11.2175 14.6982 11.2002 14.4558 11.2035 14.2133C11.2035 13.6012 11.2913 13.1669 11.4668 12.9238C11.6423 12.6808 11.9731 12.5503 12.4412 12.5503C12.754 12.5555 13.0651 12.597 13.3683 12.6741H13.3998L13.3795 13.2569H13.3368C12.7405 13.1669 12.3332 13.1624 12.1734 13.2569C12.1257 13.2934 12.0858 13.3391 12.056 13.3913C12.0263 13.4434 12.0073 13.501 12.0001 13.5607C11.9502 13.811 11.9298 14.0662 11.9394 14.3213C11.9224 14.5728 11.9672 14.8246 12.0699 15.0549ZM15.3958 15.8312V15.811L14.849 14.7916L14.2774 15.8312H13.5146L14.4417 14.2875L13.5168 12.6178H14.3134V12.6403L14.8602 13.7249L15.4408 12.6178H16.1924L15.2675 14.2583L16.1946 15.8335L15.3958 15.8312Z" />
    </svg>
  `,downloadXls:B`
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M19.495 8.16219H19.3824L19.495 8.14643C19.4803 8.03379 19.4298 7.92885 19.3509 7.84714L14.6681 3.16652C14.6423 3.14021 14.6136 3.11682 14.5826 3.09676L14.5601 3.08326C14.5361 3.06843 14.5113 3.05491 14.4859 3.04276L14.4454 3.0315C14.4244 3.02241 14.4025 3.01562 14.3801 3.01125C14.3438 3.00406 14.3069 3.00029 14.2698 3H6.75397C6.60477 3 6.46168 3.05927 6.35618 3.16477C6.25068 3.27028 6.19141 3.41337 6.19141 3.56257V9.61138C6.19141 9.76058 6.25068 9.90368 6.35618 10.0092C6.46168 10.1147 6.60477 10.174 6.75397 10.174C6.90317 10.174 7.04626 10.1147 7.15177 10.0092C7.25727 9.90368 7.31654 9.76058 7.31654 9.61138V4.1319H13.7073V8.21394C13.7079 8.36258 13.767 8.50499 13.8719 8.6103C13.9768 8.71561 14.119 8.77533 14.2676 8.77652L18.3766 8.79902V19.6927H7.31654V18.8218C7.31654 18.6726 7.25727 18.5296 7.15177 18.424C7.04626 18.3185 6.90317 18.2593 6.75397 18.2593C6.60477 18.2593 6.46168 18.3185 6.35618 18.424C6.25068 18.5296 6.19141 18.6726 6.19141 18.8218V20.2553C6.19141 20.4045 6.25068 20.5476 6.35618 20.6531C6.46168 20.7586 6.60477 20.8179 6.75397 20.8179H18.9391C19.0883 20.8179 19.2314 20.7586 19.3369 20.6531C19.4424 20.5476 19.5017 20.4045 19.5017 20.2553V8.2387C19.5016 8.21305 19.4994 8.18745 19.495 8.16219ZM14.8324 7.65362V4.92851L17.5732 7.66712L14.8324 7.65362Z"
      />
      <path
        d="M 16.4241,10.8491 H 5.06257 c -0.14921,0 -0.2923,0.0592 -0.3978,0.1647 C 4.55927,11.1193 4.5,11.2624 4.5,11.4116 v 5.61 c 0,0.1492 0.05927,0.2923 0.16477,0.3978 0.1055,0.1055 0.24859,0.1648 0.3978,0.1648 H 16.4241 c 0.1492,0 0.2923,-0.0593 0.3978,-0.1648 0.1055,-0.1055 0.1648,-0.2486 0.1648,-0.3978 v -5.61 c 0,-0.1492 -0.0593,-0.2923 -0.1648,-0.3978 -0.1055,-0.1055 -0.2486,-0.1647 -0.3978,-0.1647 z m -1.967512,3.830785 c -0.045,-0.055 -0.126,-0.103 -0.242,-0.144 -0.078,-0.027 -0.258,-0.075 -0.537,-0.145 -0.36,-0.089 -0.612,-0.199 -0.758,-0.329 -0.204,-0.183 -0.305,-0.406 -0.305,-0.669 0,-0.169 0.048,-0.327 0.143,-0.475 0.097,-0.147 0.235,-0.26 0.415,-0.337 0.181,-0.077 0.4,-0.116 0.655,-0.116 0.418,0 0.731,0.092 0.942,0.275 0.211,0.183 0.322,0.427 0.333,0.733 l -0.672,0.029 c -0.028,-0.171 -0.09,-0.294 -0.184,-0.369 -0.095,-0.074 -0.237,-0.112 -0.426,-0.112 -0.195,0 -0.348,0.04 -0.458,0.12 -0.072,0.052 -0.107,0.121 -0.107,0.207 0,0.078 0.033,0.146 0.1,0.201 0.085,0.072 0.29,0.146 0.617,0.223 0.326,0.077 0.568,0.157 0.725,0.239 0.156,0.083 0.279,0.195 0.367,0.338 0.089,0.143 0.133,0.32 0.133,0.53 0,0.19 -0.053,0.369 -0.159,0.535 -0.106,0.166 -0.255,0.29 -0.449,0.371 -0.194,0.081 -0.434,0.121 -0.723,0.121 -0.421,0 -0.744,-0.097 -0.969,-0.291 -0.226,-0.195 -0.359,-0.478 -0.403,-0.85 l 0.653,-0.063 c 0.039,0.219 0.118,0.38 0.239,0.483 0.12,0.103 0.282,0.154 0.486,0.154 0.216,0 0.379,-0.045 0.489,-0.137 0.11,-0.092 0.165,-0.198 0.165,-0.321 0,-0.079 -0.024,-0.146 -0.07,-0.201 z m -2.271,0.607 v 0.56 H 9.8445878 v -3.298 h 0.6710002 v 2.738 z m -5.6889997,-2.765 h 0.786 l 0.666,1.068 0.653,-1.068 h 0.778 l -1.034,1.615 1.136,1.71 h -0.81 l -0.737,-1.15 -0.739,1.15 h -0.805 l 1.136,-1.735 z"
      />
    </svg>
  `,arrowS:B`
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.5324 10.929L6.51758 10.9291V11.9291L15.6744 11.929L11.528 16.0754L12.2351 16.7825L17.5176 11.5L12.2351 6.21753L11.528 6.92464L15.5324 10.929Z"/>
    </svg>
  `,chevronDownM:B`
    <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M20.0104 23.6067L12.7071 16.3034L12 17.0105L20.0104 25.0209L28.0208 17.0105L27.3137 16.3034L20.0104 23.6067Z"/>
    </svg>
  `,chevronUpM:B`
    <svg viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M20.0111 17.4143L27.3144 24.7176L28.0215 24.0105L20.0111 16.0001L12.0007 24.0105L12.7078 24.7176L20.0111 17.4143Z"/>
    </svg>
  `,chevronRightM:B`
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.2421 17.1924L14.4848 12.9497L10.2421 8.70711L10.9492 8L15.899 12.9497L10.9492 17.8995L10.2421 17.1924Z"/>
    </svg>
  `,externalLinkS:B`
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M14 5V5.99897H17.294L12.2975 10.9961H6V18L13 18V11.706L18.001 6.70438V10H19V5H14ZM12 17V11.9961H7L7 17L12 17Z"/>
    </svg>
  `,externalLinkL:B`
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M13.5021 5.99897V5H19V10.4979H18.001V6.70438L11.9073 12.7989L11.2011 12.0927L17.294 5.99897H13.5021ZM6.004 17.9961C5.99816 14.414 5.9992 10.8317 6.00402 7.24947H10.752V8.24844H7.00283V16.9972H15.7516V13.2481H16.7505V17.9961H6.004Z"/>
    </svg>
  `,socialFacebook:B`
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24ZM13.0736 12.692V20H10.1156V12.692H7.64351V9.85059H10.1156V7.7536C10.1156 5.3211 11.6052 4 13.792 4C14.5315 4 15.2711 4.04194 16 4.11533V6.65269H14.4893C13.3061 6.65269 13.0736 7.21887 13.0736 8.0367V9.85059H15.9049L15.5352 12.692H13.0736Z"/>
    </svg>
  `,socialInstagram:B`
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.45 12.175C14.45 10.9162 13.4338 9.9 12.175 9.9C10.9162 9.9 9.9 10.9162 9.9 12.175C9.9 13.4338 10.9162 14.45 12.175 14.45C13.4338 14.45 14.45 13.4338 14.45 12.175Z"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M14.8177 6.09032L14.8228 6.09061L14.828 6.09086C15.4743 6.12106 15.8695 6.21988 16.2077 6.34656C16.5323 6.4697 16.7969 6.63387 17.0745 6.91146L17.0782 6.91514L17.0819 6.91878C17.329 7.16099 17.5171 7.45034 17.6383 7.77507L17.6411 7.78258L17.644 7.79004C17.7728 8.11993 17.8719 8.50988 17.9021 9.15801C17.936 9.88173 17.943 10.0999 17.943 11.993C17.943 13.8864 17.936 14.1112 17.9022 14.8275C17.8719 15.4757 17.7728 15.8661 17.644 16.196L17.6411 16.2034L17.6383 16.2109C17.5171 16.5357 17.329 16.825 17.0819 17.0672L17.0745 17.0745L17.0672 17.0819C16.825 17.329 16.5357 17.5171 16.2109 17.6383L16.2034 17.6411L16.196 17.644C15.8661 17.7728 15.4761 17.8719 14.828 17.9021C14.1042 17.936 13.8931 17.943 11.993 17.943C10.0926 17.943 9.87482 17.936 9.15847 17.9022C8.51034 17.8719 8.11993 17.7728 7.79004 17.644L7.78258 17.6411L7.77507 17.6383C7.45034 17.5171 7.16099 17.329 6.91878 17.0819L6.9115 17.0745L6.90408 17.0672C6.65701 16.825 6.46891 16.5357 6.34775 16.2109L6.34495 16.2034L6.34203 16.196C6.21609 15.8735 6.12158 15.4854 6.09086 14.828C6.05703 14.1042 6.05 13.8931 6.05 11.993C6.05 10.0826 6.05031 9.87529 6.09032 9.16834L6.09061 9.16318L6.09086 9.15801C6.12111 8.51066 6.22019 8.11524 6.34715 7.77668L6.34775 7.77507C6.46891 7.45034 6.65701 7.16099 6.90408 6.91878L6.9115 6.9115L6.91878 6.90408C7.16099 6.65701 7.45034 6.46891 7.77507 6.34775L7.78258 6.34495L7.79004 6.34203C8.11246 6.21609 8.50059 6.12158 9.15801 6.09086C9.88173 6.05704 10.0999 6.05 11.993 6.05C13.9034 6.05 14.1107 6.05031 14.8177 6.09032ZM15.675 7.45C16.158 7.45 16.55 7.842 16.55 8.325C16.55 8.808 16.158 9.2 15.675 9.2C15.192 9.2 14.8 8.808 14.8 8.325C14.8 7.842 15.192 7.45 15.675 7.45ZM12.175 8.85C14.0137 8.85 15.5 10.3363 15.5 12.175C15.5 14.0137 14.0137 15.5 12.175 15.5C10.3363 15.5 8.85 14.0137 8.85 12.175C8.85 10.3363 10.3363 8.85 12.175 8.85Z"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24ZM17.817 6.169C17.432 5.784 17.04 5.539 16.578 5.364C16.13 5.196 15.626 5.077 14.877 5.042C14.135 5 13.897 5 11.993 5C10.096 5 9.858 5.007 9.109 5.042C8.36 5.077 7.856 5.189 7.408 5.364C6.939 5.539 6.519 5.812 6.169 6.169C5.812 6.519 5.539 6.939 5.364 7.408C5.196 7.856 5.077 8.36 5.042 9.109C5 9.851 5 10.089 5 11.993C5 13.897 5.007 14.128 5.042 14.877C5.077 15.626 5.189 16.13 5.364 16.578C5.539 17.047 5.812 17.467 6.169 17.817C6.519 18.174 6.939 18.447 7.408 18.622C7.856 18.797 8.36 18.916 9.109 18.951C9.851 18.986 10.089 18.993 11.993 18.993C13.897 18.993 14.128 18.986 14.877 18.951C15.626 18.916 16.13 18.797 16.578 18.622C17.047 18.447 17.467 18.174 17.817 17.817C18.174 17.467 18.447 17.047 18.622 16.578C18.797 16.13 18.916 15.626 18.951 14.877C18.986 14.135 18.993 13.89 18.993 11.993C18.993 10.096 18.986 9.858 18.951 9.109C18.916 8.36 18.797 7.856 18.622 7.408C18.447 6.939 18.174 6.519 17.817 6.169Z" />
    </svg>
  `,socialLinkedIn:B`
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24ZM16.22 17.86H18.88V13.14C18.88 10.83 18.38 9.05 15.68 9.05C14.38 9.05 13.51 9.77 13.15 10.44H13.12V9.27H10.56V17.85H13.23V13.6C13.23 12.48 13.46 11.4 14.83 11.4C16.2 11.4 16.22 12.68 16.22 13.68V17.86ZM6 6.55C6 7.4 6.7 8.09 7.55 8.09V8.1C8.41 8.1 9.1 7.4 9.1 6.55C9.1 5.69 8.4 5 7.55 5C6.69 5 6 5.7 6 6.55ZM6.22 17.85H8.89V9.27H6.22V17.85Z" />
    </svg>
  `,socialTwitter:B`
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="m12 0c-6.6274134 0-12 5.3725866-12 12 0 6.627393 5.3725866 12 12 12 6.627393 0 12-5.372607 12-12 0-6.6274134-5.372607-12-12-12zm-7.125 5.4824219h4.6015625l3.1757815 4.2011719 3.675781-4.2011719h2.228516l-4.871094 5.5683591 5.732422 7.578125h-4.488281l-3.515626-4.595703-4.0214839 4.595703h-2.2304687l5.2109376-5.957031zm2.6035156 1.265625 8.0664064 10.5449221h1.236328l-7.9765625-10.5449221z"/>
    </svg>
  `,socialYouTube:B`
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.4629 12.1972L10.5 9.92343V14.471L14.4629 12.1972Z" />
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24ZM17.1485 7.38979C17.8631 7.5522 18.4803 8.07193 18.6102 8.78654C18.7726 9.59861 18.935 10.7355 19 12.1972C18.9675 13.6265 18.8051 14.7958 18.6752 15.6079C18.5452 16.355 17.9281 16.8422 17.2135 17.0046C16.0766 17.232 14.1276 17.3944 11.9838 17.3944C9.83991 17.3944 7.89095 17.232 6.75406 17.0046C6.03944 16.8422 5.42227 16.3225 5.29234 15.6079C5.12993 14.7958 5 13.6589 5 12.1972C5 10.7355 5.12993 9.59861 5.25986 8.78654C5.38979 8.03944 6.00696 7.5522 6.72158 7.38979C7.7935 7.16241 9.80742 7 11.9513 7C14.0951 7 16.0766 7.16241 17.1485 7.38979Z" />
    </svg>
  `,home:B`
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M11.564 3.41883C11.849 3.34183 12.15 3.34183 12.435 3.41883C12.766 3.50883 13.045 3.72783 13.267 3.90183L13.33 3.95083L18.982 8.34683L19.046 8.39683C19.36 8.64083 19.636 8.85483 19.843 9.13383C20.023 9.37783 20.158 9.65383 20.24 9.94683C20.334 10.2798 20.333 10.6298 20.333 11.0268V17.1698C20.333 17.6098 20.333 17.9898 20.307 18.3008C20.28 18.6308 20.221 18.9578 20.06 19.2738C19.8204 19.744 19.4381 20.1262 18.968 20.3658C18.652 20.5258 18.325 20.5858 17.995 20.6128C17.683 20.6388 17.305 20.6388 16.865 20.6388H7.13402C6.69402 20.6388 6.31602 20.6388 6.00402 20.6128C5.67402 20.5858 5.34602 20.5268 5.03102 20.3658C4.56089 20.1262 4.17865 19.744 3.93902 19.2738C3.77802 18.9578 3.71902 18.6308 3.69202 18.3008C3.66602 17.9888 3.66602 17.6108 3.66602 17.1708V11.0278C3.66602 10.6298 3.66602 10.2798 3.75902 9.94683C3.8408 9.65394 3.97534 9.37843 4.15602 9.13383C4.36202 8.85483 4.63902 8.64083 4.95302 8.39683L5.01702 8.34683L10.67 3.94983L10.732 3.90083C10.955 3.72683 11.234 3.50783 11.565 3.41783L11.564 3.41883ZM11.994 5.03983C11.8914 5.11205 11.791 5.18742 11.693 5.26583L6.04002 9.66183C5.62502 9.98483 5.54702 10.0548 5.49502 10.1248C5.43503 10.2061 5.3903 10.2976 5.36302 10.3948C5.33902 10.4798 5.33202 10.5838 5.33202 11.1098V17.1388C5.33202 17.6188 5.33202 17.9288 5.35202 18.1658C5.37002 18.3918 5.40202 18.4758 5.42202 18.5168C5.50202 18.6738 5.63002 18.8008 5.78702 18.8808C5.82802 18.9018 5.91202 18.9338 6.13802 18.9518C6.37402 18.9718 6.68502 18.9718 7.16502 18.9718H16.832C17.312 18.9718 17.622 18.9718 17.859 18.9518C18.085 18.9338 18.169 18.9018 18.21 18.8818C18.3669 18.8017 18.4943 18.6739 18.574 18.5168C18.595 18.4758 18.627 18.3918 18.645 18.1658C18.665 17.9288 18.665 17.6188 18.665 17.1388V11.1088C18.665 10.5838 18.658 10.4798 18.635 10.3958C18.6076 10.2981 18.5625 10.2063 18.502 10.1248C18.45 10.0548 18.372 9.98483 17.957 9.66183L12.305 5.26683C12.2058 5.18661 12.1041 5.10957 12 5.03583C11.9977 5.03713 11.9953 5.03846 11.993 5.03983H11.994ZM7.83202 15.6388H16.165V17.3048H7.83302V15.6398L7.83202 15.6388Z"/>
    </svg>
  `,chevronBreadcrumb:B`
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M5.53027 3.52898C5.79027 3.26898 6.21227 3.26898 6.47227 3.52898L10.4723 7.52898C10.7323 7.78898 10.7323 8.21098 10.4723 8.47098L6.47227 12.471C6.41091 12.5354 6.33729 12.5869 6.25574 12.6224C6.17419 12.658 6.08635 12.6769 5.9974 12.6779C5.90844 12.679 5.82017 12.6623 5.73778 12.6288C5.65538 12.5952 5.58053 12.5455 5.51763 12.4826C5.45472 12.4197 5.40504 12.3449 5.37149 12.2625C5.33795 12.1801 5.32123 12.0918 5.32232 12.0029C5.3234 11.9139 5.34227 11.8261 5.37781 11.7445C5.41335 11.663 5.46485 11.5893 5.52927 11.528L9.05827 7.99998L5.52927 4.46998C5.40457 4.34495 5.33455 4.17557 5.33455 3.99898C5.33455 3.8224 5.40457 3.65302 5.52927 3.52798L5.53027 3.52898Z"/>
    </svg>
  `,quotes:B`
    <svg viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M18.549 34.715C29.1448 24.1195 43.5155 18.167 58.5 18.167C58.6326 18.167 58.7598 18.2197 58.8536 18.3134C58.9473 18.4072 59 18.5344 59 18.667C59 18.7996 58.9473 18.9268 58.8536 19.0205C58.7598 19.1143 58.6326 19.167 58.5 19.167C43.7805 19.167 29.6638 25.0143 19.2556 35.4226C8.8473 45.8308 3 59.9475 3 74.667V82.667C3 82.7996 2.94732 82.9268 2.85355 83.0205C2.75979 83.1143 2.63261 83.167 2.5 83.167C2.36739 83.167 2.24021 83.1143 2.14645 83.0205C2.05268 82.9268 2 82.7996 2 82.667V74.667C2.00001 67.2472 3.46148 59.9 6.30096 53.0451C9.14045 46.1901 13.3023 39.9615 18.549 34.715Z" />
      <path fill-rule="evenodd" clip-rule="evenodd" d="M29.3338 55.49C25.7524 55.4683 22.202 56.1549 18.8869 57.5104C15.5718 58.8659 12.5575 60.8635 10.0173 63.3883C7.47718 65.9131 5.46131 68.9153 4.08572 72.2221C2.71012 75.5289 2.00195 79.075 2.00195 82.6565C2.00195 86.238 2.71012 89.7841 4.08572 93.0909C5.46131 96.3977 7.47718 99.3998 10.0173 101.925C12.5575 104.449 15.5718 106.447 18.8869 107.803C22.202 109.158 25.7524 109.845 29.3338 109.823C36.5389 109.823 43.4489 106.961 48.5437 101.866C53.6385 96.7712 56.5008 89.8611 56.5008 82.656C56.5008 75.4509 53.6385 68.5408 48.5437 63.446C43.4489 58.3512 36.5389 55.489 29.3338 55.489V55.49ZM85.3828 34.715C90.6294 29.4685 96.858 25.3068 103.713 22.4675C110.568 19.6282 117.915 18.1669 125.335 18.167C125.467 18.167 125.595 18.2197 125.688 18.3134C125.782 18.4072 125.835 18.5344 125.835 18.667C125.835 18.7996 125.782 18.9268 125.688 19.0205C125.595 19.1143 125.467 19.167 125.335 19.167C110.615 19.167 96.4986 25.0143 86.0904 35.4226C75.6821 45.8308 69.8348 59.9475 69.8348 74.667V82.667C69.8348 82.7996 69.7821 82.9268 69.6883 83.0205C69.5946 83.1143 69.4674 83.167 69.3348 83.167C69.2022 83.167 69.075 83.1143 68.9812 83.0205C68.8875 82.9268 68.8348 82.7996 68.8348 82.667V74.667C68.8347 67.2473 70.296 59.9002 73.1353 53.0452C75.9746 46.1902 80.1363 39.9616 85.3828 34.715Z"/>
      <path d="M69.334 82.656C69.334 89.7282 72.1434 96.5109 77.1443 101.512C82.1451 106.513 88.9277 109.322 96 109.322C103.072 109.322 109.855 106.513 114.856 101.512C119.857 96.5109 122.666 89.7282 122.666 82.656C122.666 75.5837 119.857 68.8011 114.856 63.8003C109.855 58.7994 103.072 55.99 96 55.99C88.9277 55.99 82.1451 58.7994 77.1443 63.8003C72.1434 68.8011 69.334 75.5837 69.334 82.656Z"/>
      <path fill-rule="evenodd" clip-rule="evenodd" d="M76.7891 63.4461C81.8839 58.3512 88.7939 55.489 95.9991 55.489C103.204 55.489 110.114 58.3512 115.209 63.4461C120.304 68.5409 123.166 75.4509 123.166 82.6561C123.166 89.8612 120.304 96.7712 115.209 101.866C110.114 106.961 103.204 109.823 95.9991 109.823C88.7939 109.823 81.8839 106.961 76.7891 101.866C71.6943 96.7712 68.832 89.8612 68.832 82.6561C68.832 75.4509 71.6943 68.5409 76.7891 63.4461ZM95.9991 56.4901C92.5628 56.4901 89.1601 57.1669 85.9854 58.4819C82.8107 59.7969 79.926 61.7244 77.4962 64.1542C75.0664 66.584 73.1389 69.4687 71.8239 72.6434C70.5089 75.8181 69.8321 79.2208 69.8321 82.6571C69.8321 86.0934 70.5089 89.496 71.8239 92.6707C73.1389 95.8455 75.0664 98.7301 77.4962 101.16C79.926 103.59 82.8107 105.517 85.9854 106.832C89.1601 108.147 92.5628 108.824 95.9991 108.824C102.939 108.824 109.595 106.067 114.502 101.16C119.409 96.2527 122.166 89.597 122.166 82.6571C122.166 75.7171 119.409 69.0615 114.502 64.1542C109.595 59.2469 102.939 56.4901 95.9991 56.4901Z" />
    </svg>
   `,checkMark:B`
    <svg viewBox="0 0 41 40" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.6692 25.2866L31.9892 9.96497L34.3475 12.3216L16.6692 30L6.0625 19.3933L8.41917 17.0366L16.6692 25.2866Z"/>
    </svg>
  `,tagThick:B`
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <clipPath id="a"><path d="m0 0h16v16h-16z"/></clipPath>
      <g clip-path="url(#a)" stroke-linecap="round" stroke-linejoin="round">
        <path d="m1.7109375.20703125c-.3976342 0-.77937958.15829183-1.06054688.43945312-.28116192.28116793-.43945312.66291393-.43945312 1.06054683v4.171875c-.00007998.6626725.26398669 1.2988468.73242188 1.7675782l7.70703122 7.7070316c.2811703.281125.6630144.439453 1.0605469.439453.3975375 0 .7793755-.158282 1.0605465-.439453l4.585938-4.585938c.281029-.281179.439453-.663009.439453-1.0605467 0-.3975326-.158328-.7793766-.439453-1.0605469l-7.7070314-7.70703127a.50005.50005 0 0 0 0-.001953c-.4687317-.46843693-1.1049068-.73054761-1.7675781-.73046888zm0 .99999995h4.171875c.3979077-.0000472.7790993.1581827 1.0605469.4394532l7.7070316 7.7070312c.09387.093889.146484.2207287.146484.3535157 0 .1328019-.05251.2594952-.146484.3535157l-4.585938 4.585937c-.093829.09383-.2207135.146485-.3535155.146485-.132787 0-.2596263-.05261-.3535156-.146485l-7.7070313-7.7070309c-.28127-.2814479-.4395011-.6626404-.4394531-1.0605469v-4.171875c0-.1328065.052575-.2596039.1464844-.3535156.093912-.09391.2207103-.1464844.3535156-.1464844z"/><path d="m4.2109375 2.7070313c-.196961 0-.3922116.037886-.5742187.1132812-.1819863.0753776-.3470436.1868873-.4863282.3261719-.1392845.1392845-.2507943.3043419-.3261718.4863281-.0753951.1820071-.1132813.3772578-.1132813.5742187 0 .196961.03789.3922207.1132813.5742188.075378.1820016.1868697.347041.3261718.4863281.1392846.1392846.3043669.2488366.4863282.3242188.1819675.075364.3772323.1152343.5742187.1152343s.3922488-.039864.5742187-.1152343c.1819766-.0753824.3470411-.1849167.4863282-.3242188.1393021-.1392871.2507895-.3043515.3261718-.4863281.07536-.1819586.1132813-.3772324.1132813-.5742188 0-.1969863-.0379176-.3922512-.1132813-.5742187-.0753822-.1819612-.1868873-.3470436-.3261718-.4863281-.1392871-.1393021-.3043266-.2507942-.4863282-.3261719-.1820095-.0754022-.3772577-.1132813-.5742187-.1132812zm0 1c.065679 0 .130776.011992.1914062.037109.060658.025122.1156967.062957.1621094.109375.046435.046435.084237.1014309.109375.1621094.025136.060692.037109.1257529.037109.1914062 0 .065653-.011969.1307051-.037109.1914063-.025137.060683-.062957.1156967-.109375.1621094-.046413.046418-.1014262.082284-.1621094.1074218-.06067.025129-.1257528.039063-.1914062.039063-.065653 0-.130714-.013926-.1914063-.039063-.0606785-.0251373-.115674-.0609862-.1621093-.1074215-.0464177-.0464127-.0842528-.1014512-.109375-.1621094-.0251286-.0606616-.0371094-.1257275-.0371094-.1914063 0-.065679.011985-.1307536.037109-.1914062.025122-.060654.06294-.1156741.109375-.1621094.046435-.046435.1014558-.084253.1621093-.109375.060653-.025125.1257275-.037109.1914063-.037109z"/>
      </g>
    </svg>
  `,pinThick:B`
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <clipPath id="a"><path d="m0 0h16v16h-16z"/></clipPath><g clip-path="url(#a)" stroke-linecap="round" stroke-linejoin="round">
      <path d="m.5 15a.5.5 0 0 0 -.5.5.5.5 0 0 0 .5.5h15a.5.5 0 0 0 .5-.5.5.5 0 0 0 -.5-.5z"/><path d="m8 0c-1.4584939 0-2.8573596.58000482-3.8886719 1.6113281-1.0313233 1.0313123-1.6113281 2.430178-1.6113281 3.8886719 0 1.6824503 1.3499181 3.4319699 2.6269531 4.867188 1.2770351 1.435217 2.5488281 2.513671 2.5488281 2.513671a.50005.50005 0 0 0 .6484376 0s1.271793-1.078454 2.5488282-2.513671c1.277035-1.4352181 2.626953-3.1847377 2.626953-4.867188 0-1.4584989-.579996-2.8573619-1.611328-3.8886719-1.031248-1.0313472-2.4301781-1.6113281-3.888672-1.6113281zm0 1c1.1936635 0 2.337691.4743285 3.181641 1.3183594.844066.8440481 1.318359 1.9879822 1.318359 3.1816406 0 1.078877-1.150084 2.8286779-2.373047 4.203125-1.0610144 1.192439-1.8637852 1.867268-2.126953 2.095703-.2631678-.228435-1.0659386-.903264-2.1269531-2.095703-1.2229625-1.3744471-2.3730469-3.124248-2.3730469-4.203125 0-1.1936635.4743046-2.3375948 1.3183594-3.1816406.8440458-.8440548 1.9879771-1.3183594 3.1816406-1.3183594z"/></g>
    </svg>
  `,calendarThick:B`
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <clipPath id="a"><path d="m0 0h16v16h-16z"/></clipPath>
      <g clip-path="url(#a)" stroke="none" stroke-linecap="round" stroke-linejoin="round"><path d="m1.5 2c-.666666 0-1.13763733.4080872-1.32226563.7773438-.18462829.3692565-.17773437.7226562-.17773437.7226562v11c0 .666666.40808716 1.137637.77734375 1.322266.36925655.184628.72265625.177734.72265625.177734h13c.666666 0 1.137637-.408087 1.322266-.777344.184628-.369256.177734-.722656.177734-.722656v-11c0-.666666-.408087-1.1376373-.777344-1.3222656-.369256-.1846283-.722656-.1777344-.722656-.1777344zm0 1h13s.146601.00689.277344.072266c.130743.0653711.222656.094401.222656.427734v11s-.0069.146601-.07227.277344c-.065367.130743-.094397.222656-.42773.222656h-13s-.1466008-.0069-.2773438-.07227c-.1307429-.065367-.2226562-.094397-.2226562-.42773v-11s.00689-.1466008.072266-.2773437c.0653711-.130743.094401-.2226563.427734-.2226563z"/><path d="m.5 6a.5.5 0 0 0 -.5.5.5.5 0 0 0 .5.5h15a.5.5 0 0 0 .5-.5.5.5 0 0 0 -.5-.5z"/><path d="m4.5 0a.5.5 0 0 0 -.5.5v3.5a.5.5 0 0 0 .5.5.5.5 0 0 0 .5-.5v-3.5a.5.5 0 0 0 -.5-.5z"/><path d="m11.5 0a.5.5 0 0 0 -.5.5v3.5a.5.5 0 0 0 .5.5.5.5 0 0 0 .5-.5v-3.5a.5.5 0 0 0 -.5-.5z"/></g>
    </svg>
  `},K1=["streamlineTag","streamlinePin","streamlineMegaphoneAdvertising","streamlineAlarmBell","streamlineAlarmBellCheck","streamlineCognito","streamlineCalendarClock","streamlineCalendarDate","streamlineCalendar","streamlineCertificate","streamlineFileCheck","streamlineMegaphoneCircle","streamlineHierarchy","streamlineLegalHammer","streamlineLegalScale","streamlineLegalScaleDocument","streamlineMegaphone","streamlineTimeClockCircle","streamlineAuditors2","streamlineAuthority","streamlineCourt","streamlineCsp","streamlineDataProtection2","streamlineEao","streamlineEservices","streamlineFccp","streamlineFinancialService","streamlineFinancialServices","streamlineInsolvency","streamlineObligations","streamlineOfficeSpace","streamlinePlay","streamlinePostRegistration","streamlineRegistrationAuthority","streamlineCertStamp","streamlineBulbCog","streamlineFinancialHand","streamlineWorldBook","streamlineGovBuilding","streamlineSolarSystem","streamlineFinancialChart","streamlineHelpDesk","streamlineVisa","streamlineCheckShield","streamlineAwardRibbon","microsoftExcel","microsoftPowerpoint","microsoftWord","officeFileAdobe","officeFileDoc","officeFilePdf","officeFilePpt","officeFileXls","streamlinePinThick","streamlineTagThick","streamlineCalendarThick"];/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let ei=class extends hr{constructor(e){if(super(e),this.et=P,e.type!==cr.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===P||e==null)return this.ft=void 0,this.et=e;if(e===he)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.et)return this.ft;this.et=e;const a=[e];return a.raw=a,this.ft={_$litType$:this.constructor.resultType,strings:a,values:[]}}};ei.directiveName="unsafeHTML",ei.resultType=1;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class ni extends ei{}ni.directiveName="unsafeSVG",ni.resultType=2;const Z1=dr(ni);var X1=Object.defineProperty,Q1=Object.getOwnPropertyDescriptor,Se=(t,e,a,i)=>{for(var n=i>1?void 0:i?Q1(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&X1(e,a,n),n};s.Icon=class extends E{connectedCallback(){super.connectedCallback();let e=this.icon??"";switch(this.icon){case"officeFilePdf":case"officeFileAdobe":e="downloadPdf";break;case"officeFileDoc":case"microsoftWord":e="downloadDocx";break;case"microsoftExcel":case"officeFileXls":e="downloadXls";break}this.isDeprecated()&&fetch(`${this.iconPath}/${e}.svg`).then(a=>{a.text().then(i=>{this.src=i})})}render(){return d`
      ${this.renderDebug("adgm-icon",{description:this.icon})}
      ${y(this.isDeprecated()&&this.src,()=>Z1(this.src),()=>y(this.icon,()=>ti==null?void 0:ti[this.icon??"arrowM"],()=>d`<slot></slot>`))}
    `}isDeprecated(){return this.icon?K1.includes(this.icon):!1}},s.Icon.styles=Y1,Se([O({context:vr})],s.Icon.prototype,"iconPath",2),Se([l({type:Boolean})],s.Icon.prototype,"mirror",2),Se([l({type:String})],s.Icon.prototype,"size",2),Se([l({type:String})],s.Icon.prototype,"color",2),Se([l({type:String})],s.Icon.prototype,"icon",2),Se([l({type:String,attribute:!1})],s.Icon.prototype,"src",2),s.Icon=Se([b("adgm-icon")],s.Icon);const ai=200,J1=g`
  :host {
    display: inline-block;
    width: 100%;
    height: 100%;
  }

  div {
    width: 100%;
    height: 100%;
  }

  div.--variant-primary {
    background-color: ${({theme:t})=>t.colors.steelgrey40};
    overflow: hidden;
    position: relative;
  }
  div.--variant-primary:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: ${ai}px;
    background: linear-gradient(
      90deg,
      transparent,
      ${({theme:t})=>t.colors.white.alpha(.3)},
      transparent
    );
    animation: gradient 1.5s infinite ease;
  }

  div.--variant-debug {
    border-radius: 2px;
    box-shadow: ${({theme:t})=>t.colors.steelgrey40} 0 0 0 1px inset;
    background-image: linear-gradient(
        to left top,
        transparent 0%,
        transparent calc(50% - 0.8px),
        ${({theme:t})=>t.colors.steelgrey40} 50%,
        transparent calc(50% + 0.8px),
        transparent 100%
      ),
      linear-gradient(
        to right top,
        transparent 0%,
        transparent calc(50% - 0.8px),
        ${({theme:t})=>t.colors.steelgrey40} 50%,
        transparent calc(50% + 0.8px),
        transparent 100%
      );
  }

  @keyframes gradient {
    from {
      left: -${ai}px;
    }
    to {
      left: calc(100% + ${ai}px);
    }
  }
`;var t0=Object.defineProperty,e0=Object.getOwnPropertyDescriptor,Gr=(t,e,a,i)=>{for(var n=i>1?void 0:i?e0(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&t0(e,a,n),n};s.Placeholder=class extends L{constructor(){super(...arguments),this.variant="primary"}render(){return d`<div class=${`--variant-${this.variant}`}></div>`}},s.Placeholder.styles=J1,Gr([l({type:String})],s.Placeholder.prototype,"variant",2),s.Placeholder=Gr([b("adgm-placeholder")],s.Placeholder);const n0=g`
  :host {
    position: relative;
  }

  .button {
    border-radius: 50%;
  }
  .button.--size-s {
    width: ${v(40)};
    height: ${v(40)};
  }
  .button.--size-m {
    width: ${v(56)};
    height: ${v(56)};
  }
  :host([mirror]) {
    transform: scaleX(-1);
  }

  .button.--variant-input {
    border-radius: 0 2px 2px 0;
    margin-left: -1px;
  }
  .button:not(.--outlined).--variant-input {
    color: ${({theme:t})=>t.colors.white};
    background: ${({theme:t})=>t.colors.clearsky100};
  }
  .button:not(.--outlined).--variant-input:hover {
    background: ${({theme:t})=>t.colors.clearsky80};
  }
  .button:not(.--outlined).--variant-input:active {
    background: ${({theme:t})=>t.colors.clearsky80};
  }
`;var a0=Object.defineProperty,i0=Object.getOwnPropertyDescriptor,Bt=(t,e,a,i)=>{for(var n=i>1?void 0:i?i0(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&a0(e,a,n),n};s.IconButton=class extends E{constructor(){super(...arguments),this.variant="primary",this.size="m",this.disabled=!1,this.outlined=!1,this.icon="arrowL",this.mirrorIcon=!1,this.type="button"}render(){const e=A({button:!0,[`--variant-${this.variant}`]:!0,[`--size-${this.size}`]:!0,"--outlined":!!this.outlined,"--anim":!!this.anim});return d`
      ${this.renderDebug("adgm-icon-button")}
      ${y(this.href,()=>d`
          <a
            href=${this.href}
            target=${Y(this.target)}
            class=${e}
          >
            ${this.renderContent()}
          </a>
        `,()=>d`
          <button
            ?disabled=${this.disabled}
            class=${e}
            type=${this.type}
            @click=${this.onClick}
          >
            ${this.renderContent()}
          </button>
        `)}
    `}renderContent(){return d`
      <slot name="icon">
        ${y(this.icon,()=>d`
            <adgm-icon
              icon=${this.icon}
              size=${this.size==="m"?"s24":"s20"}
              ?mirror=${this.mirrorIcon}
              color="currentColor"
              _dd
            ></adgm-icon>
          `)}
      </slot>
    `}onClick(e){var a;if(this.type==="submit")return e.preventDefault(),(a=this.form)==null||a.submit(),!1}},s.IconButton.styles=[pr,n0],Bt([O({context:He}),l({attribute:!1})],s.IconButton.prototype,"form",2),Bt([l({type:String})],s.IconButton.prototype,"variant",2),Bt([l({type:String})],s.IconButton.prototype,"size",2),Bt([l({type:Boolean})],s.IconButton.prototype,"disabled",2),Bt([l({type:Boolean})],s.IconButton.prototype,"outlined",2),Bt([l({type:String})],s.IconButton.prototype,"icon",2),Bt([l({type:Boolean})],s.IconButton.prototype,"anim",2),Bt([l({type:Boolean})],s.IconButton.prototype,"mirror",2),Bt([l({type:Boolean,attribute:"mirror-icon"})],s.IconButton.prototype,"mirrorIcon",2),Bt([l({type:String})],s.IconButton.prototype,"href",2),Bt([l({type:String})],s.IconButton.prototype,"target",2),Bt([l({type:String})],s.IconButton.prototype,"type",2),s.IconButton=Bt([b("adgm-icon-button")],s.IconButton);const r0=g`
  :host {
    display: block;
    --font-weight: 600;
    position: relative;
  }

  :host([inline]) {
    display: inline-block;
  }

  ${({theme:t})=>t.enclosedParse(":host([hide-on-m])",{display:p({base:"none",m:"block"})})}

  ${({theme:t})=>t.enclosedParse(":host([hide-on-d])",{display:p({base:"block",m:"none"})})}

  ${()=>kt("weight",["300","400","500","600"],{property:"--font-weight"})}

  a {
    display: flex;
    user-select: none;
    text-decoration: none;
    whitespace: nowrap;
    justify-content: flex-start;
    align-items: center;
    transition: ${({theme:t})=>`color ${t.defaults.transitionDuration} ${t.defaults.transitionEase}`};
    border-radius: 2px;
  }

  a[href] {
    cursor: pointer;
  }

  a[href]:hover .text,
  a.--force-hover .text {
    text-decoration: underline;
    text-underline-position: under;
  }

  a:focus-visible {
    outline: 2px solid ${({theme:t})=>t.colors.clearsky60};
  }

  a {
    color: ${({theme:t})=>t.colors.foreground};
    --icon-fill: ${({theme:t})=>t.colors.foreground};
  }
  a.--variant-primary:hover {
    color: ${({theme:t})=>t.colors.clearsky80};
    --icon-fill: ${({theme:t})=>t.colors.clearsky80};
  }
  a.--variant-primary:active {
    color: ${({theme:t})=>t.colors.clearsky60};
    --icon-fill: ${({theme:t})=>t.colors.clearsky60};
  }

  a[href].--variant-secondary {
    color: ${({theme:t})=>t.colors.clearsky100};
    --icon-fill: ${({theme:t})=>t.colors.clearsky100};
  }
  a[href].--variant-secondary:hover {
    color: ${({theme:t})=>t.colors.clearsky80};
    --icon-fill: ${({theme:t})=>t.colors.clearsky80};
  }
  a[href].--variant-secondary:active {
    color: ${({theme:t})=>t.colors.clearsky60};
    --icon-fill: ${({theme:t})=>t.colors.clearsky60};
  }
  :host([selected]) a[href].--variant-secondary {
    color: ${({theme:t})=>t.colors.black100};
    --icon-fill: ${({theme:t})=>t.colors.black100};
  }

  a[href].--variant-tertiary {
    color: ${({theme:t})=>t.colors.white};
    --icon-fill: ${({theme:t})=>t.colors.white};
  }
  a[href].--variant-tertiary:hover {
    color: ${({theme:t})=>t.colors.black20};
    --icon-fill: ${({theme:t})=>t.colors.black20};
  }
  a[href].--variant-tertiary:active {
    color: ${({theme:t})=>t.colors.black20};
    --icon-fill: ${({theme:t})=>t.colors.black20};
  }

  a .text {
    letter-spacing: 0.005rem;
  }

  ${({theme:t})=>t.enclosedParse("a.--size-xs .text",{...t.typography.textXS.properties,lineHeight:"130%"})}

  ${({theme:t})=>t.enclosedParse("a.--size-s .text",{...t.typography.textS.properties,lineHeight:"130%"})}

  ${({theme:t})=>t.enclosedParse("a.--size-m .text",{...t.typography.textM.properties,lineHeight:"130%"})}

  ${({theme:t})=>t.enclosedParse("a.--size-l .text",{...t.typography.textL.properties,lineHeight:"130%"})}

  ${({theme:t})=>t.enclosedParse("a.--size-xl .text",{...t.typography.textXL.properties,lineHeight:"130%"})}

  a.--anim:hover adgm-icon,
  a.--anim.--force-hover adgm-icon {
    animation: slide 0.6s;
  }

  @keyframes slide {
    0% {
      transform: translateX(0);
      opacity: 1;
    }
    50% {
      transform: translateX(100%);
      opacity: 0;
    }
    51% {
      transform: translateX(-75%);
      opacity: 0;
    }
    100% {
      transform: translateX(0);
      opacity: 1;
    }
  }

  ${({theme:t})=>t.enclosedParse("a.--size-xs adgm-icon",{width:`calc(${t.typography.textXS.properties.fontSize} * 1.5)`,height:`calc(${t.typography.textXS.properties.fontSize} * 1.5)`})}

  ${({theme:t})=>t.enclosedParse("a.--size-s adgm-icon",{width:`calc(${t.typography.textS.properties.fontSize} * 1.5)`,height:`calc(${t.typography.textS.properties.fontSize} * 1.5)`})}

  ${({theme:t})=>t.enclosedParse("a.--size-m adgm-icon",{width:`calc(${t.typography.textM.properties.fontSize} * 1.5)`,height:`calc(${t.typography.textM.properties.fontSize} * 1.5)`})}

  ${({theme:t})=>t.enclosedParse("a.--size-l adgm-icon",{width:`calc(${t.typography.textL.properties.fontSize} * 1.5)`,height:`calc(${t.typography.textL.properties.fontSize} * 1.5)`})}

  ${({theme:t})=>t.enclosedParse("a.--size-xl adgm-icon",{width:`calc(${t.typography.textXL.properties.fontSize} * 1.5)`,height:`calc(${t.typography.textXL.properties.fontSize} * 1.5)`})}

  a.--size-xs {
    gap: ${({theme:t})=>`calc(${t.typography.textXS.properties.fontSize} / 3.5)`};
  }
  a.--size-s {
    gap: ${({theme:t})=>`calc(${t.typography.textS.properties.fontSize} / 3.5)`};
  }
  a.--size-m {
    gap: ${({theme:t})=>`calc(${t.typography.textM.properties.fontSize} / 3.5)`};
  }
  a.--size-l {
    gap: ${({theme:t})=>`calc(${t.typography.textL.properties.fontSize} / 3.5)`};
  }
  a.--size-xl {
    gap: ${({theme:t})=>`calc(${t.typography.textXL.properties.fontSize} / 3.5)`};
  }

  a.--icon-arrowS.--size-xs,
  a.--icon-arrowM.--size-xs,
  a.--icon-arrowL.--size-xs {
    gap: ${({theme:t})=>`calc(${t.typography.textXS.properties.fontSize} / 2)`};
  }
  a.--icon-arrowS.--size-s,
  a.--icon-arrowM.--size-s,
  a.--icon-arrowL.--size-s {
    gap: ${({theme:t})=>`calc(${t.typography.textS.properties.fontSize} / 2)`};
  }
  a.--icon-arrowS.--size-m,
  a.--icon-arrowM.--size-m,
  a.--icon-arrowL.--size-m {
    gap: ${({theme:t})=>`calc(${t.typography.textM.properties.fontSize} / 2)`};
  }
  a.--icon-arrowS.--size-l,
  a.--icon-arrowM.--size-l,
  a.--icon-arrowL.--size-l {
    gap: ${({theme:t})=>`calc(${t.typography.textL.properties.fontSize} / 2)`};
  }
  a.--icon-arrowS.--size-xl,
  a.--icon-arrowM.--size-xl,
  a.--icon-arrowL.--size-xl {
    gap: ${({theme:t})=>`calc(${t.typography.textXL.properties.fontSize} / 2)`};
  }
`;var o0=Object.defineProperty,s0=Object.getOwnPropertyDescriptor,_t=(t,e,a,i)=>{for(var n=i>1?void 0:i?s0(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&o0(e,a,n),n};s.LinkButton=class extends E{constructor(){super(...arguments),this.hasParentHover=!1,this.variant="primary",this.size="m",this.mirrorIcon=!1,this.reverse=!1,this.inline=!1,this.hideOnM=!1,this.hideOnD=!1,this.forceHover=!1}render(){return d`
      ${this.renderDebug("link-button",{description:this.variant})}
      <a
        class=${A({[`--variant-${this.variant}`]:!0,[`--size-${this.size}`]:!0,[`--icon-${this.icon}`]:!0,"--force-hover":this.hasParentHover||this.forceHover,"--anim":!!this.anim})}
        href=${Y(this.href)}
        target=${Y(this.target)}
      >
        ${y(this.icon&&this.reverse,()=>d`
              <slot name="icon">
                <adgm-icon
                  icon=${this.icon}
                  ?mirror=${this.mirrorIcon}
                  _dd
                ></adgm-icon>
              </slot>
            `,()=>d`<slot name="leading-icon"></slot>`)}
        <slot name="pre"></slot>
        <div class="text">
          <slot></slot>
        </div>
        <slot name="post"></slot>
        ${y(this.icon&&!this.reverse,()=>d`
            <slot name="icon">
              <adgm-icon
                icon=${this.icon}
                ?mirror=${this.mirrorIcon}
                _dd
              ></adgm-icon>
            </slot>
          `,()=>d`<slot name="trailing-icon"></slot>`)}
      </a>
    `}},s.LinkButton.styles=[_,r0],_t([O({context:ze,subscribe:!0}),l({attribute:!1})],s.LinkButton.prototype,"hasParentHover",2),_t([l({type:String})],s.LinkButton.prototype,"variant",2),_t([l({type:String})],s.LinkButton.prototype,"size",2),_t([l({type:String})],s.LinkButton.prototype,"href",2),_t([l({type:String})],s.LinkButton.prototype,"target",2),_t([l({type:Number})],s.LinkButton.prototype,"weight",2),_t([l({type:Boolean,attribute:"mirror-icon"})],s.LinkButton.prototype,"mirrorIcon",2),_t([l({type:String})],s.LinkButton.prototype,"icon",2),_t([l({type:Boolean})],s.LinkButton.prototype,"reverse",2),_t([l({type:Boolean})],s.LinkButton.prototype,"inline",2),_t([l({type:Boolean})],s.LinkButton.prototype,"anim",2),_t([l({type:Boolean,attribute:"hide-on-m"})],s.LinkButton.prototype,"hideOnM",2),_t([l({type:Boolean,attribute:"hide-on-d"})],s.LinkButton.prototype,"hideOnD",2),_t([l({type:Boolean,attribute:"force-hover"})],s.LinkButton.prototype,"forceHover",2),s.LinkButton=_t([b("adgm-link-button")],s.LinkButton);const l0=g`
  :host {
    display: grid;
  }

  ${({theme:t})=>t.enclosedParse(":host",{columnGap:t.spacings.rGridGap,gridTemplateColumns:p({base:"1fr",s:"1fr 1fr",m:"repeat(12, 1fr)"})})}

  :host([no-gap]) {
    column-gap: 0 !important;
  }
`;var c0=Object.defineProperty,d0=Object.getOwnPropertyDescriptor,Wr=(t,e,a,i)=>{for(var n=i>1?void 0:i?d0(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&c0(e,a,n),n};s.Grid=class extends L{constructor(){super(...arguments),this.noGap=!1}render(){return d`<slot></slot>`}},s.Grid.styles=l0,Wr([l({type:Boolean,attribute:"no-gap"})],s.Grid.prototype,"noGap",2),s.Grid=Wr([b("adgm-grid")],s.Grid);const h0=["1","2","3","4","5","6","7","8","9","10","11","12"],u0=g`
  :host {
    display: block;
  }

  ${()=>kt("span",h0,{property:"grid-column",pre:"span ",post:" / auto"})}
`;var p0=Object.defineProperty,g0=Object.getOwnPropertyDescriptor,qr=(t,e,a,i)=>{for(var n=i>1?void 0:i?g0(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&p0(e,a,n),n};s.GridItem=class extends L{constructor(){super(...arguments),this.span="1"}render(){return d`<slot></slot>`}},s.GridItem.styles=u0,qr([l({type:String})],s.GridItem.prototype,"span",2),s.GridItem=qr([b("adgm-grid-item")],s.GridItem);const m0=g`
  :host {
    width: 100%;
    height: 100%;
  }

  canvas {
    width: 100%;
    height: 100%;
  }
`,v0="0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz#$%*+,-.:;=?@[]^_{|}~",Xn=(t,e,a)=>{let i=0;for(;e<a;)i*=83,i+=v0.indexOf(t[e++]);return i},Yr=Math.pow,Cn=Math.PI,f0=Cn*2,Kr=3294.6,Zr=269.025,y0=t=>t>10.31475?Yr(t/Zr+.052132,2.4):t/Kr,ii=t=>~~(t>1227e-8?Zr*Yr(t,.416666)-13.025:t*Kr+1),Sn=t=>(t<0?-1:1)*t*t,Xr=t=>{for(t+=Cn/2;t>Cn;)t-=f0;const e=1.27323954*t-.405284735*Sn(t);return .225*(Sn(e)-e)+e};function b0(t){const e=Xn(t,2,6);return[e>>16,e>>8&255,e&255]}function $0(t,e,a,i){const n=Xn(t,0,1),r=n%9+1,o=~~(n/9)+1,c=r*o;let h=0,u=0,m=0,f=0,$=0,x=0,M=0,V=0,N=0,ut=0,xt=0,Zt=0,Pt=0,G=0;const lt=(Xn(t,1,2)+1)/13446*(i|1),ct=new Float64Array(c*3),Dt=b0(t);for(h=0;h<3;h++)ct[h]=y0(Dt[h]);for(h=1;h<c;h++)G=Xn(t,4+h*2,6+h*2),ct[h*3]=Sn(~~(G/(19*19))-9)*lt,ct[h*3+1]=Sn(~~(G/19)%19-9)*lt,ct[h*3+2]=Sn(G%19-9)*lt;const Mt=e*4,$t=new Uint8ClampedArray(Mt*a);for(f=0;f<a;f++)for(Zt=Cn*f/a,m=0;m<e;m++){for($=0,x=0,M=0,Pt=Cn*m/e,u=0;u<o;u++)for(N=Xr(Zt*u),h=0;h<r;h++)V=Xr(Pt*h)*N,ut=(h+u*r)*3,$+=ct[ut]*V,x+=ct[ut+1]*V,M+=ct[ut+2]*V;xt=4*m+f*Mt,$t[xt]=ii($),$t[xt+1]=ii(x),$t[xt+2]=ii(M),$t[xt+3]=255}return $t}var w0=Object.defineProperty,C0=Object.getOwnPropertyDescriptor,Qr=(t,e,a,i)=>{for(var n=i>1?void 0:i?C0(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&w0(e,a,n),n};s.BlurHash=class extends L{render(){return d`<canvas></canvas>`}firstUpdated(){T(()=>{this.renderHash()})}renderHash(){if(!this.hash||!this.shadowRoot){console.warn("Hash not provided");return}const e=this.shadowRoot.querySelector("canvas");if(!e){console.warn("Canvas node not found");return}const a=this.clientWidth,i=this.clientHeight;if(a===0||i===0)return;e.width=a,e.height=i;const n=$0(this.hash,a,i),r=e.getContext("2d");if(!r){console.warn("Canvas context not found");return}const o=r.createImageData(a,i);o.data.set(n),r.putImageData(o,0,0)}},s.BlurHash.styles=m0,Qr([l({type:String})],s.BlurHash.prototype,"hash",2),s.BlurHash=Qr([b("adgm-blur-hash")],s.BlurHash);const S0=g`
  :host {
    display: inline-block;
    aspect-ratio: 215 / 61;
  }

  svg {
    width: 100%;
    height: 100%;
  }

  svg path {
    transition: ${({theme:t})=>`fill ${t.defaults.transitionDuration} ${t.defaults.transitionEase}`};
  }

  .--variant-light path {
    fill: white;
  }

  .--hide-subtitle .subtitle {
    display: none;
  }
`;var x0=Object.defineProperty,P0=Object.getOwnPropertyDescriptor,ri=(t,e,a,i)=>{for(var n=i>1?void 0:i?P0(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&x0(e,a,n),n};s.Logo=class extends L{constructor(){super(...arguments),this.variant="light",this.hideSubtitle=!1}render(){return B`
      <svg
        viewBox="0 0 128 40"
        class=${A({[`--variant-${this.variant}`]:!0,"--hide-subtitle":!!this.hideSubtitle})}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M9.54608 20L4.93655 24.6106C4.2825 25.2648 3.41821 25.6231 2.49164 25.6231C1.56506 25.6231 0.700773 25.2648 0.0467182 24.6106L0 24.5639L4.56281 20L0 15.4361L0.0467182 15.3894C1.39376 14.0421 3.58951 14.0421 4.93655 15.3894L9.54608 20ZM17.1456 3.45794V40H17.2156C19.1233 40 20.6728 38.4502 20.6728 36.5421V0H20.6027C18.6951 0 17.1456 1.54984 17.1456 3.45794ZM6.10451 5.54517L6.04222 5.56854L11.8742 20L6.04222 34.4315L6.10451 34.4548C6.52497 34.6262 6.96101 34.704 7.39704 34.704C8.76744 34.704 10.06 33.8863 10.605 32.5389L15.6739 20L10.605 7.45327C9.88868 5.68536 7.87201 4.82866 6.10451 5.54517ZM37.8106 15.4283L37.7639 15.3816C36.4168 14.0343 34.2211 14.0343 32.874 15.3816L28.2645 19.9922L32.874 24.6028C33.5514 25.2804 34.4313 25.6153 35.3189 25.6153C36.2066 25.6153 37.0864 25.2804 37.7639 24.6028L37.8106 24.5561L33.2478 19.9922L37.8106 15.4283ZM31.7761 5.56854L31.7139 5.54517C29.9463 4.82866 27.9297 5.68536 27.2133 7.45327L22.1444 20L27.2133 32.5467C27.5559 33.4034 28.2178 34.0732 29.0665 34.4315C29.5025 34.6184 29.9619 34.7118 30.4135 34.7118C30.8651 34.7118 31.2934 34.6262 31.7061 34.4548L31.7684 34.4315L25.9364 20L31.7684 5.56854H31.7761Z" fill="#0088FF"/>
        <path d="M67.4694 10.4439C66.6129 10.4439 65.9121 11.1449 65.9121 12.0016V27.9751C65.9121 28.8318 66.6129 29.5327 67.4694 29.5327H74.1189C79.3825 29.5327 83.665 25.2492 83.665 19.9844C83.665 14.7196 79.3825 10.4362 74.1189 10.4362H67.4694V10.4439ZM74.1189 26.0203H69.4315V13.9642H74.1189C77.4437 13.9642 80.1456 16.6667 80.1456 19.9922C80.1456 23.3178 77.4437 26.0203 74.1189 26.0203Z" fill="black"/>
        <path d="M60.2834 29.5405H64.1765L56.289 11.4564C56.0164 10.8411 55.4013 10.4362 54.7239 10.4362H53.5014C52.824 10.4362 52.2089 10.8411 51.9286 11.4642L44.041 29.5483H47.9342L49.5927 25.7087H58.6171L58.6327 25.7399L60.2834 29.5483V29.5405ZM57.1844 22.3754H51.0487L54.1166 15.2882L57.1844 22.3754Z" fill="black"/>
        <path d="M124.481 29.5562H128V10.4596H124.216L117.559 21.1761L110.909 10.4596H107.125V29.5562H110.644V16.2618L116.11 24.9612C116.406 25.444 116.944 25.7244 117.559 25.7244C118.174 25.7244 118.727 25.4284 119.007 24.9612L124.473 16.2618V29.5562H124.481Z" fill="black"/>
        <path d="M100.85 22.6012V29.2056L101.013 29.1589C102.921 28.6293 104.198 27.1651 104.198 25.514V19.2523H97.743C95.9677 19.2523 94.5039 20.7009 94.4883 22.4766V22.609H100.842L100.85 22.6012Z" fill="black"/>
        <path d="M95.6934 10.1246C90.2508 10.1246 85.8203 14.5561 85.8203 20C85.8203 25.7243 90.0872 29.8754 95.9659 29.8754C97.2273 29.8754 98.2707 29.7742 99.2284 29.5639V25.9502C98.4186 26.2539 97.4064 26.3863 95.9659 26.3863C92.0961 26.3863 89.3865 23.7617 89.3865 20C89.3865 16.5265 92.2129 13.6916 95.6934 13.6916C97.4999 13.6916 99.2284 14.4782 100.428 15.8411L100.513 15.9424L103.122 13.5125L103.036 13.419C101.159 11.3318 98.4809 10.1324 95.6934 10.1324V10.1246Z" fill="black"/>
      </svg>
    `}},s.Logo.styles=S0,ri([l({type:String})],s.Logo.prototype,"variant",2),ri([l({type:Boolean,attribute:"hide-subtitle"})],s.Logo.prototype,"hideSubtitle",2),s.Logo=ri([b("adgm-logo")],s.Logo);const k0=g`
  :host {
    display: block;
    width: 100%;
    background: ${({theme:t})=>t.colors.citynight180};
    color: ${({theme:t})=>t.colors.white};
    --icon-fill: ${({theme:t})=>t.colors.white};
    position: relative;
  }

  ${({theme:t})=>t.enclosedParse("adgm-container",{paddingTop:p({base:t.spacings.s64,m:t.spacings.s80}),paddingBottom:t.spacings.s64})}

  adgm-grid {
    row-gap: ${({theme:t})=>t.spacings.s64};
  }

  adgm-logo {
    height: 52px;
  }

  ::slotted(svg) {
    height: 52px;
  }

  .bottom {
    display: flex;
    justify-content: space-between;
    text-align: center;
  }

  ${({theme:t})=>t.enclosedParse(".bottom",{flexDirection:p({base:"column",m:"row"}),alignItems:p({base:"center",m:"flex-end"}),gap:p({base:t.spacings.s64,m:t.spacings.s16}),marginTop:t.spacings.s64})}

  ${({theme:t})=>t.enclosedParse(".legal",{padding:p({base:`${t.spacings.s24} 0`,m:"0"})})}

  ${({theme:t})=>t.enclosedParse(".legal-text",{color:t.colors.steelgrey40,...t.typography.textXS.properties})}
`;var _0=Object.defineProperty,O0=Object.getOwnPropertyDescriptor,oi=(t,e,a,i)=>{for(var n=i>1?void 0:i?O0(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&_0(e,a,n),n};s.Footer=class extends E{constructor(){super(...arguments),this.logoHref="/"}render(){var e;return d`
      ${this.renderDebug("adgm-footer")}
      <adgm-container _dd>
        ${y((e=this.currentBreakpoint)==null?void 0:e.state.m,()=>d`
            <adgm-grid _dd>
              <slot></slot>
            </adgm-grid>
          `,()=>d`
            <adgm-flex direction="column" _dd>
              <slot></slot>
            </adgm-flex>
          `)}
        <div class="bottom">
          <a class="logo" href=${this.logoHref}>
            <slot name="logo">
              <adgm-logo _dd></adgm-logo>
            </slot>
          </a>
          <div class="legal">
            <div class="legal-text">
              <slot name="legalText"></slot>
            </div>
            <slot name="legalLinks"></slot>
          </div>
          <div class="social-links">
            <slot name="socialLinks"></slot>
          </div>
        </div>
      </adgm-container>
    `}},s.Footer.styles=k0,oi([O({context:bt,subscribe:!0}),l({attribute:!1})],s.Footer.prototype,"currentBreakpoint",2),oi([l({type:String,attribute:"logo-href"})],s.Footer.prototype,"logoHref",2),s.Footer=oi([b("adgm-footer")],s.Footer);const L0=g`
  :host {
    display: block;
  }

  ${({theme:t})=>t.enclosedParse("::slotted(a)",t.typography.textXS.properties)}

  ::slotted(a) {
    color: ${({theme:t})=>t.colors.steelgrey40};
    text-decoration: underline;
    text-underline-position: under;
    position: relative;
    white-space: nowrap;
    transition: ${({theme:t})=>`color ${t.defaults.transitionDuration} ${t.defaults.transitionEase}`};
  }

  ::slotted(a:hover) {
    color: ${({theme:t})=>t.colors.white};
  }

  ::slotted(a:not(:last-child)) {
    margin-right: 10px;
  }

  ::slotted(a:not(:last-child))::after {
    content: "|";
    color: ${({theme:t})=>t.colors.steelgrey40} !important;
    position: absolute;
    text-decoration: none;
    right: -9px;
    top: 0;
    pointer-events: none;
    line-height: normal;
  }

  ::slotted(a:focus-visible) {
    outline: ${({theme:t})=>t.defaults.focusVisible};
    border-radius: 2px;
  }
`;var E0=Object.defineProperty,D0=Object.getOwnPropertyDescriptor,M0=(t,e,a,i)=>{for(var n=i>1?void 0:i?D0(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&E0(e,a,n),n};s.FooterLegalLinks=class extends L{render(){return d`<slot></slot>`}},s.FooterLegalLinks.styles=L0,s.FooterLegalLinks=M0([b("adgm-footer-legal-links")],s.FooterLegalLinks);const T0=g`
  :host {
    display: flex;
  }

  ${({theme:t})=>t.enclosedParse(":host",{gap:p({base:t.spacings.s12.toString(),m:t.spacings.s4.toString()})})}

  ::slotted(a) {
    text-decoration: none;
    transition: ${({theme:t})=>`opacity ${t.defaults.transitionDuration} ${t.defaults.transitionEase}`};
  }
  ::slotted(a:hover) {
    --icon-fill: ${({theme:t})=>t.colors.black20};
  }
  ::slotted(a:focus-visible) {
    outline: ${({theme:t})=>t.defaults.focusVisible};
    border-radius: 999px;
  }

  ${({theme:t})=>t.enclosedParse("::slotted(a)",{width:p({base:"46px",m:"24px"}),height:p({base:"46px",m:"24px"})})}
`;var A0=Object.defineProperty,N0=Object.getOwnPropertyDescriptor,B0=(t,e,a,i)=>{for(var n=i>1?void 0:i?N0(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&A0(e,a,n),n};s.FooterSocialLinks=class extends L{render(){return d`<slot></slot>`}},s.FooterSocialLinks.styles=T0,s.FooterSocialLinks=B0([b("adgm-footer-social-links")],s.FooterSocialLinks);const I0=g`
  :host {
    grid-column: span 2 / auto;
    grow: 1;
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: ${({theme:t})=>t.spacings.s32};
  }

  ${({theme:t})=>t.enclosedParse(":host",{gridColumn:p({m:"span 3 / auto",l:"span 2 / auto"})})}

  .title {
    margin: 0;
    padding: 0;
    min-height: ${v(60)};
    max-width: 160px;
  }

  .content {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${({theme:t})=>t.spacings.s16};
  }

  ${({theme:t})=>t.enclosedParse("::slotted(a)",{...t.typography.textS.properties,fontWeight:400,color:t.colors.white,textDecoration:"none"})}

  ::slotted(a:hover) {
    text-decoration: underline;
    text-underline-position: under;
  }

  ::slotted(a:focus-visible) {
    outline: ${({theme:t})=>t.defaults.focusVisible};
    border-radius: 2px;
  }
`;var F0=Object.defineProperty,z0=Object.getOwnPropertyDescriptor,si=(t,e,a,i)=>{for(var n=i>1?void 0:i?z0(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&F0(e,a,n),n};s.FooterCategory=class extends L{render(){var e,a,i;return d`
      ${y((((e=this.currentBreakpoint)==null?void 0:e.windowWidth)??0)<(((i=(a=this.theme)==null?void 0:a.breakpoints)==null?void 0:i.m.start)??0),()=>d`
          <adgm-expansion-panel variant="secondary" _dd>
            <adgm-text slot="title" variant="textL" weight="400">
              <slot name="title"></slot>
            </adgm-text>
            <div class="content">
              <slot></slot>
            </div
          </adgm-expansion-panel>
        `,()=>d`
          <adgm-text class="title" variant="textXL" weight="400" _dd>
            <slot name="title"></slot>
          </adgm-text>
          <div class="content">
            <slot></slot>
          </div>
        `)}
    `}},s.FooterCategory.styles=I0,si([O({context:ue}),l({attribute:!1})],s.FooterCategory.prototype,"theme",2),si([O({context:bt,subscribe:!0}),l({attribute:!1})],s.FooterCategory.prototype,"currentBreakpoint",2),s.FooterCategory=si([b("adgm-footer-category")],s.FooterCategory);const H0=g`
  :host {
    display: contents;
  }

  ${({theme:t})=>t.enclosedParse(".placeholder, header",{height:p({base:"80px",xxl:"106px"})})}
`,R0=g`
  header {
    width: 100%;
    position: absolute;
    z-index: 101;
    top: 0;
    left: 0;
    right: 0;

    display: flex;
    align-items: center;
    box-sizing: border-box;
    justify-content: space-between;

    background: ${({theme:t})=>t.colors.white};
    --icon-fill: ${({theme:t})=>t.colors.foreground};
    --item-link-color: ${({theme:t})=>t.colors.foreground};
  }

  header.--fixed:before {
    content: "";
    position: absolute;
    height: 30px;
    bottom: -30px;
    left: 0;
    width: 100%;
    background: linear-gradient(
      180deg,
      ${({theme:t})=>t.colors.black100.alpha(.1)} 0%,
      ${({theme:t})=>t.colors.black100.alpha(0)} 100%
    );
    pointer-events: none;
  }

  header.--fixed {
    position: fixed;
  }

  header.--large.--float {
    background: linear-gradient(
        180deg,
        ${({theme:t})=>t.colors.black100.alpha(.35)} 0%,
        ${({theme:t})=>t.colors.black100.alpha(.15)} 100%
      ),
      linear-gradient(0deg, rgba(0, 42, 58, 0.2), rgba(0, 42, 58, 0.2));
    --icon-fill: ${({theme:t})=>t.colors.white};
    --item-link-color: ${({theme:t})=>t.colors.white};
  }

  ${({theme:t})=>t.enclosedParse("header.--large",{padding:p({base:"0 16px",xxl:"0 32px"})})}

  header.--small {
    background: ${({theme:t})=>t.colors.background} !important;
  }

  ${({theme:t})=>t.enclosedParse("header.--small",{padding:p({base:"0 16px",m:"0 32px"})})}

  header.--animate-start {
    transform: translateY(calc(-100% - 30px));
    transition: transform 0.2s ease-out;
  }
  header.--animate-in {
    transform: translateY(0);
  }
`,V0=g`
  nav {
    display: flex;
    align-items: center;
    height: 100%;
  }

  ${({theme:t})=>t.enclosedParse("nav",{gap:p({base:"24px",xxl:"38px"})})}

  .items {
    display: flex;
    height: 100%;
    align-items: center;
  }

  .items ::slotted(adgm-navigation-item) {
    height: 100%;
  }

  ${({theme:t})=>t.enclosedParse(".items",{gap:p({base:t.spacings.s12,xxl:t.spacings.s20})})}

  ${({theme:t})=>t.enclosedParse("header.--large adgm-button",{display:p({base:"none",xl:"block"})})}
`,j0=g`
  .logo:focus-visible {
    outline: ${({theme:t})=>t.defaults.focusVisible};
    border-radius: 2px;
  }

  ${({theme:t})=>t.enclosedParse("adgm-logo, ::slotted(svg)",{height:p({base:"40px",xxl:"62px"})})}
`,U0=g`
  .hamburger {
    width: 32px;
    height: 32px;
    border-radius: 999px;
    background: none;
    padding: 0;
    margin: 0;
    border: 0;
    cursor: pointer;
    transition: ${({theme:t})=>`transform ${t.defaults.transitionDuration} ${t.defaults.transitionEase}`};
  }

  .hamburger:focus-visible {
    outline: ${({theme:t})=>t.defaults.focusVisible};
  }

  .hamburger.--active {
    transform: rotate(-180deg);
  }
`,G0=g`
  .menu {
    position: absolute;
    box-sizing: border-box;
    width: 100%;
    left: 0;
    display: none;
    opacity: 0;
    transition: opacity 0.2s ease, height 0.3s ease;
  }

  .menu.--open {
    display: block;
    opacity: 0;
  }

  .menu.--animate-open {
    opacity: 1;
  }

  .menu.--animate-close {
    display: block;
    opacity: 0;
  }

  .menu .container {
    transition: transform 0.2s ease-out;
    transform: translateY(-40px);
  }

  .menu.--animate-open .container {
    transform: translateY(0);
  }

  .menu.--animate-close .container {
    transform: translateY(-40px);
  }
`,W0=g`
  .menu.--small {
    top: 79px;
    height: calc(var(--app-height, 100vh) - 79px);
    background: ${({theme:t})=>t.colors.white};
  }

  ${({theme:t})=>t.enclosedParse(".menu.--small",{padding:p({base:"0 16px 48px",m:"0 32px 48px"})})}

  .menu.--small .container {
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: ${({theme:t})=>t.spacings.s48};
  }

  .expansion-panels {
    height: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    overflow-x: hidden;
  }
`,q0=g`
  .menu.--large {
    background: ${({theme:t})=>t.colors.white};
    padding: ${({theme:t})=>t.spacings.s96} 0;
  }

  ${({theme:t})=>t.enclosedParse(".menu.--large",{top:p({base:"80px",xxl:"106px"})})}

  .menu.--large:after {
    content: "";
    position: absolute;
    height: 40px;
    left: 0;
    bottom: -40px;
    width: 100%;
    background: linear-gradient(
      180deg,
      ${({theme:t})=>t.colors.black100.alpha(.1)} 0%,
      ${({theme:t})=>t.colors.black100.alpha(0)} 100%
    );
    pointer-events: none;
  }

  .sub-menu {
    min-width: 300px;
    max-width: 300px;
    overflow: hidden;
    @media only screen and (max-width: 1200px) {
      min-width: 200px;
      max-width: 200px;
      overflow: hidden;
    }
  }

  .sub-menu-title {
    margin-left: 30px;
    overflow: hidden;
  }

  .sub-menu adgm-hr {
    margin: ${({theme:t})=>t.spacings.s32} 0;
    margin-right: ${({theme:t})=>t.spacings.s32};
  }

  .sub-menu .sub-links {
    display: flex;
    flex-direction: column;
    gap: ${({theme:t})=>t.spacings.s24};
    margin-right: 30px;
    overflow: hidden;
  }

  ${({theme:t})=>t.enclosedParse(".sub-menu a",{...t.typography.textM.properties,fontWeight:400,color:t.colors.clearsky100,textDecoration:"none"})}

  .sub-menu a:hover {
    color: #33a0ff;
    text-decoration: underline;
    text-underline-position: under;
  }

  .sub-menu a:focus-visible {
    outline: ${({theme:t})=>t.defaults.focusVisible};
    border-radius: 2px;
  }
  a.search-button {
    text-decoration: none;
    transition: ${({theme:t})=>`opacity ${t.defaults.transitionDuration} ${t.defaults.transitionEase}`};
    fill: ${({theme:t})=>t.colors.white};
    border-radius: 999px;
    cursor: pointer;
  }

  ${({theme:t})=>t.enclosedParse("a.search-button",{width:p({base:"32px",xxl:"40px"}),height:p({base:"32px",xxl:"40px"})})}

  a.search-button:hover {
    --icon-fill: ${({theme:t})=>t.colors.black20};
  }

  a.search-button:focus-visible {
    outline: ${({theme:t})=>t.defaults.focusVisible};
  }

  .search-container.--big.--open {
    position: relative;
  }

  ${({theme:t})=>t.enclosedParse(".search-container.--big.--open",{width:p({base:"calc(100vw - 300px)",l:"calc(100vw - 300px)",xl:"calc(100vw - 600px)",xxl:"calc(100vw - 700px)"})})}

  .search-container.--open.--small {
    position: absolute;
    left: 0;
    width: 96%;
    top: 79px;
    padding-right: ${({theme:t})=>t.spacings.s12};
    padding-left: ${({theme:t})=>t.spacings.s12};
    padding-bottom: ${({theme:t})=>t.spacings.s12};
    background: ${({theme:t})=>t.colors.white};
  }

  .search-container {
    display: flex;
    align-items: center;
  }

  .search-container adgm-text-input {
    width: 100%;
  }

  .actions-container {
    display: flex;
    align-items: center;
  }

  .sub-container {
    display: flex;
  }

  ${({theme:t})=>t.enclosedParse(".actions-container",{gap:p({base:t.spacings.s4.toString(),m:t.spacings.s8.toString()})})}
`,Jr="navigationControls",to="navigationActiveKey";var Y0=Object.defineProperty,K0=Object.getOwnPropertyDescriptor,tt=(t,e,a,i)=>{for(var n=i>1?void 0:i?K0(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&Y0(e,a,n),n};let Qn=0,Jn=!1;s.Navigation=class extends E{constructor(){super(),this.controls={close:()=>this.close(),show:(e,a)=>this.onItemShow(e,a)},this.buttonText="Setting up in ADGM",this.buttonHref="/setting-up",this.logoHref="/",this.searchValue="",this.searchPlaceholder="How can we help you?",this.searchPath="search",this.searchQuery="q",this.isOpen=!1,this.isSticky=!1,this.isNavClick=!1,this.isSearchViewOpen=!1,this.handleLinkClick=e=>{e.target.closest("adgm-content-navigation-item")&&(this.isNavClick=!0,setTimeout(()=>{this.isNavClick=!1},100))},this.onWindowResize=()=>{dt(()=>{this.windowWidth=window.innerWidth,this.close()},150,"navigationWindowResize")},this.onWindowScroll=()=>{if(this.isNavClick)return;const e=Qn>window.scrollY?"up":"down";Qn=window.scrollY,Jn||(window.requestAnimationFrame(()=>{if(this.isSmall()&&this.isOpen){Jn=!1;return}e==="up"&&Qn>100?this.enableStickyness():Qn<100?this.forceDisableStickyness():this.disableStickyness(),Jn=!1}),Jn=!0)},this.onLeave=()=>{this.isLarge()&&this.startClose()},this.onEnter=()=>{this.isLarge()&&this.cancelClose()},this.enableStickyness=()=>{var e;this.isSticky||(Mn("disableStickyness"),(e=this.headerElement)==null||e.classList.add("--animate-start"),T(()=>{T(()=>{var a;this.isSticky=!0,(a=this.headerElement)==null||a.classList.add("--animate-in")})}))},this.windowWidth=window.innerWidth}render(){return d`
      ${y(!this.float,()=>d`<div class=${A({placeholder:!0})}></div>`)}
      ${y(this.isSmall(),()=>d`
          <header
            class=${A({"--small":!0,"--fixed":this.isSticky||this.isOpen})}
          >
            ${this.renderDebug("adgm-navigation")}
            <a class="logo" href=${this.logoHref}>
              <slot name="logoAlternative">
                <adgm-logo variant="color" _dd></adgm-logo>
              </slot>
            </a>
            <nav>
              ${y(!this.isSearchViewOpen&&!this.disableSearch,()=>d`
                    <div class="actions-container">
                      <div class="search-container">
                        <a
                          @click=${this.handleSearchToggle}
                          class="search-button"
                        >
                          <adgm-icon icon="search" _dd></adgm-icon>
                        </a>
                      </div>
                      <slot name="actions"></slot>
                    </div>
                  `,()=>d`<slot name="actions"></slot>`)}
              <button
                class=${A({hamburger:!0,"--active":this.isOpen})}
                type="button"
                @click=${this.toggle}
              >
                <adgm-icon
                  icon=${this.isOpen?"close":"menu"}
                  _dd
                ></adgm-icon>
              </button>
            </nav>
            ${this.isSearchViewOpen?d`
                  <div class="search-container --open --small">
                    <adgm-text-input
                      .value=${this.searchValue}
                      placeholder=${this.searchPlaceholder}
                      @input=${this.onSearchInputChange}
                      @keydown=${this.handleSearchKeydown}
                      auto-focus
                      _dd
                    >
                      <adgm-icon-button
                        icon="search"
                        slot="button"
                        variant="input"
                        @click=${this.onSearchSend}
                        ?disabled=${!this.searchValue.trim()}
                        _dd
                      ></adgm-icon-button>
                    </adgm-text-input>
                    <a @click=${this.handleSearchToggle} class="search-button">
                      <adgm-icon icon="close" _dd></adgm-icon>
                    </a>
                  </div>
                `:""}
            ${this.renderSmallMenuTemplate()}
          </header>
        `,()=>{var e,a;return d`
          <header
            class=${A({"--large":!0,"--float":!!this.float&&!this.isSticky,"--fixed":this.isSticky})}
          >
            ${this.renderDebug("adgm-navigation")}
            <a class="logo" href=${this.logoHref}>
              <slot
                name=${y(!!(this.float&&!this.isSticky),()=>"logo",()=>"logoAlternative")}
              >
                <adgm-logo
                  variant=${this.float&&!this.isSticky?"light":"color"}
                ></adgm-logo>
              </slot>
            </a>
            <nav>
              ${y(!this.isSearchViewOpen,()=>d`
                  <div class="items">
                    <slot></slot>
                  </div>
                  <div class="actions-container">
                    ${y(!this.disableSearch,()=>d`
                        <div class="search-container --closed --big">
                          <a
                            @click=${this.handleSearchToggle}
                            class="search-button"
                          >
                            <adgm-icon icon="search"></adgm-icon>
                          </a>
                        </div>
                      `)}
                    <slot name="actions"></slot>
                  </div>
                `)}
              ${y(this.isSearchViewOpen,()=>d`
                    <div class="actions-container">
                      <div class="search-container --open --big">
                        <adgm-text-input
                          .value=${this.searchValue}
                          placeholder=${this.searchPlaceholder}
                          @input=${this.onSearchInputChange}
                          @keydown=${this.handleSearchKeydown}
                          auto-focus
                        >
                          <adgm-icon-button
                            icon="search"
                            slot="button"
                            variant="input"
                            @click=${this.onSearchSend}
                            ?disabled=${!this.searchValue.trim()}
                          ></adgm-icon-button>
                        </adgm-text-input>
                        <a
                          @click=${this.handleSearchToggle}
                          class="search-button"
                        >
                          <adgm-icon icon="close"></adgm-icon>
                        </a>
                      </div>
                      <slot name="actions"></slot>
                    </div>
                  `)}
              <adgm-button
                outlined=${!!this.float&&!this.isSticky||P}
                variant=${this.float&&!this.isSticky?"secondary":"primary"}
                href=${this.buttonHref}
                size=${(this.windowWidth??0)>=(((a=(e=this.theme)==null?void 0:e.breakpoints)==null?void 0:a.xxl.start)??0)?"m":"s"}
              >
                ${this.buttonText}
              </adgm-button>
            </nav>
            ${this.renderLargeMenuTemplate()}
          </header>
        `})}
    `}renderSmallMenuTemplate(){return d`
      <div
        class=${A({menu:!0,"--small":!0,"--open":this.isOpen})}
      >
        <div class="container">
          <div class="expansion-panels">
            <slot></slot>
          </div>
          <adgm-button href=${this.buttonHref} full-width _dd>
            ${this.buttonText}
          </adgm-button>
        </div>
      </div>
    `}renderLargeMenuTemplate(){var r;const e=this.querySelector(`adgm-navigation-item[key="${this.activeMenuItemKey}"] .mobile-expansion-panel:first-child .sub-menu-title`),a=(r=e==null?void 0:e.textContent)==null?void 0:r.trim(),n=!a||a.replace(/\s/g,"").length===0?this.activeMenuItemTitle||"":a;return d`
      <div
        class=${A({menu:!0,"--large":!0,"--open":this.isOpen})}
      >
        <div class="container">
          <adgm-container _dd>
            <div class="sub-container">
              <div class="sub-menu">
                <adgm-text
                  variant="text2XL"
                  weight="300"
                  _dd
                  style="margin-right: 30px; overflow: hidden;"
                >
                  ${n}
                </adgm-text>
                <adgm-hr></adgm-hr>
                <div class="sub-links"></div>
              </div>
              <slot name=${this.activeMenuItemKey??"_temp"}></slot>
            </div>
          </adgm-container>
        </div>
      </div>
    `}connectedCallback(){super.connectedCallback(),window.addEventListener("resize",this.onWindowResize),window.addEventListener("scroll",this.onWindowScroll),this.addEventListener("mouseenter",this.onEnter),this.addEventListener("mouseleave",this.onLeave),document.addEventListener("click",this.handleLinkClick)}disconnectedCallback(){window.removeEventListener("resize",this.onWindowResize),window.removeEventListener("scroll",this.onWindowScroll),this.removeEventListener("mouseenter",this.onEnter),this.removeEventListener("mouseleave",this.onLeave),document.removeEventListener("click",this.handleLinkClick),super.disconnectedCallback()}onItemShow(e,a){this.activeMenuItemKey=e,this.activeMenuItemTitle=a||"",this.isOpen&&((this.menuElement.style.height===""||!this.menuElement.style.height)&&(this.menuElement.style.height=this.menuElement.clientHeight+"px"),T(()=>this.menuElement.style.height=`calc(var(--adgm-spacing-s96) + ${this.menuContainerElement.clientHeight}px + var(--adgm-spacing-s96))`)),this.cloneLinksToLargeMenu(),this.open()}disableStickyness(){var e;this.isSticky&&(this.close(),(e=this.headerElement)==null||e.classList.remove("--animate-in"),dt(()=>{var a;(a=this.headerElement)==null||a.classList.remove("--animate-start"),this.isSticky=!1},200,"navigationDisableStickyness"))}forceDisableStickyness(){var e,a;this.isSticky&&(this.close(),Mn("navigationDisableStickyness"),(e=this.headerElement)==null||e.classList.remove("--animate-in"),(a=this.headerElement)==null||a.classList.remove("--animate-start"),this.isSticky=!1)}toggle(){this.isOpen?this.close():this.open()}isSmall(){var e,a;return(this.windowWidth??0)<(((a=(e=this.theme)==null?void 0:e.breakpoints)==null?void 0:a.l.start)??0)}isLarge(){return!this.isSmall()}startClose(){dt(()=>this.close(),500,"navigationAutoClose")}cancelClose(){Mn("navigationAutoClose")}open(){this.isOpen||(this.isSmall()&&window.scrollTo(0,0),this.isOpen=!0,this.menuElement.style.height="",this.menuElement.classList.remove("--animate-close"),T(()=>this.menuElement.classList.add("--animate-open")))}close(){this.isOpen&&(this.menuElement.classList.remove("--animate-open"),this.menuElement.classList.add("--animate-close"),dt(()=>this.menuElement.classList.remove("--animate-close"),500,"menuOpen"),this.isOpen=!1,this.activeMenuItemKey=void 0,this.activeMenuItemTitle=void 0)}cloneLinksToLargeMenu(){var i;const e=this.querySelectorAll(`adgm-navigation-item[key="${this.activeMenuItemKey}"] .mobile-expansion-panel:first-child a`),a=(i=this.shadowRoot)==null?void 0:i.querySelector(".sub-links");if(a){a.innerHTML="";for(let n=0,r=e.length;r>n;n++)a.appendChild(e[n].cloneNode(!0))}}handleSearchToggle(e){var a;if(e.preventDefault(),e.stopPropagation(),this.isSearchViewOpen=!this.isSearchViewOpen,this.isSearchViewOpen)T(()=>{var i,n;(n=(i=this.shadowRoot)==null?void 0:i.querySelector("adgm-text-input"))==null||n.focus()});else{this.searchValue="";const i=(a=this.shadowRoot)==null?void 0:a.querySelector("adgm-text-input");i&&(i.value="")}}onSearchSend(){this.searchValue.trim()&&window.open(`/${this.searchPath}?${this.searchQuery}=${encodeURIComponent(this.searchValue)}`,"_top")}onSearchInputChange(e){var n;const a=e.target,i=(n=a==null?void 0:a.shadowRoot)==null?void 0:n.querySelector("input");i&&(this.searchValue=i.value)}handleSearchKeydown(e){(e.key==="Enter"||e.keyCode===13)&&this.searchValue.trim()&&(e.preventDefault(),this.onSearchSend())}async firstUpdated(){this.updateComplete.then(()=>{try{const e=Array.from(this.querySelectorAll("adgm-navigation-item-content")).map(i=>i.getAttribute("slot")).filter(i=>!!i),a=i=>{const n=this.querySelector(`adgm-navigation-item-content[slot="${i}"]`),c=n.shadowRoot.querySelector("slot").assignedElements({flatten:!0}),h=c.length;n.style.display="flex",n.style.width="100%",n.style.flexWrap="wrap",c.forEach((M,V)=>{const N=M;if(V>=3){N.style.display="none";return}N.style.display=""});const u=Array.from(c).slice(0,3),m=u.filter(M=>M.classList.contains("new-menu")),f=u.filter(M=>!M.classList.contains("new-menu")),$=m.length,x=f.length;u.forEach((M,V)=>{const N=M;N.style.boxSizing="border-box",V<2?N.style.paddingRight="32px":N.style.paddingRight="0",u.length===1?(N.style.width="100%",N.classList.contains("new-menu")&&(N.style.maxWidth="300px")):$>0&&x>0?N.classList.contains("new-menu")?(N.style.width="300px",N.style.maxWidth="300px"):N.style.width=`calc((100% - (${$} * 300px)) / ${x})`:$===0?u.length===2?N.style.width="50%":N.style.width=`calc(100% / ${u.length})`:(N.style.width=u.length===2?"50%":`calc(100% / ${u.length})`,N.style.maxWidth="300px"),N.classList.contains("new-menu")&&(N.querySelectorAll("a").forEach(Pt=>{var lt,ct,Dt,Mt,$t;const G=Pt;(Dt=(ct=(lt=this.theme)==null?void 0:lt.typography)==null?void 0:ct.textM)!=null&&Dt.properties&&Object.entries(this.theme.typography.textM.properties).forEach(([Rt,Vt])=>{G.style[Rt]=Vt}),G.style.fontWeight="400",G.style.color=(($t=(Mt=this.theme)==null?void 0:Mt.colors)==null?void 0:$t.clearsky100)||"#000",G.style.textDecoration="none",G.addEventListener("mouseover",()=>{G.style.color="#33a0ff",G.style.textDecoration="underline",G.style.textUnderlinePosition="under"}),G.addEventListener("mouseout",()=>{var Rt,Vt;G.style.color=((Vt=(Rt=this.theme)==null?void 0:Rt.colors)==null?void 0:Vt.clearsky100)||"#000",G.style.textDecoration="none",G.style.textUnderlinePosition=""}),G.addEventListener("focus",()=>{var Rt,Vt;G.style.outline=((Vt=(Rt=this.theme)==null?void 0:Rt.defaults)==null?void 0:Vt.focusVisible)||"2px solid #000",G.style.borderRadius="2px"}),G.addEventListener("blur",()=>{G.style.outline="",G.style.borderRadius=""})}),N.querySelectorAll("adgm-text").forEach(Pt=>{Pt.style.overflow="hidden"}),N.querySelectorAll("adgm-flex").forEach(Pt=>{Pt.style.overflow="hidden"}))})};e.forEach(i=>{const n=this.querySelector(`adgm-navigation-item-content[slot="${i}"]`);if(n!=null&&n.shadowRoot){const r=n.shadowRoot.querySelector("slot");r&&r.addEventListener("slotchange",()=>{a(i)})}a(i)})}catch(e){console.error("Error in firstUpdated:",e)}})}},s.Navigation.styles=[H0,R0,j0,V0,U0,G0,W0,q0],tt([O({context:ue}),l({attribute:!1})],s.Navigation.prototype,"theme",2),tt([vt({context:Jr}),l({attribute:!1})],s.Navigation.prototype,"controls",2),tt([vt({context:to}),l({attribute:!1})],s.Navigation.prototype,"activeMenuItemKey",2),tt([l({type:Boolean})],s.Navigation.prototype,"float",2),tt([l({type:Boolean,attribute:"disable-search"})],s.Navigation.prototype,"disableSearch",2),tt([l({type:String,attribute:"button-text"})],s.Navigation.prototype,"buttonText",2),tt([l({type:String,attribute:"button-href"})],s.Navigation.prototype,"buttonHref",2),tt([l({type:String,attribute:"logo-href"})],s.Navigation.prototype,"logoHref",2),tt([l({type:String})],s.Navigation.prototype,"searchValue",2),tt([l({type:String,attribute:"search-placeholder"})],s.Navigation.prototype,"searchPlaceholder",2),tt([l({type:String,attribute:"search-path"})],s.Navigation.prototype,"searchPath",2),tt([l({type:String,attribute:"search-query"})],s.Navigation.prototype,"searchQuery",2),tt([q("header")],s.Navigation.prototype,"headerElement",2),tt([q(".menu")],s.Navigation.prototype,"menuElement",2),tt([q(".menu .container")],s.Navigation.prototype,"menuContainerElement",2),tt([w()],s.Navigation.prototype,"activeMenuItemTitle",2),tt([w()],s.Navigation.prototype,"isOpen",2),tt([w()],s.Navigation.prototype,"isSticky",2),tt([w()],s.Navigation.prototype,"autoCloseTimeout",2),tt([w()],s.Navigation.prototype,"windowWidth",2),tt([w()],s.Navigation.prototype,"isNavClick",2),tt([w()],s.Navigation.prototype,"isSearchViewOpen",2),s.Navigation=tt([b("adgm-navigation")],s.Navigation);const Z0=g`
  :host {
    display: inline-block;
    position: relative;
  }

  a {
    display: inline-flex;
    align-items: center;
    gap: ${({theme:t})=>t.spacings.s4};
    color: var(--item-link-color);
    text-decoration: none;
    height: 100%;
    white-space: nowrap;
  }

  a:focus-visible {
    outline: ${({theme:t})=>t.defaults.focusVisible};
    border-radius: 2px;
  }

  a adgm-icon {
    transition: ${({theme:t})=>`transform ${t.defaults.transitionDuration} ${t.defaults.transitionEase}`};
    margin-top: -2px;
  }

  a.--active adgm-icon {
    transform: rotate(-180deg) translateY(-3px);
  }

  a:hover::after,
  a.--active::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 25%;
    height: 2px;
    width: 100%;
    background-color: var(--item-link-color);
  }

  .content {
    display: flex;
    flex-direction: column;
    padding-left: 20px;
  }

  ${({theme:t})=>t.enclosedParse("::slotted(a)",{...t.typography.textL.properties,fontWeight:400,color:t.colors.clearsky100,textDecoration:"none"})}

  ::slotted(a:hover) {
    text-decoration: underline;
    text-underline-position: under;
  }

  ::slotted(a:focus-visible) {
    outline: ${({theme:t})=>t.defaults.focusVisible};
    border-radius: 2px;
  }
`;var X0=Object.defineProperty,Q0=Object.getOwnPropertyDescriptor,ie=(t,e,a,i)=>{for(var n=i>1?void 0:i?Q0(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&X0(e,a,n),n};s.NavigationItem=class extends L{constructor(){super(),this.key=Ot(),this.title="",this.panels=[],this.addEventListener("slotchange",this.handleSlotChange)}handleSlotChange(e){const i=e.target.assignedNodes({flatten:!0});this.panels=i.filter(n=>n instanceof HTMLElement&&n.classList.contains("mobile-expansion-panel")).map(n=>n),this.requestUpdate()}firstUpdated(){this.panels=Array.from(this.querySelectorAll(".mobile-expansion-panel")),this.requestUpdate()}updated(){const e=Array.from(this.querySelectorAll(".mobile-expansion-panel"));e.length!==this.panels.length&&(this.panels=e,this.requestUpdate())}render(){var e,a,i;return y((((e=this.currentBreakpoint)==null?void 0:e.windowWidth)??0)<(((i=(a=this.theme)==null?void 0:a.breakpoints)==null?void 0:i.l.start)??0),()=>this.renderMobileView(),()=>this.renderDesktopView())}renderMobileView(){return d`
      <adgm-expansion-panel @click=${this.handlePanelClick}>
        <adgm-text slot="title" variant="textXL" weight="300" _dd>
          ${this.title}
        </adgm-text>
        <div class="content">
          ${this.panels.length>0?this.panels.map(e=>{var n,r;const a=(r=(n=e.querySelector(".sub-menu-title"))==null?void 0:n.textContent)==null?void 0:r.trim(),i=Array.from(e.querySelectorAll("a"));return a?d`
                  <adgm-expansion-panel
                    class="nested-panel"
                    variant="primary-no-border"
                  >
                    <adgm-text slot="title" variant="textL" weight="300" _dd>
                      ${a}
                    </adgm-text>
                    <div class="nested-content">
                      ${i.map(o=>d`
                          <a
                            href=${o.getAttribute("href")}
                            target=${o.getAttribute("target")||P}
                            rel=${o.getAttribute("target")==="_blank"?"noopener noreferrer":P}
                          >
                            ${o.textContent}
                          </a>
                        `)}
                    </div>
                  </adgm-expansion-panel>
                `:d`
                    <div class="direct-links">
                      ${i.map(o=>d`
                          <a
                            href=${o.getAttribute("href")}
                            target=${o.getAttribute("target")||P}
                            rel=${o.getAttribute("target")==="_blank"?"noopener noreferrer":P}
                          >
                            ${o.textContent}
                          </a>
                        `)}
                    </div>
                  `}):d`<slot></slot>`}
        </div>
      </adgm-expansion-panel>
    `}renderDesktopView(){return d`
      <a
        class=${A({"--active":this.key===this.navigationActiveKey})}
        href=${this.href}
        target=${this.target||P}
        rel=${this.target==="_blank"?"noopener noreferrer":P}
        @click=${this.onClick}
      >
        <adgm-text variant="textS" weight="400" _dd>${this.title}</adgm-text>
        <adgm-icon icon="chevronDownL" size="s24" _dd></adgm-icon>
      </a>
    `}handlePanelClick(){this.panels=Array.from(this.querySelectorAll(".mobile-expansion-panel")),this.requestUpdate()}onClick(e){var i,n;return e.currentTarget.getAttribute("target")==="_blank"?!0:(e.preventDefault(),e.stopPropagation(),this.key===this.navigationActiveKey?(i=this.navigation)==null||i.close():(n=this.navigation)==null||n.show(this.key,this.title),!1)}},s.NavigationItem.styles=[Z0,Ri`
      .nested-content {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }
      .nested-panel {
        margin-top: 10px;
      }

      .nested-content a,
      .direct-links a {
        font-size: 1.25rem;
        line-height: 160%;
        letter-spacing: 0.02em;
        font-weight: 400;
        color: #0088ff;
        text-decoration: none;
        white-space: normal;
      }

      .nested-content a:hover {
        text-decoration: underline;
      }

      .direct-links {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }
    `],ie([O({context:ue}),l({attribute:!1})],s.NavigationItem.prototype,"theme",2),ie([O({context:bt,subscribe:!0}),l({attribute:!1})],s.NavigationItem.prototype,"currentBreakpoint",2),ie([O({context:Jr}),l({attribute:!1})],s.NavigationItem.prototype,"navigation",2),ie([O({context:to,subscribe:!0}),l({attribute:!1})],s.NavigationItem.prototype,"navigationActiveKey",2),ie([l({type:String})],s.NavigationItem.prototype,"key",2),ie([l({type:String})],s.NavigationItem.prototype,"title",2),ie([l({type:String})],s.NavigationItem.prototype,"href",2),ie([l({type:String})],s.NavigationItem.prototype,"target",2),s.NavigationItem=ie([b("adgm-navigation-item")],s.NavigationItem);const J0=g`
  :host {
    display: flex;
    width: 100%;
  }
`;var th=Object.defineProperty,eh=Object.getOwnPropertyDescriptor,nh=(t,e,a,i)=>{for(var n=i>1?void 0:i?eh(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&th(e,a,n),n};s.NavigationItemSub=class extends L{render(){return d`<slot></slot>`}},s.NavigationItemSub.styles=J0,s.NavigationItemSub=nh([b("adgm-navigation-item-content")],s.NavigationItemSub);const ah=g`
  :host {
    display: flex;
  }

  ${({theme:t})=>t.enclosedParse(":host",{gap:p({base:t.spacings.s4.toString(),m:t.spacings.s8.toString()})})}

  ::slotted(a), a {
    text-decoration: none;
    transition: ${({theme:t})=>`opacity ${t.defaults.transitionDuration} ${t.defaults.transitionEase}`};
    fill: ${({theme:t})=>t.colors.white};
    border-radius: 999px;
  }

  ${({theme:t})=>t.enclosedParse("::slotted(a), a",{width:p({base:"32px",xxl:"40px"}),height:p({base:"32px",xxl:"40px"})})}

  ::slotted(a:hover), a:hover {
    --icon-fill: ${({theme:t})=>t.colors.black20};
  }

  ::slotted(a:focus-visible),
  a:focus-visible {
    outline: ${({theme:t})=>t.defaults.focusVisible};
  }
`;var ih=Object.defineProperty,rh=Object.getOwnPropertyDescriptor,oh=(t,e,a,i)=>{for(var n=i>1?void 0:i?rh(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&ih(e,a,n),n};s.NavigationActions=class extends L{render(){return d`<slot></slot>`}},s.NavigationActions.styles=ah,s.NavigationActions=oh([b("adgm-navigation-actions")],s.NavigationActions);var sh=Object.defineProperty,lh=Object.getOwnPropertyDescriptor,It=(t,e,a,i)=>{for(var n=i>1?void 0:i?lh(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&sh(e,a,n),n};s.Hero=class extends E{constructor(){super(),this.size="l",this.slideDelay=1e4,this.slidePauseOnEnter=!1,this.pauseAnimation=!1,this.locked=!1,this.hasStarted=!1,this.isAnimating=!1,this.index=0,this.hasMechanic=!1,this.uuid=Ot()}connectedCallback(){super.connectedCallback(),Nt(this,["adgm-hero-slide","adgm-mechanic"],{onFirstLoad:()=>this.initialize(),onFullLoad:()=>this.initialize(!0)})}initialize(e=!1){this.slides=this.querySelectorAll("adgm-hero-slide"),this.slides.length>0&&this.define(e),this.hasMechanic=!!this.querySelector("adgm-mechanic")}render(){var e,a,i;return d`
      ${this.renderDebug("adgm-hero",{alwaysShow:!0})}
      <div
        class=${A({container:!0,[`--size-${this.size}`]:!0,"--slides":((e=this.slides)==null?void 0:e.length)??0>1})}
        @mouseenter=${this.onEnter}
        @mouseleave=${this.onLeave}
      >
        <div
          class=${A({content:!0,"--has-mechanic":this.hasMechanic&&!!((a=this.currentBreakpoint)!=null&&a.state.m)})}
        >
          ${y(this.size==="s",()=>d`
              <adgm-container _dd>
                <slot name="content"></slot>
              </adgm-container>
            `,()=>d` <slot name="content"></slot> `)}
        </div>

        <slot></slot>

        ${y(((i=this.slides)==null?void 0:i.length)??0>1,()=>{var n;return d`
              <div class="navigation-container">
                <adgm-container _dd>
                  <div class="navigation">
                    ${Array.from(((n=this.slides)==null?void 0:n.values())??[]).map((r,o)=>d`
                          <div
                            class=${A({dot:!0,"--active":o===this.index})}
                            @click=${()=>this.onNavigationClick(o)}
                          ></div>
                        `)}
                  </div>
                </adgm-container>
              </div>
            `})}
      </div>
    `}define(e=!1){var a,i;if(this.isAnimating){console.warn("isAnimating");return}(a=this.slides)==null||a.forEach((n,r)=>{r===this.index?(this.hasStarted?(this.isAnimating=!0,T(()=>T(()=>n.classList.add("--animate-in")))):n.classList.add("--animate-in"),n.classList.add("--active"),n.classList.remove("--hidden")):n.classList.contains("--active")?(n.classList.add("--inactive"),n.classList.remove("--active"),n.classList.remove("--animate-in")):n.classList.add("--hidden")}),this.hasStarted?dt(()=>{var n;this.isAnimating=!1,(n=this.slides)==null||n.forEach(r=>{r.classList.contains("--inactive")&&(r.classList.remove("--inactive"),r.classList.add("--hidden"))})},900,`adgm-hero-slide-${this.uuid}__cleanup`):((i=this.slides)==null||i.forEach(n=>n.classList.add(`--size-${this.size}`)),this.isAnimating=!1,e&&(this.hasStarted=!0)),e&&this.startFade()}startFade(){this.pauseAnimation||dt(()=>this.fadeToNewSlide(),this.slideDelay??5e3,`adgm-hero-slide-${this.uuid}__fade`)}fadeToNewSlide(){var e;this.pauseAnimation||(this.index===(((e=this.slides)==null?void 0:e.length)??0)-1?this.index=0:this.index++,this.define(!0))}fadeToSlide(e){this.pauseAnimation||(this.index=e,this.define(!0),this.startFade(),this.lock())}onEnter(){this.slidePauseOnEnter&&(this.pauseAnimation=!0)}onLeave(){this.slidePauseOnEnter&&(this.pauseAnimation=!1,this.startFade())}onNavigationClick(e){this.locked||(this.lock(),this.fadeToSlide(e))}lock(){this.locked=!0,dt(()=>this.locked=!1,1e3,`adgm-hero-slide-${this.uuid}__unlock`)}},s.Hero.styles=[Ys,ur],It([O({context:bt,subscribe:!0}),l({attribute:!1})],s.Hero.prototype,"currentBreakpoint",2),It([l({type:String})],s.Hero.prototype,"color",2),It([l({type:String})],s.Hero.prototype,"size",2),It([l({type:Number,attribute:"slide-delay"})],s.Hero.prototype,"slideDelay",2),It([l({type:Boolean,attribute:"slide-pause-on-enter"})],s.Hero.prototype,"slidePauseOnEnter",2),It([l({attribute:!1})],s.Hero.prototype,"pauseAnimation",2),It([l({attribute:!1})],s.Hero.prototype,"locked",2),It([w()],s.Hero.prototype,"slides",2),It([w()],s.Hero.prototype,"hasStarted",2),It([w()],s.Hero.prototype,"isAnimating",2),It([w()],s.Hero.prototype,"index",2),It([w()],s.Hero.prototype,"hasMechanic",2),s.Hero=It([b("adgm-hero")],s.Hero);const ch=g`
  :host {
    min-height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    scroll-behavior: smooth;
  }

  .content {
    flex-grow: 1;
  }
`;var dh=Object.defineProperty,hh=Object.getOwnPropertyDescriptor,uh=(t,e,a,i)=>{for(var n=i>1?void 0:i?hh(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&dh(e,a,n),n};s.Page=class extends L{render(){return d`
      <div class="header">
        <slot name="header"></slot>
      </div>
      <div class="content">
        <slot></slot>
      </div>
      <div class="footer">
        <slot name="footer"></slot>
      </div>
    `}},s.Page.styles=ch,s.Page=uh([b("adgm-page")],s.Page);const ph=g`
  :host {
    display: block;
    max-width: 1320px;
    margin: auto;
    position: relative;
  }

  ${({theme:t})=>t.enclosedParse(":host",{paddingLeft:p({base:"16px",m:"32px",l:"64px",xxl:"128px"}),paddingRight:p({base:"16px",m:"32px",l:"64px",xxl:"128px"})})}
`;var gh=Object.defineProperty,mh=Object.getOwnPropertyDescriptor,vh=(t,e,a,i)=>{for(var n=i>1?void 0:i?mh(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&gh(e,a,n),n};s.Container=class extends E{render(){return d`
      ${this.renderDebug("adgm-container")}
      <slot></slot>
    `}},s.Container.styles=[_,ph],s.Container=vh([b("adgm-container")],s.Container);const fh=g`
  :host {
    display: block;
    background: ${({theme:t})=>t.colors.background};
    color: ${({theme:t})=>t.colors.foreground};
    position: relative;
  }

  :host([variant="secondary"]),
  :host([variant="tertiary"]) {
    background: ${({theme:t})=>t.colors.steelgrey20};
    /* color: ${({theme:t})=>t.colors.black100}; */
  }

  :host([variant="quaternary"]) {
    background: ${({theme:t})=>t.colors.citynight180};
    color: ${({theme:t})=>t.colors.white};
  }

  :host([variant="quinary"]) {
    background: ${({theme:t})=>t.colors.coolglass40};
  }
`,Ue="sectionVariant";var yh=Object.defineProperty,bh=Object.getOwnPropertyDescriptor,eo=(t,e,a,i)=>{for(var n=i>1?void 0:i?bh(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&yh(e,a,n),n};s.Section=class extends E{constructor(){super(...arguments),this.variant="primary"}render(){return d`
      ${this.renderDebug("adgm-section",{description:this.variant})}
      <slot></slot>
    `}},s.Section.styles=[_,fh],eo([vt({context:Ue}),l({type:String})],s.Section.prototype,"variant",2),s.Section=eo([b("adgm-section")],s.Section);const $h=g`
  :host {
    display: block;
    color: ${({theme:t})=>t.colors.white};
    position: relative;
  }

  :host([variant="secondary"]),
  :host([variant="tertiary"]) {
    /* color: ${({theme:t})=>t.colors.black100}; */
    color: ${({theme:t})=>t.colors.foreground};
  }

  ::slotted([slot="image"]) {
    width: 100%;
    height: 100%;
    min-height: 358px;
  }

  .body {
    background: ${({theme:t})=>t.colors.clearsky100};
  }

  :host([variant="secondary"]) .body {
    background: ${({theme:t})=>t.colors.coolglass40};
  }

  :host([variant="tertiary"]) .body {
    background: ${({theme:t})=>t.colors.steelgrey20};
  }

  ${({theme:t})=>t.enclosedParse(".body",{gridColumn:p({base:"1 / span 1",s:"1 / span 2",m:"1 / span 7"}),padding:p({base:`${t.spacings.s40} ${t.spacings.s32}`,m:`${t.spacings.s48}`,l:`${t.spacings.s64}`}),gridRow:1})}

  ${({theme:t})=>t.enclosedParse(".image",{gridColumn:p({base:"1 / span 1",s:"1 / span 2",m:"8 / span 5"})})}

  ${({theme:t})=>t.enclosedParse(":host([reverse]) .body",{gridColumn:p({base:"1 / span 1",s:"1 / span 2",m:"6 / span 7"}),padding:p({base:t.spacings.s24,s:t.spacings.s32,m:t.spacings.s48,l:t.spacings.s64}),gridRow:p({base:"2",m:"1"})})}

  ${({theme:t})=>t.enclosedParse(":host([reverse]) .image",{gridColumn:p({base:"1 / span 1",s:"1 / span 2",m:"1 / span 5"}),gridRow:"1"})}
`;var wh=Object.defineProperty,Ch=Object.getOwnPropertyDescriptor,li=(t,e,a,i)=>{for(var n=i>1?void 0:i?Ch(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&wh(e,a,n),n};s.Banner=class extends E{constructor(){super(...arguments),this.variant="primary",this.reverse=!1}render(){return d`
      ${this.renderDebug("adgm-banner",{description:this.variant})}
      <adgm-grid no-gap _dd>
        <div class="body">
          <slot></slot>
        </div>
        <div class="image">
          <slot name="image"></slot>
        </div>
      </adgm-grid>
    `}},s.Banner.styles=[_,$h],li([l({type:String})],s.Banner.prototype,"variant",2),li([l({type:Boolean})],s.Banner.prototype,"reverse",2),s.Banner=li([b("adgm-banner")],s.Banner);const Sh=g`
  :host {
    display: block;
    width: 100%;
    margin-top: -1px;
    position: relative;
  }

  ::slotted(*) {
    color: inherit;
  }

  ::slotted(adgm-presentation-grid) {
    flex-grow: 1;
    --presentation-row-gap: ${({theme:t})=>t.spacings.s8};
  }

  .--variant-secondary,
  .--variant-secondary button {
    color: ${({theme:t})=>t.colors.foreground};
  }
  .--variant-secondary,
  .--variant-secondary button {
    color: ${({theme:t})=>t.colors.white};
  }

  .container.--variant-primary-no-border {
    border-bottom: none !important;
  }

  .container.--variant-secondary,
  .container.--variant-primary {
    border-bottom: 1px solid ${({theme:t})=>t.colors.black20};
  }
  .container.--variant-secondary {
    border-bottom-color: ${({theme:t})=>t.colors.black60};
  }

  adgm-icon {
    transition: ${({theme:t})=>`transform ${t.defaults.transitionDuration} ${t.defaults.transitionEase}`};
  }
  button.--open adgm-icon {
    transform: rotate(-180deg);
  }

  button {
    display: block;
    border: 0;
    padding: ${({theme:t})=>t.spacings.s16} 0;
    gap: ${({theme:t})=>t.spacings.s12};
    color: ${({theme:t})=>t.colors.foreground};
    background: none;
    align-items: center;
    display: flex;
    justify-content: space-between;
    width: 100%;
    cursor: pointer;
    transition: ${({theme:t})=>`
      color ${t.defaults.transitionDuration} ${t.defaults.transitionEase},
      background-color ${t.defaults.transitionDuration} ${t.defaults.transitionEase}
    `};
  }

  .--type-plus button {
    padding: ${({theme:t})=>`${t.spacings.s24} ${t.spacings.rBodyS}`};
  }
  .--type-plus button.--open {
    color: ${({theme:t})=>t.colors.black100};
  }
  .--type-plus button:hover {
    background: ${({theme:t})=>t.colors.coolglass40};
  }

  .body-container {
    transition: max-height 0.6s ease;
    height: auto;
    max-height: 0;
    overflow: hidden;
  }
  .body-container.--animate-in {
    max-height: 100vh;
  }
  .body-container.--animate-in-complete {
    max-height: var(--content-height, inherit);
  }
  .body-container.--animate-in-complete,
  .body-container.--animate-out {
    transition: max-height 0.1s ease;
  }

  .body {
    box-sizing: border-box;
    padding: ${({theme:t})=>`${t.spacings.rBodyS} 0 ${t.spacings.s32}`};
    display: none;
  }

  .--type-plus .body {
    padding: ${({theme:t})=>`${t.spacings.rBodyS} ${t.spacings.rBodyS} ${t.spacings.s32}`};
  }

  .body-container.--open .body {
    display: block;
  }

  .--variant-contentNav button {
    padding: ${({theme:t})=>`${t.spacings.s24} 0`};
  }
`;var xh=Object.defineProperty,Ph=Object.getOwnPropertyDescriptor,re=(t,e,a,i)=>{for(var n=i>1?void 0:i?Ph(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&xh(e,a,n),n};s.ExpansionPanel=class extends E{constructor(){super(),this.defaultOpen=!1,this.variant="primary",this.type="chevron",this.isOpen=!1,this.isLocked=!1,this.uuid=Ot()}firstUpdated(){this.addOnClickCloseToLinks(),(this.defaultOpen||Pi(this.deeplink,this))&&this.open(!1)}render(){return d`
      ${this.renderDebug("adgm-expansion-panel",{onClick:()=>this.toggle()})}
      <adgm-hr
        color=${this.variant==="secondary"?"black60":"black20"}
        ?hidden=${this.variant==="primary-no-border"}
      ></adgm-hr>
      <div class="container --variant-${this.variant} --type-${this.type}">
        <button
          class=${A({"--open":this.isOpen})}
          @click="${this.toggle}"
        >
          <slot name="title"></slot>
          <adgm-icon
            icon=${this.type==="plus"?this.isOpen?"min":"plus":"chevronDownM"}
            size="s32"
            color=${this.variant==="secondary"?"white":"foreground"}
            _dd
          ></adgm-icon>
        </button>
        <div
          class=${A({"body-container":!0,"--open":this.isOpen})}
        >
          <div class="body">
            <slot></slot>
          </div>
        </div>
      </div>
    `}toggle(){this.isOpen?this.close():this.open()}open(e=!0){this.isOpen||this.isLocked||(this.isLocked=!0,this.isOpen=!0,T(()=>{this.bodyContainerElement.classList.add("--animate-in"),dt(()=>{this.isLocked=!1,this.bodyContainerElement.classList.add("--animate-in-complete"),this.bodyContainerElement.classList.remove("--animate-in"),this.deeplink&&Tn(this.deeplink)},e?350:0,`expensionPanel${this.uuid}`)}))}close(){!this.isOpen||this.isLocked||(this.isLocked=!0,this.bodyContainerElement.classList.add("--animate-out"),this.containerElement.style.setProperty("--content-height",`${this.bodyContainerElement.clientHeight}px`),T(()=>{this.bodyContainerElement.classList.remove("--animate-in"),this.bodyContainerElement.classList.remove("--animate-in-complete"),dt(()=>{this.containerElement.style.removeProperty("--content-height"),this.bodyContainerElement.classList.remove("--animate-out"),this.isOpen=!1,this.isLocked=!1,this.deeplink&&xi(this.deeplink)},350,`expensionPanel${this.uuid}`)}))}addOnClickCloseToLinks(){const e=this.querySelectorAll("a");for(let i=0,n=e.length;n>i;i++){const r=e[i];r.onclick=()=>{this.close()}}const a=this.querySelector("slot");if(a){const n=a.assignedElements({flatten:!0}).filter(()=>"a");for(const r of n){const o=r;o.onclick=()=>{this.close()}}}}},s.ExpansionPanel.styles=[_,Sh],re([l({type:Boolean,attribute:"default-open"})],s.ExpansionPanel.prototype,"defaultOpen",2),re([l({type:String})],s.ExpansionPanel.prototype,"variant",2),re([l({type:String})],s.ExpansionPanel.prototype,"type",2),re([l({type:String})],s.ExpansionPanel.prototype,"deeplink",2),re([l({attribute:!1})],s.ExpansionPanel.prototype,"isOpen",2),re([l({attribute:!1})],s.ExpansionPanel.prototype,"isLocked",2),re([q(".body-container")],s.ExpansionPanel.prototype,"bodyContainerElement",2),re([q(".container")],s.ExpansionPanel.prototype,"containerElement",2),s.ExpansionPanel=re([b("adgm-expansion-panel")],s.ExpansionPanel);const kh=g`
  :host {
    display: block;
    height: 1px;
    overflow: hidden;
    background-color: ${({theme:t})=>t.colors.steelgrey40};
  }

  ${({theme:t})=>kt("color",t.colors,{property:"background-color"})}
`;var _h=Object.defineProperty,Oh=Object.getOwnPropertyDescriptor,no=(t,e,a,i)=>{for(var n=i>1?void 0:i?Oh(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&_h(e,a,n),n};s.HorizontalRuler=class extends L{},s.HorizontalRuler.styles=kh,no([l({type:String})],s.HorizontalRuler.prototype,"color",2),s.HorizontalRuler=no([b("adgm-hr")],s.HorizontalRuler);const Lh=g`
  :host {
    display: inline-flex;
    width: 100%;
    background: ${({theme:t})=>t.colors.steelgrey20};
    overflow: hidden;
    container-type: inline-size;
    container-name: card;
    min-height: 310px;
  }

  :host([size="l"]) {
    min-height: 380px;
  }

  :host([size="auto"]) {
    min-height: auto;
  }

  .container {
    display: flex;
    flex-direction: column;
    position: relative;
    text-decoration: none;
    justify-content: flex-end;
  }

  .container.--image {
    justify-content: space-between;
  }

  .content {
    z-index: 2;
    position: relative;
    width: 100%;
    box-sizing: border-box;
    padding: ${({theme:t})=>t.spacings.s20};
    display: flex;
    align-self: stretch;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
    gap: ${({theme:t})=>t.spacings.s24};
    color: ${({theme:t})=>t.colors.foreground};
  }

  .image {
    aspect-ratio: 4/3;
    line-height: 0;
    position: relative;
  }

  .image.--date::before {
    height: ${({theme:t})=>t.spacings.s64};
    width: 100%;
    background: linear-gradient(
      180deg,
      ${({theme:t})=>t.colors.black100.alpha(0)} 0%,
      ${({theme:t})=>t.colors.black100.alpha(.6)} 100%
    );
    content: "";
    left: 0;
    bottom: 0;
    position: absolute;
    z-index: 2;
  }

  adgm-chip {
    z-index: 3;
    position: absolute;
    top: ${({theme:t})=>t.spacings.s24};
    left: 0;
  }

  adgm-link-button {
    pointer-events: none;
  }

  .date {
    position: absolute;
    z-index: 2;
    padding: ${({theme:t})=>`${t.spacings.s8} ${t.spacings.s20}`};
    bottom: 0;
    left: 0;
  }

  .title {
    font-size: ${v(16)};
    line-height: 130%;
  }

  @container card (min-width: 200px) {
    .title {
      font-size: ${v(18)};
    }
  }

  @container card (min-width: 300px) {
    .title {
      font-size: ${v(20)};
    }
  }

  @container card (min-width: 340px) {
    .title {
      font-size: ${v(24)};
    }
  }
`;var Eh=Object.defineProperty,Dh=Object.getOwnPropertyDescriptor,Ut=(t,e,a,i)=>{for(var n=i>1?void 0:i?Dh(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&Eh(e,a,n),n};s.Card=class extends E{constructor(){super(...arguments),this.hasParentHover=!1,this.variant="primary",this.size="s",this.buttonText="Read more",this.bodyClamp=3,this.hasImage=!1}connectedCallback(){super.connectedCallback(),Nt(this,["adgm-image"],{onFirstLoad:()=>this.initialize(),onFullLoad:()=>this.initialize()})}initialize(){this.hasImage=!!this.querySelector("adgm-image")}render(){const e=A({container:!0,[`--variant-${this.variant}`]:!0,[`--size-${this.size}`]:!0,"--image":this.hasImage});return d`
      ${this.renderDebug("adgm-highlight-card")}
      ${y(this.href,()=>d`
          <a
            class=${e}
            href=${Y(this.href)}
            target=${Y(this.target)}
            @mouseenter=${this.onEnter}
            @mouseleave=${this.onLeave}
            style=${this.height?`min-height: ${this.height};`:null}
          >
            ${this.renderContent()}
          </a>
        `,()=>d`
          <div
            class=${e}
            style=${this.height?`min-height: ${this.height};`:null}
          >
            ${this.renderContent()}
          </div>
        `)}
    `}renderContent(){return d`
      ${y(this.hasImage,()=>d`
          <div
            class="image"
            class=${A({image:!0,"--date":!!this.date})}
          >
            ${y(this.date,()=>d`
                <adgm-text class="date" weight="500" color="white" variant="textS" _dd>
                  ${this.date}
                </adgm-link-button>
              `)}
            <slot name="image"></slot>
          </div>
        `)}

      <div class="content">
        <slot name="content">
          <adgm-text class="title" clamp=${this.bodyClamp} weight="400" _dd>
            <slot></slot>
          </adgm-text>
        </slot>

        ${y(this.href&&this.buttonText,()=>d`
            <adgm-link-button anim icon="arrowM" size="s" href=${this.href} _dd>
              ${this.buttonText}
            </adgm-link-button>
          `)}
      </div>

      ${y(this.chip,()=>d`<adgm-chip _dd>${this.chip}</adgm-chip>`)}
    `}onEnter(){this.hasParentHover=!0}onLeave(){this.hasParentHover=!1}},s.Card.styles=[_,Lh],Ut([vt({context:ze}),l({attribute:!1})],s.Card.prototype,"hasParentHover",2),Ut([l({type:String})],s.Card.prototype,"chip",2),Ut([l({type:String})],s.Card.prototype,"date",2),Ut([l({type:String})],s.Card.prototype,"variant",2),Ut([l({type:String})],s.Card.prototype,"size",2),Ut([l({type:String})],s.Card.prototype,"height",2),Ut([l({type:String})],s.Card.prototype,"href",2),Ut([l({type:String})],s.Card.prototype,"target",2),Ut([l({type:String,attribute:"button-text"})],s.Card.prototype,"buttonText",2),Ut([l({type:String,attribute:"body-clamp"})],s.Card.prototype,"bodyClamp",2),Ut([w()],s.Card.prototype,"hasImage",2),s.Card=Ut([b("adgm-highlight-card")],s.Card);const Mh=g`
  :host {
    display: inline-block;
    padding: ${({theme:t})=>`${t.spacings.s4} ${t.spacings.s20}`};
    background-color: ${({theme:t})=>t.colors.clearsky100};
`;var Th=Object.defineProperty,Ah=Object.getOwnPropertyDescriptor,Nh=(t,e,a,i)=>{for(var n=i>1?void 0:i?Ah(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&Th(e,a,n),n};s.Chip=class extends L{render(){return d`
      <adgm-text variant="textXS" weight="500" color="white" ellipsis>
        <slot></slot>
      </adgm-text>
    `}},s.Chip.styles=[_,Mh],s.Chip=Nh([b("adgm-chip")],s.Chip);const Bh=g`
  :host {
    display: inline-block;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: ${({theme:t})=>`0 0 0 ${t.spacings.s16}`};
  }

  ::slotted(li) {
    position: relative;
    padding: 0;
    margin: 0;
  }

  ::slotted(li)::before {
    position: absolute;
    content: "•";
    left: calc(${({theme:t})=>t.spacings.s16} * -1);
  }

  ::slotted(:not(li)) {
    display: none;
  }
`;var Ih=Object.defineProperty,Fh=Object.getOwnPropertyDescriptor,zh=(t,e,a,i)=>{for(var n=i>1?void 0:i?Fh(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&Ih(e,a,n),n};s.UnorderedList=class extends L{render(){return d`
      <ul>
        <slot></slot>
      </ul>
    `}},s.UnorderedList.styles=[_,Bh],s.UnorderedList=zh([b("adgm-ul")],s.UnorderedList);const Hh=g`
  :host {
    display: block;
    width: 100%;
    position: relative;
  }

  .image-container {
    position: relative;
    width: 80%;
    padding: 0 10% 1% 0;
    background: url(${"data:image/webp;base64,UklGRugSAABXRUJQVlA4TNwSAAAvlwEZAM0oaCNJyTH6F3z3YCGi/wmnqhzdDWpmMH0V/IBjIG2b1r/tbb+EiJgAjtYPQLKS3EaSJClt/v/m8VnCZO5RUZnZt4iABEly2wYGxOPiDlz6Aujst29JkixJkmzLROv/P7lNAVyJSD36EtGPESELtq2oldImIYjmwBlAX0/fdT3hG75vdf0A3maRrvdvO5t653M/C6F2RIZet1B7D+L+rpEfgFCftNKL7dVjsPP5Qu8UrJlt6arNYaC3WjWrUU2HLtc77dVzfc3V1He/3mBHxwcSzWraTkWNwLc457aovmFdfSAx9YqQ6P0wtbSZvVBh5bh3Ui/lgW+m27MIccAMyhI6x0s16mlNQ0CvBFnjYC4pbGa1pDMa7XOz1sf9N6GayyJEgZ9RynY9ZevlZYqbdi4+CqIHlyAnXQ/A9KL2XiXY91oXq+6WWG1HP3zK1sVInsti/5MIwAKcq/3ilM3jqhavi0FQoZlMTwdNWzle5DGkMtgOTWWHx/WUQPmn1Rzx14aQ5fR8IWOwcDBKzLKqFEhrolzaofp0ptVety6yczR4l30Auo3M5ADQSp/WW3Jz5Fs1tr2nLKZFdlwng37hbEsW6WFf83G9CaBX+ic6kXCvnLBbMvLhVHmTIpdzGMCRK2v7cz2JwUo8eD9shm5X2reCNqvp/qtmsE8SHkG1opWCb5EHprlzXym0nj2ddjPIGp5+ONXiIxZKyq/YCxAqdvlYOIs5fxlr0E0HaA03VicCng0oFCgBQ8387VcBrwLl+NitSIBenKxW2e5j4EQR7cSt7DlFaQpnnmGqWHbd1Xm/eTOy0zU/MaXRKVELvLqcuf+wZEKtzo/eMa6ML7KA0ErmTwIUHVcNzs4CxNchxcb7VS3LAg7COIBboDhL+5mzk1HnaAp3uN7u56Yu3WTZ9OGStxQfF84qrBYn44dCsDWSIxrmfiN8Uux0tZfwle4fiCXT7dmWcihkUwFjAVj0YOHuKy1c5BxWmviIf3nyYxhU2qoaMVd2a/mSLfP7FrZiagDAN3oAQ/QAygE0hkL2SkmRckbwts+r3UuuvbYwtLmoUoVeWM6FNE5+6obLmsu3bt6iJ9Fg5lNoiQRHa29iwaFR4cdUXRo9Z8JwN/hkW1nd1If5dT6ACFNfSLO4Uq7UHeBmhaLRBfsz5CFKOrYepd8RTsTtN9c6uUowuya5FvWGEKbPBUhs5eK5ksUeJz30/30DZp05OQ5IslBxCvuFDUjO7Hw3wr6UZYswY91CIGBPi6UOIigd7WQFm/r39bHap74V0FeXzQin8RTiSrG7x/skF8PzJHQdQhd97scJ2YsJAb6/oV5IYhzKuxqPiowT1DcAX4yIbZOyzO8lFk0At1LOF1uwgbIXeSqO/RgZCYJvmzvjAekUvrAKjp+r36cAc5KKHfmUsTcRXb06s3N5aFP3ze9jgmoqCPkavMODUeE7bhcWE1tlRI9PFRi/d/XtuclBabN4WXUMWHYjzBK9oPLzNeIE7ejDi+tL+DlMuZoc9ZSQApsZiH5mkAQamQ+97el504LdMvJXJakB9Begftmb8Z2j7Ue/YYkPtKjqSxY8xfMbWCfV036ca4zfzjt99iAGM+HS1wpixFf5ObBfQAD7Di4CmcttBAO7gZ7ENabVHVQkBNNlSL/Jsqmn6E0TmbXiCAjrJYWb2+A2U66ZHJMj05L74Hh4XAHz1e1MXt9M7J8vB61pDnz7pkLqJMvdA1J/a8tPEcwX6AuXbkNBgz2ckDil2De1Yhav44SlPyNcCYFf8H4Kk90SU7rgmsuEVPIKAKkUAkl5GPaXgXh55VgCN3d9IzJ2KHxr305MkR63buyO8U2UvB5avMHJ19tIbI9zIEpfoSA2tukm9aL8krvz8hq6wv16OmtQZzpfwOOoNw6AxnodwcCZcGkunIX4eG5vuihqJlgagDPhAD47ktLBexmjOnEdN3jsb+a/ndq69ODifG/24eVbQjD7+0CYOFzn9fDX9vGwpmzhpDTF78eaGn3WuPuYB8l50kXscztXEodL1y9uG+xc1MTrczGmh2o3gfGJCKcE0uiZyBawIcwC4BgpapxisVqQCdVbGZFQ5o2RCDs/bePbmRkDyYMB57lNtdLRguJ7QEt1xDZzOtvbXI4tWo/jYNCRgoNf1DeIEwO+VaCR2+8ITvK6RQDlojoGLosRpaW2HahjbxByo9uc376phELm7usXP0+NjjOS2hKFZv+M1pmNLKggpn3VE0l2mnq94IMpA9etD5r3calq+nhlcVjm84gB1wOBGPcRfvJTDknoVqII+PRjgn6a0wDa3A9vewft8KJn9SHzV3IBDlj2moN5QiWMLeUv6P4iTO/3SNEt08VjrANJLamIvVPulBbZ5XwcUdOfK3gXoyf2w7K276ww8S4tvCjEcWpBnRwrHFeKHhU/GpB/A6eInH5AczmsdRgfOyFevKlLB5zJK5zQgfZFYvILon1tfOMboOFHUMeOfZ8vpuHIHLcWHmhxbDwklEelAB6CmMvzOqQm7CIDejz9mMNUyC2QRfyX66R1K8fp1pX8fgiHPj5021nDx1dmZXvCIZv+Jq8rkhbqAJezUo5I0xqROL95freWxvEKDijvu4uQS4+LXr0Di4o+7vu3zKFFACh02mScgUTpFPDM4HsG5zlnUjAC2QpLUy6uFSzyOpfLowpk24PSubljX847LodqOuX7PM86AJZQqOTXH20QS7GS9g/Koyedpc/XuID9yRWVah7r5P0EY53haEDPVeKisgL9vu+fHuxdOpDSiLQUo37yWdyvzwZMq3Z9cWxqhoc4SKcfGDoIidL5RYdV2M3lmzB2r0ijBNYuO88uqbgqyupEGPhyQi2j4yekdlCgM2/74p/JtkQghPdmz/7JZsExauEyLekcRMe1G+oZZPUUtRcr1t5FrpbhVXqHyimnJ4FbQslsvLeGwioDQochKtG9J2LzfAFLQ38uvB1gEgi6EJvbwUqJQ2jj7O2EwGeRZ3eFzxtNaapgsld5SfDWWQhSS+WPZ5GbRDTnOLyVOlonRu+RNnmZC+HFp24a+LRnCvPaYpl8tsNxC+TdttZeTk7BZRqjJ2lq/7m1q+aLpriBX/SpdGLzjPP74WkOAjAPz2o1DsAPELDmGDcW6tTJF9ezqk/uqm5KOqGXE7Rx7sUF+Do1MZexjeO4P4U+8nKtOLCxT9JpHyKxXTTbr24pdIk0L7C8D+HnTJGAzNv1eq7SwYy/jaf1Mpc+ZQzZP4PlCQqAwrANbvmJQI41P/sYmsMvEC5UiOgUgMl029wCKQ5UorYD0Sk/4fflb/sn12C3XsQlA0/Ug/YFoMzJ7Nqy09JrUXsp+CFCjnDq68xC6UD1nMgCQ4hgONUFhXVoUdtpcNaIkhZ4FGKOyOtFZqIQd4FEXnAfEflOMktMc+NX1pwn5CN7m9zpZDywa8zzdOJkJqgE2filXZ8Wi7bExlKADeZ2tS1WmUuoAtY1QLbMbVdtSG7Xp+WLAQ5uSJvSahWnJ4hJIAdYyYVCSq30hJmV5Sd2ZXou61A8SbmeheNVWsSEUxv5F58uD7WpWAf9PnLUXPHa85BFreZe5pzQeAWmo8YXojrWxg00duOjY7KrUMbkLW+oKgahBpaC1GLE3Yt0QATXpLTf5T7yevnZGSuPZtLsf/PlcFhTmaIFhfZcOz912K+2+gyy6p+NSPMAmgpzvbisi9CDiqycY905xGAS0+x3rSGc9nbogDzK7xvXyGvL4RQg8HIjJXsv5oHEh3WNEQLRhZ+LMAZd3tIBrNSQAvIfB+S4mlkReark2CtBXywU5gQqkbaew1wwvTdvO5iUi5MFQL5/vmHskYNjDhVj2547kiyTr3OFMC9KR4TbgvFvbwC60XJIPpeNheKpyQwF7IuwKT8PkyzrWD/216NRk/BXskdAe8K/gSEyWNTIXh4sjv2OgFtbwC6C37KTB+PB1RkFEhMhxEuq2duHXUWWImbW/kJuViWEubq/4RWuspDYk5868XfzYR0jgemoJlFUk10fJ7Z4B6iFZGuM4s8REPaeLZDE6OnMXnihEr4yGrAmPOHMSYqTHqaxWpe+B+9eHJ6IFs6DZo44Wpyz11z8Fbs/yO9Iz+MkH1ZJMhyjfdF0glK+GpwJbgvF392QpmWiQWHuTXSrdRAiG96skD65C1GBu+Bhz5FiPFwvaOPywr1Q56kqIoxAAsj4IFR00zjX0z1MCmjR+R75bL3eRYLjjSaqFvOabwInCsGXjQ1EOrMxJ7q1XhqtJ0B3jIh3MiLvUsGlKEs3wATvgwWiQQfy0OK1xXq5ue7Jv8lymaNDWNOjGkqmHTXXvOeTRKJjZEPievCj0esSw12yWywWQsuO4DIs0s7Ah+c+kINYGjH6904pcVdOvtWKEqh2oSZ8lrDD3Fz3VCvqGWmkAw32vKFjS+MsruYdP+0VrsT2ij7wN6Lfr5si+wgBVq6hDkZ9BoKBABflSiX54gj1wGnol5t3raomU19T7t+tj3mDbrA9bjSsaPhGUE99Kn5ko/Jyha2D9TLIm7rhdZP65IXAZSk+11W5F/UVGBe/lOvY6rycTkIEhu8xuqQk4NS8Ky27AcaBBrpfMsr1ai2V3Fem0nhLIbwsAQn2tAirgaYtDOtw/Y6J0WRC4IGvg1A5TV5XOdKHs6uCHBnxcs2+g7eL8Sc0DqNL9Do0hK6wHNp+1TBdSEOaiO9N8nhTPtm0zb21ZA8XO+oNqKG/VizUHtvWrNiDzynIPfUF1TWCicmOtNL2V1emdQ0ohj0E+sO23zTw6AS875pS4kalPcE9iXegymSe4QvO85LDwxvvDQAjZFBV2reDrMF1wPKejMJtxRC48GZ/8qeya0vNEQwc2h2xFF8ztf0aUx4uPGGd2zuKooQptDD0oheg3nBRGWRbG1w57h30wFqgoqLQ0z5srVtGFiFNRoDPsP5o5Z1yHY9N4fD+OsSk80lArLB8NVzfHXsfzeMSlrvPFJvlAVNpFaiD7TS+Lz1PRy+sHLcnOpAZWSbKdwSj+rooP2aDSnupZ6E+AONwqC8aGb7g2BjfqG9zAse+Hvv9zc8Ko1XyldfcjHTPKwZRYVpYXKfdaJBpK2kKT7ENi+lY9qvX9Lw5usQs2lqHe5VkohccI+KR1GBueTwGNUgP0brt1gLkf/lYVasbGmqKTefBVq7G9c+mdSKnAFjja+hB9VOjr+AzA+P5MegYGq3uLJhbXoE9z4X9shcRLCDCKIwGE333QPi87H3/mZJf5p+mCn1512m75InGUwyWs9bL6xQ4TxWblFoYRR8EQ4zbqdWxRw1IW+ziAhq2s4dxJn1BhQk9Cf8Tvf4WSBux473Nye78Gv/wTle0s77sIwpzyEx0Xp7LmBdQJJ+zy0EQ/VCFRLCXoFT37N/wp390QJWsdlDFn0yMXUrcuELep4NWnZI5Ue9f7V9EaoAQGFRmVaApSUPSzeIQ8iIM+WuxEySC0PEJDcSSUIXPwkfP6JSnVxRHJ908FIETQ/czRyo47RSWF8XZnD2B/ZIV/AJa4jQO02zrzLleh4ZuBo6tu2Ov5zqRTl6IBDC++LF+uv7Zt5mLgPBpsdc+Xyx59BG1l12/7D90HIAlO33eknKg0XxkH1/ETv6SsfF6UuaR6Ghc9/VdmQ1cYISiQmpPdZk3mpEM8XegxYDZ/zGBSU7pzd9417U+sNamuV+vlykuzXtdSpnHRXqHSM69bRUqFvxbACadzrZMazoLxhvKZbG0nxev297U5bfM6ao/49/Rt1i2Jy/TWfjWjUIuHaV2W2etf8s4LbS3Clv0xe+Gftw+HL/tct6axr5jzbfcabdfzXnx5l/RFFVcwFqCW+zr2w5wFF8ScstnjsWsl+NYVsw7mu3C/K6PJKA14XS0fYHZvTT5fNr++6/6L0FcbBJJlgfYjnv8jgplq3AIifyXv2l5ncIhVxYThyU+Wf3AXFx6sO1JzFj7Z0A6Lr/w5l9zulHTMh1aVaNSiz5WvI4JDc+mRg4sbIu+fg/FnXQ7PD84diEt39d/sORdL7QWhR978086dBLBNwsLx9tlHqtgnUzZvTZvRZRE3g/b+vS8pPucF439O8xhzX/tA2o0FUbUhnqeizf/sgd7/jLIpjIsF+7bl+VJOVZ3xnSviPc/hz2KP9txtn/WWS/u98M9dbA+1B+VnBqLQKu9CXPuUeFv/lXNWyFfCEMQUzPxZad6y7QBWD6WiDab/jNcJL5w5r9O2Qs6T38suHjx5l9+Op/2CwjVtJcepRFVh0ZKLIvHWXCzzmmgA7d1bGqV99MJ7M9XRlvkDkJrAbWhRsrRaLDp3poLL3HtJV61pQQu5pz/o/7DUBt5VPT29ifLaQaH/HICthN6vL25f89jAxUbJQ6143yng5cw2KT7GiOkUSgTBdnXpy22r/i/W6q15AWAfhL/9t1ffr4H"}) no-repeat 40% bottom;
    background-size: 70%;
    pointer-events: none;
  }

  .anchor {
    text-decoration: none;
    color: ${({theme:t})=>t.colors.foreground};
  }

  ::slotted(adgm-image) {
    margin: -50% 0 25% 0;
    transform: rotateZ(-25deg) rotateY(25deg) translate(30%, 30%) scale(0.7);
    transform-origin: left bottom;
    aspect-ratio: 1 / 1.41;
    transition: transform 0.4s ease;
    height: auto;
    background-color: ${({theme:t})=>t.colors.black20};
  }

  :host(:hover) ::slotted(adgm-image) {
    transform: rotateZ(-25deg) rotateY(25deg) translate(30%, 30%) scale(0.74);
  }
`;var Rh=Object.defineProperty,Vh=Object.getOwnPropertyDescriptor,Ge=(t,e,a,i)=>{for(var n=i>1?void 0:i?Vh(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&Rh(e,a,n),n};s.PublicationCard=class extends E{constructor(){super(...arguments),this.hasHover=!1}render(){return d`
      ${this.renderDebug("adgm-publication-card")}
      ${y(this.href,()=>d`
          <a
            href=${this.href}
            target="_blank"
            @mouseenter=${this.onEnter}
            @mouseleave=${this.onLeave}
            class="anchor"
          >
            ${this.renderContent()}
            <adgm-spacer height="rBodyS" _dd></adgm-spacer>
            <adgm-link-button
              icon="download"
              variant="secondary"
              target="_blank"
              size="s"
              href=${Y(this.href)}
              ?force-hover=${this.hasHover}
              _dd
            >
              Download
            </adgm-link-button>
          </a>
        `,()=>this.renderContent())}
    `}renderContent(){return d`
      <div class="image-container">
        <slot></slot>
      </div>
      <adgm-spacer height="rBodyM" _dd></adgm-spacer>
      ${y(this.category,()=>{var e;return d`
          <adgm-text variant="textXS" _dd>
            ${(e=this.category)==null?void 0:e.replace(",",", ")}
          </adgm-text>
          <adgm-spacer height="s8" _dd></adgm-spacer>
        `})}
      <adgm-text class="title" variant="textM" clamp="2" weight="500" _dd>
        ${this.name}
      </adgm-text>
    `}onEnter(){this.hasHover=!0}onLeave(){this.hasHover=!1}connectedCallback(){var e;super.connectedCallback(),(e=this.contentAlignment)==null||e.registerElement(this)}disconnectedCallback(){var e;(e=this.contentAlignment)==null||e.deregisterElement(this),super.disconnectedCallback()}},s.PublicationCard.styles=[_,Hh],Ge([l({attribute:!1})],s.PublicationCard.prototype,"hasHover",2),Ge([l({type:String})],s.PublicationCard.prototype,"href",2),Ge([l({type:String})],s.PublicationCard.prototype,"name",2),Ge([l({type:String})],s.PublicationCard.prototype,"category",2),Ge([O({context:Zn}),l({attribute:!1})],s.PublicationCard.prototype,"contentAlignment",2),s.PublicationCard=Ge([b("adgm-publication-card")],s.PublicationCard);const jh=g`
  :host {
    display: block;
    overflow: hidden;
    position: relative;
  }

  a {
    display: flex;
    gap: ${({theme:t})=>t.spacings.s20};
    text-decoration: none;
    color: ${({theme:t})=>t.colors.foreground};
  }

  .content adgm-text:first-child {
    line-height: 130%;
  }

  a:hover .content adgm-text:first-child {
    text-decoration: underline;
    text-underline-position: under;
  }

  .date {
    display: flex;
    flex-direction: column;
    background: ${({theme:t})=>t.colors.clearsky100};
    padding: 0 ${({theme:t})=>t.spacings.s8};
    width: 64px;
    height: 64px;
    box-sizing: border-box;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: ${({theme:t})=>t.spacings.s4};
  }
`;var Uh=Object.defineProperty,Gh=Object.getOwnPropertyDescriptor,xe=(t,e,a,i)=>{for(var n=i>1?void 0:i?Gh(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&Uh(e,a,n),n};s.EventCard=class extends E{constructor(){super(...arguments),this.variant="primary",this.location="",this.dateMonth="",this.dateDay=""}render(){return d`
      ${this.renderDebug("adgm-event-card")}
      <a href=${Y(this.href)} target=${Y(this.target)}>
        <div class="date">
          <adgm-text
            variant="textS"
            weight="600"
            color="white"
            ellipsis
            align="center"
            _dd
          >
            ${this.dateMonth}
          </adgm-text>
          <adgm-text
            variant="textS"
            weight="600"
            color="white"
            ellipsis
            align="center"
            _dd
          >
            ${this.dateDay}
          </adgm-text>
        </div>
        <div class="content">
          <adgm-text
            variant="textS"
            color="clearsky100"
            weight="600"
            clamp="2"
            _dd
          >
            <slot></slot>
          </adgm-text>
          <adgm-text variant="textS" color="foreground" clamp="2" _dd>
            ${this.location}
          </adgm-text>
        </div>
      </a>
    `}},s.EventCard.styles=[_,jh],xe([l({type:String})],s.EventCard.prototype,"href",2),xe([l({type:String})],s.EventCard.prototype,"target",2),xe([l({type:String})],s.EventCard.prototype,"variant",2),xe([l({type:String})],s.EventCard.prototype,"location",2),xe([l({type:String,attribute:"date-month"})],s.EventCard.prototype,"dateMonth",2),xe([l({type:String,attribute:"date-day"})],s.EventCard.prototype,"dateDay",2),s.EventCard=xe([b("adgm-event-card")],s.EventCard);const Wh=g`
  :host {
    display: block;
    overflow: hidden;
    --image-size: 100%;
    position: relative;
  }

  .header {
    width: 100%;
    gap: ${({theme:t})=>t.spacings.s12};
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .images ::slotted(a) {
    display: block;
    grid-column: span 3 / auto;
    aspect-ratio: 1 / 1;
    overflow: hidden;
  }

  ${({theme:t})=>t.enclosedParse(".images ::slotted(a)",{gridColumn:p({m:"span 3 / auto"})})}

  ${({theme:t})=>t.enclosedParse(".overflow .content",{padding:p({base:"0 16px",m:"0 32px"})})}

  .overflow .content {
    display: flex;
    gap: ${({theme:t})=>t.spacings.rGridGap};
    flex-wrap: nowrap;

    overflow-x: scroll;
    -ms-overflow-style: none;
    scroll-behavior: smooth;
    scrollbar-width: none;
    scroll-snap-type: x mandatory;
    scroll-padding: ${({theme:t})=>t.spacings.rGridGap};
  }
  .overflow .content::-webkit-scrollbar {
    display: none;
  }

  .overflow .content ::slotted(a) {
    flex-shrink: 0;
    display: inline-block;
    overflow: hidden;
    height: 260px;
    width: 260px;
    scroll-snap-align: start;
  }

  .--bg {
    position: relative;
  }
  .--bg:before {
    content: "";
    left: 0;
    bottom: 0;
    width: 100%;
    height: 75%;
    position: absolute;
    background: ${({theme:t})=>t.colors.citynight180};
  }
`;var qh=Object.defineProperty,Yh=Object.getOwnPropertyDescriptor,ta=(t,e,a,i)=>{for(var n=i>1?void 0:i?Yh(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&qh(e,a,n),n};s.SocialFooter=class extends E{constructor(){super(...arguments),this.variant="primary"}render(){var e,a,i;return d`
      ${this.renderDebug("adgm-social-footer")}
      <adgm-container _dd>
        <div class="header">
          <slot name="heading"></slot>
          <slot name="action"></slot>
        </div>
        <adgm-spacer height="rBodyL" _dd></adgm-spacer>
      </adgm-container>
      ${y((((e=this.currentBreakpoint)==null?void 0:e.windowWidth)??0)<(((i=(a=this.theme)==null?void 0:a.breakpoints)==null?void 0:i.m.start)??0),()=>d`
          <div class="overflow --bg">
            <div class="content">
              <slot></slot>
            </div>
          </div>
        `,()=>d`
          <div class="--bg">
            <adgm-container _dd>
              <adgm-grid class="images" _dd>
                <slot></slot>
              </adgm-grid>
            </adgm-container>
          </div>
        `)}
    `}},s.SocialFooter.styles=[_,Wh],ta([l({type:String})],s.SocialFooter.prototype,"variant",2),ta([O({context:ue}),l({attribute:!1})],s.SocialFooter.prototype,"theme",2),ta([O({context:bt,subscribe:!0}),l({attribute:!1})],s.SocialFooter.prototype,"currentBreakpoint",2),s.SocialFooter=ta([b("adgm-social-footer")],s.SocialFooter);const Kh=g`
  :host {
    display: block;
    with: 100%;
    position: relative;
  }

  adgm-grid {
    position: relative;
    row-gap: ${({theme:t})=>t.spacings.rSectionM};
  }

  ${({theme:t})=>t.enclosedParse("adgm-grid",{aspectRatio:p({base:"none",m:"5 / 3.2",l:"5 / 3.2",xl:"5 / 3"})})}

  .content {
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  ${({theme:t})=>t.enclosedParse(".content",{gridColumn:p({base:"1 / span 1",s:"1 / span 2",m:"1 / span 6",l:"3 / span 4"}),gridRow:p({base:"2",m:"1"})})}

  .image-container {
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
  }

  ${({theme:t})=>t.enclosedParse(".image-container",{gridColumn:p({base:"1 / span 1",s:"1 / span 2",m:"7 / span 6"}),gridRow:p({base:"1",m:"1"}),marginTop:p({base:t.spacings.rBodyM.toString(),m:"0"})})}

  .slides-container {
    position: relative;
    display: grid;
    -webkit-box-pack: unset;
    place-content: unset;
    justify-items: center;
    overflow: hidden;
  }

  .slides-container ::slotted(adgm-lifestyle-slide) {
    grid-area: 1 / 1 / 1 / 1;
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;
  }

  .slides-container ::slotted(adgm-lifestyle-slide.--active) {
    opacity: 1;
    pointer-events: all;
  }
`,Zh=g`
  .heading-container {
    left: 0;
    position: absolute;
    z-index: 10;
  }

  .heading {
    padding: 0;
    margin: 0;
    pointer-events: none;
    user-select: none;
  }

  ${({theme:t})=>t.enclosedParse(".heading",{...t.typography.display3XL.properties,color:t.colors.steelgrey40,fontWeight:"300",fontSize:p({base:"90px",s:"110px",m:"170px",l:"200px",xl:"260px"}),transform:p({base:"translateY(-10%)",m:"translateY(30%)"})})}
`,Xh=g`
  .image-layers {
    aspect-ratio: 1 / 1;
    position: relative;
  }

  ${({theme:t})=>t.enclosedParse(".image-layers",{width:p({base:"80%",m:"100%"})})}

  ::slotted(adgm-image) {
    aspect-ratio: 1 / 1;
    width: calc(100% - 30px);
    position: absolute;
    transition: left 0.2s ease, bottom 0.2s ease, opacity 0.1s ease;
  }
  ::slotted(adgm-image.--first) {
    left: 0;
    bottom: 30px;
    z-index: 3;
  }
  ::slotted(adgm-image.--second) {
    left: 15px;
    bottom: 15px;
    z-index: 2;
    opacity: 0.5;
  }
  ::slotted(adgm-image.--third) {
    left: 30px;
    bottom: 0;
    z-index: 1;
    opacity: 0.25;
  }
`,Qh=g`
  .navigation {
    display: flex;
    gap: ${({theme:t})=>t.spacings.s12};
    align-items: center;
    justify-content: flex-start;
  }

  .navigation adgm-text {
    min-width: 120px;
  }
`,Jh=g`
  .marquee {
    white-space: nowrap;
    overflow: hidden;
    width: 100%;
    text-align: center;
  }

  ${({theme:t})=>t.enclosedParse(".marquee h3",{...t.typography.displayXS.properties})}

  .marquee h3 {
    font-weight: 300;
    color: ${({theme:t})=>t.colors.steelgrey60};
    margin: 0;
    padding: 0;
    white-space: nowrap;
    display: inline-block;
    transform: translateX(105%);
    animation: slide 30s linear infinite;
  }

  @keyframes slide {
    0% {
      transform: translateX(105%);
    }
    100% {
      transform: translateX(-105%);
    }
  }
`;var tu=Object.defineProperty,eu=Object.getOwnPropertyDescriptor,Pe=(t,e,a,i)=>{for(var n=i>1?void 0:i?eu(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&tu(e,a,n),n};s.Lifestyle=class extends E{constructor(){super(...arguments),this.title="Lifestyle",this.marquee="Abu Dhabi, a melting pot of culture, history, heritage, nature, beaches, luxury, wildlife and shopping.",this.index=0,this.playing=!1}connectedCallback(){super.connectedCallback(),Nt(this,["adgm-image","adgm-lifestyle-slide"],{onFirstLoad:()=>this.initialize(),onFullLoad:()=>this.initialize()})}render(){var e;return d`
      ${this.renderDebug("adgm-lifestyle")}
      <div class="marquee">
        <h3>${this.marquee}</h3>
      </div>
      <adgm-section _dd>
        <adgm-container _dd>
          <adgm-grid _dd>
            <adgm-paralax _dd>
              <div class="heading-container">
                <h2 class="heading">${this.title}</h2>
              </div>
            </adgm-paralax>
            <div class="content">
              <div class="navigation">
                <adgm-text variant="displayXL" _dd>
                  ${en(this.index+1)}
                </adgm-text>
                <adgm-icon-button
                  icon="arrowL"
                  anim
                  outlined
                  mirror
                  ?disabled=${this.index===0}
                  @click=${this.toPrevious}
                  variant="tertiary"
                  _dd
                ></adgm-icon-button>
                <adgm-icon-button
                  icon="arrowL"
                  anim
                  outlined
                  @click=${this.toNext}
                  ?disabled=${this.index===(((e=this.slides)==null?void 0:e.length)??1)-1}
                  variant="tertiary"
                  _dd
                ></adgm-icon-button>
              </div>
              <adgm-spacer height="rBodyM" _dd></adgm-spacer>
              <div class="slides-container">
                <slot></slot>
              </div>
            </div>
            <div class="image-container">
              <div class="image-layers">
                <slot name="image"></slot>
              </div>
            </div>
          </adgm-grid>
        </adgm-container>
      </adgm-section>
    `}initialize(){this.images=this.querySelectorAll("adgm-image"),this.slides=this.querySelectorAll("adgm-lifestyle-slide"),this.define()}toPrevious(){this.index--,this.define()}toNext(){this.index++,this.define()}define(){var a,i,n,r,o,c,h,u;if(!this.slides||this.slides.length===0){console.warn("No slides found");return}if(this.slides.forEach((m,f)=>{m.classList.remove("--active"),f===this.index&&m.classList.add("--active")}),!this.images||this.images.length===0){console.warn("No images found");return}this.images.forEach(m=>{["first","second","third"].forEach(f=>{m.classList.remove(`--${f}`)}),m.style.display="none"});const e=(m,f)=>{f&&(f.style.display="",f.classList.add(m))};e("--first",(a=this.images)==null?void 0:a[this.index]),this.images.length!==1&&(this.images[this.index+1]?(e("--second",(i=this.images)==null?void 0:i[this.index+1]),((n=this.images)==null?void 0:n.length)>2&&((r=this.images)!=null&&r[this.index+2]?e("--third",(o=this.images)==null?void 0:o[this.index+2]):e("--third",(c=this.images)==null?void 0:c[0]))):(e("--second",(h=this.images)==null?void 0:h[0]),this.images.length>2&&e("--third",(u=this.images)==null?void 0:u[1])))}},s.Lifestyle.styles=[_,Kh,Zh,Xh,Qh,Jh],Pe([l({type:String})],s.Lifestyle.prototype,"title",2),Pe([l({type:String})],s.Lifestyle.prototype,"marquee",2),Pe([w()],s.Lifestyle.prototype,"index",2),Pe([w()],s.Lifestyle.prototype,"playing",2),Pe([w()],s.Lifestyle.prototype,"images",2),Pe([w()],s.Lifestyle.prototype,"slides",2),s.Lifestyle=Pe([b("adgm-lifestyle")],s.Lifestyle);const nu=g`
  :host {
    display: block;
    with: 100%;
    position: relative;
  }
`;var au=Object.defineProperty,iu=Object.getOwnPropertyDescriptor,ru=(t,e,a,i)=>{for(var n=i>1?void 0:i?iu(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&au(e,a,n),n};s.LifestyleSlide=class extends L{render(){return d`<slot></slot>`}},s.LifestyleSlide.styles=[nu],s.LifestyleSlide=ru([b("adgm-lifestyle-slide")],s.LifestyleSlide);var ou=Object.defineProperty,su=Object.getOwnPropertyDescriptor,ao=(t,e,a,i)=>{for(var n=i>1?void 0:i?su(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&ou(e,a,n),n};s.BreakpointHelper=class extends L{render(){var e,a;return d`<span>${(a=(e=this.currentBreakpoint)==null?void 0:e.current)==null?void 0:a.name}</span>`}},s.BreakpointHelper.styles=[_,g`
      :host {
        position: fixed;
        z-index: 999;
        padding: 1px 5px;
        background-color: rgba(0, 0, 0, 0.5);
        bottom: 0;
        right: 0;
        color: white;
        font-size: 14px;
      }
    `],ao([O({context:bt,subscribe:!0}),l({attribute:!1})],s.BreakpointHelper.prototype,"currentBreakpoint",2),s.BreakpointHelper=ao([b("adgm-breakpoint-helper")],s.BreakpointHelper);const lu=g`
  :host {
    display: block;
    width: 100%;
    overflow: hidden;
    position: relative;
  }

  adgm-section {
    overflow: hidden;
  }

  .container {
    display: flex;
    gap: ${({theme:t})=>t.spacings.rGridGap};
    transition: transform 0.4s ease;
  }

  .item {
    height: 0;
  }

  ${({theme:t})=>t.enclosedParse(".item.--large",{gridColumn:p({base:"span 1 / auto",m:"span 5 / auto"})})}

  ${({theme:t})=>t.enclosedParse(".item.--small",{gridColumn:p({base:"span 1 / auto",m:"span 3 / auto"})})}

  ::slotted(adgm-article-card) {
    width: 300px;
    flex-shrink: 0;
    flex-grow: 0;
  }

  .relative {
    position: relative;
  }

  .navigation {
    display: flex;
    position: absolute;
    gap: ${({theme:t})=>t.spacings.s12};
    right: 0;
    align-items: center;
    justify-content: flex-start;
    z-index: 2;
  }

  .overflow-content {
    flex-wrap: nowrap;
    padding: 0 ${({theme:t})=>t.spacings.rGridGap};
    display: flex;
    gap: ${({theme:t})=>t.spacings.rGridGap};

    overflow-x: scroll;
    -ms-overflow-style: none;
    scrollbar-width: none;
    scroll-snap-type: x mandatory;
    scroll-padding: ${({theme:t})=>t.spacings.rGridGap};
  }
  .overflow-content::-webkit-scrollbar {
    display: none;
  }

  .overflow ::slotted(adgm-article-card) {
    scroll-snap-align: start;
  }
`;var cu=Object.defineProperty,du=Object.getOwnPropertyDescriptor,oe=(t,e,a,i)=>{for(var n=i>1?void 0:i?du(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&cu(e,a,n),n};const io=16/9;s.ArticleCarousel=class extends bn{constructor(){super(),this.index=0,this.originalLength=0,this.largeWidth=1,this.smallWidth=1,this.onWindowResize=()=>{dt(()=>this.define(),50,this.uuid)},this.uuid=Ot()}connectedCallback(){var e;super.connectedCallback(),(e=this.contentAlignment)==null||e.registerElement(this),this.initialize(),Nt(this,["adgm-article-card"],{onFirstLoad:()=>this.initialize(),onFullLoad:()=>this.initializeFull()})}disconnectedCallback(){window.removeEventListener("resize",this.onWindowResize),super.disconnectedCallback()}initialize(){this.cards=this.querySelectorAll("adgm-article-card"),this.define()}initializeFull(){var e;this.initialize(),window.addEventListener("resize",this.onWindowResize),this.origionalCards=this.querySelectorAll("adgm-article-card"),this.originalLength=((e=this.origionalCards)==null?void 0:e.length)??0;for(let a=0;a<2;a++)this.appendArticles();T(()=>this.setSizes())}render(){var e,a,i;return d`
      ${this.renderDebug("adgm-article-carousel")}
      ${y((((e=this.currentBreakpoint)==null?void 0:e.windowWidth)??0)<(((i=(a=this.theme)==null?void 0:a.breakpoints)==null?void 0:i.m.start)??0),()=>d`
          <div class="overflow">
            <div class="overflow-content">
              <slot></slot>
            </div>
          </div>
        `,()=>d`
          <adgm-container _dd>
            <div class="relative">
              <div class="navigation">
                <adgm-icon-button
                  icon="arrowL"
                  anim
                  outlined
                  mirror
                  ?disabled=${this.index===0}
                  @click=${this.toPrevious}
                  variant="tertiary"
                ></adgm-icon-button>
                <adgm-icon-button
                  icon="arrowL"
                  anim
                  outlined
                  @click=${this.toNext}
                  variant="tertiary"
                ></adgm-icon-button>
              </div>

              <adgm-grid>
                <div class="item --large"></div>
                <div class="item --small"></div>
              </adgm-grid>

              <div class="container">
                <slot></slot>
              </div>
            </div>
          </adgm-container>
        `)}
    `}define(){if(!this.shadowRoot)return;T(()=>this.alignElements());const e=this.shadowRoot.querySelector(".item.--large"),a=this.shadowRoot.querySelector(".item.--small");e&&(this.largeWidth=e.clientWidth),a&&(this.smallWidth=a.clientWidth),this.setSizes()}setSizes(){var n,r,o,c,h,u;this.cards=this.querySelectorAll("adgm-article-card");const e=(n=this.shadowRoot)==null?void 0:n.querySelector(".container");if((((r=this.currentBreakpoint)==null?void 0:r.windowWidth)??0)<(((c=(o=this.theme)==null?void 0:o.breakpoints)==null?void 0:c.m.start)??0)){(h=this.cards)==null||h.forEach(m=>{m.style.width="",m.style.marginRight="",m.classList.remove("--carousel-selected"),m.style.removeProperty("--image-scale")}),e&&(e.style.paddingTop="",e.style.transform="");return}const a=this.largeWidth/100/(this.smallWidth/100),i=this.largeWidth/io-this.smallWidth/io;e&&(e.style.paddingTop=`${i}px`,e.style.transform=`translateX(calc(${-(this.smallWidth*this.index)}px - var(--adgm-spacing-r-grid-gap) * ${this.index}))`),(u=this.cards)==null||u.forEach((m,f)=>{m.style.width=`${this.smallWidth}px`,f==this.index?(m.style.marginRight=`${this.largeWidth-this.smallWidth}px`,m.style.setProperty("--image-scale",`${a}`),m.classList.add("--carousel-selected")):(m.style.marginRight="0",m.classList.remove("--carousel-selected"))})}toPrevious(){this.index--,this.setSizes()}toNext(){this.index%this.originalLength===0&&this.index!==0&&this.appendArticles(),this.cards=this.querySelectorAll("adgm-article-card"),this.index++,this.setSizes()}appendArticles(){var e;(e=this.origionalCards)==null||e.forEach(a=>{const i=a.cloneNode(!0);this.appendChild(i)})}},s.ArticleCarousel.styles=[_,lu],oe([l({attribute:!1})],s.ArticleCarousel.prototype,"index",2),oe([l({attribute:!1})],s.ArticleCarousel.prototype,"originalLength",2),oe([l({attribute:!1})],s.ArticleCarousel.prototype,"largeWidth",2),oe([l({attribute:!1})],s.ArticleCarousel.prototype,"smallWidth",2),oe([l({attribute:!1})],s.ArticleCarousel.prototype,"cards",2),oe([l({attribute:!1})],s.ArticleCarousel.prototype,"origionalCards",2),oe([O({context:ue}),l({attribute:!1})],s.ArticleCarousel.prototype,"theme",2),oe([O({context:bt,subscribe:!0}),l({attribute:!1})],s.ArticleCarousel.prototype,"currentBreakpoint",2),s.ArticleCarousel=oe([b("adgm-article-carousel")],s.ArticleCarousel);const hu=g`
  :host {
    display: contents;
  }
`;var uu=Object.defineProperty,pu=Object.getOwnPropertyDescriptor,ci=(t,e,a,i)=>{for(var n=i>1?void 0:i?pu(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&uu(e,a,n),n};s.Paralax=class extends L{constructor(){super(...arguments),this.offset=.1,this.isActive=!1,this.isScrollTicking=!1,this.onWindowScroll=()=>{this.isScrollTicking||(T(()=>{this.setPosition(),this.isScrollTicking=!1}),this.isScrollTicking=!0)},this.onResize=()=>{var e;this.theme&&(this.isActive=window.innerWidth>=((e=this.theme.breakpoints.m)==null?void 0:e.start),this.isActive?this.setPosition():this.target&&(this.target.style.transform=""))}}render(){return d`<slot></slot>`}connectedCallback(){super.connectedCallback(),window.addEventListener("scroll",this.onWindowScroll),window.addEventListener("resize",this.onResize),Nt(this,["adgm-image",".heading-container"],{onFirstLoad:()=>this.initialize()})}disconnectedCallback(){window.removeEventListener("scroll",this.onWindowScroll),window.removeEventListener("resize",this.onResize),super.disconnectedCallback()}initialize(){var i;const e=(i=this.shadowRoot)==null?void 0:i.firstElementChild;if(!e){console.warn("Slot not found");return}const a=e.assignedElements({flatten:!0})[0];if(!a){console.warn("Content not found");return}this.target=a,T(()=>{this.target&&(this.target.style.transition="transform .05s ease",this.onResize())})}setPosition(){if(!this.isActive||!this.target)return;const e=window.innerHeight-this.target.getBoundingClientRect().top;e>0&&(this.target.style.transform=`translate3d(0, calc(-${this.offset*e}px + 1%), 0)`)}},s.Paralax.styles=[_,hu],ci([O({context:ue}),l({attribute:!1})],s.Paralax.prototype,"theme",2),ci([l({type:Number})],s.Paralax.prototype,"offset",2),s.Paralax=ci([b("adgm-paralax")],s.Paralax);var gu=Object.defineProperty,mu=Object.getOwnPropertyDescriptor,ro=(t,e,a,i)=>{for(var n=i>1?void 0:i?mu(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&gu(e,a,n),n};s.Body=class extends E{constructor(){super(...arguments),this.variant="textS"}render(){return d`
      ${this.renderDebug("adgm-body",{description:this.variant})}
      <slot></slot>
    `}},s.Body.styles=_,ro([l({type:String})],s.Body.prototype,"variant",2),s.Body=ro([b("adgm-body")],s.Body);const vu=g`
  :host {
    display: block;
  }

  .container {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  a {
    display: flex;
    align-items: center;
    color: ${({theme:t})=>t.colors.black80};
    --icon-fill: ${({theme:t})=>t.colors.black80};
  }
  a:hover {
    color: ${({theme:t})=>t.colors.clearsky100};
    --icon-fill: ${({theme:t})=>t.colors.clearsky100};
  }

  .ellipsis {
    align-items: center;
    justify-content: flex-start;
  }

  adgm-dropdown {
    cursor: pointer;
  }

  ${({theme:t})=>t.enclosedParse(".ellipsis adgm-icon",{marginLeft:p({base:"6px",s:"12px"}),marginRight:p({base:"6px",s:"12px"})})}

  ${({theme:t})=>t.enclosedParse(".ellipsis",{display:p({base:"inline-flex",m:"none"})})}

  ${({theme:t})=>t.enclosedParse("::slotted(adgm-breadcrumb)",{display:p({base:"none",m:"block"})})}

  ::slotted(adgm-breadcrumb:last-child) {
    display: inherit;
  }
`;var fu=Object.defineProperty,yu=Object.getOwnPropertyDescriptor,oo=(t,e,a,i)=>{for(var n=i>1?void 0:i?yu(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&fu(e,a,n),n};s.Breadcrumbs=class extends E{constructor(){super(...arguments),this.list=[]}connectedCallback(){super.connectedCallback(),T(()=>this.initialize())}initialize(){this.list=[];const e=this.querySelectorAll("adgm-breadcrumb");e.forEach((a,i)=>{i!==e.length-1&&this.list.push({title:bi(a.textContent??""),href:a.href})})}render(){return d`
      ${this.renderDebug("adgm-breadcrumbs")}
      <adgm-spacer height="s24" _dd></adgm-spacer>
      <div class="container">
        <a href="/">
          <adgm-icon icon="home" class="home" size="s24" _dd></adgm-icon>
        </a>
        <div class="ellipsis">
          <adgm-icon
            icon="chevronBreadcrumb"
            color="black60"
            size="s16"
          ></adgm-icon>
          <adgm-dropdown
            size="s"
            variant="tertiary"
            placeholder="..."
            slot="content"
            hide-icon
            popup-width="70vw"
            _dd
          >
            <adgm-text slot="choosen" _dd>...</adgm-text>
            ${this.list.map(e=>d`
                <adgm-dropdown-option href=${Y(e.href)}>
                  ${e.title}
                </adgm-dropdown-option>
              `)}
          </adgm-dropdown>
        </div>
        <slot></slot>
      </div>
    `}},s.Breadcrumbs.styles=[_,vu],oo([w()],s.Breadcrumbs.prototype,"list",2),s.Breadcrumbs=oo([b("adgm-breadcrumbs")],s.Breadcrumbs);const bu=g`
  :host {
    display: block;
    position: relative;
    overflow: hidden;
  }

  .container {
    display: flex;
    align-items: center;
  }

  a {
    cursor: pointer;
    text-decoration: none;
    color: ${({theme:t})=>t.colors.foreground};
    transition: ${({theme:t})=>`color ${t.defaults.transitionDuration} ${t.defaults.transitionEase}`};
  }

  .container,
  a {
    --icon-fill: ${({theme:t})=>t.colors.black40};
  }

  a:hover adgm-text {
    color: ${({theme:t})=>t.colors.clearsky100};
  }

  div.container adgm-text {
    color: ${({theme:t})=>t.colors.black40};
  }

  ${({theme:t})=>t.enclosedParse("adgm-icon",{marginLeft:p({base:v(6),s:v(12)}),marginRight:p({base:v(6),s:v(12)})})}

  ${({theme:t})=>t.enclosedParse("a adgm-text",{display:p({base:"none",s:"block"})})}
`;var $u=Object.defineProperty,wu=Object.getOwnPropertyDescriptor,so=(t,e,a,i)=>{for(var n=i>1?void 0:i?wu(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&$u(e,a,n),n};s.Breadcrumb=class extends L{render(){return this.href?d`
      <a
        href=${this.href}
        class=${A({container:!0})}
      >
        <adgm-icon icon="chevronBreadcrumb" size="s16" _dd></adgm-icon>
        <adgm-text variant="textXS" weight="600" ellipsis _dd>
          <slot></slot>
        </adgm-text>
      </a>
    `:d`
        <div
          class=${A({container:!0})}
        >
          <adgm-icon icon="chevronBreadcrumb" size="s16" _dd></adgm-icon>
          <adgm-text variant="textXS" weight="500" ellipsis _dd>
            <slot></slot>
          </adgm-text>
        </div>
      `}},s.Breadcrumb.styles=[_,bu],so([l({type:String})],s.Breadcrumb.prototype,"href",2),s.Breadcrumb=so([b("adgm-breadcrumb")],s.Breadcrumb);const Cu=g`
  :host {
    display: block;
    position: relative;
    --font-weight: 600;
  }

  ${({theme:t})=>t.enclosedParse(".list",{...t.typography.textS.properties})}

  .list {
    margin: 0;
    padding: ${({theme:t})=>`0 0 0 ${t.spacings.s32}`};
  }

  :host([level="2"]),
  :host([level="3"]) {
    --font-weight: 500;
  }

  /* :host([level="3"]) {
    --font-weight: 400;
  } */

  :host([level="2"]) .list,
  :host([level="3"]) .list {
    padding: ${({theme:t})=>`0 0 0 ${t.spacings.s24}`};
  }

  :host([level="2"]) .list {
    list-style-type: lower-alpha;
  }

  :host([level="3"]) .list {
    list-style-type: lower-roman;
  }
`;var Su=Object.defineProperty,xu=Object.getOwnPropertyDescriptor,Pu=(t,e,a,i)=>{for(var n=i>1?void 0:i?xu(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&Su(e,a,n),n};s.TableOfContents=class extends E{render(){return d`
      ${this.renderDebug("adgm-toc")}
      <ol class="list">
        <slot></slot>
      </ol>
    `}},s.TableOfContents.styles=[_,Cu],s.TableOfContents=Pu([b("adgm-toc")],s.TableOfContents);const ku=g`
  :host {
    display: contents;
  }

  li {
    padding: 2px 0;
  }

  ol {
    margin: 0;
    padding: ${({theme:t})=>`0 0 0 ${t.spacings.s32}`};
  }

  ::marker {
    color: ${({theme:t})=>t.colors.clearsky80};
  }

  ::slotted(a[href]) {
    color: ${({theme:t})=>t.colors.clearsky80};
    text-decoration: none;
  }

  ::slotted(a[href]:hover) {
    text-decoration: underline;
    text-underline-position: under;
  }

  ::slotted(a[href]:focus-visible) {
    outline: 2px solid ${({theme:t})=>t.colors.clearsky60};
    border-radius: 2px;
  }

  ::slotted(adgm-toc-item) {
    --font-weight: 500;
  }
`;var _u=Object.defineProperty,Ou=Object.getOwnPropertyDescriptor,Lu=(t,e,a,i)=>{for(var n=i>1?void 0:i?Ou(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&_u(e,a,n),n};s.TableOfContentsItem=class extends L{render(){return d`
      <li>
        <slot></slot>
      </li>
    `}},s.TableOfContentsItem.styles=[_,ku],s.TableOfContentsItem=Lu([b("adgm-toc-item")],s.TableOfContentsItem);const Eu=g`
  :host {
    display: block;
    background-color: ${({theme:t})=>t.colors.coolglass40};
    /* color: ${({theme:t})=>t.colors.black100}; */
    color: ${({theme:t})=>t.colors.foreground};
    padding: ${({theme:t})=>`${t.spacings.rSectionM} 0`};
    position: relative;
  }

  ${({theme:t})=>t.enclosedParse(".content",{gridColumn:p({base:"1 / span 1",s:"1 / span 2",m:"2 / span 10",l:"3 / span 8"}),padding:p({base:t.spacings.rBodyM.toString(),m:"0"})})}
`;var Du=Object.defineProperty,Mu=Object.getOwnPropertyDescriptor,Tu=(t,e,a,i)=>{for(var n=i>1?void 0:i?Mu(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&Du(e,a,n),n};s.MessageBanner=class extends E{render(){return d`
      ${this.renderDebug("adgm-message-banner")}
      <adgm-grid _dd>
        <div class="content">
          <slot></slot>
        </div>
      </adgm-grid>
    `}},s.MessageBanner.styles=[_,Eu],s.MessageBanner=Tu([b("adgm-message-banner")],s.MessageBanner);const Au=g`
  :host {
    display: block;
    position: relative;
  }

  ${({theme:t})=>t.enclosedParse("adgm-icon",{width:p({base:v(64),s:v(128)}),height:p({base:v(64),s:v(128)})})}

  ::slotted([slot='image']) {
    border-radius: 50%;
  }

  ${({theme:t})=>t.enclosedParse("::slotted([slot='image'])",{width:p({base:v(128),s:v(80)}),height:p({base:v(128),s:v(80)})})}
`;var Nu=Object.defineProperty,Bu=Object.getOwnPropertyDescriptor,di=(t,e,a,i)=>{for(var n=i>1?void 0:i?Bu(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&Nu(e,a,n),n};s.Quote=class extends E{render(){return d`
      ${this.renderDebug("adgm-quote")}
      <div class="container">
        <adgm-icon icon="quotes" color="clearsky100" _dd></adgm-icon>
        <adgm-spacer height="rBodyM" _dd></adgm-spacer>
        <slot></slot>
        <adgm-spacer height="rBodyL" _dd></adgm-spacer>
        <slot name="image"></slot>
        <adgm-spacer height="rBodyXS" _dd></adgm-spacer>
        <adgm-text slot="author" variant="textL" weight="600" _dd>
          ${this.author}
        </adgm-text>
        <adgm-spacer height="s4" _dd></adgm-spacer>
        <adgm-text slot="source" variant="textS" weight="400" _dd>
          ${this.source}
        </adgm-text>
      </div>
    `}},s.Quote.styles=[_,Au],di([l({type:String})],s.Quote.prototype,"author",2),di([l({type:String})],s.Quote.prototype,"source",2),s.Quote=di([b("adgm-quote")],s.Quote);const Iu=g`
  :host {
    display: block;
    width: 100%;
    position: relative;
  }

  .container {
    background: white;
  }

  .container:not(.--small) {
    padding-top: ${({theme:t})=>t.spacings.s12};
    padding-bottom: ${({theme:t})=>t.spacings.s12};
  }

  .container.--sticky {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    z-index: 99;
  }

  .container.--sticky.--small {
    z-index: 102;
  }

  .container.--sticky:before {
    content: "";
    position: absolute;
    height: 20px;
    bottom: -20px;
    left: 0;
    width: 100vw;
    background: linear-gradient(
      180deg,
      ${({theme:t})=>t.colors.black100.alpha(.1)} 0%,
      ${({theme:t})=>t.colors.black100.alpha(0)} 100%
    );
    pointer-events: none;
  }

  .title {
    white-space: nowrap;
    line-height: 1;
  }

  .items {
    padding-top: 2px;
    gap: ${v(6)} ${v(32)};
  }

  ${({theme:t})=>t.enclosedParse("::slotted(adgm-content-navigation-item)",{whiteSpace:p({base:"normal",m:"nowrap"})})}

  ${({theme:t})=>t.enclosedParse("adgm-flex",{flexDirection:p({base:"column",m:"row"}),alignItems:p({base:"left",m:"flex-start"})})}
`;var Fu=Object.defineProperty,zu=Object.getOwnPropertyDescriptor,ea=(t,e,a,i)=>{for(var n=i>1?void 0:i?zu(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&Fu(e,a,n),n};let na=!1;s.ContentNavigation=class extends E{constructor(){super(...arguments),this.isSticky=!1,this.renderContent=()=>{var e;return y((e=this.currentBreakpoint)==null?void 0:e.state.m,()=>d`
        <adgm-flex gap="s32" _dd>
          <adgm-text class="title" variant="textXL" weight="400" _dd>
            On this page
          </adgm-text>
          <adgm-flex wrap class="items" _dd>
            <slot></slot>
          </adgm-flex>
        </adgm-flex>
      `,()=>d`
        <adgm-expansion-panel variant="contentNav" _dd>
          <adgm-text slot="title" variant="textXL" weight="400" _dd>
            On this page
          </adgm-text>
          <adgm-flex gap="s4" _dd>
            <slot></slot>
          </adgm-flex>
        </adgm-expansion-panel>
        ${y(!this.isSticky,()=>d`<adgm-hr color="black20"></adgm-ruler>`)}
      `)},this.onWindowScroll=()=>{na||(window.requestAnimationFrame(()=>{if(!this.containerElement){na=!1;return}this.getBoundingClientRect().top<=0?this.enableStickyness():this.disableStickyness(),na=!1}),na=!0)},this.enableStickyness=()=>{if(this.isSticky)return;const e=this.containerElement.getBoundingClientRect();this.isSticky=!0,this.style.minHeight=`${e.height}px`}}render(){var e;return d`
      ${this.renderDebug("adgm-content-navigation")}
      <div
        class=${A({container:!0,"--sticky":this.isSticky,"--small":((e=this.currentBreakpoint)==null?void 0:e.state.m)===!1})}
      >
        ${y(this.isSticky,()=>d`
            <adgm-container _dd>${this.renderContent()}</adgm-container>
          `,this.renderContent)}
      </div>
    `}connectedCallback(){super.connectedCallback(),window.addEventListener("scroll",this.onWindowScroll)}disconnectedCallback(){window.removeEventListener("scroll",this.onWindowScroll),super.disconnectedCallback()}disableStickyness(){this.isSticky&&(this.isSticky=!1,this.style.minHeight="")}},s.ContentNavigation.styles=[_,Iu],ea([O({context:bt,subscribe:!0}),l({attribute:!1})],s.ContentNavigation.prototype,"currentBreakpoint",2),ea([q(".container")],s.ContentNavigation.prototype,"containerElement",2),ea([w()],s.ContentNavigation.prototype,"isSticky",2),s.ContentNavigation=ea([b("adgm-content-navigation")],s.ContentNavigation);const Hu=g`
  :host {
    display: block;
  }
`;var Ru=Object.defineProperty,Vu=Object.getOwnPropertyDescriptor,hi=(t,e,a,i)=>{for(var n=i>1?void 0:i?Vu(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&Ru(e,a,n),n};s.ContentNavigationItem=class extends L{constructor(){super(...arguments),this.selected=!1}render(){return d`
      <adgm-link-button
        href=${this.href}
        size="s"
        variant=${this.selected?"primary":"secondary"}
        weight="600"
        icon=${this.selected?"arrowM":"arrowDown"}
        reverse
        @click=${this.onClick}
        _dd
      >
        <slot></slot>
      </adgm-link-button>
    `}connectedCallback(){super.connectedCallback();const e=fa(this.href??"");if(va()===e){const a=document.getElementById(e);a&&rn(a)}}onClick(e){const a=fa(this.href??"");if(a){const i=document.getElementById(a);i&&(Tn(a),e.preventDefault(),rn(i))}}},s.ContentNavigationItem.styles=[_,Hu],hi([l({type:String})],s.ContentNavigationItem.prototype,"href",2),hi([l({type:Boolean})],s.ContentNavigationItem.prototype,"selected",2),s.ContentNavigationItem=hi([b("adgm-content-navigation-item")],s.ContentNavigationItem);const ju=g`
  :host {
    display: block;
    overflow: hidden;
    position: relative;
  }

  .gallery {
    display: flex;
    gap: ${({theme:t})=>t.spacings.s32};
    flex-direction: column;
  }

  .gallery.--thumbnails {
    gap: ${({theme:t})=>t.spacings.rBodyL};
  }
`,Uu=g`
  .media-container {
    width: 100%;
    aspect-ratio: 16 / 9;
    background: ${({theme:t})=>t.colors.black20};
    position: relative;
    overflow: hidden;
  }

  .media-container .media-wrapper,
  .media-container .media-wrapper ::slotted(*) {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .media-container .media-wrapper ::slotted(iframe) {
    border: 0 !important;
  }

  .media-container .media-wrapper {
    transform: translateX(100%);
    transition: transform 0.3s ease;
  }

  .media-container .media-wrapper.--active {
    transform: translateX(0);
  }
`,Gu=g`
  .navigation {
    display: flex;
    gap: ${({theme:t})=>t.spacings.rGridGap};
    align-items: flex-start;
    justify-content: flex-end;
  }

  .--thumbnails .navigation {
    justify-content: flex-start;
  }

  .navigation .index {
    min-width: 185px;
    display: flex;
    justify-content: flex-end;
    user-select: none;
  }

  .navigation .controls-positioner {
    display: flex;
    align-items: flex-end;
  }

  ${({theme:t})=>t.enclosedParse(".--thumbnails .navigation .controls-positioner",{height:p({base:"auto",m:"156px"})})}

  .navigation .controls-container {
    display: flex;
    gap: ${({theme:t})=>t.spacings.s24};
    align-items: center;
    justify-content: flex-start;
  }

  .navigation .controls {
    display: flex;
    gap: ${({theme:t})=>t.spacings.s8};
  }
`,Wu=g`
  .navigation .thumbnails-container {
    flex-grow: 1;
  }

  ${({theme:t})=>t.enclosedParse(".navigation .thumbnails-container",{display:p({base:"none",m:"block"})})}

  .navigation .thumbnails-content {
    display: flex;
    gap: ${({theme:t})=>t.spacings.rGridGap};
  }

  .navigation .thumbnails-scroller {
    display: flex;
    overflow-x: scroll;

    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .navigation .thumbnails-scroller::-webkit-scrollbar {
    display: none;
  }

  .navigation .thumbnails-scroller:not(.--is-smooth-scrolling) {
    scroll-behavior: smooth;
    scroll-snap-type: x mandatory;
  }

  .thumbnails-filler {
    flex-grow: 0;
    flex-shrink: 0;
  }

  .navigation .thumbnails-content ::slotted(adgm-gallery-item) {
    scroll-snap-align: start;
  }
`;var qu=Object.defineProperty,Yu=Object.getOwnPropertyDescriptor,Ft=(t,e,a,i)=>{for(var n=i>1?void 0:i?Yu(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&qu(e,a,n),n};s.Gallery=class extends E{constructor(){super(),this.initialized=!1,this.thumbnails=!1,this.isLocked=!1,this.index=0,this.setSizing=()=>{if(!this.galleryElement||!this.thumbnailsScrollerElement||!this.thumbnailsContainerElement||!this.thumbnailsFillerElement){console.warn("Gallery nodes not available");return}const e=this.thumbnailsContainerElement.getBoundingClientRect().left,a=window.innerWidth-e,i=(window.innerWidth-this.galleryElement.clientWidth)/2;this.thumbnailsScrollerElement.style.width=`${a}px`,this.thumbnailsFillerElement.style.width=`${i}px`},this.uuid=Ot()}connectedCallback(){super.connectedCallback(),Nt(this,["adgm-gallery-item"],{onFirstLoad:()=>this.initialize(),onFullLoad:()=>this.fullInitialize()})}disconnectedCallback(){var e;(e=this.observer)==null||e.disconnect(),super.disconnectedCallback()}initialize(){var e;this.items=this.querySelectorAll("adgm-gallery-item"),(e=this.items)==null||e.forEach((a,i)=>a.addEventListener("click",()=>this.onItemClick(i))),this.thumbnails&&this.setSizing(),this.define()}fullInitialize(){this.initialize(),this.thumbnails&&(this.observer=new ResizeObserver(De(this.setSizing,100)),this.observer.observe(this)),T(()=>{this.thumbnailsScrollerElement.scrollLeft=0,this.initialized=!0})}render(){var e,a,i;return d`
      ${this.renderDebug("adgm-gallery")}
      <adgm-container _dd>
        <div
          class=${A({gallery:!0,"--thumbnails":this.thumbnails??!1})}
        >
          <div class="media-container"></div>

          <div class="navigation">
            <div class="controls-positioner">
              <div class="controls-container">
                <div class="index">
                  <adgm-text variant="displayL" weight="300" _dd>
                    ${en(this.index+1)}
                  </adgm-text>
                  <adgm-text
                    variant="displayL"
                    color="black40"
                    weight="300"
                    _dd
                  >
                    /${en(((e=this.items)==null?void 0:e.length)??0)}
                  </adgm-text>
                </div>
                <div class="controls">
                  <adgm-icon-button
                    icon="arrowL"
                    anim
                    outlined
                    mirror
                    size=${(a=this.currentBreakpoint)!=null&&a.state.s?"m":"s"}
                    variant="tertiary"
                    @click=${this.toPrevious}
                    _dd
                  ></adgm-icon-button>
                  <adgm-icon-button
                    icon="arrowL"
                    anim
                    size=${(i=this.currentBreakpoint)!=null&&i.state.s?"m":"s"}
                    outlined
                    variant="tertiary"
                    @click=${this.toNext}
                    _dd
                  ></adgm-icon-button>
                </div>
              </div>
            </div>
            ${y(this.thumbnails,()=>d`
                  <div class="thumbnails-container">
                    <div class="thumbnails-scroller">
                      <div class="thumbnails-content">
                        <slot></slot>
                      </div>
                      <div class="thumbnails-filler"></div>
                    </div>
                  </div>
                `)}
          </div>
        </div>
      </adgm-container>
    `}toPrevious(){this.isLocked||(this.preDefine(),this.index===0&&this.items?this.index=this.items.length-1:this.index--,this.define())}toNext(){this.isLocked||(this.preDefine(),this.items&&this.index===this.items.length-1?this.index=0:this.index++,this.define())}onItemClick(e){this.index===e||this.isLocked||(this.preDefine(),this.index=e,this.define())}preDefine(){const e=this.querySelector(`iframe[slot=${this.indexKey}], adgm-external-video[slot=${this.indexKey}], adgm-video[slot=${this.indexKey}]`);e&&dt(()=>{var i;const a=e.src;e.src=a,(i=e==null?void 0:e.element)==null||i.pause()},250,`gallery-iframe-pause-${this.indexKey}-${this.uuid}`)}define(){if(!this.items||this.items.length===0){console.warn("No gallery items found");return}if(this.indexKey=void 0,this.items.forEach((n,r)=>{r===this.index?(n.classList.add("--active"),this.indexKey=n.key):n.classList.remove("--active")}),this.thumbnails&&this.initialized&&(this.stopScroll&&this.stopScroll(),T(()=>{var n;(n=this.items)!=null&&n[this.index]&&(this.stopScroll=Co(this.thumbnailsScrollerElement,this.items[this.index]))})),!this.indexKey){console.warn("No key found for current gallery item");return}if(!this.mediaContainerElement){console.warn("Could not find media container node");return}if(!!this.mediaContainerElement.querySelector(`[data-index="${this.index.toString()}"]`))return;this.isLocked=!0,dt(()=>this.isLocked=!1,300,`galleryLock${this.uuid}`);const a=document.createElement("div");a.classList.add("media-wrapper"),a.setAttribute("data-index",this.index.toString()),this.mediaContainerElement.appendChild(a);const i=d`<slot name=${this.indexKey}></slot>`;if(ir(i,a),this.mediaContainerElement.children.length===1){a.classList.add("--active");return}T(()=>a.classList.add("--active")),dt(()=>this.cleanUp(),400,`gallery-clean-up-${this.uuid}`)}cleanUp(){this.mediaContainerElement.querySelectorAll(`.media-wrapper:not([data-index="${this.index}"])`).forEach(e=>e.remove())}},s.Gallery.styles=[ju,Uu,Gu,Wu],Ft([l({type:Boolean})],s.Gallery.prototype,"thumbnails",2),Ft([O({context:bt,subscribe:!0}),l({attribute:!1})],s.Gallery.prototype,"currentBreakpoint",2),Ft([w()],s.Gallery.prototype,"isLocked",2),Ft([w()],s.Gallery.prototype,"index",2),Ft([w()],s.Gallery.prototype,"indexKey",2),Ft([w()],s.Gallery.prototype,"items",2),Ft([q(".gallery")],s.Gallery.prototype,"galleryElement",2),Ft([q(".thumbnails-container")],s.Gallery.prototype,"thumbnailsContainerElement",2),Ft([q(".thumbnails-scroller")],s.Gallery.prototype,"thumbnailsScrollerElement",2),Ft([q(".thumbnails-content")],s.Gallery.prototype,"thumbnailsContentElement",2),Ft([q(".thumbnails-filler")],s.Gallery.prototype,"thumbnailsFillerElement",2),Ft([q(".media-container")],s.Gallery.prototype,"mediaContainerElement",2),s.Gallery=Ft([b("adgm-gallery")],s.Gallery);const Ku=g`
  :host {
    display: flex;
    position: relative;
    overflow: hidden;
    width: 272px;
    flex-shrink: 0;
    cursor: pointer;
    flex-direction: column;
    gap: ${({theme:t})=>t.spacings.s32};
  }

  .container {
    width: 100%;
    aspect-ratio: 16 / 9;
    position: relative;
    background: ${({theme:t})=>t.colors.clearsky40};
  }

  ::slotted(*) {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  .container::before {
    box-sizing: border-box;
    content: "";
    position: absolute;
    z-index: 2;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border: 2px solid transparent;
    background-color: transparent;
    transition: ${({theme:t})=>`
      background-color ${t.defaults.transitionDuration} ${t.defaults.transitionEase},
      border-color ${t.defaults.transitionDuration} ${t.defaults.transitionEase}
    `};
  }

  :host(.--active) .container::before {
    border-color: ${({theme:t})=>t.colors.clearsky100};
    background-color: ${({theme:t})=>t.colors.clearsky100.alpha(.2)};
  }

  adgm-text {
    width: 70%;
  }

  :host(.--active) {
    color: ${({theme:t})=>t.colors.clearsky100};
  }
`;var Zu=Object.defineProperty,Xu=Object.getOwnPropertyDescriptor,aa=(t,e,a,i)=>{for(var n=i>1?void 0:i?Xu(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&Zu(e,a,n),n};s.GalleryItem=class extends L{constructor(){super(...arguments),this.hasParentHover=!1}render(){return d`
      <div
        class="container"
        @mouseenter=${this.onEnter}
        @mouseleave=${this.onLeave}
      >
        <slot></slot>
      </div>
      <adgm-text variant="textXL" weight="300" clamp="2" _dd>
        ${this.name}
      </adgm-text>
    `}onEnter(){this.hasParentHover=!0}onLeave(){this.hasParentHover=!1}},s.GalleryItem.styles=[_,Ku],aa([vt({context:ze}),l({attribute:!1})],s.GalleryItem.prototype,"hasParentHover",2),aa([l({type:String})],s.GalleryItem.prototype,"name",2),aa([l({type:String})],s.GalleryItem.prototype,"key",2),s.GalleryItem=aa([b("adgm-gallery-item")],s.GalleryItem);const Qu=g`
  :host {
    display: block;
    position: relative;
  }

  .button-container {
    display: flex;
    flex-direction: column;
    position: relative;
    border-top: 1px solid ${({theme:t})=>t.colors.black20};
  }

  .button-container .button-positioner {
    margin-top: var(--tab-container-sticky-margin-top, 0);
  }

  button {
    border: 0;
    background: none;
    padding: ${({theme:t})=>`${t.spacings.s24} ${t.spacings.rBodyS}`};
    align-items: center;
    display: flex;
    justify-content: space-between;
    width: 100%;
    cursor: pointer;
    border-bottom: 1px solid ${({theme:t})=>t.colors.black20};
    transition: ${({theme:t})=>`
      color ${t.defaults.transitionDuration} ${t.defaults.transitionEase},
      background-color ${t.defaults.transitionDuration} ${t.defaults.transitionEase}
    `};
    position: relative;
  }

  button.--active {
    color: ${({theme:t})=>t.colors.black100};
    background: ${({theme:t})=>t.colors.steelgrey20};
    pointer-events: none;
  }
  .--section-variant-secondary button.--active,
  .--section-variant-tertiary button.--active {
    background: ${({theme:t})=>t.colors.steelgrey40};
  }

  button:not(.--active):hover {
    background: ${({theme:t})=>t.colors.coolglass40};
  }

  .content-container {
    place-content: unset;
    justify-items: center;
    position: relative;
  }

  .content-container ::slotted(adgm-tab) {
    width: 100%;
    transition: opacity 0.2s ease;
    opacity: 0;
    display: none;
    position: absolute;
    top: 0;
    left: 0;
  }

  .content-container ::slotted(adgm-tab.--active) {
    display: block;
    position: relative;
  }

  .content-container ::slotted(adgm-tab.--inactive) {
    display: block;
  }

  .content-container ::slotted(adgm-tab.--animate-in) {
    opacity: 1;
  }

  .animation-container {
    height: var(--container-height, auto);
    transition: height 0.2s ease;
  }
`;var Ju=Object.defineProperty,tp=Object.getOwnPropertyDescriptor,Gt=(t,e,a,i)=>{for(var n=i>1?void 0:i?tp(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&Ju(e,a,n),n};s.TabContainer=class extends E{constructor(){super(...arguments),this.windowScrollY=0,this.stickyButtonContainerMargin=0,this.isLocked=!1,this.sticky=!0,this.presentationVariant="default",this.showHeading=!1,this.index=0,this.isInitialized=!1,this.parentSectionVariant="primary",this.setDimensions=()=>{if(!this.buttonContainerElement||!this.buttonPositionerElement)return;const e=this.buttonContainerElement.offsetHeight,a=this.buttonPositionerElement.offsetHeight,i=Do(this.buttonContainerElement);let n=e-a;n<0&&(n=0),this.stickyDimensions={containerTop:i,containerHeight:e,positionerHeight:a,availableScrollHeight:n}},this.onWindowScroll=()=>{var e;!this.buttonContainerElement||!this.buttonPositionerElement||!((e=this.currentBreakpoint)!=null&&e.state.m)||(this.windowScrollY=window.scrollY,this.setStickyness())}}connectedCallback(){super.connectedCallback(),Nt(this,["adgm-tab"],{onFirstLoad:()=>this.initialize(),onFullLoad:()=>this.fullInitialize()})}initialize(){this.items=this.querySelectorAll("adgm-tab"),this.define()}fullInitialize(){var a;this.initialize();let e=!1;(a=this.items)==null||a.forEach((i,n)=>{var o;const r=(o=this.items)==null?void 0:o[n];!e&&Pi(r.deeplink,this)&&(e=!0,this.activeTab(n,!1)),r.defaultOpen&&!e&&this.activeTab(n,!1,!1)}),this.sticky&&(this.resizeObserver=new ResizeObserver(De(this.setDimensions,100)),this.resizeObserver.observe(this),window.addEventListener("scroll",this.onWindowScroll),this.setDimensions())}disconnectedCallback(){var e;this.sticky&&(window.removeEventListener("scroll",this.onWindowScroll),(e=this.resizeObserver)==null||e.disconnect()),super.disconnectedCallback()}setStickyness(){var a;if(!this.stickyDimensions)return;const e=this.windowScrollY-this.stickyDimensions.containerTop;e<0?this.stickyButtonContainerMargin=0:e>this.stickyDimensions.availableScrollHeight?this.stickyButtonContainerMargin=this.stickyDimensions.availableScrollHeight:this.stickyButtonContainerMargin=e,(a=this.buttonContainerElement)==null||a.style.setProperty("--tab-container-sticky-margin-top",`${this.stickyButtonContainerMargin}px`)}render(){var a,i;const e=(a=Array.from(this.items??[]))==null?void 0:a[this.index];return d`
      ${this.renderDebug("adgm-tab-container",{description:this.presentationVariant})}
      <adgm-container
        class=${`--section-variant-${this.parentSectionVariant}`}
        _dd
      >
        ${y((i=this.currentBreakpoint)==null?void 0:i.state.m,()=>d`
            ${y(this.showHeading&&(e==null?void 0:e.name),()=>d`
                <adgm-presentation-grid variant="sixSix" _dd>
                  <adgm-text variant="headingTwo" _dd>
                    <h2>${e==null?void 0:e.name}</h2>
                  </adgm-text>
                </adgm-presentation-grid>
                <adgm-spacer height="rBodyL" _dd></adgm-spacer>
              `)}
            <adgm-presentation-grid
              variant=${this.presentationVariant==="default"?"textText":this.presentationVariant}
              _dd
            >
              <div class="button-container">
                <div class="button-positioner">
                  <slot name="pre"></slot>
                  ${Array.from(this.items??[]).map((n,r)=>d`
                      <button
                        class=${A({"--active":r===this.index})}
                        @click=${()=>this.onTabClick(r)}
                      >
                        ${this.renderDebug("adgm-tab-container",{description:"tab"})}
                        <adgm-text varinet="textXL" weight="400" _dd>
                          ${n.name??"???"}
                        </adgm-text>
                      </button>
                    `)}
                </div>
              </div>
              <div class="animation-container">
                <div class="content-container">
                  <slot></slot>
                </div>
              </div>
            </adgm-presentation-grid>
          `,()=>d`<slot></slot>`)}
      </adgm-container>
    `}activeTab(e,a=!0,i=!0){var n,r,o;if(this.index=e,this.define(),i&&this.sticky&&this.stickyButtonContainerMargin!==0&&((n=this.buttonContainerElement)==null||n.style.setProperty("--tab-container-sticky-margin-top","0"),rn(this,"instant")),a){const c=(o=(r=this.items)==null?void 0:r[e])==null?void 0:o.deeplink;c&&Tn(c)}}onTabClick(e){this.activeTab(e)}define(){var a;if(this.isLocked=!0,(a=this.items)==null||a.forEach((i,n)=>{n===this.index?(i.classList.add("--active"),this.isInitialized?T(()=>i.classList.add("--animate-in")):(this.isInitialized=!0,i.classList.add("--animate-in"))):i.classList.contains("--animate-in")&&(i.classList.add("--inactive"),i.classList.remove("--active"),i.classList.remove("--animate-in"),dt(()=>{i&&i.classList.remove("--inactive")},200))}),!this.animationContainerElement){this.isLocked=!1,console.warn("Could not find animation container node");return}const e=this.animationContainerElement.getBoundingClientRect().height;if(e===0){this.isLocked=!1;return}T(()=>{var n;const i=(n=this.items)==null?void 0:n[this.index].clientHeight;this.animationContainerElement.style.setProperty("--container-height",`${e}px`),T(()=>{this.animationContainerElement.style.setProperty("--container-height",`${i}px`),dt(()=>{this.isLocked=!1,this.animationContainerElement.style.removeProperty("--container-height")},300)})})}},s.TabContainer.styles=[_,Qu],Gt([l({type:String,attribute:"presentation-variant"})],s.TabContainer.prototype,"presentationVariant",2),Gt([l({type:Boolean,attribute:"show-heading"})],s.TabContainer.prototype,"showHeading",2),Gt([w()],s.TabContainer.prototype,"items",2),Gt([w()],s.TabContainer.prototype,"index",2),Gt([w()],s.TabContainer.prototype,"isInitialized",2),Gt([q(".animation-container")],s.TabContainer.prototype,"animationContainerElement",2),Gt([q(".content-container")],s.TabContainer.prototype,"contentContainerElement",2),Gt([q(".button-container")],s.TabContainer.prototype,"buttonContainerElement",2),Gt([q(".button-positioner")],s.TabContainer.prototype,"buttonPositionerElement",2),Gt([O({context:bt,subscribe:!0}),l({attribute:!1})],s.TabContainer.prototype,"currentBreakpoint",2),Gt([O({context:Ue}),l({attribute:!1})],s.TabContainer.prototype,"parentSectionVariant",2),s.TabContainer=Gt([b("adgm-tab-container")],s.TabContainer);const ep=g`
  :host {
    display: block;
    position: relative;
  }
`;var np=Object.defineProperty,ap=Object.getOwnPropertyDescriptor,xn=(t,e,a,i)=>{for(var n=i>1?void 0:i?ap(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&np(e,a,n),n};s.Tab=class extends E{constructor(){super(...arguments),this.defaultOpen=!1}render(){var e;return y((e=this.currentBreakpoint)==null?void 0:e.state.m,()=>d`<slot></slot>`,()=>d`
        <adgm-expansion-panel
          type="plus"
          deeplink=${Y(this.deeplink)}
          default-open=${this.defaultOpen||P}
          _dd
        >
          <adgm-text variant="textL" weight="400" slot="title" _dd>
            <h3>${this.name}</h3>
          </adgm-text>
          <slot></slot>
        </adgm-expansion-panel>
      `)}},s.Tab.styles=[_,ep],xn([O({context:bt,subscribe:!0}),l({attribute:!1})],s.Tab.prototype,"currentBreakpoint",2),xn([l({type:String})],s.Tab.prototype,"name",2),xn([l({type:String})],s.Tab.prototype,"deeplink",2),xn([l({type:Boolean,attribute:"default-open"})],s.Tab.prototype,"defaultOpen",2),s.Tab=xn([b("adgm-tab")],s.Tab);const ip=g`
  :host {
    z-index: 3;
    width: 100%;
    position: absolute;
    background: rgba(0, 0, 0, 0.6);
    color: white;
    bottom: 0;
    left: 0;
    padding: ${({theme:t})=>t.spacings.s16};
  }
`;var rp=Object.defineProperty,op=Object.getOwnPropertyDescriptor,sp=(t,e,a,i)=>{for(var n=i>1?void 0:i?op(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&rp(e,a,n),n};s.Caption=class extends L{render(){return d`<slot></slot>`}},s.Caption.styles=[_,ip],s.Caption=sp([b("adgm-caption")],s.Caption);const lp=g`
  :host {
    display: flex;
    flex-direction: column;
    gap: ${({theme:t})=>t.spacings.s24};
    --presentation-row-gap: ${({theme:t})=>t.spacings.s24};
    transition: ${({theme:t})=>`opacity ${t.defaults.transitionDuration} ${t.defaults.transitionEase}`};
    position: relative;
  }

  :host(.--loading) {
    opacity: 0.5;
    pointer-events: none;
    user-select: none;
  }
`;var cp=Object.defineProperty,dp=Object.getOwnPropertyDescriptor,Kt=(t,e,a,i)=>{for(var n=i>1?void 0:i?dp(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&cp(e,a,n),n};s.FormProvider=class extends E{constructor(){super(...arguments),this.form={submit:()=>this.submit(),registerInput:e=>this.registerInput(e),updateInput:e=>this.updateInput(e),focusInput:e=>this.focusInput(e)},this.formIsLoading=!1,this.isDebugMode=!1,this.inputs=[],this.hasRequired=!1,this.hasFailed=!1}render(){return d`
      ${this.renderDebug("adgm-form-provider")}
      <slot></slot>
      ${y(this.hasRequired,()=>d`
          <adgm-text variant="textS" _dd>
            <adgm-spacer height="s8" _dd></adgm-spacer>
            * Required fields
          </adgm-text>
        `)}
      ${y(this.hasFailed,()=>d`
          <slot name="error">
            <adgm-message variant="error" _dd>
              <adgm-text weight="600" variant="textS" _dd>Failed</adgm-text>
              <adgm-text weight="400" variant="textS" _dd>
                Form failed to sent. If the problem preceeds, contact our
                <a href="#">support department</a>.
              </adgm-text>
            </adgm-message>
          </slot>
        `)}
    `}submit(){if(this.formIsLoading)return;if(this.debug("[FormProvider.submit]",this.inputs),!this.validate()){this.debug("[FormProvider.submit] Invalid",this.inputs);return}const e={};if(this.inputs.forEach(a=>{var i;e[a.getName()]=((i=a.getValue())==null?void 0:i.toString())??""}),this.debug("[FormProvider.submit]",e),!this.action){console.error("No action set for form");return}this.startLoading(),fetch(this.action,{method:this.method??"post",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then(a=>a.json()).then(a=>{this.debug("[FormProvider.submit] SUCCES",a),this.endLoading(),this.showSuccessAlert(),this.resetForm()}).catch(a=>{this.debug("[FormProvider.submit] FAILURE"),console.error(a),this.hasFailed=!0,this.endLoading()})}startLoading(){this.formIsLoading=!0,this.classList.add("--loading")}endLoading(){this.formIsLoading=!1,this.classList.remove("--loading")}validate(){this.debug("[FormProvider.validate]");let e=!0;return this.inputs.forEach(a=>{const i=Oo(a.getValue(),a.validate,a.getName("field"));this.debug(`[FormProvider.validate] ${a.getName()}`,a.validate,i),i.valid||(e=!1),a.setValidation(i)}),e}registerInput(e){this.debug(`[FormProvider.registerInput] ${e.getName()}:`,e.getValue()),this.inputs.push(e),!this.hasRequired&&e.isRequired()&&(this.hasRequired=!0)}updateInput(e){this.debug(`[FormProvider.updateInput] ${e.getName()}:`,e.getValue()),this.dispatchEvent(new CustomEvent("change",{detail:{values:this.getValues()},bubbles:!0,composed:!0}))}focusInput(e){this.inputs.forEach(a=>{a.getID()===e&&a.focus()})}debug(...e){T(()=>{this.isDebugMode&&console.log(...e)})}getValues(){const e={};return this.inputs.forEach(a=>{a.getName()&&a.getValue()&&(e[a.getName()]=a.getValue())}),e}showSuccessAlert(){const e=document.createElement("adgm-alert");e.title="Success",e.message="Form successfully sent. You will hear from us soon.",document.body.appendChild(e)}resetForm(){this.inputs.forEach(e=>e.resetValue()),this.hasFailed=!1}},s.FormProvider.styles=[_,lp],Kt([vt({context:He}),l({attribute:!1})],s.FormProvider.prototype,"form",2),Kt([vt({context:gr}),l({attribute:!1})],s.FormProvider.prototype,"formIsLoading",2),Kt([O({context:Rn,subscribe:!0}),l({attribute:!1})],s.FormProvider.prototype,"isDebugMode",2),Kt([q("form")],s.FormProvider.prototype,"formElement",2),Kt([l({type:String})],s.FormProvider.prototype,"action",2),Kt([l({type:String})],s.FormProvider.prototype,"method",2),Kt([l({type:String})],s.FormProvider.prototype,"target",2),Kt([w()],s.FormProvider.prototype,"inputs",2),Kt([w()],s.FormProvider.prototype,"hasRequired",2),Kt([w()],s.FormProvider.prototype,"hasFailed",2),s.FormProvider=Kt([b("adgm-form-provider")],s.FormProvider);const hp=g`
  input {
    flex-grow: 1;
    width: 100%;
    overflow: hidden;
    border: 0;
    padding: 0;
    margin: 0;
    background: transparent;
    outline: none;
    color: ${({theme:t})=>t.colors.foreground};
  }
  input::focus {
    outline: none;
  }

  .--disabled input {
    color: ${({theme:t})=>t.colors.black60};
  }

  .input-container {
    cursor: text;
  }

  ${({theme:t})=>t.enclosedParse("input",t.typography.textM.properties)}

  ${({theme:t})=>t.enclosedParse(".--size-s input",{...t.typography.textXS.properties,"--font-weight":500})}

  input[type="number"] {
    -moz-appearance: textfield;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input:-webkit-autofill,
  input:-webkit-autofill:focus {
    transition: background-color 600000s 0s, color 600000s 0s;
  }
`,up=g`
  :host {
    display: block;
  }

  .input-group {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 1px;
    outline: 1px solid transparent;
    position: relative;
    transition: ${({theme:t})=>`
      outline-color ${t.defaults.transitionDuration} ${t.defaults.transitionEase}
    `};
    z-index: var(--z-index);
  }

  :host([grow]) .input-group {
    flex-grow: 1;
  }

  .input-group.--focus,
  .input-group:hover {
    z-index: 2;
  }

  .input-container {
    box-sizing: border-box;
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }

  .content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    overflow: hidden;
    gap: ${({theme:t})=>t.spacings.s12};
  }

  ::slotted(adgm-icon),
  adgm-icon {
    width: ${v(32)};
    height: ${v(32)};
    pointer-events: none;
    flex-shrink: 0;
    flex-grow: 0;
  }

  .--size-s ::slotted(adgm-icon),
  .--size-s adgm-icon {
    width: ${v(24)} !important;
    height: ${v(24)} !important;
  }

  .--size-s .content {
    gap: ${({theme:t})=>t.spacings.s4};
  }

  .--disabled {
    pointer-events: none;
  }

  .placeholder,
  *::placeholder {
    color: ${({theme:t})=>t.colors.black60};
    transition: ${({theme:t})=>`
      color ${t.defaults.transitionDuration} ${t.defaults.transitionEase}
    `};
  }
`,pp=g`
  .input-group.--variant-primary .input-container {
    min-height: ${v(56)};
    border: 1px solid ${({theme:t})=>t.colors.black20};
    border-radius: 1px;
    background: ${({theme:t})=>t.colors.white};
    padding: 0 ${({theme:t})=>t.spacings.s16};
    transition: ${({theme:t})=>`
      border-color ${t.defaults.transitionDuration} ${t.defaults.transitionEase}
    `};
  }

  .input-group.--variant-primary.--size-s .input-container {
    min-height: ${v(40)};
    padding: 0 ${({theme:t})=>t.spacings.s12};
  }

  .input-group.--variant-primary.--focus,
  .input-group.--variant-primary:hover {
    outline-color: ${({theme:t})=>t.colors.clearsky100};
  }
  .input-group.--variant-primary.--focus .input-container,
  .input-group.--variant-primary:hover .input-container {
    border-color: ${({theme:t})=>t.colors.clearsky100};
  }

  .input-group.--variant-primary.--error,
  .input-group.--variant-primary.--error:hover {
    outline-color: ${({theme:t})=>t.colors.error};
  }
  .input-group.--variant-primary.--error .input-container {
    border-color: ${({theme:t})=>t.colors.error};
  }

  .input-group.--variant-primary ::slotted(adgm-icon),
  .input-group.--variant-primary adgm-icon {
    --icon-fill: ${({theme:t})=>t.colors.black80};
  }

  .input-group.--variant-primary.--disabled .input-container {
    border-color: ${({theme:t})=>t.colors.black20};
    background: transparent;
  }
`,gp=g`
  .input-group.--variant-secondary .input-container {
    min-height: ${v(56)};
    border-bottom: 1px solid ${({theme:t})=>t.colors.black100};
    transition: ${({theme:t})=>`
      border-color ${t.defaults.transitionDuration} ${t.defaults.transitionEase}
    `};
  }

  .input-group.--variant-secondary.--size-s .input-container {
    min-height: ${v(40)};
  }

  .input-group.--variant-secondary .input-container {
    --icon-fill: ${({theme:t})=>t.colors.black100};
  }

  .input-group.--variant-secondary.--focus .placeholder,
  .input-group.--variant-secondary:hover .placeholder,
  .input-group.--variant-secondary.--focus *::placeholder,
  .input-group.--variant-secondary:hover *::placeholder {
    color: ${({theme:t})=>t.colors.clearsky100};
  }

  .input-group.--variant-secondary.--focus .input-container,
  .input-group.--variant-secondary:hover .input-container {
    color: ${({theme:t})=>t.colors.foreground};
    --icon-fill: ${({theme:t})=>t.colors.foreground};
  }

  .input-group.--variant-secondary.--focus .input-container,
  .input-group.--variant-secondary:hover .input-container {
    border-bottom-color: ${({theme:t})=>t.colors.clearsky100};
  }
`;var mp=Object.defineProperty,vp=Object.getOwnPropertyDescriptor,zt=(t,e,a,i)=>{for(var n=i>1?void 0:i?vp(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&mp(e,a,n),n};class rt extends L{constructor(){super(...arguments),this.setInput=!1,this.hasFocus=!1,this.hasHover=!1,this.hasError=!1,this.inputID=Ot(),this.disabled=!1,this.grow=!1,this.error=!1,this.skip=!1,this.validate=[]}focus(){var e;(e=this.inputElement)==null||e.focus()}setValue(e){console.warn("Please implement setValue [value",e,"provided]")}getValue(){var e;return((e=this.inputElement)==null?void 0:e.value)??void 0}resetValue(){this.inputElement&&(this.inputElement.value="")}getName(e){return this.name||e||this.inputID}getID(){var e;return((e=this.formRow)==null?void 0:e.id)||this.inputID}setValidation(e){var a;this.hasError=!e.valid,(a=this.formRow)==null||a.setErrors(e.errors)}resetValidation(){var e;this.hasError=!1,(e=this.formRow)==null||e.setErrors([])}isRequired(){return this.validate.includes("required")}onClick(){this.focus()}onFocus(){this.hasFocus=!0}onBlur(){this.hasFocus=!1}onInput(){var e,a;this.dispatchEvent(new Event("input",{bubbles:!0,composed:!0})),this.setInput&&this.inputElement&&(this.inputElement.value=((e=this.getValue())==null?void 0:e.toString())??""),this.skip||(a=this.form)==null||a.updateInput(this),this.resetValidation()}connectedCallback(){var e,a,i;super.connectedCallback(),this.skip||((e=this.form)==null||e.registerInput(this),(a=this.formRow)==null||a.setIsRequired(this.isRequired()),(i=this.formRow)==null||i.setIsDisabled(this.disabled))}}rt.styles=[_,up,pp,gp],zt([O({context:He}),l({attribute:!1})],rt.prototype,"form",2),zt([O({context:mr}),l({attribute:!1})],rt.prototype,"formRow",2),zt([w()],rt.prototype,"hasFocus",2),zt([w()],rt.prototype,"hasHover",2),zt([w()],rt.prototype,"hasError",2),zt([l({type:String,attribute:"input-id"})],rt.prototype,"inputID",2),zt([l({type:String})],rt.prototype,"name",2),zt([l({type:Boolean})],rt.prototype,"disabled",2),zt([l({type:Boolean})],rt.prototype,"grow",2),zt([l({type:Boolean})],rt.prototype,"error",2),zt([l({type:Boolean})],rt.prototype,"skip",2),zt([l({type:Array})],rt.prototype,"validate",2),zt([q(".input")],rt.prototype,"inputElement",2);var fp=Object.defineProperty,yp=Object.getOwnPropertyDescriptor,ke=(t,e,a,i)=>{for(var n=i>1?void 0:i?yp(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&fp(e,a,n),n};s.TextInput=class extends rt{constructor(){super(...arguments),this.type="text",this.size="m",this.variant="primary"}render(){return d`
      <div class=${A({"input-group":!0,[`--variant-${this.variant}`]:!0,[`--size-${this.size}`]:!0,"--focus":this.hasFocus,"--error":this.hasError||this.error,"--disabled":!!this.disabled})}>
        <div
          class="input-container"
          @click=${this.onClick}
        >
          <div class="content">
            <slot name="pre"></slot>
            <input
              id=${this.getID()}
              type=${this.type}
              placeholder=${Y(this.placeholder)}
              name=${Y(this.name)}
              class="input"
              disabled=${this.disabled||P}
              @focus=${this.onFocus}
              @blur=${this.onBlur}
              @input=${this.onInput}
              value=${this.value}
              autofocus=${this.autoFocus||P}
            ></input>
            <slot name="post"></slot>
          </div>
        </div>
        <slot name="button"></slot>
      </div>
    `}setValue(e){this.value=e}clear(){const e=this.renderRoot.querySelector("input");e&&(e.value="")}},s.TextInput.styles=[...rt.styles,hp],ke([l({type:String})],s.TextInput.prototype,"type",2),ke([l({type:String})],s.TextInput.prototype,"value",2),ke([l({type:String})],s.TextInput.prototype,"placeholder",2),ke([l({type:Boolean,attribute:"auto-focus"})],s.TextInput.prototype,"autoFocus",2),ke([l({type:String})],s.TextInput.prototype,"size",2),ke([l({type:String})],s.TextInput.prototype,"variant",2),s.TextInput=ke([b("adgm-text-input")],s.TextInput);const bp=g`
  :host {
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .label {
    user-select: none;
    color: ${({theme:t})=>t.colors.foreground};
  }

  .label.--disabled {
    color: ${({theme:t})=>t.colors.black20};
  }
`;var $p=Object.defineProperty,wp=Object.getOwnPropertyDescriptor,_e=(t,e,a,i)=>{for(var n=i>1?void 0:i?wp(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&$p(e,a,n),n};s.FormRow=class extends E{constructor(){super(...arguments),this.formRow={id:Ot(),setErrors:e=>this.setErrors(e),setIsRequired:e=>this.setIsRequired(e),setIsDisabled:e=>this.setIsDisabled(e)},this.errors=[],this.isRequired=!1,this.isDisabled=!1}render(){return d`
      ${this.renderDebug("adgm-form-row")}
      ${y(this.label,()=>{var e;return d`
          <adgm-text
            variant="textS"
            ellipsis
            weight="500"
            class=${A({label:!0,"--disabled":this.isDisabled})}
            _dd
          >
            <label for=${(e=this.formRow)==null?void 0:e.id} @click=${this.onLabelClick}>
              ${this.label}${this.isRequired?"*":""}
            </label>
          </adgm-text>
          <adgm-spacer height="s8" _dd></adgm-spacer>
        `})}
      <div><slot></slot></div>
      ${y(this.errors.length>0,()=>d`
          <adgm-spacer height="s12" _dd></adgm-spacer>
          <adgm-text
            class="error"
            clamp="2"
            variant="textXS"
            color="error"
            weight="500"
            _dd
          >
            ${this.errors[0]}
          </adgm-text>
        `)}
    `}onLabelClick(){var e,a,i;(e=this.formRow)!=null&&e.id&&((i=this.form)==null||i.focusInput((a=this.formRow)==null?void 0:a.id))}setErrors(e){this.errors=e}setIsRequired(e){this.isRequired=e}setIsDisabled(e){this.isDisabled=e}},s.FormRow.styles=[_,bp],_e([vt({context:mr}),l({attribute:!1})],s.FormRow.prototype,"formRow",2),_e([O({context:He}),l({attribute:!1})],s.FormRow.prototype,"form",2),_e([l({type:String})],s.FormRow.prototype,"label",2),_e([w()],s.FormRow.prototype,"errors",2),_e([w()],s.FormRow.prototype,"isRequired",2),_e([w()],s.FormRow.prototype,"isDisabled",2),s.FormRow=_e([b("adgm-form-row")],s.FormRow);const Cp=g`
  :host {
    display: contents;
  }

  .container {
    display: block;
    position: relative;
  }

  .checkbox-proxy {
    position: absolute;
    width: 0;
    height: 0;
    opacity: 0;
  }

  .checkbox-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${({theme:t})=>t.spacings.s12};
    user-select: none;
  }

  .checkbox {
    position: relative;
    flex-shrink: 0;
    width: ${v(16)};
    height: ${v(16)};
    background: ${({theme:t})=>t.colors.white};
    border-radius: 1px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: ${({theme:t})=>`
      border-color ${t.defaults.transitionDuration} ${t.defaults.transitionEase},
      outline-color ${t.defaults.transitionDuration} ${t.defaults.transitionEase}
    `};
    box-sizing: border-box;
    border: 1px solid ${({theme:t})=>t.colors.black20};
    outline: 1px solid transparent;
  }

  .checkbox::after {
    width: ${v(8)};
    height: ${v(8)};
    background: transpartent;
    content: "";
    position: absolute;
    border-radius: 1px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: ${({theme:t})=>`
      background-color ${t.defaults.transitionDuration} ${t.defaults.transitionEase}
    `};
  }

  .--selected .checkbox::after {
    background-color: ${({theme:t})=>t.colors.clearsky100};
  }

  .checkbox-wrapper:hover .checkbox,
  .--focus .checkbox {
    border-color: ${({theme:t})=>t.colors.clearsky100};
  }

  .checkbox-wrapper:hover .checkbox,
  .--focus .checkbox {
    outline-color: ${({theme:t})=>t.colors.citynight100};
  }

  .--label {
    transition: ${({theme:t})=>`
      background-color ${t.defaults.transitionDuration} ${t.defaults.transitionEase},
      outline-color ${t.defaults.transitionDuration} ${t.defaults.transitionEase}
    `};
    border-radius: 1px;
    padding: ${v(4)} ${v(10)};
    outline: 1.5px solid transparent;
  }

  .--focus.--label,
  .--label:hover {
    background-color: ${({theme:t})=>t.colors.coolglass40};
  }

  .--error .checkbox {
    border-color: ${({theme:t})=>t.colors.error};
  }

  .--error.--selected .checkbox::after {
    background-color: ${({theme:t})=>t.colors.error};
  }

  .--disabled .checkbox {
    border-color: ${({theme:t})=>t.colors.black40};
    background: transparent;
  }
  .--selected.--disabled .checkbox::after {
    background-color: ${({theme:t})=>t.colors.black40};
  }

  .--disabled {
    pointer-events: none;
  }
`;var Sp=Object.defineProperty,xp=Object.getOwnPropertyDescriptor,We=(t,e,a,i)=>{for(var n=i>1?void 0:i?xp(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&Sp(e,a,n),n};s.Checkbox=class extends rt{constructor(){super(...arguments),this.variant="primary",this.checked=!1,this.isSelected=!1}render(){return d`
      <div
        class=${A({container:!0,"--focus":this.hasFocus,"--error":this.hasError,"--selected":this.isSelected,"--label":!!this.label,"--disabled":!!this.disabled})}
      >
        <input
          id=${this.getID()}
          type="checkbox"
          class="input checkbox-proxy"
          value=${this.value}"
          disabled=${this.disabled||P}
          @focus=${this.onFocus}
          @blur=${this.onBlur}
          @input=${this.onInput}
        ></input>
        <label class="checkbox-wrapper" for=${this.getID()}>
          <div class="checkbox"></div>
          ${y(!!this.label,()=>d`
              <adgm-text variant="textS" weight="500" ellipsis _dd>
                ${this.label}
              </adgm-text>
            `)}
        </label>
      </div>
    `}firstUpdated(){this.checked&&(this.isSelected=!0,this.inputElement.checked=!0)}onInput(){this.isSelected=this.isChecked(),super.onInput()}isChecked(){var e;return((e=this.inputElement)==null?void 0:e.checked)??!1}check(){T(()=>{this.isSelected=!0,this.inputElement.checked=!0,this.onInput()})}uncheck(){this.inputElement&&this.isChecked()&&(this.inputElement.checked=!1,this.isSelected=!1)}getValue(){return this.isChecked()?this.value??!0:void 0}},s.Checkbox.styles=[_,Cp],We([l({type:String})],s.Checkbox.prototype,"variant",2),We([l({type:String})],s.Checkbox.prototype,"label",2),We([l({type:String})],s.Checkbox.prototype,"value",2),We([l({type:Boolean})],s.Checkbox.prototype,"checked",2),We([w()],s.Checkbox.prototype,"isSelected",2),s.Checkbox=We([b("adgm-checkbox")],s.Checkbox);const Pp=g`
  .input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
    z-index: -1;
  }

  .value {
    flex-grow: 1;
    overflow: hidden;
  }

  .placeholder {
    user-select: none;
  }

  .chevron {
    transition: ${({theme:t})=>`transform ${t.defaults.transitionDuration} ${t.defaults.transitionEase} .1s`};
  }

  .choosen {
    user-select: none;
  }

  .--focus .chevron {
    transform: rotate(-180deg);
  }

  .input-group.--open {
    z-index: 3;
  }

  .--variant-input {
    margin-right: -1px;
  }
  .--variant-input .input-container {
    padding-right: ${v(2)} !important;
    padding-left: ${v(12)} !important;
  }
  .--variant-input .content {
    gap: ${v(2)} !important;
  }
`,kp=g`
  .--variant-primary .placeholder {
    color: ${({theme:t})=>t.colors.black60};
  }
  .--variant-primary .choosen {
    color: ${({theme:t})=>t.colors.black80};
  }
  .--variant-primary .chevron {
    --icon-fill: ${({theme:t})=>t.colors.black80};
  }
`,_p=g``,Op=g`
  .input-group.--variant-tertiary .input-container {
    color: ${({theme:t})=>t.colors.black100};
    --icon-fill: ${({theme:t})=>t.colors.black100};
  }

  .input-group.--variant-tertiary .placeholder {
    color: ${({theme:t})=>t.colors.black100};
  }

  .input-group.--variant-tertiary.--focus adgm-text,
  .input-group.--variant-tertiary:hover adgm-text {
    text-decoration: underline;
    text-underline-position: under;
  }
`,Lp=g`
  .popup-container {
    box-sizing: border-box;
    position: absolute;
    left: -1px;
    top: calc(100% + 5px);
    width: calc(100% + 2px);
    box-shadow: 0px 12px 24px 0px #1b3b770d, 0px 24px 60px 0px #062f7d0d,
      0px 2px 4px 0px #595b6133;
    padding: ${({theme:t})=>t.spacings.s12};
    background: ${({theme:t})=>t.colors.white};
    display: flex;
    flex-direction: column;
    gap: ${({theme:t})=>t.spacings.s16};
    z-index: 20;
  }

  :host([popup-text-align="center"]) .popup-container {
    text-align: center;
  }

  :host([popup-align="right"]) .popup-container {
    right: -1px;
    left: inherit;
  }

  .popup-overflow::-webkit-scrollbar {
    width: 2px;
    height: 2px;
  }
  .popup-overflow::-webkit-scrollbar-track {
    background: transparent;
  }
  .popup-overflow::-webkit-scrollbar-thumb {
    background: ${({theme:t})=>t.colors.black80};
  }

  .popup-content {
    display: flex;
    flex-direction: column;
    gap: ${({theme:t})=>t.spacings.s4};
  }

  .popup-overflow {
    max-height: 180px;
    overflow-y: scroll;
  }
  .--overflow .popup-content {
    padding-right: ${({theme:t})=>t.spacings.s8};
  }

  adgm-icon {
    pointer-events: none;
  }

  .popup-footer {
    padding: ${({theme:t})=>t.spacings.s16}
      ${({theme:t})=>t.spacings.s16} 0;
    border-top: 1px solid ${({theme:t})=>t.colors.black20};
    margin: 0 calc(${({theme:t})=>t.spacings.s16} * -1);
    display: flex;
    justify-content: flex-end;
  }
`;var Ep=Object.defineProperty,Dp=Object.getOwnPropertyDescriptor,ft=(t,e,a,i)=>{for(var n=i>1?void 0:i?Dp(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&Ep(e,a,n),n};s.Dropdown=class extends rt{constructor(){super(...arguments),this.setInput=!0,this.placeholder="Please select",this.search=!1,this.variant="primary",this.size="m",this.hasClear=!1,this.hideIcon=!1,this.isOpen=!1,this.popupHasOverflow=!1,this.onObservedResize=()=>{this.popupOverflowElement&&(this.popupHasOverflow=this.popupOverflowElement.scrollHeight>this.popupOverflowElement.clientHeight)},this.onClear=()=>{this.clear()},this.onWindowFocusIn=e=>{Mo(e.detail.activeElement,this)||this.close()},this.onKeyPress=e=>{e.code==="Escape"&&this.close()},this.onDocumentClick=e=>{Eo(this,e)||this.close()}}render(){return d`
      <div
        class=${A({"input-group":!0,"--focus":this.hasFocus||this.isOpen,"--error":this.hasError||this.error,"--disabled":!!this.disabled,"--open":this.isOpen,"--variant-primary":this.variant==="input",[`--size-${this.size}`]:!0,[`--variant-${this.variant}`]:!0})}
      >
        <div class="input-container" @click=${this.onClick}>
          <input
            type="text"
            id=${this.getID()}
            type="button"
            name=${Y(this.name)}
            class="input"
            value=${this.value}
            disabled=${this.disabled||P}
            @focus=${this.onFocus}
            @blur=${this.onBlur}
          />
          <div class="content">
            <slot name="pre"></slot>
            <div class="value">
              ${this.getValue()?this.renderChoosen():this.renderPlaceholder()}
            </div>
            <slot name="post"></slot>
            ${this.renderIcon()}
          </div>
        </div>
        <slot name="button"></slot>
        ${this.isOpen?this.renderPopup():""}
      </div>
    `}disconnectedCallback(){this.removeEventListeners(),super.disconnectedCallback()}renderIcon(){return y(this.hideIcon,()=>null,()=>d`<adgm-icon icon="chevronDownM" class="chevron" _dd></adgm-icon>`)}renderChoosen(){return d`
      <slot name="choosen">
        <adgm-text
          variant=${this.size==="s"?"textS":"textM"}
          weight="400"
          class="choosen"
          ellipsis
          _dd
        >
          ${this.pre} ${this.currentLabel??this.getValue()}
        </adgm-text>
      </slot>
    `}renderPlaceholder(){return d`
      <adgm-text
        variant=${this.size==="s"?"textS":"textM"}
        weight="400"
        class="placeholder"
        ellipsis
        _dd
      >
        ${this.placeholder}
      </adgm-text>
    `}renderPopup(){return d`
      <div
        class="popup-container"
        style="${this.popupWidth?`width: ${this.popupWidth}`:""}"
      >
        ${this.renderPopupContent()} ${this.renderPopupFooter()}
      </div>
    `}firstUpdated(){T(()=>{this.options=Array.from(this.querySelectorAll("adgm-dropdown-option")),this.options.forEach((e,a)=>{e.addEventListener("click",()=>this.onOptionSelect(a)),this.value&&e.value===this.value&&(this.index=a,this.define())})})}setValue(e){var i;this.value=e;const a=(i=this.options)==null?void 0:i.findIndex(n=>n.value===e);a!==-1&&(this.index=a,this.define())}renderPopupContent(){return d`${y(!!this.search,()=>d`
            <div class="search">
              <adgm-text-input
                placeholder="Search"
                size="s"
                skip
                @input=${this.onSearchInput}
                _dd
              >
                <adgm-icon icon="search" slot="post"></adgm-icon>
              </adgm-text-input>
            </div>
          `)}
      <div
        class=${A({"popup-overflow":!0,"--overflow":this.popupHasOverflow})}
      >
        <div class="popup-content">
          <slot></slot>
        </div>
      </div>`}renderPopupFooter(){return y(this.hasClear&&this.getValue(),()=>d`
          <div class="popup-footer">
            <adgm-button size="s" @click=${this.onClear} _dd>Clear</adgm-button>
          </div>
        `)}resetSearch(){var e;(e=this.options)==null||e.forEach(a=>{a.style.display==="none"&&(a.style.display="")}),this.searchElement&&(this.searchElement.value="")}open(){this.isOpen||(this.isOpen=!0,T(()=>{window.addEventListener("keydown",this.onKeyPress),window.addEventListener("adgm-focus",this.onWindowFocusIn),document.addEventListener("click",this.onDocumentClick),this.popupOverflowElement&&!this.observer&&(this.observer=new ResizeObserver(()=>this.onObservedResize()),this.observer.observe(this)),this.search&&this.searchElement&&this.searchElement.focus()}))}close(){this.isOpen&&(this.isOpen=!1,this.removeEventListeners(),this.resetSearch())}removeEventListeners(){var e;window.removeEventListener("keypress",this.onKeyPress),window.removeEventListener("adgm-focus",this.onWindowFocusIn),document.removeEventListener("click",this.onDocumentClick),(e=this.observer)==null||e.disconnect()}getValue(){var e,a;return this.index===void 0||(a=(e=this.options)==null?void 0:e[this.index])==null?void 0:a.value}define(){var e,a,i;if((e=this.options)==null||e.forEach(n=>{n.classList.remove("--selected")}),this.index===void 0){this.currentLabel=void 0;return}this.currentLabel=(a=this.options)==null?void 0:a[this.index].innerText,(i=this.options)==null||i[this.index].classList.add("--selected")}clear(){this.index=void 0,this.onInput(),this.define(),T(()=>this.close())}onSearchInput(e){var i;const a=e.target.getValue();if(!a){this.resetSearch();return}(i=this.options)==null||i.forEach(n=>{const r=(n.innerText+(n.value??"")).toLowerCase();a&&r.indexOf(a.toLowerCase())>=0?n.style.display="":n.style.display="none"})}onClick(){this.isOpen?this.close():super.onClick()}onFocus(){super.onFocus(),this.open()}onOptionSelect(e){this.index=e,this.define(),this.onInput(),this.focus(),T(()=>this.close())}resetValue(){this.resetSearch(),this.onClear()}},s.Dropdown.styles=[...rt.styles,Pp,kp,_p,Op,Lp],ft([l({type:String})],s.Dropdown.prototype,"value",2),ft([l({type:String})],s.Dropdown.prototype,"pre",2),ft([l({type:String})],s.Dropdown.prototype,"placeholder",2),ft([l({type:Boolean})],s.Dropdown.prototype,"search",2),ft([l({type:String})],s.Dropdown.prototype,"variant",2),ft([l({type:String})],s.Dropdown.prototype,"size",2),ft([l({type:String,attribute:"popup-width"})],s.Dropdown.prototype,"popupWidth",2),ft([l({type:String,attribute:"popup-align"})],s.Dropdown.prototype,"popupAlign",2),ft([l({type:Boolean,attribute:"clear"})],s.Dropdown.prototype,"hasClear",2),ft([l({type:Boolean,attribute:"hide-icon"})],s.Dropdown.prototype,"hideIcon",2),ft([q("adgm-text-input")],s.Dropdown.prototype,"searchElement",2),ft([q(".popup-overflow")],s.Dropdown.prototype,"popupOverflowElement",2),ft([w()],s.Dropdown.prototype,"isOpen",2),ft([w()],s.Dropdown.prototype,"currentLabel",2),ft([w()],s.Dropdown.prototype,"index",2),ft([w()],s.Dropdown.prototype,"options",2),ft([w()],s.Dropdown.prototype,"popupHasOverflow",2),s.Dropdown=ft([b("adgm-dropdown")],s.Dropdown);const Mp=g`
  :host {
    display: block;
    padding: ${({theme:t})=>`${t.spacings.s8} ${t.spacings.s12}`};
    transition: ${({theme:t})=>`
      background ${t.defaults.transitionDuration} ${t.defaults.transitionEase}
    `};
    cursor: pointer;
    user-select: none;
  }

  :host(.--selected) {
    background-color: ${({theme:t})=>t.colors.coolglass40};
  }

  :host(:hover),
  :host(.--selected:hover) {
    background-color: ${({theme:t})=>t.colors.coolglass40};
  }

  adgm-text {
    color: ${({theme:t})=>t.colors.foreground};
  }

  :host(:hover) adgm-text,
  :host(.--selected:hover) adgm-text {
    color: ${({theme:t})=>t.colors.black100};
  }

  :host(.--selected) adgm-text {
    color: ${({theme:t})=>t.colors.black100};
  }

  a {
    text-decoration: none;
  }
`;var Tp=Object.defineProperty,Ap=Object.getOwnPropertyDescriptor,Pn=(t,e,a,i)=>{for(var n=i>1?void 0:i?Ap(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&Tp(e,a,n),n};s.DropdownOption=class extends L{constructor(){super(...arguments),this.align="left"}render(){return this.href?d`
          <slot name="option">
            <a href=${this.href} target=${this.target||P}>
              ${this.renderContent()}
            </a>
          </slot>
        `:d`<slot name="option">${this.renderContent()}</slot>`}renderContent(){return d`
      <adgm-text
        variant="textS"
        weight="500"
        align=${this.align||P}
        ellipsis
        _dd
      >
        <slot></slot>
      </adgm-text>
    `}},s.DropdownOption.styles=[Mp],Pn([l({type:String})],s.DropdownOption.prototype,"value",2),Pn([l({type:String})],s.DropdownOption.prototype,"align",2),Pn([l({type:String})],s.DropdownOption.prototype,"href",2),Pn([l({type:String})],s.DropdownOption.prototype,"target",2),s.DropdownOption=Pn([b("adgm-dropdown-option")],s.DropdownOption);const Np=g`
  :host {
    display: flex;
  }

  .country-option,
  .choosen {
    display: flex;
    gap: ${({theme:t})=>t.spacings.s8};
    align-items: center;
    user-select: none;
  }

  .country-flag {
    width: 34px;
    height: 34px;
    background: ${({theme:t})=>t.colors.black20};
    border-radius: 50%;
    flex-shrink: 0;
  }

  .country-name {
    flex-grow: 1;
    overflow: hidden;
  }

  adgm-text-input {
    flex-grow: 1;
  }
`,ia={BD:"880",BE:"32",BF:"226",BG:"359",BA:"387",BB:"1-246",WF:"681",BL:"590",BM:"1-441",BN:"673",BO:"591",BH:"973",BI:"257",BJ:"229",BT:"975",JM:"1-876",BV:"",BW:"267",WS:"685",BQ:"599",BR:"55",BS:"1-242",JE:"44-1534",BY:"375",BZ:"501",RU:"7",RW:"250",RS:"381",TL:"670",RE:"262",TM:"993",TJ:"992",RO:"40",TK:"690",GW:"245",GU:"1-671",GT:"502",GS:"",GR:"30",GQ:"240",GP:"590",JP:"81",GY:"592",GG:"44-1481",GF:"594",GE:"995",GD:"1-473",GB:"44",GA:"241",SV:"503",GN:"224",GM:"220",GL:"299",GI:"350",GH:"233",OM:"968",TN:"216",JO:"962",HR:"385",HT:"509",HU:"36",HK:"852",HN:"504",HM:" ",VE:"58",PR:"1-787",PS:"970",PW:"680",PT:"351",SJ:"47",PY:"595",IQ:"964",PA:"507",PF:"689",PG:"675",PE:"51",PK:"92",PH:"63",PN:"870",PL:"48",PM:"508",ZM:"260",EH:"212",EE:"372",EG:"20",ZA:"27",EC:"593",IT:"39",VN:"84",SB:"677",ET:"251",SO:"252",ZW:"263",SA:"966",ES:"34",ER:"291",ME:"382",MD:"373",MG:"261",MF:"590",MA:"212",MC:"377",UZ:"998",MM:"95",ML:"223",MO:"853",MN:"976",MH:"692",MK:"389",MU:"230",MT:"356",MW:"265",MV:"960",MQ:"596",MP:"1-670",MS:"1-664",MR:"222",IM:"44-1624",UG:"256",TZ:"255",MY:"60",MX:"52",IL:"972",FR:"33",IO:"246",SH:"290",FI:"358",FJ:"679",FK:"500",FM:"691",FO:"298",NI:"505",NL:"31",NO:"47",NA:"264",VU:"678",NC:"687",NE:"227",NF:"672",NG:"234",NZ:"64",NP:"977",NR:"674",NU:"683",CK:"682",XK:"",CI:"225",CH:"41",CO:"57",CN:"86",CM:"237",CL:"56",CC:"61",CA:"1",CG:"242",CF:"236",CD:"243",CZ:"420",CY:"357",CX:"61",CR:"506",CW:"599",CV:"238",CU:"53",SZ:"268",SY:"963",SX:"599",KG:"996",KE:"254",SS:"211",SR:"597",KI:"686",KH:"855",KN:"1-869",KM:"269",ST:"239",SK:"421",KR:"82",SI:"386",KP:"850",KW:"965",SN:"221",SM:"378",SL:"232",SC:"248",KZ:"7",KY:"1-345",SG:"65",SE:"46",SD:"249",DO:"1-809",DM:"1-767",DJ:"253",DK:"45",VG:"1-284",DE:"49",YE:"967",DZ:"213",US:"1",UY:"598",YT:"262",UM:"1",LB:"961",LC:"1-758",LA:"856",TV:"688",TW:"886",TT:"1-868",TR:"90",LK:"94",LI:"423",LV:"371",TO:"676",LT:"370",LU:"352",LR:"231",LS:"266",TH:"66",TF:"",TG:"228",TD:"235",TC:"1-649",LY:"218",VA:"379",VC:"1-784",AE:"971",AD:"376",AG:"1-268",AF:"93",AI:"1-264",VI:"1-340",IS:"354",IR:"98",AM:"374",AL:"355",AO:"244",AS:"1-684",AR:"54",AU:"61",AT:"43",AW:"297",IN:"91",AX:"358-18",AZ:"994",IE:"353",ID:"62",UA:"380",QA:"974",MZ:"258"},ui={BD:"Bangladesh",BE:"Belgium",BF:"Burkina Faso",BG:"Bulgaria",BA:"Bosnia and Herzegovina",BB:"Barbados",WF:"Wallis and Futuna",BL:"Saint Barthelemy",BM:"Bermuda",BN:"Brunei",BO:"Bolivia",BH:"Bahrain",BI:"Burundi",BJ:"Benin",BT:"Bhutan",JM:"Jamaica",BV:"Bouvet Island",BW:"Botswana",WS:"Samoa",BQ:"Bonaire, Saint Eustatius and Saba ",BR:"Brazil",BS:"Bahamas",JE:"Jersey",BY:"Belarus",BZ:"Belize",RU:"Russia",RW:"Rwanda",RS:"Serbia",TL:"East Timor",RE:"Reunion",TM:"Turkmenistan",TJ:"Tajikistan",RO:"Romania",TK:"Tokelau",GW:"Guinea-Bissau",GU:"Guam",GT:"Guatemala",GS:"South Georgia and the South Sandwich Islands",GR:"Greece",GQ:"Equatorial Guinea",GP:"Guadeloupe",JP:"Japan",GY:"Guyana",GG:"Guernsey",GF:"French Guiana",GE:"Georgia",GD:"Grenada",GB:"United Kingdom",GA:"Gabon",SV:"El Salvador",GN:"Guinea",GM:"Gambia",GL:"Greenland",GI:"Gibraltar",GH:"Ghana",OM:"Oman",TN:"Tunisia",JO:"Jordan",HR:"Croatia",HT:"Haiti",HU:"Hungary",HK:"Hong Kong",HN:"Honduras",HM:"Heard Island and McDonald Islands",VE:"Venezuela",PR:"Puerto Rico",PS:"Palestinian Territory",PW:"Palau",PT:"Portugal",SJ:"Svalbard and Jan Mayen",PY:"Paraguay",IQ:"Iraq",PA:"Panama",PF:"French Polynesia",PG:"Papua New Guinea",PE:"Peru",PK:"Pakistan",PH:"Philippines",PN:"Pitcairn",PL:"Poland",PM:"Saint Pierre and Miquelon",ZM:"Zambia",EH:"Western Sahara",EE:"Estonia",EG:"Egypt",ZA:"South Africa",EC:"Ecuador",IT:"Italy",VN:"Vietnam",SB:"Solomon Islands",ET:"Ethiopia",SO:"Somalia",ZW:"Zimbabwe",SA:"Saudi Arabia",ES:"Spain",ER:"Eritrea",ME:"Montenegro",MD:"Moldova",MG:"Madagascar",MF:"Saint Martin",MA:"Morocco",MC:"Monaco",UZ:"Uzbekistan",MM:"Myanmar",ML:"Mali",MO:"Macao",MN:"Mongolia",MH:"Marshall Islands",MK:"Macedonia",MU:"Mauritius",MT:"Malta",MW:"Malawi",MV:"Maldives",MQ:"Martinique",MP:"Northern Mariana Islands",MS:"Montserrat",MR:"Mauritania",IM:"Isle of Man",UG:"Uganda",TZ:"Tanzania",MY:"Malaysia",MX:"Mexico",IL:"Israel",FR:"France",IO:"British Indian Ocean Territory",SH:"Saint Helena",FI:"Finland",FJ:"Fiji",FK:"Falkland Islands",FM:"Micronesia",FO:"Faroe Islands",NI:"Nicaragua",NL:"Netherlands",NO:"Norway",NA:"Namibia",VU:"Vanuatu",NC:"New Caledonia",NE:"Niger",NF:"Norfolk Island",NG:"Nigeria",NZ:"New Zealand",NP:"Nepal",NR:"Nauru",NU:"Niue",CK:"Cook Islands",XK:"Kosovo",CI:"Ivory Coast",CH:"Switzerland",CO:"Colombia",CN:"China",CM:"Cameroon",CL:"Chile",CC:"Cocos Islands",CA:"Canada",CG:"Republic of the Congo",CF:"Central African Republic",CD:"Democratic Republic of the Congo",CZ:"Czech Republic",CY:"Cyprus",CX:"Christmas Island",CR:"Costa Rica",CW:"Curacao",CV:"Cape Verde",CU:"Cuba",SZ:"Swaziland",SY:"Syria",SX:"Sint Maarten",KG:"Kyrgyzstan",KE:"Kenya",SS:"South Sudan",SR:"Suriname",KI:"Kiribati",KH:"Cambodia",KN:"Saint Kitts and Nevis",KM:"Comoros",ST:"Sao Tome and Principe",SK:"Slovakia",KR:"South Korea",SI:"Slovenia",KP:"North Korea",KW:"Kuwait",SN:"Senegal",SM:"San Marino",SL:"Sierra Leone",SC:"Seychelles",KZ:"Kazakhstan",KY:"Cayman Islands",SG:"Singapore",SE:"Sweden",SD:"Sudan",DO:"Dominican Republic",DM:"Dominica",DJ:"Djibouti",DK:"Denmark",VG:"British Virgin Islands",DE:"Germany",YE:"Yemen",DZ:"Algeria",US:"United States",UY:"Uruguay",YT:"Mayotte",UM:"United States Minor Outlying Islands",LB:"Lebanon",LC:"Saint Lucia",LA:"Laos",TV:"Tuvalu",TW:"Taiwan",TT:"Trinidad and Tobago",TR:"Turkey",LK:"Sri Lanka",LI:"Liechtenstein",LV:"Latvia",TO:"Tonga",LT:"Lithuania",LU:"Luxembourg",LR:"Liberia",LS:"Lesotho",TH:"Thailand",TF:"French Southern Territories",TG:"Togo",TD:"Chad",TC:"Turks and Caicos Islands",LY:"Libya",VA:"Vatican",VC:"Saint Vincent and the Grenadines",AE:"United Arab Emirates",AD:"Andorra",AG:"Antigua and Barbuda",AF:"Afghanistan",AI:"Anguilla",VI:"U.S. Virgin Islands",IS:"Iceland",IR:"Iran",AM:"Armenia",AL:"Albania",AO:"Angola",AQ:"Antarctica",AS:"American Samoa",AR:"Argentina",AU:"Australia",AT:"Austria",AW:"Aruba",IN:"India",AX:"Aland Islands",AZ:"Azerbaijan",IE:"Ireland",ID:"Indonesia",UA:"Ukraine",QA:"Qatar",MZ:"Mozambique"};var Bp=Object.defineProperty,Ip=Object.getOwnPropertyDescriptor,Oe=(t,e,a,i)=>{for(var n=i>1?void 0:i?Ip(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&Bp(e,a,n),n};s.PhoneInput=class extends rt{constructor(){super(...arguments),this.onDropdownInput=()=>{this.countryCodeValue=this.dropdownElement.getValue(),this.resetValidation()},this.onNumberInput=()=>{this.phoneNumberValue=this.textInputElement.getValue(),this.resetValidation()}}render(){var a;const e=this.countryCodeValue?ia==null?void 0:ia[this.countryCodeValue]:void 0;return d`
      <adgm-dropdown
        value=${this.defaultValue||P}
        variant="input"
        placeholder="Country code"
        name="phone_country"
        popup-width="260px"
        error=${this.hasError||P}
        search
        skip
        style=${this.hasError&&!this.countryCodeValue?"--z-index: 2;":""}
        disabled=${this.disabled||P}
        _dd
      >
        ${Object.entries(ia).sort((i,n)=>i[0].localeCompare(n[0])).map(([i,n])=>{const r=ui==null?void 0:ui[i];return d`
              <adgm-dropdown-option value="${i}">
                <div class="country-option" slot="option">
                  <div
                    class="country-flag"
                    style="background-image: url('/images/flags/${i==null?void 0:i.toLowerCase()}.svg')"
                  ></div>
                  <div class="country-name">
                    <adgm-text variant="textXS" color="black60" ellipsis _dd>
                      ${y(r,()=>d`<div>${r}</div>`)}
                    </adgm-text>
                    <adgm-text variant="textS" ellipsis _dd>+${n}</adgm-text>
                  </div>
                </div>
              </adgm-dropdown-option>
            `})}

        <div slot="choosen" class="choosen">
          <div
            class="country-flag"
            style="background-image: url('/images/flags/${(a=this.countryCodeValue)==null?void 0:a.toLowerCase()}.svg')"
          ></div>
          <adgm-text variant="textM" weight="400" class="choosen" ellipsis>
            +${y(e,()=>d`${e}`)}
          </adgm-text>
        </div>
      </adgm-dropdown>
      <adgm-text-input
        style=${this.hasError&&this.countryCodeValue?"--z-index: 1;":""}
        placeholder=${this.placeholder}
        name="phone_number"
        grow
        skip
        disabled=${this.disabled||!this.countryCodeValue||P}
        error=${this.hasError&&!!this.countryCodeValue||P}
        @focus=${this.onNumberFocus}
        _dd
      ></adgm-text-input>
    `}firstUpdated(){this.textInputElement.addEventListener("input",this.onNumberInput),this.dropdownElement.addEventListener("input",this.onDropdownInput),this.defaultValue&&(this.countryCodeValue=this.defaultValue)}onNumberFocus(){this.dropdownElement.close()}getValue(){if(this.dropdownElement&&this.dropdownElement.getValue()&&this.textInputElement&&this.textInputElement.getValue())return`${this.dropdownElement.getValue()} ${this.textInputElement.getValue()}`}resetValue(){this.countryCodeValue="",this.phoneNumberValue="",this.textInputElement.resetValue(),this.dropdownElement.resetValue()}},s.PhoneInput.styles=[_,Np],Oe([q("adgm-dropdown")],s.PhoneInput.prototype,"dropdownElement",2),Oe([q("adgm-text-input")],s.PhoneInput.prototype,"textInputElement",2),Oe([l({type:String})],s.PhoneInput.prototype,"placeholder",2),Oe([l({type:String,attribute:"default-value"})],s.PhoneInput.prototype,"defaultValue",2),Oe([w()],s.PhoneInput.prototype,"countryCodeValue",2),Oe([w()],s.PhoneInput.prototype,"phoneNumberValue",2),s.PhoneInput=Oe([b("adgm-phone-input")],s.PhoneInput);const Fp=g`
  textarea {
    flex-grow: 1;
    width: 100%;
    overflow: hidden;
    border: 0;
    padding: 0;
    margin: 0;
    background: transparent;
    outline: none;
    color: ${({theme:t})=>t.colors.foreground};
    resize: none;
    height: ${v(180)};
  }

  textarea::focus {
    outline: none;
  }

  .input-container {
    padding: ${({theme:t})=>t.spacings.s16} !important;
  }

  .--disabled textarea {
    color: ${({theme:t})=>t.colors.black60};
  }

  .input-container {
    cursor: text;
  }

  ${({theme:t})=>t.enclosedParse("textarea",t.typography.textM.properties)}

  ${({theme:t})=>t.enclosedParse(".--size-s textarea",{...t.typography.textXS.properties,"--font-weight":500})}

  textarea::-webkit-outer-spin-button,
  textarea::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  textarea:-webkit-autofill,
  textarea:-webkit-autofill:focus {
    transition: background-color 600000s 0s, color 600000s 0s;
  }

  textarea::placeholder {
    color: ${({theme:t})=>t.colors.black40};
  }
`;var zp=Object.defineProperty,Hp=Object.getOwnPropertyDescriptor,qe=(t,e,a,i)=>{for(var n=i>1?void 0:i?Hp(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&zp(e,a,n),n};s.TextArea=class extends rt{constructor(){super(...arguments),this.type="text",this.size="m",this.variant="primary"}render(){return d`
      <div
        class=${A({"input-group":!0,[`--size-${this.size}`]:!0,"--focus":this.hasFocus,"--error":this.hasError||this.error,"--disabled":!!this.disabled,[`--variant-${this.variant}`]:!0})}
      >
        <div class="input-container" @click=${this.onClick}>
          <div class="content">
            <slot name="pre"></slot>
            <textarea
              id=${this.getID()}
              type=${this.type}
              placeholder=${Y(this.placeholder)}
              name=${Y(this.name)}
              class="input"
              disabled=${this.disabled||P}
              @focus=${this.onFocus}
              @blur=${this.onBlur}
              @input=${this.onInput}
            ></textarea>
            <slot name="post"></slot>
          </div>
        </div>
        <slot name="button"></slot>
      </div>
    `}setValue(e){this.inputElement&&(this.inputElement.value=e)}firstUpdated(){this.value&&(this.inputElement.value=this.value)}},s.TextArea.styles=[...rt.styles,Fp],qe([l({type:String})],s.TextArea.prototype,"type",2),qe([l({type:String})],s.TextArea.prototype,"value",2),qe([l({type:String})],s.TextArea.prototype,"placeholder",2),qe([l({type:String})],s.TextArea.prototype,"size",2),qe([l({type:String})],s.TextArea.prototype,"variant",2),s.TextArea=qe([b("adgm-text-area")],s.TextArea);const Rp=g`
  .popup-content {
    padding: 2px;
  }
`;var Vp=Object.defineProperty,jp=Object.getOwnPropertyDescriptor,lo=(t,e,a,i)=>{for(var n=i>1?void 0:i?jp(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&Vp(e,a,n),n};s.CheckboxDropdown=class extends s.Dropdown{firstUpdated(){T(()=>{this.checkboxes=Array.from(this.querySelectorAll("adgm-checkbox")),this.checkboxes.forEach(e=>e.addEventListener("input",()=>this.onCheckboxInput()))})}onCheckboxInput(){T(()=>{this.requestUpdate(),this.onInput()})}setValue(e){e==null||e.forEach(a=>{var i;(i=this.checkboxes)==null||i.forEach(n=>{n.name===a&&n.check()})})}renderChoosen(){return d`
      <slot name="choosen">
        <adgm-text
          variant=${this.size==="s"?"textS":"textM"}
          weight="400"
          class="choosen"
          ellipsis
          _dd
        >
          ${this.getChoosenLabels().join(", ")}
        </adgm-text>
      </slot>
    `}getChoosenLabels(){var a;const e=[];return(a=this.checkboxes)==null||a.forEach(i=>{i.getValue()!==!1&&i.getValue()!==void 0&&e.push(i.label??i.getName())}),e}getValue(){var a;const e=[];if((a=this.checkboxes)==null||a.forEach(i=>{i.getValue()!==!1&&i.getValue()!==void 0&&e.push(i.getName())}),e.length!==0)return e}clear(){var e;(e=this.checkboxes)==null||e.forEach(a=>{a.uncheck()}),this.onCheckboxInput(),T(()=>this.close())}},s.CheckboxDropdown.styles=[...s.Dropdown.styles,Rp],lo([w()],s.CheckboxDropdown.prototype,"checkboxes",2),s.CheckboxDropdown=lo([b("adgm-checkbox-dropdown")],s.CheckboxDropdown);const Up=g`
  :host {
    display: block;
    width: 100%;
  }

  .header .button-container {
    text-align: center;
    grid-column: span 1;
  }

  .header .button-container button {
    padding: 0;
    margin: 0;
    border: 0;
    background: none;
    cursor: pointer;
    border-radius: 50%;
    transition: ${({theme:t})=>`background-color ${t.defaults.transitionDuration} ${t.defaults.transitionEase}`};
    aspect-ratio: 1 / 1;
    width: ${v(32)};
    height: ${v(32)};
    line-height: 0;
  }

  .header button:hover {
    background: ${({theme:t})=>t.colors.coolglass40};
  }

  .header adgm-text {
    grid-column: span 5;
    margin-top: 5px;
  }

  .header button adgm-icon {
    color: ${({theme:t})=>t.colors.clearsky100};
    --icon-fill: ${({theme:t})=>t.colors.clearsky100};
    margin-top: -1px;
  }

  ${({theme:t})=>t.enclosedParse(".day, .weekday, .month",{...t.typography.textXS.properties})}

  .grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: ${v(6)};
  }

  @container (min-width: 340px) {
    .grid {
      gap: ${v(18)};
    }
  }

  :host([variant="year"]) .calendar {
    grid-template-columns: repeat(3, 1fr);
    gap: ${v(24)} 0;
  }

  .month {
    display: flex;
    flex-direction: column;
    cursor: pointer;
    text-align: center;
  }
  .month-header {
    transition: ${({theme:t})=>`background-color ${t.defaults.transitionDuration} ${t.defaults.transitionEase}`};
    background-color: ${({theme:t})=>t.colors.steelgrey20};
    /* color: ${({theme:t})=>t.colors.black100}; */
    color: ${({theme:t})=>t.colors.foreground};
    padding: ${({theme:t})=>t.spacings.s4};
    --font-weight: 600;
  }
  .month:hover .month-header,
  .month.--active .month-header {
    background-color: ${({theme:t})=>t.colors.clearsky100};
    color: ${({theme:t})=>t.colors.white};
  }
  .month-body {
    padding: ${({theme:t})=>t.spacings.s4};
  }

  .day {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    border-radius: 50%;
    aspect-ratio: 1 / 1;
    width: ${v(28)};
    padding: ${v(2)};
    margin-left: auto;
    margin-right: auto;
    border: 1px solid ${({theme:t})=>t.colors.white};
    transition: ${({theme:t})=>`background-color ${t.defaults.transitionDuration} ${t.defaults.transitionEase}`};
  }

  .weekday {
    text-align: center;
    font-weight: 500;
  }

  .day.--highlight {
    border: 1px solid ${({theme:t})=>t.colors.clearsky100};
    color: ${({theme:t})=>t.colors.clearsky100};
  }
  .day.--adjacent {
    color: ${({theme:t})=>t.colors.black40};
  }
  .day.--adjacent.--highlight {
    border: 1px solid ${({theme:t})=>t.colors.black60};
  }
  .day:hover {
    background-color: ${({theme:t})=>t.colors.coolglass40};
    cursor: pointer;
  }
  .day.--active {
    background-color: ${({theme:t})=>t.colors.clearsky100} !important;
    border: 1px solid ${({theme:t})=>t.colors.white} !important;
    color: ${({theme:t})=>t.colors.white} !important;
  }
`;var Gp=Object.defineProperty,Wp=Object.getOwnPropertyDescriptor,Ye=(t,e,a,i)=>{for(var n=i>1?void 0:i?Wp(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&Gp(e,a,n),n};s.Calendar=class extends L{constructor(){super(...arguments),this.variant="month",this.highlights=[],this.currentDate=new Date}connectedCallback(){super.connectedCallback(),this.syncCurrentDateWithSelectedDate()}syncCurrentDateWithSelectedDate(){if(this.date){const e=Yt(this.date,this.parseFormat);e&&(this.currentDate=e)}}render(){const e=Array.from({length:7},(h,u)=>ht(new Date(2023,0,u+1),"E")[0]),a=Array.from({length:12},(h,u)=>ht(new Date(2023,u,1),"MMMM")),i=wl(this.currentDate),n=$l(this.currentDate),r=vl(i),o=Cl(n),c=[];for(let h=r;h<=o;h=pl(h,1))c.push(h);return y(this.variant==="year",()=>d`
        <div class="grid header">
          <div class="button-container">
            <button @click=${()=>this.onPrevYearClick()}>
              <adgm-icon icon="chevronRightM" mirror _dd></adgm-icon>
            </button>
          </div>
          <adgm-text
            variant="textS"
            color="clearsky100"
            weight="600"
            align="center"
            _dd
          >
            ${ht(this.currentDate,"yyyy")}
          </adgm-text>
          <div class="button-container">
            <button @click=${()=>this.onNextYearClick()}>
              <adgm-icon icon="chevronRightM" _dd></adgm-icon>
            </button>
          </div>
        </div>
        <adgm-spacer height="s20" _dd></adgm-spacer>
        <div class="calendar grid">
          ${a.map((h,u)=>d`
              <div
                class=${A({month:!0,"--active":this.currentDate.getMonth()===u})}
                @click=${()=>this.onMonthClick(new Date(this.currentDate.getFullYear(),u,1))}
              >
                <div class="month-header">${h}</div>
                <div class="month-body">
                  ${this.getHighlightCount(ht(new Date(this.currentDate.getFullYear(),u),"yyyy-MM"))}
                </div>
              </div>
            `)}
        </div>
      `,()=>d`
        <div class="grid header">
          <div class="button-container">
            <button @click=${()=>this.onPrevMonthClick()}>
              <adgm-icon icon="chevronRightM" mirror _dd></adgm-icon>
            </button>
          </div>
          <adgm-text
            variant="textS"
            color="clearsky100"
            weight="600"
            align="center"
            _dd
          >
            ${ht(this.currentDate,"MMMM yyyy")}
          </adgm-text>
          <div class="button-container">
            <button @click=${()=>this.onNextMonthClick()}>
              <adgm-icon icon="chevronRightM" _dd></adgm-icon>
            </button>
          </div>
        </div>
        <adgm-spacer height="s20" _dd></adgm-spacer>
        <div class="grid calendar">
          ${e.map(h=>d`<div class="weekday">${h}</div>`)}
          ${c.map(h=>{const u=ht(h,"yyyy-MM-dd"),m=h.getMonth()!==this.currentDate.getMonth();return d`
              <div
                class=${A({day:!0,"--active":u===this.date,"--highlight":this.isIncludedInHighlights(u),"--adjacent":m})}
                @click=${()=>this.onDayClick(h)}
              >
                ${kc(h)}
              </div>
            `})}
        </div>
      `)}isIncludedInHighlights(e){for(const a in this.highlights)if(this.highlights[a].date===e)return!0;return!1}getHighlightCount(e){for(const a in this.highlights)if(this.highlights[a].date===e){const i=this.highlights[a].count;return`${i} event${i!==1?"s":""}`}return d`&nbsp;`}onMonthClick(e){const a=ht(e,"yyyy-MM-dd"),i=new CustomEvent("month-select",{detail:{date:e,formattedDate:a},bubbles:!0,composed:!0});this.dispatchEvent(i),this.currentDate=e,this.requestUpdate()}onDayClick(e){const a=ht(e,"yyyy-MM-dd"),i=new CustomEvent("day-select",{detail:{date:e,formattedDate:a},bubbles:!0,composed:!0});this.dispatchEvent(i),this.date=a,this.currentDate=e,this.requestUpdate()}onPrevMonthClick(){this.currentDate=Hd(this.currentDate,1),this.requestUpdate()}onNextMonthClick(){this.currentDate=Ra(this.currentDate,1),this.requestUpdate()}onPrevYearClick(){this.currentDate=Rd(this.currentDate,1),this.requestUpdate()}onNextYearClick(){this.currentDate=$r(this.currentDate,1),this.requestUpdate()}},s.Calendar.styles=[_,Up],Ye([l({type:String})],s.Calendar.prototype,"variant",2),Ye([l({type:String})],s.Calendar.prototype,"date",2),Ye([l({type:String,attribute:"parse-format"})],s.Calendar.prototype,"parseFormat",2),Ye([l({type:Array})],s.Calendar.prototype,"highlights",2),Ye([w()],s.Calendar.prototype,"currentDate",2),s.Calendar=Ye([b("adgm-calendar")],s.Calendar);const qp=g`
  .choosen {
    user-select: none;
  }
`;var Yp=Object.defineProperty,Kp=Object.getOwnPropertyDescriptor,Ke=(t,e,a,i)=>{for(var n=i>1?void 0:i?Kp(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&Yp(e,a,n),n};s.DateInput=class extends s.Dropdown{constructor(){super(...arguments),this.dateFormat=Yn,this.popupWidth="306px"}firstUpdated(){this.value&&this.parseValue(this.value)}parseValue(e){if(e){const a=Yt(e,this.parseFormat);a&&(this.dateValue=a)}}setValue(e){if(e){const a=Yt(e,this.parseFormat);a&&(this.dateValue=a,this.value=ht(a,"yyyy-MM-dd"))}else this.dateValue=void 0}renderChoosen(){return d`
      <slot name="choosen">
        <adgm-text
          variant=${this.size==="s"?"textS":"textM"}
          weight="400"
          class="choosen"
          ellipsis
          _dd
        >
          ${this.pre}
          ${this.dateValue?ht(this.dateValue,this.dateFormat):""}
        </adgm-text>
      </slot>
    `}renderIcon(){return d`<adgm-icon icon="calendarInput" _dd></adgm-icon>`}renderPopupContent(){return d`
      <adgm-calendar
        date=${this.value||P}
        parse-format=${this.parseFormat||P}
        @day-select=${this.onDaySelect}
        _dd
      >
      </adgm-calendar>
    `}getValue(){return this.value}onDaySelect(e){this.dateValue=e.detail.date,this.value=e.detail.formattedDate,super.onInput(),e.detail.navigation||T(()=>this.close())}clear(){this.dateValue=void 0,this.value=void 0,super.clear()}},s.DateInput.styles=[...s.Dropdown.styles,qp],Ke([l({type:String})],s.DateInput.prototype,"placeholder",2),Ke([l({type:String,attribute:"date-format"})],s.DateInput.prototype,"dateFormat",2),Ke([l({type:String,attribute:"parse-format"})],s.DateInput.prototype,"parseFormat",2),Ke([l({type:String,attribute:"popup-width"})],s.DateInput.prototype,"popupWidth",2),Ke([w()],s.DateInput.prototype,"dateValue",2),s.DateInput=Ke([b("adgm-date-input")],s.DateInput);const Zp=g`
  :host {
    display: block;
    position: relative;
  }
`;var Xp=Object.defineProperty,Qp=Object.getOwnPropertyDescriptor,ra=(t,e,a,i)=>{for(var n=i>1?void 0:i?Qp(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&Xp(e,a,n),n};s.Questionaire=class extends E{constructor(){super(...arguments),this.activeUuid="root",this.items={}}get uuid(){return"root"}connectedCallback(){super.connectedCallback(),Nt(this,["adgm-questionaire-item"],{onFirstLoad:()=>this.initialize()})}initialize(){this.items={},this.querySelectorAll("adgm-questionaire-item").forEach(e=>{var i,n;const a=e;if(this.items[a.uuid]||(this.items[a.uuid]={item:a,children:[]}),((i=a.parentElement)==null?void 0:i.tagName)==="ADGM-QUESTIONAIRE"||((n=a.parentElement)==null?void 0:n.tagName)==="ADGM-QUESTIONAIRE-ITEM"){const r=a.parentElement;this.items[r.uuid]||(this.items[r.uuid]={item:r,children:[]}),this.items[r.uuid].children.push(a)}})}activate(){this.activeUuid="root"}deactivate(){}onRestartClick(){var e;(e=this.items)==null||e[this.activeUuid].item.deactivate(),this.previousUuid=void 0,this.activeUuid="root",this.defineSectionVariant()}onBackClick(){var e,a,i,n;(e=this.items)==null||e[this.activeUuid].item.deactivate(),this.activeUuid=this.previousUuid??"root",(a=this.items)==null||a[this.activeUuid].item.activate(),this.previousUuid=this.previousUuid?((n=(i=this.items)==null?void 0:i[this.previousUuid].item.parentElement)==null?void 0:n.uuid)??void 0:void 0,this.defineSectionVariant()}onItemClick(e){var a,i;this.previousUuid=this.activeUuid,(a=this.items)==null||a[this.previousUuid].item.deactivate(),this.activeUuid=e.uuid,(i=this.items)==null||i[this.activeUuid].item.activate(),this.defineSectionVariant()}defineSectionVariant(){var a,i,n;const e=To("ADGM-SECTION",this);e&&(((n=(i=(a=this.items)==null?void 0:a[this.activeUuid])==null?void 0:i.children)==null?void 0:n.length)===0?(this.originalSectionVariant||(this.originalSectionVariant=e.variant),e.setAttribute("variant","tertiary")):this.originalSectionVariant&&e.setAttribute("variant",this.originalSectionVariant))}render(){var e,a;return d`
      <div title="">
        ${this.renderDebug("adgm-questionaire")}
        ${y(this.activeUuid==="root",()=>d`
            ${y(this.title,()=>d`
                  <adgm-text variant="displayS" weight="300" _dd>
                    <h3>${this.title}</h3>
                  </adgm-text>
                  <adgm-spacer height="rBodyM" _dd></adgm-spacer>
                `)}
            <adgm-text variant="textL" weight="300" _dd>
              <slot></slot>
            </adgm-text>
          `)}
        <slot name="answers"></slot>
        <adgm-spacer height="rBodyM" _dd></adgm-spacer>
        <adgm-flex gap="rBodyXS" direction="row" justify="space-between" _dd>
          <adgm-flex gap="rBodyXS" direction="row" _dd>
            ${(a=(e=this.items)==null?void 0:e[this.activeUuid])==null?void 0:a.children.map(i=>d`
                  <adgm-button
                    variant="primary"
                    @click=${()=>this.onItemClick(i)}
                    _dd
                  >
                    ${i.getAnswer()}
                  </adgm-button>
                `)}
          </adgm-flex>
          ${y(this.activeUuid!=="root",()=>d`
              <adgm-flex gap="rBodyXS" direction="row" _dd>
                <adgm-button outlined @click=${()=>this.onBackClick()} _dd>
                  Back
                </adgm-button>
                <adgm-button outlined @click=${()=>this.onRestartClick()} _dd>
                  Restart
                </adgm-button>
              </adgm-flex>
            `)}
        </adgm-flex>
      </div>
    `}},s.Questionaire.styles=[_,Zp],ra([w()],s.Questionaire.prototype,"activeUuid",2),ra([w()],s.Questionaire.prototype,"previousUuid",2),ra([w()],s.Questionaire.prototype,"items",2),s.Questionaire=ra([b("adgm-questionaire")],s.Questionaire);const Jp=g`
  :host {
    display: block;
  }
`;var tg=Object.defineProperty,eg=Object.getOwnPropertyDescriptor,pi=(t,e,a,i)=>{for(var n=i>1?void 0:i?eg(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&tg(e,a,n),n};s.QuestionaireItem=class extends L{constructor(){super(),this._uuid="",this.answer="Yes",this.isActive=!1,this._uuid=Ot()}activate(){this.isActive=!0}deactivate(){this.isActive=!1}get uuid(){return this._uuid}getAnswer(){return this.answer}render(){return d`
      ${y(this.isActive,()=>d`
          ${y(this.title,()=>d`
                <adgm-text variant="displayS" weight="300" _dd>
                  <h3>${this.title}</h3>
                </adgm-text>
                <adgm-spacer height="rBodyM" _dd></adgm-spacer>
              `)}
          <adgm-text variant="textL" weight="300" _dd>
            <slot></slot>
          </adgm-text>
        `)}
      <slot name="answers"></slot>
    `}},s.QuestionaireItem.styles=[_,Jp],pi([l({type:String})],s.QuestionaireItem.prototype,"answer",2),pi([w()],s.QuestionaireItem.prototype,"isActive",2),s.QuestionaireItem=pi([b("adgm-questionaire-item")],s.QuestionaireItem);const ng=g`
  :host {
    display: block;
    padding: ${({theme:t})=>t.spacings.rBodyS};
    display: flex;
    justify-content: flex-start;
    gap: ${({theme:t})=>t.spacings.rBodyS};
    background-color: ${({theme:t})=>t.colors.coolglass40};
    /* color: ${({theme:t})=>t.colors.black100}; */
    --anchor-decoration: underline;
    position: relative;
  }

  :host([variant="error"]) {
    background-color: ${({theme:t})=>t.colors.error};
    color: ${({theme:t})=>t.colors.white};
    --anchor-color: ${({theme:t})=>t.colors.white};
  }

  .content {
    flex-grow: 1;
    align-content: center;
  }

  adgm-icon {
    --icon-fill: ${({theme:t})=>t.colors.white};
    background-color: ${({theme:t})=>t.colors.clearsky100};
    border-radius: 50%;
    padding: 10px;
    width: 30px;
    height: 30px;
  }

  :host([variant="error"]) adgm-icon {
    background-color: ${({theme:t})=>t.colors.white};
    --icon-fill: ${({theme:t})=>t.colors.error};
  }
`;var ag=Object.defineProperty,ig=Object.getOwnPropertyDescriptor,co=(t,e,a,i)=>{for(var n=i>1?void 0:i?ig(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&ag(e,a,n),n};s.Message=class extends E{constructor(){super(...arguments),this.variant="info"}render(){let e="info";switch(this.variant){case"error":e="warning";break;case"success":e="checkMark";break}return d`
      ${this.renderDebug("adgm-message",{description:this.variant})}
      <adgm-icon icon=${e} _dd></adgm-icon>
      <div class="content">
        <slot></slot>
      </div>
    `}},s.Message.styles=[_,ng],co([l({type:String})],s.Message.prototype,"variant",2),s.Message=co([b("adgm-message")],s.Message);const rg=g`
  :host {
    display: block;
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    position: relative;
  }

  a {
    text-decoration: none;
  }

  adgm-text {
    color: ${({theme:t})=>t.colors.foreground};
    text-align: center;
  }

  a:hover adgm-text {
    text-decoration: underline;
    text-underline-position: under;
  }

  adgm-icon {
    --icon-fill: ${({theme:t})=>t.colors.steelgrey100};
    width: ${v(60)};
    height: ${v(60)};
  }
`;var og=Object.defineProperty,sg=Object.getOwnPropertyDescriptor,gi=(t,e,a,i)=>{for(var n=i>1?void 0:i?sg(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&og(e,a,n),n};s.SocialCard=class extends E{constructor(){super(...arguments),this.icon="checkMark"}render(){return d`
      ${this.renderDebug("adgm-social-card")}
      <a href=${Y(this.href)} target="_blank" class="container">
        <adgm-icon icon=${this.icon} _dd></adgm-icon>
        <adgm-spacer height="rBodyM" _dd></adgm-spacer>
        <adgm-text weight="400" variant="textXL" _dd>
          <slot></slot>
        </adgm-text>
      </a>
    `}},s.SocialCard.styles=[_,rg],gi([l({type:String})],s.SocialCard.prototype,"icon",2),gi([l({type:String})],s.SocialCard.prototype,"href",2),s.SocialCard=gi([b("adgm-social-card")],s.SocialCard);const lg=g`
  :host {
    display: block;
    position: relative;
  }

  :host([overflow-scroll]) {
    overflow-x: scroll;
  }

  :host::-webkit-scrollbar {
    display: none;
  }

  :host(.--has-overflow)::-webkit-scrollbar {
    display: inherit;
    width: 2px;
    height: 2px;
  }
  :host::-webkit-scrollbar-track {
    background: transparent;
  }
  :host::-webkit-scrollbar-thumb {
    background: ${({theme:t})=>t.colors.black80};
  }

  :host(.--has-overflow) {
    padding-bottom: ${({theme:t})=>t.spacings.s8};
  }

  .table {
    display: table;
    gap: ${({theme:t})=>t.spacings.rBodyM};
    flex-direction: column;
    border-collapse: separate;
    border-spacing: 1px;
    width: 100%;
  }

  .table.--mode-default {
    min-width: var(--min-table-width, auto);
  }

  ${({theme:t})=>t.enclosedParse(".table.--mode-display",{display:p({base:"flex",m:"table"})})}

  ${({theme:t})=>t.enclosedParse(".table.--mode-display",{display:p({base:"flex",m:"table"})})}
`,oa="tableVariant",sa="tableMode";var cg=Object.defineProperty,dg=Object.getOwnPropertyDescriptor,se=(t,e,a,i)=>{for(var n=i>1?void 0:i?dg(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&cg(e,a,n),n};s.Table=class extends E{constructor(){super(...arguments),this.variant="primary",this.mode="default",this.columnHeadings=[],this.minWidth="auto",this.overflowScroll=!1,this.cellVerticalAlign="middle",this.hasOverflow=!1,this.verifyOverflow=()=>{this.overflowScroll&&(this.observer||(this.observer=new ResizeObserver(De(this.onObservedResize,100)),this.observer.observe(this)),this.tableElement.clientWidth>this.clientWidth?this.classList.add("--has-overflow"):this.classList.remove("--has-overflow"))},this.onObservedResize=()=>{this.verifyOverflow()}}connectedCallback(){super.connectedCallback(),Nt(this,["adgm-table-row"],{onFirstLoad:()=>this.initialize(),onFullLoad:()=>this.initialize(),alwaysVisible:!0})}disconnectedCallback(){var e;(e=this.observer)==null||e.disconnect(),super.disconnectedCallback()}initialize(){this.mode==="display"&&(this.columnHeadings=[],this.querySelectorAll("adgm-table-header-cell").forEach(i=>this.columnHeadings.push(i.getText()))),this.querySelectorAll("adgm-table-row").forEach((a,i)=>{a.even=i%2===0,this.mode==="display"&&a.querySelectorAll("adgm-table-cell").forEach((r,o)=>{var c;return r.heading=(c=this.columnHeadings)==null?void 0:c[o]})}),this.verifyOverflow()}render(){return d`
      ${this.renderDebug("adgm-table",{description:this.variant})}
      <div
        class=${A({table:!0,[`--variant-${this.variant}`]:!0,[`--mode-${this.mode}`]:!0})}
        style="
          --min-table-width: ${this.minWidth??"auto"};
          --cell-vertical-align: ${this.cellVerticalAlign};
        "
      >
        <slot></slot>
      </div>
    `}},s.Table.styles=[_,lg],se([vt({context:oa}),l({type:String})],s.Table.prototype,"variant",2),se([vt({context:sa}),l({type:String})],s.Table.prototype,"mode",2),se([l({attribute:!1})],s.Table.prototype,"columnHeadings",2),se([l({type:String,attribute:"min-width"})],s.Table.prototype,"minWidth",2),se([l({type:Boolean,attribute:"overflow-scroll"})],s.Table.prototype,"overflowScroll",2),se([l({type:String,attribute:"cell-vertical-align"})],s.Table.prototype,"cellVerticalAlign",2),se([w()],s.Table.prototype,"hasOverflow",2),se([q(".table")],s.Table.prototype,"tableElement",2),s.Table=se([b("adgm-table")],s.Table);const hg=g`
  :host {
    display: contents;
  }

  .row {
    flex-direction: column;
    gap: ${({theme:t})=>t.spacings.rBodyS};
    display: table-row;
  }

  .row {
    --row-color-primary: ${({theme:t})=>t.colors.steelgrey20};
  }
  .--section-variant-secondary.row,
  .--section-variant-tertiary.row {
    --row-color-primary: ${({theme:t})=>t.colors.steelgrey40};
  }

  ${({theme:t})=>t.enclosedParse(".row.--mode-display",{display:p({base:"flex",m:"table-row"}),borderBottom:p({base:`1px solid ${t.colors.steelgrey20}`,m:"none"}),paddingBottom:p({base:t.spacings.rBodyM.toString(),m:"0"})})}

  ${({theme:t})=>t.enclosedParse(".row.--mode-column",{display:p({base:"flex",m:"table-row"})})}

  .row.--variant-secondary.--odd {
    background: var(--row-color-primary);
  }
  ${({theme:t})=>t.enclosedParse(".row.--mode-display.--variant-secondary.--odd",{background:p({base:"none",m:"var(--row-color-primary)"})})}

  .row.--variant-tertiary.--odd {
    background: ${({theme:t})=>t.colors.steelgrey20};
  }

  ${({theme:t})=>t.enclosedParse(".row.--mode-display.--variant-tertiary.--odd",{background:p({base:"none",m:t.colors.steelgrey20.toString()})})}

  .row.--variant-tertiary.--even {
    background: ${({theme:t})=>t.colors.steelgrey40};
  }
  ${({theme:t})=>t.enclosedParse(".row.--mode-display.--variant-tertiary.--even",{background:p({base:"none",m:t.colors.clearsky20.toString()})})}
`;var ug=Object.defineProperty,pg=Object.getOwnPropertyDescriptor,Ze=(t,e,a,i)=>{for(var n=i>1?void 0:i?pg(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&ug(e,a,n),n};s.TableRow=class extends L{constructor(){super(...arguments),this.isEven=!1,this.variant="primary",this.mode="default",this.parentSectionVariant="primary"}set even(e){this.isEven=e}render(){var e;return d`
      <div
        class=${A({row:!0,[`--variant-${this.variant}`]:!0,[`--mode-${this.mode}`]:!0,"--even":this.isEven,"--odd":!this.isEven,[`--section-variant-${this.parentSectionVariant}`]:!0})}
      >
        ${y(((e=this.currentBreakpoint)==null?void 0:e.state.m)||this.mode==="default",()=>d`<slot></slot>`,()=>d`<slot name="s"><slot></slot></slot>`)}
      </div
    `}},s.TableRow.styles=[_,hg],Ze([w()],s.TableRow.prototype,"isEven",2),Ze([O({context:bt,subscribe:!0}),l({attribute:!1})],s.TableRow.prototype,"currentBreakpoint",2),Ze([O({context:oa}),l({attribute:!1})],s.TableRow.prototype,"variant",2),Ze([O({context:sa}),l({type:String})],s.TableRow.prototype,"mode",2),Ze([O({context:Ue}),l({attribute:!1})],s.TableRow.prototype,"parentSectionVariant",2),s.TableRow=Ze([b("adgm-table-row")],s.TableRow);const gg=g`
  :host {
    display: contents;
  }

  .cell {
    display: table-cell;
    position: relative;
    vertical-align: var(--cell-vertical-align, top);
    width: var(--cell-width);
    min-width: var(--cell-min-width);
    max-width: var(--cell-max-width);
  }

  .cell.--no-wrap {
    white-space: nowrap;
  }

  ${({theme:t})=>t.enclosedParse(".cell.--mode-display",{display:p({base:"block",m:"table-cell"})})}

  ${({theme:t})=>t.enclosedParse(".cell",{...t.typography.textXS.properties,"--font-weight":500})}

  ${({theme:t})=>t.enclosedParse(".cell .heading",{...t.typography.textXS.properties,"--font-weight":600,fontWeight:600,paddingBottom:t.spacings.s4})}

  .cell.--align-right .content {
    text-align: right;
  }
  ${({theme:t})=>t.enclosedParse(".cell.--mode-display.--align-right .content",{textAlign:p({base:"left",m:"right"})})}

  .cell.--align-center .content {
    text-align: center;
  }
  ${({theme:t})=>t.enclosedParse(".cell.--mode-display.--align-center .content",{textAlign:p({base:"left",m:"center"})})}

  /* Table cell - Primary variant */

  .cell.--variant-primary {
    padding: ${({theme:t})=>`${t.spacings.s12} ${t.spacings.rBodyM} ${t.spacings.s12} 0`};
    height: ${({theme:t})=>t.spacings.s48};
  }
  :host-context(adgm-table-cell:last-child) .cell.--variant-primary {
    padding-right: 0 !important;
  }

  .cell.--variant-primary::before {
    content: "";
    position: absolute;
    border-bottom: ${({theme:t})=>`1px solid ${t.colors.black20}`};
    width: calc(100% - ${({theme:t})=>t.spacings.rBodyM});
    bottom: -1px;
    left: 0;
  }
  :host-context(adgm-table-cell:last-child) .cell.--variant-primary::before {
    width: 100%;
  }

  ${({theme:t})=>t.enclosedParse(".cell.--mode-display.--variant-primary::before",{display:p({base:"none",m:"block"})})}

  ${({theme:t})=>t.enclosedParse(".cell.--mode-display.--variant-primary",{padding:p({base:"0",m:`${t.spacings.s12} ${t.spacings.rBodyM} ${t.spacings.s12} 0`}),height:p({base:"auto",m:t.spacings.s48.toString()})})}

  /* Table cell - Secondary / tertiary / quaternary variant */

  .cell.--variant-secondary,
  .cell.--variant-tertiary,
  .cell.--variant-quinary,
  .cell.--variant-quaternary {
    padding: ${({theme:t})=>`${t.spacings.s12} ${t.spacings.s8}`};
  }

  .cell {
    --cell-color-primary: ${({theme:t})=>t.colors.steelgrey20};
  }
  .--section-variant-secondary.cell,
  .--section-variant-tertiary.cell {
    --cell-color-primary: ${({theme:t})=>t.colors.steelgrey40};
  }

  ${({theme:t})=>t.enclosedParse(".cell.--mode-display.--variant-secondary, .cell.--mode-display.--variant-tertiary, .cell.--mode-display.--variant-quaternary, .cell.--mode-display.--variant-quinary",{padding:p({base:"0",m:`${t.spacings.s12} ${t.spacings.s8}`})})}

  .cell.--variant-quaternary {
    background: var(--cell-color-primary);
  }
  ${({theme:t})=>t.enclosedParse(".cell.--mode-display.--variant-quaternary",{background:p({base:"none",m:"var(--cell-color-primary)"})})}

  :host-context(adgm-table-cell:first-child) .cell.--variant-quaternary {
    background: var(--cell-color-primary);
    font-weight: 600;
  }
  :host-context(adgm-table-cell:first-child)
    .cell.--variant-quaternary
    .content {
    font-weight: 600;
    --font-weight: 600;
  }
  ${({theme:t})=>t.enclosedParse(":host-context(adgm-table-cell:first-child) .cell.--mode-display.--variant-quaternary",{background:p({base:"none",m:"var(--cell-color-primary)"})})}

  .cell.--variant-quinary {
    background: var(--cell-color-primary);
  }
  ${({theme:t})=>t.enclosedParse(".cell.--mode-display.--variant-quinary",{background:p({base:"none",m:"var(--cell-color-primary)"})})}

  /* Table cell - Overflow clamped */

  .--overflow-clamped .content {
    position: relative;
    height: calc(var(--cell-overflow-clamp, 6) * ${v(16*1.5)});
    overflow: hidden;
  }

  .--overflow-clamped .content::before {
    position: absolute;
    content: "...";
    inset-block-end: 0;
    inset-inline-end: 0;
  }
  .--overflow-clamped .content::after {
    content: "";
    position: absolute;
    inset-inline-end: 0;
    width: 1rem;
    height: 1rem;
    background: white;
  }

  .view-more {
    text-align: center;
    font-size: 0;
    border: 0;
    background: 0;
    width: 100%;
    height: 24px;
    cursor: pointer;
    padding: 0;
    margin: 0;
    display: block;
    padding-top: ${({theme:t})=>t.spacings.s8};
  }

  .view-more adgm-icon {
    width: 24px;
    height: 24px;
    transition: ${({theme:t})=>`transform ${t.defaults.transitionDuration} ${t.defaults.transitionEase}`};
    pointer-events: none;
    transform: rotate(180deg);
  }

  .--overflow-clamped .view-more adgm-icon {
    transform: rotate(0deg);
  }

  /* Table cell - Content styling */

  ${({theme:t})=>t.enclosedParse("a[href]",{...t.typography.textS.properties,"--font-weight":600})}

  a[href] {
    color: var(--anchor-color, ${({theme:t})=>t.colors.clearsky100});
    text-decoration: var(--anchor-decoration, none);
    text-underline-position: under;
  }
  a[href]:hover {
    text-decoration: underline;
  }
  a[href]:focus-visible {
    outline: 2px solid ${({theme:t})=>t.colors.clearsky60};
    border-radius: 2px;
  }
  ::slotted(a[href]) {
    color: var(--anchor-color, ${({theme:t})=>t.colors.clearsky100});
    font-weight: 600;
    text-decoration: var(--anchor-decoration, none);
    text-underline-position: under;
  }
  ::slotted(a[href]:hover) {
    text-decoration: underline;
  }
  ::slotted(a[href]:focus-visible) {
    outline: 2px solid ${({theme:t})=>t.colors.clearsky60};
    border-radius: 2px;
  }
  ::slotted(b),
  ::slotted(strong) {
    font-weight: 600;
  }
  ::slotted(em),
  ::slotted(i) {
    font-style: italic;
  }

  ::slotted(ul) {
    padding: 0 0 0 20px;
    margin: 0;
  }
`;var mg=Object.defineProperty,vg=Object.getOwnPropertyDescriptor,St=(t,e,a,i)=>{for(var n=i>1?void 0:i?vg(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&mg(e,a,n),n};s.TableCell=class extends L{constructor(){super(...arguments),this.overflowClamp=0,this.align="left",this.noWrap=!1,this.variant="primary",this.mode="default",this.parentSectionVariant="primary",this.isOverflowClamped=!1,this.hasOverflow=!1,this.onObservedMutation=()=>{this.setOverflowClamp()}}set heading(e){this.columnHeading=e}firstUpdated(){T(()=>this.setOverflowClamp())}setOverflowClamp(){if(this.overflowClamp<1||!this.contentElement){this.hasOverflow=!1,this.isOverflowClamped=!1;return}const e=this.contentElement.offsetHeight;this.isOverflowClamped=!0,T(()=>{const a=this.contentElement.offsetHeight;this.hasOverflow=e>a,this.isOverflowClamped=this.hasOverflow,!this.mutationObserver&&this.hasOverflow&&(this.mutationObserver=new MutationObserver(De(this.onObservedMutation,50)),this.mutationObserver.observe(this,{childList:!0,characterData:!0}))})}onOverflowClampToggle(){!this.hasOverflow||this.overflowClamp<1||(this.isOverflowClamped=!this.isOverflowClamped)}disconnectedCallback(){var e;(e=this.mutationObserver)==null||e.disconnect(),super.disconnectedCallback()}render(){return d`
      <div
        class=${A({cell:!0,"--no-wrap":this.noWrap??!1,[`--variant-${this.variant}`]:!0,[`--mode-${this.mode}`]:!0,[`--align-${this.align}`]:!0,"--overflow-clamped":this.isOverflowClamped,[`--section-variant-${this.parentSectionVariant}`]:!0})}
        style=""
      >
        <div class="content">
          ${y(this.columnHeading,()=>d`
              <adgm-visibility hide="m">
                <div class="heading">${this.columnHeading}</div>
              </adgm-visibility>
            `)}
          ${this.href?d`
                <a href=${this.href} target=${Y(this.target)}>
                  <slot></slot>
                </a>
              `:d`<slot></slot>`}
        </div>
        ${y(this.hasOverflow,()=>d`
            <button class="view-more" @click=${this.onOverflowClampToggle}>
              <adgm-icon icon="chevronDownM" class="chevron" _dd></adgm-icon>
            </button>
          `)}
      </div>
    `}},s.TableCell.styles=[_,gg],St([l({type:String})],s.TableCell.prototype,"href",2),St([l({type:String})],s.TableCell.prototype,"target",2),St([l({type:String,attribute:"min-width"})],s.TableCell.prototype,"minWidth",2),St([l({type:String,attribute:"max-width"})],s.TableCell.prototype,"maxWidth",2),St([l({type:String})],s.TableCell.prototype,"width",2),St([l({type:Number,attribute:"overflow-clamp"})],s.TableCell.prototype,"overflowClamp",2),St([l({type:String})],s.TableCell.prototype,"align",2),St([l({type:Boolean,attribute:"no-wrap"})],s.TableCell.prototype,"noWrap",2),St([O({context:oa}),l({attribute:!1})],s.TableCell.prototype,"variant",2),St([O({context:sa}),l({type:String,attribute:!1})],s.TableCell.prototype,"mode",2),St([O({context:Ue}),l({attribute:!1})],s.TableCell.prototype,"parentSectionVariant",2),St([w()],s.TableCell.prototype,"isOverflowClamped",2),St([w()],s.TableCell.prototype,"hasOverflow",2),St([w()],s.TableCell.prototype,"columnHeading",2),St([q(".content")],s.TableCell.prototype,"contentElement",2),s.TableCell=St([b("adgm-table-cell")],s.TableCell);const fg=g`
  :host {
    display: contents;
  }

  .cell {
    display: table-cell;
    position: relative;
    vertical-align: top;
    width: var(--cell-width);
    min-width: var(--cell-min-width);
    max-width: var(--cell-max-width);
  }

  ${({theme:t})=>t.enclosedParse(".cell.--mode-display",{display:p({base:"none",m:"table-cell"})})}

  .content {
    flex-direction: column;
    justify-content: center;
  }

  /* Table header cell - Primary variant */

  ${({theme:t})=>t.enclosedParse(".cell.--variant-primary .content",{...t.typography.textS.properties,fontWeight:500})}

  .cell.--variant-primary .content {
    min-height: ${v(42)};
    margin-bottom: 20px;
    padding-bottom: ${({theme:t})=>t.spacings.s12};
    padding-right: ${({theme:t})=>t.spacings.rBodyM};
    color: ${({theme:t})=>t.colors.foreground};
  }
  :host-context(adgm-table-header-cell:last-child)
    .cell.--variant-primary
    .content {
    padding-right: 0 !important;
  }

  .cell.--variant-primary .content::before {
    position: absolute;
    content: "";
    width: calc(100% - ${({theme:t})=>t.spacings.rBodyM});
    border-bottom: 1px solid ${({theme:t})=>t.colors.foreground};
    bottom: 20px;
    left: 0;
  }
  :host-context(adgm-table-header-cell:last-child)
    .cell.--variant-primary
    .content::before {
    width: 100%;
  }

  /* Table header cell - Secondary / tertiary variant */

  .cell.--variant-secondary,
  .cell.--variant-tertiary,
  .cell.--variant-quaternary,
  .cell.--variant-quinary {
    background: ${({theme:t})=>t.colors.citynight180};
    padding: ${({theme:t})=>`${t.spacings.s12} ${t.spacings.s8}`};
  }

  ${({theme:t})=>t.enclosedParse(".cell.--variant-secondary .content, .cell.--variant-tertiary .content, .cell.--variant-quaternary .content, .cell.--variant-quinary .content",{...t.typography.textXS.properties,fontWeight:600,color:t.colors.white})}
`;var yg=Object.defineProperty,bg=Object.getOwnPropertyDescriptor,Xe=(t,e,a,i)=>{for(var n=i>1?void 0:i?bg(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&yg(e,a,n),n};s.TableHeaderCell=class extends L{constructor(){super(...arguments),this.variant="primary",this.mode="default"}render(){return d`
      <div
        class=${A({cell:!0,[`--variant-${this.variant}`]:!0,[`--mode-${this.mode}`]:!0})}
        style=${[y(this.width,()=>`--cell-width: ${this.width};`),y(this.minWidth,()=>`--cell-min-width: ${this.minWidth};`),y(this.maxWidth,()=>`--cell-max-width: ${this.maxWidth};`)].filter(e=>e).join("")}
      >
        <div class="content">
          <slot></slot>
        </div>
      </div>
    `}getText(){return bi(this.textContent??"")}},s.TableHeaderCell.styles=[fg],Xe([l({type:String,attribute:"min-width"})],s.TableHeaderCell.prototype,"minWidth",2),Xe([l({type:String,attribute:"max-width"})],s.TableHeaderCell.prototype,"maxWidth",2),Xe([l({type:String})],s.TableHeaderCell.prototype,"width",2),Xe([O({context:oa}),l({attribute:!1})],s.TableHeaderCell.prototype,"variant",2),Xe([O({context:sa}),l({type:String})],s.TableHeaderCell.prototype,"mode",2),s.TableHeaderCell=Xe([b("adgm-table-header-cell")],s.TableHeaderCell);const $g=g`
  :host {
    display: block;
    position: relative;
  }

  ::slotted(adgm-calendar-event-detail) {
    margin-bottom: ${v(8)};
  }

  ::slotted(adgm-calendar-event-detail:last-child) {
    margin-bottom: 0;
  }
`;var wg=Object.defineProperty,Cg=Object.getOwnPropertyDescriptor,kn=(t,e,a,i)=>{for(var n=i>1?void 0:i?Cg(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&wg(e,a,n),n};s.CalendarEventCard=class extends E{constructor(){super(...arguments),this.buttonText="View live hearing"}render(){return d`
      ${this.renderDebug("adgm-calendar-event-card")}
      <adgm-text variant="textXL" weight="600" _dd>${this.date}</adgm-text>
      <adgm-spacer height="s8" _dd></adgm-spacer>
      <adgm-text variant="textXS" weight="400" color="black60" _dd>
        ${this.dayTime}
      </adgm-text>
      <adgm-spacer height="s20" _dd></adgm-spacer>
      <adgm-flex gap="s4" _dd>
        <slot></slot>
      </adgm-flex>
      ${this.buttonText&&this.href?d`
            <adgm-spacer height="s20" _dd></adgm-spacer>
            <adgm-link-button
              icon="arrowM"
              anim
              variant="secondary"
              size="s"
              target="_blank"
              href=${this.href}
              _dd
            >
              ${this.buttonText}
            </adgm-link-button>
          `:""}
    `}},s.CalendarEventCard.styles=[_,$g],kn([l({type:String})],s.CalendarEventCard.prototype,"date",2),kn([l({type:String,attribute:"day-time"})],s.CalendarEventCard.prototype,"dayTime",2),kn([l({type:String})],s.CalendarEventCard.prototype,"href",2),kn([l({type:String,attribute:"button-text"})],s.CalendarEventCard.prototype,"buttonText",2),s.CalendarEventCard=kn([b("adgm-calendar-event-card")],s.CalendarEventCard);const Sg=g`
  :host {
    display: flex;
    flex-wrap: wrap;
  }

  .title {
    flex: 0 0 ${v(100)};
    margin-right: ${v(20)};
  }

  .content {
    flex: 1;
  }

  .container {
    display: flex;
  }
`;var xg=Object.defineProperty,Pg=Object.getOwnPropertyDescriptor,kg=(t,e,a,i)=>{for(var n=i>1?void 0:i?Pg(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&xg(e,a,n),n};s.CalendarEventRow=class extends L{render(){return d`
      <div class="container">
        <adgm-text variant="textS" weight="600" class="title" _dd>
          ${this.title}
        </adgm-text>
        <adgm-text variant="textS" weight="400" class="content" _dd>
          <slot></slot>
        </adgm-text>
      </div>
    `}},s.CalendarEventRow.styles=[_,Sg],s.CalendarEventRow=kg([b("adgm-calendar-event-card-row")],s.CalendarEventRow);const _g=g`
  :host {
    display: block;
    position: relative;
  }

  a,
  .content {
    text-decoration: none;
    color: ${({theme:t})=>t.colors.foreground};
  }

  /* a.--section-variant-secondary,
  a.--section-variant-tertiary {
    color: ${({theme:t})=>t.colors.black100};
  } */

  adgm-icon,
  ::slotted(adgm-icon) {
    height: ${({theme:t})=>t.spacings.s64};
    width: ${({theme:t})=>t.spacings.s64};
  }

  .icon-wrapper {
    display: contents;
  }

  :host([filled]) .icon-wrapper {
    display: inline-flex;
    background-color: ${({theme:t})=>t.colors.white};
    border-radius: 50%;
    height: ${({theme:t})=>t.spacings.s80};
    width: ${({theme:t})=>t.spacings.s80};
    align-items: center;
    justify-content: center;
  }

  :host([centered]) .title {
    text-align: center;
  }

  :host([centered]) .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
  }

  :host([centered]) .body {
    text-align: center;
  }

  :host([centered]) .wrapper {
    align-self: center;
  }

  ${({theme:t})=>t.enclosedParse(":host([centered]) .wrapper",{width:p({base:"100%",m:"80%"})})}

  /* .--section-variant-secondary:not(.--href) .title,
  .--section-variant-tertiary:not(.--href) .title {
    color: ${({theme:t})=>t.colors.black100};
  } */

  /**
   * Primary
   */

  adgm-icon,
  ::slotted(adgm-icon) {
    color: ${({theme:t})=>t.colors.black60};
    --icon-fill: ${({theme:t})=>t.colors.black60};
  }

  /**
   * Secondary
   */

  .--variant-secondary adgm-icon,
  .--variant-secondary ::slotted(adgm-icon) {
    color: ${({theme:t})=>t.colors.black60};
    --icon-fill: ${({theme:t})=>t.colors.black60};
  }
`;var Og=Object.defineProperty,Lg=Object.getOwnPropertyDescriptor,Ht=(t,e,a,i)=>{for(var n=i>1?void 0:i?Lg(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&Og(e,a,n),n};s.IconCard=class extends E{constructor(){super(...arguments),this.hasParentHover=!1,this.parentSectionVariant="primary",this.buttonText="Read more",this.variant="primary",this.filled=!1,this.centered=!1,this.clamp=!1,this.hasCustomIcon=!1}connectedCallback(){var e;super.connectedCallback(),(e=this.contentAlignment)==null||e.registerElement(this),Nt(this,["adgm-icon"],{onFirstLoad:()=>this.initialize(),onFullLoad:()=>this.initialize()})}initialize(){this.hasCustomIcon=!!this.querySelector("[slot=icon]")}disconnectedCallback(){var e;(e=this.contentAlignment)==null||e.deregisterElement(this),super.disconnectedCallback()}render(){let e=this.variant;e=this.href?"primary":"secondary";const a=A({container:!0,[`--variant-${e}`]:!0,[`--section-variant-${this.parentSectionVariant}`]:!0,"--href":!!this.href});return d`
      ${this.renderDebug("adgm-icon-card",{description:this.icon})}
      ${y(this.href,()=>d`
          <a
            href=${Y(this.href)}
            target=${Y(this.target)}
            class=${a}
            @mouseenter=${this.onEnter}
            @mouseleave=${this.onLeave}
            title=""
          >
            <div class="content">
              ${this.renderContent()}
              <adgm-spacer height="rBodyM" _dd></adgm-spacer>
              <slot name="button">
                <adgm-link-button
                  icon="arrowM"
                  variant="secondary"
                  size="s"
                  anim
                  href=${Y(this.href)}
                  _dd
                >
                  ${this.buttonText}
                </adgm-link-button>
              </slot>
            </div>
          </a>
        `,()=>d` <div class=${a} title="">${this.renderContent()}</div> `)}
    `}renderContent(){return d`
      <div class="wrapper">
        ${y(this.icon||this.hasCustomIcon,()=>d`
            <div class="icon-wrapper">
              ${y(this.icon,()=>d`<adgm-icon icon=${this.icon} _dd></adgm-icon>`)}
              ${y(this.hasCustomIcon,()=>d`<slot name="icon"></slot>`)}
            </div>
            <adgm-spacer height="s32" _dd></adgm-spacer>
          `)}
        ${y(this.title,()=>d`
            <adgm-text
              class="title"
              variant=${this.variant==="tertiary"?"display2XS":"textXL"}
              weight=${this.variant==="tertiary"?"300":"400"}
              color=${this.variant==="primary"&&this.href?"clearsky100":P}
              _dd
            >
              <h3>${this.title}</h3>
            </adgm-text>
            <adgm-spacer height="rBodyS" _dd></adgm-spacer>
          `)}
        ${this.clamp?d`
              <adgm-text
                class="body"
                weight="400"
                variant="textS"
                clamp="4"
                _dd
              >
                <slot></slot>
              </adgm-text>
            `:d`
              <adgm-text class="body" weight="400" variant="textS" _dd>
                <slot></slot>
              </adgm-text>
            `}
      </div>
    `}onEnter(){this.hasParentHover=!0}onLeave(){this.hasParentHover=!1}},s.IconCard.styles=[_,_g],Ht([vt({context:ze}),l({attribute:!1})],s.IconCard.prototype,"hasParentHover",2),Ht([O({context:Zn}),l({attribute:!1})],s.IconCard.prototype,"contentAlignment",2),Ht([O({context:Ue}),l({attribute:!1})],s.IconCard.prototype,"parentSectionVariant",2),Ht([l({type:String})],s.IconCard.prototype,"href",2),Ht([l({type:String})],s.IconCard.prototype,"target",2),Ht([l({type:String})],s.IconCard.prototype,"icon",2),Ht([l({type:String,attribute:"button-text"})],s.IconCard.prototype,"buttonText",2),Ht([l({type:String})],s.IconCard.prototype,"variant",2),Ht([l({type:Boolean})],s.IconCard.prototype,"filled",2),Ht([l({type:Boolean})],s.IconCard.prototype,"centered",2),Ht([l({type:Boolean})],s.IconCard.prototype,"clamp",2),Ht([w()],s.IconCard.prototype,"hasCustomIcon",2),s.IconCard=Ht([b("adgm-icon-card")],s.IconCard);const Eg=g`
  :host {
    display: block;
    transition: margin 0.4s ease;
    position: relative;
  }

  :host(.--carousel-selected) ::slotted(adgm-image) {
    transform: scale(var(--image-scale));
  }

  .container {
    display: flex;
    text-decoration: none;
    gap: ${({theme:t})=>t.spacings.rGridGap};
    color: ${({theme:t})=>t.colors.foreground};
  }

  .--section-variant-secondary.container,
  .--section-variant-tertiary.container {
    color: ${({theme:t})=>t.colors.black80};
  }

  .image {
    flex-shrink: 0;
    flex-grow: 0;
  }

  ::slotted(adgm-image) {
    width: 100%;
    height: auto;
    aspect-ratio: 16 / 9;
    transform-origin: bottom left;
    transition: transform 0.4s ease;
    background: ${({theme:t})=>t.colors.black20};
  }

  :host([square]) ::slotted(adgm-image) {
    aspect-ratio: 1 / 1;
  }

  .container.--variant-vertical {
    flex-direction: column;
    gap: ${({theme:t})=>t.spacings.s24};
  }

  :host([square]) .container.--variant-vertical {
    gap: ${({theme:t})=>t.spacings.s32};
  }

  ${({theme:t})=>t.enclosedParse(".container.--variant-horizontal",{flexDirection:p({base:"column",m:"row"})})}

  ${({theme:t})=>t.enclosedParse(".container.--variant-horizontal .image",{width:p({base:"100%",m:`calc(50% - (${t.spacings.rGridGap} / 2))`})})}
`;var Dg=Object.defineProperty,Mg=Object.getOwnPropertyDescriptor,ne=(t,e,a,i)=>{for(var n=i>1?void 0:i?Mg(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&Dg(e,a,n),n};s.ArticleCard=class extends E{constructor(){super(...arguments),this.hasParentHover=!1,this.parentSectionVariant="primary",this.variant="horizontal",this.buttonText="Read more",this.square=!1,this.hasImage=!1}connectedCallback(){var e;super.connectedCallback(),(e=this.contentAlignment)==null||e.registerElement(this),Nt(this,["adgm-image"],{onFirstLoad:()=>this.initialize(),onFullLoad:()=>this.initialize()})}disconnectedCallback(){var e;(e=this.contentAlignment)==null||e.deregisterElement(this),super.disconnectedCallback()}initialize(){this.hasImage=!!this.querySelector("adgm-image")}render(){const e=A({container:!0,[`--variant-${this.variant}`]:!0,[`--section-variant-${this.parentSectionVariant}`]:!0});return d`
      ${this.renderDebug("adgm-article-card",{description:this.variant})}
      ${y(this.href,()=>d`
          <a
            href=${this.href}
            target=${Y(this.target)}
            class=${e}
            @mouseenter=${this.onEnter}
            @mouseleave=${this.onLeave}
          >
            ${this.renderContent()}
          </a>
        `,()=>d` <div class=${e}>${this.renderContent()}</div> `)}
    `}renderContent(){return d`
      ${y(this.hasImage,()=>d`<div class="image"><slot name="image"></slot></div>`)}
      <div class="content">
        <slot></slot>
        <slot name="footer">
          ${y(this.buttonText&&this.href,()=>d`
              <adgm-spacer height="s24" _dd></adgm-spacer>
              <adgm-link-button
                icon="arrowM"
                anim
                variant="secondary"
                size="s"
                href=${Y(this.href)}
                _dd
              >
                ${this.buttonText}
              </adgm-link-button>
            `)}
        </slot>
      </div>
    `}onEnter(){this.hasParentHover=!0}onLeave(){this.hasParentHover=!1}},s.ArticleCard.styles=[_,Eg],ne([vt({context:ze}),l({attribute:!1})],s.ArticleCard.prototype,"hasParentHover",2),ne([O({context:Zn}),l({attribute:!1})],s.ArticleCard.prototype,"contentAlignment",2),ne([O({context:Ue}),l({attribute:!1})],s.ArticleCard.prototype,"parentSectionVariant",2),ne([l({type:String})],s.ArticleCard.prototype,"variant",2),ne([l({type:String})],s.ArticleCard.prototype,"href",2),ne([l({type:String})],s.ArticleCard.prototype,"target",2),ne([l({type:String,attribute:"button-text"})],s.ArticleCard.prototype,"buttonText",2),ne([l({type:Boolean})],s.ArticleCard.prototype,"square",2),ne([w()],s.ArticleCard.prototype,"hasImage",2),s.ArticleCard=ne([b("adgm-article-card")],s.ArticleCard);const Tg=g`
  :host {
    display: flex;
    justify-content: center;
    flex-direction: column;
    position: relative;
  }

  .title {
    color: ${({theme:t})=>t.colors.clearsky100};
    text-align: center;
  }

  .body {
    text-align: center;
    margin: auto;
  }

  ${({theme:t})=>t.enclosedParse(".body",{width:p({base:"100%",m:"75%"})})}
`;var Ag=Object.defineProperty,Ng=Object.getOwnPropertyDescriptor,Bg=(t,e,a,i)=>{for(var n=i>1?void 0:i?Ng(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&Ag(e,a,n),n};s.ScoreCard=class extends E{render(){return d`
      ${this.renderDebug("adgm-score-card")}
      <adgm-text class="title" variant="sectionTitle" _dd>
        ${this.title}
      </adgm-text>
      <adgm-spacer height="rBodyS" _dd></adgm-spacer>
      <adgm-text class="body" weight="400" variant="textS" _dd>
        <slot></slot>
      </adgm-text>
    `}},s.ScoreCard.styles=[_,Tg],s.ScoreCard=Bg([b("adgm-score-card")],s.ScoreCard);const Ig=g`
  :host {
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    position: relative;
  }

  ::slotted(*) {
    flex: 1;
    text-align: center;
  }

  ::slotted(*:first-child) {
    border-left: none;
  }

  ::slotted(*:last-child) {
    border-bottom: none;
  }

  ${({theme:t})=>t.enclosedParse(":host",{flexDirection:p({base:"column",m:"row"})})}

  ${({theme:t})=>t.enclosedParse("::slotted(*)",{borderLeft:p({base:"none",m:`1px solid ${t.colors.black20}`}),borderBottom:p({base:`1px solid ${t.colors.black20}`,m:"none"}),padding:p({base:"40px 0px",m:"0px 15px"})})}
`;var Fg=Object.defineProperty,zg=Object.getOwnPropertyDescriptor,Hg=(t,e,a,i)=>{for(var n=i>1?void 0:i?zg(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&Fg(e,a,n),n};s.BorderedFlex=class extends E{render(){return d`
      ${this.renderDebug("adgm-bordered-flex")}
      <slot></slot>
    `}},s.BorderedFlex.styles=[_,Ig],s.BorderedFlex=Hg([b("adgm-bordered-flex")],s.BorderedFlex);const Rg=g`
  :host {
    display: flex;
    gap: ${({theme:t})=>t.spacings.rBody2M};
    flex-direction: column;
    position: relative;
  }

  .container {
    width: 100%;
    aspect-ratio: 1 / 1;
    background: ${({theme:t})=>t.colors.black20};
    position: relative;
    overflow: hidden;
  }

  ::slotted(*) {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: none;
    transform: translateX(100%);
    transition: transform 0.3s ease;
  }

  ::slotted(.--active) {
    display: block;
    z-index: 2;
  }
  ::slotted(.--animate-in) {
    transform: translateX(0);
  }
  ::slotted(.--inactive) {
    display: block;
    transform: translateX(0);
    z-index: 1;
  }

  .navigation {
    display: flex;
    gap: ${({theme:t})=>t.spacings.rGridGap};
    align-items: center;
    justify-content: end;
  }

  .navigation .index {
    user-select: none;
    display: flex;
  }

  .navigation .controls {
    display: flex;
    gap: ${({theme:t})=>t.spacings.s8};
  }
`;var Vg=Object.defineProperty,jg=Object.getOwnPropertyDescriptor,Qe=(t,e,a,i)=>{for(var n=i>1?void 0:i?jg(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&Vg(e,a,n),n};s.ImageCarousel=class extends E{constructor(){super(),this.isLocked=!1,this.isInitialized=!1,this.index=0,this.uuid=Ot()}connectedCallback(){super.connectedCallback(),Nt(this,["adgm-image"],{onFirstLoad:()=>this.initialize(),onFullLoad:()=>this.initialize()})}initialize(){this.items=this.querySelectorAll("adgm-image"),this.define()}render(){var e,a,i;return d`
      ${this.renderDebug("adgm-image-carousel")}
      <div class="container">
        <slot></slot>
      </div>
      <div class="navigation">
        <div class="index">
          <adgm-text variant="displayL" weight="300" _dd>
            ${en(this.index+1)}
          </adgm-text>
          <adgm-text variant="displayL" color="black40" weight="300" _dd>
            /${en(((e=this.items)==null?void 0:e.length)??0)}
          </adgm-text>
        </div>
        <div class="controls">
          <adgm-icon-button
            icon="arrowL"
            variant="tertiary"
            anim
            outlined
            mirror
            size=${(a=this.currentBreakpoint)!=null&&a.state.s?"m":"s"}
            @click=${this.toPrevious}
            _dd
          ></adgm-icon-button>
          <adgm-icon-button
            icon="arrowL"
            anim
            variant="tertiary"
            size=${(i=this.currentBreakpoint)!=null&&i.state.s?"m":"s"}
            outlined
            @click=${this.toNext}
            _dd
          ></adgm-icon-button>
        </div>
      </div>
    `}toPrevious(){this.isLocked||(this.index===0&&this.items?this.index=this.items.length-1:this.index--,this.define())}toNext(){this.isLocked||(this.items&&this.index===this.items.length-1?this.index=0:this.index++,this.define())}define(){if(!this.items||this.items.length===0){console.warn("No gallery items found");return}this.isLocked=!0,dt(()=>this.isLocked=!1,300,`imageCarouselLock${this.uuid}`),this.items.forEach((e,a)=>{a===this.index?(e.classList.add("--active"),this.isInitialized?T(()=>e.classList.add("--animate-in")):(this.isInitialized=!0,e.classList.add("--animate-in"))):e.classList.contains("--active")&&(e.classList.remove("--active"),e.classList.remove("--animate-in"),e.classList.add("--inactive"))}),dt(()=>{var e;(e=this.items)==null||e.forEach(a=>{a.classList.remove("--inactive")})},350,`imageCarouselCleanup${this.uuid}`)}},s.ImageCarousel.styles=Rg,Qe([O({context:bt,subscribe:!0}),l({attribute:!1})],s.ImageCarousel.prototype,"currentBreakpoint",2),Qe([w()],s.ImageCarousel.prototype,"isLocked",2),Qe([w()],s.ImageCarousel.prototype,"isInitialized",2),Qe([w()],s.ImageCarousel.prototype,"index",2),Qe([w()],s.ImageCarousel.prototype,"items",2),s.ImageCarousel=Qe([b("adgm-image-carousel")],s.ImageCarousel);const Ug=g`
  :host {
    display: contents;
  }

  .container {
    box-sizing: border-box;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: ${({theme:t})=>t.colors.black100.alpha(.75)};
    display: flex;
    justify-content: center;
    align-items: start;
    z-index: 1000;
    overflow-y: scroll;
    padding: ${({theme:t})=>t.spacings.rBodyL} 0;
  }

  .modal {
    box-sizing: border-box;
    position: relative;
    background: ${({theme:t})=>t.colors.white};
    width: calc(
      100% - ${({theme:t})=>t.spacings.rBodyM} -
        ${({theme:t})=>t.spacings.rBodyM}
    );
    max-width: 1320px;
    padding: ${({theme:t})=>t.spacings.rBodyL} 0;
  }

  .--size-s .modal {
    max-width: 778px;
  }

  .close {
    padding: 0;
    background: none;
    border: 0;
    margin: 0;
    position: absolute;
    top: ${({theme:t})=>t.spacings.rBodyS};
    right: ${({theme:t})=>t.spacings.rBodyS};
    cursor: pointer;
    border-radius: 50%;
    transition: ${({theme:t})=>`opacity ${t.defaults.transitionDuration} ${t.defaults.transitionEase}`};
  }
  .close:hover {
    opacity: 0.5;
  }

  .content-wrapper {
    display: flex;
    flex-direction: column;
    gap: ${({theme:t})=>t.spacings.rBodyS};
    overflow: hidden;
  }

  .title {
    padding: 0 ${({theme:t})=>t.spacings.rBodyL};
  }

  .content {
    padding: 0 ${({theme:t})=>t.spacings.rBodyL};
  }

  .footer {
    padding: 0 ${({theme:t})=>t.spacings.rBodyL};
    display: flex;
    flex-direction: row;
    justify-content: end;
  }
`;var Gg=Object.defineProperty,Wg=Object.getOwnPropertyDescriptor,_n=(t,e,a,i)=>{for(var n=i>1?void 0:i?Wg(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&Gg(e,a,n),n};s.Modal=class extends L{constructor(){super(...arguments),this.isOpen=!1,this.escClose=!1,this.size="l",this.onKeyPress=e=>{e.code==="Escape"&&this.close()},this.onCloseClick=()=>{this.close()}}disconnectedCallback(){this.removeEventListeners(),super.disconnectedCallback()}firstUpdated(){(this.isOpen||ki(this.deeplink))&&this.open()}render(){const e=this.querySelector("[slot=footer]");return d`
      ${y(this.isOpen,()=>d`
          <div
            class=${A({container:!0,[`--size-${this.size}`]:!0})}
          >
            <div class="modal">
              <div class="content-wrapper">
                ${y(this.title,()=>d`
                    <div class="title">
                      <adgm-text variant="display2XS" _dd>
                        <h2>${this.title}</h2>
                      </adgm-text>
                      <adgm-spacer height="s12" _dd></adgm-spacer>
                    </div>
                  `)}
                <div class="content">
                  <slot></slot>
                </div>
                ${y(e,()=>d`
                    <div class="footer">
                      <slot name="footer"></slot>
                    </div>
                  `)}
              </div>
              <button
                class="close"
                @click=${this.onCloseClick}
                aria-label="Close modal"
              >
                <adgm-icon
                  size="s32"
                  color="black100"
                  icon="close"
                  _dd
                ></adgm-icon>
              </button>
            </div>
          </div>
        `)}
    `}open(){this.isOpen=!0,this.escClose&&window.addEventListener("keydown",this.onKeyPress),this.deeplink&&Tn(this.deeplink),document.body.style.overflow="hidden"}close(){this.isOpen=!1,this.removeEventListeners(),document.body.style.overflow="",this.deeplink&&xi(this.deeplink)}removeEventListeners(){window.removeEventListener("keypress",this.onKeyPress)}},s.Modal.styles=[_,Ug],_n([l({type:Boolean,attribute:"open"})],s.Modal.prototype,"isOpen",2),_n([l({type:Boolean,attribute:"esc-close"})],s.Modal.prototype,"escClose",2),_n([l({type:String})],s.Modal.prototype,"size",2),_n([l({type:String})],s.Modal.prototype,"deeplink",2),s.Modal=_n([b("adgm-modal")],s.Modal);const qg=g`
  :host {
    display: block;
    width: 100%;
    aspect-ratio: 16 / 9;
    background: ${({theme:t})=>t.colors.black20};
    overflow: hidden;
    position: relative;
  }

  iframe {
    border: 0 !important;
    background: ${({theme:t})=>t.colors.black20};
    width: 100%;
    height: 100%;
  }
`;var Yg=Object.defineProperty,Kg=Object.getOwnPropertyDescriptor,la=(t,e,a,i)=>{for(var n=i>1?void 0:i?Kg(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&Yg(e,a,n),n};s.ExternalVideo=class extends E{constructor(){super(...arguments),this.platform="youtube",this.videoID=""}get src(){return this.iframeElement.src}set src(e){this.iframeElement.src=e}render(){if(!this.videoID)return console.error("Missing video-id attribute"),d``;let e="";switch(this.platform){case"youtube":e=`https://www.youtube.com/embed/${this.videoID}`;break;case"vimeo":e=`https://player.vimeo.com/video/${this.videoID}?color=a29061&title=0&byline=0&portrait=0`;break;default:return console.error(`No video platform ${this.platform}`),d``}return d`
      ${this.renderDebug("adgm-external-video")}
      <iframe
        src=${Y(e)}
        allowfullscreen
        frameborder="0"
        allow="fullscreen; picture-in-picture"
      ></iframe>
    `}},s.ExternalVideo.styles=[_,qg],la([l({type:String})],s.ExternalVideo.prototype,"platform",2),la([l({type:String,attribute:"video-id"})],s.ExternalVideo.prototype,"videoID",2),la([q("iframe")],s.ExternalVideo.prototype,"iframeElement",2),s.ExternalVideo=la([b("adgm-external-video")],s.ExternalVideo);const Zg=g`
  :host {
    display: block;
    width: 100%;
    aspect-ratio: 16 / 9;
    background: ${({theme:t})=>t.colors.black20};
    overflow: hidden;
    position: relative;
  }

  video {
    background: ${({theme:t})=>t.colors.black20};
    width: 100%;
    height: 100%;
  }
`;var Xg=Object.defineProperty,Qg=Object.getOwnPropertyDescriptor,On=(t,e,a,i)=>{for(var n=i>1?void 0:i?Qg(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&Xg(e,a,n),n};s.Video=class extends E{constructor(){super(...arguments),this.type="video/mp4",this.src="",this.poster=""}render(){return d`
      ${this.renderDebug("adgm-video")}
      <video controls poster=${Y(this.poster)} allowfullscreen>
        <source src=${this.src} type=${this.type} />
        Your browser does not support the video tag.
      </video>
    `}},s.Video.styles=[_,Zg],On([l({type:String})],s.Video.prototype,"type",2),On([l({type:String})],s.Video.prototype,"src",2),On([l({type:String})],s.Video.prototype,"poster",2),On([q("video")],s.Video.prototype,"element",2),s.Video=On([b("adgm-video")],s.Video);var Jg=Object.defineProperty,t2=Object.getOwnPropertyDescriptor,Je=(t,e,a,i)=>{for(var n=i>1?void 0:i?t2(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&Jg(e,a,n),n};s.Debug=class extends L{constructor(){super(...arguments),this.component="",this.color="#BBB",this.striped=!1,this.alwaysShow=!1}render(){const e=yi(this.component.replace("adgm-",""));return Ja`
      <div
        class=${A({container:!0,"--striped":!!this.striped,"--always-show":!!this.alwaysShow})}
        style="--debug-color: ${this.color};"
      >
        <div class="label">
          ${e}
          ${y(this.description,()=>Ja`<span>${this.description}</span>`)}
        </div>
      </div>
    `}},s.Debug.styles=[Ri`
      :host {
        display: contents;
      }

      .container {
        border-radius: 2px;
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        z-index: 100;
      }

      .container.--always-show {
        pointer-events: none;
      }

      .container.--striped:hover::before,
      .container.--striped.--always-show::before {
        border-radius: 2px;
        box-shadow: var(--debug-color) 0 0 0 1px inset;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        height: 100%;
        width: 100%;
        opacity: 0.65;
        content: "";
        pointer-events: none;
        background-image: linear-gradient(
          45deg,
          var(--debug-color) 12.5%,
          transparent 12.5%,
          transparent 50%,
          var(--debug-color) 50%,
          var(--debug-color) 62.5%,
          transparent 62.5%,
          transparent 100%
        );
        background-size: 5.66px 5.66px;
      }

      .container:hover,
      .container.--always-show {
        box-shadow: var(--debug-color) 0 0 0 1px inset !important;
      }

      .label {
        display: none;
        position: absolute;
        padding: 3px 5px;
        background-color: var(--debug-color);
        top: 0;
        right: 0;
        color: black !important;
        font-size: 11px !important;
        font-weight: 600 !important;
        line-height: 11px !important;
        letter-spacing: 0 !important;
        pointer-events: none;
        user-select: none;
        font-style: normal;
        white-space: nowrap;
      }

      .label.--top {
        transform: translateY(-100%);
      }

      .container:hover .label,
      .container.--always-show .label {
        display: block !important;
      }

      .label span {
        opacity: 0.65;
        font-weight: 500 !important;
      }
    `,_],Je([l({type:String})],s.Debug.prototype,"component",2),Je([l({type:String})],s.Debug.prototype,"description",2),Je([l({type:String})],s.Debug.prototype,"color",2),Je([l({type:Boolean})],s.Debug.prototype,"striped",2),Je([l({type:Boolean,attribute:"always-show"})],s.Debug.prototype,"alwaysShow",2),s.Debug=Je([b("adgm-debug")],s.Debug);var e2=Object.defineProperty,n2=Object.getOwnPropertyDescriptor,a2=(t,e,a,i)=>{for(var n=i>1?void 0:i?n2(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&e2(e,a,n),n};s.NativeForm=class extends L{render(){return d`<slot></slot>`}},s.NativeForm.styles=[_,nl],s.NativeForm=a2([b("adgm-native-form")],s.NativeForm);const i2=g`
  :host {
    display: contents;
  }

  adgm-icon-button {
    position: fixed;
    right: ${({theme:t})=>t.spacings.rBodyM};
    bottom: ${({theme:t})=>t.spacings.rBodyM};
    z-index: 990;
    box-shadow: 0 0 12px rgba(47, 50, 57, 0.15);
    border-radius: 50%;
  }
`;var r2=Object.defineProperty,o2=Object.getOwnPropertyDescriptor,ca=(t,e,a,i)=>{for(var n=i>1?void 0:i?o2(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&r2(e,a,n),n};s.BackToTop=class extends L{constructor(){super(...arguments),this.isVisible=!1,this.icon="chevronUpL",this.onWindowScroll=()=>{this.isVisible=window.scrollY>window.innerHeight/2},this.onClick=()=>{window.scrollTo({top:0,behavior:"smooth"})}}render(){return y(this.isVisible,()=>{var e;return d`
        <adgm-icon-button
          size=${(e=this.currentBreakpoint)!=null&&e.state.m?"m":"s"}
          icon=${this.icon}
          variant="primary"
          @click=${this.onClick}
        ></adgm-icon-button>
      `})}connectedCallback(){super.connectedCallback(),window.addEventListener("scroll",this.onWindowScroll)}disconnectedCallback(){window.removeEventListener("scroll",this.onWindowScroll),super.disconnectedCallback()}},s.BackToTop.styles=[i2],ca([w()],s.BackToTop.prototype,"isVisible",2),ca([l({type:String})],s.BackToTop.prototype,"icon",2),ca([O({context:bt,subscribe:!0}),l({attribute:!1})],s.BackToTop.prototype,"currentBreakpoint",2),s.BackToTop=ca([b("adgm-back-to-top")],s.BackToTop);const s2=g`
  :host {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100dvh;
    background: ${({theme:t})=>t.colors.black100.alpha(.75)};
    display: flex;
    justify-content: center;
    align-items: flex-end;
    z-index: 1000;
  }

  .container {
    width: 100%;
    padding: ${({theme:t})=>`${t.spacings.rBodyS} 0`};
    background: ${({theme:t})=>t.colors.background};
  }
`;var l2=Object.defineProperty,c2=Object.getOwnPropertyDescriptor,d2=(t,e,a,i)=>{for(var n=i>1?void 0:i?c2(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&l2(e,a,n),n};s.CookiePolicy=class extends L{render(){return d`
      <div class="container">
        <adgm-container>
          <slot></slot>
        </adgm-container>
      </div>
    `}},s.CookiePolicy.styles=[_,s2],s.CookiePolicy=d2([b("adgm-cookie-notification")],s.CookiePolicy);const h2=g`
  :host {
    display: block;
    line-height: 0;
    pointer-events: none;
  }

  .mechanic.--variant-primary {
    opacity: 0.8;
  }
  .mechanic.--variant-primary path {
    fill: ${({theme:t})=>t.colors.white};
  }

  .mechanic.--variant-secondary path {
    fill: ${({theme:t})=>t.colors.coolglass100};
  }
`;var u2=Object.defineProperty,p2=Object.getOwnPropertyDescriptor,da=(t,e,a,i)=>{for(var n=i>1?void 0:i?p2(e,a):e,r=t.length-1,o;r>=0;r--)(o=t[r])&&(n=(i?o(e,a,n):o(n))||n);return i&&n&&u2(e,a,n),n};s.Mechanic=class extends L{constructor(){super(...arguments),this.variant="primary",this.type="primary"}render(){const e=A({mechanic:!0,[`--variant-${this.variant}`]:!0});return d`
      <adgm-visibility show=${this.show||P}>
        ${y(this.type==="primary",()=>d`
            <svg
              class=${e}
              viewBox="0 0 570 404"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M474.324 40.207C420.827 -13.4365 333.726 -13.4365 280.229 40.207L278.334 42.1067L459.566 223.835L278.334 405.562L280.229 407.462C306.155 433.459 340.606 447.757 377.301 447.757C413.947 447.757 448.448 433.459 474.374 407.462L657.501 223.835L474.324 40.207Z"
              />
              <path
                d="M196.585 40.0759C142.882 -13.3928 55.4458 -13.3928 1.74294 40.0759L-0.208984 41.9695L181.72 223.105L-0.208984 404.241L1.69289 406.135C27.7185 432.047 62.3026 446.299 99.1389 446.299C135.975 446.299 170.559 432.047 196.585 406.135L380.416 223.105L196.585 40.0759Z"
              />
            </svg>
          `,()=>d`
            <svg
              class=${e}
              viewBox="0 0 238 250"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M89.0706 184.3L46.0661 226.804C39.9429 232.856 31.8974 236.163 23.2822 236.163C14.6671 236.163 6.55036 232.856 0.498397 226.804L0.0711995 226.382L42.6485 184.3L0 142.219L0.427197 141.796C13.0295 129.341 33.4638 129.341 45.9949 141.796L88.9994 184.3H89.0706ZM159.914 31.8778L159.914 368.671H160.555C178.355 368.671 192.808 354.386 192.808 336.793L192.808 0L192.167 0C174.368 0 159.914 14.2852 159.914 31.8778ZM56.8884 51.089L56.3188 51.3001L110.715 184.3L56.3188 317.3L56.8884 317.512C60.8044 319.06 64.934 319.834 68.9211 319.834C81.6658 319.834 93.7698 312.304 98.8249 299.919L146.101 184.3L98.8249 68.6816C92.1322 52.426 73.3355 44.4741 56.8884 51.089ZM352.651 142.219L352.224 141.796C339.622 129.341 319.187 129.341 306.656 141.796L263.652 184.3L306.656 226.804C312.922 232.997 321.181 236.093 329.44 236.093C337.699 236.093 345.958 232.997 352.224 226.804L352.651 226.382L310.074 184.3L352.651 142.219ZM296.332 51.3001L295.763 51.089C279.245 44.4741 260.448 52.426 253.826 68.6816L206.55 184.3L253.826 299.919C257.03 307.8 263.225 313.993 271.128 317.3C275.186 318.989 279.458 319.834 283.73 319.834C288.002 319.834 291.918 319.06 295.834 317.512L296.404 317.3L242.007 184.3L296.404 51.3001H296.332Z"
              />
            </svg>
          `)}
      </adgm-visibility>
    `}},s.Mechanic.styles=h2,da([l({type:String})],s.Mechanic.prototype,"variant",2),da([l({type:String})],s.Mechanic.prototype,"type",2),da([l({type:String})],s.Mechanic.prototype,"show",2),s.Mechanic=da([b("adgm-mechanic")],s.Mechanic),s.DEFAULT_OVERVIEW_CONFIG=Vr,s.FlexAlignOptions=sr,s.FlexJustifyOptions=or,s.theme=qt,Object.defineProperty(s,Symbol.toStringTag,{value:"Module"})});
