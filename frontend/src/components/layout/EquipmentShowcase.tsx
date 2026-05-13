"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MACHINES } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";

const categories = [
  "All",
  ...new Set(MACHINES.map((m) => m.category)),
];

export default function EquipmentShowcase() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredMachines =
    activeCategory === "All"
      ? MACHINES
      : MACHINES.filter(
          (machine) => machine.category === activeCategory
        );

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-secondary mb-4">
            Equipment Fleet
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Modern industrial equipment engineered to deliver
            excellence across construction, oil & gas, fabrication,
            and infrastructure projects.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-14">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-sm border transition-all duration-300
              ${
                activeCategory === category
                  ? "bg-primary text-white border-primary"
                  : "bg-white hover:bg-primary/10 border-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 md:columns-2 xl:columns-3 gap-6 space-y-6">

          {filteredMachines.map((machine, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-2xl group break-inside-avoid shadow-xl"
            >
              {/* Image */}
              <div className="overflow-hidden">
                <img
                  src={machine.image}
                  alt={machine.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 p-6 text-white">
                <Badge className="mb-3 bg-white/10 backdrop-blur-md border border-white/20">
                  {machine.category}
                </Badge>

                <h3 className="text-2xl font-bold leading-tight">
                  {machine.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}