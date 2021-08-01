const Navbar = () => {
    return (  
        <nav className="navbar navbar-expand-lg ">
        <a className="navbar-brand" href=" ">Amazon</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item active">
              <a className="nav-link" href=" ">Home </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href=" ">Login </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href=" ">
              <i class="fas fa-shopping-cart"></i>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    );
}
 
export default Navbar;