import { useEffect, useState } from "react";
import { db } from "../firebase";
import { ref, onValue } from "firebase/database";
import { useAuth } from "../contexts/AuthContext";

export default function useAdmin() {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (!user) {
      setIsAdmin(false);
      return;
    }

    const userKey = user.email.replace(/\./g, "_");
    const adminRef = ref(db, `admins/${userKey}`);

    const unsub = onValue(adminRef, (snapshot) => {
      setIsAdmin(snapshot.val() === true);
    });

    return () => unsub();
  }, [user]);

  return isAdmin;
}
