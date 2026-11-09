import type { StudioDocument, StudioNode } from "./android/schema";
export interface AuditDevice {name:string;width:number;height:number}
export interface AuditFinding {id:string;nodeId:string;severity:"warning"|"info";message:string;device:string}
const controls=new Set(["Button","TextField","Switch","Checkbox"]);
function dimensions(n:StudioNode){return {w:n.width??(n.type==="Text"?Math.max(80,n.label.length*8):n.type==="Switch"?52:n.type==="Checkbox"?48:160),h:n.height??(n.type==="Text"?Math.max(24,n.fontSizeSp??16):48)}}
export function auditDesign(doc:StudioDocument,devices:readonly AuditDevice[]):AuditFinding[]{
 const results:AuditFinding[]=[];
 const add=(node:StudioNode,severity:AuditFinding["severity"],message:string,device:string)=>results.push({id:`${node.id}:${device}:${message}`,nodeId:node.id,severity,message,device});
 for(const node of doc.nodes){
  const {w,h}=dimensions(node);
  if(controls.has(node.type)&&(w<48||h<48))add(node,"warning",`Touch target is ${Math.round(w)} × ${Math.round(h)} dp; aim for at least 48 × 48 dp`,"Accessibility");
  if(controls.has(node.type)&&!node.accessibilityLabel?.trim())add(node,"info","Check screen-reader label and semantics in the exported application","Accessibility");
  if(node.type==="Text"&&(node.fontSizeSp??16)<12)add(node,"warning","Text smaller than 12sp may be difficult to read","Accessibility");
  for(const device of devices){
   if(node.x<0||node.y<0||node.x+w>device.width||node.y+h>device.height)
    add(node,"warning",`Element extends outside ${device.width} × ${device.height} dp viewport`,device.name);
  }
 }
 return results;
}
