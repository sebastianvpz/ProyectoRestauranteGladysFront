import { dishDraftSchema, type DishDraft } from "@/modules/dishes";
import { Input, Textarea } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";

type DishFormProps = {
  action: (formData: FormData) => void | Promise<void>;
  defaults?: Partial<DishDraft>;
  submitLabel: string;
};

export function DishForm({ action, defaults = {}, submitLabel }: DishFormProps) {
  return (
    <form action={action} className="space-y-5">
      <Field name="name" label="Nombre" defaultValue={defaults.name} required />
      <Field
        name="description"
        label="Descripción"
        as="textarea"
        defaultValue={defaults.description}
        required
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          name="price"
          label="Precio (S/)"
          type="number"
          min="0"
          step="0.5"
          defaultValue={defaults.price?.toString() ?? ""}
          required
        />
        <div>
          <Label htmlFor="category">Categoría</Label>
          <Select id="category" name="category" defaultValue={defaults.category ?? "principal"}>
            {dishDraftSchema.shape.category.options.map((option) => (
              <option key={option} value={option} className="capitalize">
                {option}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <Field
        name="imageUrl"
        label="URL de imagen (opcional)"
        type="url"
        defaultValue={defaults.imageUrl}
        placeholder="https://..."
      />

      <div className="flex flex-wrap gap-6">
        <Switch name="available" label="Disponible" defaultChecked={defaults.available ?? true} />
        <Switch name="featured" label="Destacado" defaultChecked={defaults.featured ?? false} />
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="submit" size="lg">
          {submitLabel}
        </Button>
      </div>
    </form>
  );
}

function Field({
  name,
  label,
  as = "input",
  ...rest
}: {
  name: string;
  label: string;
  as?: "input" | "textarea";
} & React.InputHTMLAttributes<HTMLInputElement> & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      {as === "textarea" ? (
        <Textarea id={name} name={name} {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)} />
      ) : (
        <Input id={name} name={name} {...(rest as React.InputHTMLAttributes<HTMLInputElement>)} />
      )}
    </div>
  );
}

function Switch({
  name,
  label,
  defaultChecked,
}: {
  name: string;
  label: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-[#2D2013]">
      <input
        type="checkbox"
        name={name}
        defaultChecked={defaultChecked}
        className={cn(
          "h-4 w-4 cursor-pointer rounded border-[#D4A853]/40 text-[#C75D3A]",
          "focus:ring-2 focus:ring-[#C75D3A]/30",
        )}
      />
      {label}
    </label>
  );
}
