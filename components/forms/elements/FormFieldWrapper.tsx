"use client";

import { Label } from "@radix-ui/react-label";
import { memo, useId } from "react";
import { cn } from "@/lib/utils";
import { FormFieldWrapperProps } from "@/types";

/**
 * @function FormFieldWrapper
 * @description A wrapper component for form fields that provides consistent labeling, error display, hints, and accessibility features.
 * @param props.label - The label text for the form field.
 * @param props.error - An error message to display for the form field.
 * @param props.hint - A hint text to display for the form field.
 * @param props.required - Indicates if the field is required, displaying an asterisk.
 * @param props.showHint - Controls the visibility of the hint text.
 * @param props.description - A descriptive text for the form field.
 * @param props.disabled - If true, the field and its label will appear disabled.
 * @param props.wrapperClass - Additional CSS classes for the wrapper div.
 * @param props.children - A render prop that provides the generated `id` and `describedBy` for the input element.
 * @returns A React element wrapping the form field with accessibility and styling.
 */
const FormFieldWrapper = ({
  label,
  error,
  hint,
  required,
  showHint,
  description,
  disabled,
  wrapperClass,
  children,
}: FormFieldWrapperProps) => {
  const id = useId();
  const hasError = !!error;

  const describedBy = error ? `${id}-error` : hint && showHint ? `${id}-hint` : undefined;

  return (
    <div
      className={cn(
        "space-y-2 [--ring:var(--color-indigo-300)] *:not-first:mt-2 in-[.dark]:[--ring:var(--color-indigo-900)]",
        wrapperClass,
      )}
    >
      {label && (
        <Label
          htmlFor={id}
          className={cn(
            "text-sm font-medium leading-none",
            hasError && "text-destructive",
            required && "after:content-['*'] after:ml-0.5 after:text-destructive",
            disabled && "opacity-50 cursor-not-allowed",
          )}
        >
          {label}
        </Label>
      )}

      {description && (
        <p className={cn("text-xs text-muted-foreground", disabled && "opacity-50")}>
          {description}
        </p>
      )}

      {children(id, describedBy)}

      {error && (
        <p id={`${id}-error`} className="text-xs text-destructive" role="alert" aria-live="polite">
          {error}
        </p>
      )}

      {hint && showHint && !error && (
        <p id={`${id}-hint`} className="text-xs text-muted-foreground">
          {hint}
        </p>
      )}
    </div>
  );
};

export default memo(FormFieldWrapper);
