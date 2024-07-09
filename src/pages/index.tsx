import type {GetServerSideProps, InferGetServerSidePropsType, NextPage} from 'next'
import {CMSService} from '../services'
import type {PagePropsType} from './[page]'
import Page from './[page]'
import type {PageDetails} from '../services/typing/CMSService'

const HomePage: NextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({pageDetails}) => {
  return <Page pageDetails={pageDetails}/>
}

export const getServerSideProps: GetServerSideProps<PagePropsType> = async () => {
  try {
    const pageDetails = await CMSService.getPageContent('index')
    const initialValue = await CMSService.getInitialValue()
    return {props: {pageDetails, initialValue}}
  } catch (error) {
    const pageDetails: PageDetails = {ctaBanner: [], header: [], mainContent: [], seo: null, slug: ''}
    return {props: {pageDetails}}
  }
}

export default HomePage
