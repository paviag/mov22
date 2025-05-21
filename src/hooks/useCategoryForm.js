import { useState, useEffect, useContext } from "react";
import { AppContext } from "../../context/AppProvider";

const useCategoryForm = (categoryId) => {
  const [categoryData, setCategoryData] = useState({
    label: "",
    type: "",
  });
  const { 
    createCategory, 
    updateCategory, 
    getOneCategory, 
    loading, 
    error, 
    setError,
  } = useContext(AppContext);

  const handleInputChange = (name, value) => {
    if (name === "label") {
      setCategoryData((prevData) => ({
        ...prevData,
        [name]: value,
        type: value.toLowerCase().replace(/\s+/g, "_"),
      }));
    }
  };

  const handleSubmit = async () => {
    if (categoryId !== undefined) {
      await updateCategory(categoryId, categoryData);
    } else {
      await createCategory(categoryData);
    }
  };

  useEffect(() => {
    const fetchCategory = async () => {
      if (categoryId !== undefined) {
        const category = await getOneCategory(categoryId);
        setCategoryData(category);
      }
    };
    fetchCategory();
  }, [categoryId]);

  return {
    categoryData,
    handleInputChange,
    handleSubmit,
    loading,
    error,
    setError,
  };
};

export default useCategoryForm;
