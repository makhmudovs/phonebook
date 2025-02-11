import { useEffect, useState } from "react";
import PersonService from "./services/person";
import Filter from "./components/filter/Filter";
import PersonForm from "./components/personForm/PersonForm";
import Persons from "./components/persons/Persons";
import Notification from "./components/notification/Notification";

const App = () => {
  const [persons, setPersons] = useState<any[]>([]);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filterName, setFilterName] = useState("");
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("green");

  const getPersons = () => {
    PersonService.getAll().then((persons) => {
      setPersons(persons);
    });
  };

  const handleFilterName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setFilterName(query);
  };

  const handleNewName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  };

  const handleNewPhone = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewPhone(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newName === "" || !newName || newPhone === "" || !newPhone) {
      return;
    }

    // Check if the name already exists
    const existingEntry = persons.find((entry) => entry.name === newName);
    const existingPhone = persons.find((entry) => entry.number === newPhone);

    if (existingPhone) {
      setMessage(
        `${newPhone} is already in the phonebook, please provide a new phone`
      );
      setColor("red");
      setTimeout(() => {
        setMessage("");
        setColor("green");
      }, 5000);
      return;
    }

    const personObject = {
      name: newName,
      number: newPhone,
    };

    if (existingEntry) {
      console.log("we have a user with this name already ", existingEntry);

      const sure = confirm(
        "we have a user with this name already, do you want to update the number for this person"
      );

      if (sure) {
        PersonService.updateContact(existingEntry._id, personObject)
          .then((updatedPerson) => {
            console.log("updated user data ", updatedPerson);
            getPersons();
            setMessage(`${newPhone} for user: ${newName} updated successfully`);
            setNewName("");
            setNewPhone("");
            setTimeout(() => {
              setMessage("");
            }, 5000);
          })
          .catch((err) => {
            console.error(
              "error occured while updating the users new number",
              err
            );
            console.error("update contact data err", err);
            setMessage(`${err} occured`);
            setColor("red");
            setTimeout(() => {
              setMessage("");
              setColor("green");
            }, 5000);
          });
      }
    } else {
      PersonService.create(personObject)
        .then((returnData) => {
          console.log("post user data ", returnData);
          // setPersons(persons.concat(returnData));
          getPersons();
          setMessage(`${newName} added successfully`);
          setNewName("");
          setNewPhone("");
          setTimeout(() => {
            setMessage("");
          }, 5000);
        })
        .catch((err) => {
          console.error("post user data err", err);
          setMessage(`${err.response.data.error} occured`);
          setColor("red");
          setTimeout(() => {
            setMessage("");
            setColor("green");
          }, 5000);
        });
    }
  };

  // Filter the persons array based on the filterName
  const filteredPersons = filterName
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(filterName.toLowerCase())
      )
    : persons;

  const handleDelete = (id: string) => {
    console.log("deleting the contact with id: ", id);
    const sure = confirm(`Are you sure u want to delete person with ${id}`);
    if (sure) {
      //delete
      PersonService.deleteContact(id)
        .then(() => {
          setMessage("Deleted successfully");
          getPersons();
          setTimeout(() => {
            setMessage("");
          }, 5000);
        })
        .catch((err) => {
          setMessage(`${err} occured`);
          setColor("red");
          setTimeout(() => {
            setMessage("");
            setColor("green");
          }, 5000);
        });
    }
  };

  useEffect(() => {
    getPersons();
  }, []);
  return (
    <div>
      <h2>Phonebook 001</h2>
      <Notification color={color} message={message} />
      <Filter filterName={filterName} handleFilterName={handleFilterName} />
      <h3>Add a new</h3>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        handleNewName={handleNewName}
        newPhone={newPhone}
        handleNewPhone={handleNewPhone}
      />
      <h3>Numbers</h3>
      <Persons handleDelete={handleDelete} persons={filteredPersons} />
    </div>
  );
};

export default App;
