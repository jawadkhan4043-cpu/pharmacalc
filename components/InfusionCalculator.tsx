"use client";

import { useState } from "react";
import { Field, SelectField, Panel, Grid, Results, Hint } from "@/components/ui";
import { dropsPerMinute, fmt, infusionRate, num } from "@/lib/formulas";

export default function InfusionCalculator() {
  const [volume, setVolume] = useState("");
  const [hours, setHours] = useState("");
  const [factor, setFactor] = useState("20");

  const v = num(volume);
  const t = num(hours);
  const f = Number(factor);
  const valid = v > 0 && t > 0;

  const rows = valid
    ? [
        { label: "Flow rate", value: `${fmt(infusionRate(v, t))} mL/hr` },
        { label: "Drip rate", value: `${fmt(dropsPerMinute(v, t, f), 0)} drops/min` },
      ]
    : null;

  return (
    <Panel
      title="IV infusion rate"
      description="Find the pump rate in mL/hr and the manual drip rate in drops per minute."
    >
      <Grid>
        <Field id="inf-volume" label="Total volume" unit="mL" value={volume} onChange={setVolume} placeholder="500" />
        <Field id="inf-hours" label="Infuse over" unit="hours" value={hours} onChange={setHours} placeholder="4" />
        <SelectField
          id="inf-factor"
          label="Drop factor"
          value={factor}
          onChange={setFactor}
          options={[
            { value: "10", label: "10 drops/mL" },
            { value: "15", label: "15 drops/mL" },
            { value: "20", label: "20 drops/mL" },
            { value: "60", label: "60 drops/mL (microdrip)" },
          ]}
        />
      </Grid>
      <Results rows={rows} />
      <Hint>The drop factor is printed on the IV set packaging. Check it before you calculate.</Hint>
    </Panel>
  );
}