import Loadable from 'react-loadable'

import l10n from '@locale/strings_ru'
import Loading from '@app/components/Loading/LoadingPage'

const LoadableUsers = Loadable({
  loader: () => import('./Map'),
  loading: Loading,
})

export default {
  path: '/map',
  name: l10n.map_page__header,
  component: LoadableUsers,
}
