import axios from "axios";
import { useEffect, useState } from "react";


function Favorites(props) {
    const [data, setData] = useState([]);
    const [click, setClick] = useState(0);

    useEffect(() => {
        axios.post('http://3c2b-2001-fb1-0-703d-508-57c7-d135-65a1.ap.ngrok.io/showFavorite', {
            username: props.Username
        })
            .then(function (response) {
                // console.log(response.data.Response)
                // console.log(response.data.status)
                // console.log(response.data.username)
                // console.log(response.data.favorite)
                setData(response.data.favorite)
            })
    }, [click]);


    return (
        <div className="container">
            {data.map((val, key) => {
                return <div class="card" style={{ width: "16rem" }}>
                    <div class="card-body">
                        <img class="card-img-top" src={val.Poster} alt="..." />
                        <h5 classname="card-title"> {val.Title}</h5>
                        <h7 classname="card-type"> Type {val.Type} </h7>
                        <br />
                        <h7 classname="card-year"> Release Date {val.Year}</h7>
                    </div>
                </div>
            })}
        </div>
    );
}

export default Favorites;