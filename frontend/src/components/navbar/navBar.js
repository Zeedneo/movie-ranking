import navBar from '../navbar/navBar.css';
import { Link, useNavigate } from "react-router-dom";
import { BiMoviePlay } from 'react-icons/bi';
import { RiHeartsFill } from 'react-icons/ri';
import { IoLogInOutline } from 'react-icons/io5';



function NavBar(props) {
    const navigate = useNavigate();

    return (
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <Link className="navbar-brand " to="/">
                        <BiMoviePlay /> movie
                    </Link>
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
                                navigate(`../${event.target.value}`, { replace: false })

                            }}
                        />
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