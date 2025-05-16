import { useState, useCallback, useEffect, useContext } from "react";
import useDropdown from "./useDropdown";
import { AppContext } from "../../context/AppProvider";
import dateParser from "../utils/dateParser";
import dateFormatter from "../utils/dateFormatter";

const useEventForm = (eventId) => {
  const { createEvent, updateEvent, getCategoryTypeFromValue, categories } = useContext(AppContext);
  const { getOneEvent } = useContext(AppContext);
  const [eventData, setEventData] = useState({
    title: "",
    type: "",
    location: "",
    date: new Date(),
    details: "",
    participants: 0,
    availableSpots: 0,
    path: "",
    isJoined: false,
  });
  const [subscribedNumber, setSubscribedNumber] = useState(0);
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

  const handleSubmit = async (eventId) => {
    // parse event date to
    if (eventId) {
      // update existing event
      await updateEvent({...eventData, date: dateFormatter(eventData.date)});
    } else {
      // create new event
      await createEvent({...eventData, date: dateFormatter(eventData.date)});
    }
  };

  useEffect(() => {
    const fetchEventData = async () => {
      if (eventId) {
        try {
          const fetchedData = await getOneEvent(eventId);
          console.log(fetchedData.date)
          console.log(dateParser(fetchedData.date))
          console.log("fetched and parsed above")
          fetchedData.date = dateParser(fetchedData.date);
          setEventData(fetchedData);
          setSubscribedNumber(
            fetchedData.participants - fetchedData.availableSpots
          );
          categoryDropdownProps.setValue(
            categories.find((e) => e.label === fetchedData.type)?.value
          );
        } catch (error) {
          console.error("Error fetching event data:", error);
        }
      }
    };

    fetchEventData();
  }, [eventId]);

  return {
    eventData,
    categoryDropdownProps: {
      ...categoryDropdownProps,
      onChangeValue: (v) =>
        handleInputChange("type", getCategoryTypeFromValue(v)),
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
    subscribedNumber,
    setEventData,
    setOpenDatePicker,
    setOpenTimePicker,
    handleInputChange,
    handleSubmit
  };
};

export default useEventForm;
