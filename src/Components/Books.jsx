import { useState } from "react";
import Book from "./Book"

function Books({books, editBook, deleteBook, sortByTitle, sortByPrice}) {

    const [titleOrder, setTitleOrder] = useState("asc");
    const [priceOrder, setPriceOrder] = useState("asc");

    return(
        <div className="table">
        <table className="table table-sm">
            <thead>
                <tr className="table-active">
                    <th>Pavadinimas
                    <button type="button" className="btn btn-outline-secondary" onClick={() => {sortByTitle(titleOrder)
                setTitleOrder(titleOrder === "asc" ? "desc" : "asc")}}>Rūšiuoti</button>
                    </th>
                    <th>Kaina (€)                 
                    <button type="button" className="btn btn-outline-secondary" onClick={() => {sortByPrice(priceOrder)
                setPriceOrder(priceOrder === "asc" ? "desc" : "asc")}}>Rūšiuoti</button>
                    </th>
                    <th>Išpardavimo kaina (€)
                    </th>
                    <th>Išpardavimas</th>
                    <th>Redagavimas/Trinimas</th>
                </tr>
            </thead>
            <tbody>
                {books.map((book) =><Book key={book.id} book={book} editBook={editBook} deleteBook={deleteBook}></Book>)}
            </tbody>
        </table>
        </div>
    );
}

export default Books