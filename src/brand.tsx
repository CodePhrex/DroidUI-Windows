import React from "react";
export function DroidMark({size=38}:{size?:number}){
 return <svg width={size} height={size} viewBox="0 0 64 64" role="img" aria-label="DroidUI symbol">
 <defs><linearGradient id="dui-brand-gradient" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#e16aff"/><stop offset=".52" stopColor="#8b4dff"/><stop offset="1" stopColor="#00c9ff"/></linearGradient></defs>
 <path d="M9 5h22c19 0 29 11 29 27S50 59 31 59H9V5Zm16 13v28h6c10 0 15-5 15-14s-5-14-15-14h-6Z" fill="url(#dui-brand-gradient)"/>
 <path d="M27 39c0-6 5-10 11-10s11 4 11 10v7H27z" fill="#07172b"/><path d="m31 27-3-5m17 5 3-5" stroke="#07172b" strokeWidth="2" strokeLinecap="round"/><circle cx="34" cy="36" r="1.4" fill="#7bdcff"/><circle cx="42" cy="36" r="1.4" fill="#7bdcff"/>
 </svg>;
}
export const brand={name:"DroidUI",edition:"Professional Studio",tagline:"Design · Build · Animate · Test · Export",colors:{midnight:"#0b1020",surface:"#161b30",violet:"#a24dff",cyan:"#17c9ff",text:"#eef1ff"}} as const;
