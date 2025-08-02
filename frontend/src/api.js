// api.js - Enhanced API with better error handling and features

const API_URL = "http://127.0.0.1:8000/api/ipos/";

// Fetch all IPOs (GET)
export async function fetchIPOs() {
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('✅ IPOs fetched successfully:', data);
    return data;
  } catch (error) {
    console.error("❌ Error fetching IPOs:", error);
    // Return empty array as fallback
    return [];
  }
}

// Create a new IPO (POST)
export async function createIPO(ipoData) {
  try {
    // Validate required fields
    const requiredFields = ['companyName', 'priceBand', 'openDate', 'closeDate', 'issueSize'];
    const missingFields = requiredFields.filter(field => !ipoData[field]);
    
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
    }

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        ...ipoData,
        createdAt: new Date().toISOString(),
        status: 'upcoming',
        id: Date.now().toString(), // Temporary ID generation
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('✅ IPO created successfully:', result);
    return result;
  } catch (error) {
    console.error("❌ Error creating IPO:", error);
    throw error;
  }
}

// Update an existing IPO (PUT)
export async function updateIPO(ipoId, ipoData) {
  try {
    const response = await fetch(`${API_URL}${ipoId}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({
        ...ipoData,
        updatedAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log('✅ IPO updated successfully:', result);
    return result;
  } catch (error) {
    console.error("❌ Error updating IPO:", error);
    throw error;
  }
}

// Delete an IPO (DELETE)
export async function deleteIPO(ipoId) {
  try {
    const response = await fetch(`${API_URL}${ipoId}/`, {
      method: "DELETE",
      headers: {
        "Accept": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    console.log('✅ IPO deleted successfully');
    return { success: true };
  } catch (error) {
    console.error("❌ Error deleting IPO:", error);
    throw error;
  }
}

// Get IPO by ID (GET)
export async function getIPOById(ipoId) {
  try {
    const response = await fetch(`${API_URL}${ipoId}/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('✅ IPO fetched successfully:', data);
    return data;
  } catch (error) {
    console.error("❌ Error fetching IPO:", error);
    throw error;
  }
}

// Search IPOs by company name (GET with query params)
export async function searchIPOs(searchTerm) {
  try {
    const url = new URL(API_URL);
    url.searchParams.append('search', searchTerm);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('✅ IPO search results:', data);
    return data;
  } catch (error) {
    console.error("❌ Error searching IPOs:", error);
    return [];
  }
}

// Helper function to check API health
export async function checkAPIHealth() {
  try {
    const response = await fetch(API_URL.replace('/ipos/', '/health/'), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });
    
    return response.ok;
  } catch (error) {
    console.error("❌ API health check failed:", error);
    return false;
  }
}
