import { Corporate, Response } from "../types";

interface Section {
  key: string;
  label: string;
  fields: { label: string; value: string | number | boolean }[];
}

export const getIndividualSections = (data: Response): Section[] => {
  return [
    {
      key: "personalDetails",
      label: "Personal Details",
      fields: [
        { label: "First Name", value: data?.firstName },
        { label: "Surname", value: data?.surName },
        { label: "Date of Birth", value: data?.dob },
        { label: "Nationality", value: data?.nationality },
        // Add more fields as needed
      ],
    },
    {
      key: "residentialAddress",
      label: "Residential Address",
      fields: [
        { label: "Address Line", value: data?.residential.address },
        { label: "City", value: data?.residential.city },
        { label: "State", value: data?.residential.state },
        { label: "Zip Code", value: data?.residential.zipCode },
        // Add more fields as needed
      ],
    },
    {
      key: "image",
      label: "Image",
      fields: [{ label: "", value: data?.documents.identity }],
    },
    {
      key: "contactDetails",
      label: "Contact Details",
      fields: [
        { label: "Name of Contact Person", value: data?.surName },
        { label: "Email", value: data?.email },
        { label: "Phone Number", value: data?.phone },
        { label: "Designation", value: data?.employmentStatus },
        // Add more fields as needed
      ],
    },
  ];
};

export const getCorporateSections = (data: Corporate): Section[] => {
  return [
    {
      key: "companyDetails",
      label: "Company Details",
      fields: [
        { label: "Company Name", value: data?.companyName },
        { label: "Company Website", value: data?.companyWebsite },
        { label: "Registration Number", value: data?.registrationNumber },
        { label: "Company Phone Number", value: data?.companyPhoneNumber },
        // Add more fields as needed
      ],
    },
    {
      key: "residentialAddress",
      label: "Address",
      fields: [
        { label: "Address Line", value: data?.address.address },
        { label: "City", value: data?.address.city },
        { label: "State", value: data?.address.state },
        { label: "Zip Code", value: data?.address.zipCode },
        // Add more fields as needed
      ],
    },
    {
      key: "contactDetails",
      label: "Contact Person",
      fields: [
        { label: "Name", value: data?.contact.nameOfContact || "N/A" },
        { label: "Designation", value: data?.contact.designation || "N/A" },
        { label: "Phone Number", value: data?.contact.phoneNumber || "N/A" },
        { label: "Email", value: data?.contact.email || "N/A" },
        // Add more fields as needed
      ],
    },
    {
      key: "directorDetails",
      label: "Director Details",
      fields: [
        {
          label: "Director Name",
          value: data?.director?.directorName || "N/A",
        },
        {
          label: "Director Designation",
          value: data?.director.designation || "N/A",
        },
        {
          label: "Director Phone Number",
          value: data?.director.phoneNumber || "N/A",
        },
        { label: "Director Email", value: data?.director.email || "N/A" },
        {
          label: "Director NIN",
          value: data?.director.nin?.toString() || "N/A",
        },
        // Add more fields as needed
      ],
    },
  ];
};
