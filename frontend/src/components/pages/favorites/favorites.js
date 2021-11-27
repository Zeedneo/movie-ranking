import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { BiBookHeart } from "react-icons/bi";
import { ImInfo } from "react-icons/im";
import { FaHeartBroken } from "react-icons/fa";
import favorites from "../favorites/favorites.css"
import url from "../../url_file";


function Favorites(props) {
    const navigate = useNavigate();
    const [type, setType] = useState("");
    const [data, setData] = useState([]);
    const [click, setClick] = useState(0);
    const [idRemove, setIdRemove] = useState("1");



    const removeFavorite = async (value) => {
        await axios.post(url + 'removeFavorite', {
            username: props.Username, movieID: value
        })
            .then(function (response) {
                // console.log(response.data.Response);
                // console.log(response.data.status);
                // console.log(response.data);
            })
    }

    useEffect(() => {
        axios.post(url + 'showFavorite', {
            username: props.Username, type: type
        })
            .then(function (response) {
                console.log("กด");
                // console.log(response.data.Response)
                // console.log(response.data.status)
                // console.log(response.data.username)
                // console.log(response.data.favorite)
                setData(response.data.favorite);
                // console.log(response.data.favorite);
                props.totalOfPages(1);
                props.state(1);
            })
    }, [click, type, idRemove]);


    return (
        <div className="container">
            <div className="myFavAndType">
                <h2 className="header title">My Favorites <BiBookHeart /></h2>
                <div className="header">
                    <div class="dropdown">
                        <button class="btn btn-fav dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                            Type
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            <li><a class="dropdown-item drop-fav" href="#" onClick={() => setType("")}>all</a></li>
                            <li><a class="dropdown-item drop-fav" href="#" onClick={() => setType("movie")}>movie</a></li>
                            <li><a class="dropdown-item drop-fav" href="#" onClick={() => setType("series")}>series</a></li>
                            <li><a class="dropdown-item drop-fav" href="#" onClick={() => setType("game")}>game</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="row">
                {data
                    .map((val, key) => {
                        return (
                            <div class="card">
                                {/* {
                                    val.imdbID
                                    ? <div>ใช่</div>
                                    : <div>ไม่</div>
                                } */}
                                <div class="card-body">
                                    <img class="card-img-top" src={val.Poster} alt="..." />
                                    <h4 classname="card-title"> {val.Title}</h4>
                                    <br />
                                    <h6 classname="card-type"> Type {val.Type} </h6>
                                    <h6 classname="card-year"> Release Date {val.Year}</h6>
                                    <div>
                                        <button
                                            type="button"
                                            classname="card-buttonInfo"
                                            id="buttonInfo"
                                            onClick={() => {
                                                // console.log("กด i");
                                                props.Idmovie(val.imdbID);
                                                navigate(`../infoMovie`, { replace: false })
                                            }}
                                        > <ImInfo /> </button>
                                        <button
                                            type="button"
                                            classname="card-buttonUnFav"
                                            id="buttonUnFav"
                                            onClick={() => {
                                                removeFavorite(val.imdbID);
                                                setIdRemove(val.imdbID);
                                            }}
                                        > <FaHeartBroken /> </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
            </div>
        </div>
    );
}

export default Favorites;