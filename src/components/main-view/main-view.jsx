import React, { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const simulateFetch = () => {
      const mockData = [
        { _id: "movie_1", Title: "Inception", Description: "A thief who steals corporate secrets...", Genre: { Name: "Sci-Fi"}, Director: { Name: "Christopher Nolan"}, ImagePath: "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg", Featured: true, Cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"] },
        { _id: "movie_2", Title: "The Dark Knight", Description: "When the menace known as the Joker...", Genre: { Name: "Action"}, Director: { Name: "Christopher Nolan"}, ImagePath: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg", Featured: true, Cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"] },
        { _id: "movie_3", Title: "Interstellar", Description: "A team of explorers travel...", Genre: { Name: "Sci-Fi"}, Director: { Name: "Christopher Nolan"}, ImagePath: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg", Featured: true, Cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"] },
        { _id: "movie_4", Title: "Pulp Fiction", Description: "The lives of two mob hitmen...", Genre: { Name: "Crime"}, Director: { Name: "Quentin Tarantino"}, ImagePath: "https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg", Featured: false, Cast: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"] },
        { _id: "movie_5", Title: "The Matrix", Description: "A computer hacker learns...", Genre: { Name: "Sci-Fi"}, Director: { Name: "Lana Wachowski"}, ImagePath: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg", Featured: true, Cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"] },
        { _id: "movie_6", Title: "Forrest Gump", Description: "The presidencies of Kennedy...", Genre: { Name: "Drama"}, Director: { Name: "Robert Zemeckis"}, ImagePath: "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdSm.jpg", Featured: false, Cast: ["Tom Hanks", "Robin Wright", "Gary Sinise"] },
        { _id: "movie_7", Title: "Gladiator", Description: "A former Roman General...", Genre: { Name: "Action"}, Director: { Name: "Ridley Scott"}, ImagePath: "https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg", Featured: false, Cast: ["Russell Crowe", "Joaquin Phoenix", "Connie Nielsen"] },
        { _id: "movie_8", Title: "LOTR: Fellowship", Description: "A meek Hobbit from the Shire...", Genre: { Name: "Fantasy"}, Director: { Name: "Peter Jackson"}, ImagePath: "https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg", Featured: true, Cast: ["Elijah Wood", "Ian McKellen", "Orlando Bloom"] },
        { _id: "movie_9", Title: "Fight Club", Description: "An insomniac office worker...", Genre: { Name: "Drama"}, Director: { Name: "David Fincher"}, ImagePath: "https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg", Featured: false, Cast: ["Brad Pitt", "Edward Norton", "Helena Bonham Carter"] },
        { _id: "movie_10", Title: "Parasite", Description: "Greed and class discrimination...", Genre: { Name: "Thriller"}, Director: { Name: "Bong Joon Ho"}, ImagePath: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg", Featured: false, Cast: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong"] },
        { _id: "movie_11", Title: "Joker", Description: "During the 1980s, a failed stand-up...", Genre: { Name: "Crime"}, Director: { Name: "Todd Phillips"}, ImagePath: "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg", Featured: false, Cast: ["Joaquin Phoenix", "Robert De Niro", "Zazie Beetz"] },
        { _id: "movie_12", Title: "Mad Max: Fury Road", Description: "In a post-apocalyptic wasteland...", Genre: { Name: "Action"}, Director: { Name: "George Miller"}, ImagePath: "https://image.tmdb.org/t/p/w500/whjrs6KClJMi73ihDIaSd5xPDoq.jpg", Featured: true, Cast: ["Tom Hardy", "Charlize Theron", "Nicholas Hoult"] },
        { _id: "movie_13", Title: "Spirited Away", Description: "During her family's move...", Genre: { Name: "Animation"}, Director: { Name: "Hayao Miyazaki"}, ImagePath: "https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUdskWBKVANA.jpg", Featured: false, Cast: ["Rumi Hiiragi", "Miyu Irino", "Mari Natsuki"] },
        { _id: "movie_14", Title: "Arrival", Description: "A linguist works with the military...", Genre: { Name: "Sci-Fi"}, Director: { Name: "Denis Villeneuve"}, ImagePath: "https://image.tmdb.org/t/p/w500/x2FJsf1ElAgr63Y3PNPtJrcmpoe.jpg", Featured: true, Cast: ["Amy Adams", "Jeremy Renner", "Forest Whitaker"] },
        { _id: "movie_15", Title: "Blade Runner 2049", Description: "Young Blade Runner K's discovery...", Genre: { Name: "Sci-Fi"}, Director: { Name: "Denis Villeneuve"}, ImagePath: "https://image.tmdb.org/t/p/w500/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg", Featured: true, Cast: ["Ryan Gosling", "Harrison Ford", "Ana de Armas"] },
        { _id: "movie_16", Title: "Get Out", Description: "A young African-American visits...", Genre: { Name: "Horror"}, Director: { Name: "Jordan Peele"}, ImagePath: "https://image.tmdb.org/t/p/w500/kssB1Mf8CuL6b7f3cf3HJ1M4tmQ.jpg", Featured: false, Cast: ["Daniel Kaluuya", "Allison Williams", "Bradley Whitford"] },
        { _id: "movie_17", Title: "The Social Network", Description: "As Harvard student Mark Zuckerberg...", Genre: { Name: "Biography"}, Director: { Name: "David Fincher"}, ImagePath: "https://image.tmdb.org/t/p/w500/n0ybibhSzzpGpKJ9LjgfSQ72A4x.jpg", Featured: false, Cast: ["Jesse Eisenberg", "Andrew Garfield", "Justin Timberlake"] },
        { _id: "movie_18", Title: "Whiplash", Description: "A promising young drummer...", Genre: { Name: "Drama"}, Director: { Name: "Damien Chazelle"}, ImagePath: "https://image.tmdb.org/t/p/w500/7fn624j5lj3xTme2SgiLCGuedzd.jpg", Featured: false, Cast: ["Miles Teller", "J.K. Simmons", "Melissa Benoist"] },
        { _id: "movie_19", Title: "La La Land", Description: "While navigating their careers...", Genre: { Name: "Musical"}, Director: { Name: "Damien Chazelle"}, ImagePath: "https://image.tmdb.org/t/p/w500/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg", Featured: false, Cast: ["Ryan Gosling", "Emma Stone", "John Legend"] },
        { _id: "movie_20", Title: "Django Unchained", Description: "With the help of a German bounty-hunter...", Genre: { Name: "Western"}, Director: { Name: "Quentin Tarantino"}, ImagePath: "https://image.tmdb.org/t/p/w500/7oWY8VDWW7thTzTv3iUhbfGKoGJ.jpg", Featured: false, Cast: ["Jamie Foxx", "Christoph Waltz", "Leonardo DiCaprio"] },
        { _id: "movie_21", Title: "Inglourious Basterds", Description: "In Nazi-occupied France...", Genre: { Name: "War"}, Director: { Name: "Quentin Tarantino"}, ImagePath: "https://image.tmdb.org/t/p/w500/7sfbEnaARXDDhKm0CZ7D7uc2sbo.jpg", Featured: false, Cast: ["Brad Pitt", "M\u00e9lanie Laurent", "Christoph Waltz"] },
        { _id: "movie_22", Title: "The Grand Budapest Hotel", Description: "The adventures of Gustave H...", Genre: { Name: "Comedy"}, Director: { Name: "Wes Anderson"}, ImagePath: "https://image.tmdb.org/t/p/w500/eWdyYQreja6JGCzqHWXpWHDrrPo.jpg", Featured: false, Cast: ["Ralph Fiennes", "F. Murray Abraham", "Mathieu Amalric"] },
        { _id: "movie_23", Title: "Moonlight", Description: "A young African-American man...", Genre: { Name: "Drama"}, Director: { Name: "Barry Jenkins"}, ImagePath: "https://image.tmdb.org/t/p/w500/496v2rp6X54I2tq2k8aL1737uDB.jpg", Featured: false, Cast: ["Mahershala Ali", "Trevante Rhodes", "Naomie Harris"] },
        { _id: "movie_24", Title: "Her", Description: "In a near future, a lonely writer...", Genre: { Name: "Romance"}, Director: { Name: "Spike Jonze"}, ImagePath: "https://image.tmdb.org/t/p/w500/eCOtqtfKPWysr3J9Qf6y1L5S2xl.jpg", Featured: false, Cast: ["Joaquin Phoenix", "Amy Adams", "Scarlett Johansson"] },
        { _id: "movie_25", Title: "Eternal Sunshine", Description: "When their relationship turns sour...", Genre: { Name: "Drama"}, Director: { Name: "Michel Gondry"}, ImagePath: "https://image.tmdb.org/t/p/w500/5MwkWH9tYHv3mV9Od2cv0pgHXVx.jpg", Featured: false, Cast: ["Jim Carrey", "Kate Winslet", "Tom Wilkinson"] },
        { _id: "movie_26", Title: "Oldboy (2003)", Description: "After being kidnapped and imprisoned...", Genre: { Name: "Action"}, Director: { Name: "Park Chan-wook"}, ImagePath: "https://image.tmdb.org/t/p/w500/pWDt3i0tWJbq2SPNF1G4Sk9803S.jpg", Featured: false, Cast: ["Choi Min-sik", "Yoo Ji-tae", "Kang Hye-jung"] },
        { _id: "movie_27", Title: "Amelie", Description: "Amelie is an innocent and naive girl...", Genre: { Name: "Romance"}, Director: { Name: "Jean-Pierre Jeunet"}, ImagePath: "https://image.tmdb.org/t/p/w500/m6hQmG7PSNvZ3L9zHjIJ16E6N4.jpg", Featured: false, Cast: ["Audrey Tautou", "Mathieu Kassovitz", "Jamel Debbouze"] },
        { _id: "movie_28", Title: "Reservoir Dogs", Description: "When a simple jewelry heist goes...", Genre: { Name: "Crime"}, Director: { Name: "Quentin Tarantino"}, ImagePath: "https://image.tmdb.org/t/p/w500/gGZ2PKfP6G4PNYTP7M9EUg7wX9X.jpg", Featured: false, Cast: ["Harvey Keitel", "Tim Roth", "Michael Madsen"] },
        { _id: "movie_29", Title: "No Country for Old Men", Description: "Violence and mayhem ensue...", Genre: { Name: "Thriller"}, Director: { Name: "Joel Coen"}, ImagePath: "https://image.tmdb.org/t/p/w500/69Kz9wdZuCL6CAP205sV51ykiL9.jpg", Featured: false, Cast: ["Tommy Lee Jones", "Javier Bardem", "Josh Brolin"] },
        { _id: "movie_30", Title: "There Will Be Blood", Description: "A story of family, religion...", Genre: { Name: "Drama"}, Director: { Name: "Paul Thomas Anderson"}, ImagePath: "https://image.tmdb.org/t/p/w500/4C4SttsCH9Zn6o3JTk2NkjXN7uQ.jpg", Featured: false, Cast: ["Daniel Day-Lewis", "Paul Dano", "Ciarán Hinds"] }
      ];

      setTimeout(() => {
        setMovies(mockData);
        setLoading(false);
      }, 1500);
    };

    simulateFetch();
  }, []);

  if (loading) {
    return <div className="loading-message">Loading movies... Please wait.</div>;
  }

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div className="empty-list-message">The movie list is empty!</div>;
  }

  return (
    <div className="movies-list">
      {movies.map((movie) => (
        <MovieCard
          key={movie._id}
          movie={movie}
          onMovieClick={(clickedMovie) => {
            setSelectedMovie(clickedMovie);
          }}
        />
      ))}
    </div>
  );
};

export default MainView;