import Header from "./Header";
import ProductListComponent from "./ProductListComponent";

import { useRef } from "react";

function Home() {
  const productSectionRef = useRef<HTMLDivElement | null>(null);

  const scrollToProductSection = () => {
    if (productSectionRef.current) {
      productSectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="HomeContainer">
      <Header />
      <section className="one">
        <div className="navProducts">
          <div className="arrow-container">
            <h2 className="homeProducts" onClick={scrollToProductSection}>
              Products
            </h2>
            <div className="arrow" onClick={scrollToProductSection}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </section>
      <section className="two" ref={productSectionRef}>
        <ProductListComponent />
      </section>
    </div>
  );
}

export default Home;
