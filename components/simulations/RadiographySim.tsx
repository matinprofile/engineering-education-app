"use client";

import { useState } from "react";
import { Eye, Zap, ListFilter, Activity } from "lucide-react";

type DefectType = "clean" | "porosity" | "crack" | "lof" | "slag";

const DEFECT_DATA: Record<
  DefectType,
  { title: string; desc: string; isDefect: boolean }
> = {
  clean: {
    title: "Junta Sã (Aprovada)",
    isDefect: false,
    desc: "A soldadura apresenta uma densidade uniforme na área do cordão. A área mais clara representa o reforço da soldadura, que é mais espesso e absorve mais radiação. Não existem manchas escuras irregulares.",
  },
  porosity: {
    title: "Porosidade Agrupada",
    isDefect: true,
    desc: "Gás aprisionado durante a solidificação. Aparece como pontos redondos e escuros porque o gás tem densidade quase nula comparada ao aço, permitindo a passagem livre dos Raios-X.",
  },
  crack: {
    title: "Fissura Transversal (Crack)",
    isDefect: true,
    desc: "Uma descontinuidade crítica. Aparece como uma linha fina, escura e dentada. É escura porque é um vazio estreito. As extremidades são tipicamente muito finas e aguçadas. Requer reparação imediata.",
  },
  lof: {
    title: "Falta de Fusão Lateral",
    isDefect: true,
    desc: "O metal de soldadura não fundiu com o metal base. Aparece como uma linha reta e escura alinhada com a preparação do chanfro. Um lado da linha é difuso (solda), o outro é muito reto (chanfro original).",
  },
  slag: {
    title: "Inclusão de Escória",
    isDefect: true,
    desc: "Material não metálico retido na solda. Aparece como formas irregulares ('batatas'), menos escuras que a porosidade ou fissuras, pois a escória tem alguma densidade, mas é menor que a do aço.",
  },
};

const BUTTONS: { key: DefectType; label: string }[] = [
  { key: "clean", label: "Junta sã (sem defeitos)" },
  { key: "porosity", label: "Porosidade agrupada" },
  { key: "crack", label: "Fissura transversal (crack)" },
  { key: "lof", label: "Falta de fusão lateral" },
  { key: "slag", label: "Inclusão de escória" },
];

function DefectVisual({ type, visible }: { type: DefectType | null; visible: boolean }) {
  if (!type || !visible) return null;

  switch (type) {
    case "porosity":
      return (
        <>
          <div
            className="absolute rounded-full"
            style={{
              width: 8,
              height: 8,
              top: "50%",
              left: "30%",
              background: "radial-gradient(circle, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 70%)",
              filter: "blur(1px)",
              transform: "translate(-50%,-50%)",
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              width: 12,
              height: 12,
              top: "45%",
              left: "32%",
              background: "radial-gradient(circle, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 70%)",
              filter: "blur(1px)",
              transform: "translate(-50%,-50%)",
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              width: 6,
              height: 6,
              top: "55%",
              left: "31%",
              background: "radial-gradient(circle, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 70%)",
              filter: "blur(1px)",
              transform: "translate(-50%,-50%)",
            }}
          />
          <div
            className="absolute rounded-full"
            style={{
              width: 8,
              height: 8,
              top: "52%",
              left: "34%",
              background: "radial-gradient(circle, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 70%)",
              filter: "blur(1px)",
              transform: "translate(-50%,-50%)",
            }}
          />
        </>
      );
    case "crack":
      return (
        <div
          className="absolute"
          style={{
            height: 2,
            width: 48,
            top: "50%",
            left: "50%",
            background: "rgba(0,0,0,0.9)",
            boxShadow: "0 0 2px rgba(0,0,0,0.8)",
            transform: "translate(-50%,-50%) rotate(-5deg)",
            clipPath: "polygon(0% 0%, 20% 100%, 40% 0%, 60% 100%, 80% 0%, 100% 100%)",
          }}
        />
      );
    case "lof":
      return (
        <div
          className="absolute"
          style={{
            height: 4,
            width: 96,
            top: "30%",
            left: "50%",
            background: "linear-gradient(90deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)",
            filter: "blur(0.5px)",
            transform: "translateX(-50%)",
          }}
        />
      );
    case "slag":
      return (
        <>
          <div
            className="absolute"
            style={{
              width: 32,
              height: 12,
              top: "50%",
              left: "40%",
              background: "rgba(0,0,0,0.6)",
              borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%",
              filter: "blur(2px)",
              transform: "translate(-50%,-50%)",
            }}
          />
          <div
            className="absolute"
            style={{
              width: 24,
              height: 8,
              top: "48%",
              left: "45%",
              background: "rgba(0,0,0,0.6)",
              borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%",
              filter: "blur(2px)",
              transform: "translate(-50%,-50%) rotate(12deg)",
            }}
          />
        </>
      );
    default:
      return null;
  }
}

