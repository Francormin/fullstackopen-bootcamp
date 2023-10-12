import { useEffect, useState } from "react";
import "./App.css";
import { Message } from "./components/Message";
import { Filter } from "./components/Filter";
import { ContactForm } from "./components/ContactForm";
import { Contacts } from "./components/Contacts";
import contactService from "./services/contacts";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState({ error: false, content: "" });

  const handleChangeFilter = event => {
    setFilter(event.target.value);
  };

  const handleChangeName = event => {
    setName(event.target.value);
  };

  const handleChangeNumber = event => {
    setNumber(event.target.value);
  };

  const addContact = event => {
    event.preventDefault();
    const contactAlreadyAdded = contacts.find(contact => contact.name === name);

    if (contactAlreadyAdded) {
      if (window.confirm(`${name} is already added to phonebook, replace the old number with a new one?`)) {
        const contactObject = { ...contactAlreadyAdded, number };
        contactService
          .update(contactAlreadyAdded.id, contactObject)
          .then(returnedContact => {
            setContacts(contacts.map(contact => (contact.id !== returnedContact.id ? contact : returnedContact)));
            setMessage({ error: false, content: `${returnedContact.name}'s number has been updated successfully` });
            setTimeout(() => {
              setMessage({ ...message, content: "" });
            }, 5000);
          })
          .catch(error => {
            setMessage({ error: true, content: `Information of ${name} has already been removed from server` });
            setTimeout(() => {
              setMessage({ ...message, content: "" });
            }, 5000);
            console.error("put error:", error);
          });
      }
    } else {
      const contactObject = { name, number };
      contactService
        .create(contactObject)
        .then(returnedContact => {
          setContacts(contacts.concat(returnedContact));
          setMessage({ error: false, content: `${returnedContact.name} has been added successfully` });
          setTimeout(() => {
            setMessage({ ...message, content: "" });
          }, 5000);
        })
        .catch(error => console.error("´post error:", error));
    }

    setName("");
    setNumber("");
  };

  const removeContact = contact => {
    const { id, name } = contact;

    if (window.confirm(`Delete ${name} ?`)) {
      contactService
        .remove(id)
        .then(() => {
          setContacts(contacts.filter(contact => contact.id !== id));
          setMessage({ error: false, content: `${name} has been deleted successfully` });
          setTimeout(() => {
            setMessage({ ...message, content: "" });
          }, 5000);
        })
        .catch(error => console.error("delete error:", error));
    }
  };

  useEffect(() => {
    contactService
      .getAll()
      .then(initialContacts => setContacts(initialContacts))
      .catch(error => console.error("get error:", error));
  }, []);

  return (
    <>
      <h2>Phonebook</h2>
      {message.content.length ? <Message message={message} /> : null}
      <Filter filterHandler={handleChangeFilter} filter={filter} />

      <h3>Add a new contact</h3>
      <ContactForm
        nameHandler={handleChangeName}
        name={name}
        numberHandler={handleChangeNumber}
        number={number}
        submitHandler={addContact}
      />

      <h3>Contacts</h3>
      <Contacts filter={filter} contacts={contacts} deleteHandler={removeContact} />
    </>
  );
};

export default App;
