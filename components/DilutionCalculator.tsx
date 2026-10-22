"use client";

import { useState } from "react";
import { Field, Panel, Grid, Results, Hint } from "@/components/ui";
import { fmt, num, stockVolume } from "@/lib/formulas";

export default function DilutionCalculator() {
  const [c1, setC1] = useState("");
  const [c2, setC2] = useState("");
  const [v2, setV2] = useState("");

  const stock = num(c1);
  const target = num(c2);
  const final = num(v2);
  const filled = stock > 0 && target > 0 && final > 0;
  const valid = filled && target <= stock;

  let rows: { label: string; value: string }[] | null = null;
  let warning: string | undefined;

  if (valid) {
    const v1 = stockVolume(stock, target, final);
    rows = [
      { label: "Stock solution to take", value: `${fmt(v1)} mL` },
      { label: "Diluent to add", value: `${fmt(final - v1)} mL` },
    ];
  } else if (filled) {
    warning = "The desired concentration cannot be higher than the stock concentration.";
  }

  return (
    <Panel
      title="Dilution (C1V1 = C2V2)"
      description="Work out how much stock to draw up and how much diluent to add."
    >
      <Grid>
        <Field id="dil-c1" label="Stock concentration" value={c1} onChange={setC1} placeholder="10" />
        <Field id="dil-c2" label="Desired concentration" value={c2} onChange={setC2} placeholder="2" />
        <Field id="dil-v2" label="Final volume" unit="mL" value={v2} onChange={setV2} placeholder="50" />
      </Grid>
      <Results rows={rows} warning={warning} />
      <Hint>
        Use the same unit for both concentrations, for example mg/mL or %. A 1% w/v solution is
        10 mg/mL.
      </Hint>
    </Panel>
  );
}