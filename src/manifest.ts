import { isStudioDocument, type StudioDocument } from "./android/schema";

export const DUI_FORMAT = "com.droidui.manifest";
export const DUI_VERSION = 1;
export type AnimationKind = "none" | "fade" | "pulse" | "slide" | "spin";
export interface SplashSettings { enabled:boolean; title:string; subtitle:string; backgroundColor:string; textColor:string; durationMs:number; animation:AnimationKind }
export interface DroidUIManifest {
  format:typeof DUI_FORMAT;
  version:typeof DUI_VERSION;
  project:StudioDocument;
  splash:SplashSettings;
}
export const defaultSplash:SplashSettings = {enabled:true,title:"My Android App",subtitle:"Powered by DroidUI",backgroundColor:"#101827",textColor:"#ffffff",durationMs:2500,animation:"fade"};
const hex=(s:unknown)=>typeof s==="string"&&/^#[a-fA-F0-9]{6}$/.test(s);
const animations:AnimationKind[]=["none","fade","pulse","slide","spin"];
export function validSplash(value:unknown):value is SplashSettings {
 if(!value||typeof value!=="object")return false;
 const v=value as Record<string,unknown>;
 return typeof v.enabled==="boolean"&&typeof v.title==="string"&&typeof v.subtitle==="string"&&hex(v.backgroundColor)&&hex(v.textColor)&&
 typeof v.durationMs==="number"&&Number.isInteger(v.durationMs)&&v.durationMs>=500&&v.durationMs<=10000&&animations.includes(v.animation as AnimationKind);
}
export function encodeManifest(project:StudioDocument,splash:SplashSettings):string {
 if(!isStudioDocument(project)||!validSplash(splash))throw Error("Invalid DroidUI project or splash configuration");
 return JSON.stringify({format:DUI_FORMAT,version:DUI_VERSION,project,splash} satisfies DroidUIManifest,null,2);
}
export function decodeManifest(input:unknown):{project:StudioDocument;splash:SplashSettings;legacy:boolean}{
 if(input&&typeof input==="object"){
  const data=input as Record<string,unknown>;
  if(data.format===DUI_FORMAT){
   if(data.version!==DUI_VERSION)throw Error("Unsupported .dui manifest version");
   if(!isStudioDocument(data.project)||!validSplash(data.splash))throw Error("Invalid .dui manifest");
   return {project:data.project,splash:data.splash,legacy:false};
  }
 }
 // Read existing desktop prototype documents; never confuse these with Android mobile schema.
 if(isStudioDocument(input))return {project:input,splash:{...defaultSplash},legacy:true};
 throw Error("Unsupported DroidUI format. Android mobile v29/v30 import needs a dedicated adapter.");
}
