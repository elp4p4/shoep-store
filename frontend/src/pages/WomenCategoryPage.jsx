import useDocumentTitle from "../hooks/useDocumentTitle";
import HomePage from "./HomePage";

const WomenCategoryPage = () => {
  useDocumentTitle('Women');
  return <HomePage category="Women" />;
};

export default WomenCategoryPage;
