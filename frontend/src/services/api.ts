import { API_BASE_URL } from '../constants';

export interface LeadPayload {
  email: string;
  message: string;
  selections: Record<string, any>;
  priceEstimate: string;
  totalPrice: number;
  monthlyPrice: number;
}

export const submitLead = async (data: LeadPayload): Promise<{ success: boolean; error?: string }> => {
  if (!API_BASE_URL) {
    console.error("VITE_API_URL is not defined");
    return { success: false, error: "Configuration error" };
  }

  // Use the exact /submit endpoint, handling potential trailing slashes in API_BASE_URL
  const baseUrl = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;
  const url = `${baseUrl}/submit`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // Handle potential non-JSON responses gracefully
    let result;
    const text = await response.text();
    try {
      result = text ? JSON.parse(text) : {};
    } catch (e) {
      result = { error: 'Invalid server response' };
    }
    
    if (!response.ok) {
      return { success: false, error: result.error || 'Submission failed' };
    }
    
    // Some APIs might just return 200 OK without a JSON body or {success: true}
    return { success: true, ...result };
  } catch (error) {
    console.error("Error submitting lead:", error);
    return { success: false, error: 'Network error' };
  }
};

export const submitCookieConsent = async (status: string): Promise<void> => {
  const baseUrl = import.meta.env.VITE_API_URL
  const response = await fetch(`${baseUrl}/cookie-consent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      status,
      userAgent: navigator.userAgent,
    }),
  })
  if (!response.ok) {
    throw new Error('Failed to submit cookie consent')
  }
}
