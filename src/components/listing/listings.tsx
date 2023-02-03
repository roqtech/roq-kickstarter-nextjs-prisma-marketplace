import { useState } from "react";
import useSWR, { Fetcher } from "swr";
import { routes } from "routes";
import styles from "components/listing/listings.module.css";
import ListingCard from "components/listing/listing-card";
import Loader from "components/loader";
import { ListingsFetchResponse } from "components/listing/types";
import Card from "components/card";
import CreateListing from "components/listing/create-listing";

export default function Listings() {
  const [showCreate, setShowCreate] = useState(false);

  const fetcher: Fetcher<ListingsFetchResponse> = (apiURL: string) =>
    fetch(apiURL).then((res) => res.json());

  const { data, error, isLoading, mutate } = useSWR(
    routes.server.listings,
    fetcher
  );

  const handleCreateSuccess = () => {
    mutate();
    setShowCreate(false);
  };

  return (
    <div className={styles.feed}>
      <h2 className={styles.title}>Recent listings</h2>

      <div className={styles.uploadContainer}>
        <Card>
          {showCreate ? (
            <CreateListing onSuccess={handleCreateSuccess} />
          ) : (
            <button className="btn" onClick={() => setShowCreate(true)}>
              Create a Listing
            </button>
          )}
        </Card>
      </div>

      <div className={styles.listContainer}>
        {isLoading ? <Loader /> : <></>}

        {data?.listings?.map((l) => (
          <ListingCard listing={l} key={l.id} />
        ))}
      </div>
    </div>
  );
}
