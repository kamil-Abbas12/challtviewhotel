import { Suspense } from 'react'
import BookingFormClient from './BookingFormClient'

export default function BookingFormPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingFormClient />
    </Suspense>
  )
}
