import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./auth/AuthContext";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

export default function ProtectedRouteWithProfile({ children }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [isProfileComplete, setIsProfileComplete] = useState(false);

  useEffect(() => {
    const checkProfile = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const docRef = doc(db, "profiles", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists() && docSnap.data().profileCompleted) {
          setIsProfileComplete(true);
        }
      } catch (err) {
        console.error("Error checking profile:", err);
      }

      setLoading(false);
    };

    checkProfile();
  }, [user]);

  if (!user) return <Navigate to="/login" />;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg font-medium text-gray-600">
        Checking profile details...
      </div>
    );
  }

  if (!isProfileComplete) return <Navigate to="/profile" />;

  return children;
}
