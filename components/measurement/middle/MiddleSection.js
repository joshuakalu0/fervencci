import { measurement_data } from "../../../lib/form_data/measurement_data";
import FileImage from "../FileImage";
import Imagefetch from "../Imagefetch";

export default function MiddleSection({ setter }) {
  return (
    <div className='flex justify-center flex-wrap items-center max-h-[200px]'>
      <FileImage setter={setter} data={measurement_data.material} />
      <Imagefetch setter={setter} data={measurement_data.design_choice} />
    </div>
  );
}
