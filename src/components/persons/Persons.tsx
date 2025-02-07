import React from "react";
import Person from "./person/Person";

interface PersonItems {
  name: string;
  number: string;
  _id: string;
}
interface PersonProps {
  persons: PersonItems[];
  handleDelete:(id:string)=>void;
}

const Persons: React.FC<PersonProps> = ({ persons,handleDelete }) => {
  return (
    <ul>
      {persons.map((person) => (
        <Person handleDelete={handleDelete} id={person._id} key={person._id} name={person.name} number={person.number} />
      ))}
    </ul>
  );
};

export default Persons;
