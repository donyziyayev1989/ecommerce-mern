import { Link } from 'react-router-dom';
const Iconbox = ({ icon, title, children, link, linkText }) => {
  return (
    <div className='card h-100'>
      <div className='card-body'>
        <div className='icon-box text-center'>
          {icon && (
            <div className='icon-box-icon' style={{ fontSize: '24px' }}>
              {icon}
            </div>
          )}
          {title && <h3 className='icon-box-title'>{title}</h3>}
          {children && <p className='icon-box-text'>{children}</p>}
          {link && (
            <Link to={link} className='btn btn-pill btn-outline-primary btn-sm'>
              {linkText}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Iconbox;
