import { useRouteLoaderData } from 'react-router-dom';

import OrdemForm from '../../components/Ordens/formOrdem';

function EditOrdemPage() {
  const data = useRouteLoaderData('ordem-detail');

  return <OrdemForm method="patch" ordem={data.ordem} />;
}

export default EditOrdemPage;
