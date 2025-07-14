'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const RoomsClient = dynamic(() => import('./RoomsClient'), { ssr: false });

export default function RoomSelectionPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RoomsClient />
    </Suspense>
  );
}
