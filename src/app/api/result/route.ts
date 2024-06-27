import { NextRequest, NextResponse } from "next/server";
import assessmentResult from "~/data/result.json";
import fsPromises from "fs/promises";

const dataFilePath = "./src/data/result.json";

export async function GET(req: NextRequest) {
   const url = new URL(req.url);
   const searchParams = new URLSearchParams(url.searchParams);

   const email = searchParams.get("email");
   if (!email) {
      return NextResponse.json(
         { msg: "Vui lòng nhập email." },
         { status: 400 }
      );
   }

   const jsonData = await fsPromises.readFile(dataFilePath, "utf8");
   const objectData = JSON.parse(jsonData);

   const result = objectData.find((item: any) => item.email === email);

   return NextResponse.json({ msg: "Lấy thành công", data: result || null });
}

export async function POST(req: NextRequest) {
   try {
      const data = await req.json();

      // check is exists email
      if (
         !data?.email &&
         assessmentResult.some((item) => item?.email === data?.email)
      ) {
         return NextResponse.json(
            { msg: "Bạn chỉ được làm bài test 1 lần duy nhất" },
            { status: 400 }
         );
      }

      const jsonData = await fsPromises.readFile(dataFilePath, "utf8");
      const objectData = JSON.parse(jsonData);

      objectData.push(data);

      const updatedData = JSON.stringify(objectData);

      await fsPromises.writeFile(dataFilePath, updatedData);

      return NextResponse.json(data);
   } catch (e) {
      return NextResponse.json({ msg: "Đã có lỗi" }, { status: 400 });
   }
}
