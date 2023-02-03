import styles from "components/listing/listing-card.module.css";
import Card from "components/card";
import { Listing } from "components/listing/types";

export default function FileCard({ listing }: { listing: Listing }) {
  const { title, fileUrl, createdAt, description, price } = listing;

  const formatDate = () => {
    const date = new Date(createdAt || Date.now());
    return `${
      date.getMonth() + 1
    }-${date.getDay()} at ${date.toLocaleTimeString()} `;
  };

  return (
    <Card className={styles.card}>
      <div className={styles.content}>
        <div className={styles.imgContainer}>
          <a href={fileUrl} target="_blank" rel="noreferrer">
            <img
              alt={title.slice(0, 10)}
              className={styles.img}
              src={fileUrl}
            />
          </a>
        </div>
        <div className={styles.listingInfo}>
          <div>
            <h3>{title}</h3>
            <h4 className={styles.price}>€{price}</h4>
            <div className={styles.timestamp}>Listed on {formatDate()}</div>
          </div>
        </div>

        <div className={styles.description}>{description}</div>
      </div>
    </Card>
  );
}
