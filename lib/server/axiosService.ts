import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { PromiseCache, generateKey } from '@/lib/utils';

interface RequestConfig extends AxiosRequestConfig {
  retryCounts?: number;
}

interface ResponseData {
  data: object | Array<any> | null;
  isSuccess: boolean;
  message: string;
  status: number;
}

const cache = new PromiseCache();

class MyAxios {
  private instance: AxiosInstance;

  private getBaseUrl = () => {
    const isProd = process.env.NODE_ENV === 'production';
    return isProd ? 'https://localhost:3001' : 'https://localhost:3001';
  }

  constructor() {
    this.instance = axios.create({
      // 在这里设置默认配置，例如baseURL、headers等
      headers: {
        'Content-Type': 'application/json',
      },
      baseURL: this.getBaseUrl(),
    });

    // 在这里添加拦截器，例如请求拦截器、响应拦截器等
    this.instance.interceptors.request.use(
      (config) => {
        // 在发送请求之前做一些处理
        // return Promise.reject(new Error('Request interrupted'));
        // 
        return config;
      },
      (error: any) => {
        // 处理请求错误
        return Promise.reject(error);
      }
    );

    this.instance.interceptors.response.use(
      (response: AxiosResponse): any => {
        // 对响应数据做一些处理
        return {
          data: response.data.data || {},
          isSuccess: response.data.status === 0,
          message: response.data.message,
          status: response.data.status,
        };
      },
      (error: any) => {
        const retryCounts = error.config?.retryCounts || 0;
        if (retryCounts > 0) {
          error.config.retryCounts = retryCounts - 1;
          return this.instance.request(error.config);
        }
        // 处理响应错误
        return {
          data: null,
          isSuccess: false,
          message: error.message || error,
          status: -1,
        };
        // return Promise.reject(error);
      }
    );
  }

  public get<T = any>(url: string, config?: RequestConfig): Promise<AxiosResponse<T>> {
    const key = generateKey({ url, config });
    return cache.get(key, () => this.instance.get<T>(url, config));
  }

  public post<T = any>(url: string, data?: any, config?: RequestConfig): Promise<AxiosResponse<T>> {
    const key = generateKey({ url, data, config });
    return cache.get(key, () => this.instance.post<T>(url, data, config));
  }
}

const myAxios = new MyAxios();
export default myAxios;
