import { Helmet } from 'react-helmet';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

const SEO = ({ 
  title = "James Robert Ouko | Full Stack Developer & Mobile Developer",
  description = "Professional portfolio of James Robert Ouko, a Full Stack Web Developer and Mobile Developer with expertise in Java, PHP, React, and Android development.",
  keywords = "James Robert Ouko, Full Stack Developer, Mobile Developer, Web Development, API Design, Java Developer, PHP Developer, React Developer, Android Developer",
  image = "/profile.jpg",
  url = "https://portfolio-devouko30s-projects.vercel.app/"
}: SEOProps) => {
  const fullUrl = url.startsWith('http') ? url : `https://portfolio-devouko30s-projects.vercel.app${url}`;
  const fullImage = image.startsWith('http') ? image : `https://portfolio-devouko30s-projects.vercel.app${image}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={fullUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={fullImage} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
    </Helmet>
  );
};

export default SEO;