import WebClient from 'web-client-starter'
import {apiConfig} from '../config/apiConfig'
import type {FooterInfo, SiteInfo, SiteStateType} from '../store/reducers'
import type {
  FooterResponse,
  MainMenuResponse,
  OfficeLocationResponse,
  ProductResponse,
  SiteInfoResponse
} from './typing/CMSService'
import type {CategoryResponse, LocationPropsType} from '../components/molecules'
import type {TRootState} from '../typing/store'
import {rootState} from '../store'
import type {ProductDetails} from '../components/templates/products/Product'
import {ComponentNameMap} from '../components/widgets/widgets'
import '../utils/extenstions'
import type {PageDetails, PageDetailsResponse, WidgetDataType, WidgetType} from './typing/pageDetails'

class CMSService_ {
  private readonly config = apiConfig.cms
  private readonly baseUrl = apiConfig.baseUrl

  async getSiteInfoWithHeaderAndFooter(): Promise<SiteStateType> {
    const siteInfo = await this.getSiteInfo()
    const mainMenu = await this.getMainMenu()
    const footer = await this.getFooter()
    return {siteInfo, header: {menus: mainMenu}, footer}
  }

  async getSiteInfo(): Promise<SiteInfo> {
    const response = await WebClient.get<SiteInfoResponse>({
      baseUrl: this.baseUrl,
      path: this.config.siteInfo
    })
    return response.data.attributes
  }

  async getMainMenu(): Promise<MainMenuResponse[]> {
    return WebClient.get<MainMenuResponse[]>({
      baseUrl: this.baseUrl,
      path: this.config.mainMenu
    })
  }

  async getFooter(): Promise<FooterInfo> {
    const response = await WebClient.get<FooterResponse>({
      baseUrl: this.baseUrl,
      path: this.config.footer
    })
    return response.data.attributes
  }

  // async getPageList(): Promise<PageSummaryResponse[]> {
  //   const response = await WebClient.get<PageListResponse>({
  //     baseUrl: this.baseUrl,
  //     path: this.config.pageList
  //   })
  //   return response.data.map(data => data.attributes)
  // }

  async getOfficeLocation(): Promise<LocationPropsType> {
    const response = await WebClient.get<OfficeLocationResponse>({
      baseUrl: this.baseUrl,
      path: this.config.officeLocation
    })
    return response.data.attributes
  }

  async getPageContent(slug: string): Promise<PageDetails> {
    const response = await WebClient.get<PageDetailsResponse>({
      baseUrl: this.baseUrl,
      path: this.config.pageDetails,
      uriVariables: {slug}
    })
    if (response.data.isEmpty()) {
      throw new Error('Data not found')
    }
    const header = response.data[0].attributes.header.map(({__component, ...content}) => {
      return {widget: ComponentNameMap[__component], data: {...content}} as WidgetDataType<'HeroBanner'>
    })
    const carousel = response.data[0].attributes.carousel.map(({__component, ...content}) => {
      return {data: {...content}, widget: ComponentNameMap[__component]} as WidgetDataType<'HeroBanner'>
    })
    const content = response.data[0].attributes.content.map(({__component, ...content}) => {
      return {widget: ComponentNameMap[__component], data: {...content}} as WidgetDataType<WidgetType>
    })
    const ctaBanner = response.data[0].attributes.ctaBanner.map(({__component, ...content}) => {
      return {data: {...content}, widget: ComponentNameMap[__component]} as WidgetDataType<'TextWithCTA'>
    })
    return {carousel, content, header, ctaBanner}
  }

  async getInitialValue(): Promise<TRootState> {
    return {...rootState, site: await this.getSiteInfoWithHeaderAndFooter()}
  }

  async getProductDetails(productSlug: string): Promise<ProductDetails> {
    const response = await WebClient.get<ProductResponse>({
      baseUrl: this.baseUrl,
      path: this.config.productDetails,
      uriVariables: {productSlug}
    })
    return response.data[0].attributes
  }

  async getProductsByCategory(category: string, page: number): Promise<ProductResponse> {
    return WebClient.get<ProductResponse>({
      baseUrl: this.baseUrl,
      path: this.config.productsSummary,
      uriVariables: {category, page, pageSize: 36}
    })
  }

  async getCategory(category: string): Promise<CategoryResponse> {
    return WebClient.get<CategoryResponse>({
      baseUrl: this.baseUrl,
      path: this.config.category,
      uriVariables: {category}
    })
  }

  async getCartProducts(productIds: string[]): Promise<ProductDetails[]> {
    if (productIds.isEmpty()) {
      return new Promise(resolve => {
        resolve([])
      })
    }

    const query = productIds.map((productId, index) => `&filters[productId][$eq][${index}]=${productId}`).join('')
    const response = await WebClient.get<ProductResponse>({
      baseUrl: this.baseUrl,
      path: this.config.productsByIds + query
    })
    return response.data.map(({attributes}) => attributes)
  }

  contact(data: Record<string, unknown>) {
    return WebClient.post<ProductResponse>({
      baseUrl: this.baseUrl,
      path: this.config.contact,
      body: {data}
    })
  }
}

export const CMSService = new CMSService_()
