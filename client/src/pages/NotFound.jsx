import { Link } from "react-router-dom";
import PublicLayout from "../layouts/PublicLayout";

function NotFound() {
  return (
    <PublicLayout>
      <section className="flex min-h-[75vh] flex-col items-center justify-center px-5 text-center">
        <h1 className="text-8xl font-black text-purple-500">404</h1>
        <h2 className="mt-5 text-3xl font-bold">Page Not Found</h2>
        <p className="mt-3 text-gray-400">
          The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="mt-8 rounded-xl bg-purple-600 px-7 py-3 font-semibold hover:bg-purple-500"
        >
          Back to Home
        </Link>
      </section>
    </PublicLayout>
  );
}

export default NotFound;