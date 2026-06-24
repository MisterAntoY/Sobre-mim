import type { Project } from '@/data/projects'

function A2IEPreview() {
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun']
  const bars   = [55, 38, 72, 48, 88, 62]
  const categories = [
    { label: 'Alimentação', pct: 35, color: 'bg-brand-500' },
    { label: 'Transporte',  pct: 18, color: 'bg-violet-500' },
    { label: 'Lazer',       pct: 22, color: 'bg-cyan-500' },
    { label: 'Saúde',       pct: 15, color: 'bg-amber-500' },
    { label: 'Outros',      pct: 10, color: 'bg-slate-500' },
  ]
  return (
    <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden font-mono text-xs">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 border-b border-slate-800">
        <span className="w-3 h-3 rounded-full bg-red-500/70" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <span className="w-3 h-3 rounded-full bg-brand-500/70" />
        <span className="ml-2 text-slate-400 text-[11px]">A2IE — Expense Analyzer</span>
        <span className="ml-auto text-[10px] text-brand-400 border border-brand-800/50 bg-brand-950/50 px-2 py-0.5 rounded-full">Dashboard</span>
      </div>
      <div className="grid grid-cols-3 gap-3 p-4">
        {[
          { l: 'Receitas',  v: '€ 3.250', c: 'text-brand-400' },
          { l: 'Despesas',  v: '€ 1.820', c: 'text-red-400' },
          { l: 'Poupança',  v: '€ 1.430', c: 'text-cyan-400' },
        ].map(({ l, v, c }) => (
          <div key={l} className="bg-slate-900 rounded-lg p-3 border border-slate-800">
            <p className="text-slate-500 text-[10px] mb-1">{l}</p>
            <p className={`text-base font-bold ${c}`}>{v}</p>
          </div>
        ))}
      </div>
      <div className="mx-4 mb-4 bg-slate-900 rounded-lg p-3 border border-slate-800">
        <p className="text-slate-500 text-[10px] mb-3">Despesas mensais</p>
        <div className="flex items-end gap-2 h-20">
          {bars.map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                className={`w-full rounded-t-sm transition-all duration-700 ${i === 4 ? 'bg-brand-500' : 'bg-brand-900'}`}
                style={{ height: `${h}%` }}
              />
              <span className="text-slate-600 text-[9px]">{months[i]}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-4 mb-4 bg-slate-900 rounded-lg p-3 border border-slate-800">
        <p className="text-slate-500 text-[10px] mb-3">Por categoria</p>
        <div className="space-y-2">
          {categories.map(({ label, pct, color }) => (
            <div key={label}>
              <div className="flex justify-between text-[10px] mb-1">
                <span className="text-slate-400">{label}</span>
                <span className="text-slate-500">{pct}%</span>
              </div>
              <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Ring2Preview() {
  const gallery = [
    { color: 'bg-violet-700', label: 'Argola Prata', active: true },
    { color: 'bg-amber-700',  label: 'Gota Dourada', active: false },
    { color: 'bg-rose-800',   label: 'Pérola Rosa',  active: false },
    { color: 'bg-cyan-800',   label: 'Pendente Azul', active: false },
  ]
  return (
    <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden font-mono text-xs">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 border-b border-slate-800">
        <span className="w-3 h-3 rounded-full bg-red-500/70" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <span className="w-3 h-3 rounded-full bg-violet-500/70" />
        <span className="ml-2 text-slate-400 text-[11px]">Ring2 — Virtual Try-On</span>
        <span className="ml-auto text-[10px] text-violet-400 border border-violet-800/50 bg-violet-950/50 px-2 py-0.5 rounded-full flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 inline-block" />
          MediaPipe ativo
        </span>
      </div>
      <div className="relative mx-4 mt-4 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden flex items-center justify-center"
        style={{ height: 180 }}>
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(ellipse at center, rgba(139,92,246,0.12) 0%, transparent 65%)' }}
        />
        <div className="relative">
          <div className="w-24 h-28 bg-slate-700/60 rounded-[50%_50%_45%_45%] relative flex items-center justify-center">
            <div className="absolute top-8 left-4 w-4 h-2.5 bg-slate-500 rounded-full" />
            <div className="absolute top-8 right-4 w-4 h-2.5 bg-slate-500 rounded-full" />
            <div className="absolute top-14 left-1/2 -translate-x-1/2 w-2 h-3 bg-slate-600 rounded-b-full" />
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-8 h-1.5 bg-slate-600 rounded-full" />
            {[
              { top: '26%', left: '18%' }, { top: '26%', right: '18%' },
              { top: '66%', left: '28%' }, { top: '66%', right: '28%' },
              { top: '46%', left: '48%' },
            ].map((s, i) => (
              <div key={i} className="absolute w-1.5 h-1.5 rounded-full bg-violet-400 shadow-[0_0_4px_2px_rgba(167,139,250,0.6)]" style={s} />
            ))}
          </div>
          <div className="absolute -left-4 top-10 w-3 h-6 rounded-full bg-gradient-to-b from-violet-300 to-violet-600 shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
          <div className="absolute -right-4 top-10 w-3 h-6 rounded-full bg-gradient-to-b from-violet-300 to-violet-600 shadow-[0_0_8px_rgba(167,139,250,0.8)]" />
        </div>
        <div className="absolute top-2 left-2 bg-slate-900/90 border border-slate-700 rounded-lg px-2 py-1 text-[9px] text-slate-400">
          <span className="text-violet-400">468</span> landmarks
        </div>
        <div className="absolute top-2 right-2 bg-slate-900/90 border border-slate-700 rounded-lg px-2 py-1 text-[9px] text-slate-400">
          Face Shape: <span className="text-violet-400">Oval</span>
        </div>
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-brand-950/90 border border-brand-800/50 rounded-lg px-3 py-1 text-[9px] text-brand-400">
          ✓ Deteção ativa
        </div>
      </div>
      <div className="p-4">
        <p className="text-slate-500 text-[10px] mb-2">Catálogo de brincos</p>
        <div className="grid grid-cols-4 gap-2">
          {gallery.map(({ color, label, active }) => (
            <div key={label}
              className={`rounded-lg p-2 text-center cursor-pointer border transition-colors ${
                active
                  ? 'border-violet-500/60 bg-violet-950/40'
                  : 'border-slate-800 bg-slate-900 hover:border-slate-700'
              }`}>
              <div className={`w-full h-8 rounded-md ${color} mb-1 opacity-80`} />
              <span className="text-[9px] text-slate-400">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function PricenPreview() {
  const rows = [
    { name: 'Cimento Portland 42.5R',  unit: 'saco 50kg', prices: ['4.500', '4.200', '4.800'], best: 1 },
    { name: 'Varão Ø12 A500NR',        unit: 'barra 12m',  prices: ['2.100', '2.350', '1.980'], best: 2 },
    { name: 'Tijolo Furado 22x11x7',   unit: 'milheiro',   prices: ['18.500', '17.900', '19.200'], best: 1 },
    { name: 'Areia Lavada Média',       unit: 'm³',         prices: ['8.200', '8.900', '7.800'], best: 2 },
  ]
  return (
    <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden font-mono text-xs">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 border-b border-slate-800">
        <span className="w-3 h-3 rounded-full bg-red-500/70" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <span className="w-3 h-3 rounded-full bg-amber-500/70" />
        <span className="ml-2 text-slate-400 text-[11px]">Pricen — Comparador de Preços</span>
        <span className="ml-auto text-[10px] text-amber-400 border border-amber-800/50 bg-amber-950/50 px-2 py-0.5 rounded-full">Plano Pro</span>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-5 gap-2 text-[10px] text-slate-500 mb-2 px-2">
          <div className="col-span-2">Material</div>
          <div className="text-center">Forn. A</div>
          <div className="text-center">Forn. B</div>
          <div className="text-center">Forn. C</div>
        </div>
        <div className="space-y-1.5">
          {rows.map(({ name, unit, prices, best }) => (
            <div key={name} className="grid grid-cols-5 gap-2 bg-slate-900 rounded-lg px-2 py-2 items-center border border-slate-800">
              <div className="col-span-2">
                <p className="text-slate-200 font-medium leading-tight text-[10px]">{name}</p>
                <p className="text-slate-600 text-[9px]">{unit}</p>
              </div>
              {prices.map((p, i) => (
                <div key={i} className={`text-center text-[10px] font-bold rounded px-1 py-0.5 ${
                  i === best ? 'text-amber-400 bg-amber-950/60 ring-1 ring-amber-700/40' : 'text-slate-400'
                }`}>
                  {p} Kz
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {[
            { l: 'Poupança estimada', v: '12.3%', c: 'text-amber-400' },
            { l: 'Fornecedores', v: '3 ativos', c: 'text-slate-300' },
            { l: 'Materiais', v: '4 itens', c: 'text-slate-300' },
          ].map(({ l, v, c }) => (
            <div key={l} className="bg-slate-900 rounded-lg p-2 border border-slate-800 text-center">
              <p className="text-slate-500 text-[9px]">{l}</p>
              <p className={`font-bold text-sm ${c}`}>{v}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function JerryPreview() {
  const skills = [
    { name: 'Foco',       val: 7, color: 'bg-cyan-500' },
    { name: 'Disciplina', val: 8, color: 'bg-blue-500' },
    { name: 'Criatividade', val: 6, color: 'bg-violet-500' },
    { name: 'Comunicação', val: 5, color: 'bg-amber-500' },
    { name: 'Liderança',  val: 4, color: 'bg-rose-500' },
    { name: 'Aprendizagem', val: 9, color: 'bg-brand-500' },
  ]
  const quests = [
    { name: 'Leitura diária 30min',     xp: 50,  done: true,  type: 'daily' },
    { name: 'Exercício físico',         xp: 80,  done: true,  type: 'daily' },
    { name: 'Projeto pessoal 2h',       xp: 120, done: false, type: 'daily' },
    { name: 'Conquistar 100 missões',   xp: 500, done: false, type: 'boss' },
  ]
  return (
    <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden font-mono text-xs">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 border-b border-slate-800">
        <span className="w-3 h-3 rounded-full bg-red-500/70" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <span className="w-3 h-3 rounded-full bg-cyan-500/70" />
        <span className="ml-2 text-slate-400 text-[11px]">Jerry — Modo RPG</span>
        <span className="ml-auto flex items-center gap-1 text-[10px] text-cyan-400 border border-cyan-800/50 bg-cyan-950/50 px-2 py-0.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> Lvl 12 · 2.340 XP
        </span>
      </div>
      <div className="p-4 grid grid-cols-2 gap-4">
        <div className="space-y-3">
          {[
            { label: '❤️ HP', val: 78, max: 100, color: 'bg-red-500', track: 'bg-red-950' },
            { label: '⚡ XP', val: 78, max: 100, color: 'bg-cyan-500', track: 'bg-cyan-950' },
          ].map(({ label, val, max, color, track }) => (
            <div key={label}>
              <div className="flex justify-between text-[10px] mb-1">
                <span className="text-slate-400">{label}</span>
                <span className="text-slate-500">{Math.round(val/max*100)}%</span>
              </div>
              <div className={`h-2 rounded-full ${track} overflow-hidden`}>
                <div className={`h-full rounded-full ${color}`} style={{ width: `${val}%` }} />
              </div>
            </div>
          ))}
          <div className="flex gap-2 text-[10px]">
            <span className="text-orange-400">🔥 14 dias</span>
            <span className="text-violet-400">🛡 ×2</span>
          </div>
          <div>
            <p className="text-[9px] text-slate-500 uppercase tracking-wider mb-1.5">Missões</p>
            {quests.map(({ name, xp, done, type }) => (
              <div key={name} className={`flex items-center gap-2 px-2 py-1 rounded mb-1 ${done ? 'bg-cyan-950/20' : type === 'boss' ? 'bg-red-950/20 border border-red-900/30' : 'bg-slate-900'}`}>
                <span className={`w-3 h-3 rounded border text-center text-[8px] leading-[10px] flex-shrink-0 ${done ? 'border-cyan-500 bg-cyan-500/20 text-cyan-400' : type === 'boss' ? 'border-red-800 text-red-400' : 'border-slate-700'}`}>{done ? '✓' : type === 'boss' ? '!' : ''}</span>
                <span className={`flex-1 text-[10px] ${done ? 'text-slate-600 line-through' : 'text-slate-300'}`}>{name}</span>
                <span className="text-cyan-400 text-[9px]">+{xp}xp</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[9px] text-slate-500 uppercase tracking-wider mb-2">Árvore de Habilidades</p>
          <div className="space-y-2">
            {skills.map(({ name, val, color }) => (
              <div key={name}>
                <div className="flex justify-between text-[9px] mb-0.5">
                  <span className="text-slate-400">{name}</span>
                  <span className="text-slate-500">{val}/10</span>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} className={`flex-1 h-1.5 rounded-sm ${i < val ? color : 'bg-slate-800'}`} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function MyTubePreview() {
  const videos = [
    { user: '@futuro_dev', caption: 'Como aprendi React em 30 dias 🚀 #coding #react', likes: '12.4k', comments: '234', shares: '89' },
    { user: '@musica_ao_vivo', caption: 'Sessão acústica na praia 🎸 #música #vibes', likes: '8.1k', comments: '156', shares: '201' },
  ]
  return (
    <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden font-mono text-xs">
      <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 border-b border-slate-800">
        <span className="w-3 h-3 rounded-full bg-red-500/70" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/70" />
        <span className="w-3 h-3 rounded-full bg-violet-500/70" />
        <span className="ml-2 text-slate-400 text-[11px]">MyTube — Feed de Vídeos</span>
        <span className="ml-auto flex items-center gap-1 text-[10px] text-green-400 border border-green-800/50 bg-green-950/50 px-2 py-0.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400" /> Chat online
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3 p-4">
        {videos.map(({ user, caption, likes, comments, shares }, i) => (
          <div key={i} className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800">
            <div className="relative bg-gradient-to-b from-slate-800 to-slate-700" style={{ height: 120 }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                  <span className="text-white text-sm ml-0.5">▶</span>
                </div>
              </div>
              <div className="absolute right-1.5 bottom-2 flex flex-col items-center gap-1.5 text-center">
                {[[likes,'♥'],[comments,'💬'],[shares,'↗']].map(([v, icon]) => (
                  <div key={icon} className="flex flex-col items-center">
                    <span className="text-base leading-none">{icon}</span>
                    <span className="text-white text-[8px]">{v}</span>
                  </div>
                ))}
              </div>
              <div className="absolute bottom-1 left-2 right-8">
                <p className="text-white font-bold text-[9px]">{user}</p>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-600">
                <div className="h-full bg-violet-500" style={{ width: `${35 + i * 25}%` }} />
              </div>
            </div>
            <div className="p-2">
              <p className="text-slate-400 text-[9px] leading-tight line-clamp-2">{caption}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-around px-4 py-2 bg-slate-900 border-t border-slate-800">
        {[['🏠','Feed'],['🔍','Explorar'],['➕','Upload'],['🔔','Avisos'],['👤','Perfil']].map(([icon, label], i) => (
          <div key={label} className={`flex flex-col items-center gap-0.5 ${i === 0 ? 'text-violet-400' : 'text-slate-600'}`}>
            <span className="text-base">{icon}</span>
            <span className="text-[8px]">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function ProjectPreview({ project }: { project: Project }) {
  switch (project.id) {
    case 'a2ie':   return <A2IEPreview />
    case 'ring2':  return <Ring2Preview />
    case 'pricen': return <PricenPreview />
    case 'jerry':  return <JerryPreview />
    default:       return <MyTubePreview />
  }
}
