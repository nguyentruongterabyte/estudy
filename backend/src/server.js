import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import viewEngine from './config/viewEngine';
import initWebRoutes from './route/web';
import connectDB from './config/connectDB';
import { logger } from './middleware/logEvents';
import errorHandler from './middleware/errorHandler';
import path from 'path';

require( 'dotenv' ).config();

let app = express();
const port = process.env.PORT || 6969;

// custom middleware logger
app.use( logger );

// Cross Origin Resource Sharing
const whiteList = [ process.env.URL_REACT ];
const corsOptions = {
  origin: ( origin, callback ) => {
    if ( whiteList.indexOf( origin ) !== -1 || !origin) {
      callback( null, true );
    } else {
      callback( new Error( 'Not allowed by CORS' ) );
    }
  },
  optionSuccessStatus: 200
}
app.use( cors(corsOptions) );


// Config app
app.use( bodyParser.json( { limit: '50mb' } ) );
app.use( bodyParser.urlencoded( { limit: '50mb', extended: true } ) );

viewEngine( app );
initWebRoutes( app );

connectDB();

app.all( '*', ( req, res ) => {
  res.status( 404 );
  if ( req.accepts( 'html' ) ) {
    res.sendFile( path.join( __dirname, 'views', '404.html' ) );
  } else if ( req.accepts( 'json' ) ) {
    res.json( { errCode: 1, errMessage: '404 Not Found' } );
  } else {
    res.type( 'txt' ).send( '404 Not Found' );
  }
})
  
app.use( errorHandler );


app.listen( port, () => {
  // callback
  console.log( 'Backend Nodejs is running on the port: ' + port )
} );

