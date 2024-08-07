import { fetchWebsitesById } from '@/lib/api';

interface GameWebsitesProps {
  websites: number[];
}

export default async function GameWebsites({ websites }: GameWebsitesProps) {
  try {
    const websitesData = await fetchWebsitesById(websites);
    
    if (!websitesData || websitesData.length === 0) {
      return <p>No Websites available</p>;
    }

    return (
      <div>
        <h2 className="font-bold text-xl">Websites</h2>
        <div className="flex flex-wrap gap-2"> {/* Flex container for inline display */}
          {websitesData.map((website: { url: string, id: number }) => (
            <a key={website.id} href={website.url} target='_blank' className="bg-darkGrey text-white px-2 py-1 rounded hover:text-secondary">
              {website.url}
            </a>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching Websites:', error);
    return <p>Error loading Websites</p>;
  }
}