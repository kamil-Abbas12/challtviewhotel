// app/rooms/page.tsx or pages/rooms.tsx
import Image from "next/image";

const rooms = [
  {
    id: 1,
    name: "Family room",
    price: 5000,
    image: "/familyroom.jpeg",
  },
  {
    id: 2,
    name: "Standard Double Room",
    price: 3500,
    image: "/room2.jpeg",
  },
  {
    id: 3,
    name: "Single Room",
    price: 2000,
    image: "/rooma.jpg",
  },
  {
    id: 4,
    name: "Special View Family Room",
    price: 5000,
    image: "/familyroom2.jpeg",
  },
   {
    id: 5,
    name: "Double Room",
    price: 3500,
    image: "/pres.jpg",
  },
   {
    id: 6,
    name: "Single Room",
    price: 2000,
    image: "/room3.jpeg",
  },
];

export default function RoomsPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-20 md:py-10 px-4 md:px-10">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">Our Rooms</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition duration-300 flex flex-col"
          >
            <div className="relative w-full h-[300px] md:h-[400px]">
              <Image
                src={room.image}
                alt={room.name}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="p-5 flex flex-col justify-between flex-grow">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">{room.name}</h2>
              <div className="mt-auto text-right">
                <span className="text-lg font-bold text-green-600">
                  PKR {room.price.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
