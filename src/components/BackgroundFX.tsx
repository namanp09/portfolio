export default function BackgroundFX() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-base">
      <div className="absolute inset-0 bg-grid-fade bg-[length:100%_100%,42px_42px,42px_42px]" />
      <div className="absolute -top-40 -left-32 h-[32rem] w-[32rem] rounded-full bg-purple/20 blur-[120px] animate-blob" />
      <div className="absolute top-1/3 -right-32 h-[28rem] w-[28rem] rounded-full bg-cyan/15 blur-[120px] animate-blob-slow" />
      <div className="absolute bottom-0 left-1/4 h-[24rem] w-[24rem] rounded-full bg-purple/10 blur-[110px] animate-blob" />
    </div>
  )
}
