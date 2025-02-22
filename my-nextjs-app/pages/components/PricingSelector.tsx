"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, Plus } from "lucide-react"
import { Inter } from "next/font/google"
import Unit from "./Unit"

const inter = Inter({ subsets: ["latin"] })

interface PricingOption {
    title: number
    units: number
    discount: number
    price: number
    originalPrice: number
    isPopular?: boolean
}

export default function PricingSelector() {
    const [expandedSection, setExpandedSection] = useState<number | null>(null)
    const [selections, setSelections] = useState<{ [key: string]: { size: string; color: string } }>({})
    const [selectedPrice, setSelectedPrice] = useState<number>(0); // New state for selected price

    const pricingOptions: PricingOption[] = [
        {title: 1,  units: 2, discount: 15, price: 18.0, originalPrice: 24.0 },
        { title: 2, units: 2, discount: 20, price: 34.0, originalPrice: 24.0, isPopular: true},
        {title: 3, units: 2, discount: 30, price: 44.0, originalPrice: 24.0 },
    ]

    const handleSectionClick = (index: number) => {
        setExpandedSection((prev) => (prev === index ? null : index));
    };

    const handleSelectionChange = (unit: number, field: "size" | "color", value: string) => {
        setSelections((prev) => ({
            ...prev,
            [unit]: {
                ...prev[unit],
                [field]: value,
            },
        }))
    }

    const handlePriceSelection = (price: number) => {
        setSelectedPrice(price); // Update the selected price
    };

    return (
        <div className={`max-w-md mx-auto p-4 ${inter.className}`}>
            <div className="flex items-center justify-center gap-4 mb-6">
                <div className="h-[1px] w-24 bg-gray-300"></div>
                <h1 className="text-center text-2xl font-bold text-[#ff6B82]">YAY! It&apos;s BOGO</h1>
                <div className="h-[1px] w-24  bg-gray-300"></div>
            </div>

            <div className="space-y-4">
                {pricingOptions.map((option, index) => (
                    <motion.div
                        key={option.units}
                        className={`border overflow-hidden ${
                            option.isPopular ? "border-3 border-[#ff6B82] relative" : "border-gray-200"
                        } ${expandedSection === index ? "bg-[#fff6f7]" : "bg-white"}`}
                        initial={false}
                    >
                        {option.isPopular && (
                            <div className="absolute right-2 top-[-8px] bg-[#ff6B82] text-white px-3 py-1 text-sm z-100 rounded-md">
                                MOST POPULAR
                            </div>
                        )}

                        <motion.button
                            className={`w-full p-4 flex items-center justify-between ${
                                expandedSection === index ? "bg-[#fff6f7]" : "bg-white"
                            }`}
                            onClick={() => {
                                handleSectionClick(index);
                                handlePriceSelection(option.price); // Update the price on selection
                            }}
                        >
                            <div className="flex items-center gap-3">
                                <input
                                    type="radio"
                                    name="pricing"
                                    className="w-4 h-4 focus:ring-0 " 
                                    checked={selectedPrice === option.price}
                                    onChange={() => handlePriceSelection(option.price)}
                                />
                                <div className="text-left">
                                    <span className="font-medium">{option.title} Unit</span>
                                    <span className="ml-2 inline-block px-2 py-0.5 bg-[#ff6B82] text-[#ffffff] text-sm">
                                        {option.discount}% Off
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="text-right">
                                    <div className="font-bold">${option.price.toFixed(2)} USD</div>
                                    <div className="text-sm text-gray-500 line-through">${option.originalPrice.toFixed(2)} USD</div>
                                </div>
                                <motion.div animate={{ rotate: expandedSection === index ? 180 : 0 }} transition={{ duration: 0.2 }}>
                                    <ChevronDown className="w-5 h-5 text-gray-500" />
                                </motion.div>
                            </div>
                        </motion.button>

                        <AnimatePresence>
                            {expandedSection === index && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="  bg-[#fff6f7]"
                                >
                                    <div className="p-4 space-y-4">
                                        {Array.from({ length: option.units }).map((_, unitIndex) => (
                                            <Unit
                                                key={unitIndex}
                                                unitIndex={unitIndex}
                                                size={selections[unitIndex]?.size || ""}
                                                color={selections[unitIndex]?.color || ""}
                                                onSizeChange={(value) => handleSelectionChange(unitIndex, "size", value)}
                                                onColorChange={(value) => handleSelectionChange(unitIndex, "color", value)}
                                            />
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>

            <div className="mt-6 flex items-center justify-between text-sm">
                <span className="text-[#ff6B82]">Free Delivery</span>
                <span className="font-medium">Total: ${selectedPrice.toFixed(2)} USD</span>
            </div>
            <button className="w-full mt-4 bg-[#ff6B82] text-white py-3 hover:bg-[#ff5872] transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-[#ff6B82] focus:ring-offset-2" style={{ borderRadius: "10px" }}>
                <span className="flex items-center justify-center">
                    <Plus className="w-5 h-5 mr-2" />
                    Add to Cart
                </span>
            </button>

            <div className="text-center text-gray-400 text-sm mt-4">@ Powered by Pumper</div>
        </div>
    )
}
