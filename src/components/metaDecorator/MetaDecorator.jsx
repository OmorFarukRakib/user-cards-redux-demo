import React from "react";
import { Helmet } from "react-helmet";

export const MetaDecorator = ({ title, description, url, imageUrl }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta name="description" content={description} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="article" />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:alt" content="image" />
    </Helmet>
  );
};

MetaDecorator.defaultProps = {
  title: "User Information",
  description: "User Information shown here",
  url: "",
  // imageUrl: {userImg},
  imageUrl:
    "https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg",
};
