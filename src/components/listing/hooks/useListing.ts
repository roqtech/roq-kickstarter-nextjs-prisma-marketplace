import { ListingCreateDto } from "components/listing/types";

export const useListing = () => {
  const createListing = async (listing: ListingCreateDto) => {
    return fetch("/api/listing", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(listing),
    });
  };

  return {
    createListing,
  };
};
