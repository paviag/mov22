const categories = [
  { value: 0, label: "Explore all categories", iconName: "category" },
  { value: 1, label: "Female Empowerment", iconName: "female" },
  { value: 2, label: "Sexual Health", iconName: "health-and-safety" },
  { value: 3, label: "Justice & Advocacy", iconName: "gavel" },
  { value: 4, label: "Mental Health", iconName: "psychology" },
  { value: 5, label: "SexEd & Awareness", iconName: "school" },
  { value: 6, label: "Leadership & Career", iconName: "work" },
  { value: 7, label: "Family Health", iconName: "family-restroom" },
  { value: 8, label: "Creative Expression", iconName: "palette" },
  { value: 9, label: "Reproductive Rights", iconName: "balance" },
  { value: 10, label: "Self-Care & Wellness", iconName: "spa" },
  { value: 11, label: "Media & Storytelling", iconName: "mic" }
];

const getCategoryLabel = (value) => {
  return categories.find((c) => c.value === value)?.label || "Unknown Category";
};

const getCategoryValue = (label) => {
  return categories.find((c) => c.label === label)?.value || -1;
};

export { categories, getCategoryLabel, getCategoryValue };