import { createContext, useState } from "react";
import { doctors } from "../assets/assets";

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const currencySymbol = "/=";

    // Store booked appointments
    const [appointments, setAppointments] = useState([]);

    // Function to add a new appointment
    const bookAppointment = (appointment) => {
        setAppointments((prev) => [...prev, appointment]);
    };

    // **User State Management:**
    const [user, setUser] = useState(null); // Initialize user state to null (no user logged in initially)

    const value = {
        doctors,
        currencySymbol,
        appointments,
        bookAppointment,
        user,         // **Include user state in the value**
        setUser,      // **Include setUser function in the value**
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;