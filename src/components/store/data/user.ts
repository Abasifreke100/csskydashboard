export const userTableHeaders = [
  "Name",
  "User ID",
  "Status",
  "Date Created",
  "Date Created",
  "Date Activated",
];

export const profileFields = [
  {
    label: "Verification Status",
    value: "Verified", // Static value
    badgeClassName: "", // No special class for this
  },
  {
    label: "Registration Type",
    value: "Corporate", // Static value
    badgeClassName:
      "bg-grey whitespace-nowrap hover:bg-grey hover:text-white text-white rounded-md",
  },
  {
    label: "Date Registered",
    value: "2023-10-10", // Static value
    badgeClassName:
      "bg-grey hover:bg-grey hover:text-white text-white rounded-md",
  },
  {
    label: "Date Verified",
    value: "2024-05-05", // Static value
    badgeClassName:
      "bg-grey hover:bg-grey hover:text-white text-white rounded-md",
  },
];

export const staticSections = [
  {
    label: "Current Plan",
    fields: [
      { label: "Home Plan", value: "Good vibes - N30,000/month" },
     ],
  },
  {
    label: "Location",
    fields: [
      { label: "Address Line", value: "123 Mainlaind Bridge " },
      { label: "City", value: "Ikeja" },
      { label: "State", value: "Lagos" },
      { label: "Zip Code", value: "577347" },
    ],
  },
  {
    label: "Image",
    fields: [{ label: "Profile Image", value: "" }],
  },
  {
    label: "Profile",
    fields: [
      { label: "Surname", value: "John" },
      { label: "First Name", value: "Doe" },
      { label: "Username", value: "Doe" },
      { label: "Phone Number", value: "08108075767" },
      { label: "Alternative Phone Number", value: "08108075767" },
      { label: "Email", value: "john.doe@example.com" },
    ],
  },
];
