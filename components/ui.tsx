import type { ReactNode } from "react";

const inputClass =
  "w-full rounded-xl border border-white/10 bg-[#0a1330] px-4 py-3 text-white placeholder-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30";

type FieldProps = {
  id: string;
  label: string;
  unit?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export function Field({ id, label, unit, value, onChange, placeholder }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-white">
        {label} {unit && <span className="text-slate-400">({unit})</span>}
      </label>
      <input
        id={id}
        type="number"
        inputMode="decimal"
        step="any"
        min="0"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={inputClass}
      />
    </div>
  );
}

type SelectProps = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
};

export function SelectField({ id, label, value, onChange, options }: SelectProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-white">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={inputClass}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function Panel({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-7 shadow-xl shadow-black/20">
      <h2 className="font-display text-2xl font-bold text-white">{title}</h2>
      <p className="mt-2 mb-6 text-sm text-slate-400">{description}</p>
      {children}
    </div>
  );
}

export function Grid({ children }: { children: ReactNode }) {
  return <div className="grid gap-5 sm:grid-cols-2">{children}</div>;
}

export function Results({
  rows,
  warning,
}: {
  rows: { label: string; value: string }[] | null;
  warning?: string;
}) {
  return (
    <div className="mt-8" aria-live="polite">
      {warning && (
        <p className="mb-4 rounded-xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-200">
          {warning}
        </p>
      )}
      {rows ? (
        <dl className="divide-y divide-white/10 rounded-2xl border border-blue-500/30 bg-blue-500/10">
          {rows.map((r) => (
            <div key={r.label} className="flex items-center justify-between gap-4 px-5 py-4">
              <dt className="text-sm text-slate-300">{r.label}</dt>
              <dd className="font-display text-right text-xl font-bold text-white">{r.value}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <p className="text-sm text-slate-500">Enter the values above to see the result.</p>
      )}
    </div>
  );
}

export function Hint({ children }: { children: ReactNode }) {
  return <p className="mt-4 text-xs leading-relaxed text-slate-500">{children}</p>;
}