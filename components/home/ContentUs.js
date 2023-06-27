import { Button } from "@mui/material";
import axios from "axios";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import {
  report_data,
  report_initial,
  report_validationSchema,
} from "../../lib/form_data/report_data";
import FormGenerator from "../form";
import FormButton from "../form/FormButton";

export default function ContentUs() {
  const [issubmitting, setissubmitting] = useState(false);
  const [status, setstatus] = useState(null);
  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => {
        setstatus(null);
        clearTimeout(timer);
      }, 5000);
    }
  }, [status]);

  return (
    <div className='w-full justify-center items-center m-auto flex-col'>
      <div className='w-full flex justify-center items-center flex-col'>
        <div className='flex flex-col justify-center items-center'>
          <h2 className='header-font text-2xl text-gray-600 '>content us</h2>
          <div className='flex'>
            {status && (
              <small
                className={`text-${
                  status.status == "success" ? "blue" : "red"
                }-500 text-base italic `}
              >
                {status.message}
              </small>
            )}
          </div>
        </div>
        <div className='w-[90%]'>
          <Formik
            initialValues={report_initial}
            validationSchema={report_validationSchema}
            onSubmit={(values, actions) => {
              setissubmitting(true);

              let url = `/api/actions/create?target=report`;
              axios
                .post(url, values)
                .then((axiosdata) => {
                  setstatus({
                    status: "success",
                    message: "Your request was submitted successfully",
                  });
                  setissubmitting(false);
                  actions.resetForm();
                })
                .catch((err) => {
                  console.log(err);
                  setstatus({
                    status: "error",
                    message: "form was unable to submit",
                  });
                  setissubmitting(false);
                });
            }}
          >
            <Form>
              <FormGenerator object={report_data} />
              <FormButton nofull={false} processing={issubmitting}>
                send message
              </FormButton>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}
{
  /* <Formik
  initialValues={{ ...formdata.inital_data } || { ...formdata.initials }}
  // validate={user_validation}
  validationSchema={formdata.schema}
  enableReinitialize
  onSubmit={(values, actions) => {
    setissubmitting(true);
    if (formdata.action == "edit") {
      let url = `/api/actions/edit?target=${formdata.page}`;
      let body = {
        id: formdata.id,
        body: values,
      };
      axios
        .patch(url, body)
        .then((axiosdata) => {
          let id = axiosdata.data.data._id;
          ro.push(`?view=${target}&id=${id}`);
          console.log(axiosdata);
          setissubmitting(false);
        })
        .catch((err) => {
          setissubmitting(false);
          G_setter((obj) => {
            return { ...obj, Error: [err.response.data] };
          });
        });
    } else if (formdata.action == "create") {
      let url = `/api/actions/create?target=${formdata.page}`;
      axios
        .post(url, values)
        .then((axiosdata) => {
          console.log(axiosdata);
          ro.push(`?view=${target}&id=${axiosdata.data.data._id}`);
          setissubmitting(false);
        })
        .catch((err) => {
          setissubmitting(false);
          G_setter((obj) => {
            return { ...obj, Error: [err.response.data] };
          });
        });
    }
  }}
>
  <Form>
    <FormGenerator object={formdata.data} />
    <div className='flex space-x-2 justify-end mr-3 mt-3'>
      <div className='flex space-x-2 justify-end mr-3 mt-3'>
        {issubmitting && <CircularProgress />}

        <Button
          color='success'
          onClick={() => ro.push(`/dashboard?page=${formdata.page}`)}
          variant='contained'
        >
          CANCEL <Clear />
        </Button>
      </div>

      <FormButton nofull={true} processing={issubmitting}>
        {formdata.action} <Save />
      </FormButton>
    </div>
  </Form>
</Formik>; */
}
