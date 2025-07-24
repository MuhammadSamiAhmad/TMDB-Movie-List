import type { Movie } from "../types/MoviesType";

/**
 * =================================================================================================
 * EXPLANATION: Why the props type is `{ movie: Movie }` and not just `Movie`.
 * =================================================================================================
 *
 * Let's use an analogy: A Gift Box 🎁
 *
 * - `Movie`: This is the **TYPE** of gift inside (e.g., a `Watch`). It describes what a movie is:
 * `{ title: string, year: number, ... }`.
 *
 * - `props`: This is the **gift box** itself. It's an object that CONTAINS the gift.
 *
 * - `{ movie }`: This is you **OPENING the gift box** and taking out the item named `movie`.
 * This is called "destructuring".
 *
 * ---
 *
 * ### The Correct Way: `({ movie }: { movie: Movie })`
 *
 * This translates to:
 * - `({ movie })`: "I am opening a gift box and taking out the item called `movie`."
 * - `: { movie: Movie }`: "The gift box I'm opening is an object `{}` that MUST contain a
 * property called `movie`, and that item must be of type `Movie`."
 *
 * This works perfectly because you are correctly describing the gift box.
 *
 * ---
 *
 * ### The Incorrect Way: `({ movie }: Movie)`
 *
 * This translates to:
 * - `({ movie })`: "I am opening a gift box and taking out the item called `movie`."
 * - `: Movie`: "The gift box **IS** a `Movie`."
 *
 * This is a contradiction. The gift box *contains* the movie; it isn't the movie itself.
 *
 * ---
 */

/*
  Props Typing & Destructuring Guide for MovieCard Component

  1. METHOD 1: Passing the Entire Object
     ───────────────────────────────────────────
     Parent Call:
       <MovieCard key={movie.id} movie={movie} />
     Child Signature:
       const MovieCard = ({ movie }: { movie: Movie }) => { … }
     Explanation:
       - The component receives a single props object: { movie: Movie }.
       - We annotate that props object with { movie: Movie }.
       - Using JS destructuring ({ movie }) pulls out the movie property.
       - Access fields via movie.poster_path, movie.title, etc.
     Pros: Explicit grouping of all movie data.
     Cons: You must always prefix with “movie.”.

  2. METHOD 2: Spreading Props
     ────────────────────────────
     Parent Call:
       <MovieCard key={movie.id} {...movie} />
     Child Signature:
       const MovieCard = ({ title, poster_path }: Movie) => { … }
     Explanation:
       - The spread syntax ({...movie}) passes each Movie field as its own prop.
       - The incoming props object has the exact shape of the Movie type.
       - We annotate the props object as Movie, then destructure only what we need.
       - Access fields directly: title, poster_path, vote_average, etc.
     Pros: Cleaner usage inside the component; self‑documenting prop list.
     Cons: Parent call hides which exact props are consumed; may leak unused data.

  3. METHOD 3: Nested Destructuring (Recommended)
     ───────────────────────────────────────────────
     Parent Call:
       <MovieCard key={movie.id} movie={movie} />
     Child Signature:
       const MovieCard = (
         { movie: { title, poster_path, vote_average } }: { movie: Movie }
       ) => { … }
     Explanation:
       - Like Method 1, the props object is { movie: Movie }.
       - We annotate with { movie: Movie }.
       - Nested JS destructuring ({ movie: { title, poster_path } }) pulls out specific fields in one step.
       - Access fields directly: title, poster_path, vote_average.
     Pros: Explicit parent API + direct child access—best of both worlds.
     Cons: Slightly more complex signature syntax.

  4. The Special key Prop
     ───────────────────────
     - React’s key prop is reserved for list reconciliation.
     - You cannot read props.key inside your component—React consumes it.
     - Always supply key on the JSX element in the list; do not include it in your TypeScript props interface.

  5. Adding Additional Props (e.g., priority)
     ─────────────────────────────────────────────
     Suppose you want to pass an extra boolean prop priority={true}.

     • Method 1 (object-based)
       Parent:
         <MovieCard movie={movie} priority={true} />
       Child Signature:
         const MovieCard = (
           { movie, priority }: { movie: Movie; priority: boolean }
         ) => { … }
       - Extend the props type to include priority: { movie: Movie; priority: boolean }.
       - Destructure priority alongside movie (or nested movie).

     • Method 2 (spread-based)
       Parent:
         <MovieCard {...movie} priority={true} />
       Child Signature:
         const MovieCard = (
           { title, poster_path, priority }: Movie & { priority: boolean }
         ) => { … }
       - Use an intersection type to merge Movie with your extra prop.

       • Method 3 (object-based)
       Parent:
         <MovieCard movie={movie} priority={true} />
       Child Signature:
         const MovieCard = ({ movie, priority }: { movie: Movie; priority: boolean }) => {
  // access `priority` directly
};

  Summary:
    - Choose Method 1 for simplicity and full object access.
    - Choose Method 2 when you want to explicitly list used props.
    - Choose Method 3 for clarity in the parent and convenience in the child.
    - Remember: key is reserved. Any other props simply extend your props interface.
*/

const MovieCard = ({
  movie: { title, vote_average, poster_path, release_date, original_language },
}: {
  movie: Movie;
}) => {
  return (
    <div className="movie-card">
      <img
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500${poster_path}`
            : "/no-movie.png"
        }
        alt={title}
      />
      <div className="mt-4">
        <h3>{title}</h3>
        <div className="content">
          <div className="rating">
            <img src="star.svg" alt="Star Icon" />
            <p>{vote_average ? vote_average.toFixed(1) : "N/A"}</p>
          </div>
          <span>•</span>
          <p className="lang">{original_language}</p>
          <span>•</span>
          <p className="year">
            {release_date ? release_date.split("-")[0] : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
