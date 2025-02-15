const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

// Serve static files from the 'assets' directory
app.use(express.static(path.join(__dirname, 'assets')));

// Route to serve the Template_Games.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/assets/gamefiles/SPACEBAR CLICKER/index.html'));
});

app.listen(port, () => {
  const messages = [
    "Initializing server...",
    "Loading modules...",
    "Setting up routes...",
    "Starting services...",
    "Connecting to the database...",
    "Applying middleware...",
    "Configuring session management...",
    "Enabling security features...",
    "Optimizing performance...",
    "Preparing static file serving...",
    "Setting up templating engine...",
    "Registering API endpoints...",
    "Integrating third-party services...",
    "Finalizing configuration...",
    "Checking environment variables...",
    "Loading configuration files...",
    "Initializing logging system...",
    "Setting up error handling...",
    "Starting background jobs...",
    "Configuring authentication...",
    "Setting up authorization...",
    "Initializing cache...",
    "Connecting to message broker...",
    "Setting up real-time communication...",
    "Configuring rate limiting...",
    "Setting up request validation...",
    "Initializing data models...",
    "Setting up database migrations...",
    "Configuring file uploads...",
    "Setting up email service...",
    "Configuring push notifications...",
    "Setting up analytics...",
    "Initializing monitoring...",
    "Configuring backup system...",
    "Setting up load balancer...",
    "Configuring SSL...",
    "Setting up DNS...",
    "Configuring domain...",
    "Setting up CI/CD pipeline...",
    "Configuring deployment scripts...",
    "Setting up staging environment...",
    "Configuring production environment...",
    "Setting up testing framework...",
    "Running unit tests...",
    "Running integration tests...",
    "Running end-to-end tests...",
    "Setting up code quality tools...",
    "Configuring code linting...",
    "Setting up code formatting...",
    `Server is running on http://localhost:${port}`
  ];

  let delay = 0;
  messages.forEach((message, index) => {
    setTimeout(() => {
      console.log(message);
    }, delay);
    delay += 50; // 1 second delay between messages
  });

  setTimeout(() => {
    console.log(` 
  ██████  ▄████▄   ██▀███  ▓█████  ▄▄▄       ███▄ ▄███▓ ██▓ ███▄    █   ▄████   █████    █████      ██▓███   ██▀███  ▓█████   ██████ ▓█████  ███▄    █ ▄▄▄█████▓  ██████ 
▒██    ▒ ▒██▀ ▀█  ▓██ ▒ ██▒▓█   ▀ ▒████▄    ▓██▒▀█▀ ██▒▓██▒ ██ ▀█   █  ██▒ ▀█▒▒██▓  ██▒▒██▓  ██▒   ▓██░  ██▒▓██ ▒ ██▒▓█   ▀ ▒██    ▒ ▓█   ▀  ██ ▀█   █ ▓  ██▒ ▓▒▒██    ▒ 
░ ▓██▄   ▒▓█    ▄ ▓██ ░▄█ ▒▒███   ▒██  ▀█▄  ▓██    ▓██░▒██▒▓██  ▀█ ██▒▒██░▄▄▄░▒██▒  ██░▒██▒  ██░   ▓██░ ██▓▒▓██ ░▄█ ▒▒███   ░ ▓██▄   ▒███   ▓██  ▀█ ██▒▒ ▓██░ ▒░░ ▓██▄   
  ▒   ██▒▒▓▓▄ ▄██▒▒██▀▀█▄  ▒▓█  ▄ ░██▄▄▄▄██ ▒██    ▒██ ░██░▓██▒  ▐▌██▒░▓█  ██▓░██  █▀ ░░██  █▀ ░   ▒██▄█▓▒ ▒▒██▀▀█▄  ▒▓█  ▄   ▒   ██▒▒▓█  ▄ ▓██▒  ▐▌██▒░ ▓██▓ ░   ▒   ██▒
▒██████▒▒▒ ▓███▀ ░░██▓ ▒██▒░▒████▒ ▓█   ▓██▒▒██▒   ░██▒░██░▒██░   ▓██░░▒▓███▀▒░▒███▒█▄ ░▒███▒█▄    ▒██▒ ░  ░░██▓ ▒██▒░▒████▒▒██████▒▒░▒████▒▒██░   ▓██░  ▒██▒ ░ ▒██████▒▒
▒ ▒▓▒ ▒ ░░ ░▒ ▒  ░░ ▒▓ ░▒▓░░░ ▒░ ░ ▒▒   ▓▒█░░ ▒░   ░  ░░▓  ░ ▒░   ▒ ▒  ░▒   ▒ ░░ ▒▒░ ▒ ░░ ▒▒░ ▒    ▒▓▒░ ░  ░░ ▒▓ ░▒▓░░░ ▒░ ░▒ ▒▓▒ ▒ ░░░ ▒░ ░░ ▒░   ▒ ▒   ▒ ░░   ▒ ▒▓▒ ▒ ░
░ ░▒  ░ ░  ░  ▒     ░▒ ░ ▒░ ░ ░  ░  ▒   ▒▒ ░░  ░      ░ ▒ ░░ ░░   ░ ▒░  ░   ░  ░ ▒░  ░  ░ ▒░  ░    ░▒ ░       ░▒ ░ ▒░ ░ ░  ░░ ░▒  ░ ░ ░ ░  ░░ ░░   ░ ▒░    ░    ░ ░▒  ░ ░
░  ░  ░  ░          ░░   ░    ░     ░   ▒   ░      ░    ▒ ░   ░   ░ ░ ░ ░   ░    ░   ░    ░   ░    ░░         ░░   ░    ░   ░  ░  ░     ░      ░   ░ ░   ░      ░  ░  ░  
      ░  ░ ░         ░        ░  ░      ░  ░       ░    ░           ░       ░     ░        ░                   ░        ░  ░      ░     ░  ░         ░                ░  
         ░                                                                                                                                                               
        `);
    setTimeout(() => {
      console.log(`
 ▓█████  ███▄    █ ▄▄▄█████▓▓█████  ██▀███  ▄▄▄█████▓ ▄▄▄       ██▓ ███▄    █  ███▄ ▄███▓▓█████  ███▄    █ ▄▄▄█████▓ ▒█████   ███▄    █ ▓█████ 
▓█   ▀  ██ ▀█   █ ▓  ██▒ ▓▒▓█   ▀ ▓██ ▒ ██▒▓  ██▒ ▓▒▒████▄    ▓██▒ ██ ▀█   █ ▓██▒▀█▀ ██▒▓█   ▀  ██ ▀█   █ ▓  ██▒ ▓▒▒██▒  ██▒ ██ ▀█   █ ▓█   ▀ 
▒███   ▓██  ▀█ ██▒▒ ▓██░ ▒░▒███   ▓██ ░▄█ ▒▒ ▓██░ ▒░▒██  ▀█▄  ▒██▒▓██  ▀█ ██▒▓██    ▓██░▒███   ▓██  ▀█ ██▒▒ ▓██░ ▒░▒██░  ██▒▓██  ▀█ ██▒▒███   
▒▓█  ▄ ▓██▒  ▐▌██▒░ ▓██▓ ░ ▒▓█  ▄ ▒██▀▀█▄  ░ ▓██▓ ░ ░██▄▄▄▄██ ░██░▓██▒  ▐▌██▒▒██    ▒██ ▒▓█  ▄ ▓██▒  ▐▌██▒░ ▓██▓ ░ ▒██   ██░▓██▒  ▐▌██▒▒▓█  ▄ 
░▒████▒▒██░   ▓██░  ▒██▒ ░ ░▒████▒░██▓ ▒██▒  ▒██▒ ░  ▓█   ▓██▒░██░▒██░   ▓██░▒██▒   ░██▒░▒████▒▒██░   ▓██░  ▒██▒ ░ ░ ████▓▒░▒██░   ▓██░░▒████▒
░░ ▒░ ░░ ▒░   ▒ ▒   ▒ ░░   ░░ ▒░ ░░ ▒▓ ░▒▓░  ▒ ░░    ▒▒   ▓▒█░░▓  ░ ▒░   ▒ ▒ ░ ▒░   ░  ░░░ ▒░ ░░ ▒░   ▒ ▒   ▒ ░░   ░ ▒░▒░▒░ ░ ▒░   ▒ ▒ ░░ ▒░ ░
 ░ ░  ░░ ░░   ░ ▒░    ░     ░ ░  ░  ░▒ ░ ▒░    ░      ▒   ▒▒ ░ ▒ ░░ ░░   ░ ▒░░  ░      ░ ░ ░  ░░ ░░   ░ ▒░    ░      ░ ▒ ▒░ ░ ░░   ░ ▒░ ░ ░  ░
   ░      ░   ░ ░   ░         ░     ░░   ░   ░        ░   ▒    ▒ ░   ░   ░ ░ ░      ░      ░      ░   ░ ░   ░      ░ ░ ░ ▒     ░   ░ ░    ░   
   ░  ░         ░             ░  ░   ░                    ░  ░ ░           ░        ░      ░  ░         ░              ░ ░           ░    ░  ░
   `);
    }, 6000);
  }, 6000);
});
