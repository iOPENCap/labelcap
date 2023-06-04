import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-row min-h-screen w-full p-12 pr-4 space-x-8">
      <div className="w-full">
        <h1 className="text-xl font-bold">Image Title</h1>
        <div className="flex flex-row space-x-8">
          <Image className="pt-6 hover:brightness-110" src="/data/server/NWPU-RESISC45/commercial_area/commercial_area_001.jpg"
            alt="commercial_area_001.jpg" width={300} height={300} />
          <Textarea />
        </div>

      </div>
      <div className="">

      </div>
    </main>
  )
}
