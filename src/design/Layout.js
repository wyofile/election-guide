import { css } from "@emotion/react";

import Head from 'next/head';

import Header from './Header'
import Nav from './Nav'
import Footer from './Footer'
import Script from 'next/script'

import { metaData } from "@/config";

import '../styles/base.css'

export default function Layout({
  pageTitle,
  pageDescription,
  pageFeatureImage,
  siteSeoTitle,
  // seoDescription,
  socialTitle, // TODO
  socialDescription, // TODO
  relativePath,
  children,
}) {
  const {
    baseUrl,
  } = metaData

  const pageUrl = relativePath === '/' ? `${baseUrl}/` : `${baseUrl}/${relativePath}/`
  // const featureImage = pageFeatureImage || `${baseUrl}/election-guide-2024-feature-art.jpg`
  return (
    <>
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
        <meta content="width=device-width, initial-scale=1" name="viewport" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@100..900&display=swap" rel="stylesheet" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet" />
      </Head>
      <Header />
      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  );
}