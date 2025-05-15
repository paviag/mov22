import { parse } from "date-fns";
import { enUS } from "date-fns/locale";

export default function dateParser(dateString) {
  const eventDate = parse(dateString, "MMMM dd, yyyy, h:mm a", new Date(), {
    locale: enUS
  });
  return eventDate;
}
