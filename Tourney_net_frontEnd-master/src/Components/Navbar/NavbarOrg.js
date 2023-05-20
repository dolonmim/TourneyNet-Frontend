function NavbarOrg(){
    return(
        <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">TourneyNet</a>
                <div className="d-flex">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/login">Home</a>
                    </li><li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/tournament">Tournament</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/logout">Log out</a>
                    </li>  
                </ul>
                </div>
            </div>
        </nav>
        </>
    );
}
export default NavbarOrg;  