(()=>{"use strict";var e,r={356:()=>{const e=window.wp.blocks,r=window.React,t=window.wp.i18n,l=window.wp.blockEditor,o=window.wp.components,a=window.wp.element;function n(e){let r=e.r.toString(16),t=e.g.toString(16),l=e.b.toString(16);return 1==r.length&&(r="0"+r),1==t.length&&(t="0"+t),1==l.length&&(l="0"+l),"#"+r+t+l}const s=JSON.parse('{"UU":"apppresser/hero-slider"}');(0,e.registerBlockType)(s.UU,{edit:function({attributes:e,setAttributes:s}){(0,a.useEffect)((()=>{i()}),[]);const i=()=>{console.log("setting transition");const r=document.querySelectorAll(".hero-slider-image");if(0===r.length)return;const t=r.length,l=t*e.duration;r.forEach(((r,o)=>{const a=(t-o-1)*e.duration;r.style.animation=`imgFade ${l}s ease-in-out infinite ${a}s`}))};return(0,r.createElement)("div",{...(0,l.useBlockProps)()},(0,r.createElement)(l.InspectorControls,null,(0,r.createElement)(o.PanelBody,{title:(0,t.__)("Images","apppresser-blocks"),initialOpen:!0},(0,r.createElement)(l.MediaUploadCheck,null,(0,r.createElement)(l.MediaUpload,{onSelect:e=>{s({images:[...e].reverse()})},value:e.images.map((e=>e.id)),allowedTypes:["image"],multiple:!0,gallery:!0,render:({open:e})=>(0,r.createElement)(o.Button,{variant:"primary",onClick:e},"Select Images")}))),(0,r.createElement)(o.PanelBody,{title:(0,t.__)("Dimensions","apppresser-blocks")},(0,r.createElement)(o.RangeControl,{label:"Duration",value:e.duration,onChange:e=>{console.log("aaaaa",e),s({duration:e}),i()},min:1,max:30}),(0,r.createElement)(o.RangeControl,{label:"Height",value:e.height,onChange:e=>s({height:e}),min:100,max:1e3})),(0,r.createElement)(o.PanelBody,{title:(0,t.__)("Styles","apppresser-blocks")},(0,r.createElement)(o.RangeControl,{label:(0,t.__)("Overlay Opacity","apppresser-blocks"),value:e.opacity,onChange:e=>s({opacity:e}),min:0,max:1,step:.01}),(0,r.createElement)("label",null,(0,t.__)("Overlay Color","apppresser-blocks")),(0,r.createElement)(o.ColorPicker,{color:n(e.color),onChangeComplete:e=>{console.log(e),s({color:e.rgb})},disableAlpha:!0}))),(0,r.createElement)("div",{className:"hero-slider",style:{height:`${e.height}px`}},e.images.map((e=>(0,r.createElement)("div",{className:"hero-slider-image",key:e.id,style:{backgroundImage:`url(${e.url})`}})))),(0,r.createElement)("div",{className:"hero-slider-overlay",style:{backgroundColor:`rgba( ${e.color.r},${e.color.g},${e.color.b},${e.opacity})`}}),(0,r.createElement)("div",{className:"hero-slider-inner-blocks"},(0,r.createElement)(l.InnerBlocks,null)))},save:function({attributes:e}){const t=e.images||[];return(0,r.createElement)("div",{...l.useBlockProps.save(),"data-duration":e.duration},(0,r.createElement)("div",{className:"hero-slider",style:{height:`${e.height}px`}},t.map((e=>(0,r.createElement)("div",{className:"hero-slider-image",key:e.id,style:{backgroundImage:`url(${e.url})`}})))),(0,r.createElement)("div",{className:"hero-slider-overlay",style:{backgroundColor:`rgba( ${e.color.r},${e.color.g},${e.color.b},${e.opacity})`}}),(0,r.createElement)("div",{className:"hero-slider-inner-blocks"},(0,r.createElement)(l.InnerBlocks.Content,null)))}})}},t={};function l(e){var o=t[e];if(void 0!==o)return o.exports;var a=t[e]={exports:{}};return r[e](a,a.exports,l),a.exports}l.m=r,e=[],l.O=(r,t,o,a)=>{if(!t){var n=1/0;for(p=0;p<e.length;p++){for(var[t,o,a]=e[p],s=!0,i=0;i<t.length;i++)(!1&a||n>=a)&&Object.keys(l.O).every((e=>l.O[e](t[i])))?t.splice(i--,1):(s=!1,a<n&&(n=a));if(s){e.splice(p--,1);var c=o();void 0!==c&&(r=c)}}return r}a=a||0;for(var p=e.length;p>0&&e[p-1][2]>a;p--)e[p]=e[p-1];e[p]=[t,o,a]},l.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),(()=>{var e={42:0,382:0};l.O.j=r=>0===e[r];var r=(r,t)=>{var o,a,[n,s,i]=t,c=0;if(n.some((r=>0!==e[r]))){for(o in s)l.o(s,o)&&(l.m[o]=s[o]);if(i)var p=i(l)}for(r&&r(t);c<n.length;c++)a=n[c],l.o(e,a)&&e[a]&&e[a][0](),e[a]=0;return l.O(p)},t=globalThis.webpackChunkapppresser_blocks=globalThis.webpackChunkapppresser_blocks||[];t.forEach(r.bind(null,0)),t.push=r.bind(null,t.push.bind(t))})();var o=l.O(void 0,[382],(()=>l(356)));o=l.O(o)})();