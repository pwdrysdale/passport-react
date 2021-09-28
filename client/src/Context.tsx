import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useQuery, gql } from "@apollo/client";

export const myContext = createContext({});

const Context = (props: any) => {
    const [userObject, setUserObject] = useState({});

    // -----------------------------------------
    // REST
    // const getUser = async () => {
    //     try {
    //         const { data } = await axios.get("http://localhost:4000/auth/me", {
    //             withCredentials: true,
    //         });

    //         if (data) {
    //             setUserObject(data);
    //         }
    //     } catch (err) {
    //         setUserObject({});
    //         console.error(err);
    //     }
    // };

    // useEffect(() => {
    //     getUser();
    // }, []);

    // -----------------------------------------
    // GRAPHQL
    // const ME = gql`
    //     query {
    //         me {
    //             id
    //             username
    //         }
    //     }
    // `;

    // useQuery(ME);

    return (
        <myContext.Provider value={userObject}>
            {props.children}
        </myContext.Provider>
    );
};

export default Context;
