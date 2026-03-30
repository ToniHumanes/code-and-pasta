import { Button } from "@site/src/components/core/Button/Button";
import { Input } from "@site/src/components/core/Input/Input";
import Table from "@site/src/components/core/Table";
import { useEffect, useState } from "react";

enum Endpoint {
  USERS = "users",
}

type UserDTO = {
  id: number;
  name: string;
  email: string;
};

type User = {
  id: string;
  name: string;
  email: string;
};

const fetchData = async (endpoint: Endpoint) => {
  const url = `https://jsonplaceholder.typicode.com/${endpoint}?_limit=10`;
  try {
    const response = await fetch(url, {
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(
        `Error en la respuesta: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error(`Error al obtener datos del endpoint ${endpoint}:`, error);
    return null;
  }
};

const transformUserData = (data: UserDTO[]): User[] => {
  return data.map((user) => ({
    id: user.id.toString(),
    name: user.name,
    email: user.email,
  }));
};

const usedEmails = new Set<string>();

export const SetDemo = () => {
  const [users, setUsers] = useState<User[]>([]);

  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");

  const [userError, setUserError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");

  useEffect(() => {
    saveData(Endpoint.USERS);
  }, []);

  const saveData = async (endpoint: Endpoint): Promise<void> => {
    const data: UserDTO[] = await fetchData(endpoint);
    if (!data) return;
    data.forEach((user: UserDTO) => usedEmails.add(user.email));

    setUsers(transformUserData(data));
  };

  const handleFormSubmit = (name: string, email: string) => {
    const isRequired = (value: string) => value && value.trim() !== "";

    if (!isRequired(name)) {
      setUserError("Nombre es obligatorio");
      return;
    }

    if (!isRequired(email)) {
      setEmailError("Email es obligatorio");
      return;
    }

    if (usedEmails.has(email)) {
      setEmailError("Este email ya está en uso");
      return;
    }

    // If all validations pass, add the new user or we should call an API to save the user
    const newUser: User = {
      id: (users.length + 1).toString(),
      name,
      email,
    };

    usedEmails.add(email);
    setUsers([...users, newUser]);
    setUserError("");
    setEmailError("");
    console.log("Formulario enviado:", { name, email });
  };

  return (
    <>
      <p>Usuarios:</p>

      <Table data={users} />

      {users.length > 0 && (
        <div
          style={{
            marginTop: "20px",
            marginBottom: "20px",
            display: "flex",
            gap: "1rem",
            width: "100%",
            maxWidth: "34rem",
            alignItems: "baseline",
          }}
        >
          <Input
            placeholder="Añadir Nombre"
            errorMessage={userError}
            onChange={(e) => setUserName(e.target.value)}
          />
          <Input
            placeholder="Añadir Email"
            errorMessage={emailError}
            onChange={(e) => setUserEmail(e.target.value)}
          />
          <Button
            label="Enviar"
            onClick={() => {
              handleFormSubmit(userName, userEmail);
            }}
          />
        </div>
      )}
    </>
  );
};
