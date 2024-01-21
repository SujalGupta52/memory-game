export default function Card({name, img, id, clickHandler}) {
    return(
        <div className="card" id={id} onClick={clickHandler}>
            <img src={img}/>
            <div className="name">{name[0].toUpperCase() + name.slice(1)}</div>
        </div>
    )
}