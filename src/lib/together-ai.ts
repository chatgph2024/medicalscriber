const TOGETHER_API_KEY = '02ca6696345d914c6941d7007b762c2b3ef0e07a4a58188e6ecb09d854c44f5c';

export async function generateMedicalNote(transcript: string, template: string): Promise<string> {
  const response = await fetch('https://api.together.xyz/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${TOGETHER_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'meta-llama/Llama-Vision-Free',
      messages: [
        {
          role: 'system',
          content: 'You are Daisy, an intelligent and empathetic medical documentation assistant...'
        },
        {
          role: 'user',
          content: [{ type: 'text', text: transcript }]
        }
      ],
      max_tokens: 512,
      temperature: 0.7,
      top_p: 0.7,
      top_k: 50,
      repetition_penalty: 1
    })
  });

  const data = await response.json();
  return data.choices[0]?.message?.content || '';
}