import { cva } from 'class-variance-authority'
import { Circle } from 'lucide-react'

const typeTransaction = cva(
  'bg-muted flex w-fit items-center gap-2 rounded-full px-2 py-[2px] text-xs font-bold',
  {
    variants: {
      variant: {
        earning: 'text-[var(--primary-green)] fill-[var(--primary-green)]',
        expense: 'text-[var(--primary-red)] fill-[var(--primary-red)]',
        investment: ' text-[var(--primary-blue)] fill-[var(--primary-blue)]',
      },
    },
  },
)

export const TransactionTypeBadge = ({ variant }) => {
  function getTitle(variant) {
    switch (variant) {
      case 'earning':
        return 'Ganho'
      case 'expense':
        return 'Gastou'
      case 'investment':
        return 'Investimento'
      default:
        return ''
    }
  }

  return (
    <div className={typeTransaction({ variant })}>
      <Circle size={10} className="fill-inherit" />
      {getTitle(variant)}
    </div>
  )
}
