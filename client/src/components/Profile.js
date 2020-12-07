import React from 'react';
import { Link } from 'react-router-dom';

const Profile = () => {
  return (
    <section className='container'>
      <Link to='/profiles' className='btn'>
        Back to Profiles
      </Link>
      <div className='profile-grid my-1'>
        <div className='profile-top bg-primary p-2'>
          <img
            className='round-img my-1'
            src='https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200'
            alt=''
          />
          <h1 className='large'>John Doe</h1>
          <p className='lead'>Developer at Microsoft</p>
          <p>Seattle, WA</p>
          <div className='icons my-1'>
            <a href='#'>
              <i className='fas fa-globe fa-2x'></i>
            </a>
            <a href='#'>
              <i className='fab fa-twitter fa-2x'></i>
            </a>
            <a href='#'>
              <i className='fab fa-facebook fa-2x'></i>
            </a>
            <a href='#'>
              <i className='fab fa-linkedin fa-2x'></i>
            </a>
            <a href='#'>
              <i className='fab fa-instagram fa-2x'></i>
            </a>
          </div>
        </div>
        <div class='profile-about bg-light p-2'>
          <h2 className='text-primary'>John's Bio</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <div className='line'></div>
          <h2 className='text-primary'>Skill Set</h2>
          <div className='skills'>
            <div className='p-1'>
              <i className='fas fa-check'>HTML</i>
            </div>
            <div className='p-1'>
              <i className='fas fa-check'>CSS</i>
            </div>
            <div className='p-1'>
              <i className='fas fa-check'>Javascript</i>
            </div>
            <div className='p-1'>
              <i className='fas fa-check'>Python</i>
            </div>
          </div>
        </div>
        <div className='profile-exp bg-white p-2'>
          <h2 className='text-primary'>Experiences</h2>
          <div>
            <h3>Microsoft</h3>
            <p>Oct 2011 - Current</p>
            <p>
              <strong>Position: </strong> Senior Developer
            </p>
            <p>
              <strong>Description: </strong> Lorem ipsum dolor sit amet,
              consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua.
            </p>
          </div>
          <div>
            <h3>Oracle</h3>
            <p>Oct 2009 - Sept 2011</p>
            <p>
              <strong>Position: </strong> Developer
            </p>
            <p>
              <strong>Description: </strong> Lorem ipsum dolor sit amet,
              consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua.
            </p>
          </div>
        </div>
        <div className='profile-edu bg-white p-2'>
          <h2 className='text-primary'>Education</h2>
          <div>
            <h3>University of Washington</h3>
            <p>Oct 2000 - Jun 2004</p>
            <p>
              <strong>Degree: </strong> Masters
            </p>
            <p>
              <strong>Field of Study: </strong> Computer Science
            </p>
            <p>
              <strong>Description: </strong> Lorem ipsum dolor sit amet,
              consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
              labore et dolore magna aliqua.
            </p>
          </div>
        </div>
        <div className='profile-github'>
          <h2 className='text-primary my-1'>
            <i className='fab fa-github'></i> Github Repos
          </h2>
          <div className='repo bg-white my-1 p-1'>
            <div>
              <h4>
                <a href='#'>Repo One</a>
              </h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div>
              <ul>
                <li className='badge badge-primary'>Stars: 44</li>
                <li className='badge badge-dark'>Watchers: 20</li>
                <li className='badge badge-light'>Forks: 25</li>
              </ul>
            </div>
          </div>
          <div className='repo bg-white my-1 p-1'>
            <div>
              <h4>
                <a href='#'>Repo Two</a>
              </h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div>
              <ul>
                <li className='badge badge-primary'>Stars: 44</li>
                <li className='badge badge-dark'>Watchers: 20</li>
                <li className='badge badge-light'>Forks: 25</li>
              </ul>
            </div>
          </div>
          <div className='repo bg-white my-1 p-1'>
            <div>
              <h4>
                <a href='#'>Repo Three</a>
              </h4>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            <div>
              <ul>
                <li className='badge badge-primary'>Stars: 44</li>
                <li className='badge badge-dark'>Watchers: 20</li>
                <li className='badge badge-light'>Forks: 25</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;
