import { TPost } from "@/redux/features/post/post.type";
import Image from "next/image";

type FeedFilesProps = {
  files: TPost["files"];
};

export const FeedFiles: React.FC<FeedFilesProps> = ({ files }) => (
  <>
    {files && files.length > 0 && (
      <>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
          {files.map((file, index) => {
            if (file.type === "image") {
              return (
                <img
                  key={index}
                  src={file.url}
                  alt={`File-${index}`}
                  className="object-cover rounded-md"
                />
              );
            }
            return null;
          })}
        </div>
        <div className="mt-4 ">
          {files.map((file, index) => {
            if (file.type === "pdf") {
              return (
                <a
                  key={index}
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center border border-gray-300 p-4 rounded-md"
                >
                  <span className="text-gray-700">View PDF</span>
                </a>
              );
            }
            return null;
          })}
        </div>
      </>
    )}
  </>
);
