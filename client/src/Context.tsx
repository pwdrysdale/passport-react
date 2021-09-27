import { createContext, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";

export const myContext = createContext({});

const Context = (props: any) => {
    const [userObject, setUserObject] = useState({});

    const getUser = async () => {
        try {
            const { data } = await axios.get("http://localhost:4000/auth/me", {
                withCredentials: true,
            });

            if (data) {
                setUserObject(data);
            }
        } catch (err) {
            setUserObject({});
            console.error(err);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    return (
        <myContext.Provider value={userObject}>
            {props.children}
        </myContext.Provider>
    );
};

export default Context;
