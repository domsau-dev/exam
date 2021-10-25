function Statistics({bookCount, averagePrice}) {
    return(<div className="center">
        <h2>Statistika:</h2>
        <div>Knygų kiekis: {bookCount}</div>
        <div>Kainų vidurkis (€): {averagePrice}</div>
    </div>
    );
}

export default Statistics