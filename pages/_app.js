'use client'
import React, { useEffect, useState } from 'react'
import { appWithTranslation } from 'next-i18next';
import '../styles/globals.css'
import { Roboto } from 'next/font/google'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import axios from 'axios';
import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation';
import { BounceLoader } from 'react-spinners';


// axios.interceptors.response.use(
//   function (response) {
//     return response;
//   },
//   async function (error) {
//     if (error.response && error.response.status === 401) {
//       const refreshToken = localStorage.getItem('refresh_token');

//       if (refreshToken) {
//         try {
//           const refreshResponse = await axios.post('/api/auth/refresh', { "refresh_token": refreshToken });
//           localStorage.setItem('access_token', refreshResponse.data.access_token);
//           localStorage.setItem('refresh_token', refreshResponse.data.refresh_token); // Anahtar belirtildi

//           // Güncellenmiş token ile yeni isteği yapma
//           const config = error.config;
//           config.headers['Authorization'] = 'Bearer ' + refreshResponse.data.access_token;
//           return axios.request(config);
//         } catch (err) {
//           console.log(err);
//           window.location.href = "/login";
//           localStorage.removeItem("access_token");
//           localStorage.removeItem("refresh_token");
//           return Promise.reject(err);
//         }
//       } else {
//         window.location.href = "/login";
//         localStorage.removeItem("access_token");
//         localStorage.removeItem("refresh_token");
//         return Promise.reject(error);
//       }
//     }
//     return Promise.reject(error);
//   }
// );


axios.interceptors.request.use(
  function (config) {
    config.headers.Authorization = `Bearer ${localStorage.getItem(
      "access_token"
    )}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  // async function handle401Error(error) {
  //   console.log(error);
  //   if (error.response && error.response.status === 401) {
  //     const refreshToken = localStorage.getItem('refresh_token');
  
  //     if (refreshToken) {
  //       try {
  //         const refreshResponse = await axios.post('/api/auth/refresh', { "refresh_token": refreshToken });
  //         console.log('ekolx', refreshResponse);
  
  //         // Yeni erişim token'ı alındıysa isteği tekrarla ve işlemi tamamla
  //         localStorage.setItem('accessToken', refreshResponse.data.access_token);
  //         // Yeni erişim token'ını başlıkta ayarla
  //         error.config.headers['Authorization'] = 'Bearer ' + refreshResponse.data.access_token;
          
  //         // Yeniden denemek için orijinal isteği kullan
  //         return axios.request(error.config);
  //       } catch (err) {
  //         console.log(err);
  //         // Yenileme başarısız olursa giriş sayfasına yönlendir ve token'ları kaldır
  //         window.location.href = "/login";
  //         localStorage.removeItem("accessToken");
  //         localStorage.removeItem("refresh_token");
  //         return Promise.reject(err);
  //       }
  //     } else {
  //       // Refresh token bulunmuyorsa işle
  //       window.location.href = "/login";
  //       localStorage.removeItem("accessToken");
  //       localStorage.removeItem("refresh_token");
  //       return Promise.reject(error);
  //     }
  //   } else {
  //     // 401 dışındaki hatalar için promise reddedilir
  //     return Promise.reject(error);
  //   }
  // }
  
  async function (error) {
    console.log(error);
    if (error.response && error.response.status === 401) {
      const refreshToken = localStorage.getItem('refresh_token')

      if (refreshToken) {
        return axios.post('/api/auth/refresh', { "refresh_token": refreshToken })
          .then(response => {
            console.log('ekolx',response);
            // Yeni access token alındıysa isteği tekrarla ve işlemi tamamla
            localStorage.setItem('accessToken', refreshResponse.data.access_token)
            localStorage.setItem(refreshResponse.data.access_token)
            error.config.headers['Authorization'] = 'Bearer ' + response?.data.access_token;
            return axios.request(error.config);
          })
          .catch(err => {
            console.log(err);
            window.location.href = "/login";
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            return Promise.reject('Unauthorized');
          })
      }
    }
  }
);

const roboto = Roboto({
  weight: ['400', '700', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

function MyApp({ Component, pageProps }) {
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(true);

  console.log(pathname.startsWith('/admin'));
  useEffect(() => {
    if (pathname.startsWith('/admin')) {
      document.body.classList.remove('my-custom-body');
      document.body.classList.add("my-custom-admin-body")
      setIsLoading(false)
    } else {
      document.body.classList.add('my-custom-body');
      document.body.classList.remove("my-custom-admin-body")
      setIsLoading(false)
    }
  }, [pathname])

  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      }),
  )

  if (isLoading) {
    return <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
        <BounceLoader
            color="#D63626"
            loading={true}
            size={70}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    </div>
}
  
  return (
    <QueryClientProvider client={queryClient}>
      <main className={roboto.className}>
        <Component {...pageProps} />
      </main>
    </QueryClientProvider>
  )
}

export default appWithTranslation(MyApp);
