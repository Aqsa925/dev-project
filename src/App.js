import React, { useState } from "react";

const App = () => {
  const [buses, setBuses] = useState([]);
  const [busName, setBusName] = useState("");
  const [route, setRoute] = useState("");
  const [selectedBus, setSelectedBus] = useState(null);

  const handleAdd = () => {
    if (busName && route) {
      const newBus = { id: Date.now(), busName, route };
      setBuses([...buses, newBus]);
      setBusName("");
      setRoute("");
    }
  };

  const handleDelete = (id) => {
    setBuses(buses.filter((bus) => bus.id !== id));
  };

  const handleEdit = (bus) => {
    setSelectedBus(bus);
    setBusName(bus.busName);
    setRoute(bus.route);
  };

  const handleUpdate = () => {
    setBuses(
      buses.map((bus) =>
        bus.id === selectedBus.id ? { ...bus, busName, route } : bus
      )
    );
    setSelectedBus(null);
    setBusName("");
    setRoute("");
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">Online Bus Reservation</h1>

      <div className="max-w-2xl mx-auto grid gap-4">
        <input
          className="p-2 border rounded"
          placeholder="Bus Name"
          value={busName}
          onChange={(e) => setBusName(e.target.value)}
        />
        <input
          className="p-2 border rounded"
          placeholder="Route"
          value={route}
          onChange={(e) => setRoute(e.target.value)}
        />

        {selectedBus ? (
          <button className="bg-yellow-500 text-white p-2 rounded" onClick={handleUpdate}>
            Update Bus
          </button>
        ) : (
          <button className="bg-blue-500 text-white p-2 rounded" onClick={handleAdd}>
            Add Bus
          </button>
        )}

        <div className="grid grid-cols-1 gap-4 mt-6">
          {buses.map((bus) => (
            <div key={bus.id} className="flex justify-between items-center bg-white p-4 rounded shadow">
              <div>
                <p className="font-semibold">Bus: {bus.busName}</p>
                <p className="text-gray-500">Route: {bus.route}</p>
              </div>
              <div className="flex gap-2">
                <button className="bg-green-500 text-white px-3 py-1 rounded" onClick={() => handleEdit(bus)}>
                  Edit
                </button>
                <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => handleDelete(bus.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
