import { NavLink } from 'react-router-dom'
import logo from '../assets/img/loder.gif'
export function Home() {

  return (
    <>
      <div className="homepage">
     
        <div className="home-nav"></div>
        <p className="home-subtitle">Secure Task Management for Teams</p>
        <div className="home-title">Your Team. <span>Aligned.</span></div>
        <NavLink to="/boards"> <button className="home-btn">Start your first project </button> </NavLink>
        <div className="main-img-home"></div>
      </div>
      <div className="call-to-action">
        <div className="home-subtitle">
          <p className="home-subtitle-a">The Need for Task Management</p>
          <div className="home-title-a">It’s Time to Get Organized.</div>
        </div>
        <div className="content">
        <h2 class="subheading">Task Management with MeisterTask</h2>
        <div class="sub">Projects That Work.</div>
        <p class="intro">
      Whether you're managing your next big project or digitalizing task management for your team's daily business, you need to know who’s doing what, when. MeisterTask helps you manage tasks in a beautiful, customizable environment that perfectly adapts to your needs.
    </p>

        </div>
   
        {/* <p className="home-pargrafe-a">Task management is the link between planning to do something and getting it done. Your task management software should provide an overview of work in progress that enables tracking from conception to completion. Enter MeisterTask: join teams everywhere who use our Kanban-style project boards to digitalize workflows and gain a clear overview of task progress. Let's get organized together!</p> */}
      </div>

      {/* <Footer /> */}














    </>
  )
}





