import { Contact } from "./Contact";

export const Contacts = ({ filter, contacts }) => {
  const filteredContacts = contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase().trim()));

  return filter.length > 0
    ? filteredContacts.map(contact => <Contact key={contact.name} name={contact.name} number={contact.number} />)
    : contacts.map(contact => <Contact key={contact.name} name={contact.name} number={contact.number} />);
};
