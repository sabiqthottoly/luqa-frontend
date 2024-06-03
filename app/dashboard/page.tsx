"use client"
import { useEffect } from "react";
import { lusitana } from "../ui/fonts";
import axios from "axios";
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  const fetchSomeData = async () => {
    try {
      let useraccesstoken = localStorage.getItem('accessToken');
      console.log(useraccesstoken);
      

      const response = await axios.get('http://localhost:4000/api/tenant/roles', {
        headers: {
          Authorization: `Bearer ${useraccesstoken}`
        }
      });

      console.log(response.data);
    } catch (error:any) {
      if (error.response && error.response.status === 401) {
        // Access token has expired, attempt to refresh it
        const refreshToken = localStorage.getItem('refreshToken');
        try {
          const response = await axios.post('http://localhost:4000/api/auth/refresh-token', {}, {
            headers: {
              Authorization: `Bearer ${refreshToken}`
            }
          });

          const { accessToken: newAccessToken, refreshToken: newRefreshToken } = response.data.tokens;

          // Store new tokens in localStorage
          localStorage.setItem('accessToken', newAccessToken);
          localStorage.setItem('refreshToken', newRefreshToken);

          // Retry the original request with the new access token
          const retryResponse = await axios.get('http://localhost:4000/api/tenant/roles', {
            headers: {
              Authorization: `Bearer ${newAccessToken}`
            }
          });

          console.log(retryResponse.data);
        } catch (refreshError) {
          console.log('Refresh token failed', refreshError);
          // Redirect to login page if refresh token fails
          router.push('/login');
        }
      } else {
        console.log('Failed to fetch data', error);
      }
    }
  }

  useEffect(() => {
    fetchSomeData();
  }, []);

  return <h1 className={`${lusitana.className}`}>Dashboard Page</h1>;
}
