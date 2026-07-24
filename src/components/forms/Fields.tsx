import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
import type { FieldDef } from "@/lib/forms/configs";
import { cn } from "@/lib/utils";

const inputClass =
  "w-full rounded-md border border-border bg-white px-3.5 py-2.5 text-charcoal shadow-sm placeholder:text-slate/50 focus:border-gold focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold aria-[invalid=true]:border-red-500";

/**
 * Renders a single form field with an explicit <label> (never placeholder-only,
 * spec §18.6), accessible error messaging, and aria wiring.
 */
export function Field({
  field,
  register,
  error,
}: {
  field: FieldDef;
  register: (name: string) => UseFormRegisterReturn;
  error?: FieldError;
}) {
  const id = `f-${field.name}`;
  const errorId = `${id}-error`;
  const helpId = `${id}-help`;
  const describedBy =
    [field.help ? helpId : null, error ? errorId : null]
      .filter(Boolean)
      .join(" ") || undefined;
  const invalid = Boolean(error);

  // Checkbox (consent) — label sits beside the control.
  if (field.type === "checkbox") {
    return (
      <div className="sm:col-span-2">
        <div className="flex items-start gap-3">
          <input
            id={id}
            type="checkbox"
            aria-invalid={invalid}
            aria-describedby={describedBy}
            className="mt-1 h-5 w-5 shrink-0 rounded border-border text-gold accent-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            {...register(field.name)}
          />
          <label htmlFor={id} className="text-sm leading-relaxed text-slate">
            {field.label}
            {field.required && <RequiredMark />}
          </label>
        </div>
        <FieldError id={errorId} error={error} />
      </div>
    );
  }

  // Radio group.
  if (field.type === "radio") {
    return (
      <fieldset
        className="sm:col-span-2"
        aria-invalid={invalid}
        aria-describedby={describedBy}
      >
        <legend className="mb-2 block text-sm font-medium text-charcoal">
          {field.label}
          {field.required && <RequiredMark />}
        </legend>
        <div className="flex flex-wrap gap-4">
          {field.options?.map((opt) => (
            <label key={opt.value} className="flex items-center gap-2 text-sm text-charcoal">
              <input
                type="radio"
                value={opt.value}
                className="h-4 w-4 border-border text-gold accent-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                {...register(field.name)}
              />
              {opt.label}
            </label>
          ))}
        </div>
        <FieldError id={errorId} error={error} />
      </fieldset>
    );
  }

  return (
    <div className={cn(field.half ? "sm:col-span-1" : "sm:col-span-2")}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-charcoal">
        {field.label}
        {field.required && <RequiredMark />}
      </label>

      {field.type === "textarea" ? (
        <textarea
          id={id}
          rows={4}
          aria-invalid={invalid}
          aria-describedby={describedBy}
          placeholder={field.placeholder}
          className={inputClass}
          {...register(field.name)}
        />
      ) : field.type === "select" ? (
        <select
          id={id}
          aria-invalid={invalid}
          aria-describedby={describedBy}
          defaultValue=""
          className={inputClass}
          {...register(field.name)}
        >
          <option value="" disabled>
            Select…
          </option>
          {field.options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          type={field.type}
          inputMode={field.type === "tel" ? "tel" : undefined}
          autoComplete={field.autoComplete}
          aria-invalid={invalid}
          aria-describedby={describedBy}
          placeholder={field.placeholder}
          className={inputClass}
          {...register(field.name)}
        />
      )}

      {field.help && (
        <p id={helpId} className="mt-1.5 text-xs text-slate">
          {field.help}
        </p>
      )}
      <FieldError id={errorId} error={error} />
    </div>
  );
}

function RequiredMark() {
  return (
    <span className="ml-0.5 text-gold" aria-hidden="true">
      *
    </span>
  );
}

function FieldError({ id, error }: { id: string; error?: FieldError }) {
  if (!error) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-sm text-red-600">
      {error.message}
    </p>
  );
}
