// Validate required environment variables
const requiredEnvVars = ['VITE_TMDB_API_KEY'];

const missingVars = requiredEnvVars.filter(
  envVar => !import.meta.env[envVar]
);

if (missingVars.length > 0) {
  throw new Error(
    `Required environment variables are missing: ${missingVars.join(', ')}. 
    Please check your .env file and make sure all required variables are set.`
  );
}

export default { isValid: true };
