import React, { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const initialMovies = [
    {
      _id: "6635f8b8e1b7f1a5a4f6e8a1",
      Title: "Inception",
      Description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
      Genre: { Name: "Sci-Fi", Description: "Science fiction is a genre of speculative fiction..." },
      Director: { Name: "Christopher Nolan", Bio: "Christopher Nolan is a British-American film director...", Birth: "1970" },
      ImagePath: "https://m.media-amazon.com/images/I/81p+xe8cbnL._AC_UF1000,1000_QL80_.jpg",
      Featured: true,
      Cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Elliot Page"]
    },
    {
      _id: "6635f8b8e1b7f1a5a4f6e8a2",
      Title: "The Dark Knight",
      Description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
      Genre: { Name: "Action", Description: "Action film is a film genre..." },
      Director: { Name: "Christopher Nolan", Bio: "British-American film director...", Birth: "1970" },
      ImagePath: "https://m.media-amazon.com/images/S/pv-target-images/e9a4cb0f79535b1a8440c49806719c28be5317ec1a9052844a3970329c4bf1c9.jpg",
      Featured: true,
      Cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"]
    },
    {
      _id: "6635f8b8e1b7f1a5a4f6e8a3",
      Title: "Interstellar",
      Description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
      Genre: { Name: "Sci-Fi", Description: "Science fiction is a genre of speculative fiction..." },
      Director: { Name: "Christopher Nolan", Bio: "British-American film director...", Birth: "1970" },
      ImagePath: "https://m.media-amazon.com/images/I/A1JVqNMI7NL._AC_UF1000,1000_QL80_.jpg",
      Featured: true,
      Cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"]
    },
    {
      _id: "6635f8b8e1b7f1a5a4f6e8a4",
      Title: "Pulp Fiction",
      Description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
      Genre: { Name: "Crime", Description: "Crime film is a genre..." },
      Director: { Name: "Quentin Tarantino", Bio: "Quentin Tarantino is an American film director...", Birth: "1963" },
      ImagePath: "https://m.media-amazon.com/images/I/81zN7J+/68L._AC_UF1000,1000_QL80_.jpg",
      Featured: false,
      Cast: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"]
    },
    {
      _id: "6635f8b8e1b7f1a5a4f6e8a5",
      Title: "The Matrix",
      Description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
      Genre: { Name: "Sci-Fi", Description: "Science fiction is a genre of speculative fiction..." },
      Director: { Name: "Lana Wachowski", Bio: "Lana Wachowski is an American film director...", Birth: "1965" },
      ImagePath: "https://m.media-amazon.com/images/I/51EG732BV3L._AC_UF894,1000_QL80_.jpg",
      Featured: true,
      Cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"]
    },
    {
      _id: "6635f8b8e1b7f1a5a4f6e8a6",
      Title: "Forrest Gump",
      Description: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.",
      Genre: { Name: "Drama", Description: "Drama is a genre..." },
      Director: { Name: "Robert Zemeckis", Bio: "Robert Zemeckis is an American film director...", Birth: "1951" },
      ImagePath: "https://m.media-amazon.com/images/I/61tqKLfbk5L._AC_UF894,1000_QL80_.jpg",
      Featured: false,
      Cast: ["Tom Hanks", "Robin Wright", "Gary Sinise"]
    },
    {
      _id: "6635f8b8e1b7f1a5a4f6e8a7",
      Title: "Gladiator",
      Description: "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family and sent him into slavery.",
      Genre: { Name: "Action", Description: "Action film is a film genre..." },
      Director: { Name: "Ridley Scott", Bio: "Ridley Scott is an English film director...", Birth: "1937" },
      ImagePath: "https://m.media-amazon.com/images/I/61Xrq-5hVRL._AC_UF894,1000_QL80_.jpg",
      Featured: false,
      Cast: ["Russell Crowe", "Joaquin Phoenix", "Connie Nielsen"]
    },
    {
      _id: "6635f8b8e1b7f1a5a4f6e8a8",
      Title: "The Lord of the Rings: The Fellowship of the Ring",
      Description: "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
      Genre: { Name: "Fantasy", Description: "Fantasy is a genre..." },
      Director: { Name: "Peter Jackson", Bio: "Peter Jackson is a New Zealand film director...", Birth: "1961" },
      ImagePath: "https://m.media-amazon.com/images/I/81EBp0vOZZL._AC_UF1000,1000_QL80_.jpg",
      Featured: true,
      Cast: ["Elijah Wood", "Ian McKellen", "Orlando Bloom"]
    },
    {
      _id: "6635f8b8e1b7f1a5a4f6e8a9",
      Title: "Fight Club",
      Description: "An insomniac office worker looking for a way to change his life crosses paths with a devil-may-care soap maker and they form an underground fight club that evolves into something much, much more.",
      Genre: { Name: "Drama", Description: "Drama is a genre..." },
      Director: { Name: "David Fincher", Bio: "David Fincher is an American film director...", Birth: "1962" },
      ImagePath: "https://m.media-amazon.com/images/I/81D+KJkO4SL._AC_UF1000,1000_QL80_.jpg",
      Featured: false,
      Cast: ["Brad Pitt", "Edward Norton", "Helena Bonham Carter"]
    },
    {
      _id: "6635f8b8e1b7f1a5a4f6e8b0",
      Title: "Parasite",
      Description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
      Genre: { Name: "Thriller", Description: "Thriller is a genre..." },
      Director: { Name: "Bong Joon Ho", Bio: "Bong Joon Ho is a South Korean film director...", Birth: "1969" },
      ImagePath: "https://m.media-amazon.com/images/I/91KArOc6L1L._AC_UF894,1000_QL80_.jpg",
      Featured: false,
      Cast: ["Song Kang-ho", "Lee Sun-kyun", "Cho Yeo-jeong"]
    },
    {
      _id: "6635f8b8e1b7f1a5a4f6e8b1",
      Title: "Joker",
      Description: "During the 1980s, a failed stand-up comedian is driven insane and turns to a life of crime and chaos in Gotham City while becoming an infamous psychopathic crime figure.",
      Genre: { Name: "Crime", Description: "Crime film is a genre..." },
      Director: { Name: "Todd Phillips", Bio: "Todd Phillips is an American film director...", Birth: "1970" },
      ImagePath: "https://m.media-amazon.com/images/I/71KzczKR-JL._AC_UF1000,1000_QL80_.jpg",
      Featured: false,
      Cast: ["Joaquin Phoenix", "Robert De Niro", "Zazie Beetz"]
    },
    {
      _id: "6635f8b8e1b7f1a5a4f6e8b2",
      Title: "Mad Max: Fury Road",
      Description: "In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the help of a group of female prisoners, a psychotic worshiper, and a drifter named Max.",
      Genre: { Name: "Action", Description: "Action film is a film genre..." },
      Director: { Name: "George Miller", Bio: "George Miller is an Australian film director...", Birth: "1945" },
      ImagePath: "https://m.media-amazon.com/images/I/91kjTsc0s+L._AC_UF894,1000_QL80_.jpg",
      Featured: true,
      Cast: ["Tom Hardy", "Charlize Theron", "Nicholas Hoult"]
    },
    {
      _id: "6635f8b8e1b7f1a5a4f6e8b3",
      Title: "Spirited Away",
      Description: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.",
      Genre: { Name: "Animation", Description: "Animation is a method..." },
      Director: { Name: "Hayao Miyazaki", Bio: "Hayao Miyazaki is a Japanese film director...", Birth: "1941" },
      ImagePath: "https://m.media-amazon.com/images/I/71d1tygdktL._AC_UF894,1000_QL80_.jpg",
      Featured: false,
      Cast: ["Rumi Hiiragi", "Miyu Irino", "Mari Natsuki"]
    },
    {
      _id: "6635f8b8e1b7f1a5a4f6e8b4",
      Title: "Arrival",
      Description: "A linguist works with the military to communicate with alien lifeforms after twelve mysterious spacecraft appear around the world.",
      Genre: { Name: "Sci-Fi", Description: "Science fiction is a genre..." },
      Director: { Name: "Denis Villeneuve", Bio: "Denis Villeneuve is a Canadian film director...", Birth: "1967" },
      ImagePath: "https://m.media-amazon.com/images/I/91tS6GZmIfL._AC_UF1000,1000_QL80_.jpg",
      Featured: true,
      Cast: ["Amy Adams", "Jeremy Renner", "Forest Whitaker"]
    },
    {
      _id: "6635f8b8e1b7f1a5a4f6e8b5",
      Title: "Blade Runner 2049",
      Description: "Young Blade Runner K's discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard, who's been missing for thirty years.",
      Genre: { Name: "Sci-Fi", Description: "Science fiction is a genre..." },
      Director: { Name: "Denis Villeneuve", Bio: "Denis Villeneuve is a Canadian film director...", Birth: "1967" },
      ImagePath: "https://m.media-amazon.com/images/I/81ai6zx6VmL._AC_UF1000,1000_QL80_.jpg",
      Featured: true,
      Cast: ["Ryan Gosling", "Harrison Ford", "Ana de Armas"]
    },
    {
      _id: "6635f8b8e1b7f1a5a4f6e8b6",
      Title: "Get Out",
      Description: "A young African-American visits his white girlfriend's parents for the weekend, where his simmering uneasiness about their reception of him eventually reaches a boiling point.",
      Genre: { Name: "Horror", Description: "Horror is a genre..." },
      Director: { Name: "Jordan Peele", Bio: "Jordan Peele is an American actor, comedian, and filmmaker...", Birth: "1979" },
      ImagePath: "https://m.media-amazon.com/images/I/71DG62MAQaL._AC_UF1000,1000_QL80_.jpg",
      Featured: false,
      Cast: ["Daniel Kaluuya", "Allison Williams", "Bradley Whitford"]
    },
    {
      _id: "6635f8b8e1b7f1a5a4f6e8b7",
      Title: "The Social Network",
      Description: "As Harvard student Mark Zuckerberg creates the social networking site that would become known as Facebook, he is sued by the twins who claimed he stole their idea, and by the co-founder who was later squeezed out of the business.",
      Genre: { Name: "Biography", Description: "Biography film is a genre..." },
      Director: { Name: "David Fincher", Bio: "David Fincher is an American film director...", Birth: "1962" },
      ImagePath: "https://m.media-amazon.com/images/I/81i+rLMXgPL._AC_UF1000,1000_QL80_.jpg",
      Featured: false,
      Cast: ["Jesse Eisenberg", "Andrew Garfield", "Justin Timberlake"]
    },
    {
      _id: "6635f8b8e1b7f1a5a4f6e8b8",
      Title: "Whiplash",
      Description: "A promising young drummer enrolls at a cut-throat music conservatory where his dreams of greatness are mentored by an instructor who will stop at nothing to realize a student's potential.",
      Genre: { Name: "Drama", Description: "Drama is a genre..." },
      Director: { Name: "Damien Chazelle", Bio: "Damien Chazelle is an American film director...", Birth: "1985" },
      ImagePath: "https://m.media-amazon.com/images/I/71RPZX07cRL._AC_UF894,1000_QL80_.jpg",
      Featured: false,
      Cast: ["Miles Teller", "J.K. Simmons", "Melissa Benoist"]
    },
    {
      _id: "6635f8b8e1b7f1a5a4f6e8b9",
      Title: "La La Land",
      Description: "While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations for the future.",
      Genre: { Name: "Musical", Description: "Musical film is a genre..." },
      Director: { Name: "Damien Chazelle", Bio: "Damien Chazelle is an American film director...", Birth: "1985" },
      ImagePath: "https://m.media-amazon.com/images/I/91dQ4VTR53L._AC_UF1000,1000_QL80_.jpg",
      Featured: false,
      Cast: ["Ryan Gosling", "Emma Stone", "John Legend"]
    },
    {
      _id: "6635f8b8e1b7f1a5a4f6e8c0",
      Title: "Django Unchained",
      Description: "With the help of a German bounty-hunter, a freed slave sets out to rescue his wife from a brutal plantation owner in Mississippi.",
      Genre: { Name: "Western", Description: "Western is a genre..." },
      Director: { Name: "Quentin Tarantino", Bio: "Quentin Tarantino is an American film director...", Birth: "1963" },
      ImagePath: "https://m.media-amazon.com/images/I/71PXZSW9hBL._AC_UF894,1000_QL80_.jpg",
      Featured: false,
      Cast: ["Jamie Foxx", "Christoph Waltz", "Leonardo DiCaprio"]
    },
    {
      _id: "6635f8b8e1b7f1a5a4f6e8c1",
      Title: "Inglourious Basterds",
      Description: "In Nazi-occupied France during World War II, a plan to assassinate Nazi leaders by a group of Jewish U.S. soldiers coincides with a theatre owner's vengeful plans for the same.",
      Genre: { Name: "War", Description: "War film is a genre..." },
      Director: { Name: "Quentin Tarantino", Bio: "Quentin Tarantino is an American film director...", Birth: "1963" },
      ImagePath: "https://m.media-amazon.com/images/I/71AZ0-4kBkL._AC_UF1000,1000_QL80_.jpg",
      Featured: false,
      Cast: ["Brad Pitt", "M\u00e9lanie Laurent", "Christoph Waltz"]
    },
    {
      _id: "6635f8b8e1b7f1a5a4f6e8c2",
      Title: "The Grand Budapest Hotel",
      Description: "The adventures of Gustave H, a legendary concierge at a famous hotel from the fictional Republic of Zubrowka between the first and second World Wars, and Zero Moustafa, the lobby boy who becomes his most trusted friend.",
      Genre: { Name: "Comedy", Description: "Comedy is a genre..." },
      Director: { Name: "Wes Anderson", Bio: "Wes Anderson is an American film director...", Birth: "1969" },
      ImagePath: "https://m.media-amazon.com/images/I/81XCrdKPZrL._AC_UF1000,1000_QL80_.jpg",
      Featured: false,
      Cast: ["Ralph Fiennes", "F. Murray Abraham", "Mathieu Amalric"]
    },
    {
      _id: "6635f8b8e1b7f1a5a4f6e8c3",
      Title: "Moonlight",
      Description: "A young African-American man grapples with his identity and sexuality while experiencing the everyday struggles of childhood, adolescence, and burgeoning adulthood.",
      Genre: { Name: "Drama", Description: "Drama is a genre..." },
      Director: { Name: "Barry Jenkins", Bio: "Barry Jenkins is an American film director...", Birth: "1979" },
      ImagePath: "https://m.media-amazon.com/images/I/71A4p0a097L._AC_UF894,1000_QL80_.jpg",
      Featured: false,
      Cast: ["Mahershala Ali", "Trevante Rhodes", "Naomie Harris"]
    },
    {
      _id: "6635f8b8e1b7f1a5a4f6e8c4",
      Title: "Her",
      Description: "In a near future, a lonely writer develops an unlikely relationship with an operating system designed to meet his every need.",
      Genre: { Name: "Romance", Description: "Romance film is a genre..." },
      Director: { Name: "Spike Jonze", Bio: "Spike Jonze is an American director...", Birth: "1969" },
      ImagePath: "https://m.media-amazon.com/images/I/71rNJQ2g-EL._AC_UF1000,1000_QL80_.jpg",
      Featured: false,
      Cast: ["Joaquin Phoenix", "Amy Adams", "Scarlett Johansson"]
    },
    {
      _id: "6635f8b8e1b7f1a5a4f6e8c5",
      Title: "Eternal Sunshine of the Spotless Mind",
      Description: "When their relationship turns sour, a couple undergoes a medical procedure to have each other erased from their memories.",
      Genre: { Name: "Drama", Description: "Drama is a genre..." },
      Director: { Name: "Michel Gondry", Bio: "Michel Gondry is a French film director...", Birth: "1963" },
      ImagePath: "https://m.media-amazon.com/images/I/81Fj7t2FACL._AC_UF1000,1000_QL80_.jpg",
      Featured: false,
      Cast: ["Jim Carrey", "Kate Winslet", "Tom Wilkinson"]
    }
  ];

  const [movies, setMovies] = useState(initialMovies);
  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setSelectedMovie(null)}
      />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
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