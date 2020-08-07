let axios = require( 'axios' );
let express = require( 'express' );

let builderApiKey = 'ec66fe28000b4f6886f63a667f100145 ';
let app = express();

// Put this route last, so you will catch anything not matched by your code
app.get( '*', async ( req, res ) => {
	let page = await axios
		.get(
			`https://cdn.builder.io/api/v1/html/page?url=${encodeURI(req.url)}&apiKey=${builderApiKey}`
		)
		.catch( handleError );

	if ( page && page.data ) {
		res.send( template( {
			body: page.data.data.html
		} ) );
	} else {
		res.send(
			template( {
				body: `<h2>No content found :(</h2><p>Have you published a Builder page for this URL?</p }>`,
			} )
		);
	}
} );

app.listen( 3000, () => {
	console.log( 'Listening on port 3000...' );
} );

let handleError = err => {
	if ( err.response.status === 404 ) {
		// Catch 404s - no page was found for this URL, that's fine
	} else {
		console.warn( err );
	}
	return null;
};

// Basic function to render content within a standard header and footer
// You can use any templating system you choose
let template = ( {
	body,
	title
} ) => `
  <!DOCTYPE html>
  <html>
  		  <!-- Required meta tags -->
		  <meta charset="utf-8">
		  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	  
    <head>
      <title>
        ${title || 'How To Build A Brand That Lasts For Decades'}
      </title>

		  <!-- Bootstrap CSS -->
		  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    </head>
    <body>
      <main>${body}</main>
      <footer>
	  </footer>
	  <!-- Optional JavaScript -->
	  <!-- jQuery first, then Popper.js, then Bootstrap JS -->
	  <script src = "https://code.jquery.com/jquery-3.3.1.slim.min.js"
	  integrity = "sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
	  crossorigin = "anonymous" > < /script> 
	  <script src = "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"
	  integrity = "sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1"
	  crossorigin = "anonymous" > < /script>
	  <script src = "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"
	  integrity = "sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM"
	  crossorigin = "anonymous" > < /script>
    </body>
  </html>
`;