import useBreadcrumbs from 'use-react-router-breadcrumbs';
import { NavLink } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';
import { useSelector } from 'react-redux';

const Breadcrumbs = () => {
  const { product } = useSelector((store) => store.product);
  const getSingleProductName = (id) => {
    if (product) {
      return product.title;
    }
  };
  // breadcrumbs can be components or strings.
  const routes = [
    { path: '/', breadcrumb: 'Home' },
    { path: '/about', breadcrumb: 'About' },
    { path: '/contact', breadcrumb: 'Contact' },
    { path: '/blog', breadcrumb: 'Blog' },
    { path: '/products', breadcrumb: 'Products' },
    {
      path: '/products/:productId',
      breadcrumb: () => getSingleProductName(),
    },
  ];

  const breadcrumbs = useBreadcrumbs(routes);
  return (
    <nav aria-label='breadcrumb'>
      <ol className='breadcrumb'>
        <li className='mt-n1 mr-1'>
          <FiHome className='icon' />
        </li>
        {breadcrumbs.map(({ match, breadcrumb }, index) => (
          <li className='breadcrumb-item' key={index}>
            <NavLink key={match.pathname} to={match.pathname}>
              {breadcrumb}
            </NavLink>
          </li>
        ))}
      </ol>
    </nav>
  );
};
export default Breadcrumbs;
