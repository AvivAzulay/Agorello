import { NavLink } from 'react-router-dom'
export function Home() {

  return (
    <div className="home-page">
      <div className="home-page-hero">
        <div className="hero">
          <div className="hero-titel"><h1>Taskit</h1></div>
          <p className="hero-text">Collaborate, manage projects, and reach new productivity peaks. From high rises to the home office, the way your team works is unique accomplish it all with Taskit.</p>
          <NavLink to="/boards">  <button className="hero-btn" > <p className="arrow-btn"></p>Start now</button>   </NavLink>
        </div>

        <div className="hero-image"></div>

      </div >
    </div >
  )
}
