import { ItemProgression } from "../ScoreContext";

const exponentialGrowth = (base: number, multiplier: number, level: number) => Math.round(base * Math.pow(multiplier, level));
export const limitOfItems: number = 101 as const

export const itemProgressions: Record<string, ItemProgression[]> = {
    heat: Array.from({ length: limitOfItems }, (_, i) => ({
        cost: exponentialGrowth(10, 1.2, i),
        gain: exponentialGrowth(10, 1.2, i),
        rate: exponentialGrowth(5000, 0.9, i),
    })),
    cold: Array.from({ length: limitOfItems }, (_, i) => ({
        cost: exponentialGrowth(15, 1.15, i),
        gain: exponentialGrowth(12, 1.15, i),
        rate: exponentialGrowth(5500, 0.92, i),
    })),
    wind: Array.from({ length: limitOfItems }, (_, i) => ({
        cost: exponentialGrowth(8, 1.25, i),
        gain: exponentialGrowth(8, 1.25, i),
        rate: exponentialGrowth(6000, 0.9, i),
    })),
    fire: Array.from({ length: limitOfItems }, (_, i) => ({
        cost: exponentialGrowth(20, 1.18, i),
        gain: exponentialGrowth(15, 1.18, i),
        rate: exponentialGrowth(7000, 0.85, i),
    })),
    earth: Array.from({ length: limitOfItems }, (_, i) => ({
        cost: exponentialGrowth(25, 1.14, i),
        gain: exponentialGrowth(20, 1.14, i),
        rate: exponentialGrowth(5500, 0.88, i),
    })),
    lightning: Array.from({ length: limitOfItems }, (_, i) => ({
        cost: exponentialGrowth(12, 1.22, i),
        gain: exponentialGrowth(12, 1.22, i),
        rate: exponentialGrowth(6000, 0.89, i),
    })),
    water: Array.from({ length: limitOfItems }, (_, i) => ({
        cost: exponentialGrowth(18, 1.2, i),
        gain: exponentialGrowth(14, 1.2, i),
        rate: exponentialGrowth(6500, 0.9, i),
    })),
    poison: Array.from({ length: limitOfItems }, (_, i) => ({
        cost: exponentialGrowth(22, 1.16, i),
        gain: exponentialGrowth(18, 1.16, i),
        rate: exponentialGrowth(5500, 0.88, i),
    })),
    metal: Array.from({ length: limitOfItems }, (_, i) => ({
        cost: exponentialGrowth(30, 1.1, i),
        gain: exponentialGrowth(25, 1.1, i),
        rate: exponentialGrowth(6000, 0.87, i),
    })),
    magic: Array.from({ length: limitOfItems }, (_, i) => ({
        cost: exponentialGrowth(35, 1.12, i),
        gain: exponentialGrowth(30, 1.12, i),
        rate: exponentialGrowth(6500, 0.85, i),
    })),
};
