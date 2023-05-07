import React, { createContext, useEffect, useState } from "react";
import { firebase } from "../firebase.config";

export const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [sessionData, setSessionData] = useState(null);

  useEffect(() => {
    // Aquí puedes realizar la lógica para obtener los datos de sesión desde Firebase
    const fetchSessionData = async () => {
      try {
        const user = firebase.auth().currentUser;
        if (user) {
          // Obtener los datos de sesión del usuario actual desde Firebase Firestore
          const userDoc = await firebase.firestore().collection("users").doc(user.uid).get();
          const sessionData = userDoc.data();
          setSessionData(sessionData);
        }
      } catch (error) {
        console.log("Error al obtener los datos de sesión:", error);
      }
    };

    fetchSessionData();
  }, []);

  return (
    <SessionContext.Provider value={{ sessionData, setSessionData }}>
      {children}
    </SessionContext.Provider>
  );
};
