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

    const value = {
        doctors,
        currencySymbol,
        appointments, // Store booked appointments
        bookAppointment, // Function to add an appointment
    };

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
