import { useParams, Navigate } from 'react-router-dom';
import { getServiceBySlug } from '../data/services';
import { ServiceDetail } from '../components/services/ServiceDetail';
import { useEffect } from 'react';

export function ServicePage() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getServiceBySlug(slug) : undefined;
  
  useEffect(() => { window.scrollTo(0, 0); }, [slug]);
  
  if (!service) return <Navigate to="/" replace />;
  return <ServiceDetail service={service} />;
}
