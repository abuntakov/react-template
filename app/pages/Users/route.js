import Loadable from 'react-loadable'

import l10n from '@locale/strings_ru'
import Loading from '@app/components/Loading/LoadingPage'

const LoadableUsers = Loadable({
  loader: () => import('./Users'),
  loading: Loading,
})

export default {
  path: '/users',
  name: l10n.users_page__header,
  component: LoadableUsers,
}
