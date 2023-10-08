import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import { Filter } from "./components/Filter";
import { ContactForm } from "./components/ContactForm";
import { Contacts } from "./components/Contacts";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [filter, setFilter] = useState("");

  const handleChangeFilter = event => {
    setFilter(event.target.value);
  };

  const handleChangeName = event => {
    setName(event.target.value);
  };

  const handleChangeNumber = event => {
    setNumber(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    const nameAlreadyAdded = contacts.find(contact => contact.name === name);
    nameAlreadyAdded
      ? alert(`${name} is already added to phonebook`)
      : setContacts(contacts.concat({ name: name, number: number }));
    setName("");
    setNumber("");
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/contacts")
      .then(response => setContacts(response.data))
      .catch(error => console.error("axios error:", error));
  }, []);

  return (
    <>
      <h2>Phonebook</h2>
      <Filter filterHandler={handleChangeFilter} filter={filter} />

      <h3>Add a new contact</h3>
      <ContactForm
        nameHandler={handleChangeName}
        name={name}
        numberHandler={handleChangeNumber}
        number={number}
        submitHandler={handleSubmit}
      />

      <h3>Contacts</h3>
      <Contacts filter={filter} contacts={contacts} />
    </>
  );
};

export default App;
