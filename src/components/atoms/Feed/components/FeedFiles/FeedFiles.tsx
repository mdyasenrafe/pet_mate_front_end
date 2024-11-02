import { TPost } from "@/redux/features/post/post.type";
import ImageGallery from "./components/ImageGallery/ImageGallery";

type FeedFilesProps = {
  files: TPost["files"];
};

export const FeedFiles: React.FC<FeedFilesProps> = ({ files }) => {
  const imageFiles = files?.filter((file) => file.type === "image");

  return (
    <>
      {imageFiles && imageFiles.length > 0 && (
        <>
          <ImageGallery images={imageFiles} />
        </>
      )}

      <div className="mt-4">
        {files?.map((file, index) => {
          if (file.type === "pdf") {
            return (
              <a
                key={index}
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center border border-gray-300 p-4 rounded-md mb-3"
              >
                <span className="text-gray-700">View PDF</span>
              </a>
            );
          }
          return null;
        })}
      </div>
    </>
  );
};
