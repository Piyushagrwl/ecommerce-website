const getImageUrl = (image) => {
    if (!image) return "";
  
    if (image.startsWith("http")) {
      return image;
    }
  
    if (image.startsWith("/")) {
      return `https://shopease-backend-53gd.onrender.com${image}`;
    }
  
    return `https://shopease-backend-53gd.onrender.com/uploads/${image}`;
  };
  
  export default getImageUrl;