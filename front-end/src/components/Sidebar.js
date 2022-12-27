import React from 'react';
import { FiChevronsRight } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../features/offcanvas/offcanvasSlice';

const Sidebar = ({ children }) => {
  const { isSidebarOpen } = useSelector((store) => store.offcanvas);
  const dispatch = useDispatch();

  return (
    <div className='col-lg-3'>
      <div className={`offcanvas-sidebar ${isSidebarOpen ? 'show' : ''}`}>
        <div className='offcanvas-sidebar-toggle'>
          <span
            className='toggle-knob'
            onClick={() => dispatch(toggleSidebar())}
          >
            <FiChevronsRight className='feather icon' />
            Sidebar
          </span>
        </div>
        <div className='offcanvas-sidebar-body'>
          <div className='offcanvas-sidebar-body-inner'>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
