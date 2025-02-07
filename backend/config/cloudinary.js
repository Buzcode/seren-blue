import pkg from 'cloudinary';
const cloudinary = pkg.v2;

const connectCloudinary = () => { // 1. Wrap the configuration in a function
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_API_KEY,
      api_secret: process.env.CLOUD_SECRET_KEY,
    });
    console.log("Cloudinary configured"); // Optional: Add a console log for confirmation
};

export default connectCloudinary; // 2. Export the function, not just the object