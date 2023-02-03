export interface ListingCreateDto {
  title: string;
  description?: string;
  price: number;
  fileId: string;
}

export interface Listing {
  id: string;
  title: string;
  description: string;
  fileId: string;
  fileUrl?: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ListingsFetchResponse {
  listings: Listing[];
}
