"use client";

import { useState } from "react";
import { Field, SelectField, Panel, Grid, Results, Hint } from "@/components/ui";
import {
  adjustedBodyWeight,
  cockcroftGault,
  fmt,
  idealBodyWeight,
  num,
  renalBand,
  type Sex,
} from "@/lib/formulas";

export default function CrClCalculator() {
  const [age, setAge] = useState("");
  const [sex, setSex] = useState<Sex>("male");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [scr, setScr] = useState("");
  const [basis, setBasis] = useState("actual");

  const a = num(age);
  const w = num(weight);
  const h = num(height);
  const s = num(scr);
  const needsHeight = basis !== "actual";
  const valid = a > 0 && a < 140 && w > 0 && s > 0 && (!needsHeight || h > 0);

  let rows: { label: string; value: string }[] | null = null;
  let warning: string | undefined;

  if (valid) {
    let used = w;
    let usedLabel = "Actual body weight";

    if (needsHeight) {
      const ibw = idealBodyWeight(sex, h);
      if (w <= ibw) {
        usedLabel = "Actual body weight (below ideal)";
      } else if (basis === "ideal") {
        used = ibw;
        usedLabel = "Ideal body weight";
      } else {
        used = adjustedBodyWeight(ibw, w);
        usedLabel = "Adjusted body weight";
      }
    }

    const crcl = cockcroftGault({ age: a, sex, weightKg: used, scr: s });
    rows = [
      { label: "Weight used", value: `${fmt(used, 1)} kg` },
      { label: "Basis", value: usedLabel },
      { label: "Estimated CrCl", value: `${fmt(crcl, 1)} mL/min` },
      { label: "Approximate range", value: `${renalBand(crcl)} mL/min` },
    ];
    if (a < 18) {
      warning =
        "Cockcroft-Gault is meant for adults. For children, use a pediatric method such as the bedside Schwartz equation.";
    }
  }

  return (
    <Panel
      title="Creatinine clearance (Cockcroft-Gault)"
      description="Estimate kidney function to help with renal dose adjustment in adults."
    >
      <Grid>
        <Field id="crcl-age" label="Age" unit="years" value={age} onChange={setAge} placeholder="65" />
        <SelectField
          id="crcl-sex"
          label="Sex"
          value={sex}
          onChange={(v) => setSex(v as Sex)}
          options={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
          ]}
        />
        <Field id="crcl-weight" label="Actual weight" unit="kg" value={weight} onChange={setWeight} placeholder="70" />
        <Field id="crcl-scr" label="Serum creatinine" unit="mg/dL" value={scr} onChange={setScr} placeholder="1.2" />
        <SelectField
          id="crcl-basis"
          label="Weight to use"
          value={basis}
          onChange={setBasis}
          options={[
            { value: "actual", label: "Actual body weight" },
            { value: "ideal", label: "Ideal body weight" },
            { value: "adjusted", label: "Adjusted body weight" },
          ]}
        />
        {needsHeight && (
          <Field id="crcl-height" label="Height" unit="cm" value={height} onChange={setHeight} placeholder="170" />
        )}
      </Grid>
      <Results rows={rows} warning={warning} />
      <Hint>
        If creatinine is reported in µmol/L, divide by 88.4 to get mg/dL. This estimate is less
        reliable when kidney function is changing quickly. Check each drug&apos;s label for its own
        renal dosing thresholds.
      </Hint>
    </Panel>
  );
}