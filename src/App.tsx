import React, { useState } from "react";
import "./App.css";
import { generateAddressWithBits } from "../bitwiseHelper";

const App: React.FC = () => {
  const [input, setInput] = useState<string>("0");
  const [address, setAddress] = useState<string>("");

  const handleGenerate = () => {
    try {
      const positions = input.includes(",")
        ? input.split(",").map((pos) => Number(pos.trim()))
        : Number(input.trim());
      const generatedAddress = generateAddressWithBits(positions);
      setAddress(generatedAddress);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">
            Generate Hook Contract Address
          </h1>
          <p className="mt-2 text-gray-600">
            Enter bit positions to generate an Hook address:
          </p>
        </div>
        <div className="rounded-md shadow-sm -space-y-px">
          <div>
            <label htmlFor="positions" className="sr-only">
              Bit Position(s)
            </label>
            <input
              type="text"
              id="positions"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-yellow-200 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Bit Position(s) (comma-separated for multiple, 0-159)"
            />
          </div>
        </div>
        <div>
          <button
            onClick={handleGenerate}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Generate Address
          </button>
        </div>
        {address && (
          <div className="mt-6 p-4 bg-white rounded shadow-lg">
            <h2 className="text-lg font-bold text-gray-900">
              Generated Address
            </h2>
            <p className="break-all text-gray-700">{address}</p>
          </div>
        )}
        <div className="mt-6 p-4 bg-white rounded shadow-lg">
          <h2 className="text-lg font-bold text-gray-900">Example Usage</h2>
          <pre className="bg-gray-100 p-4 rounded text-sm text-gray-800">
            {`// Example with single bit position
uint160 flags = uint160(1 << 3);
address myAddr = address(flags);`}
          </pre>
          <pre className="bg-gray-100 p-4 rounded text-sm text-gray-800 mt-4">
            {`// Example with multiple bit positions
uint160 flags = uint160(1 << 3 | 1 << 91);
address myAddr = address(flags);`}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default App;
