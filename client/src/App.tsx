import React from 'react';
import {useMutation, gql} from '@apollo/client';

const UPLOAD: any = gql`
	mutation uploadFile($file: Upload!) {
		uploadFile(file: $file) {
			url
		}
	}
`;

export default function App() {
	const [uploadFile]: any = useMutation(UPLOAD, {
		onCompleted: (data) => {
			console.log(data.uploadFile.url);

			// uploaded file, download link :)
			// window.location.href = data.uploadFile.url;
		},
	});

	const handleChange = (e: any) => {
		const file: any = e.target.files[0];

		if (!file) return '';

		uploadFile({variables: {file}});
	};

	return (
		<div className="app">
			<input type="file" onChange={(e) => handleChange(e)} />
		</div>
	);
}
