const BASE_URL = "http://localhost:3000";

export interface UserResponse {
  data: any[];
  total: number;
}

/**
 * Fetches a list of users with optional pagination and filtering.
 */
export const getUsers = async (
  page?: number,
  limit?: number,
  filters: Record<string, any> = {}
): Promise<UserResponse> => {
  const url = new URL(`${BASE_URL}/users`);

  if (page) url.searchParams.append("_page", Math.max(1, page).toString());
  if (limit) url.searchParams.append("_per_page", limit.toString());

  // Append dynamic filters
  Object.keys(filters).forEach((key) => {
    if (filters[key]) {
      url.searchParams.append(key, filters[key]);
    }
  });

  try {
    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}: ${response.statusText || "Failed to fetch users"}`);
    }

    const result = await response.json();
    
    // json-server 1.0 returns { data, items, pages, ... } when paginated with _page and _per_page
    // Otherwise it returns the array directly
    if (result && typeof result === "object" && result.data && Array.isArray(result.data)) {
      return {
        data: result.data,
        total: result.items || result.data.length,
      };
    }

    // Handle non-paginated case (direct array) or cases where json-server 1.0 might return it differently
    if (Array.isArray(result)) {
      return {
        data: result,
        total: result.length,
      };
    }

    return {
      data: [],
      total: 0,
    };
  } catch (error: any) {
    if (error.name === "TypeError") {
      throw new Error("Network error: Please check if the API server is running.");
    }
    throw error;
  }
};

/**
 * Fetches a single user by their ID.
 */
export const getUserById = async (id: string | number): Promise<any> => {
  const url = `${BASE_URL}/users/${id}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP Error ${response.status}: ${response.statusText || "Failed to fetch user details"}`);
    }

    const user = await response.json();
    return user;
  } catch (error: any) {
    if (error.name === "TypeError") {
      throw new Error("Network error: Please check if the API server is running.");
    }
    throw error;
  }
};
