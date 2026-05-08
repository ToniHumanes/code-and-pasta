import { Tag } from "@site/src/components/base/Tag";
import { Textarea } from "@site/src/components/base/Textarea";
import { JSX, useState } from "react";

type Person = {
  id: string;
  name: string;
  age: number;
  city: string;
  profession: string;
};

const people: Person[] = [
  {
    id: "1",
    name: "Carol",
    age: 18,
    city: "Los Angeles",
    profession: "trainee",
  },
  {
    id: "2",
    name: "Alice",
    age: 25,
    city: "New York",
    profession: "Designer",
  },
  {
    id: "3",
    name: "Lucas",
    age: 30,
    city: "New York",
    profession: "Designer",
  },
  {
    id: "4",
    name: "Camilo",
    age: 27,
    city: "New York",
    profession: "Designer",
  },
  {
    id: "5",
    name: "Charlie",
    age: 28,
    city: "Los Angeles",
    profession: "Teacher",
  },
  {
    id: "6",
    name: "Diana",
    age: 17,
    city: "Los Angeles",
    profession: "trainee",
  },
];

const stringifyPeople = JSON.stringify(people, null, 2);

export const MapDemo = (): JSX.Element => {
  const [peopleData, setPeopleData] = useState(stringifyPeople);

  const getRelationships = (people: Person[]): Map<string, string[]> => {
    const matches = new Map<string, string[]>();

    for (const key in people) {
      const currentPerson = people[key];

      for (const innerKey in people) {
        const nextPerson = people[innerKey];

        if (
          currentPerson.id !== nextPerson.id &&
          currentPerson.city.toLowerCase() === nextPerson.city.toLowerCase() &&
          currentPerson.profession.toLowerCase() ===
            nextPerson.profession.toLowerCase()
        ) {
          matches.set(
            currentPerson.name,
            matches.has(currentPerson.name)
              ? [...matches.get(currentPerson.name), nextPerson.name]
              : [nextPerson.name],
          );
        }
      }
    }

    return matches;
  };

  let relationships = new Map<string, string[]>();
  let hasInvalidJson = false;

  try {
    const parsedPeople = JSON.parse(peopleData);
    relationships = getRelationships(parsedPeople);
  } catch {
    hasInvalidJson = true;
  }

  return (
    <>
      <Textarea
        value={peopleData}
        rows={30}
        onChange={(data) => {
          setPeopleData(data);
        }}
      />

      {hasInvalidJson ? (
        <div>Invalid JSON data: revisa el formato antes de continuar.</div>
      ) : (
        Array.from(relationships).map(([key, values]) => {
          return (
            <div
              style={{
                display: "flex",
                width: "100%",
                gap: "8px",
                marginBottom: "8px",
                marginTop: "8px",
              }}
              key={`section-${key}`}
            >
              <Tag key={`label-key-${key}`} text={key} color="blue" />
              <span>{" ➡ "}</span>
              {values.map((value, index) => {
                return (
                  <Tag
                    key={`label-${key}-${index}`}
                    text={value}
                    color="yellow"
                  />
                );
              })}
            </div>
          );
        })
      )}
    </>
  );
};
