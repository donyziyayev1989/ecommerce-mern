import React from 'react';
import { FiClock, FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import Iconbox from '../components/Iconbox';
import PageTitle from '../components/PageTitle';

const Contact = () => {
  return (
    <>
      <PageTitle pageTitle='Contacts' />
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-xl-3 col-sm-6 mb-grid-gutter'>
            <Iconbox icon={<FiMapPin />} title='Main store address'>
              396 Lillian Blvd, Holbrook, NY 11741, USA
            </Iconbox>
          </div>
          <div className='col-xl-3 col-sm-6 mb-grid-gutter'>
            <Iconbox icon={<FiClock />} title='Working hours'>
              Mon - Fri: 10AM - 19PM <br /> Sat: 11AM - 17PM
            </Iconbox>
          </div>
          <div className='col-xl-3 col-sm-6 mb-grid-gutter'>
            <Iconbox icon={<FiPhone />} title='Phone numbers'>
              Customer service: +1 (080) 44 357 260 <br /> Tech support: +1 00
              33 169 7720
            </Iconbox>
          </div>
          <div className='col-xl-3 col-sm-6 mb-grid-gutter'>
            <Iconbox icon={<FiMail />} title='Email addresses'>
              Customer <br /> service: customer@example.com <br />
              Tech support: support@example.com
            </Iconbox>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
