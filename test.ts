const handler = function handler(req: Request) {
  return new Response('Hello World');
};

export default {
  async fetch(request: Request): Promise<Response> {
    return new Response('ah');
  },
};
