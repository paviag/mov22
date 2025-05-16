import React, { useEffect, useState, createContext } from "react";
import eventService from "../services/eventService";
import categoryService from "../services/categoryService";

// Create the context
export const AppContext = createContext({
  loading: false,
  error: null,
  // events
  events: [],
  refreshEvents: () => {},
  getOneEvent: async (id) => {},
  createEvent: async data => {},
  updateEvent: async (data) => {},
  deleteEvent: async id => {},
  getEventsByType: async type => {},
  // category
  categories: [],
  refreshCategories: () => {},
  createCategory: async data => {},
  updateCategory: async (data) => {},
  deleteCategory: async id => {},
});

// Provider component
export const AppProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([])

  // Initial fetch
  const fetchEvents = async () => {
    setLoading(true);
    try {
      const data = await eventService.getAllEvents();
      setEvents(data);
    } catch (err) {
      setError("Failed to fetch events.");
      console.error("Failed to fetch events:", err);
    } finally {
      setLoading(false);
    }
  };
  
  // Initial fetch
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const data = await categoryService.getAllCategories();
      data.forEach((cat, index) => {
        cat.value = index
      })
      setEvents(data);
    } catch (err) {
      setError("Failed to fetch categories.");
      console.error("Failed to fetch categories:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
    fetchCategories();
  }, []);

  // Get one event
  const getOneEvent = async (id) => {
    setLoading(true);
    try {
      const data = await eventService.getEvent(id);
      return data;
    } catch (err) {
      setError("Failed to fetch event.");
      console.error("Failed to fetch event:", err);
    } finally {
      setLoading(false);
    }
  };

  // Get events by type
  const getEventsByType = async (type) => {
    setLoading(true);
    try {
      const data = await eventService.getEventsByType(type);
      return data;
    } catch (err) {
      setError("Failed to fetch events by type.");
      console.error("Failed to fetch events by type:", err);
    } finally {
      setLoading(false);
    }
  };

  // Create a new event
  const createEvent = async data => {
    setLoading(true);
    try {
      await eventService.createEvent(data);
      await fetchEvents();
    } catch (err) {
      setError("Failed to create event.");
      console.error("Create event failed:", err);
    } finally {
      setLoading(false);
    }
    return null;
  };

  // Create a new category
  const createCategory = async data => {
    setLoading(true);
    try {
      await categoryService.createCategory(data);
      await fetchCategories();
    } catch (err) {
      setError("Failed to create category.");
      console.error("Create category failed:", err);
    } finally {
      setLoading(false);
    }
    return null;
  };

  // Update an existing event
  const updateEvent = async event => {
    setLoading(true);
    try {
      await eventService.updateEvent(event);
      await fetchEvents();
    } catch (err) {
      setError("Failed to update event.");
      console.error("Update event failed:", err);
    } finally {
      setLoading(false);
    }
    return false;
  };

  // Update an existing category
  const updateCategory = async category => {
    setLoading(true);
    try {
      await categoryService.updateCategory(category);
      await fetchCategories();
    } catch (err) {
      setError("Failed to update category.");
      console.error("Update category failed:", err);
    } finally {
      setLoading(false);
    }
    return false;
  };

  // Delete an event by id
  const deleteEvent = async id => {
    setLoading(true);
    try {
      const success = await eventService.deleteEvent(id);
      if (success) {
        setEvents(prev => prev.filter(p => p._id !== id));
        return true;
      }
    } catch (err) {
      console.error("Delete event failed:", err);
    } finally {
      setLoading(false);
    }
    return false;
  };

  // Delete a category by id
  const deleteCategory = async id => {
    setLoading(true);
    try {
      const success = await categoryService.deleteCategory(id);
      if (success) {
        await fetchCategories();
        return true;
      }
    } catch (err) {
      console.error("Delete category failed:", err);
    } finally {
      setLoading(false);
    }
    return false;
  };

  const getCategoryTypeFromValue = (value) => {
    return categories.find((c) => c.value === value)?.type || "Unbound";
  };
  
  const getCategoryValueFromLabel = (label) => {
    return categories.find((c) => c.label === label)?.value || -1;
  };

  return (
    <AppContext.Provider
      value={{
        events,
        loading,
        error,
        refreshEvents: fetchEvents,
        getOneEvent,
        createEvent,
        updateEvent,
        deleteEvent,
        getEventsByType,
        categories,
        refreshCategories: fetchCategories,
        createCategory,
        updateCategory,
        deleteCategory,
        getCategoryTypeFromValue,
        getCategoryValueFromLabel
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
