import { measurement_data_first } from "../../../lib/form_data/measurement_data";
import FormGenerator from "../../form";

export default function FirstSection() {
  return (
    <div>
      <FormGenerator object={measurement_data_first} />
    </div>
  );
}
