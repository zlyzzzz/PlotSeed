import React from 'react';

export function SceneIcon({ scene, className='' }) {
 return <svg className={'scene-icon '+className} viewBox="0 0 120 110" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
  {scene==='park'&&<>
   <circle cx="60" cy="43" r="31"/><circle cx="60" cy="43" r="5"/>
   <path d="M60 12v26M60 48v26M29 43h26M65 43h26M38 21l18 18M64 47l18 18M38 65l18-18M64 39l18-18M60 47L39 99M60 47l21 52M29 100h62"/>
   {[ [60,12],[82,21],[91,43],[82,65],[60,74],[38,65],[29,43],[38,21] ].map(([x,y],i)=><path key={i} d={`M${x-6} ${y+3}v7q6 4 12 0v-7z`} fill="var(--paper)"/>)}

  </>}
  {scene==='restaurant'&&<>
   <path d="M23 54h75c-3 23-14 34-37 34S27 77 23 54ZM43 89v6h36v-6M19 98h83M82 14L54 52M94 15L64 52"/>
   <path d="M34 50c-3-7 8-8 4-15s4-11 5-15M52 46c-4-7 6-9 3-15M80 50c3-5 8-6 12-3M31 59c17 5 43 6 61 0"/>

  </>}
  {scene==='classroom'&&<>
   <path d="M17 16h87v58H17zM23 22h75v46H23zM48 75l-7 25M73 75l8 25M35 101h53M14 75h93M31 40l8 6 13-16M63 35h22M63 43h15M34 57h45"/>
   <path d="M84 62h9v5h-9"/>
  </>}
 </svg>;
}

export function SeedSketch(){return <svg viewBox="0 0 320 230" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
 <path d="M43 133c36-11 74-5 114 12 37-16 78-20 121-9l-2 63c-41-10-78-6-119 9-37-16-77-21-116-10z" fill="var(--paper)"/>
 <path d="m157 145 0 63M43 139l-8 5-1 60c45-2 81 4 123 14 44-14 82-15 126-8l3-67-8-7M57 153c28-4 53 0 82 10M57 168c29-2 53 3 82 12M57 183c21 0 39 3 58 9M177 163c24-7 51-9 80-5M177 179c26-7 52-7 79-3"/>
 <path d="M157 145c0-28-5-48 0-74M157 101c-24 0-43-14-44-39 25 0 43 12 44 39Z" fill="var(--accent)"/>
 <path d="M157 82c26 2 47-14 49-41-29-1-48 13-49 41Z" fill="#e5e8d7"/>
 <path d="m157 101-28-26M157 82l33-27M157 125c-9-7-19-10-27-9M157 128c10-6 21-8 30-6"/>
 <ellipse cx="158" cy="146" rx="8" ry="5" fill="#b89b43" stroke="none"/>

 </svg>;}
