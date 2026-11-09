export type ComponentType = "Text" | "Button" | "Card" | "Rectangle" | "Frame" | "TextField" | "Switch" | "Checkbox" | "Icon";
export interface StudioNode {
  id: string;
  type: ComponentType;
  label: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  fontSizeSp?: number;
  accessibilityLabel?: string;
  backgroundColor?: string;
  textColor?: string;
  cornerRadius?: number;
  opacity?: number;
  rotation?: number;
  iconName?: string;
  navigateTo?: string;
  visible?: boolean;
  locked?: boolean;
  animation?: "none" | "fade" | "pulse" | "slide" | "spin";
  animationDurationMs?: number;
}
export interface StudioDocument { name: string; nodes: StudioNode[] }
export const STUDIO_SCHEMA_VERSION = 1;
export function isStudioDocument(value: unknown): value is StudioDocument {
  if (!value || typeof value !== "object") return false;
  const obj = value as Record<string, unknown>;
  if (typeof obj.name !== "string" || !Array.isArray(obj.nodes)) return false;
  const types: readonly string[] = ["Text","Button","Card","Rectangle","Frame","TextField","Switch","Checkbox","Icon"];
  const optionalNumber = (v:unknown) => v === undefined || (typeof v === "number" && Number.isFinite(v));
  return obj.nodes.every((n:unknown) => {
    if (!n || typeof n !== "object") return false;
    const node=n as Record<string,unknown>;
    return typeof node.id==="string" && types.includes(String(node.type)) && typeof node.label==="string" &&
      typeof node.x==="number" && Number.isFinite(node.x) && typeof node.y==="number" && Number.isFinite(node.y) &&
      optionalNumber(node.width) && optionalNumber(node.height) && optionalNumber(node.fontSizeSp) &&
      (node.accessibilityLabel===undefined || typeof node.accessibilityLabel==="string") &&
      (node.backgroundColor===undefined || (typeof node.backgroundColor==="string" && /^#[0-9a-fA-F]{6}$/.test(node.backgroundColor))) &&
      (node.textColor===undefined || (typeof node.textColor==="string" && /^#[0-9a-fA-F]{6}$/.test(node.textColor))) &&
      (node.navigateTo===undefined || (typeof node.navigateTo==="string" && node.navigateTo.length<=80)) &&
      (node.iconName===undefined || (typeof node.iconName==="string" && /^[a-zA-Z0-9]+$/.test(node.iconName))) &&
      optionalNumber(node.cornerRadius) && optionalNumber(node.opacity) && optionalNumber(node.rotation) &&
      (node.animation===undefined || ["none","fade","pulse","slide","spin"].includes(String(node.animation))) &&
      (node.animationDurationMs===undefined || (typeof node.animationDurationMs==="number" && Number.isInteger(node.animationDurationMs) && node.animationDurationMs>=100 && node.animationDurationMs<=10000));
  });
}
