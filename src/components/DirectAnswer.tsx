import { SITE_CONFIG } from "@/lib/constants";
import { Cpu } from "lucide-react";

interface DirectAnswerProps {
  question: string;
  answer: string;
  category?: string;
}

export default function DirectAnswer({ question, answer, category = "Expert Insight" }: DirectAnswerProps) {
  return (
    <div className="relative mb-16 group">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-accent/5 rounded-3xl blur-xl transition-all group-hover:bg-accent/10" />
      
      <div className="relative bg-[#1A1D23] border border-white/10 rounded-3xl p-8 lg:p-10 shadow-2xl">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-widest">
              <Cpu className="w-3 h-3" /> {category}
            </div>
            <div className="text-[10px] font-mono text-muted uppercase tracking-tighter">
              Verified for AEO / GEO Optimization
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-xl lg:text-2xl font-black text-white leading-tight">
              {question}
            </h2>
            <p className="text-base lg:text-lg text-muted leading-relaxed font-medium">
              {answer}
            </p>
          </div>

          <div className="pt-4 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 64 64" fill="none" aria-hidden="true">
                  <path d="M7,44 V21 C7,14 25,14 25,21 V44" stroke="#2ECC71" strokeWidth="6" fill="none" strokeLinecap="round" />
                  <circle cx="16" cy="14" r="4" fill="#F97316" />
                </svg>
              </div>
              <span className="text-xs font-bold text-white/50 uppercase tracking-widest">
                {SITE_CONFIG.name} Methodology
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
