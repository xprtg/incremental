// Generate exponential thresholds
const generateLevelThresholds = (base: number, exponent: number, levels: number) => {
    return Array.from({ length: levels }, (_, i) => Math.floor(base * Math.pow(exponent, i)));
};

// Example usage: base score of 100, exponent of 1.5, for 50 levels
export const LEVEL_THRESHOLDS = generateLevelThresholds(100, 1.5, 100);
