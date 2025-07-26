import React from 'react';
import EmbedPlayer from '@/components/watch/embed-player';

export const revalidate = 3600;
//https://vidsrc.su/embed/tv/76331/1/9
export default function Page({ params }: { params: { slug: string } }) {
  const id = params.slug.split('-').pop();
  return <EmbedPlayer url={`https://vidsrc.cc/v2/embed/tv/${id}`} />;
}
