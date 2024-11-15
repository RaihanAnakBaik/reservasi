import { useRouter } from 'next/router';
import { useEffect } from 'react';

export function withAuth(WrappedComponent: React.ComponentType) {
  return function WithAuth(props: any) {
    const router = useRouter();
    
    useEffect(() => {
      // Cek token atau status auth
      const token = localStorage.getItem('token');
      
      if (!token) {
        router.push('/');
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
} 