// ProductDetail.jsx
import React, { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./Product.css";
import { AppContext } from "../../context/AppContext";


export default function ProductDetail() {
  const { id } = useParams();
  const { backendUrl, isLoggedIn, addToCart } = useContext(AppContext);
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [upsell, setUpsell] = useState([]);
  const [hero, setHero] = useState("");
  const [qty, setQty] = useState(1);
  const [selectedColor, setSelectedColor] = useState("");
  const maxQty = 5;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/products/${id}`);
        const json = await res.json();
        if (!res.ok) throw new Error(json.message);

        const prod = json.product;
        const relMain = prod.mainImage.includes("/uploads")
          ? prod.mainImage.slice(prod.mainImage.indexOf("/uploads"))
          : prod.mainImage;
        setHero(`${backendUrl}${relMain}`);
        const variants = prod.variants || [];
        setSelectedColor(variants[0]?.color || "");

        setProduct({
          ...prod,
          mainImageRel: relMain,
          imagesRel: (prod.images || []).map(img =>
            img.includes("/uploads") ? img.slice(img.indexOf("/uploads")) : img
          ),
        });
      } catch (err) {
        console.error("Product fetch error:", err.message);
      }
    };

    const fetchUpsell = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/products`);
        const json = await res.json();
        if (!res.ok) throw new Error(json.message);
        setUpsell(json.products.filter(p => p._id !== id).slice(0, 3));
      } catch (err) {
        console.error("Upsell fetch failed:", err.message);
      }
    };

    fetchProduct();
    fetchUpsell();
  }, [id, backendUrl]);

  const changeQty = delta => {
    setQty(q => Math.min(maxQty, Math.max(1, q + delta)));
  };

  const handleAddToCart = async () => {
    if (!isLoggedIn) return navigate("/login");
    try {
      await addToCart(product._id, qty);
      alert("Added to cart!");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleBuyNow = async () => {
    if (!isLoggedIn) return navigate("/login");
    try {
      await addToCart(product._id, qty);
      navigate("/buy-now", {
        state: {
          productId: product._id,
          quantity: qty,
          selectedColor,
        },
      });
    } catch (err) {
      alert("Failed to proceed to Buy Now: " + err.message);
    }
  };

  if (!product) {
    return <h2 style={{ padding: "4rem" }}>Loading product…</h2>;
  }

  const { title, description, price, category, subcategory, variants, mainImageRel, imagesRel } = product;

  return (
    <>
      <section className="pd-card">
        <div className="pd-left">
          <img className="pd-hero" src={hero} alt={title} />
          <div className="pd-thumbs">
            {[mainImageRel, ...imagesRel].map((rel, idx) => (
              <img
                key={idx}
                src={`${backendUrl}${rel}`}
                className="pd-thumb"
                onClick={() => setHero(`${backendUrl}${rel}`)}
                alt={`thumb ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="pd-right">
          <p className="pd-collection">{subcategory || category}</p>
          <h1 className="pd-title">{title}</h1>
          <div className="pd-rating">★★★★★ <span>1,128 reviews</span>
          </div>
          <p className="pd-price">₹{price.toLocaleString()}
          </p>

          <ul className="pd-meta">
            <li>
              <strong>Item no:</strong> #{product._id.slice(-6)}
            </li>
            <li>
              <strong>Availability:</strong> <span className="pd-stock">In stock</span>
            </li>
          </ul>

          <p className="pd-desc">{description}</p>

          <label className="pd-label">Colour</label>
          <div className="pd-swatches">
            {(variants || []).map((v) => (
              <button
                key={v._id}
                className={`pd-swatch ${v.color === selectedColor ? "active" : ""}`}
                style={{ backgroundColor: v.color }}
                onClick={() => setSelectedColor(v.color)}
                aria-label={v.color}
              />
            ))}
          </div>

          <label className="pd-label">Quantity</label>
          <div className="pd-qty">
            <button onClick={() => changeQty(-1)} disabled={qty === 1}>-</button>
            <input
              type="number"
              value={qty}
              onChange={e => changeQty(+e.target.value - qty)}
            />
            <button onClick={() => changeQty(1)} disabled={qty === maxQty}>+</button>
          </div>

          <div className="pd-actions">
            <button onClick={handleAddToCart} className="pd-btn primary">Add to cart</button>
            <button onClick={handleBuyNow} className="pd-btn ghost">♡ Buy Now</button>
          </div>
        </div>
      </section>

      <section className="pd-upsell">
        <h3>You may also like</h3>
        <div className="pd-upsell-wrap">
          {upsell.map(p => {
            const rel = p.mainImage.includes("/uploads")
              ? p.mainImage.slice(p.mainImage.indexOf("/uploads"))
              : p.mainImage;
            return (
              <Link to={`/product/${p._id}`} key={p._id} className="pd-upsell-card">
                <img src={`${backendUrl}${rel}`} alt={p.title} />
                <h4>{p.title}</h4>
                <p>₹{p.price.toLocaleString()}</p>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
