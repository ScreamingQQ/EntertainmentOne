# EntertainmentOne Project

Welcome to the EntertainmentOne project! This project is a comprehensive platform that encompasses gaming, TV shows, audiobooks, and a proxy service for external API interactions.

## Project Structure

The project is organized into the following directories and files:

```
EntertainmentOne
├── src
│   ├── games
│   │   └── index.ts          # Contains the Game class
│   ├── tv-shows
│   │   └── index.ts          # Contains the TVShow class
│   ├── audiobooks
│   │   └── index.ts          # Contains the Audiobook class
│   ├── proxy
│   │   └── index.ts          # Contains the createProxy function
│   └── types
│       └── index.ts          # Contains interfaces for Game, TVShow, and Audiobook
├── assets                    # Contains static files like CSS, JS, and images
│   ├── css
│   │   └── styles.css
│   ├── js
│   │   └── scripts.js
│   └── images
│       └── game-image.jpg
├── Template_Games.html       # HTML template for games
├── server.js                 # Node.js server file
├── package.json              # npm configuration file
├── tsconfig.json             # TypeScript configuration file
└── README.md                 # Project documentation
```

## Features

- **Gaming**: Manage and retrieve information about various games.
- **TV Shows**: Access details about popular TV shows, including seasons and networks.
- **Audiobooks**: Get information about audiobooks, including authors and durations.
- **Proxy Service**: Set up a proxy server to handle requests to external APIs.

## Setup Instructions

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/EntertainmentOne.git
   ```

2. Navigate to the project directory:
   ```
   cd EntertainmentOne
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Compile the TypeScript files:
   ```
   npm run build
   ```

5. Start the application:
   ```
   npm start
   ```

## Usage Guidelines

- To use the gaming features, import the `Game` class from `src/games/index.ts`.
- For TV show information, use the `TVShow` class from `src/tv-shows/index.ts`.
- Access audiobook details through the `Audiobook` class in `src/audiobooks/index.ts`.
- Set up the proxy server using the `createProxy` function from `src/proxy/index.ts`.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.