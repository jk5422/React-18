import React, { useEffect, useState } from "react";

// Helper: factorial
const factorial = (n) => {
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
};

function App() {
  const [size, setSize] = useState(0);
  const [numbers, setNumbers] = useState([]);
  const [modalData, setModalData] = useState(null);

  // Generate grid
  const generateGrid = (n) => {
    setSize(n);
    const total = n * n;
    const arr = Array.from({ length: total }, () =>
      Math.floor(Math.random() * total) + 1
    );
    setNumbers(arr);
  };

  useEffect(() => {
    generateGrid(3);
  }, []);


  return (
    <div className="min-h-screen flex flex-col items-center justify-start  p-8">
      {/* Buttons */}
      <div className="flex gap-4 mb-8">
        <button
          onClick={() => generateGrid(3)}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg shadow"
        >
          3x3
        </button>
        <button
          onClick={() => generateGrid(4)}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-lg shadow"
        >
          4x4
        </button>
        <button
          onClick={() => generateGrid(5)}
          className="bg-purple-500 hover:bg-purple-600 text-white font-semibold px-6 py-2 rounded-lg shadow"
        >
          5x5
        </button>
      </div>

      {/* Grid */}
      <div
        className={`grid gap-2`}
        style={{
          gridTemplateColumns: `repeat(${size}, minmax(80px, 1fr))`,
        }}
      >
        {numbers?.map((num, idx) => (
          <div
            key={idx}
            onClick={() =>
              setModalData({
                num,
                square: num * num,
                cube: num * num * num,
                factorial: factorial(num),
              })
            }
            className="flex items-center justify-center aspect-square border border-gray-400 rounded-md shadow cursor-pointer hover:bg-gray-200 font-bold text-lg"
          >
            {num}
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-6 rounded-2xl shadow-2xl w-80 text-center">
            <h2 className="text-xl font-bold mb-4 text-gray-700">
              Number Details
            </h2>
            <div className="space-y-2 text-gray-600">
              <p>
                <span className="font-semibold">Number:</span> {modalData.num}
              </p>
              <p>
                <span className="font-semibold">Square:</span> {modalData.square}
              </p>
              <p>
                <span className="font-semibold">Cube:</span> {modalData.cube}
              </p>
              <p>
                <span className="font-semibold">Factorial:</span>{" "}
                {modalData.factorial}
              </p>
            </div>
            <button
              onClick={() => setModalData(null)}
              className="mt-6 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg shadow"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
