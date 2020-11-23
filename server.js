const {ApolloServer, gql} = require('apollo-server-express');
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const typeDefs = gql`
	type File {
		url: String!
	}

	type Query {
		hello: String!
	}

	type Mutation {
		uploadFile(file: Upload!): File!
	}
`;

const resolvers = {
	Query: {
		/*
			this query is not important, its here because every apollo programm
			needs at least one query...abs

			-> Query root type must be provided.
		*/
		hello: () => 'Hello World',
	},

	Mutation: {
		uploadFile: async (parent, {file}) => {
			const {createReadStream, filename} = await file;

			// create a read stream to read input and prepare to upload...
			const stream = createReadStream();

			// define name and location for upload and saving file
			const pathName = path.join(__dirname, `/public/uploads/${filename}`);

			// send result to output(upload the file)
			await stream.pipe(fs.createWriteStream(pathName));

			return {
				// location of the file in the node js server...
				// you will use this link to access uploaded file
				url: `http://localhost:5000/uploads/${filename}`,
			};
		},
	},
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

const app = express();
server.applyMiddleware({app, path: '/graphql'});

// define where to store files
app.use(express.static('public'));
app.use(cors());

app.listen({port: 5000}, () => {
	console.log(`🚀 Server ready at http://localhost:5000`);
});
