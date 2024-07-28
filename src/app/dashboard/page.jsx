"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/Button";
import { CenterHeader } from "@/components/CenterHeader";
import { Input } from "@/components/Input";
import { useRouter } from "next/navigation";
import { app } from "../firebaseConfig";
import { parse } from "../cocktail";
import { Title } from "@/components/Title";
import { getDatabase, ref, child, get } from "firebase/database";

function Dashboard ()  {
    const router = useRouter();
    const image = useRef();
    const inputFile = useRef();
    const [imageFormData, setImgFormData] = useState(new FormData());
    const [productData, setProductData] = useState({
        productName: "",
        regualrPrice: "",
        salePrice: "",
        desc: "",
        img: "",
    });
    const admin = JSON.parse(localStorage.getItem("admin")) || {};
    
    const db = getDatabase(app);
  useEffect(() => {
    if (!admin.uid) {
      router.push("/dashboard/login");
      return;
    }
    (async () => {
      const adminFromDb = await get(child(ref(db), `admins/${admin.uid}`));
      const userCredential = adminFromDb.val();
      console.log(userCredential);
      if (userCredential.uid == admin.uid) {
        localStorage.setItem("adminChecked", "true");
      } else {
        alert("Fuck you , do not play in my localstorage 👊😡");
        localStorage.removeItem("admin");
        router.push(`/dashboard/login`);
      }
    })();
  }, []);

  const openInputfile = () => {
    inputFile.current.click();
  };

  /**
   *
   * @param {import("react").FormEvent} ev
   * @returns
   */
  const getLocalImage = (ev) => {
    const key = "6bc0aad40997a4f674eec8247cd9d769";
    const img = ev.target.files[0];
    const imageData = new FormData();
    imageData.append("image", img);
    imageData.append("key", key);
    const reader = new FileReader();
    reader.readAsDataURL(img);
    reader.addEventListener("loadend", () => {
      image.current.src = reader.result;
    });
    setImgFormData(imageData);
  };

  const uploadLocalImage = async () => {
    const url = `https://api.imgbb.com/1/upload`;
    const res = await fetch(url, {
      method: "POST",
      body: imageFormData,
    });
    console.log("Image uploaded");
    setProductData({ ...productData, img: await (await res.json()).data.url });
  };

  const uploadProduct = async (ev) => {
    try {
      uploadLocalImage();
    } catch (error) {
      console.error(error);
    } finally {
      ev.preventDefault();
    }
  };

  return (
    <main>
      <CenterHeader />
      <section className="py-[30px] ">
        <div className="container m-auto flex max-[512px]:flex-col-reverse gap-3 p-3 ">
          <form
            onSubmit={uploadProduct}
            className=" flex flex-col gap-4 w-full min-[512px]:w-[50%]"
          >
            <Title content={`Weclome ${admin?.email?.match(/\w+/gi)[0]}!dsadass`} />
            <Input
              onInput={(ev) =>
                setProductData({ ...inputsVal, productName: ev.target.value })
              }
              isNum={false}
              placeholder={"Enter product name"}
            />

            <Input
              onInput={(ev) =>
                setProductData({ ...inputsVal, regualrPrice: ev.target.value })
              }
              isNum={false}
              placeholder={"Enter regular price"}
            />
            <Input
              onInput={(ev) =>
                setProductData({ ...inputsVal, salePrice: ev.target.value })
              }
              isNum={false}
              placeholder={"Enter sale price"}
            />
            <textarea
              onInput={(ev) =>
                setProductData({ ...inputsVal, desc: ev.target.value })
              }
              className="p-3 rounded-md outline-none border-[1.5px] border-slate-400 text-black min-h-[200px]"
            ></textarea>

            <Button content="Upload" />
          </form>

          <div className="w-full min-[512px]:w-[50%] flex justify-center items-center">
            <figure
              onClick={openInputfile}
              className="w-[300px] h-[300px] bg-[#eee] flex justify-center items-center cursor-pointer rounded-xl"
            >
              <img
                ref={image}
                src="/addImage.png"
                className="min-w-[150px] max-h-[300px]"
                alt="add product"
              />
              <input
                ref={inputFile}
                onChange={getLocalImage}
                type="file"
                className="hidden"
              />
            </figure>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
