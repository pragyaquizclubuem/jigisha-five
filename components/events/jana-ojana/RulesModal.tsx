'use client';

type RulesModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function RulesModal({ isOpen, onClose }: RulesModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4 transition-opacity duration-300 animate-fade-in">
      <div className="bg-[#FFEDE0] border-4 border-[#252525] rounded-3xl max-w-xl w-full m-4 shadow-[8px_8px_0_0_#252525]">
        <div className="p-6 sm:p-8 space-y-6">
          <div className="flex justify-between items-start">
            <h2 className="text-2xl sm:text-3xl font-bold font-roboto-condensed text-[#513081] uppercase tracking-wider pr-4">Rules & Regulations</h2>
            <button
              onClick={onClose}
              className="text-[#252525] hover:text-[#513081] transition-colors p-1 border-2 border-transparent hover:border-[#252525] hover:bg-white rounded-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          
          <div className="text-[#252525] font-semibold text-sm space-y-3.5 max-h-[50vh] overflow-y-auto pr-4 text-left divide-y divide-[#252525]/10">
            <div className="pt-2 flex gap-3">
              <span className="text-[#513081] font-bold">1.</span>
              <p>This is a team event. Each team must have 2 members.</p>
            </div>
            <div className="pt-3 flex gap-3">
              <span className="text-[#513081] font-bold">2.</span>
              <p>The quiz will have a preliminary round followed by the final round for the top 6 teams.</p>
            </div>
            <div className="pt-3 flex gap-3">
              <span className="text-[#513081] font-bold">3.</span>
              <p>The preliminary round will be a written test of 25 questions.</p>
            </div>
            <div className="pt-3 flex gap-3">
              <span className="text-[#513081] font-bold">4.</span>
              <p>The final round will have multiple rounds including buzzer rounds, audio-visual rounds, and rapid-fire rounds.</p>
            </div>
            <div className="pt-3 flex gap-3">
              <span className="text-[#513081] font-bold">5.</span>
              <p>Use of mobile phones or any other electronic gadgets is strictly prohibited during the quiz.</p>
            </div>
            <div className="pt-3 flex gap-3">
              <span className="text-[#513081] font-bold">6.</span>
              <p>The quizmaster&apos;s decision will be final and binding.</p>
            </div>
            <div className="pt-3 flex gap-3">
              <span className="text-[#513081] font-bold">7.</span>
              <p>All participants must carry their school ID cards.</p>
            </div>
            <div className="pt-3 flex gap-3">
              <span className="text-[#513081] font-bold">8.</span>
              <p>Reporting time is 9:00 AM on the day of the event.</p>
            </div>
          </div>
        </div>
        <div className="bg-white border-t-2 border-[#252525] px-6 sm:px-8 py-4 flex justify-end rounded-b-[20px]">
           <button
             onClick={onClose}
             className="px-6 py-2.5 bg-white text-[#513081] border-2 border-[#252525] font-bold text-xs uppercase tracking-wider rounded-full hover:bg-[#513081] hover:text-[#FFEDE0] transition-all shadow-[2px_2px_0_0_#252525] hover:-translate-y-0.5"
           >
             Close
           </button>
        </div>
      </div>
    </div>
  );
}
