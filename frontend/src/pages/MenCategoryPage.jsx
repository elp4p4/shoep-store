import useDocumentTitle from "../hooks/useDocumentTitle";
import HomePage from "./HomePage";

const MenCategoryPage = () => {
  useDocumentTitle("Men");
  return <HomePage category="Men" />;
};

export default MenCategoryPage;
