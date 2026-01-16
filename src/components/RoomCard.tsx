type Props = { room: any, onRequest?: () => void };

export default function RoomCard({ room, onRequest }: Props) {
  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="text-lg font-bold">Room {room.roomNumber}</h2>
      <p>Type: {room.roomType}</p>
      <p>Capacity: {room.capacity}</p>
      <p>Services: {room.services}</p>
      <p>Status: {room.status}</p>
      {room.status === "Available" && onRequest && (
        <button className="mt-2 bg-green-500 text-white p-2 rounded w-full hover:bg-green-600" onClick={onRequest}>
          Request Room
        </button>
      )}
    </div>
  );
}
