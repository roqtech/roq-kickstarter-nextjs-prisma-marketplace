import AppLayout from "layout/app/app.layout";
import Listings from "components/listing/listings";
import { withAuth } from "components/hocs/auth/with-auth";
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

export default withAuth({
  redirectIfAuthenticated: false,
  redirectTo: "/login",
})(DashboardPage);
