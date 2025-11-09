"use client"
import React, { useState } from 'react'

const Herosection = () => {
    const [search, setSearch] = useState("");
  return (
      <section className="text-center py-16 bg-linear-to-b from-blue-50 to-white">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
          Explore Inspiring <span className="text-blue-600">Stories</span>
        </h1>
        <p className="text-gray-600 mb-6">
          Read insights from developers, designers, and creators worldwide.
        </p>
        <div className="flex justify-center">
          <input
            type="text"
            placeholder="Search for articles..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 w-50 md:w-96 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button className="bg-blue-600 text-white px-5 py-2 rounded-r-lg hover:bg-blue-700">
            Search
          </button>
        </div>
      </section>
  )
}

export default Herosection
