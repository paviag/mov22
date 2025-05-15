const categories = [
  { 
    label: "All", 
    type: "", 
    iconName: "dashboard-customize", 
    value: 0 
  },
  {
    label: "Sexual Health",
    type: "sexHealth",
    iconName: "health-and-safety",
    value: 1,
  },
  {
    label: "Identity",
    type: "Identity",
    iconName: "transgender",
    value: 2,
  },
  {
    label: "Cybertouch",
    type: "Cybertouch",
    iconName: "phone-iphone",
    value: 3,
  },
  { 
    label: "Unbound", 
    type: "Unbound", 
    iconName: "block", 
    value: 4 
  },
  { 
    label: "Culture", 
    type: "culture", 
    iconName: "menu-book", 
    value: 5 
  },
  {
    label: "Sexual Ed.",
    type: "education",
    icon: "local-fire-department",
    value: 6,
  },
  { 
    label: "Body Literacy", 
    type: "bodyliteracy", 
    iconName: "wc", 
    value: 7 
  },
];

const getCategoryTypeFromValue = (value) => {
  return categories.find((c) => c.value === value)?.type || "Unbound";
};

const getCategoryValueFromLabel = (label) => {
  return categories.find((c) => c.label === label)?.value || -1;
};

export { categories, getCategoryTypeFromValue, getCategoryValueFromLabel };