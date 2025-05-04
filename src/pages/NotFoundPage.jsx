import { Link } from "react-router";
import style from "./NotFoundPage.module.css";
import useTitle from "../hooks/useTitle";

function NotFoundPage() {
  useTitle("page not found")
  return (
    <div className={style.container}>
      <span>😕</span>
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <p>
        We're sorry, the page you're looking for doesn't exist or may have been
        removed.
      </p>
      <Link to="/">Return to Homepage</Link>
    </div>
  );
}

export default NotFoundPage;
