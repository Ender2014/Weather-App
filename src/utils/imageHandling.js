function loadImages() {
  const path = require.context(
    "../assets/images",
    false,
    /\.(png|jpe?g|gif|svg)$/i,
  );

  // Create an object to store the imported images
  const images = {};

  // Iterate over the context and import each image
  path.keys().forEach((key) => {
    const imageName = key.replace("./", ""); // Remove './' from the key
    images[imageName] = path(key);
  });

  // Log the imported images to verify
  return images;
}

export default function fetchImages(filename, ext) {
  const images = loadImages();
  const src = images[`${filename}.${ext}`];
  return src;
}
