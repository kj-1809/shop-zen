/** app/api/uploadthing/core.ts */
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth } from "@clerk/nextjs";
import prisma from "@/lib/utils/prisma";

const f = createUploadthing();

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
	// Define as many FileRoutes as you like, each with a unique routeSlug
	imageUploader: f({ image: { maxFileSize: "16MB" , maxFileCount : 1 } })
		// Set permissions and file types for this FileRoute
		.middleware(async (req) => {
			// This code runs on your server before upload
			const { userId } = auth();
      if(!userId) throw new Error("Unauthorized")

      const user = await prisma.user.findFirst({
        where : {
          id : userId
        },
        select : {
          role : true
        }
      })
      
      if(!user || user.role !== "ADMIN"){
        throw new Error("Unauthorized")
      }
			// Whatever is returned here is accessible in onUploadComplete as `metadata`
			return { userId };
		})
		.onUploadComplete(async ({ metadata, file }) => {
			// This code RUNS ON YOUR SERVER after upload
			console.log("Upload complete for userId:", metadata.userId);
			console.log("file url", file.url);
		}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
