"use client";

import { useState } from "react";
import { Field, SelectField, Panel, Grid, Results, Hint } from "@/components/ui";
import {
  adjustedBodyWeight,
  bmi,
  bmiCategory,
  bsaMosteller,
  fmt,
  idealBodyWeight,
  num,
  type Sex,
} from "@/lib/formulas";

export default function BodyCalculator() {
  const [sex, setSex] = useState<Sex>("male");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");

  const w = num(weight);
  const h = num(height);
  const valid = w > 0 && h > 0;

  let rows: { label: string; value: string }[] | null = null;

  if (valid) {
    const b = bmi(w, h);
    const ibw = idealBodyWeight(sex, h);
    rows = [
      { label: "BMI", value: `${fmt(b, 1)} kg/m²` },
      { label: "BMI category", value: bmiCategory(b) },
      { label: "Body surface area", value: `${fmt(bsaMosteller(w, h))} m²` },
      { label: "Ideal body weight", value: `${fmt(ibw, 1)} kg` },
    ];
    if (w > ibw) {
      rows.push({ label: "Adjusted body weight", value: `${fmt(adjustedBodyWeight(ibw, w), 1)} kg` });
    }
  }

  return (
    <Panel
      title="Body size"
      description="BMI, body surface area, ideal and adjusted body weight."
    >
      <Grid>
        <SelectField
          id="body-sex"
          label="Sex"
          value={sex}
          onChange={(v) => setSex(v as Sex)}
          options={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
          ]}
        />
        <Field id="body-weight" label="Weight" unit="kg" value={weight} onChange={setWeight} placeholder="70" />
        <Field id="body-height" label="Height" unit="cm" value={height} onChange={setHeight} placeholder="170" />
      </Grid>
      <Results rows={rows} />
      <Hint>
        BSA uses the Mosteller formula. Ideal body weight uses the Devine formula. Adjusted body
        weight is shown only when actual weight is above ideal.
      </Hint>
    </Panel>
  );
}