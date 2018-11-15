import React from 'react';
import { NavLink } from 'react-router-dom';

const Home = props => {
  return (
    <div className="jumbotron">
      <h2>Welcome to HOMA, the Home Original Museum of Art. At the moment, the museum has taken the form of the Guggenheim, Bilbao, and has a gallery of Claude Monet's works open to the public. However, this museum is your original synesthetic creation, and you can change it to suit your tastes.</h2>
      <br />
      <h2>First, go to the <NavLink className="homeLink" exact to="/Museum">Museum</NavLink> page and select your ideal viewing space. Then, head to <NavLink className="homeLink" exact to="/Music">Music</NavLink> to find the perfect browsing soundtrack. When you're ready to browse, enter the <NavLink className="homeLink" exact to="/Gallery">Gallery</NavLink> and view exhibitions of public domain artworks from your favorite artists.</h2>
    </div>
  );
}

export default Home;
