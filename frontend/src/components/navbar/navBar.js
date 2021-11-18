import navBar from '../navbar/navBar.css';

function NavBar(props) {

    return (
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Fixed navbar</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarCollapse">
                    <ul className="navbar-nav me-auto mb-2 mb-md-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/login">Login</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/home">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/link">Link</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link disabled" href="/item" tabindex="-1" aria-disabled="true">Disabled</a>
                        </li>
                    </ul>
                    <form className="d-flex">
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            value={props.term}
                            onChange={event => {
                                props.SearchKeyword(event.target.value);
                            }}
                        />
                    </form>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;