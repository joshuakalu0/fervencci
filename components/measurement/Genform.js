import { measurement_data_last } from "../../lib/form_data/measurement_data";
import FormGenerator from "../form";

export default function Genform() {
  return (
    <div>
      <div className='flex flex-wrap'>
        <FormGenerator object={measurement_data_last} />
      </div>
    </div>
  );
}
