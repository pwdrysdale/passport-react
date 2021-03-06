import { gql, useQuery } from "@apollo/client";

const Homepage = () => {
    const ME = gql`
        query {
            me {
                id
                username
            }
        }
    `;

    const { data, error, loading } = useQuery(ME);

    console.log("Me from graphql: ", data);

    const logout = async () => {
        window.location.href = "http://localhost:4000/auth/logout";
    };

    return (
        <div>
            <h1>Who is me? - Coming from GraphQL</h1>
            {loading && <p>Me is loading</p>}
            {error && (
                <p>Me? Today I decided to sleep in, so there is an error</p>
            )}
            {data && <p> I Exist! {data && data.me && data.me.username}</p>}
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default Homepage;
