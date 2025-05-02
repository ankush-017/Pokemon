import React, { useState } from "react";
import TypeFilter from "./TypeFilter";
import { X, SlidersHorizontal } from "lucide-react";

const Sidebar = ({ selectedType, setSelectedType }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Toggle button (only on mobile) */}
            <button
                onClick={() => setIsOpen(true)}
                className="md:hidden p-2 m-2 border rounded-md bg-gray-200 z-50 fixed top-2 left-2"
            >
                <SlidersHorizontal size={20} />
            </button>

            {/* Overlay on mobile when sidebar is open */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-30 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div
                className={`
                    fixed md:static top-0 left-0 z-50 bg-white h-full md:h-auto 
                    w-64 md:w-1/4 lg:w-1/5 p-4 border-r shadow md:shadow-none 
                    transform ${isOpen ? "translate-x-0" : "-translate-x-full"} 
                    transition-transform duration-300 ease-in-out md:translate-x-0
                `}
            >
                <div className="flex justify-between items-center md:hidden mb-4">
                    <button onClick={() => setIsOpen(false)}>
                        <X />
                    </button>
                </div>
                <h2 className="text-lg text-center mt-3 mb-5 font-semibold">Filters</h2>
                <TypeFilter selectedType={selectedType} setSelectedType={setSelectedType} />
            </div>
        </>
    );
};

export default Sidebar;