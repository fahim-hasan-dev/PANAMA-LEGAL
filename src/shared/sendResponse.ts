import { Response } from 'express'
import { getTranslation, LanguageCode } from './translations'

type IApiResponse<T> = {
  statusCode: number
  success: boolean
  message?: string | null
  meta?: {
    page: number
    limit: number
    total: number
  }
  data?: T | null
}
const sendResponse = <T>(res: Response, data: IApiResponse<T>): void => {
  // Extract language from headers
  const langHeader = res.req?.headers['accept-language'];
  const lang = langHeader?.startsWith('en') ? 'en' : 'es';
  const t = getTranslation(lang);

  // Translate if it exists in the dictionary, otherwise use original
  let finalMessage = data.message;
  if (data.message) {
    const key = data.message as keyof typeof t;
    if (t[key] && typeof t[key] === 'string') {
      finalMessage = t[key] as string;
    }
  }

  const responseData: IApiResponse<T> = {
    statusCode: data.statusCode,
    success: data.success,
    message: finalMessage || null,
    meta: data.meta || null || undefined,
    data: data.data || null || undefined,
  }
  res.status(data.statusCode).json(responseData)
}
export default sendResponse
