export default function PolicyBanner({ inPolicy }: { inPolicy: boolean }) {
  return (
    <div className={`card p-3 mb-4 ${inPolicy ? 'border-green-300' : 'border-red-300'}`}>
      <p className="text-sm">
        {inPolicy ? 'This selection is within your company policy.' :
        'This selection is out-of-policy. Please add justification before checkout.'}
      </p>
    </div>
  )
}
