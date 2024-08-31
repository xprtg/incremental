import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Cog, BarChart2, Boxes, Factory, Users } from 'lucide-react';
import UpgradeTab from "./UpgradeTab";
import WorkerTab from "./Worker/WorkerTab";
import MachinesTab from "./Machines/MachinesTab";

type NavbarItem = "Upgrades" | "Config" | "Resources" | "Machines" | "Workers";

export const navItems: { name: NavbarItem; icon: React.ReactNode; path: string; element: React.ReactElement }[] = [
    {
        name: "Upgrades", icon: <BarChart2 className="w-6 h-6" />, path: "/upgrades",
        element: <UpgradeTab />
    },
    {
        name: "Config", icon: <Cog className="w-6 h-6" />, path: "/config",
        element: <UpgradeTab />
    },
    {
        name: "Resources", icon: <Boxes className="w-6 h-6" />, path: "/resources",
        element: <UpgradeTab />
    },
    {
        name: "Machines", icon: <Factory className="w-6 h-6" />, path: "/machines",
        element: <MachinesTab />
    },
    {
        name: "Workers", icon: <Users className="w-6 h-6" />, path: "/workers",
        element: <WorkerTab />
    },
];

const NavBar = () => {
    const [selected, setSelected] = useState<NavbarItem>("Upgrades");

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex-shrink-0 flex items-center">
                        <span className="text-2xl font-bold text-blue-600">Incremental</span>
                    </div>
                    <div className="flex space-x-4">
                        {navItems.map((item) => (
                            <NavLink
                                to={item.path}
                                key={item.name}
                                onClick={() => setSelected(item.name)}
                                className={({ isActive }) =>
                                    `inline-flex items-center px-3 py-2 border-b-2 text-sm font-medium leading-5 transition duration-150 ease-in-out ${isActive
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`
                                }
                                aria-current={item.name === selected ? "page" : undefined}
                            >
                                {item.icon}
                                <span className="ml-2">{item.name}</span>
                            </NavLink>
                        ))}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
