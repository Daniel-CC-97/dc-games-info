import { fetchScreenshotsById } from "@/lib/api";
import { Screenshot } from "@/types";
import Image from "next/image";

interface GameScreenshotProps {
  screenshots: number[];
}

const GameScreenshots = async ({ screenshots }: GameScreenshotProps) => {
  try {
    const screenshotData = await fetchScreenshotsById(screenshots);

    if (!screenshotData || screenshotData.length === 0) {
      return <p>No screenshots available</p>;
    }

    return (
      <div className="relative">
        <h2 className="text-xl font-bold mb-2">Screenshots</h2>
        <div className="overflow-x-auto whitespace-nowrap flex gap-2 pb-2">
          {screenshotData.map((screenshot: Screenshot, index: number) => {
            
            const updatedUrl = screenshot.url.replace('t_thumb', 't_720p');

            return (
              <div
                key={screenshot.id || index}
                className="flex-shrink-0 relative w-[300px] h-[169px] lg:w-[400px] lg:h-[225px]"
              >
                <Image
                  src={`https:${updatedUrl}`}
                  alt={`Screenshot ${index + 1}`}
                  layout="fill"
                  quality={100}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error fetching screenshots:', error);
    return <p>Error loading screenshots</p>;
  }
};

export default GameScreenshots;
