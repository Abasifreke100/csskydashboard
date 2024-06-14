import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface MetaTag {
  name: string;
  content: string;
}

const useMetaTagUpdater = (pathMetaTagsMap: { [key: string]: MetaTag[] }) => {
  const location = useLocation();

  useEffect(() => {
    const metaTags = pathMetaTagsMap[location.pathname];
    if (metaTags) {
      metaTags.forEach((tag) => {
        const existingTag = document.querySelector(`meta[name="${tag.name}"]`);
        if (existingTag) {
          existingTag.setAttribute("content", tag.content);
        } else {
          const newTag = document.createElement("meta");
          newTag.setAttribute("name", tag.name);
          newTag.setAttribute("content", tag.content);
          document.head.appendChild(newTag);
        }
      });
    }
  }, [location.pathname, pathMetaTagsMap]);
};

export default useMetaTagUpdater;
