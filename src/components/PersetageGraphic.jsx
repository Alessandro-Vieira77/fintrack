export function PercentageGrafh({ icon, value, title }) {
  return (
    <div className="flex w-full items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#202020]">
          {icon}
        </div>
        <p className="text-sm font-bold">{title}</p>
      </div>
      <p className="text-sm font-bold">{value}</p>
    </div>
  )
}
