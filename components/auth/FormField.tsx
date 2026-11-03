import { forwardRef, InputHTMLAttributes } from "react";

/**
 * Labelled text input with an accessible error message.
 * Works with react-hook-form's `register` (forwards the ref).
 */

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	id: string;
	label: string;
	error?: string;
}

export const FormField = forwardRef<HTMLInputElement, Props>(
	({ id, label, error, className = "", ...inputProps }, ref) => {
		const errorId = `${id}-error`;

		return (
			<div>
				<label htmlFor={id} className="mb-1.5 block text-sm font-medium">
					{label}
				</label>
				<input
					ref={ref}
					id={id}
					aria-invalid={error ? true : undefined}
					aria-describedby={error ? errorId : undefined}
					className={`w-full rounded-2xl border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-accent focus:outline-none ${
						error ? "border-negative" : "border-border"
					} ${className}`}
					{...inputProps}
				/>
				{error && (
					<p id={errorId} className="mt-1.5 text-xs text-negative">
						{error}
					</p>
				)}
			</div>
		);
	},
);

FormField.displayName = "FormField";

export const submitButtonClass =
	"w-full rounded-full bg-accent px-4 py-3 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90 disabled:opacity-60";
