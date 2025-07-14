import dynamic from 'next/dynamic';

const RoomsClient = dynamic(() => import('./RoomsClient'), { ssr: false });

export default function RoomSelectionPage() {
  return <RoomsClient />;
}
