export type ComponentType = "Text" | "Button" | "Card" | "Rectangle" | "Frame" | "TextField" | "Switch" | "Checkbox";
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
}
export interface StudioDocument { name: string; nodes: StudioNode[] }
export const STUDIO_SCHEMA_VERSION = 1;
export function isStudioDocument(value: unknown): value is StudioDocument {
  if (!value || typeof value !== "object") return false;
  const obj = value as Record<string, unknown>;
  if (typeof obj.name !== "string" || !Array.isArray(obj.nodes)) return false;
  const types: readonly string[] = ["Text","Button","Card","Rectangle","Frame","TextField","Switch","Checkbox"];
  const optionalNumber = (v:unknown) => v === undefined || (typeof v === "number" && Number.isFinite(v));
  return obj.nodes.every((n:unknown) => {
    if (!n || typeof n !== "object") return false;
    const node=n as Record<string,unknown>;
    return typeof node.id==="string" && types.includes(String(node.type)) && typeof node.label==="string" &&
      typeof node.x==="number" && Number.isFinite(node.x) && typeof node.y==="number" && Number.isFinite(node.y) &&
      optionalNumber(node.width) && optionalNumber(node.height) && optionalNumber(node.fontSizeSp) &&
      (node.accessibilityLabel===undefined || typeof node.accessibilityLabel==="string");
  });
}
