export type Sex = "male" | "female";
export type DoseMode = "perDose" | "perDay";

export const num = (s: string): number => (s.trim() === "" ? NaN : Number(s));

export function fmt(n: number, digits = 2): string {
  return Number.isFinite(n) ? String(Number(n.toFixed(digits))) : "-";
}

export function idealBodyWeight(sex: Sex, heightCm: number): number {
  const inchesOver60 = Math.max(heightCm / 2.54 - 60, 0);
  return (sex === "male" ? 50 : 45.5) + 2.3 * inchesOver60;
}

export function adjustedBodyWeight(ibwKg: number, actualKg: number): number {
  return ibwKg + 0.4 * (actualKg - ibwKg);
}

export function bmi(weightKg: number, heightCm: number): number {
  const m = heightCm / 100;
  return weightKg / (m * m);
}

export function bmiCategory(value: number): string {
  if (value < 18.5) return "Underweight";
  if (value < 25) return "Normal weight";
  if (value < 30) return "Overweight";
  return "Obesity";
}

export function bsaMosteller(weightKg: number, heightCm: number): number {
  return Math.sqrt((heightCm * weightKg) / 3600);
}

export function cockcroftGault(p: {
  age: number;
  sex: Sex;
  weightKg: number;
  scr: number;
}): number {
  const base = ((140 - p.age) * p.weightKg) / (72 * p.scr);
  return p.sex === "female" ? base * 0.85 : base;
}

export function renalBand(crcl: number): string {
  if (crcl >= 90) return "90 or above";
  if (crcl >= 60) return "60 to 89";
  if (crcl >= 30) return "30 to 59";
  if (crcl >= 15) return "15 to 29";
  return "Below 15";
}

export function weightBasedDose(p: {
  dosePerKg: number;
  weightKg: number;
  mode: DoseMode;
  dosesPerDay: number;
  maxSingleMg?: number;
}) {
  const rawSingle =
    p.mode === "perDay"
      ? (p.dosePerKg * p.weightKg) / p.dosesPerDay
      : p.dosePerKg * p.weightKg;
  const capped =
    p.maxSingleMg !== undefined && p.maxSingleMg > 0 && rawSingle > p.maxSingleMg;
  const single = capped ? (p.maxSingleMg as number) : rawSingle;
  return { single, daily: single * p.dosesPerDay, capped };
}

export const infusionRate = (volumeMl: number, hours: number): number =>
  volumeMl / hours;

export const dropsPerMinute = (
  volumeMl: number,
  hours: number,
  dropFactor: number
): number => (volumeMl * dropFactor) / (hours * 60);

export const stockVolume = (c1: number, c2: number, v2: number): number =>
  (c2 * v2) / c1;