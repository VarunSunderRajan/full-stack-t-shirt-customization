import express from 'express';
import dotenv from 'dotenv';
import OpenAI from 'openai'; // Ensure this matches the way the OpenAI package should be imported

dotenv.config(); // Load environment variables

const app = express();
const router = express.Router();

// Ensure express can handle JSON request bodies
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // Ensure the API key is correctly set in your .env file
});

// Basic GET route
router.get('/', (req, res) => {
    res.status(200).json({message: "Hello from DALL.E ROUTES"})
});

// POST route to generate images
router.post('/', async (req, res) => {
    try {
        const prompt = req.body.prompt;
        if (typeof prompt !== 'string' || prompt.trim() === '') {
            return res.status(400).json({ message: 'Invalid prompt' });
        }

        // Call OpenAI API for image generation
        const imageResponse = await openai.images.generate({
            model: 'dall-e-3', // or 'dall-e-2' depending on your preference
            prompt: prompt,
            n: 1, // Number of images to generate
            size: '1024x1024' // Image size
            // Add other optional parameters as needed
        });

        // Handle non-200 responses
        if (imageResponse.status !== 200) {
            return res.status(imageResponse.status).json({ message: 'Error from OpenAI API', details: imageResponse.data });
        }

        // Send the response back
        res.status(200).json({ images: imageResponse.data });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong with the OpenAI API request" });
    }
});

app.use('/api/dalle', router); // Mount the router on a path

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
export default router;