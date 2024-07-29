import Head from 'next/head';

import Header from './Header'
import Nav from './Nav'
import Footer from './Footer'

import { metaData } from "@/config";


const Layout = ({
  pageTitle,
  pageDescription,
  siteSeoTitle,
  socialTitle,
  socialDescription,
  relativePath,
  children,
}) => {
  const { baseUrl } = metaData

  const pageUrl = relativePath === '/' ? `${baseUrl}/` : `${baseUrl}/${relativePath}/`
  const featureImage = `${baseUrl}/banner.png`
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>{siteSeoTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="image" content={featureImage} />
        <link rel="canonical" href={pageUrl} />
        {/* OpenGraph / FB */}
        <meta property="og:url" content={pageUrl} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="WyoFile" />
        <meta property="og:title" content={socialTitle} />
        <meta property="og:image" content={featureImage} />
        <meta property="og:image:width" content="100" />
        <meta property="og:image:height" content="4000" />
        <meta property="og:type" content="website" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@wyofile" />
        <meta name="twitter:title" content={socialTitle} />
        <meta name="twitter:image" content={featureImage} />
        <meta name="twitter:description" content={socialDescription} />
        <meta content="width=device-width, initial-scale=1" name="viewport" />

        {/* <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"/> */}

      </Head>
      <Header />
      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default Layout