import { Form, Formik } from "formik";
import {
  measurement_initial,
  measurement_validationSchema,
} from "./../lib/form_data/measurement_data";
import FirstSection from "../components/measurement/first/FirstSection";
import MiddleSection from "../components/measurement/middle/MiddleSection";
import LastSection from "../components/measurement/last/LastSection";
import FormButton from "../components/form/FormButton";
import Header from "../components/measurement/header/Header";
import InstructionModel from "../components/measurement/InstructionModel";
import { useState, useEffect } from "react";
import ImageModel from "../components/utiles_fun/ImageModel";

import useFetchUpload from "../components/hooks/useFetchUpload";
import { useRouter } from "next/router";
import axios from "axios";

export default function Measure({ thumbnail }) {
  console.log(thumbnail, "k");
  if (thumbnail) {
    const design = JSON.parse(thumbnail);
    measurement_initial.design_choice = [...design];
  }

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

export async function getServerSideProps(context) {
  const id = context.query.design;
  if (id) {
    const host = "https://fervencciD.onrender.com/api/v1";
    const url = `${host}/catalog/${id}`;
    return axios
      .get(url)
      .then((res) => {
        const data = res.data;
        return {
          props: {
            data,
          },
        };
      })
      .catch((err) => {
        return {
          props: {
            err,
          },
        };
      });
  }
  return {
    props: {},
  };
}
