import { useContext } from "react";
import { MyContext } from "../context";
import { CardData, CellData, dashboardCardItemsProps } from "../types";
import usersTestImage from "../assets/cSS.png";
import pdfFile from "../assets/S-34_E_104.pdf";

export const useProviderContext = () => {
  return useContext(MyContext);
};

export const dashboardCardItems: dashboardCardItemsProps[] = [
  {
    digit: "213,423",
    tag: "Total Registrations",
  },
  {
    digit: "213,423",
    tag: "Valid Registrations",
  },
  {
    digit: "213,423",
    tag: "Invalid Registrations",
  },
  {
    digit: "213,423",
    tag: "Corporate Registrations",
  },
  {
    digit: "213,423",
    tag: "Individual Registrations",
  },
  // {
  //   digit: "213,423",
  //   tag: "Abandoned Registrations",
  // },
];


export const rowData: CellData[] = [
  {
    type: "avatar",
    data: {
      src: "https://github.com/shadcn.png",
      alt: "@shadcn",
      fallback: "JD",
      name: "John Doe",
      email: "johndoe@gmail.com",
    },
  },
  {
    type: "text",
    data: "00123",
  },
  {
    type: "empty",
    data: "Verified",
  },
  {
    type:"text",
    data: "10/10/2023"
  },
  {
    type:"text",
    data: "10/10/2023"
  },
  {
    type:"text",
    data: "Corporate"
  },
  // {
  //   type: "text",
  //   data: "$250.00",
  //   align: "right",
  // },
];


export  const tableHeader = [
  "Name",
  "Registration Code",
  "Status",
  "Date Registered",
  "Date verified",
  "Type",
  "Action",
];


export const cardData: CardData[] = [
  {
    title: "Corporate Details",
    content: [
      {
        detailName: "Company Name",
        detailInfo: "John",
      },
      {
        detailName: "Company Website",
        detailInfo: "Doe",
      },
      {
        detailName: "Registration Number",
        detailInfo: "29/09/1989",
      },
      {
        detailName: "Company Phone Number",
        detailInfo: "Nigerian",
      },
    ],
  },
  {
    title: "Corporate Address",
    content: [
      {
        detailName: "Address Line",
        detailInfo: "123 Maryland Onigbongbo",
      },
      {
        detailName: "City",
        detailInfo: "Ikeja",
      },
      {
        detailName: "State",
        detailInfo: "Lagos",
      },
      {
        detailName: "Zip Code",
        detailInfo: "577347",
      },
    ],
  },
  {
    title: "Image",
    image: usersTestImage,
  },
  {
    title: "Contact Individual",
    content: [
      {
        detailName: "Name of Contact Person",
        detailInfo: "John",
      },
      {
        detailName: "Phone Number",
        detailInfo: "Ikeja",
      },
      {
        detailName: "Designation",
        detailInfo: "29/09/1989",
      },
      {
        detailName: "Email Address",
        detailInfo: "577347",
      },
    ],
  },
  {
    title: "Director Details",
    content: [
      {
        detailName: "Director Name",
        detailInfo: "John",
      },
      {
        detailName: "Designation",
        detailInfo: "29/09/1989",
      },
      {
        detailName: "Phone Number",
        detailInfo: "Lagos",
      },
      {
        detailName: "Email Address",
        detailInfo: "Nigerian",
      },
      {
        detailName: "NIN",
        detailInfo: "Nigerian",
      },
    ],
  },
  {
    title: "Document",
    content: [
      {
        detailName: "Selected Document",
        detailDescription: "CAC Registration Certificate",
        detailInfo: pdfFile,
      },
    ],
  },
];
