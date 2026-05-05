import { Link } from 'react-router-dom';
import { Layout } from '../components/ui/Layout';
import { Button } from '../components/ui/Button';

export default function NotFound() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-8">Página no encontrada. Parece que te has perdido en el mapa.</p>
        <Link to="/">
          <Button variant="primary">Volver al Inicio</Button>
        </Link>
      </div>
    </Layout>
  );
}
