import { useState, useCallback, useEffect } from "react";
import useDropdown from "./useDropdown";
import { categories, getCategoryLabel } from "../data/categories";
import { eventSampleList } from "../data/eventSampleList";

const useEventForm = (eventId) => {
  const [eventData, setEventData] = useState({
    name: "",
    category: "",
    location: "",
    date: new Date(),
    description: "",
    maxParticipants: 0,
    occupiedSpots: 0,
  });
  const categoryDropdownProps = useDropdown(categories.slice(1));
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [openTimePicker, setOpenTimePicker] = useState(false);

  const handleInputChange = useCallback((key, value) => {
    setEventData((prevData) => ({ ...prevData, [key]: value }));
  }, []);

  const onDismissTimePicker = useCallback(() => {
    setOpenTimePicker(false);
  }, []);

  const onDismissDatePicker = useCallback(() => {
    setOpenDatePicker(false);
  }, []);

  const onConfirmDatePicker = useCallback(({ date }) => {
    setOpenDatePicker(false);

    setEventData((prevData) => {
      const newDate = new Date(prevData.date);
      newDate?.setFullYear(date.getFullYear());
      newDate?.setMonth(date.getMonth());
      newDate?.setDate(date.getDate());
      
      return { ...prevData, date: newDate };
    });
    
  }, []);

  const onConfirmTimePicker = useCallback(
    ({ hours, minutes }) => {
      setOpenTimePicker(false);
      if (!eventData.date) return;

      setEventData((prevData) => {
        const newDate = new Date(prevData.date);
        newDate?.setHours(hours);
        newDate?.setMinutes(minutes);

        return { ...prevData, date: newDate };
      });
    },
    [eventData.date]
  );

  useEffect(() => {
    console.log("eventid in use:"+eventId)
    if (eventId) {
      setEventData(eventSampleList[eventId]);
      categoryDropdownProps.setValue(
        categories.find((e) => e.label === eventSampleList[eventId].category)
          ?.value
      );
    }
  }, []);

  return {
    eventData,
    categoryDropdownProps: {
      ...categoryDropdownProps,
      onChangeValue: (v) => handleInputChange("category", getCategoryLabel(v)),
    },
    timePickerProps: {
      visible: openTimePicker,
      onDismiss: onDismissTimePicker,
      onConfirm: onConfirmTimePicker,
    },
    datePickerProps: {
      visible: openDatePicker,
      onDismiss: onDismissDatePicker,
      onConfirm: onConfirmDatePicker,
    },
    setEventData,
    setOpenDatePicker,
    setOpenTimePicker,
    handleInputChange,
  };
};

export default useEventForm;
