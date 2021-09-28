import {
    ApolloClient,
    ApolloProvider,
    createHttpLink,
    InMemoryCache,
} from "@apollo/client";
import ReactDOM from "react-dom";
import App from "./App";
import Context from "./Context";

const link = createHttpLink({
    uri: "http://localhost:4000/graphql",
    credentials: "include",
});

const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
});

ReactDOM.render(
    <ApolloProvider client={client}>
        <Context>
            <App />
        </Context>
    </ApolloProvider>,
    document.getElementById("root")
);

export {};
