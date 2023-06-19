import Products from "../../components/Products/Products";
import { ProductListSection } from "./ProductListStyle";
import { useParams } from "react-router-dom";

export default function ProductList() {
  const userAccountName = useParams();

  return (
    <ProductListSection>
      <Products timeView={true} nameView={true} userAccountName={userAccountName.id} />
    </ProductListSection>
  );
}
