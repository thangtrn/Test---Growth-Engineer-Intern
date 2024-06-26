"use client";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Button from "~/components/Button";

interface SharedModalProps {
   hide: () => any;
}

const SharedModal: React.FC<SharedModalProps> = ({ hide }) => {
   const [isClose, setIsClose] = useState<boolean>(false);
   const [isRoot, setIsRoot] = useState<boolean>(true);
   const [email, setEmail] = useState("");

   const handleClickBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
      const { id } = e.target as HTMLDivElement;
      if (id === "shared-modal" && isClose) hide();
   };

   const handleCopyUrl = () => {
      const url = location.href;
      navigator.clipboard.writeText(url);
      toast.success("Copy thành công");
   };

   const handleSendMail = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log("Hello");
      setEmail("");
   };

   return (
      <div
         id="shared-modal"
         onMouseDown={() => setIsClose(true)}
         onMouseUp={handleClickBackdrop}
         className="fixed inset-0 bg-overlay f-center z-50"
      >
         <div className="max-w-[500px] mx-5 w-full h-fit bg-white rounded py-3 px-4">
            <h3 className="text-lg font-bold text-center mb-3 text-black">
               {isRoot ? "Chia sẻ kết quả" : "Chia sẻ quả Email"}
            </h3>
            <p className="mb-3 text-black">
               {isRoot
                  ? "Đây là một số cách bạn có thể chia sẻ với bạn bè và đồng nghiệp của mình:"
                  : "Vui lòng cung cấp địa chỉ email mà bạn muốn chia sẻ kết quả"}
            </p>
            {isRoot ? (
               <>
                  <div className="space-y-3 mb-3">
                     <Button>Chia sẻ qua Facebook</Button>
                     <Button
                        variant="flat"
                        className="bg-slate-200"
                        onClick={() => setIsRoot(false)}
                     >
                        Chia sẻ qua Email
                     </Button>
                     <Button
                        variant="flat"
                        className="bg-slate-200"
                        onClick={handleCopyUrl}
                     >
                        Sao chép đường dẫn đến trang kết quả
                     </Button>
                  </div>
                  <Button variant="flat" onClick={hide}>
                     Huỷ
                  </Button>
               </>
            ) : (
               <>
                  <form onSubmit={handleSendMail}>
                     <input
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                           setEmail(e.target.value)
                        }
                        type="email"
                        className="border-2 border-gray-300 text-black text-sm rounded block w-full p-2.5 outline-none focus:border-primary focus:border-2"
                        placeholder="Địa chỉ email nhập kết quả"
                     />
                     <span className="italic text-sm text-black">
                        Ấn enter sau mỗi email để xác nhận
                     </span>
                     <div className="flex gap-3 mt-3">
                        <Button
                           variant="flat"
                           className="bg-slate-200"
                           onClick={() => {
                              setIsRoot(true);
                              setEmail("");
                           }}
                        >
                           Quay lại
                        </Button>
                        <Button type="submit">Gửi email</Button>
                     </div>
                  </form>
               </>
            )}
         </div>
      </div>
   );
};

export default SharedModal;
