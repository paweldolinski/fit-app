import Button from "./Button";
import * as React from "react";
import { UserContext } from "../context/userContext";
import { useContext } from "react";

const Tutorial = () => {
  const { setIsNewUser } = useContext(UserContext);

  return (
    <div className="tutorial">
      <h1>Workout</h1>
      <div className="tutorial__wrapper">
        <h3>Hello Arnie!</h3>
        <p>This is the Start Workout screen.</p>
        <p>
          From here, you can begin a workout from scratch or form templates you
          prepare in advance.
        </p>
        <p> Let’s walk you through your first workout in Arnie.</p>
        <Button
          name="letsDoIt"
          title="Let's do this!"
          onClick={() => setIsNewUser(false)}
        />
      </div>
    </div>
  );
};

export default Tutorial;
