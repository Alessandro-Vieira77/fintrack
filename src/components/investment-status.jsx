export default function InvestmentStatus({ title, amount, icon }) {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="bg-secondary flex h-8 w-8 items-center justify-center rounded-lg">
          {icon}
        </div>
        <p className="text-muted-foreground">{title}</p>
      </div>
      <p className="text-sm font-bold">{amount}%</p>
    </div>
  )
}
