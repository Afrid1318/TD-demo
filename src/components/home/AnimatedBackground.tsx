/**
 * Full-bleed animated backdrop shown behind every page. Built from the brand's
 * teal/blue palette plus vibrant purple and pink accents (Canva-style), soft
 * blurred orbs drift and scale continuously while a slow gradient sheen pans
 * across the screen. A dark overlay keeps text readable. All motion is
 * disabled for users who prefer reduced motion.
 */
export function AnimatedBackground() {
  return (
    <div aria-hidden="true" className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-[12%] left-[0%] h-[36rem] w-[36rem] rounded-full bg-brand-teal-deep/70 blur-[130px] animate-blob-1" />
      <div className="absolute top-[8%] right-[-10%] h-[34rem] w-[34rem] rounded-full bg-brand-blue-deep/70 blur-[130px] animate-blob-2" />
      <div className="absolute top-[42%] left-[22%] h-[30rem] w-[30rem] rounded-full bg-brand-teal/25 blur-[120px] animate-blob-3" />
      <div className="absolute bottom-[-12%] right-[10%] h-[28rem] w-[28rem] rounded-full bg-brand-blue/25 blur-[120px] animate-blob-4" />
      <div className="absolute bottom-[4%] left-[-8%] h-[26rem] w-[26rem] rounded-full bg-brand-teal-deep/50 blur-[120px] animate-blob-2" />
      <div
        className="absolute top-[18%] left-[42%] h-[24rem] w-[24rem] rounded-full blur-[130px] animate-blob-3"
        style={{ background: 'radial-gradient(circle, rgba(168, 85, 247, 0.5), transparent 70%)' }}
      />
      <div
        className="absolute bottom-[16%] left-[52%] h-[22rem] w-[22rem] rounded-full blur-[130px] animate-blob-1"
        style={{ background: 'radial-gradient(circle, rgba(236, 72, 153, 0.45), transparent 70%)' }}
      />
      <div
        className="absolute inset-0 opacity-70 animate-gradient-pan animate-hue"
        style={{
          background:
            'linear-gradient(120deg, rgba(63, 220, 224, 0.10), rgba(91, 110, 245, 0.10), rgba(168, 85, 247, 0.10), rgba(236, 72, 153, 0.10), rgba(63, 220, 224, 0.10))',
          backgroundSize: '300% 300%',
        }}
      />
      <div className="absolute inset-0 bg-brand-black/55" />
    </div>
  )
}
