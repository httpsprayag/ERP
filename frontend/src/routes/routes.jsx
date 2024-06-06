import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Layout from '../components/atoms/Layout';
import { NotFound } from '../pages/NotFound';
import { componentMap } from '../utils/componentSelector';
import { LoginPage } from '../pages';
import EditPermissions from '../pages/GeneralSettings/EditPermissions';
import { AddPartyPage } from '../pages/Party/AddPartyPage';

export const Routes = () => {
  const { accessibleMenus, isLoggedIn } = useSelector((state) => state.auth);
  const getAllPaths = (menus, parentPath = '') =>
    menus?.flatMap((menu) => {
      const fullPath = parentPath + menu.link;
      return [fullPath, ...getAllPaths(menu.children, fullPath)];
    }) ?? [];
  const accessiblePaths = getAllPaths(accessibleMenus);
  const dynamicRoutes = accessiblePaths.map((menu) => ({
    path: menu,
    element: <Layout />,
    children: [{ path: '', element: componentMap[menu] }], // Specify the child route directly
  }));

  return [
    {
      path: '/',
      element: isLoggedIn ? <Navigate to='/home' /> : <LoginPage />,
      index: true,
    },
    {
      path: '/',
      element: <Layout></Layout>,
      children: [{ path: 'general-settings/set-permissions/:id', element: <EditPermissions /> }],
    },
    {
      path: '/',
      element: <Layout></Layout>,
      children: [{ path: 'parties/add-party', element: <AddPartyPage /> }],
    },
    ...dynamicRoutes,
    { path: '*', element: <NotFound /> },
  ];
};
