import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';

//GET (read)
export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate('creator');
    if (!prompt) return new Response('Prompt not found', { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response('Failed to fetch a new prompt', { status: 500 });
  }
};

//PATCH

export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();
  try {
    await connectToDB();
    const exitingPrompt = await Prompt.findById(params.id);
    if (!exitingPrompt)
      return new Response('Prompt not found', { status: 404 });
    exitingPrompt.prompt = prompt;
    exitingPrompt.tag = tag;
    await exitingPrompt.save();
    return new Response(JSON.stringify(exitingPrompt), { status: 200 });
  } catch (err) {
    return new Response('Failed to update a prompt', { status: 500 });
  }
};

//DELETE (delete)

export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();
    await Prompt.findByIdAndRemove(params.id);
    return new Response('Prompt deleted successfully', { status: 200 });
  } catch (error) {
    return new Response('Failed to delete a prompt', { status: 500 });
  }
};
