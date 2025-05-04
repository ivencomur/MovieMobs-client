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
        { _id: "movie_1", Title: "Inception", Description: "A thief who steals corporate secrets...", Genre: { Name: "Sci-Fi", Description: "Science fiction..." }, Director: { Name: "Christopher Nolan", Bio: "British-American director...", Birth: "1970" }, ImagePath: "https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg", Featured: true, Cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"] },
        { _id: "movie_2", Title: "The Dark Knight", Description: "When the menace known as the Joker...", Genre: { Name: "Action", Description: "Action film..." }, Director: { Name: "Christopher Nolan", Bio: "British-American director...", Birth: "1970" }, ImagePath: "https://upload.wikimedia.org/wikipedia/en/1/1c/The_Dark_Knight_%282008_film%29.jpg", Featured: true, Cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"] },
        { _id: "movie_3", Title: "Interstellar", Description: "A team of explorers travel...", Genre: { Name: "Sci-Fi", Description: "Science fiction..." }, Director: { Name: "Christopher Nolan", Bio: "British-American director...", Birth: "1970" }, ImagePath: "https://upload.wikimedia.org/wikipedia/en/b/bc/Interstellar_film_poster.jpg", Featured: true, Cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"] },
        { _id: "movie_4", Title: "Pulp Fiction", Description: "The lives of two mob hitmen...", Genre: { Name: "Crime", Description: "Crime film..." }, Director: { Name: "Quentin Tarantino", Bio: "American director...", Birth: "1963" }, ImagePath: "https://upload.wikimedia.org/wikipedia/en/3/3b/Pulp_Fiction_%281994%29_poster.jpg", Featured: false, Cast: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"] },
        { _id: "movie_5", Title: "The Matrix", Description: "A computer hacker learns...", Genre: { Name: "Sci-Fi", Description: "Science fiction..." }, Director: { Name: "Lana Wachowski", Bio: "American director...", Birth: "1965" }, ImagePath: "https://upload.wikimedia.org/wikipedia/en/c/c1/The_Matrix_Poster.jpg", Featured: true, Cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"] },
        { _id: "movie_6", Title: "Forrest Gump", Description: "The presidencies of Kennedy...", Genre: { Name: "Drama", Description: "Drama film..." }, Director: { Name: "Robert Zemeckis", Bio: "American director...", Birth: "1951" }, ImagePath: "https://upload.wikimedia.org/wikipedia/en/6/67/Forrest_Gump_poster.jpg", Featured: false, Cast: ["Tom Hanks", "Robin Wright", "Gary Sinise"] },
        { _id: "movie_7", Title: "Gladiator", Description: "A former Roman General...", Genre: { Name: "Action", Description: "Action film..." }, Director: { Name: "Ridley Scott", Bio: "English director...", Birth: "1937" }, ImagePath: "https://upload.wikimedia.org/wikipedia/en/f/fb/Gladiator_%282000_film_poster%29.png", Featured: false, Cast: ["Russell Crowe", "Joaquin Phoenix", "Connie Nielsen"] },
        { _id: "movie_8", Title: "LOTR: Fellowship", Description: "A meek Hobbit from the Shire...", Genre: { Name: "Fantasy", Description: "Fantasy film..." }, Director: { Name: "Peter Jackson", Bio: "New Zealand director...", Birth: "1961" }, ImagePath: "https://upload.wikimedia.org/wikipedia/en/8/8a/The_Lord_of_the_Rings_The_Fellowship_of_the_Ring_%282001%29.jpg", Featured: true, Cast: ["Elijah Wood", "Ian McKellen", "Orlando Bloom"] },
        { _id: "movie_9", Title: "Fight Club", Description: "An insomniac office worker...", Genre: { Name: "Drama", Description: "Drama film..." }, Director: { Name: "David Fincher", Bio: "American director...", Birth: "1962" }, ImagePath: "https://upload.wikimedia.org/wikipedia/en/f/fc/Fight_Club_poster.jpg", Featured: false, Cast: ["Brad Pitt", "Edward Norton", "Helena Bonham Carter"] },
        { _id: "movie_10", Title: "Parasite", Description: "Greed and class discrimination...", Genre: { Name: "Thriller", Description: "Thriller film..." }, Director: { Name: "Bong Joon Ho", Bio: "South Korean director...", Birth: "1969" }, ImagePath: "https://upload.wikimedia.org/wikipedia/en/5/53/Parasite_%282019_film%29.png", Featured: false, Cast: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong"] },
        { _id: "movie_11", Title: "Joker", Description: "During the 1980s, a failed stand-up...", Genre: { Name: "Crime", Description: "Crime film..." }, Director: { Name: "Todd Phillips", Bio: "American director...", Birth: "1970" }, ImagePath: "https://upload.wikimedia.org/wikipedia/en/e/e1/Joker_%282019_film%29_poster.jpg", Featured: false, Cast: ["Joaquin Phoenix", "Robert De Niro", "Zazie Beetz"] },
        { _id: "movie_12", Title: "Mad Max: Fury Road", Description: "In a post-apocalyptic wasteland...", Genre: { Name: "Action", Description: "Action film..." }, Director: { Name: "George Miller", Bio: "Australian director...", Birth: "1945" }, ImagePath: "https://upload.wikimedia.org/wikipedia/en/6/6e/Mad_Max_Fury_Road.jpg", Featured: true, Cast: ["Tom Hardy", "Charlize Theron", "Nicholas Hoult"] },
        { _id: "movie_13", Title: "Spirited Away", Description: "During her family's move...", Genre: { Name: "Animation", Description: "Animation film..." }, Director: { Name: "Hayao Miyazaki", Bio: "Japanese director...", Birth: "1941" }, ImagePath: "https://upload.wikimedia.org/wikipedia/en/d/db/Spirited_Away_poster.png", Featured: false, Cast: ["Rumi Hiiragi", "Miyu Irino", "Mari Natsuki"] },
        { _id: "movie_14", Title: "Arrival", Description: "A linguist works with the military...", Genre: { Name: "Sci-Fi", Description: "Science fiction..." }, Director: { Name: "Denis Villeneuve", Bio: "Canadian director...", Birth: "1967" }, ImagePath: "https://upload.wikimedia.org/wikipedia/en/d/df/Arrival%2C_Movie_Poster.jpg", Featured: true, Cast: ["Amy Adams", "Jeremy Renner", "Forest Whitaker"] },
        { _id: "movie_15", Title: "Blade Runner 2049", Description: "Young Blade Runner K's discovery...", Genre: { Name: "Sci-Fi", Description: "Science fiction..." }, Director: { Name: "Denis Villeneuve", Bio: "Canadian director...", Birth: "1967" }, ImagePath: "https://upload.wikimedia.org/wikipedia/en/9/9f/Blade_Runner_2049_poster.png", Featured: true, Cast: ["Ryan Gosling", "Harrison Ford", "Ana de Armas"] },
        { _id: "movie_16", Title: "Get Out", Description: "A young African-American visits...", Genre: { Name: "Horror", Description: "Horror film..." }, Director: { Name: "Jordan Peele", Bio: "American filmmaker...", Birth: "1979" }, ImagePath: "https://upload.wikimedia.org/wikipedia/en/a/a3/Get_Out_poster.png", Featured: false, Cast: ["Daniel Kaluuya", "Allison Williams", "Bradley Whitford"] },
        { _id: "movie_17", Title: "The Social Network", Description: "As Harvard student Mark Zuckerberg...", Genre: { Name: "Biography", Description: "Biography film..." }, Director: { Name: "David Fincher", Bio: "American director...", Birth: "1962" }, ImagePath: "https://upload.wikimedia.org/wikipedia/en/7/7a/Social_network_film_poster.jpg", Featured: false, Cast: ["Jesse Eisenberg", "Andrew Garfield", "Justin Timberlake"] },
        { _id: "movie_18", Title: "Whiplash", Description: "A promising young drummer...", Genre: { Name: "Drama", Description: "Drama film..." }, Director: { Name: "Damien Chazelle", Bio: "American director...", Birth: "1985" }, ImagePath: "https://upload.wikimedia.org/wikipedia/en/0/01/Whiplash_poster.jpg", Featured: false, Cast: ["Miles Teller", "J.K. Simmons", "Melissa Benoist"] },
        { _id: "movie_19", Title: "La La Land", Description: "While navigating their careers...", Genre: { Name: "Musical", Description: "Musical film..." }, Director: { Name: "Damien Chazelle", Bio: "American director...", Birth: "1985" }, ImagePath: "https://upload.wikimedia.org/wikipedia/en/a/ab/La_La_Land_%282016_film%29.png", Featured: false, Cast: ["Ryan Gosling", "Emma Stone", "John Legend"] },
        { _id: "movie_20", Title: "Django Unchained", Description: "With the help of a German bounty-hunter...", Genre: { Name: "Western", Description: "Western film..." }, Director: { Name: "Quentin Tarantino", Bio: "American director...", Birth: "1963" }, ImagePath: "https://upload.wikimedia.org/wikipedia/en/8/8b/Django_Unchained_Poster.jpg", Featured: false, Cast: ["Jamie Foxx", "Christoph Waltz", "Leonardo DiCaprio"] },
        { _id: "movie_21", Title: "Inglourious Basterds", Description: "In Nazi-occupied France...", Genre: { Name: "War", Description: "War film..." }, Director: { Name: "Quentin Tarantino", Bio: "American director...", Birth: "1963" }, ImagePath: "https://upload.wikimedia.org/wikipedia/en/c/c3/Inglourious_Basterds_poster.jpg", Featured: false, Cast: ["Brad Pitt", "M\u00e9lanie Laurent", "Christoph Waltz"] },
        { _id: "movie_22", Title: "The Grand Budapest Hotel", Description: "The adventures of Gustave H...", Genre: { Name: "Comedy", Description: "Comedy film..." }, Director: { Name: "Wes Anderson", Bio: "American director...", Birth: "1969" }, ImagePath: "https://upload.wikimedia.org/wikipedia/en/a/a6/The_Grand_Budapest_Hotel_Poster.jpg", Featured: false, Cast: ["Ralph Fiennes", "F. Murray Abraham", "Mathieu Amalric"] },
        { _id: "movie_23", Title: "Moonlight", Description: "A young African-American man...", Genre: { Name: "Drama", Description: "Drama film..." }, Director: { Name: "Barry Jenkins", Bio: "American director...", Birth: "1979" }, ImagePath: "https://upload.wikimedia.org/wikipedia/en/8/84/Moonlight_%282016_film%29.png", Featured: false, Cast: ["Mahershala Ali", "Trevante Rhodes", "Naomie Harris"] },
        { _id: "movie_24", Title: "Her", Description: "In a near future, a lonely writer...", Genre: { Name: "Romance", Description: "Romance film..." }, Director: { Name: "Spike Jonze", Bio: "American director...", Birth: "1969" }, ImagePath: "https://upload.wikimedia.org/wikipedia/en/4/44/Her2013Poster.jpg", Featured: false, Cast: ["Joaquin Phoenix", "Amy Adams", "Scarlett Johansson"] },
        { _id: "movie_25", Title: "Eternal Sunshine", Description: "When their relationship turns sour...", Genre: { Name: "Drama", Description: "Drama film..." }, Director: { Name: "Michel Gondry", Bio: "French director...", Birth: "1963" }, ImagePath: "https://upload.wikimedia.org/wikipedia/en/6/62/Eternal_sunshine_of_the_spotless_mind_ver3.jpg", Featured: false, Cast: ["Jim Carrey", "Kate Winslet", "Tom Wilkinson"] },
        { _id: "movie_26", Title: "Oldboy (2003)", Description: "After being kidnapped and imprisoned...", Genre: { Name: "Action", Description: "Action film..." }, Director: { Name: "Park Chan-wook", Bio: "South Korean director...", Birth: "1963" }, ImagePath: "https://upload.wikimedia.org/wikipedia/en/6/67/Oldboykoreanposter.jpg", Featured: false, Cast: ["Choi Min-sik", "Yoo Ji-tae", "Kang Hye-jung"] },
        { _id: "movie_27", Title: "Amelie", Description: "Amelie is an innocent and naive girl...", Genre: { Name: "Romance", Description: "Romance film..." }, Director: { Name: "Jean-Pierre Jeunet", Bio: "French director...", Birth: "1953" }, ImagePath: "https://upload.wikimedia.org/wikipedia/en/5/53/Amelie_poster.jpg", Featured: false, Cast: ["Audrey Tautou", "Mathieu Kassovitz", "Jamel Debbouze"] },
        { _id: "movie_28", Title: "Reservoir Dogs", Description: "When a simple jewelry heist goes...", Genre: { Name: "Crime", Description: "Crime film..." }, Director: { Name: "Quentin Tarantino", Bio: "American director...", Birth: "1963" }, ImagePath: "https://upload.wikimedia.org/wikipedia/en/f/f6/Reservoir_Dogs.png", Featured: false, Cast: ["Harvey Keitel", "Tim Roth", "Michael Madsen"] },
        { _id: "movie_29", Title: "No Country for Old Men", Description: "Violence and mayhem ensue...", Genre: { Name: "Thriller", Description: "Thriller film..." }, Director: { Name: "Joel Coen", Bio: "American director...", Birth: "1954" }, ImagePath: "https://upload.wikimedia.org/wikipedia/en/8/8b/No_Country_for_Old_Men_poster.jpg", Featured: false, Cast: ["Tommy Lee Jones", "Javier Bardem", "Josh Brolin"] },
        { _id: "movie_30", Title: "There Will Be Blood", Description: "A story of family, religion...", Genre: { Name: "Drama", Description: "Drama film..." }, Director: { Name: "Paul Thomas Anderson", Bio: "American director...", Birth: "1970" }, ImagePath: "https://upload.wikimedia.org/wikipedia/en/d/da/There_Will_Be_Blood_Poster.jpg", Featured: false, Cast: ["Daniel Day-Lewis", "Paul Dano", "Ciarán Hinds"] }
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