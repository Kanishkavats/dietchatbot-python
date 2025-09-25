import { QueryFormValues } from "@/src/utils/validations/FormValidation";
import { UseMutationResult } from "@tanstack/react-query";
import { useState } from "react";

type QueryFormProps = {
  initialData?: QueryFormValues;
  onClose: () => void;
  mode: "add" | "edit" | "view";
  createMutation: UseMutationResult<any, any, QueryFormValues, unknown>;
  updateMutation: UseMutationResult<any, any, { id: string; values: QueryFormValues }, unknown>;
  onPreview?: (data: QueryFormValues) => void;  // new prop for preview
};

const QueryForm: React.FC<QueryFormProps> = ({
  initialData,
  onClose,
  mode,
  createMutation,
  updateMutation,
  onPreview,
}) => {
  // form state, validation, etc...

  const [formValues, setFormValues] = useState<QueryFormValues>(initialData);

  // submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "add") {
      createMutation.mutate(formValues, {
        onSuccess: () => onClose(),
      });
    } else if (mode === "edit" && initialData) {
      updateMutation.mutate({ id: initialData.id, values: formValues }, {
        onSuccess: () => onClose(),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form inputs bound to formValues and setFormValues */}
      
      {/* Submit button */}
      <button type="submit">Save</button>

      {/* Preview button */}
      {onPreview && (
        <button
          type="button"
          onClick={() => onPreview(formValues)}
        >
          Preview
        </button>
      )}

      {/* Cancel/Close button */}
      <button type="button" onClick={onClose}>Cancel</button>
    </form>
  );
};


export default QueryForm