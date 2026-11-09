import type { StudioDocument, StudioNode } from "./android/schema";
type Template = {id:string;name:string;description:string;nodes:Omit<StudioNode,"id">[]};
const text=(label:string,x:number,y:number,fontSizeSp=16):Omit<StudioNode,"id">=>({type:"Text",label,x,y,fontSizeSp,textColor:"#20283c"});
const button=(label:string,x:number,y:number,width=310):Omit<StudioNode,"id">=>({type:"Button",label,x,y,width,height:52,cornerRadius:24,backgroundColor:"#4169e1",textColor:"#ffffff"});
const field=(label:string,x:number,y:number):Omit<StudioNode,"id">=>({type:"TextField",label,x,y,width:310,height:56,cornerRadius:10,accessibilityLabel:label});
export const templates:Template[]=[
 {id:"welcome",name:"Welcome / Onboarding",description:"App introduction with a primary call to action",nodes:[text("Welcome to your app",32,124,26),text("Everything you need, all in one place.",32,178,15),{type:"Rectangle",label:"Hero artwork placeholder",x:32,y:246,width:310,height:235,backgroundColor:"#dce7ff",cornerRadius:24},button("Get started",32,580),text("Already have an account? Sign in",52,654,14)]},
 {id:"login",name:"Sign in",description:"Accessible login screen with form fields",nodes:[text("Welcome back",32,104,28),text("Sign in to continue",32,158,15),field("Email address",32,244),field("Password",32,326),button("Sign in",32,432),text("Forgot password?",116,515,14),text("New here? Create an account",72,694,14)]},
 {id:"profile",name:"Profile",description:"Avatar placeholder, personal details and settings",nodes:[text("My profile",24,64,26),{type:"Rectangle",label:"Avatar",x:142,y:140,width:96,height:96,cornerRadius:48,backgroundColor:"#a7c2ef"},text("Alex Morgan",112,256,22),text("@alexm",154,296,14),button("Edit profile",32,358),{type:"Card",label:"Account preferences",x:32,y:454,width:310,height:76}, {type:"Card",label:"Notifications",x:32,y:548,width:310,height:76}]},
 {id:"settings",name:"Settings",description:"Preferences with interactive toggles",nodes:[text("Settings",24,64,28),text("Appearance",24,144,18),{type:"Switch",label:"Dark mode",x:300,y:202,width:52,height:48,accessibilityLabel:"Dark mode"},text("Dark mode",24,210),text("Notifications",24,302,18),{type:"Switch",label:"Push notifications",x:300,y:362,width:52,height:48,accessibilityLabel:"Push notifications"},text("Push notifications",24,370),button("Save preferences",32,618)]},
 {id:"dashboard",name:"Dashboard",description:"Simple home dashboard and action cards",nodes:[text("Overview",24,62,28),text("Your workspace at a glance",24,108,14),{type:"Card",label:"Activity summary",x:24,y:180,width:338,height:128},{type:"Card",label:"Recent projects",x:24,y:330,width:338,height:128},{type:"Card",label:"Quick actions",x:24,y:480,width:338,height:128},button("Create new",32,692)]}
];
export function createTemplate(id:string):StudioDocument {
 const t=templates.find(x=>x.id===id);
 if(!t)throw Error("Unknown template");
 return {name:t.name,nodes:t.nodes.map((node,i)=>({...node,id:`${id}-${i}-${crypto.randomUUID()}`}))};
}
