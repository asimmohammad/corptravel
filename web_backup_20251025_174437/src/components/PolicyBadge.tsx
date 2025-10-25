import { clsx } from 'clsx'

export default function PolicyBadge({ status }: { status: 'in' | 'out' }) {
  return (
    <span className={clsx('badge', status === 'in' ? 'badge-in' : 'badge-out')}>
      {status === 'in' ? 'In-Policy' : 'Out-of-Policy'}
    </span>
  )
}
