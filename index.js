require('dotenv').config();
const express = require('express');
const cors = require('cors');

// utilities
const { dashboardConstructor } = require('./utilities/pd.utility');
const { 
  parseServersInitialization
} = require('./utilities/ps.utility');

// initial parse-server datas
const {apps, users} = require('./configs/parsedashboard.initialData');
const { parserServerInitialDatas } = require('./configs/parseserver.initialData');

// initialize express app
const app = express();
app.use(cors());  // allow cross-origin requests

// Dashboard initialization
const { dashboard }  = dashboardConstructor(apps, users);

const { serverInstances } = parseServersInitialization(...parserServerInitialDatas);


app.get('/p/ins01/sse-server', (req, res) => {
  res.status(200).set({
    "Cache-Control": "no-cache",
    "Content-Type": "text/event-stream"
  });

  res.write('data: Hello World!\n\n');
  setTimeout(() => res.write('data: I am Oguz\n\n'), 5 * 1000)
});

// Serve the Parse-Server instances on the /p URL prefix
serverInstances.forEach( serverInstance => {
  app.use(serverInstance.mountPath, serverInstance.api);
});

// Serve the Dashboard on the /dashboard URL prefix
app.use('/dashboard', dashboard);


var port = process.env.PORT || process.env.PORT_DEV || 1337;
const httpServer = require('http').createServer(app);
httpServer.listen(port, function() {
    console.log('Server running on port ' + port + '.');
});

