import { css } from "@emotion/react";

import Head from 'next/head';

import Header from './Header'
import Nav from './Nav'
import Footer from './Footer'
import Script from 'next/script'

import { metaData } from "@/config";

const bodyStyle = css`
    position: relative;
`

const contentStyle = css`
    padding: 10px;
    padding-top: 0;
    max-width: 800px;
    margin: auto;
`

export default function Layout({
  pageTitle,
  pageDescription,
  pageFeatureImage,
  siteSeoTitle,
  // seoDescription,
  socialTitle, // TODO
  socialDescription, // TODO
  relativePath,
  pageCss,
  children,
}) {
  const {
    baseUrl,
  } = metaData

  const pageUrl = relativePath === '/' ? `${baseUrl}/` : `${baseUrl}/${relativePath}/`
  // const featureImage = pageFeatureImage || `${baseUrl}/election-guide-2024-feature-art.jpg`
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <title>{siteSeoTitle}</title>
        <meta name="description" content={pageDescription} />
        {/* <meta name="image" content={featureImage} /> */}
        <link rel="canonical" href={pageUrl} />
        {/* OpenGraph / FB */}
        <meta property="og:url" content={pageUrl} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Montana Free Press" />
        <meta property="og:title" content={socialTitle} />
        {/* <meta property="og:image" content={featureImage} /> */}
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@mtfreepress" />
        <meta name="twitter:title" content={socialTitle} />
        {/* <meta name="twitter:image" content={featureImage} /> */}
        <meta name="twitter:description" content={socialDescription} />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100..900&display=swap" rel="stylesheet"></link>

      </Head>

      <div css={[bodyStyle]}>
        <Header />
        <Nav />
        <main css={[contentStyle, pageCss]}>{children}</main>
        <Footer />
      </div>


    </div>
  );
}