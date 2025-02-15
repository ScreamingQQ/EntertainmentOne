const readline = require('readline');
const http = require('http');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const assistant = {
    defaultPort: 3000,
    help: function() {
        const messages = [
            "I can assist with the following tasks:",
            "1. Answer questions",
            "2. Start a server",
            "3. Customize server port",
            "4. Explain any file in the repository based on file path",
            "5. List all files in a directory",
            "6. Create a new file",
            "7. Delete a file",
            "8. Append content to a file",
            "9. Read content from a file",
            "10. Rename a file",
            "11. Copy a file",
            "12. Move a file",
            "13. Create a directory",
            "14. Delete a directory",
            "15. List all directories",
            "16. Check if a file exists",
            "17. Get file statistics",
            "18. Watch a file for changes",
            "19. Read a JSON file",
            "20. Write to a JSON file",
            "Type 'exit' to quit."
        ];
        this.typeMessages(messages);
    },
    answerQuestion: function(question) {
        switch(question.toLowerCase()) {
            case 'what is your name?':
                console.log("My name is Aura.");
                break;
            default:
                console.log("Sorry, I don't know the answer to that question.");
        }
    },
    startServer: function(port = this.defaultPort) {
        const server = http.createServer((req, res) => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end('Hello, World!\n');
        });

        server.listen(port, () => {
            console.log(`Server running at http://localhost:${port}/`);
        });
    },
    customizePort: function() {
        rl.question('Enter the port number: ', (port) => {
            this.defaultPort = parseInt(port, 10);
            console.log(`Default port set to ${this.defaultPort}`);
            this.startServer(this.defaultPort);
            rl.question('Enter the file path you want to view: ', (filePath) => {
                this.explainFile(filePath);
            });
        });
    },
    explainFile: function(filePath) {
        const fullPath = path.join(__dirname, filePath);
        fs.readFile(fullPath, 'utf8', (err, data) => {
            if (err) {
                console.log(`Error reading file: ${err.message}`);
                return;
            }
            console.log(`Contents of ${filePath}:\n`);
            this.typeMessages(data.split('\n'));
        });
    },
    listFiles: function(directoryPath) {
        fs.readdir(directoryPath, (err, files) => {
            if (err) {
                console.log(`Error reading directory: ${err.message}`);
                return;
            }
            console.log(`Files in ${directoryPath}:\n`);
            this.typeMessages(files);
        });
    },
    createFile: function(filePath, content) {
        fs.writeFile(filePath, content, (err) => {
            if (err) {
                console.log(`Error creating file: ${err.message}`);
                return;
            }
            console.log(`File ${filePath} created successfully.`);
        });
    },
    deleteFile: function(filePath) {
        fs.unlink(filePath, (err) => {
            if (err) {
                console.log(`Error deleting file: ${err.message}`);
                return;
            }
            console.log(`File ${filePath} deleted successfully.`);
        });
    },
    appendToFile: function(filePath, content) {
        fs.appendFile(filePath, content, (err) => {
            if (err) {
                console.log(`Error appending to file: ${err.message}`);
                return;
            }
            console.log(`Content appended to ${filePath} successfully.`);
        });
    },
    readFile: function(filePath) {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.log(`Error reading file: ${err.message}`);
                return;
            }
            console.log(`Contents of ${filePath}:\n`);
            this.typeMessages(data.split('\n'));
        });
    },
    renameFile: function(oldPath, newPath) {
        fs.rename(oldPath, newPath, (err) => {
            if (err) {
                console.log(`Error renaming file: ${err.message}`);
                return;
            }
            console.log(`File renamed from ${oldPath} to ${newPath} successfully.`);
        });
    },
    copyFile: function(srcPath, destPath) {
        fs.copyFile(srcPath, destPath, (err) => {
            if (err) {
                console.log(`Error copying file: ${err.message}`);
                return;
            }
            console.log(`File copied from ${srcPath} to ${destPath} successfully.`);
        });
    },
    moveFile: function(srcPath, destPath) {
        fs.rename(srcPath, destPath, (err) => {
            if (err) {
                console.log(`Error moving file: ${err.message}`);
                return;
            }
            console.log(`File moved from ${srcPath} to ${destPath} successfully.`);
        });
    },
    createDirectory: function(directoryPath) {
        fs.mkdir(directoryPath, { recursive: true }, (err) => {
            if (err) {
                console.log(`Error creating directory: ${err.message}`);
                return;
            }
            console.log(`Directory ${directoryPath} created successfully.`);
        });
    },
    deleteDirectory: function(directoryPath) {
        fs.rmdir(directoryPath, { recursive: true }, (err) => {
            if (err) {
                console.log(`Error deleting directory: ${err.message}`);
                return;
            }
            console.log(`Directory ${directoryPath} deleted successfully.`);
        });
    },
    listDirectories: function(directoryPath) {
        fs.readdir(directoryPath, { withFileTypes: true }, (err, files) => {
            if (err) {
                console.log(`Error reading directory: ${err.message}`);
                return;
            }
            const directories = files.filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);
            console.log(`Directories in ${directoryPath}:\n`);
            this.typeMessages(directories);
        });
    },
    fileExists: function(filePath) {
        fs.access(filePath, fs.constants.F_OK, (err) => {
            console.log(err ? `File ${filePath} does not exist.` : `File ${filePath} exists.`);
        });
    },
    getFileStats: function(filePath) {
        fs.stat(filePath, (err, stats) => {
            if (err) {
                console.log(`Error getting file statistics: ${err.message}`);
                return;
            }
            console.log(`Statistics for ${filePath}:\n`);
            this.typeMessages(JSON.stringify(stats, null, 2).split('\n'));
        });
    },
    watchFile: function(filePath) {
        fs.watch(filePath, (eventType, filename) => {
            console.log(`File ${filename} has been ${eventType}`);
        });
    },
    readJSONFile: function(filePath) {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                console.log(`Error reading JSON file: ${err.message}`);
                return;
            }
            try {
                const jsonData = JSON.parse(data);
                console.log(`Contents of ${filePath}:\n`);
                this.typeMessages(JSON.stringify(jsonData, null, 2).split('\n'));
            } catch (err) {
                console.log(`Error parsing JSON file: ${err.message}`);
            }
        });
    },
    writeJSONFile: function(filePath, jsonData) {
        fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                console.log(`Error writing to JSON file: ${err.message}`);
                return;
            }
            console.log(`JSON data written to ${filePath} successfully.`);
        });
    },
    typeMessages: function(messages) {
        let delay = 0;
        messages.forEach((message) => {
            setTimeout(() => {
                console.log(message);
            }, delay);
            delay += 20; // 0.02 second delay between messages
        });
    }
};

