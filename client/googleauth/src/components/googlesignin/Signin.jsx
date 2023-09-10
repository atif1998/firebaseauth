import React, { useEffect, useState } from "react";
import { auth, provider } from "./config";
import { signInWithPopup } from "firebase/auth";
import Home from "./Home";
import { Button, Input } from "reactstrap";
import axios from "axios";
import UserData from "./UserData";

function SignIn() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userDataSubmitted, setUserDataSubmitted] = useState(false);

  const [user, setUser] = useState({
    email: "",
    password: "",
    age: 0,
  });

  const handleClick = async () => {
    await signInWithPopup(auth, provider)
      .then((result) => {
        const userData = result.user;
        const { displayName, email, age } = userData;
        localStorage.setItem("age", age);
        const extraFieldsSubmitted = localStorage.getItem(
          "extraFieldsSubmitted"
        );
        if (!extraFieldsSubmitted) {
          // User hasn't submitted extra fields yet, show the form
          localStorage.setItem("age", age);
          setUser({ displayName, email, age });
          setUserDataSubmitted(false); // Set to false to show the form
        } else {
          // Extra fields have been submitted, no need to show the form
          setUserDataSubmitted(true); // Set to true to hide the form
        }
        setUser({ displayName, email, age });

        localStorage.setItem("email", email);

        axios
          .post("http://localhost:8090/api/addUser", {
            displayName,
            email,
          })
          .then((response) => {
            const { age } = response.data;
            localStorage.setItem("age", age);
            console.log("age is", age);
            if (age !== undefined) {
              let { email } = response.data;
              localStorage.setItem("email", email);
            } else {
              let { email } = response.data;
              console.log("ok here is", email);
              localStorage.setItem("email", email);
            }
            setIsSignedIn(true);
          })

          .catch((error) => {
            console.error("Error sending user data to API:", error);
          });
      })
      .catch((error) => {
        console.error("Error signing in with Google:", error);
      });
  };

  useEffect(() => {
    const age = localStorage.getItem("age");

    console.log("age3", age);
    const emailFromLocalStorage = localStorage.getItem("email");
    console.log("email", emailFromLocalStorage);
    if (emailFromLocalStorage) {
      setUser({
        email: emailFromLocalStorage,
        displayName: null,
        age: localStorage.getItem("age"),
      });
    }
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: 500,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {!isSignedIn && !userDataSubmitted ? (
        <div>
          <h1
            style={{
              fontSize: 36,
              textAlign: "center",
              textTransform: "uppercase",
              backgroundColor: "#f0f0f0",
              borderRadius: 8,
              padding: 10,
              letterSpacing: 4,
            }}
          >
            SIGN IN
          </h1>
          <Input
            style={{
              marginBottom: 20,
              width: 500,
              height: 50,
              borderRadius: 60,
            }}
            id="name"
            name="name"
            placeholder="Name*"
            type="text"
          />
          <Input
            style={{
              marginBottom: 20,
              width: 500,
              height: 50,
              borderRadius: 60,
            }}
            id="email"
            name="email"
            placeholder="Email*"
            type="text"
          />
          <Button
            size="xl"
            color="primary"
            style={{
              marginBottom: 20,
              width: 500,
              height: 50,
              borderRadius: 60,
            }}
            onClick={handleClick}
          >
            Sign in with Google
          </Button>
        </div>
      ) : userDataSubmitted ? (
        <UserData />
      ) : (
        <Home />
      )}

      {/* {!isSignedIn ? (
        <Button
          size="xl"
          color="primary"
          style={{ marginBottom: 20, width: 500, height: 50, borderRadius: 60 }}
          onClick={handleClick}
        >
          Sign in with Google
        </Button>
      ) : (
        <Home />
      )} */}
      {/* {Number.isInteger(user.age) && user.age === 0 ? (
        <Button onClick={handleClick}>Sign in with Google</Button>
      ) : user.email !== "" && user.age === 0 ? (
        <Home />
      ) : (
        <UserData />
      )} */}
    </div>
  );
}

export default SignIn;
