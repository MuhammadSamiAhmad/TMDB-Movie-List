import { Client, Account, Databases, ID, Query } from "appwrite";
import type { Movie, TrendingMovies } from "../types/MoviesType";

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

const account = new Account(client);
const databases = new Databases(client);

export { client, account, databases };

const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

export const updateSearchCount = async (searchTerm: string, movie: Movie) => {
  //1. Use Appwrite SDK to check if the search term exists in the database
  try {
    const result = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", searchTerm),
    ]);

    if (result.documents.length > 0) {
      //2. If it exists, increment the search count
      const doc = result.documents[0];
      await databases.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
        count: doc.count + 1,
        lastSearchedMovie: movie,
      });
    } else {
      await databases.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm,
        count: 1,
        movie_id: movie.id,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        title: movie.title,
      });
    }
  } catch (error) {
    console.error("Error updating search count:", error);
  }
};

export const getTrendingMovies = async (): Promise<TrendingMovies[]> => {
  try {
    const result = await databases.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.orderDesc("count"),
      Query.limit(5),
    ]);

    // Map the documents to the TrendingMovies type
    const movies: TrendingMovies[] = result.documents.map((doc) => ({
      id: doc.movie_id, // Map movie_id to id
      count: doc.count,
      poster_url: doc.poster_url,
      searchTerm: doc.searchTerm,
      title: doc.title,
    }));

    return movies;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    return [];
  }
};