rl.on('line', (input) => {
    switch(input.trim().toLowerCase()) {
        case 'help':
            assistant.help();
            break;
        case '1':
            rl.question('What is your question? ', (question) => {
                assistant.answerQuestion(question);
            });
            break;
        case '2':
            assistant.startServer();
            break;
        case '3':
            assistant.customizePort();
            break;
        case '4':
            rl.question('Enter the file path: ', (filePath) => {
                assistant.explainFile(filePath);
            });
            break;
        case '5':
            rl.question('Enter the directory path: ', (directoryPath) => {
                assistant.listFiles(directoryPath);
            });
            break;
        case '6':
            rl.question('Enter the file path: ', (filePath) => {
                rl.question('Enter the content: ', (content) => {
                    assistant.createFile(filePath, content);
                });
            });
            break;
        case '7':
            rl.question('Enter the file path: ', (filePath) => {
                assistant.deleteFile(filePath);
            });
            break;
        case '8':
            rl.question('Enter the file path: ', (filePath) => {
                rl.question('Enter the content: ', (content) => {
                    assistant.appendToFile(filePath, content);
                });
            });
            break;
        case '9':
            rl.question('Enter the file path: ', (filePath) => {
                assistant.readFile(filePath);
            });
            break;
        case '10':
            rl.question('Enter the old file path: ', (oldPath) => {
                rl.question('Enter the new file path: ', (newPath) => {
                    assistant.renameFile(oldPath, newPath);
                });
            });
            break;
        case '11':
            rl.question('Enter the source file path: ', (srcPath) => {
                rl.question('Enter the destination file path: ', (destPath) => {
                    assistant.copyFile(srcPath, destPath);
                });
            });
            break;
        case '12':
            rl.question('Enter the source file path: ', (srcPath) => {
                rl.question('Enter the destination file path: ', (destPath) => {
                    assistant.moveFile(srcPath, destPath);
                });
            });
            break;
        case '13':
            rl.question('Enter the directory path: ', (directoryPath) => {
                assistant.createDirectory(directoryPath);
            });
            break;
        case '14':
            rl.question('Enter the directory path: ', (directoryPath) => {
                assistant.deleteDirectory(directoryPath);
            });
            break;
        case '15':
            rl.question('Enter the directory path: ', (directoryPath) => {
                assistant.listDirectories(directoryPath);
            });
            break;
        case '16':
            rl.question('Enter the file path: ', (filePath) => {
                assistant.fileExists(filePath);
            });
            break;
        case '17':
            rl.question('Enter the file path: ', (filePath) => {
                assistant.getFileStats(filePath);
            });
            break;
        case '18':
            rl.question('Enter the file path: ', (filePath) => {
                assistant.watchFile(filePath);
            });
            break;
        case '19':
            rl.question('Enter the JSON file path: ', (filePath) => {
                assistant.readJSONFile(filePath);
            });
            break;
        case '20':
            rl.question('Enter the JSON file path: ', (filePath) => {
                rl.question('Enter the JSON data: ', (jsonData) => {
                    try {
                        const parsedData = JSON.parse(jsonData);
                        assistant.writeJSONFile(filePath, parsedData);
                    } catch (err) {
                        console.log(`Error parsing JSON data: ${err.message}`);
                    }
                });
            });
            break;
        case 'exit':
            rl.close();
            break;
        default:
            console.log("Unknown command. Type 'help' for a list of commands.");
    }
});

console.log("Welcome to the assistant. Type 'help' for a list of commands.");