(()=>{"use strict";const e=window.React,{__}=wp.i18n,{addFilter:t}=wp.hooks,{Fragment:o}=wp.element,{createHigherOrderComponent:r}=wp.compose,{InspectorControls:n}=wp.blockEditor,{TextControl:s,PanelBody:a}=wp.components,{select:c}=wp.data,l=["woocommerce/handpicked-products"];t("blocks.registerBlockType","apppresser/custom-attributes",(function(e){return void 0!==e.attributes&&l.includes(e.name)&&(console.log(e),e.attributes=Object.assign(e.attributes,{author:{type:"string",default:""}})),e})),t("editor.BlockEdit","apppresser/custom-advanced-control",r((t=>r=>{if(!l.includes(r.name))return(0,e.createElement)(t,{...r});const{name:c,attributes:i,setAttributes:u,isSelected:p}=r,{author:d}=i;return(0,e.createElement)(o,null,(0,e.createElement)(t,{...r}),p&&l.includes(c)&&(0,e.createElement)(n,null,(0,e.createElement)(a,{title:__("Vendor Settings","apppresser-blocks")},(0,e.createElement)(s,{label:"Author",value:i.author||"",onChange:e=>(e=>{u({author:e}),console.log(r)})(e)}))))}),"withAdvancedControls"))})();