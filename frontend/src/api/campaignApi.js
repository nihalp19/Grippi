// In a real application, this would be an actual API call
export const fetchCampaigns = async () => {
    // Simulate API latency
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockCampaigns);
      }, 500);
    });
  };
  