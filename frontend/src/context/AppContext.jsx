import { createContext, useState, useContext } from "react";
import { doctors } from "../assets/assets";
import { AuthContext } from "./AuthContext";

export const AppContext = createContext(null); 

const AppContextProvider = (props) => {
    const currencySymbol = "/=";

    // Store booked appointments
    const [appointments, setAppointments] = useState([]);

    // Function to add a new appointment
    const bookAppointment = (appointment) => {
        setAppointments((prev) => [...prev, appointment]);
    };

<<<<<<< Updated upstream
    // **User State Management:**
    const [user, setUser] = useState(null); // Initialize user state to null (no user logged in initially)
=======
    // Use useContext with a fallback object to prevent errors if AuthContext
    // is not yet initialized.  Check for null explicitly and handle it
    const { user } = useContext(AuthContext) || { user: null };
>>>>>>> Stashed changes

    const value = {
        doctors,
        currencySymbol,
<<<<<<< Updated upstream
        appointments,
        bookAppointment,
        user,         // **Include user state in the value**
        setUser,      // **Include setUser function in the value**
=======
        appointments, // Store booked appointments
        setAppointments, 
        bookAppointment, // Function to add an appointment
        user,  // Expose user data from AuthContext
>>>>>>> Stashed changes
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;