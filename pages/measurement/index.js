import { Form, Formik } from "formik";
import {
  measurement_initial,
  measurement_validationSchema,
} from "../../lib/form_data/measurement_data";
import FirstSection from "../../components/measurement/first/FirstSection";
import MiddleSection from "../../components/measurement/middle/MiddleSection";
import LastSection from "../../components/measurement/last/LastSection";
import FormButton from "../../components/form/FormButton";
import Header from "../../components/measurement/header/Header";
import InstructionModel from "../../components/measurement/InstructionModel";
import { useState, useEffect } from "react";
import ImageModel from "../../components/utiles_fun/ImageModel";

import useFetchUpload from "../../components/hooks/useFetchUpload";
import { useRouter } from "next/router";
import axios from "axios";

export default function Measure() {
  const [isInstructionAction, setisInstructionAction] = useState(false);
  const [displayImages, setdisplayImages] = useState(null);
  const [makeRequest, isloading, upload_data] = useFetchUpload();
  const ro = useRouter();
  const query = ro.query.id;
  return (
    <div className='relative mb-[40px]'>
      <InstructionModel
        value={isInstructionAction}
        fun={setisInstructionAction}
      />
      {displayImages && (
        <ImageModel data={displayImages} fun={setdisplayImages} />
      )}

      <div>
        <Header fun={setisInstructionAction} />
        <div>
          <div>
            <div>
              <Formik
                initialValues={{ ...measurement_initial }}
                // validationSchema={measurement_validationSchema}
                enableReinitialize
                onSubmit={(values, actions) => {
                  let ma = values.material;
                  let de = values.design_choice;
                  values.images = [ma, de];
                  delete values.material;
                  delete values.design_choice;
                  console.log("submited", values);
                  const formdata = {
                    action: "create",
                    page: "measurement",
                  };
                  makeRequest(formdata, values);
                }}
              >
                <Form>
                  <div>
                    <FirstSection />
                    <MiddleSection setter={setdisplayImages} />
                    <LastSection />
                  </div>
                  <FormButton>Send measurement</FormButton>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
