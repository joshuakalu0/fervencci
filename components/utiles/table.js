const clientsModel = {
  name: {
    display: true,
    inputConfig: {
      type: "text",
      label: "Name",
      name: "name",
    },
  },
  email: {
    display: true,
    type: "String",
    inputConfig: {
      type: "email",
      label: "Email",
      name: "email",
    },
  },
  password: {
    type: "string",
    inputConfig: {
      type: "password",
      label: "password",
      name: "password",
    },
  },
  profile_photo: {
    type: "string",
    inputConfig: {
      type: "file",
      label: "profile_phote",
      name: "profile_phote",
    },
  },
  gender: {
    display: true,
    type: "string",
    inputConfig: {
      type: "select",
      label: "Name",
      name: "name",
      object: [
        { value: "male", label: "male" },
        { value: "female", label: "female" },
      ],
    },
  },
  location: {
    type: "string",
    inputConfig: {
      type: "text",
      label: "location",
      name: "location",
    },
  },
  createAt: {
    display: true,
    type: "string",
  },
};

export { clientsModel };