export function RadiographySim() {
  const [selected, setSelected] = useState<DefectType | null>(null);
  const [visible, setVisible] = useState(true);

  function handleSelect(type: DefectType) {
    setVisible(false);
    setTimeout(() => {
      setSelected(type);
      setVisible(true);
    }, 200);
  }

  const data = selected ? DEFECT_DATA[selected] : null;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <header className="w-full border-b border-slate-800 px-4 py-6 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h2 className="flex items-center gap-3 text-2xl font-extrabold tracking-tight text-blue-400 md:text-3xl">
              <Eye className="h-8 w-8 shrink-0" />
              Simulador de análise radiográfica em juntas soldadas
            </h2>
            <p className="mt-1 text-slate-400">Interpretação de defeitos em soldadura</p>
            <p className="mt-0.5 text-sm text-slate-500">
              Selecione um defeito no menu para visualizar a sua aparência no filme radiográfico.
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-6 p-4 sm:p-6 lg:grid-cols-3">
        {/* Film viewer */}
        <div className="flex flex-col overflow-hidden rounded-xl border border-slate-700 bg-black shadow-2xl lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-700 bg-slate-800 px-4 py-2">
            <span className="font-mono text-xs uppercase tracking-widest text-slate-400">
              Negatoscópio Digital
            </span>
            <span className="flex items-center gap-1 text-xs text-blue-400">
              <Zap className="h-3 w-3" /> Fonte: Raios-X 200kV
            </span>
          </div>

          {/* Film area */}
          <div
            className="relative flex h-[220px] sm:h-[340px] items-center justify-center overflow-hidden p-8"
            style={{
              backgroundColor: "#0f172a",
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.15'/%3E%3C/svg%3E\")",
            }}
          >
            <div className="relative h-48 w-full rounded border border-slate-700/50 bg-slate-800/40 shadow-lg backdrop-blur-sm">
              {/* Film annotation */}
              <div className="pointer-events-none absolute left-4 top-2 select-none font-mono text-xs font-bold text-slate-500/30">
                LUCAS-GRP-01
                <br />
                ASTM E142
              </div>
              {/* IQI scale */}
              <div className="absolute right-10 top-1/2 flex -translate-y-1/2 flex-col gap-1 opacity-40">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="bg-slate-400" style={{ width: 48, height: n }} />
                ))}
                <span className="text-center font-mono text-[10px] text-slate-400">10 FE EN</span>
              </div>

              {/* Weld bead strip */}
              <div
                className="relative flex h-24 w-full items-center justify-center overflow-hidden"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.20) 40%, rgba(255,255,255,0.20) 60%, rgba(255,255,255,0.05) 100%)",
                  boxShadow: "0 0 15px rgba(255,255,255,0.10)",
                  position: "absolute",
                  top: "50%",
                  transform: "translateY(-50%)",
                  left: 0,
                  right: 0,
                }}
              >
                <div
                  className="relative h-full w-full"
                  style={{
                    opacity: visible ? 1 : 0,
                    transition: "opacity 0.2s ease",
                  }}
                >
                  <DefectVisual type={selected} visible={visible} />
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 bg-slate-900 p-3 text-center">
            <p className="font-mono text-xs text-slate-500">
              Filme Tipo D7 | Densidade 2.5 | Distância Fonte-Filme 700mm
            </p>
          </div>
        </div>

        {/* Controls + info */}
        <div className="flex flex-col gap-6 lg:col-span-1">
          {/* Defect selector */}
          <div className="rounded-xl border border-slate-700 bg-slate-800 p-6 shadow-lg">
            <h3 className="mb-4 flex items-center gap-2 font-bold text-blue-400">
              <ListFilter className="h-5 w-5" />
              Seletor de defeitos
            </h3>
            <div className="grid gap-3">
              {BUTTONS.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => handleSelect(key)}
                  className={`rounded-lg border px-4 py-3 text-left text-sm font-semibold transition-colors ${
                    selected === key
                      ? "border-blue-400 bg-slate-900 text-white"
                      : "border-transparent bg-slate-700 text-slate-200 hover:bg-slate-600 hover:text-white"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Diagnosis */}
          <div className="flex-grow rounded-xl border border-slate-700 bg-slate-800 p-6 shadow-lg">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
              Diagnóstico e contexto
            </h3>

            {data ? (
              <>
                <h2
                  className={`mb-2 text-xl font-bold ${
                    data.isDefect ? "text-red-400" : "text-emerald-400"
                  }`}
                >
                  {data.title}
                </h2>
                <p className="text-sm leading-relaxed text-slate-300">{data.desc}</p>
              </>
            ) : (
              <>
                <h2 className="mb-2 text-xl font-bold text-white">Aguardando seleção...</h2>
                <p className="text-sm leading-relaxed text-slate-300">
                  Selecione um tipo de defeito na lista acima para projetar a sua imagem no filme
                  radiográfico.
                </p>
                <p className="mt-2 text-sm text-slate-400">
                  Observe as diferenças em densidade (tons de cinza) e morfologia (forma).
                </p>
              </>
            )}

            <div className="mt-6 border-t border-slate-700 pt-4">
              <div className="mb-1 flex items-center justify-between font-mono text-[10px] uppercase text-slate-500">
                <span>Menos denso</span>
                <span>Mais denso (metal)</span>
              </div>
              <div className="h-2 w-full rounded-full bg-gradient-to-r from-black via-gray-500 to-white" />
              <div className="mt-1 flex items-center justify-between font-mono text-[10px] text-slate-400">
                <span>Defeito (escuro)</span>
                <span>Metal base (claro)</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="pb-6 pt-2 text-center text-xs text-slate-600">
        <p className="flex items-center justify-center gap-1">
          <Activity className="h-3 w-3" /> NDT Radiography Simulator — Engineering Education Platform
        </p>
      </footer>
    </div>
  );
}
