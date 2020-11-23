import React from 'react';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';

import {createUploadLink} from 'apollo-upload-client';

import App from './App';

const client = new ApolloClient({
	credentials: 'same-origin',
	link: createUploadLink({
		uri: 'http://localhost:5000/graphql',
	}),
	cache: new InMemoryCache(),
});

export default function Apollo() {
	return (
		<ApolloProvider client={client}>
			<App />
		</ApolloProvider>
	);
}
