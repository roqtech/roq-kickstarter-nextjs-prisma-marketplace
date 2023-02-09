import AppLayout from "layout/app/app.layout";
import Listings from "components/listing/listings";
import { requireNextAuth } from "@roq/nextjs";
import styles from "pages/dashboard/dashboard.module.css";

function DashboardPage() {
  return (
    <AppLayout>
      <div className={styles.container}>
        <Listings />
      </div>
    </AppLayout>
  );
}

export default requireNextAuth({
  redirectIfAuthenticated: false,
  redirectTo: "/login",
})(DashboardPage);
