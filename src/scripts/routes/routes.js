import ListBrowse from '../views/pages/list-browse';
import Detail from '../views/pages/detail';
import Like from '../views/pages/like';

const routes = {
  '/': ListBrowse,
  '/browse': ListBrowse,
  '/detail/:id': Detail,
  '/like': Like,
};

export default routes;
