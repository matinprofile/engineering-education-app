"use client";

import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight, PlayCircle } from "lucide-react";

type Step = {
  title: string;
  description: string;
  videoUrl: string | null;
};

const STEPS: Step[] = [
  {
    title: "Step 1: Substrate Surface Preparation",
    description:
      "Sanding prepares metal for bonding by using abrasives to remove surface contaminants like rust and loose oxides. It roughens the substrate, creating a better mechanical profile for the adhesive to key into, which significantly enhances bond strength. The process must always be preceded by degreasing and followed by a final cleaning to remove all sanding dust before the adhesive is applied.",
    videoUrl: "/apps/sanding.mp4",
  },
  {
    title: "Step 2: Adhesive Mixing",
    description:
      "Mixing two-component adhesives is necessary because the separate resin and hardener are unreactive when stored. Combining them at the correct ratio initiates a crucial chemical reaction called polymerization. This reaction causes the materials to cross-link and cure, transforming the liquid into a durable, solid, high-strength adhesive. Without proper mixing, the epoxy won't cure and will fail to form a strong bond.",
    videoUrl: "/apps/mixing.mp4",
  },
  {
    title: "Step 3: Joint Assembly and Adhesive Application",
    description:
      "Joint assembly involves setting the substrates precisely within a steel mould to maintain alignment during adhesive application and curing. Spacers, often calibrated shims or glass beads, are strategically placed to guarantee a uniform, optimal adhesive thickness (bondline gap). The mould itself also defines the necessary overlap length for the joint, ensuring all critical geometric parameters are tightly controlled for maximum joint strength and repeatability.",
    videoUrl: "/apps/application.mp4",
  },
  {
    title: "Step 4: Curing of Adhesive and Joint Finishing",
    description:
      "For two-component adhesives, the curing process is initiated by mixing the separate resin and hardener at room temperature, and elevated temperature is then applied primarily as an accelerator to drastically speed up the polymerization reaction. Once curing is complete, the bonded joint is carefully removed from the mould. Spacers are detached and any excess adhesive (flash or fillet) is meticulously trimmed away to ensure the final joint has a clean finish and accurate dimensions.",
    videoUrl: "/apps/curing.mp4",
  },
  {
    title: "Step 5: Testing",
    description:
      "The testing step of single lap joints is executed in a universal testing machine (UTM), which applies a controlled tensile load until failure. The specimen is secured using wedge clamps or specific holders. Crucially, tabs are often bonded to the ends of the joint to ensure the load is symmetrically applied, minimizing parasitic bending moments. Brittle adhesives typically show sudden, sharp failure, while ductile adhesives exhibit a more gradual failure process indicative of yielding and energy absorption.",
    videoUrl: "/apps/test.mp4",
  },
];

export function SLJManufacturingGuide() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const step = STEPS[currentIndex];

  const goTo = (index: number) => {
    setCurrentIndex(index);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.load();
        videoRef.current.play().catch(() => {});
      }
    }, 50);
  };

  const prev = () => { if (currentIndex > 0) goTo(currentIndex - 1); };
  const next = () => { if (currentIndex < STEPS.length - 1) goTo(currentIndex + 1); };

  return (
    <div className="mx-auto w-full max-w-4xl px-4 pt-8 pb-10 sm:px-6 lg:px-8">
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden border border-slate-200">
        <div className="bg-red-800 p-4 text-white text-center">
          <h2 className="text-xl font-bold">Manufacturing Process Guide: Single Lap Joints</h2>
        </div>
        <div className="p-6">
          <div className="flex gap-1.5 mb-5 overflow-x-auto pb-1">
            {STEPS.map((s, i) => (
              <button key={i} onClick={() => goTo(i)}
                className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${i === currentIndex ? "bg-red-700 text-white shadow" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
                Step {i + 1}
              </button>
            ))}
          </div>
          <div className="md:flex md:gap-6">
            <div className="md:w-3/5 mb-5 md:mb-0">
              <h3 className="text-lg font-semibold text-slate-800 mb-3">{step.title}</h3>
              <div className="relative w-full rounded-lg overflow-hidden shadow-lg border-4 border-slate-200 bg-slate-900" style={{ paddingBottom: "56.25%" }}>
                {step.videoUrl ? (
                  <video ref={videoRef} key={step.videoUrl}
                    className="absolute top-0 left-0 w-full h-full object-cover" controls autoPlay muted>
                    <source src={step.videoUrl} type="video/mp4" />
                  </video>
                ) : (
                  <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-slate-400">
                    <PlayCircle className="w-14 h-14 mb-3 opacity-30" />
                    <p className="text-sm text-center px-4">Video for this step is not yet available.</p>
                    <p className="text-xs text-slate-500 mt-1">Read the description for guidance.</p>
                  </div>
                )}
              </div>
            </div>
            <div className="md:w-2/5 flex flex-col justify-between">
              <div>
                <h4 className="text-base font-medium text-slate-700 mb-2">Details</h4>
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-sm text-slate-600 h-40 overflow-y-auto leading-relaxed">
                  {step.description}
                </div>
              </div>
              <div className="mt-5 pt-4 border-t border-slate-200">
                <p className="text-xs font-medium text-slate-500 mb-2 text-center">
                  Progress: <span className="text-red-600 font-bold">{currentIndex + 1} of {STEPS.length}</span>
                </p>
                <div className="w-full bg-slate-200 rounded-full h-1.5 mb-4">
                  <div className="bg-red-600 h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${((currentIndex + 1) / STEPS.length) * 100}%` }} />
                </div>
                <div className="flex gap-3">
                  <button onClick={prev} disabled={currentIndex === 0}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-slate-200 text-slate-700 rounded-lg font-semibold text-sm hover:bg-slate-300 transition disabled:opacity-40 disabled:cursor-not-allowed">
                    <ChevronLeft className="w-4 h-4" /> Previous
                  </button>
                  <button onClick={next} disabled={currentIndex === STEPS.length - 1}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-red-600 text-white rounded-lg font-semibold text-sm hover:bg-red-700 transition disabled:opacity-40 disabled:cursor-not-allowed">
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
