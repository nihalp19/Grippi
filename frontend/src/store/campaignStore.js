import { create } from "zustand";
import { axiosInstance } from "../api/axiosInstance";

export const campaignStore = create((set, get) => ({
  campaigns: null,
  statusFilter: "All",
  filteredCampaigns: null,

  fetchCampaigns: async () => {
    try {
      const res = await axiosInstance.get("/campaigns");
      console.log("data", res.data);
      set({ campaigns: res.data });
      campaignStore.getState().applyFilter();
    } catch (error) {
      console.log("error while fetching campaigns");
    }
  },

  applyFilter: () => {
    const { campaigns, statusFilter } = campaignStore.getState();

    if (statusFilter === "All") {
      set({ filteredCampaigns: campaigns });
    } else if (campaigns) {
      const filtered = campaigns.filter(
        (campaign) => campaign.status === statusFilter
      );
      set({ filteredCampaigns: filtered });
    }
  },

  setFilter: (filter) => {
    set({ statusFilter: filter });
    campaignStore.getState().applyFilter(); // Apply the filter immediately
  },
}));
