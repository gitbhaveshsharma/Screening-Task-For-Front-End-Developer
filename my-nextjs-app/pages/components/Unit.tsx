import React from "react";
import { ChevronDown } from "lucide-react";

interface UnitProps {
    unitIndex: number;
    size: string;
    color: string;
    onSizeChange: (value: string) => void;
    onColorChange: (value: string) => void;
}

const Unit: React.FC<UnitProps> = ({ unitIndex, size, color, onSizeChange, onColorChange }) => {
    return (
        <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 ml-6">Size</label>
                <div className="relative flex items-center">
                    <span className="mr-2">#{unitIndex + 1}</span>
                    <select
                        className="w-full h-11 pl-3 pr-8 bg-transparent border border-gray-300 focus:ring-0 focus:border-[#ff6B82] appearance-none"
                        value={size}
                        onChange={(e) => onSizeChange(e.target.value)}
                    >
                        <option value="" className="">Select Size</option>
                        {["XS", "S", "M", "L", "XL"].map((sizeOption) => (
                            <option key={sizeOption} value={sizeOption}>
                                {sizeOption}
                            </option>
                        ))}
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                    </div>
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                <div className="relative">
                    <select
                        className="w-full h-11 pl-3 pr-8 bg-transparent border border-gray-300 focus:ring-0 focus:border-[#ff6B82] appearance-none"
                        value={color}
                        onChange={(e) => onColorChange(e.target.value)}
                    >
                        <option value="">Select Color</option>
                        {["Black", "White", "Gray", "Navy", "Red"].map((colorOption) => (
                            <option key={colorOption} value={colorOption}>
                                {colorOption}
                            </option>
                        ))}
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Unit;
