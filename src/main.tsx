import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { open, save } from "@tauri-apps/plugin-dialog";
import { readTextFile, writeTextFile } from "@tauri-apps/plugin-fs";
import "./style.css";

type Node = { id: string; type: "Text" | "Button" | "Card"; label: string; x: number; y: number };
type Document = { name: string; nodes: Node[] };
const initial: Document = { name: "Untitled Project", nodes: [{ id: "welcome", type: "Text", label: "Welcome to DroidUI", x: 64, y: 72 }] };
function App() {
  const [doc, setDoc] = useState<Document>(initial);
  const [selected, setSelected] = useState<string | null>("welcome");
  const [path, setPath] = useState<string | null>(null);
  const [message, setMessage] = useState("Ready");
  const node = doc.nodes.find(n => n.id === selected);
  function updateNode(id: string, patch: Partial<Node>) { setDoc(d => ({ ...d, nodes: d.nodes.map(n => n.id === id ? { ...n, ...patch } : n) })); }
  function add(type: Node["type"]) { const id = crypto.randomUUID(); setDoc(d => ({ ...d, nodes: [...d.nodes, { id, type, label: type === "Text" ? "Text label" : type, x: 48, y: 48 }] })); setSelected(id); }
  async function load() { try { const file = await open({ multiple: false, filters: [{ name: "DroidUI project", extensions: ["dui", "json"] }] }); if (typeof file !== "string") return; const raw = JSON.parse(await readTextFile(file)); if (!raw || typeof raw !== "object" || !Array.isArray(raw.nodes) || typeof raw.name !== "string") throw Error("Unsupported project format"); setDoc(raw as Document); setPath(file); setSelected(null); setMessage("Project opened"); } catch (e) { setMessage(String(e)); } }
  async function persist() { try { const file = path ?? await save({ defaultPath: doc.name.replace(/[^a-z0-9-_]/gi, "_") + ".dui", filters: [{ name: "DroidUI project", extensions: ["dui"] }] }); if (!file) return; await writeTextFile(file, JSON.stringify(doc, null, 2)); setPath(file); setMessage("Project saved"); } catch (e) { setMessage(String(e)); } }
  return <div className="shell">
    <header><div className="brand"><span className="mark">◈</span> DroidUI <small>DESKTOP</small></div><div className="actions"><button onClick={() => { setDoc(initial); setSelected("welcome"); setPath(null); }}>New</button><button onClick={load}>Open</button><button onClick={persist}>Save</button></div></header>
    <div className="workspace"><aside className="tools"><h3>Toolbox</h3>{(["Text","Button","Card"] as const).map(type => <button key={type} onClick={() => add(type)}>＋ {type}</button>)}<h3>Layers</h3>{doc.nodes.map(n => <button className={n.id === selected ? "active" : ""} key={n.id} onClick={() => setSelected(n.id)}>{n.type} · {n.label}</button>)}</aside>
    <main><div className="canvasbar"><strong>{doc.name}</strong><span>Canvas · 390 × 844</span></div><div className="canvas" onClick={() => setSelected(null)}>{doc.nodes.map(n => <div key={n.id} className={`element ${n.type.toLowerCase()} ${selected === n.id ? "selected" : ""}`} style={{ left:n.x,top:n.y }} onClick={e => {e.stopPropagation();setSelected(n.id);}} onPointerDown={e => { if(e.button!==0) return; const startX=e.clientX,startY=e.clientY,ox=n.x,oy=n.y; const move=(ev:PointerEvent)=>updateNode(n.id,{x:Math.max(0,ox+ev.clientX-startX),y:Math.max(0,oy+ev.clientY-startY)}); const stop=()=>{window.removeEventListener("pointermove",move);window.removeEventListener("pointerup",stop);};window.addEventListener("pointermove",move);window.addEventListener("pointerup",stop); }}>{n.label}</div>)}</div></main>
    <aside className="inspector"><h3>Properties</h3>{node ? <><label>Label<input value={node.label} onChange={e=>updateNode(node.id,{label:e.target.value})}/></label><label>X<input type="number" value={node.x} onChange={e=>updateNode(node.id,{x:Number(e.target.value)})}/></label><label>Y<input type="number" value={node.y} onChange={e=>updateNode(node.id,{y:Number(e.target.value)})}/></label><button onClick={()=>{setDoc(d=>({...d,nodes:d.nodes.filter(n=>n.id!==node.id)}));setSelected(null);}}>Delete element</button></> : <p>Select an element to edit it.</p>}</aside></div><footer>{message}<span>Phase D1 · Desktop foundation</span></footer></div>;
}
createRoot(document.getElementById("root")!).render(<App/>);
