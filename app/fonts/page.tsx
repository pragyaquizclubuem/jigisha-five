import PageWrapper from "@/components/wrappers/PageWrapper";

export default function FontsPage() {
  return (
    <PageWrapper>
      <div className="flex-1 py-24 px-4 max-w-4xl mx-auto w-full">
        <h1 className="text-4xl font-bold mb-10 text-center uppercase tracking-wider text-[#252525]">
          Typography Preview
        </h1>
        
        <div className="space-y-12">
          {/* Geist Sans */}
          <section className="bg-white/50 p-8 rounded-2xl border-2 border-[#252525] shadow-[8px_8px_0_0_#252525]">
            <h2 className="text-sm font-bold uppercase tracking-widest text-[#513081] mb-4">font-sans (Geist Sans)</h2>
            <p className="font-sans text-3xl text-[#252525]">
              The quick brown fox jumps over the lazy dog.
            </p>
            <p className="font-sans text-xl text-[#252525] mt-4 opacity-80">
              ABCDEFGHIJKLMNOPQRSTUVWXYZ<br/>
              abcdefghijklmnopqrstuvwxyz<br/>
              0123456789
            </p>
          </section>

          {/* Geist Mono */}
          <section className="bg-white/50 p-8 rounded-2xl border-2 border-[#252525] shadow-[8px_8px_0_0_#252525]">
            <h2 className="text-sm font-bold uppercase tracking-widest text-[#513081] mb-4">font-mono (Geist Mono)</h2>
            <p className="font-mono text-3xl text-[#252525]">
              The quick brown fox jumps over the lazy dog.
            </p>
            <p className="font-mono text-xl text-[#252525] mt-4 opacity-80">
              ABCDEFGHIJKLMNOPQRSTUVWXYZ<br/>
              abcdefghijklmnopqrstuvwxyz<br/>
              0123456789
            </p>
          </section>

          {/* Roboto Condensed */}
          <section className="bg-white/50 p-8 rounded-2xl border-2 border-[#252525] shadow-[8px_8px_0_0_#252525]">
            <h2 className="text-sm font-bold uppercase tracking-widest text-[#513081] mb-4">font-roboto-condensed</h2>
            <p className="font-roboto-condensed text-3xl text-[#252525]">
              The quick brown fox jumps over the lazy dog.
            </p>
            <p className="font-roboto-condensed text-xl text-[#252525] mt-4 opacity-80">
              ABCDEFGHIJKLMNOPQRSTUVWXYZ<br/>
              abcdefghijklmnopqrstuvwxyz<br/>
              0123456789
            </p>
          </section>

          {/* Freckle Face */}
          <section className="bg-[#D7ABFF]/30 p-8 rounded-2xl border-2 border-[#252525] shadow-[8px_8px_0_0_#252525]">
            <h2 className="text-sm font-bold uppercase tracking-widest text-[#513081] mb-4">font-freckle-face</h2>
            <p className="font-freckle-face text-4xl text-[#252525]">
              The quick brown fox jumps over the lazy dog.
            </p>
            <p className="font-freckle-face text-2xl text-[#252525] mt-4 opacity-80">
              ABCDEFGHIJKLMNOPQRSTUVWXYZ<br/>
              abcdefghijklmnopqrstuvwxyz<br/>
              0123456789
            </p>
          </section>

          {/* Fredoka */}
          <section className="bg-[#FFEDE0]/80 p-8 rounded-2xl border-2 border-[#252525] shadow-[8px_8px_0_0_#252525]">
            <h2 className="text-sm font-bold uppercase tracking-widest text-[#513081] mb-4">font-fredoka</h2>
            <p className="font-fredoka text-4xl text-[#252525]">
              The quick brown fox jumps over the lazy dog.
            </p>
            <p className="font-fredoka text-2xl text-[#252525] mt-4 opacity-80">
              ABCDEFGHIJKLMNOPQRSTUVWXYZ<br/>
              abcdefghijklmnopqrstuvwxyz<br/>
              0123456789
            </p>
          </section>

          {/* Sniglet */}
          <section className="bg-blue-100/50 p-8 rounded-2xl border-2 border-[#252525] shadow-[8px_8px_0_0_#252525]">
            <h2 className="text-sm font-bold uppercase tracking-widest text-[#513081] mb-4">font-sniglet</h2>
            <p className="font-sniglet text-4xl text-[#252525]">
              The quick brown fox jumps over the lazy dog.
            </p>
            <p className="font-sniglet text-2xl text-[#252525] mt-4 opacity-80">
              ABCDEFGHIJKLMNOPQRSTUVWXYZ<br/>
              abcdefghijklmnopqrstuvwxyz<br/>
              0123456789
            </p>
          </section>

          {/* DM Sans */}
          <section className="bg-green-100/50 p-8 rounded-2xl border-2 border-[#252525] shadow-[8px_8px_0_0_#252525]">
            <h2 className="text-sm font-bold uppercase tracking-widest text-[#513081] mb-4">font-dm-sans</h2>
            <p className="font-dm-sans text-4xl text-[#252525]">
              The quick brown fox jumps over the lazy dog.
            </p>
            <p className="font-dm-sans text-2xl text-[#252525] mt-4 opacity-80">
              ABCDEFGHIJKLMNOPQRSTUVWXYZ<br/>
              abcdefghijklmnopqrstuvwxyz<br/>
              0123456789
            </p>
          </section>

          {/* Google Sans Flex */}
          <section className="bg-yellow-100/50 p-8 rounded-2xl border-2 border-[#252525] shadow-[8px_8px_0_0_#252525]">
            <h2 className="text-sm font-bold uppercase tracking-widest text-[#513081] mb-4">font-google-sans-flex</h2>
            <p className="font-google-sans-flex text-4xl text-[#252525]">
              The quick brown fox jumps over the lazy dog.
            </p>
            <p className="font-google-sans-flex text-2xl text-[#252525] mt-4 opacity-80">
              ABCDEFGHIJKLMNOPQRSTUVWXYZ<br/>
              abcdefghijklmnopqrstuvwxyz<br/>
              0123456789
            </p>
          </section>
        </div>
      </div>
    </PageWrapper>
  );
}
