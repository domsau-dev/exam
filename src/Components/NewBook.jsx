import { useEffect, useState } from "react";

function NewBook({addBook}) {

    const [title, setTitle] = useState('');
    const [price, setPrice] = useState(0);
    const [discount_price, setDiscountPrice] = useState(0);
    const [sale, setSale] = useState(0);

    
    const control = (e, what) => {
        switch (what) {
            case 'title':
                setTitle(e.target.value);
                break;
            case 'price':
                setPrice(e.target.value);
                break;
            case 'discount_price':
                setDiscountPrice(e.target.value);
                break;
            case 'sale':
                setSale(e.target.checked ? 1 : 0);
                break;
        }
    }

    
    const insert = () => {
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
        addBook({
            title: title,
            price: price,
            discount_price: discount_price,
            sale: sale
         });
        setTitle('');
        setPrice(0);
        setDiscountPrice(0);
        setSale(0);
        window.alert("Įvykdytas knygos sukūrimas")
     }
 

    return(
        <div className="container center newbook">
            <h2>Naujos knygos kūrimas</h2>
            <div>Pavadinimas: <input type="text" onChange={(e) => control(e, "title")} value={title}/></div>
            <div>Kaina: <input type="number" min="0" max="999" size="10" onChange={(e) => control(e, "price")} value={price}/></div>
            <div>Išpardavimo kaina: <input type="number" min="0" max="999" size="10" onChange={(e) => control(e, "discount_price")} value={discount_price}/></div>
            <div>Išpardavimas <input type="checkbox" onChange={(e) => control(e, "sale")}/></div>
            <button type="button" className="btn btn-outline-secondary" onClick={insert}>Kurti</button>
        </div>

        
    );
}

export default NewBook