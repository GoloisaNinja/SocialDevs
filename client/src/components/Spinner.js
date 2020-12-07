import React, { Fragment } from 'react';
import spinner from '../layout/loading.gif';

export default () => (
  <Fragment>
    <section className='container'>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '70vh',
        }}>
        <img
          src={spinner}
          style={{ width: '200px', margin: '0 auto', display: 'block' }}
          alt='Loading...'
        />
      </div>
    </section>
  </Fragment>
);
