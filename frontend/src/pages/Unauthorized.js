import { useTranslation } from 'react-i18next';
import Error from './Error';

const Unauthorized = () => {
  const { t } = useTranslation();
  return <Error message={t('unauthorized_message')} errorCode={401} goBackTitle={t('go_back')}/>;
};

export default Unauthorized;
