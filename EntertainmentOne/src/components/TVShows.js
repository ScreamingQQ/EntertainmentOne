import React from 'react';

const TVShows = () => {
    const shows = [
        { id: 1, title: 'Show One', description: 'Description of Show One' },
        { id: 2, title: 'Show Two', description: 'Description of Show Two' },
        { id: 3, title: 'Show Three', description: 'Description of Show Three' },
    ];

    return (
        <div>
            <h1>Available TV Shows</h1>
            <ul>
                {shows.map(show => (
                    <li key={show.id}>
                        <h2>{show.title}</h2>
                        <p>{show.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TVShows;