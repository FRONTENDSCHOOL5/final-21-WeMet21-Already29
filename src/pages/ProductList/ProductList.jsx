import Products from "../../components/Products/Products";
import { Ul } from "./ProductListStyle";
import { useParams } from "react-router-dom";

export default function ProductList() {
  const userAccountName = useParams();

  return (
    <section>
      <Ul>
        <Products timeView={true} userAccountName={userAccountName.id} />
      </Ul>
    </section>
  );
}
