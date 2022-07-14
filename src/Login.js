import React, { useEffect } from "react";
// import * as admin from "firebase-admin";
import { Button, Center } from "@chakra-ui/react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  getAuth,
  signInAnonymously,
} from "firebase/auth";
import Admin from "./Admin";

export default function Login() {
  const googleAuthProvider = new GoogleAuthProvider();
  const auth = getAuth();
  useEffect(() => {}, []);

  const anonymousLoginFunction = () => {
    signInAnonymously(auth)
      .then((res) => {
        console.log("response anonymously : ", res);
      })
      .catch((err) => {
        console.log("error from anonymous login : ", err);
      });
  };

  const signIn = () => {
    signInWithPopup(auth, googleAuthProvider)
      .then((res) => {
        console.log("Google auth user : ", res);
      })
      .catch((err) => {
        console.log("Error from google popup : ", err);
      });
  };

  return (
    <div>
      <Center mt={5}>
        <Button mx={2} onClick={signIn}>
          Login with google
        </Button>

        <Button mx={2} onClick={anonymousLoginFunction}>
          Anonymous Login
        </Button>
        <Admin />
      </Center>
    </div>
  );
}
