import { Machine, MachineProgression } from "../ScoreContext";

export const machineProgression: Record<string, MachineProgression[]> = {
    iron_machine: [
        { rate: 1, gain: 0 },
        { rate: 2, gain: 2 },
        { rate: 4, gain: 4 },
    ],
    ether_machine: [
        { rate: 1, gain: 0 },
        { rate: 2, gain: 3 },
        { rate: 3, gain: 5 },
    ]
};

export const machineList: Machine[] = [
    {
        id: 'iron_machine',
        cost: 20,
        workers: [],
        rate: machineProgression['iron_machine'][0].rate,
        currency: 'Iron',
        name: "Iron Machine",
        gain: machineProgression['iron_machine'][0].gain
    },
    {
        id: 'ether_machine',
        cost: 20,
        workers: [],
        rate: machineProgression['ether_machine'][0].rate,
        currency: 'Ether',
        name: "Ether Machine",
        gain: machineProgression['ether_machine'][0].gain
    }
];
