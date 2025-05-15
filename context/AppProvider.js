import React, { useEffect, useState, createContext } from "react";
import eventService from "../services/eventService";

// Create the context
export const AppContext = createContext({
  events: [],
  loading: false,
  error: null,
  refreshEvents: () => {},
  getOneEvent: async (id) => {},
  createEvent: async data => {},
  updateEvent: async (data) => {},
  deleteEvent: async id => {},
  getEventsByType: async type => {},
});

// Provider component
export const AppProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    fetchEvents();
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

  // Get one event
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
        getEventsByType
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
