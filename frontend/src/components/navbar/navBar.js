import navBar from '../navbar/navBar.css';
import { Link, useNavigate } from "react-router-dom";

function NavBar(props) {
    const navigate = useNavigate();

    return (
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    Fixed navbar
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav me-auto mb-2 mb-md-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/login">
                                Login
                                {/* <a className="nav-link active" aria-current="page" >Login</a> */}
                            </Link>
                        </li>
                        <li className="nav-item">   
                            <Link className="nav-link active" aria-current="page" to="/home">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/link">
                                Link
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link disabled" to="/item" tabindex="-1" aria-disabled="true">
                                Disabled
                            </Link>
                        </li>
                    </ul>
                    <form className="d-flex" onSubmit={e => { e.preventDefault(); }}>
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
                </div>
            </div>
        </nav>
    );
}

export default NavBar;