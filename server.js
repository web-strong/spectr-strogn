const Application = require('./application');
const Middlewares = require('./system/require.routes');
const Router = require('./system/require.routes');

Application().listen(3000);
// Application().use(undefined,Middlewares);
Application().use(undefined,Router);