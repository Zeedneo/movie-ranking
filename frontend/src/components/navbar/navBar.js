import navBar from '../navbar/navBar.css';
import { Link, useNavigate } from "react-router-dom";
import { BiMoviePlay, BiSearchAlt } from 'react-icons/bi';
import { RiHeartsFill } from 'react-icons/ri';
import { IoLogInOutline } from 'react-icons/io5';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';



function NavBar(props) {
    const navigate = useNavigate();

    return (
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg">
            <div className="container-fluid">
                <Link className="navbar-brand " to="/">
                    <BiMoviePlay /> movie
                </Link>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <form className="d-flex mx-auto" onSubmit={e => { e.preventDefault(); }}>
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            value={props.term}
                            onChange={event => {
                                props.SearchKeyword(event.target.value);
                                navigate(`../${event.target.value}`, { replace: false });
                                props.repage(1);
                                props.type("");
                            }}
                        />
                        <div class="dropdown">
                            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                Type
                            </button>
                            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><a class="dropdown-item" href="#" onClick={() => props.type("")}>all</a></li>
                                <li><a class="dropdown-item" href="#" onClick={() => props.type("movie")}>movie</a></li>
                                <li><a class="dropdown-item" href="#" onClick={() => props.type("series")}>series</a></li>
                                <li><a class="dropdown-item" href="#" onClick={() => props.type("game")}>game</a></li>
                            </ul>
                        </div>
                    </form>

                    <ul className="navbar-nav ms-10 mb-2 mb-md-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/favorites">
                                <RiHeartsFill /> Favorites
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/login">
                                <IoLogInOutline /> Login
                            </Link>
                        </li>
                    </ul>

                </div>
            </div>
        </nav>
    );
}


export default NavBar;