/// <reference path="../typings/index.d.ts" />
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';

import person from './person';

export const app = express();
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/person', person);

// catch 404 and forward to error handler
app.use((req: Express.Request, res: Express.Response, next: Function) => {
  var err = new Error('Not Found');
  err['status'] = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {

    app.use((error: any, req, res, next) => {
    res.status(error['status'] || 500);
    res.send(error);
  });
}

// production error handler
// no stacktraces leaked to user
app.use((error: any, req, res, next) => {
  res.status(error['status'] || 500);
    res.send(error);
  return null;
});

