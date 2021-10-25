import { useEffect, useState } from "react";

function Book({book, editBook, deleteBook}) {

    const [sale, setSale] = useState(book.sale === 0 ? false : true);
    const [price, setPrice] = useState(book.price);
    const [old_price, setOldPrice] = useState(book.price);
    const [discount_price, setDiscountPrice] = useState(book.discount_price);
    const [old_discount_price, setOldDiscountPrice] = useState(book.discount_price);

    useEffect(() => {
        setSale(book.sale)
      }, [book])

      const handleChange = (e) => {
          e.target.checked ? setSale(1) : setSale(0);
      }

    const handlePrice = (e) => {
        setPrice(e.target.value);
    }

    const handleDiscountPrice = (e) => {
        setDiscountPrice(e.target.value);
    }

    const edit = () => {
        if ((price > 999 || price < 0) || (discount_price > 999 || discount_price < 0)) {
            window.alert("Kaina turi būti tarp 0 ir 999");
            return;
        } else if (Number(price) === NaN || Number(discount_price) === NaN) {
            window.alert("Kaina turi būti skaičius");
            return;
        } else if (price === "" || discount_price === "") {
            window.alert("Kaina turi būti skaičius");
            return;
        }
        editBook(book.id, {
            title: book.title,
            price: price,
            discount_price: discount_price,
            sale: sale
        })
        setOldPrice(price);
        setOldDiscountPrice(discount_price);
        window.alert("Įvykdytas knygos redagavimas")

    }
    return(<tr className="table-info">
        <td>{book.title}</td>
        <td>{old_price}
        <div>
        <input type="number" min="0" max="999" step="0.01" value={price} onChange={(e) => handlePrice(e)}/>
        </div>  
        
        </td>
        <td>{old_discount_price}
        <div>
        <input type="number" min="0" max="999" step="0.01" value={discount_price} onChange={(e) => handleDiscountPrice(e)}/>
        </div>
            </td>
        <td>{sale === 0 ? "Nėra išpardavimo" : "Išpardavimas"}
        <input type="checkbox" checked={sale} onChange={(e) => handleChange(e)}/>
        </td>
        <td>
            <button className="btn btn-success" onClick={() => edit()}>Redaguoti</button>
            <button className="btn btn-danger" onClick={() => deleteBook(book.id)}>Trinti</button>
        </td>
        </tr>
        
    );
}

export default Book