import { ApolloClient, InMemoryCache } from '@apollo/client'

export const client = new ApolloClient({
    uri: 'http://niuwenchai.cn:3000/api/graphql',
    cache: new InMemoryCache(),
});