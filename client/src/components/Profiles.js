import React from 'react';

const Profiles = () => {
  return (
    <section className='container'>
      <h1 className='large text-primary'>Developers</h1>
      <p className='lead'>
        <i className='fab fa-connectdevelop'></i> Browse and Connect with
        Developers
      </p>
      <div className='profiles'>
        <div className='profile bg-light'>
          <img
            className='round-img'
            src='https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200'
            alt=''
          />
          <div>
            <h2>John Doe</h2>
            <p>Developer at Microsoft</p>
            <p>Seattle, WA</p>
            <a href='/profile' className='btn btn-primary'>
              View Profile
            </a>
          </div>
          <ul>
            <li className='text-primary'>
              <i className='fas fa-check'>HTML</i>
            </li>
            <li className='text-primary'>
              <i className='fas fa-check'>CSS</i>
            </li>
            <li className='text-primary'>
              <i className='fas fa-check'>JavaScript</i>
            </li>
            <li className='text-primary'>
              <i className='fas fa-check'>Python</i>
            </li>
          </ul>
        </div>
      </div>

      <div className='profiles'>
        <div className='profile bg-light'>
          <img
            className='round-img'
            src='https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200'
            alt=''
          />
          <div>
            <h2>John Doe</h2>
            <p>Developer at Microsoft</p>
            <p>Seattle, WA</p>
            <a href='/profile' className='btn btn-primary'>
              View Profile
            </a>
          </div>
          <ul>
            <li className='text-primary'>
              <i className='fas fa-check'>HTML</i>
            </li>
            <li className='text-primary'>
              <i className='fas fa-check'>CSS</i>
            </li>
            <li className='text-primary'>
              <i className='fas fa-check'>JavaScript</i>
            </li>
            <li className='text-primary'>
              <i className='fas fa-check'>Python</i>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Profiles;
