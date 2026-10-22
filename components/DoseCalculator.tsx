"use client";

import { useState } from "react";
import { Field, SelectField, Panel, Grid, Results, Hint } from "@/components/ui";
import { fmt, num, weightBasedDose, type DoseMode } from "@/lib/formulas";

export default function DoseCalculator() {
  const [weight, setWeight] = useState("");
  const [dose, setDose] = useState("");
  const [mode, setMode] = useState<DoseMode>("perDay");
  const [freq, setFreq] = useState("");
  const [conc, setConc] = useState("");
  const [max, setMax] = useState("");

  const w = num(weight);
  const d = num(dose);
  const n = num(freq);
  const c = num(conc);
  const m = num(max);
  const valid = w > 0 && d > 0 && Number.isInteger(n) && n >= 1;

  let rows: { label: string; value: string }[] | null = null;
  let warning: string | undefined;

  if (valid) {
    const r = weightBasedDose({
      dosePerKg: d,
      weightKg: w,
      mode,
      dosesPerDay: n,
      maxSingleMg: m > 0 ? m : undefined,
    });
    rows = [
      { label: "Dose per administration", value: `${fmt(r.single)} mg` },
      { label: "Total per day", value: `${fmt(r.daily)} mg` },
    ];
    if (c > 0) {
      rows.push({ label: "Volume per dose", value: `${fmt(r.single / c)} mL` });
    }
    if (r.capped) {
      warning = `The calculated dose was above your maximum, so it was capped at ${fmt(m)} mg per dose.`;
    }
  }

  return (
    <Panel
      title="Weight-based dose"
      description="Work out the dose in mg, the daily total and the volume to draw up."
    >
      <Grid>
        <Field id="dose-weight" label="Patient weight" unit="kg" value={weight} onChange={setWeight} placeholder="20" />
        <SelectField
          id="dose-mode"
          label="Dose is given as"
          value={mode}
          onChange={(v) => setMode(v as DoseMode)}
          options={[
            { value: "perDay", label: "mg/kg per day (divided)" },
            { value: "perDose", label: "mg/kg per dose" },
          ]}
        />
        <Field id="dose-perkg" label="Dose" unit="mg/kg" value={dose} onChange={setDose} placeholder="15" />
        <Field id="dose-freq" label="Doses per day" value={freq} onChange={setFreq} placeholder="3" />
        <Field id="dose-conc" label="Concentration (optional)" unit="mg/mL" value={conc} onChange={setConc} placeholder="25" />
        <Field id="dose-max" label="Maximum single dose (optional)" unit="mg" value={max} onChange={setMax} placeholder="500" />
      </Grid>
      <Results rows={rows} warning={warning} />
      <Hint>
        Doses per day must be a whole number. Always check the product label for the recommended
        range and the maximum dose.
      </Hint>
    </Panel>
  );
}