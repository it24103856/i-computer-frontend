 export  default function ProductCard(props) {
    console.log(props)
  return (
    <div>
        <h1> {props.name}</h1>
        <img
          src={props.image}/>
        <p>price {props.price}</p>
      </div>
  );
}